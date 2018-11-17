// pages/options/options.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonImage:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let assignment = wx.getStorageSync('assignment')
    console.log(assignment)
    this.setData({
      buttonImage: assignment.data
    })
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
  clickButton(data){
    console.log(data)
    let item = data.currentTarget.dataset.item
    let numbers = item.number
    console.log(item.number)
    wx.showModal({
      title: '提示',
      content: '增加了' + numbers +'分',
      showCancel:false,
      success(res) {
        if (res.confirm) {
          getApp().globalData.points = parseFloat(getApp().globalData.points)  + parseFloat(numbers)
          console.log(getApp().globalData)
          wx.reLaunch({
            url: '/pages/options/options'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})