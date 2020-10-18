module.exports = {
  title: "Workshop start-to-code",
  description: "Just playing around",
  base: "/research-EMMELINEMARTENS",

  themeConfig: {
    displayAllHeaders: true,
    nav: [
      { text: "Home", link: "/" },
      { text: "Geschiedenis", link: "/guide/history" },
      { text: "Mbot", link: "/guide/mbot" },
      { text: "Snake JS", link: "/guide/js" },
      { text: "Snake raspberry pi", link: "/guide/rasp" },
    ],
       sidebar: [
      {
        title: 'Geschiedenis',   // required
        collapsble: false,
        path: '/guide/history',      // optional, link of the title, which should be an absolute path and must exist
      },
      {
        title: 'Mbot',
        collapsble: false,
        path: '/guide/mbot',
        
      },
      {
        title: 'Snake Game in javascript',
        collapsble: false,
        path: '/guide/js',
      },
     {
        title: 'Snake Game op de Raspberry Pi',
        collapsble: false,
        path: '/guide/rasp',
      }
    ],
  },
};