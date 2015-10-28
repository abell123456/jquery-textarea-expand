# jquery-textarea-expand
textarea输入框随着输入内容增多高度自适应的jquery插件。

JS 说明
-----------------------------------

### 引用
需要在package.json的dependencies中加入该组件

### 配置项
``` javascript
$('#element').textareaExpand(min,max,adjust);
```
* min

{Number} 可选。指定最小高度

* max

{Number} 可选。指定最大高度，超过该高度值时会出现滚动条

* adjust

{Function} 可选。每次输入内容后的回调
