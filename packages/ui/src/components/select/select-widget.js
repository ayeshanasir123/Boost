import { useAttrs, reactive, watch } from 'vue';
import { onMountedElem } from '@boost/shared';

export function useSelectWidget(self, options = {}) {

  const $attrs = useAttrs();

  Object.assign(self, {
    sortedItems: reactive([])
  });

  onMountedElem($element => {
    /*if (!$attrs.name) {
        $element.attr('name', $attrs.ngModel);
        $attrs.name = $attrs.ngModel;
    }

    if (!self.items) {
        self.items = [];
    }

    'clearButton'.eachWord(function (attr) {
        if ($attrs[attr] !== undefined) {
            self[attr] = true;
        }
    });*/

    let $found = $element.find('.select-widget');
    $found.length && ($element = $found);

    var loading = false;

    {

      let original = self.items.slice();
      let skipped = false;
      processItems(self.items);
      watch(self.items, () => {
        if (!skipped && original.hasSameValues(self.items)) {
          original = null;
          skipped = true;
          return;
        }
        processItems(self.items);
      });
    }

    function processItems(items) {

      if (loading) {
        return;
      }

      if (!Array.isArray(items)) {
        items = Object.entries(items).map(([k, v]) => ({ id: k, title: v }));
      }
      // we allow duplicates in our items and we make an unique array here
      // it's needed for a scenario when items arent available for a user but exist in the edited object
      // so we join both items and the edited object's items together into 1 item array safely without worrying about duplicates
      // todo: optimize with all filtering

      items = items.unique('id');

      //check whether value's items is missing from the new items

      items = 'no-sort' in $attrs || options.noSort ? items : items.length && items[0].hasOwnProperty('_order') ? items.sortBy('_order') : items.sortBy('title');

      var descName = 'show-description' in $attrs ? $attrs['show-description'] || 'description' : false;

      var hasIcons = false;
      var hasCount = false;

      var titleFilter;
      if ($attrs.titleFilter) {

        let filter = $attrs.titleFilter.trim();
        if (filter[0] === '=') {
          titleFilter = self.$parent.$eval(filter.substr(1));
        } else {
          titleFilter = $filter($attrs.titleFilter);
        }
      }

      const mapped = items.map((item, i) => {

        var html;

        if (titleFilter) {
          html = titleFilter(item);
        } else {
          html = $attrs.itemTitle ? item[$attrs.itemTitle] : item.title;
        }

        var style = [];

        if (item.background) {
          style.push('background:' + $escape(item.background));
        }
        if (item.color) {
          style.push('color:' + $escape(item.color));
        }

        style = ' style="' + style.join(';') + '"';

        if (item.icon) {
          html = getIconHtml(item) + html;
          hasIcons = true;
        }

        let id = '';
        if ($attrs.addIdsToWidget) {
          if (item.id?.toString) {
            id = ` id-${item.id.toString().slugify()}`;
          } else if (item.id === null) {
            id = ' id-null';
          }
        }

        // html = `<span class="title${id}"${style}>${html}</span>`;

        // if (item.tooltip) {
        //   html = $('<div>').append($(html).attr({ tooltip: item.tooltip })).html();
        // }

        // if (descName && item[descName]) {
        //   html += ' <span class="description"' + style + '>' + $escape(item[descName]) + '</span>';
        // }

        // var count = item.count;

        // //todo: remove this hack for display icons-only mode with proper paddngs

        // //if (count !== undefined) {
        // hasCount = true;
        // html += '<span class="count"' + style + '>' + (count || '') + '</span>';
        // //}

        // if (options.titleWrapSpan) {
        //   html = '<span>' + html + '</span>';
        // }

        const out = {
          id: item.id,
          originalTitle: item.title,
          title: html,
          group: item.group,
          disabled: item.disabled,
          count: item.count
        };

        if (options.indexId) {
          out._id = out.id.toString();
        }

        return out;
      });
      let group;
      mapped.forEach((item, i) => {
        if (group !== item.group) {
          item.groupStart = true;
          i && (mapped[i - 1].groupEnd = true);
          group = item.group;
        }
      });
      if (group) {
        mapped.at(-1).groupEnd = true;
      }
      self.sortedItems.replace(mapped);

      $element.toggleClass('has-icons', hasIcons);
      $element.toggleClass('has-count', hasCount);

      self.trigger('itemsChanged', items);

      let syncModel = options.syncModel || (val => val);
      let syncValue = options.syncValue || (val => val);

      const idKey = () => options.indexId ? '_id' : 'id';

      if (self.value !== undefined) {
        if (is_.arr(self.value)) {
          self.value.copy().each(function (id) {
            self.items.find({ [idKey()]: syncModel(id) }) || self.value.remove(id);
          });
        } else {
          self.items.find({ [idKey()]: syncModel(self.value) }) || (self.value = null);
        }
      }


      if (items.length == 1 && items[0].singleRequired) {
        self.value = [syncValue(items[0].id)];
      }

    }

    function getIconHtml(item) {

      var icon = item.icon;

      if (icon.startsWith('sprite') || icon.startsWith('hotel')) {
        return `<svg class="icon24"><use xlink:href="/img/${icon}"></use></svg>`;
      }
      return `<svg class="icon24"><use xlink:href="/img/hotel_ico.svg#otel_${icon}"></use></svg>`;


      if (icon[0] == '<') { // html is provided. use it as it is
        return icon;
      } else {
        var ss = icon.split(/\s*\|\s*/);

        var style = '';

        if (ss.length > 1) {
          style = ss[1];
          if (style[0] == '#') {
            style = ' style = "color:' + style + '"';
          }
        } else if (item.icon_color) {
          style = ' style = "color:' + $escape(item.icon_color) + '"';
        }

        icon = ss[0];
        ss = icon.split(/\./g);

        if (ss.length) {
          icon = ss.shift();
        }

        if (icon.match(/^fa-/)) {
          ss.push('fa');
          ss.push(icon);
        } else {
          ss.push('glyphicon');
          ss.push('glyphicon-' + icon);
        }

        var className = ' class = "' + ss.join(' ') + '"';
      }
    }

  });

  return self;
}


