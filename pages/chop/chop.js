// pages/chop/chop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    numbers:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // setTimeout(function(){
    //   wx.navigateBack({
    //     delta: 1
    //   })
    // },5000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  clickChop(){
    console.log('21312')
    let numbers = this.data.numbers
    numbers++
    if(numbers >= 100){
      getApp().globalData.points = parseFloat(getApp().globalData.points) + parseFloat(numbers)
      wx.showModal({
        title: '提示',
        content: '成功砍掉需求',
        showCancel:false,
        success(res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '/pages/options/options',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return false
    }
    this.setData({
      numbers: numbers
    })
  }
})