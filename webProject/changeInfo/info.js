window.onload = function () {
  var dtL = $$("dt"),
      con = $("#container");

  con.onclick = function (e) {
    if (e.target.tagName === "DT") {
      console.log("enheng");
      for (let i = 0; i < dtL.length; i++) {
        removeClass(dtL[i], "active");
      }
      addClass(e.target, "active");
    }
  };
};