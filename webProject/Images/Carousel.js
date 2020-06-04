function Carousel (element) {
  this.pre(element);
};
Carousel.prototype = {
  constructor: Carousel,
  pre: function (element) {
    if (element.className.indexOf("carousel_f") !== -1) {
      return new CarouselF(element);
    }
  },
  init: function (element) {

    /***  以下为一些初始化属性的内容 ***/
    this.content = element;   // 轮播图容器
    this.picCon = this.content.$(".img-list");      // 图片容器
    this.pics = this.picCon.$$("li");       // 图片列表
    this.triggerCon = this.content.$(".trigger");   // 按钮容器
    this.triggers = this.triggerCon.$$("li");     // 按钮列表
    this.dirCon = this.content.$(".dir");     // 方向按钮容器
    if (this.dirCon !== null) {   // 存在方向按钮的情况下
      this.dirl = this.dirCon.$(".dirl");   // 左按钮
      this.dirr = this.dirCon.$("dirr");    // 右按钮
    }
    this.width = this.pics[0].offsetWidth;
    this.height = this.pics[0].offsetHeight;
    this.len = this.pics.length;    // 图片的数量
    this.index = 0;     // 用来记录当前激活的图片是哪个
    this.timer = null;    // 自动轮播的setInterval，是一个逐渐增加的数字，似乎是随机的数字
    this.interval = 1000;     // 自动轮播的间隔，这里先设为1000
    
    // 为每个图片和按钮设置索引值，索引值与其在列表中的索引相同。
    // 主要是用于点击按钮时能知道是要换到哪张图片
    for (let i = 0; i < this.len; i++) {
      this.pics[i] = i;
      this.triggers[i] = i;
    }
    
    /***  初始化属性结束  ***/
    
    /***  为元素绑定事件  ***/
    let oThis = this;
    this.content.onmouseover = function () {      // 这里使用onmouseover这个会冒泡的事件，下面使用onmouseout同理
      // 鼠标移到content上时停止自动轮播
      if (oThis.timer !== null) {
        clearInterval(oThis.timer);
        oThis.timer = null;
      }

      let index;
      this.onclick = function (e) {

        // 点击图片时，切换到相应图片
        // 由于通常情况下图片是一个连接，并且大多轮播图都只会显示一个图片，所以点击图片进行跳转的方式用得不多，这里只是写一下
        // if (e.target.tagName === "IMG") {
        //   index = e.target.parentElement.index;
        // }

        // 点击按钮进行跳转，这是最常用的方式，应该说一定会有
        // 通常情况下只会点击到按钮，所以只需要判定是否为LI即可
        // 不，甚至不需要判定是否为LI，只要获取目标元素的index属性即可
        // if (e.target.tagName === "LI" && e.target.parentElement.hasClass("trigger")) {
        //   index = e.target.index;
        // }
        index = e.target.index;

        // 点击方向按钮进行前后跳转，用的也不多只是写一下
        // if (e.target.tagName === "LI" && e.target.hasClass("dirl")) {
        //   index = oThis.index - 1;
        // }
        // if (e.target.tagName === "LI" &&& e.target.hasClass("dirr")) {
        //   index = oThis.index + 1;
        // }
        
        // 跳转到对应的图片
        // 仅当index是数字时才跳转，数字代表了将要跳转到的图片的索引
        if (typeof index === "number") {
          oThis.next(index);
        }
      };
    };

    this.content.onmouseout = function () {

      // 仅当oThis.timer为null时，设置setInterval
      // 这样做是为了避免重复设置自动轮播
      // 如果不检查null，则当网页刷新，并且鼠标正好处于轮播图中时，当鼠标离开后会设置两个setInterval
      if (oThis.timer === null) {
        oThis.timer = oThis.auto();
      }
    };


    // 其它初始化内容
    // 这里的初始化只是最简单的初始化，对于一些复杂的轮播图，可能还需要一些额外的初始化内容
    if (this.anotherInit) {
      this.anotherInit();
    }

    // 当所有的初始化内容都结束时，开始进行自动轮播
    this.timer = this.auto();
  },

  // 自动轮播
  auto: function () {
    let oThis = this;
    return setInterval(function () {
      oThis.next();
    }, oThis.interval);
  },

  // next实际上是一个对index进行处理的函数
  next: function (index) {
    // 未传入参数时，默认切换到下一张图片
    if (index === undefined) {
      index = this.index + 1;
    }
    // 注意切换到末尾时要回到开头
    if (index >= this.len) {
      index -= this.len;
    }
    // 而切换到开头时要回到末尾
    if (index < 0) {
      index += this.len;
    }

    // 切换动画
    this.change(index);
  },

  // change: function (index) {
  //   /* 这里应有切换动画
  //    * 由于不同的轮播图有不同的动画，所以空着
  //   */
  // },
};

function CarouselF (element) {
  this.init(element);
};
// TODO 不知道是哪里出了问题，CarouselF的原型并没有发生改变
CarouselF.prototype = new Carousel();
CarouselF.prototype.extend({
  constructor: CarouselF,

  // init: Carousel.prototype.init,

  anotherInit: function (element) {
    this.content.style.width = this.width + "px";
    this.content.style.height = this.height + "px";
    if (this.content.hasClass("carousel_f_lr")) {
      this.dir = "left";
      this.distance = this.width;
      this.picCon.width = this.len * this.width + "px";
      this.picCon.heihgt = this.height + "px";
    } else if (this.content.hasClass("carousel_f_tb")) {
      this.dir = "top";
      this.distance = this.pics[0].offsetHeight;
      this.picCon.height = this.len * this.height + "px";
      this.picCon.width = this.width + "px";
    }
  },

  change: function (index) {
    this.picCon.style[this.dir] = this.distance * index + "px";    
    this.triggers[this.index].removeClass("active");
    this.triggers[index].addClass("active");
    this,index  = index;
  },
});