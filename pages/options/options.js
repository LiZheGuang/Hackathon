// pages/options/options.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:"",
    assignment:{
      data:{
        name:"正常开发中",
        content:{
          title: "你正在随心所欲的写着没有程序的BUG~"        
        }
      }
    },
    numbers:50
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.webSocketGame()
    console.log('1321')
    this.getUserInfo()
    this.timeDown()
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
  webSocketGame() {
  
    const socketOpen = false
    const socketMsgQueue = []
    let that = this
    let socket =  wx.connectSocket({
        url: 'ws://10.8.203.182:8080',
        success(data){
          console.log('成功')
        }
      })

    socket.onOpen(function(){
      sendSocketMessage(JSON.stringify({ key: 'name', userInfo: that.data.userInfo.userInfo }))
      onMessage()
    })

    
    // wx.onSocketOpen(function (res) {
    //   sendSocketMessage(JSON.stringify({ key: 'name', userInfo: that.data.userInfo.userInfo }))
    // })

    function sendSocketMessage(msg) {
      socket.send({
        data: msg
      })
    }
    
    function onMessage(){
      socket.onMessage((soketData)=>{
        console.log(soketData)
        console.log('接受参数')
        that.setData({
          assignment: JSON.parse(soketData.data)
        })
        console.log(JSON.parse(soketData.data))
      })
    }
  },
  getUserInfo(){
    let that = this
    wx.getUserInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          userInfo:res
        })
        that.webSocketGame()
      }
    })
  },
  timeDown(){
    let numbers = this.data.numbers
    let that = this
     let time = setInterval(function(){
       numbers--
       that.setData({
         numbers:numbers
       })
     },1000)
  },
  // 断开Socket
  clickSocket(){
    wx.closeSocket()
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
    })
  }
  
})