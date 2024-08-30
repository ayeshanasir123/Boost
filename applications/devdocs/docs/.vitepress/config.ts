import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "boost Docs",
  description: "Documentation for the boost platform",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [ {
      items: [
            {
            text: 'Accounting',
            link: '/accounting',
          },
          {
            text: 'Document Management',
            link: '/document-management',
          },
          {
            text: 'Finance',
            link: '/finance',
          },
          {
            text: 'Product Information Management',
            link: '/product-information-management',
          },
          {
            text: 'Projects',
            link: '/projects',
          },
          {
            text: 'Tasks',
            link: '/tasks',
          },
          {
            text: 'Workorders',
            link: '/workorders',
          }
        ]},
      {
        items: [
          { text: 'Developer Guidelines', link: '/developer-guidelines' },
          { text: 'Developer Utils', link: '/developer-utils' },
        ]
      }

    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
