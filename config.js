const config = {
    gatsby: {
        pathPrefix: '/',
        siteUrl: 'https://www.magostech.com/',
        gaTrackingId: null,
        trailingSlash: false,
    },
    header: {
      logo: 'https://www.magostech.com/images/logo.png',
      logoLink: 'https://www.magostech.com/',
      title:
        "<a href='https://www.magostech.com/'></a>",
      githubUrl: 'https://github.com/sumithpdd',
      helpUrl: '',
      tweetText: '',
      social: `<li>
          <a href="https://twitter.com/sumithpdd" target="_blank" rel="noopener">
            <div class="twitterBtn">
              <img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/twitter-brands-block.svg' alt={'Twitter'}/>
            </div>
          </a>
        </li>
        <li>
          <a href="https://discordapp.com/magostech" target="_blank" rel="noopener">
            <div class="discordBtn">
              <img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/discord-brands-block.svg' alt={'Discord'}/>
            </div>
          </a>
        </li>`,
      menutop: ``,
      links: [{ text: '', link: '' }],
      search: {
        enabled: false,
        indexName: '',
        algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
        algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
        algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
      },
    },
    sidebar: {
        forcedNavOrder: [
            '/introduction', // add trailing slash if enabled above
            // '/codeblock',
        ],
        collapsedNav: [
            // '/codeblock', // add trailing slash if enabled above
        ],
        links: [{ text: 'Magostech', link: 'https://magostech.com' }],
        frontline: false,
        ignoreIndex: 'index',
        title: "Flutter Food Delivery Codelab",
    },
    siteMetadata: {
        title: 'Flutter Food Delivery Codelab | Sumith Damodaran',
        description: 'Documentation built with mdx. ',
        ogImage: null,
        docsLocation: 'https://github.com/hasura/gatsby-gitbook-boilerplate/tree/master/content',
        favicon: 'https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg',
    },
    pwa: {
        enabled: false, // disabling this will also remove the existing service worker.
        manifest: {
            name: 'Flutter Food Delivery Codelab',
            short_name: 'FoodDeliveryFlutterCodelab',
            start_url: '/',
            background_color: '#6b37bf',
            theme_color: '#6b37bf',
            display: 'standalone',
            crossOrigin: 'use-credentials',
            icons: [{
                src: 'src/pwa-512.png',
                sizes: `512x512`,
                type: `image/png`,
            }, ],
        },
    },
};

module.exports = config;
