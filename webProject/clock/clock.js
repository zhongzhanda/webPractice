function Clock (element) {
  this.init(element);
};

Clock.prototype = {
  init: function (element) {
    let oThis = this;
    this.clock = element;
    this.time = this.clock.$$("img");

    // 对时钟进行初始化
    let date = new Date(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds(),
        arr = [];
    arr.push(Number.parseInt(hours / 10));
    arr.push(hours % 10);
    arr.push(Number.parseInt(minutes / 10));
    arr.push(minutes % 10);
    arr.push(Number.parseInt(seconds / 10));
    arr.push(seconds % 10);
    for (let i = 0; i < 6; i++) {
      this.time[i].src = "img/" + arr[i] + ".png";
    }
    
    // 时钟开始运行
    // 这里不能使用setInterval，因为使用setInterval会导致this丢失
    // setInterval(this.run, 1000);
    this.run();
  },

  run: function () {
    let oThis = this;
    setInterval(function () {
      let seconds,
      // arr = [],
          date = new Date();
  
      seconds = date.getSeconds();    // 获取seconds
      // arr.unshift(seconds % 10);    // 最后一位seconds一定发生变化
      oThis.change(oThis.time[5], seconds % 10);
      // seconds能被10整除的时候，一定发生了进位
      if (seconds % 10 === 0) {
        // arr.unshift(Number.parseInt(seconds / 10));
        oThis.change(oThis.time[4], Number.parseInt(seconds / 10));
        
        // seconds等于0时，一定进位到了minutes
        if (seconds === 0) {
          let minutes = date.getMinutes();
          // arr.unshift(minutes % 10);    // minutes发生进位，则minutes的个位一定会发生变化
          oThis.change(oThis.time[3], minutes % 10);
          // minutes被10整除时，一定发生进位
          if (minutes % 10 === 0) {
            // arr.unshift(Number.parseInt(minutes / 10));
            oThis.change(oThis.time[2], Number.parseInt(minutes / 10));
  
            // minutes等于0时，一定进位到hours
            if (minutes === 0) {
              let hours = date.getHours();
              // arr.unshift(hours % 10);
              oThis.change(oThis.time[1], hours % 10);
  
              if (hours % 10 === 0) {
                // arr.unshift(Number.parseInt(hours / 10));
                oThis.change(oThis.time[0], Number.parseInt(hours / 10));
              }
            }
          }
        }
      }
  
      // 这里是将所有需要变化的位置集中到一起处理，目的是为了减少中间的时间差，让它们的变化尽量同步。
      // 也许没必要，似乎程序的运行速度很快，可能相差并不大
      // 试了一下，好像确实没什么区别
      // let len = arr.length;
      // for (let i = 0; i < len; i++) {
      //   oThis.change(oThis.time[5 - i], arr[len - 1 - i]);
      // }
      
    }, 1000);
  },

  change: function (img, num) {
    img.style.height = "0px";
    // 延时设置图片的路径和恢复原高度，为图片高度从36->0的变化提供时间。
    setTimeout(function () {
      img.src = "img/" + num + ".png";
      img.style.height = "36px";
    }, 200);
    
  },

  test: function () {
    console.log(this.time);
  },
};

window.onload = function () {
  var clock = $("#clock");

  new Clock(clock);
};