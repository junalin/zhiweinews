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
    news:[1,2,3,4,5,6,7]
  },
  onLoad(){
    this.getLatestNews();
  },
  getLatestNews(){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list', 
      data: {
        type: 'gn'
      },
      success:  res=>{
        console.log(res)
      }
    })
  }
})