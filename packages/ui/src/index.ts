import "@css/style.css";
import BoostHeader from "./components/shell/boost-header.vue";
import i18n from "./plugins/i18n";

import LqAsync from './components/lq-async.vue';
import LqCommonInput from './components/lq-common-input.vue';

import LqTextInput from "./components/lq-text-input.vue";

import LqDatepicker from "./components/datetime/lq-datepicker.vue";
import LqHourInput from './components/datetime/lq-hour-input.vue';

export * from "./components/select/lq-autocomplete";
import LqSelect from "./components/select/lq-select.vue";
import LqAutocomplete from "./components/select/lq-autocomplete.vue";

export * from "./components/table/lq-table";
import LqTable from "./components/table/lq-table.vue";

import { useFilterWidget } from "./components/crossfilter/filter-widget";
import { useFilter } from "./components/crossfilter/filter";
import LqFilterSelect from "./components/crossfilter/lq-filter-select.vue";

import LqPartySelect from "./components/party/lq-party-select.vue";
import LqPersonSelect from "./components/party/lq-person-select.vue";
import LqProjectSelect from './components/project/lq-project-select.vue';

import LqRouteTabs from "./components/lq-route-tabs.vue";

import LqAddressSelect from "./components/address/lq-address-select.vue";
import LqAddressCard from "./components/address/lq-address-card.vue";
import LqAddressEdit from "./components/address/lq-address-edit.vue";

export * from "./components/select/lq-table-select";
import LqTableSelect from "./components/select/lq-table-select.vue";
import LqModal from "./components/dialog/lq-modal.vue";


import LqCol from './components/layout/lq-col.vue';
import LqRow from './components/layout/lq-row.vue';
import LqLine from './components/layout/lq-line.vue';
import LqColumn from './components/layout/lq-column.vue';
import LqCard from './components/layout/lq-card.vue';
import LqFillPage from './components/layout/lq-fill-page.vue';
import LqPage from './components/layout/lq-page.vue';
import LqToolbar from "./components/layout/lq-toolbar.vue";

import LqGoogleMap from './components/lq-google-map.vue';
import LqButton from './components/lq-button.vue';
import LqActionButton from './components/lq-action-button.vue';
import LqButtons from './components/lq-buttons.vue';
import LqItemSelect from './components/item/lq-item-select.vue';
import LqButtonSelect from './components/select/lq-button-select.vue';
import LqMultiSelect from './components/select/lq-multi-select.vue';
import LqButtonSwitch from './components/select/lq-button-switch.vue';
import LqTextarea from './components/lq-textarea.vue';
import LqCheckbox from './components/lq-checkbox.vue';

import LqFileInput from './components/file/lq-file-input.vue';
import LqFiles from './components/file/lq-files.vue';

import lqBryntumTaskBoard from "./components/bryntum/lq-bryntum-task-board.vue";
import lqBryntumGrid from "./components/bryntum//lq-bryntum-grid.vue";
import lqBryntumGantt from "./components/bryntum//lq-bryntum-gantt.vue";
import lqBryntumCalendar from "./components/bryntum/lq-bryntum-calendar.vue";
import lqBryntumScheduler from "./components/bryntum/lq-bryntum-scheduler.vue";
import lqBryntumSchedulerpro from "./components/bryntum/lq-bryntum-schedulerpro.vue";

import LqError from './components/lq-error.vue';
import LqTextEditor from './components/lq-text-editor.vue';

export * from './components/_common/utils';

export {
    LqProjectSelect,
    LqTextEditor,
    LqCommonInput,
    LqFileInput,
    LqFiles,
    LqAsync,
    LqAutocomplete,
    LqTable,
    LqDatepicker,
    LqTextInput,
    LqSelect,
    useFilter,
    useFilterWidget,
    LqFilterSelect,
    LqPartySelect,
    LqRouteTabs,
    LqAddressSelect,
    LqAddressEdit,
    LqModal,
    LqAddressCard,
    LqTableSelect,
    LqCol,
    LqRow,
    LqGoogleMap,
    LqPersonSelect,
    LqButton,
    LqButtons,
    LqItemSelect,
    LqButtonSelect,
    LqCard,
    lqBryntumGrid,
    lqBryntumTaskBoard,
    lqBryntumCalendar,
    lqBryntumGantt,
    lqBryntumScheduler,
    lqBryntumSchedulerpro,
    LqTextarea,
    LqMultiSelect,
    LqButtonSwitch,
    LqLine,
    LqColumn,
    LqHourInput,
    LqFillPage,
    LqCheckbox,
    LqPage,
    LqToolbar,
    LqActionButton,
    LqError
};

export { BoostHeader, i18n };
export * from './create-vue-app';
import * as components from './index';

export const plugin = {
    install(app: any) {
        for (const name in components) {
            // @ts-ignore
            app.component(name, components[name]);
        }
    }
};
