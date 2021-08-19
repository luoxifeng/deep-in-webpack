module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // "useBuiltIns": "entry",
        // corejs: { 
        //   version: '3.8', 
        //   proposals: false 
        // },
        targets: {
          "chrome": '78',
        },
      }
    ]
  ],
  plugins: [
    // ["@babel/plugin-transform-runtime", {
    //   // helpers: false,
    //   corejs: 3
    // }]
  ]
}