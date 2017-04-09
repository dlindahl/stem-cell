const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const paths = require('./paths')
const getClientEnvironment = require('./env')

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// As %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath.slice(0, -1)
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl)

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.')
}

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = {
  // Don't attempt to continue if there are any errors.
  bail: true,
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  devtool: 'source-map',
  // In production, we only want to load the polyfills and the app code.
  entry: [require.resolve('./polyfills'), paths.appIndexJs],
  module: {
    loaders: [
      /*
       * ** ADDING/UPDATING LOADERS **
       * The "url" loader handles all assets unless explicitly excluded.
       * The `exclude` list *must* be updated with every change to loader
       * extensions. When adding a new loader, you must add its `test`
       * As a new entry in the `exclude` list in the "url" loader.
       *
       * "url" loader embeds assets smaller than specified size as data URLs to
       * avoid requests. Otherwise, it acts like the "file" loader.
       */
      {
        exclude: [/\.html$/, /\.(js|jsx)$/, /\.json$/, /\.svg$/],
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      // Process JS with Babel.
      {
        include: [paths.appSrc, paths.appExample],
        loader: 'babel',
        test: /\.(js|jsx)$/
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
      }
      /*
       * ** STOP ** Are you adding a new loader?
       * Remember to add the new extension(s) to the "url" loader exclusion
       * list.
       */
    ],
    // First, run the linter.
    // It's important to do this before Babel processes the JS.
    preLoaders: [
      {
        include: [paths.appSrc, paths.appExample],
        loader: 'eslint',
        test: /\.(js|jsx)$/
      }
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
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    // We don't currently advertise code splitting but Webpack supports it.
    filename: 'static/js/[name].[chunkhash:8].js',
    // The build folder.
    path: paths.appBuild,
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath
  },
  plugins: [
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In production, it will be an empty string unless you specify "homepage"
    // In `package.json`, in which case it will be the pathname of that URL.
    new InterpolateHtmlPlugin(env.raw),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
      template: paths.appHtml
    }),
    // Makes some environment variables available to the JS code, for example:
    // If (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV was set to production here.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin(env.stringified),
    // This helps ensure the builds are consistent if source hasn't changed:
    new webpack.optimize.OccurrenceOrderPlugin(),
    // Try to dedupe duplicated modules, if any:
    new webpack.optimize.DedupePlugin(),
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    // Generate a manifest file which contains a mapping of all asset filenames
    // To their corresponding output file so that tools can pick it up without
    // Having to parse `index.html`.
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    })
  ],
  resolve: {
    alias: {
      /* eslint-disable max-len */
      /*
       * Support React Native Web
       * https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
       */
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
     * `node_modules` to "win". If there any conflicts. This matches Node
     * resolution mechanism.
     * https://github.com/facebookincubator/create-react-app/issues/253
     */
    fallback: paths.nodePaths
  }
}
