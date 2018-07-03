module.exports = {
  "port": 7777,
  "timestamp": true,
  "dist": "gen",
  "webpack": {
    "publicPath": "",
    "output": {
      "./*.html": {
        "entry":"./src/index"
      }
    },
    "global": {
      "Vue": "vue",
      "HeyUI": 'heyui',
      "$": 'jquery',
      "Utils": './src/js/common/utils',
    },
    "devServer": {
      "historyApiFallback":true
    },
    "externals": {
      "Vue": "window.Vue",
      "VueRouter": "window.VueRouter"
    }
  }
}