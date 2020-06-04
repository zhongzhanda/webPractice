### 简单描述
这是一个简单的数字时钟，每秒更新一次。
  
### 程序信息
1. 根据观察到的来说，就是一个数字时钟。
2. 数字使用的是图片。
3. 每秒更新一次。
4. <s>更新时数字的动画是翻转，翻转到水平时改变数字。</s>通过查看原作发现并非是翻转，而是将图片高度减小到0,然后重新恢复到正常高度，<s>同时图片开启定位，top同时发生改变，用于将图片始终垂直居中显示</s>没必要使用定位，只需要设置图片的`vertical-align: middle` 就行了。
5. 只有发生改变的数字才会发生翻转
6. 原作中的翻转动画似乎是完全通过JS来实现的。我是通过JS + CSS中的transition来实现：transition的对象是height，时间是200ms；而JS先将图片高度变为0,200ms以后修改图片路径，并重新设置图片高度为36px。
7. 网页开的时间长了之后，原作的数字图片的长度会发生奇怪的拉伸，不知道是浏览器的问题还是代码有BUG。

### 程序步骤
首先是初始化，最初必定会对clock进行显示，以 HH:MM:SS 的方式显示，一共有6位数字  
接下来每秒都要对需要变化的数字进行变化  
计算变化的位数想到两种方式：  
  一种是将得到的时间转化为“HHMMSS”的字符串形式，然后从字符串尾部开始比较不同的部分，不同的位需要进行变化，相同的位以及前面的位都不需要变化。  
  另一种是获取数字形式的 “SS”，计算是否需要进位， 如果需要则计算是否需要进位到 “MM”，依次类推。  
图片变化是同时发生变化，所以是否需要先将需要变化的位数储存起来，然后一起进行变化？或者是计算一位就变化一位？  
<!-- 这个程序的难点应该在两个地方：
1. 从实际时间到用图片展示
2. 时间变化时，图片的变化 -->
  
### 伪步骤
```JS
// 获取当前时间信息
function getTime () {
  let date, seconds, minutes, hours;

  date = new Date();    // 获取当前时间

  seconds = date.getSeconds();    // 获取当前秒数


  // if (seconds === 0) {    // 当秒数为0时，分钟数也会发生变化
  //   minutes = date.getMinutes();    // 获取当前分钟数
  //   animation(seconds_10);      // 秒数十位需要变化
  //   animation(seconds_0);       // 秒数个位需要变化

  // } else if (seconds % 10 === 0) {    // 秒数不为零，并且秒数尾数为0时
  //   animation(seconds_10);      // 秒数十位需要变化
  //   animation(seconds_0);       // 秒数个位需要变化

  // } else {        // 秒数不为0,并且尾数不为0时，只会是秒数的尾数发生变化
  //   animations(seconds_0);    // 秒数个位数需要变化
  // }



  // // 秒数为0时,触动分钟数变化，即会获取分钟数
  // if (minutes !== undefined) {    // 获取了分钟数才会进行下面的判断

  //   //接下来的判断和秒数类似
  //   if (minutes === 0) {
  //     hours = date.getHours();
  //     animation(minutes_10);
  //     animation(minutes_0);
  //   } else if (minutes % 10 === 0) {
  //     animation(minutes_10);
  //     animation(minutes_0);
  //   } else {
  //     animation(minutes_0);
  //   }
  // }


  // // 分钟数为0时，触动小时数发生变化
  // if (hours !== undefined) {
    
  //   if (hours % 10 === 0) {
  //     animation(hours_10);
  //     ainmation(hours_0);
  //   } else {
  //     animation(hour_0);
  //   }
  // }


  // 改进

  animation(seconds_0);   // seconds个位数必然会发生变化
  
  // seconds个位数为0时，十位数必然会发生变化
  if (seconds % 10 === 0) {
    animation(seconds_10);    // seconds十位数发生变化

    // seconds 等于 0 时， 分钟数必然会发生变化
    // if (seconds === 0) {
    //   minutes = date.getMinutes();
    // }
    (seconds === 0) && (minutes = date.getMinutes());
  }



  // 分钟数发生变化时
  if (minutes !== undefined) {
    animation(minutes_0);
    
    if (minutes % 10 === 0) {
      animation(minutes_10);

      // if (minutes === 0) {
      //   hours = date.getHours();
      // }
      (minutes === 0) && (hours = date.getHours());
    }
  }

  if (hours !== undefined) {
    animation(hours_0);

    // if (hours % 10 === 0) {
    //   animation(hours_10);
    // }
    (hours % 10 === 0) && animation(hours_10);
  }
};

// 将时间转换为图片
// 时间是个位数时只有一位，转换成图片显示时需要补上丢失缺少的0
// 要注意只有变换数字的图片才要发生改变
// 首先是seconds的个位数必定发生改变
// 其次，当seconds的个位数变为0时，seconds的十位数也必定发生改变
// 接着，当seconnds的十位数变为0时，minutes的个位数发生改变
// 以此类推
function time2img () {
  if (hours < 10)
};
```
  

### 总结
1. 伪步骤不需要太详细，只需要有大概的流程就可以了。有了大概的流程就开始写代码，具体的细节遇到后再考虑。  
2. 写的程序当中用到了setInterval，并且函数用的是this.run，结果传入之后丢失了this，最后只好把setInterval放到this.run中。以后遇到setInterval和setTimeout也需要考虑这个问题。（不知道箭头函数能不能解决this丢失的问题？）
3. 使用第二种方法来判断哪几位需要进位，而且为了减少性能要求（自我感觉应该较少了性能要求吧），嵌套了很多层单独的if语句，就看起来比较丑了，是否能较少性能需求也不太确定了。
