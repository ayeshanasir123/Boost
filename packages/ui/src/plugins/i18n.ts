import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    legacy: false,  
    locale: 'sv_SE',
    fallbackLocale: 'en_US',
    messages: {
      en_US: {
        ui: {
          logout: 'Logout'
        },
        Search: "Search",
        "Where to search": "Where to search...",
        "Everywhere": "Everywhere",
        en_US: "English (USA)",
        sv_SE: "Svenska",
        "Customers": "Customers",
        "Sales Orders": "Sales Orders",
        "Type": "Type",
        "Project Name": "Project Name",
        "Project Manager": "Project Manager",
        "Customer": "Customer",
        "Contact Person": "Contact Person",
        "Project Code": "Project Code",
        "Projects": "Projects",
        "Save": "Save",
        "Cancel": "Cancel",
        "New Project": "New Project",
        "Edit Project": "Edit Project",
        "Accounting Customer": "Accounting Customer",
        "Their Reference": "Their Reference",
        "Our Reference": "Our Reference",
        "Invoice Reference": "Invoice Reference",
        "Invoice Instructions": "Invoice Instructions",
      },
      sv_SE: {
        ui: {
          logout: 'Logga ut'
        },
        Search: "Sök",
        "Everywhere": "Överallt",
        "Where to search": "Var vill du söka...",
        "Customers": "Kunder",
        "Select Language": "Välj språk",
        "Sales Orders": "Order",
        "Type": "Typ",
        "Project Name": "Projektnamn",
        "Project Manager": "Projektledare",
        "Customer": "Kund",
        "Contact Person": "Kontaktperson",
        "Project Code": "Projektnummer",
        "Projects": "Projekt",
        "Save": "Spara",
        "Cancel": "Avbryt",
        "New Project": "Nytt projekt",
        "Edit Project": "Editera projekt",
        "Accounting Customer": "Faktureras kund",
        "Their Reference": "Deras referens",
        "Our Reference": "Vår referens",
        "Invoice Reference": "Märkning på faktura",
        "Invoice Instructions": "Faktureringsinstruktioner",
      },
    }
  })

export default i18n;