function Clocks (element) {
  this.init(element);
};

Clocks.prototype = {
  init: function (element) {

    this.clock = element;
    this.clock.style.opacity = "0";
    this.sec = this.clock.$(".second-pointer");
    this.min = this.clock.$(".minute-pointer");
    this.hour = this.clock.$(".hour-pointer");
    this.seconds = undefined;

    let _Lis = this.clock.$$("li");
        // date = new Date(),
        // hours = date.getHours() % 12,
        // minutes = date.getMinutes(),
        // seconds = date.getSeconds();

    for (let i = 0; i < 60; i++) {
      _Lis[i].style.transform = "rotate(" + 6 * i + "deg)";
    }

    // this.secDeg = seconds * 6;
    // this.minDeg = (minutes + seconds / 60) * 6;
    // this.hourDeg = (hours + minutes / 60 + seconds / 3600) * 30;

    // this.sec.style.transform = "rotate(" + this.secDeg + "deg)";
    // this.min.style.transform = "rotate(" + this.minDeg + "deg)";
    // this.hour.style.transform = "rotate(" + this.hourDeg + "deg)";
    
    this.run();
  },

  run: function () {
    let oThis = this;
    setInterval(function () {
      let date = new Date(),
          seconds = date.getSeconds();
      if (oThis.seconds === undefined || oThis.seconds !== seconds) {
        let hours = date.getHours() % 12,
            minutes = date.getMinutes(),
            secDeg = seconds * 6,
            minDeg = (minutes + seconds / 60) * 6,
            hourDeg = (hours + minutes / 60 + seconds / 3600) * 30;

        oThis.sec.style.transform = "rotate(" + secDeg + "deg)";
        oThis.min.style.transform = "rotate(" + minDeg + "deg)";
        oThis.hour.style.transform = "rotate(" + hourDeg + "deg)";
        oThis.seconds === undefined && (oThis.clock.style.opacity = "1");
        oThis.seconds = seconds;
      }

 
      // console.time("label");
      // oThis.secDeg += 6;
      // oThis.minDeg += 0.1;
      // oThis.hourDeg += (0.1 / 12);
      // (oThis.secDeg >= 360) && (oThis.secDeg = 0);
      // (oThis.minDeg >= 360) && (oThis.minDeg = 0);
      // (oThis.hourDeg >= 360) && (oThis.hourDeg = 0);
      // oThis.sec.style.transform = "rotate(" + oThis.secDeg + "deg)";
      // oThis.min.style.transform = "rotate(" + oThis.minDeg + "deg)";
      // oThis.hour.style.transform = "rotate(" + oThis.hourDeg + "deg)";
      // console.timeEnd("label");
    }, 200);
  },
}


window.onload = function () {
  var clock = $("#clocks");
  new Clocks(clocks);
};