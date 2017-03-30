const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
// eslint-disable-next-line max-len
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const getClientEnvironment = require('./env')
const paths = require('./paths')

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/'
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// As %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = ''
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl)

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = {
  /*
   * You may want 'eval' instead if you prefer to see the compiled output in
   * DevTools. See the discussion in
   * https://github.com/facebookincubator/create-react-app/issues/343.
   */
  devtool: 'cheap-module-source-map',
  // These are the "entry points" to our application.
  // This means they will be the "root" imports that are included in JS bundle.
  // The first two entry points enable "hot" CSS and auto-refreshes for JS.
  entry: [
    // Include an alternative client for WebpackDevServer. A client's job is to
    // Connect to WebpackDevServer by a socket and get notified about changes.
    // When you save a file, the client will either apply hot updates (in case
    // Of CSS changes), or refresh the page (in case of JS changes). When you
    // Make a syntax error, this client will display a syntax error overlay.
    // Note: instead of the default WebpackDevServer client, we use a custom one
    // To bring better experience for Create React App users. You can replace
    // The line below with these two lines if you prefer the stock client:
    `${require.resolve('webpack-dev-server/client')}?/`,
    require.resolve('webpack/hot/dev-server'),
    // We ship a few polyfills by default:
    require.resolve('./polyfills'),
    // Finally, this is your app's code:
    paths.appIndexJs
    // We include the app code last so that if there is a runtime error during
    // Initialization, it doesn't blow up the WebpackDevServer client, and
    // Changing JS code would still trigger a refresh.
  ],
  module: {
    loaders: [
      /*
       * ** ADDING/UPDATING LOADERS **
       * The "url" loader handles all assets unless explicitly excluded.
       * The `exclude` list *must* be updated with every change to loader
       * extensions. When adding a new loader, you must add its `test`. As a
       * new entry in the `exclude` list for "url" loader.
       *
       * "url" loader embeds assets smaller than specified size as data URLs to
       * avoid requests. Otherwise, it acts like the "file" loader.
       */
      {
        exclude: [
          /\.html$/,
          /*
           * We have to write /\.(js|jsx)(\?.*)?$/ rather than just
           * /\.(js|jsx)$/. Because you might change the hot reloading server
           * from the custom one to Webpack's built-in
           * webpack-dev-server/client?/, which would not get properly excluded
           * by /\.(js|jsx)$/ because of the query string. Webpack 2 fixes this,
           * but for now we include this hack.
           * https://github.com/facebookincubator/create-react-app/issues/1713
           */
          /\.(js|jsx)(\?.*)?$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/
        ],
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      // Process JS with Babel.
      {
        include: paths.appSrc,
        loader: 'babel',
        query: {
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // Directory for faster rebuilds.
          cacheDirectory: true
        },
        test: /\.(js|jsx)$/
      },
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // In production, we use a plugin to extract that CSS to a file, but
      // In development "style" loader enables hot editing of CSS.
      {
        loader: 'style!css?importLoaders=1!postcss',
        test: /\.css$/
      },
      // JSON is not enabled by default in Webpack but both Node and Browserify
      // Allow it implicitly so we also enable it.
      {
        loader: 'json',
        test: /\.json$/
      },
      // "file" loader for svg
      {
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        },
        test: /\.svg$/
      },
      {
        loader: 'expose?React',
        test: require.resolve('react')
      }
      // ** STOP ** Are you adding a new loader?
      // Remember to add the new extension(s) to the "url" loader exclusion list
    ]
  },
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  output: {
    // This does not produce a real file. It's just the virtual path that is
    // Served by WebpackDevServer in development. This is the JS bundle
    // Containing code from all our entry points, and the Webpack runtime.
    filename: 'static/js/bundle.js',
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: paths.appBuild,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // This is the URL that app is served from. We use "/" in development.
    publicPath
  },
  plugins: [
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    new InterpolateHtmlPlugin(env.raw),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    }),
    // Makes some environment variables available to the JS code, for example:
    // If (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
    new webpack.DefinePlugin(env.stringified),
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // A plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    // If you require a missing module and then `npm install` it, you still have
    // To restart the development server for Webpack to discover it. This plugin
    // Makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebookincubator/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(paths.appNodeModules)
  ],
  // We use PostCSS for autoprefixing only.
  postcss () {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9' // React doesn't support IE8 anyway
        ]
      })
    ]
  },
  // First, run the linter.
  // It's important to do this before Babel processes the JS.
  preLoaders: [
    {
      include: paths.appSrc,
      loader: 'eslint',
      test: /\.(js|jsx)$/
    }
  ],
  resolve: {
    alias: {
      /* eslint-disable max-len */
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      /* eslint-enable max-len */
      'react-native': 'react-native-web'
    },
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // Some tools, although we do not recommend using it, see:
    // https://github.com/facebookincubator/create-react-app/issues/290
    extensions: ['.js', '.json', '.jsx', ''],
    /*
     * This allows you to set a fallback for where Webpack should look for
     * modules. We read `NODE_PATH` environment variable in `paths.js` and pass
     * paths here. We use `fallback` instead of `root` because we want
     * `node_modules` to "win" if there any conflicts. This matches Node
     * resolution mechanism.
     * https://github.com/facebookincubator/create-react-app/issues/253
     */
    fallback: paths.nodePaths
  }
}
