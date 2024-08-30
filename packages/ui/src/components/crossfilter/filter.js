let ndxId = 1;
import { EventSource } from '../../event';
import { inject, provide } from '@boost/shared';
import crossfilter from 'crossfilter2';

export function useFilter(_ndx = null) {

  if (Array.isArray(_ndx)) {
    _ndx = crossfilter(_ndx);
    provide({ ndx: _ndx });
  } else if (!_ndx) {
    _ndx = inject('ndx');
  }

  const self = {
    setFilter, dimension, clear,
    update,// updates 1 item or array of items,
    remove, getItems, toggleSelected, getSelected, isAllSelected, on, //listens for filter events
    trigger, //triggers filter events
    triggerCb,
    group, //creates a new automatically updated crossfilter based on aggregated data,
    reload, //reload data in crossfilter completely
  };

  // onUnmounted(() => {
  //     //unbind all event handlers from eventScope
  //     self.destroy();
  // });

  let dimSelected, selected;

  on('reloadRequest', function (ndx) {
    scope.ndx = ndx;
    _ndx = ndx;
  }, self);

  return self;

  function dimension() {
    return _ndx.dimension.apply(_ndx, arguments);
  }

  function getSelected() {

    checkSelectedDim();

    if (!dimSelected) {
      return [];
    }

    dimSelected.filter(true);

    var selected = dimSelected.top(Infinity);
    dimSelected.filterAll();

    return selected;

  }

  function isAllSelected() {

    if (!dimSelected) {
      return false;
    }
    return _ndx.allFiltered().length == selected.length;
  }

  function checkSelectedDim() {

    if (dimSelected) {
      return;
    }

    var dimKey = 'ndx_dimSelected';
    var selKey = 'ndx_selected';

    var selScope = scope.getScopeFromField('ndx');
    if (!selScope.hasOwnProperty(dimKey)) {
      return;
    }

    dimSelected = scope[dimKey];
    selected = scope[selKey];

  }

  function setSelected(item, value) {
    if (!item.hasOwnProperty('selected')) {
      return Object.defineProperty(item, 'selected', { value, writable: true, configurable: true, enumerable: false });
    }
    item.selected = value;
  }

  function createSelectedDim() {

    if (dimSelected) {
      return;
    }

    var dimKey = 'ndx_dimSelected';
    var selKey = 'ndx_selected';

    var selScope = scope.getScopeFromField('ndx');
    if (!selScope.hasOwnProperty(dimKey)) {

      dimSelected = _ndx.dimension(function (d) {
        return d.selected || false;
      });

      selected = [];

      //create a filter to manage selection on filtering, will destroy itself on the scope's destroy

      //after filtering check items removed from the visible set
      var filter = new Filter(selScope);
      filter.on('filter', (function () {

        var removed = [];

        var filtered = getSelected();

        selected.each(function (item) {
          filtered.includes(item) || removed.push(item);
        });

        removed.each(function (item) {
          setSelected(item, false);
        });

        selected.replace(filtered);

        //notify whether all items are selected
        trigger('selectAll', selected.length === dimSelected.top(Infinity).length);

        update(removed);

        trigger('itemSelected', selected);

      }).laterLastCb(), self);

      filter.on('itemBeforeUpdate', function (items) {

        let ids = selected.map('_id');

        for (let i = 0, len = items.length; i < len; i++) {
          let item = items[i];
          setSelected(item, ids.includes(item._id));

        }

      }, self);


      filter.on('itemBeforeRemove', function (items) {

        for (let i = 0, len = items.length; i < len; i++) {
          let item = items[i];
          selected.removeBy({ _id: item._id });
        }

      }, self);

      selScope.setOwnProperty(dimKey, dimSelected);
      selScope.setOwnProperty(selKey, selected);

      return;

    }


    dimSelected = scope[dimKey];
    selected = scope[selKey];

  }

  function getItems() {
    //todo: optimize not using dimSelected?
    createSelectedDim();
    return dimSelected.top(Infinity);
  }

  function toggleSelected(items, val, mode) {

    createSelectedDim();

    var all = dimSelected.top(Infinity);

    if (items == 'all') {

      items = all;

      if (arguments.length == 1) {
        //deselect if all items are selected
        val = selected.length != all.length;
      }

    } else if (is_.scalar(items)) {

      var found = all.find({ _id: items });
      if (!found) {
        debugger;
      }

      items = [found];

    } else if (!(items instanceof Array)) {
      items = [items];
    }

    // detect a real change of 'selected' flag

    for (let i = 0, len = items.length; i < len; i++) {

      let item = items[i];

      let found = selected.find({ _id: item._id });

      //get the real selected flag regardless of updates done on the item

      setSelected(item, !!found);

      if (val !== undefined) {
        item.selected = !!val;
      } else {
        item.selected = !item.selected;
      }

      if (item.selected) {
        !found && selected.push(item);
      } else {
        selected.remove(found);
      }

    }

    //notify whether all items are selected
    trigger('selectAll', selected.length == all.length);

    update(items, mode == 'update' ? null : ['selected']);

    trigger('itemSelected', selected);

    return selected.length == all.length;

  }

  function remove(items) {

    if (!(items instanceof Array)) {
      items = [items];
    }

    if (!items.length) {
      return;
    }

    var accessor = function (d) {
      return d._id;
    };

    var dim = _ndx.dimension(accessor);

    var ids = items.map(accessor);

    // checkSelectedDim();

    dim.filter(function (id) {
      return ids.includes(id);
    });

    trigger('itemBeforeRemove', items);
    trigger('filterAll');

    _ndx.remove();

    // 1) restore filters silently to minimize visible records after ID dim deletion
    // 2) dispose ID dim
    // 3) trigger dummy filter event to redraw UI

    dim.dispose();

    //restoring was before disposing, but that triggered filter reset since no filtered records left with the disposed dim
    //refactor to restore first with noItemCountCheck and then check empty filters?

    trigger('filterRestore');

    trigger('update');

  }

  function update(items, fields) {

    Array.isArray(items) || (items = [items]);

    if (!items.length) {
      return;
    }

    const accessor = item => item._id;

    const dim = _ndx.dimension(accessor);

    {
      const ids = new Set;

      items.forEach(item => {
        if (!item._id) {
          //scope.processTableRow(item);
        }
        delete item.columns, delete item.columns_formatted, delete item.columns_raw;
        ids.add(accessor(item));
      });

      dim.filter(id => ids.has(id));
    }

    trigger('filterAll');

    _ndx.remove();
    trigger('itemBeforeUpdate', items, fields);
    _ndx.add(items);

    // 1) restore filters silently to minimize visible records after ID dim deletion
    // 2) dispose ID dim
    // 3) trigger dummy filter event to redraw UI

    //when having items filtered with 'dim' we could end up with no items after restoring the filter
    //so we could skip item count check, and re-check after 'dim' is disposed

    trigger('filterRestore', 'noItemCountCheck');

    // now when we have the filters restored and only updated items filtered
    // check whether the items is removed or added/left in the visible set

    dim.filterAll();

    var countAfterUpdate = dim.top(Infinity).length;

    dim.dispose();

    if (!countAfterUpdate) {

      //after the update we have no items, so reset all filters and restore with item count re-check

      //todo: better item count recheck?

      trigger('filterAll');
      trigger('filterRestore');


    }


    trigger('itemUpdate', items, fields);
    trigger('update', fields);

  }

  function clear() {
    trigger('clear');
    trigger('filter', null);
  }

  function setFilter(filter) {
    for (var k in filter) {
      trigger('filterRequest', k, filter[k]);
    }
  }

  // doesnt work, use as in ItemBinder
  function reload(items) {

    //todo: fix full crossfilter replacement

    /*var ndx = crossfilter(items);

    'reloadRequest reload reloadAfter'.split(' ').each(function(stage) {
        trigger(stage, ndx);
    });
    */


    var dim = _ndx.dimension(function () {
      return 1;
    });

    checkSelectedDim();

    trigger('filterAll');

    var old = dim.top(Infinity);
    trigger('itemBeforeRemove', old);

    _ndx.remove();
    _ndx.add(items);

    // 1) restore filters silently to minimize visible records after ID dim deletion
    // 2) dispose ID dim
    // 3) trigger dummy filter event to redraw UI

    //when having items filtered with 'dim' we could end up with no items after restoring the filter
    //so we could skip item count check, and re-check after 'dim' is disposed

    trigger('filterRestore', 'noItemCountCheck');

    // now when we have the filters restored and only updated items filtered
    // check whether the items is removed or added/left in the visible set

    dim.filterAll();

    var countAfterUpdate = dim.top(Infinity).length;

    dim.dispose();

    if (!countAfterUpdate) {

      //after the update we have no items, so reset all filters and restore with item count re-check

      //todo: better item count recheck?

      trigger('filterAll');
      trigger('filterRestore');


    }


    trigger('itemUpdate', items);
    trigger('update');


  }

  function extendNdx() {
    if (_ndx.bind) {
      return;
    }
    _ndx.__className = 'Crossfilter[' + (ndxId++) + ']';
    mixreturn(_ndx, EventSource);

  }

  function trigger() {
    extendNdx();
    return _ndx.triggerQuery.apply(_ndx, arguments);

  }

  function triggerCb() {
    extendNdx();
    return _ndx.triggerCb.apply(_ndx, arguments);

  }

  function on() {

    extendNdx();
    _ndx.bind.apply(_ndx, arguments);

  }

  function group(ps) {

    return new (function () {

      var self = object(this, {
        on: function () {
          return filter.on.apply(filter, arguments);
        },
      });

      var dim = _ndx.dimension(ps.dimension);

      var grp;

      self.ndx = crossfilter();

      var filter = new Filter(scope, self.ndx);

      update();

      on('filter', update, self);

      function update() {

        grp && grp.dispose();
        grp = dim.group();
        grp.reduce.apply(grp, ps.reduce);

        var data = grp.all().filter(ps.filter);

        if (ps.data) {
          data = data.map(ps.data);
        }


        self.ndx.remove();

        filter.trigger('beforeUpdate');

        self.ndx.add(data);

        filter.trigger('filter');

      }

    });

  }

}

useFilter.ndx = function () {

  var out = (function () {
    if (is_.str(arguments[0])) {

      return $rootScope.call.apply($rootScope, arguments);

    } else if (is_.func(arguments[0])) {

      var args = [].copy(arguments);
      args.shift();

      return arguments[0].apply(null, args);
    }

    return arguments[0];

  }).apply(null, arguments);

  if (out && is_.func(useFilter.then)) {
    return useFilter.then(function (items) {
      return crossfilter(items);
    });
  }

  return crossfilter(out || []);


};

mixreturn(useFilter, EventSource);
