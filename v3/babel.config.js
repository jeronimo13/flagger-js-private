module.exports = function(api) {
  const targets = {}
  const options = {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: api.env() === 'test' ? 'commonjs' : false,
          targets
          //debug: true,
          //useBuiltIns: 'usage'
        }
      ],
      '@babel/preset-react'
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: api.env() === 'node' ? false : 2,
          useESModules: true,
          helpers: false
        }
      ],
      [
        'inline-replace-variables',
        {
          __BROWSER__: api.env() === 'browser' || api.env() === 'test'
        }
      ],
      '@babel/plugin-proposal-class-properties'
    ]
  }

  if (api.env() === 'node' || api.env() === 'test') {
    targets.node = 8
  } else {
    targets.ie = 9
  }

  return options
}
