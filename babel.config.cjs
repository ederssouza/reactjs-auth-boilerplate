module.exports = {
  presets: [
    ['@babel/preset-typescript'],
    ['@babel/preset-env', { modules: 'auto' }],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic'
      }
    ]
  ]
}
