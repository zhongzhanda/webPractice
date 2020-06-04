这是一个单个选项，反选，全选的题目。  
  
主要逻辑是：
1. 单个选项触发点击事件时，需要检查全选按钮是否需要改变状态。
2. 全选按钮触发点击事件时，单个选项全部反选，然后需要检查全选按钮是否需要改变状态。
3. 全选按钮触发点击事件时，全选按钮状态改变，所有单个选项的状态变为和全选按钮状态相同。
4. 全选按钮状态改变，则“全选/全不选”也要做相应改变。
  
```flow
st=>start: 点击事件
ed=>end: 结束
cond1=>condition: 全选选项触发点击事件？
cond2=>condition: 反选按钮触发点击事件？
cond3=>condition: 单选选项触发点击事件？
cond4=>condition: 全选按钮是否选中？
cond5=>condition: 是否所有单选选项都被选中
cond6=>condition: 其它元素触发点击事件
op1=>operation: 将所有单选选项状态变为和全选选项相同状态
op2=>operation: 将所有单选按钮状态反转
op3=>operation: 将“全选/全不选”选项的文字变为“全不选”
op4=>operation: 将“全选/全不选”选项的文字变为“全选”
op5=>operation: 全选按钮变为选中状态
op6=>operation: 全选按钮变为取消选中状态

st->cond1(yes,right)->op1->cond4(yes, right)->op3->ed
cond4(no)->op4->ed
cond1(no)->cond2(yes, right)->op2->cond5(yes, right)->op5->cond4
cond5(no)->op6->cond4
cond2(no)->cond3(yes, right)->cond5
cond3(no)->cond6(yes, right)->end
cond6(no)->end
```

```flow
st=>start: 开始
e=>end: 结束:>http://https://segmentfault.com/blog/ingood
c1=>condition: A
c2=>condition: B
c3=>condition: C
io=>inputoutput: D 
st->c1(no)->e
c2(no)->e
c3(no)->e
c1(yes,right)->c2(yes,right)->c3(yes,right)->io
io->e
```