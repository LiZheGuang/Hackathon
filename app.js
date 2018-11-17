//app.js
App({
  onLaunch: function () {
  },
  globalData: {
    userInfo: null,
    points:0,
    alwaysNumber:50,
    timeNumber:50,
    cutNumber:0,
    logicNumber:0,
    selectNumber:0


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