// pages/logic/logic.js.js
Page({

      /**
       * 页面的初始数据
       */

      data: {
        buttonImage: {
          "name": "逻辑卡片",
          "content": {
            "title": "老板提了个p-2的需求",
            "tpe": "logic",
            "select": [{
                "key": "D",
                "number": "A"
              },
              {
                "key": "C",
                "number": "B"
              },
              {
                "key": "B",
                "number": "C"
              },
              {
                "key": "A",
                "number": "D"
              }
            ],
            "number": 10
          },}
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function(options) {
          let assignment = wx.getStorageSync('assignment')
          console.log(assignment)
          this.setData({
            buttonImage: assignment.data
          })

        },

        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function() {

        },

        /**
         * 生命周期函数--监听页面显示
         */
        onShow: function() {

        },

        /**
         * 生命周期函数--监听页面隐藏
         */
        onHide: function() {

        },

        /**
         * 生命周期函数--监听页面卸载
         */
        onUnload: function() {

        },

        /**
         * 页面相关事件处理函数--监听用户下拉动作
         */
        onPullDownRefresh: function() {

        },

        /**
         * 页面上拉触底事件的处理函数
         */
        onReachBottom: function() {

        },

        /**
         * 用户点击右上角分享
         */
        onShareAppMessage: function() {

        },
        clickPoint(event) {
          console.log(event)
          let that = this
          let itemlist = this.data.buttonImage.content.select
          let index = event.currentTarget.dataset.index
          let attr = []

          for(let i = 0; i<itemlist.length;i++){
            attr.push(itemlist[i].key)
          }
          wx.showActionSheet({
            itemList: attr,
            success(res) {
              let attrKey = attr[res.tapIndex]
              console.log(attrKey)
              let data = {}
              data['buttonImage.content.select[' + index +'].clickKey'] = attrKey
              that.setData(data)
              let isKey = that.isKeyNumber()
              if(isKey!=false){
                // 查询是否对
                wx.showToast({
                  title: '恭喜您得了' + that.isSubject() + '分',
                })
                setTimeout(function(){
                  wx.redirectTo({
                    url: '/pages/options/options',
                  })
                },1500)
                console.log(that.isSubject())
                console.log('查询答案')
              }
            },
            fail(res) {
              console.log(res.errMsg)
            }
          })
        },
        isKeyNumber(){
          let listKey = this.data.buttonImage.content.select
          for(let i = 0;i<listKey.length;i++){
            let item = listKey[i]
            if (!item.clickKey){
              return false
            }
          }
        },
        // 判断是否全对
        isSubject(){
          let data = this.data.buttonImage.content.select
          let yes = 0;
          let catchNumber = 0
          for(let i = 0;i<data.length;i++){
              if(data[i].clickKey == data[i].number){
                  yes++
              }else{ 
                catchNumber++
              }
          }
          // return { yesNumber: yes, catchNumber:catchNumber}
          return yes  * 10 + catchNumber * 5

        }
      })