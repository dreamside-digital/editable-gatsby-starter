
let activeEnv =
  process.env.GATSBY_FIREBASE_ENVIRONMENT || process.env.NODE_ENV || "development"

console.log(`Using environment config: '${activeEnv}'`)

const firebaseConfig = require(`./config/firebase-config.${activeEnv}.json`)

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

module.exports = {
  siteMetadata: {
    title: process.env.GATSBY_PROJECT_TITLE,
    description: process.env.GATSBY_PROJECT_DESCRIPTION,
    social: {
      twitter: ``,
    },
  },
  pathPrefix: `/`,
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: process.env.GATSBY_PROJECT_TITLE,
        short_name: process.env.GATSBY_PROJECT_SHORT_NAME,
        start_url: "/",
        background_color: "#000",
        theme_color: "#FCB239", // yellow
        display: "minimal-ui",
        icon: "static/icon.png" // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-source-firebase-nl",
      options: {
        credential: firebaseConfig.serviceAccountKey,
        databaseURL: firebaseConfig.databaseURL,
        types: [
          {
            type: "Pages",
            path: "pages",
            map: node => {
              node.content = JSON.stringify(node.content);

              return node
            },
          },
        ]
      }
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        precision: 8,
      },
    }
  ]
};
