### 简单描述
1. 鼠标移入图片时，图片右侧展开一个详细信息的方框。
2. 详细信息框是从左上角开始展开至最大。
3. 展开的同时边框变粗，颜色也改变。
4. 最终展开之后图片和信息框看起来就是一个整体的形状（因为图片右侧的那个边框被遮住了）。
  

### 简单分析
1. 首先是排版，将详细信息框定位到图片右侧。
2. 其次是边框的遮盖，信息框遮盖容器的右边框，而图片遮盖信息框左边框上半部分。
3. 最后是展开时的动画效果。  
  

### 动画效果分析 
1. 我想做到的效果是信息框逐渐扩展到图片高度的时间段，图片右侧的边框随着信息框的逐渐扩大而逐渐消失。当信息框扩大到图片高度后，边框变为2px，颜色也改变，然后信息框继续扩展到最大。  
  - 这个效果的话信息框主要是有两个阶段的效果，一个是信息框的扩展，另一个是边框的变化，这两个变化不是同步的。  
  - 如果使用transition，那只能控制一个效果，另一个效果好像没法控制。  
  - 如果使用animation，那有个问题就是animation只是一个动画效果，是一个过程，不能保留动画最后的状态。  
  - 如果使用JS进行控制，一个是比较繁琐，另一个是，如果鼠标移入后又马上移出，移入的动画需要暂停，然后移出动画要从动画停止的地方开始逆转。  
    我想到的一个方法是，将动画步骤剪成很多片段，然后将这些片段放入一个数组，通过一个公用指针读取并储存片段。移入动画从头部读取到尾部，移出动画从当前指针位置处读取到头部。  
2. 第二个问题：信息框显示时会遮住后面的图片，也会遮住容器的右边框，所以在z轴上的位置会比较靠上；然后该信息框的图片还需要处于信息框上部来遮住它的边框。然后鼠标没有移入的时候，并且信息框宽高缩小到0时，要么边框也为0,要么边框被图片遮住。  
  - 如果信息框的边框缩小到0,那么需要使用JS来控制。
  - 如果信息框的边框最后被图片遮住，那么信息框的定位需要向左1px，同时在默认情况下，图片的z-index值要大于信息框的。
  - 在鼠标移入移出前后，信息框的z-index会发生改变，图片的z-index值也要随之发生改变。

以上的两个想法都难以实现。如果使用transition的动画间隔0s加上延时间隔，配合animation动画也许可以达到这个效果。  
transition只是勉强做到了展开动画的效果，闭合效果还没有什么头绪。  
<!-- TODO 闭合效果，完善展开效果 -->

  
如何让边框在指定位置发生变化，并且保证信息框在完全消失之前都处于后面的图片之上，是两个难点。