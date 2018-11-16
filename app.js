//app.js
App({
  onLaunch: function () {
  },
  globalData: {
    userInfo: null
  },
  loadFisize() {
    wx.loadFontFace({
      family: 'jxiangli',
      source: 'url("http://pi9osg2q9.bkt.clouddn.com/jxiangli.ttf")',
      success(data) {
        console.log(data)
      }
    })
  }
})