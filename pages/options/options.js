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
    numbers:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.webSocketGame()
    console.log('1321')
    this.setData({
      numbers:getApp().globalData.timeNumber
    })
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
    clearInterval(this.data.timeSetInterval)
    wx.closeSocket()
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.closeSocket()
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
    })
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
    this.data.socket = socket
    this.data.socket.onOpen(function(){
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
        let data = JSON.parse(soketData.data)
        that.data.socket.send({
          data: JSON.stringify({ 'key': 'input' })
        })
        clearInterval(that.data.timeSetInterval)

        that.setData({
          assignment: JSON.parse(soketData.data)
        })
        // console.log(JSON.parse(soketData.data))
        // 接收参数的判断
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
    clearInterval(this.data.timeSetInterval)
    this.data.timeSetInterval = setInterval(function(){
       numbers--
       console.log('定时器')
      getApp().globalData.timeNumber = numbers       
       if(numbers<=0){
        //  为0 挑战成功
         wx.redirectTo({
           url: '/pages/summarize/summarize',
         })
         clearInterval(that.data.timeSetInterval)
         return false;
       }
       that.setData({
         numbers:numbers
       })
     },1000)
  },
  // 断开Socket
  clickSocket(){
    this.timeDown()
    this.data.socket.send({
      data: JSON.stringify({ 'key': 'output' })
    })
    this.setData({
      'assignment.key':false
    })
    return false
    wx.closeSocket()    
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
    })
  },
  // 欣然接受
  clickAccept(){
    let assignment = this.data.assignment
    
    let type = assignment.data.content.type
    console.log('clickAccept')
    this.data.socket.send({
      data:JSON.stringify({'key':'input'})
    })
    console.log(type)

    wx.setStorageSync('assignment', assignment)

    if (type === 'cut'){
      getApp().globalData.cutNumber = parseFloat(getApp().globalData.cutNumber) + 1
      wx.redirectTo({
        url: '/pages/chop/chop',
      })
    } else if (type === 'logic'){
      getApp().globalData.logicNumber = parseFloat(getApp().globalData.logicNumber)+ 1
      wx.redirectTo({
        url: '/pages/logic/logic.js',
      })
    }else{
      getApp().globalData.selectNumber = parseFloat(getApp().globalData.selectNumber)+ 1
      
      wx.redirectTo({
        url: '/pages/answer/answer',
      })
    }
  }
  
})