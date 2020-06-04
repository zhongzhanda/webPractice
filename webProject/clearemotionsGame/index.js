function ClearMotionsGame (element) {
  this.init(element);
};
ClearMotionsGame.prototype = {
  init: function (element) {
    let oThis = this;
    this.con = element;
    this.btn = this.con.$(".container").$("button");
    this.getSpan = this.con.$(".goal");
    this.loseSpan = this.con.$(".lose-score");
    this.gameContent = this.con.$(".game-content");
    this.content = this.con.$(".content");
    this.getScore = 0;
    this.loseScore = 0;
    this.speed = 0;
    this.interval = 0;
    this.conWidth = this.gameContent.clientWidth;
    this.conHeight = this.gameContent.clientHeight;
    this.posLeft = 0;
    this.imgNow = null;
    this.interval = 100;

    this.btn.onclick = function () {
      oThis.next();
    };
  },
  createImg: function () {
    let img = new Image(),
        num = Number.parseInt(Math.random()*11 + 1),
        url = "img/" + num + ".png",
        pos = Number.parseInt(Math.random()*(this.conWidth - 120) + 60);
    this.posLeft = pos;
    img.width = 40;
    img.height = 40;
    img.src = url;
    img.style.left = pos + "px";
    img.isOver = false;
    img.isClick = false;
    return img;
  },
  speedInit: function () {
    this.interval = this.conHeight / (20 + this.speed);
    this.speed += 5;
  },
  u2dShake: function () {
    //这个可以通过css属性animation来实现，所以我就用anmation了
    let oThis = this;
    function remove () {
      removeClass(oThis.content, "shake");
    };
    addClass(this.content, "shake");
    setTimeout(remove, 999);
  },
  l2rShake: function () {
    let oThis = this,
        left = this.posLeft - 40,
        right = this.posLeft + 40;
    for (let i = 0; i < 5; i++) {
      setTimeout(function () {
        oThis.imgNow.style.left = left + "px";
      }, 200*i)
      setTimeout(function () {
        oThis.imgNow.style.left = right + "px";
      }, 200*i+100);
    }

  },
  isGameOver: function () {
    this.gameContent.removeChild(this.imgNow);
    if (this.loseScore >= 10) {
      alert("游戏结束");
      this.loseScore = 0;
      this.getScore = 0;
      this.loseSpan.innerHTML = 0;
      this.getSpan.innerHTML = 0;
      this.interval = 100;
    } else {
      this.next();
    }
  },
  next: function () {

    let oThis = this,
        img = this.createImg(),
        top = -40,
        maxTop = this.conHeight - 40;

    this.imgNow = img;

    this.gameContent.appendChild(img);

    if (this.interval !== 10) {
      this.interval -= 10;
    }

    img.style.top = top + "px";

    let timer = setInterval(function () {
      top += 5;
      if (top > maxTop) {
        clearInterval(timer);
        if (!img.isClick) {
          img.isOver = true;
          oThis.u2dShake();
          oThis.loseScore++;
          oThis.loseSpan.innerHTML = oThis.loseScore;
          setTimeout(function () {
            oThis.isGameOver();
          }, 1000);
        }
      } else {
        img.style.top = top + "px";
      }
    }, oThis.interval);

    img.onclick = function (e) {
      if (this.isOver || this.isClick) {
        return false;
      } else {
        this.isClick = true;
        this.src = "img/qq.png";
        oThis.l2rShake();
        setTimeout(function () {
          clearInterval(timer);
        }, 1000);
        oThis.getScore++;
        oThis.getSpan.innerHTML = oThis.getScore;
        setTimeout(function () {
          oThis.isGameOver();
        }, 1000);
      }
    };

    img.ondragstart = function () {
      return false;
    };

  },
};


window.onload = function () {
  var box = $(".wrap");
  
  new ClearMotionsGame(box);
};