window.onload = function () {
  var nav = $("#nav"), 
      sBtn = nav.$$("span"),
      lists = $$(".list");

  for (let i = 0; i < sBtn.length; i++) {
    sBtn[i].index = i;
  }

  nav.onclick = function (e) {
    if (e.target.tagName === "SPAN") {
      for (let i = 0; i < sBtn.length; i++) {
        removeClass(sBtn[i], "active");
        lists[i].style.display = "none";
      }
      addClass(e.target, "active");
      lists[e.target.index].style.display = "block";
    }
  };
};
