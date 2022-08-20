//先写逻辑 再注册
export const imgError = {
  inserted: function (dom, options) {
    // console.log(dom); //指令用在那个标签上,就显示哪个标签
    // console.log(options); //对当前指令的描述 指令的名称 表达式 表达式对应的值  里面的value是指令后面赋的值
    //图片加载失败 触发 img的onerror事件
    dom.onerror = function () {
      //给img设置一个默认图片
      dom.src = options.value;
    };
  },
};

// export const color = {
//     inserted(dom, options){
// dom.style.color=options.value
//     }
// }
