module.exports = {
  siteMetadata: {
    title: `Shoppyfy shopping app`,
    description: `Shopping app made with GatsbyJS`,
    author: `@jakubslowik`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `shoppyfy-shopping-app`,
        short_name: `shoppyfy`,
        start_url: `/`,
        background_color: `#7e10b9`,
        theme_color: `#7e10b9`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
      }
    }
  ],
}
