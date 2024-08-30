/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import 'vuetify/styles'
// Composables
import { createVuetify } from "vuetify";
import type { ThemeDefinition } from 'vuetify';
import * as components from "vuetify/components";
import * as directives from 'vuetify/directives'
//import { useI18n } from "vue-i18n";
//import i18n from "boost-shared/plugins/i18n";
import * as labs from 'vuetify/labs/components'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

const Lighttheme: ThemeDefinition = {
  dark: false,
  variables: {
    'high-emphasis-opacity': 1
  },
  colors: {
    background: '#F7F9FB',
    surface: '#FFFFFF',
    primary: '#009DE2',
    secondary: '#3CCDA6',
    accent: '#47C1BF',
    error: '#F44336',
    info: '#2196F3',
    success: '#4CAF50',
    'on-success': '#FFFFFF',
    warning: '#FFC107'
  }
}

const Darktheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#111b27',
    surface: '#1E293B',
    primary: '#705CF6',
    secondary: '#598EF3',
    accent: '#705CF6',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
}

export default createVuetify({
  components: {
    ...components,
    ...labs
  },
  directives,
  theme: {
    themes: {
      light: Lighttheme,
      dark: Darktheme
    }
  },
  defaults: {
    VBtn: {
      rounded: 'md',
      fontWeight: '400',
      letterSpacing: '0'
    },
    VCard: {},
    VSheet: {
      elevation: 1
    },
    VTable: {
      elevation: 1
    },

    VDataTable: {
      fixedHeader: true,
      noDataText: 'Results not found'
    },
    VTextField: {
      variant: 'solo'
    },
    VSelect: {
      variant: 'solo'
    }
  },
  locale: {
    //adapter: createVueI18nAdapter({ i18n, useI18n }),
  }
})
