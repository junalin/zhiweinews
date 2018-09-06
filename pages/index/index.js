var TYPEINDEX = 0 // 新闻种类在this.data.newsTabs数组中的位置
var LISTNUM = 7 //加载新闻列表的数量
Page({
  data:{
    newsTabs: [
      {text: '国内',type: 'gn',select: 'selected',selectLine: 'selected-line',code: 0}, 
      {text: '国际',type: 'gj',select: '',selectLine: '',code: 1},
      {text: '财经',type: 'cj',select: '',selectLine: '',code: 2},
      {text: '娱乐',type: 'yl',select: '',selectLine: '',code: 3},
      {text: '军事',type: 'js',select: '',selectLine: '',code: 4},
      {text: '体育',type: 'ty',select: '',selectLine: '',code: 5},
      {text: '其他',type: 'other',select: '',selectLine: '',code: 6}
      ],
    newTypePicURL: '/images/gn-pic.jpg',
    top:{},
    newsList:[]
  },
  onLoad(){
    this.getLatestNews(TYPEINDEX);
  },
  getLatestNews(typeIndex, callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list', 
      data: { "type": this.data.newsTabs[typeIndex].type },
      success: res=>{
        let result=res.data.result
        this.setNewsData(result,LISTNUM)
      }
    })
  },
    setNewsData(result,listNum){
      let newsList=[]
      let listLength=0
      if(listNum > result.length){
        listLength = result.length
      }
      else{listLength = listNum}
      for(var i=1 ; i<=listLength ; ++i){
          let temp=result[i]
          temp.date = temp.date.slice(0,10)
          newsList.push(temp)
      }
      let top = {}
      top = result[0]
      top.date = top.date.slice(0, 10)
      console.log(top)
      this.setData({
        top:top,
        newsList:newsList
      })
    },
    onNewsTabsTap(event) {
      LISTNUM = 7
      TYPEINDEX = event.currentTarget.dataset.type
      this.setNewsTabsStyle()
      this.getLatestNews(TYPEINDEX, LISTNUM)
    },
    setNewsTabsStyle() {
      let newsTabs = []
      for (let i = 0; i < 7; i++) {
      let temp = this.data.newsTabs[i]
      temp.select = ''
      temp.selectLine = ''
      newsTabs.push(temp)
      }
      newsTabs[TYPEINDEX].select = 'selected'
      newsTabs[TYPEINDEX].selectLine = 'selected-line'
      this.setData({
        newsTabs: newsTabs
      })
    },
})