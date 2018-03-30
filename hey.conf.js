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
      "Vue": "vue"
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