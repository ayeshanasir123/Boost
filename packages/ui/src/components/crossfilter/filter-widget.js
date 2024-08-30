import { inject } from '@boost/shared';
import { reactive, markRaw, watch } from 'vue';
import { useFilter } from './filter';
import { EventSource } from '../../event';

export function useFilterWidget(name, dimFn, dimOps = {}) {

  if (!name) {
    throw new Error('Please provide filter widget name');
  }

  const dimKeys = Symbol('__dimkeys.' + name);

  const stats = reactive({
    filter: {
      count: 0,
      total: 0,
      avg: 0,
    },
  });

  const { ndx, filters, filterWidgetOptions = {} } = inject();
  if (name in filters) {
    console.warn(`The filter widget "${name}" already exists, removing the previous`);
    filters[name].destroy();
  }

  const options = {};
  dimOps.and && (options.groupPersistence = false);

  const items = {};

  const self = filters[name] = reactive({
    name,
    filter: [],
    items: [],
    range: markRaw([0, 0]),
    setFilter(val) {
      self.filter = val;
    },
    toggleFilter,
    hasFilter,
    getFilter,
    get min() {
      return self.getBottom(1)[0];
    },
    get max() {
      return self.getTop(1)[0];
    },
    getTop(count = Infinity, offset = 0, selectFn = vals => Math.min(...vals)) {
      const out = ndx.allFiltered().sortInlineBy(d => selectFn(dimFn(d).map(([id]) => id)), 1);
      if (count < Infinity || offset) return out.slice(offset, count);
      return out;
    },
    getBottom(count = Infinity, offset = 0, selectFn = vals => Math.min(...vals)) {
      const out = ndx.allFiltered().sortInlineBy(d => selectFn(dimFn(d).map(([id]) => id)), -1);
      if (count < Infinity || offset) return out.slice(offset, count);
      return out;
    },
    callFilter() {

      var args = $.makeArray(arguments);
      var method = args.shift();

      return filter[method].apply(filter, args);
    },
    destroy() {
      grp?.dispose();
      dim.dispose();
    }
  });

  mixreturn(self, EventSource);

  const hooks = useFilter.trigger('dimension', self.name);

  let update = () => { };

  var dim = new FakeDim, grp;

  const filter = useFilter();
  if (dimOps.type === 'range') {
    let minmax = [0, 0];
    filter.on('itemBeforeUpdate :first', (items) => {
      minmax = items.length ? items.reduce((r, d) => {
        const keys = dimFn(d);
        keys.forEach(([v]) => {
          if (v < r[0]) r[0] = v;
          if (v > r[1]) r[1] = v;
        });
        return r;
      }, [Infinity, -Infinity]) : [0, 0];
      self.range.replace(minmax);
    }, self);
    hooks.push((d, keys) => {
      for (const key of keys) {
        key[0] = (key[0] - minmax[0]) / (minmax[1] - minmax[0]);
      }
    });
  }

  function FakeDim() {

    let triggerFns = 'top bottom groupAll filter'.words;
    let fakeFns = 'filterAll dispose'.words;

    const self = object(this, { isFake: true });

    for (let fn of triggerFns) {
      self[fn] = function () {
        init();
        return dim[fn].apply(dim, arguments);
      };
    }

    for (let fn of fakeFns) {
      self[fn] = () => self;
    }

  }

  function init() {
    dim.dispose();
    grp?.dispose();

    update = updateReal;

    dim = ndx.dimension(dimAccessor);

    grp = reduceDistinct(dim.groupAll());

    update();

  }

  function dimAccessor(d) {

    const keys = dimFn(d);
    hooks.forEach(h => h(d, keys));

    const out = {};

    for (const key of keys) {
      out[key[0]] = true;
      items[key[0]] = {
        title: key[1],
        icon: key[2],
        background: key[3],
        icon_color: key[4],
        color: key[5],
      };

    }

    d[dimKeys] = out;

    return out;

  }

  filter.on({
    itemBeforeRemove: function () {
      if (options.groupPersistence === false) {
        grp && grp.dispose();
      }
    },
    itemBeforeUpdate: function (items) {
      if (options.groupPersistence === false) {
        grp && grp.dispose();
      }
      items.each(dimAccessor);
    },
    reload: init,
    filterAll: function () {
      dim.filterAll();
    },
    filterRestore: function (mode) {
      doFilter(self.filter, mode);
    },
    filterDown: function (name, val) {

      if (self.name != name) {
        return;
      }

      filterDown(val);

    },
    filterRequest: [self.name, function (val, mode) {

      if (val == 'default') {

        if (options.selectFirstItem) {
          var first = dim.top(1);
          if (first.length) {
            var key = dimFn(first[0]);
            if (key.length) {
              val = [key[0][0]];
            }
          }
        }

        val == 'default' &&
          (val = getDefaultValue());
      }

      //self.setSilent({ filter: val });
      setFilter(val, mode);

    }],
    filter: function (name, val) {

      if (self.name == name && options.groupPersistence !== false) {
        return;
      }

      update();

    },
    update: (...args) => update(...args),
  }, self);

  let prev = [];

  watch(self.filter, function (val, old) {
    
    if (val.hasSameValues(prev)) {
      return;
    }

    if (!val.length) {
      val = 'default';
    }
    prev = val.slice();
    setFilter(val);

  });

  function getDefaultValue() {


    return structuredClone(dimOps.default || []);

    //we use string keys for dimensions so all default keys should be converted to strings
    //but we have then the converted values displayed in the select which is right
    //that's a problem, because the default values were hidden due to this bug (using numeric keys)
    //so figure out how to hide default values with proper string keys

    if (!dimOps.default) {
      return [];
    }

    return dimOps.default.map(function (val) {
      return val.toString();
    });
  }

  function doFilter(val, mode) {

    val = val.slice();

    if (val == 'default' || (!val.length && dimOps.default)) {
      val = getDefaultValue();
    }

    if (val.length) {

      if (dimOps.type === 'range') {
        dim.filter(item => {
          return Object.keys(item).some(v => v >= val[0] && v <= val[1]);
        });
      } else {
        dim.filter(item => dimOps.and ? val.every(v => item[v]) : val.some(v => item[v]));
      }

      //if there're no items, reset the filter
      if (mode != 'noItemCountCheck' && !dimOps.and && !dim.top(Infinity).length) {
        dim.filterAll();
        //self.setSilent({ filter: [] });
        return [];
      }

    } else {
      dim.filterAll();
    }

    return val;

  }

  function setFilter(val, mode) {

    var start = Date.now();

    val = doFilter(val);

    var elapsed = Date.now() - start;

    stats.filter.total += elapsed;
    stats.filter.count++;
    stats.filter.avg = stats.filter.total / stats.filter.count;

    mode === 'silent' || filter.trigger('filter', self.name, val, mode);

  }


  function updateReal() {

    //var start = Date.now();

    let $count = options.aggregateFilter || (val => val.count || 0);

    if (options.groupPersistence === false) {
      grp?.dispose();
      grp = reduceDistinct(dim.groupAll());
    }

    var p = grp.value();
    var totalCount = dim.top(Infinity).length;

    self.items
      .filter(item => !p.vs[item.id])
      .each(item => dimOps.keepEmptyItems ? item.count = item.avg = 0 : self.items.remove(item));

    for (const [k, v] of Object.entries(p.vs)) {

      var found = self.items.find({ id: k });

      if (!found) {
        self.items.push({
          id: k,
          title: items[k].title,
          icon: items[k].icon,
          icon_color: items[k].icon_color,
          color: items[k].color,
          background: items[k].background,
          count: $count(v),
          avg: v.avg || 0,
          percentage: (v.count || 0) / totalCount,
          percentageFormatted: ((v.count || 0) / totalCount * 100).toFixed(4) + '%',
        });
      } else {
        found.count = $count(v);
        found.avg = v.avg || 0;
        found.percentage = (v.count || 0) / totalCount;
        found.percentageFormatted = ((v.count || 0) / totalCount * 100).toFixed(4) + '%';
      }

    }

    if (dimOps.sort) {
      self.items.sortInlineBy(dimOps.sort);
    } else if (options.sort) {
      self.items.sortInlineBy(options.sort);
    } else if (dimOps.sort !== false) {
      self.items.sortInlineBy('-count');
    }

    //console.log(self.items);

    //hide default filter items
    if (dimOps.default) {
      self.items.replace(self.items.filter(item => !dimOps.default.some(def => def === item.id)));
    }

    if (dimOps.transformItems) {
      self.items.replace(dimOps.transformItems(self.items));
    }

  }

  function reduceDistinct(grp) {

    return grp.reduce((p, d) => {

      const keys = d[dimKeys];

      if (dimOps.and && !self.filter.every(id => keys[id])) {
        return p;
      }

      for (const k in keys) {

        const v = p.vs[k] ??= { count: 0, total: 0, distinct: {} };
        if (filterWidgetOptions.distinctCount) {
          const distinctKey = filterWidgetOptions.distinctCount(d);
          const distinct = v.distinct[distinctKey] ??= { count: 0 };
          distinct.count++ || v.count++;
        } else {
          v.count++;
        }

        if (options.aggregate) {
          v.total += options.aggregate(p, d);
          v.avg = v.total / v.count;
        }
      }

      return p;

    }, (p, d) => {

      const keys = d[dimKeys];

      if (dimOps.and && !self.filter.every(id => keys[id])) {
        return p;
      }

      for (const k in keys) {

        const v = p.vs[k];

        if (filterWidgetOptions.distinctCount) {
          const distinctKey = filterWidgetOptions.distinctCount(d);
          const distinct = v.distinct[distinctKey];
          --distinct.count || v.count--;
        } else {
          v.count--;
        }

        if (!v.count) {
          delete p.vs[k];
        } else if (options.aggregate) {
          v.total -= options.aggregate(p, d);
          v.avg = v.total / v.count;
        }
      }

      return p;

    }, () => ({ ...options.aggregateStart?.() ?? {}, vs: {} }));
  }

  function hasFilter(id) {
    return self.filter.contains(id);
  }

  function filterDown(id) {

    var prev = self.filter.slice();

    if (self.filter.length == 0) {
      self.filter = [id];
    } else {

      if (self.filter.contains(id) && self.filter.length == 1) {
        self.filter = self.filterPrev || [];
      } else {
        self.filter = [id];
      }

    }

    self.filterPrev = prev;
  }

  function toggleFilter(id) {

    var prev = self.filter.slice();

    if (self.filter.length == 0) {
      self.filter = [id];
    } else {
      if (self.filter.contains(id)) {
        self.filter.remove(id);
      } else {
        self.filter.push(id);
      }
    }
    self.filterPrev = prev;
  }

  function getFilter() {
    return self.filter;
  }

  return self;
}