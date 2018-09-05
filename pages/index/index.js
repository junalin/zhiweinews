var TYPEINDEX = 0 // 新闻种类在this.data.newsType数组中的位置
var LISTINDEX = 7 //加载新闻列表的数量
Page({
  data:{
    tabs: [
      {text: '国内',type: 'gn',select: 'selected',selectLine: 'selected-line',code: 0}, 
      {text: '国际',type: 'gj',select: '',selectLine: '',code: 1},
      {text: '财经',type: 'cj',select: '',selectLine: '',code: 2},
      {text: '娱乐',type: 'yl',select: '',selectLine: '',code: 3},
      {text: '军事',type: 'js',select: '',selectLine: '',code: 4},
      {text: '体育',type: 'ty',select: '',selectLine: '',code: 5},
      {text: '其他',type: 'other',select: '',selectLine: '',code: 6,}
      ],
    newTypePicURL: '/images/gn-pic.jpg',
    topNews:{},
    newsList:[]
  },
  onLoad(){
    this.getLatestNews(TYPEINDEX, LISTINDEX);
  },
  getLatestNews(typeIndex, listIndex, callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list', 
      data: {"type": this.data.tabs[typeIndex].type },
      success: res=>{
        let result=res.data.result
        this.setNewsData(result,listIndex)
      }
    })
  },
    setNewsData(result,listIndex){
      let topNews={}
      let newsList=[]
      let listLength=0
      if(listIndex>result.length){
        listLength=result.length
      }
      else{listLength=listIndex}
      topNews=result[0]
      console.log(topNews)
      topNews.date = topNews.date.slice(0, 10)
      for(var i=1;i<=listLength;++i){
        let content=result[i]
          content.date=content.date.slice(0,10)
          newsList.push(content)
      }
      this.setData({
        topNews:topNews,
        newsList:newsList
      })
    }
})