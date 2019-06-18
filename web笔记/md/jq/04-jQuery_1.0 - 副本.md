---
学习目标:
  - 掌握编程jQuery的基本使用
  - 掌握jQuery插件的使用
  - 能够开发jQuery插件
  - 选择器、属性操作、样式操作、节点操作、动画、事件、插件
typora-copy-images-to: media
---

# jQuery

## jQuery简介

### JavaScript库的概念

JavaScript开发的过程中，处理浏览器的兼容很复杂而且很耗时，于是一些封装了这些操作的库应运而生。这些库还会把一些常用的代码进行封装。

把一些常用到的方法写到一个单独的js文件，使用的时候直接去引用这js文件就可以了。（animate.js、common.js）

常见的JavaScript 库 - jQuery、Prototype、MooTools。其中jQuery是最常用的一个

jQuery其实就是一个js文件，里面封装了一大堆的方法方便我们的开发，其实就是一个加强版的common.js，因此我们学习jQuery，其实就是学习jQuery这个js文件中封装的一大堆方法。

```
document.getElementByTagName  ----querySelector都是获取标签，但左为实时的，右为不是
		.getElementById ---只有它是单独的，不是类数组，其他都是类数组
		.getElementByClassName ---类名，即class属性
		.getElementByName ---标签里的name属性
		.createElement('')
		.createAttribute('')--也可以用js的setAttribute方法
```

### jQuery的优点好处

```
jQuery设计的宗旨是'Write Less，Do More'，即倡导写更少的代码，做更多的事情。它封装JavaScript常用的功能代码，提供一种简便的操作，优化HTML文档操作、事件处理、动画设计和Ajax交互。
jQuery的核心特性可以总结为：具有独特的链式语法和短小清晰的多功能接口；具有高效灵活的css选择器，并且可对CSS选择器进行扩展；拥有便捷的插件扩展机制和丰富的插件。jQuery兼容各种主流浏览器。
极大地简化了 JavaScript 编程。
```

### jQuery的版本

```
jQuery版本有很多，分为1.x 2.x 3.x

1.x版本：能够兼容IE678浏览器
2.x版本：不兼容IE678浏览器
1.x和2.x版本jquery都不再更新版本了，现在只更新3.x版本。
3.x版本：不兼容IE678，更加的精简（在国内不流行，因为国内使用jQuery的主要目的就是兼容IE678）

国内多数网站还在使用1.x的版本
```
[jQuery官网](http:// jquery.com)


### 体验jQuery

案例：让div显示与设置内容

使用JavaScript开发过程中，有许多不便之处

```javascript
-查找元素的方法太少，麻烦。
-遍历伪数组很麻烦，通常要嵌套一大堆的for循环。
-有兼容性问题。
-想要实现简单的动画效果，也很麻烦
-代码冗余。
```

```javascript
$(document).ready(function () {
    $('#btn1').click(function () {
      	// 隐式迭代：偷偷的遍历，在jQuery中，不需要手动写for循环了，会自动进行遍历。
        $('div').show(200);
    });

    $('#btn2').click(function () {
        $('div').text('我是内容');
    });
});
```

优点总结：

```javascript
-查找元素的方法多种多样，非常灵活
-拥有隐式迭代特性，因此不再需要手写for循环了。
-完全没有兼容性问题。
-实现动画非常简单，而且功能更加的强大。
-代码简单、粗暴。
```

### jQuery中顶级对象

jQuery中的顶级对象是$或jQuery

```javascript
获取jQuery对象
入口函数
高级功能
```

注意：jQuery中的$和JQuery关键字本身为同一对象；

### jQuery中页面加载事件(加载其他以jQ为基础的插件时要先引用jQ)

使用jQuery的三个步骤：

```javascript
引入jQuery文件
入口函数
功能实现
```

关于jQuery的入口函数：

```javascript
// 第一种写法
$(document).ready(function() {
	//$(document).ready()是DOM结构绘制完毕就执行，不必等到加载完毕
  	//$(window).load()与window.onload=function(){}都是必须等到页面内包括图片得所有元素加载完毕才能执行，前者能同时加载多个函数
});
// 第二种写法
jQuery(function(){

});
// 第三种写法
$(function() {
	
});
```

jQuery入口函数与window.onload的对比

```javascript
window.onload要等到页面中所有资源（包括图片、文件）加载完成才开始执行。
jQuery的入口函数只会等待文档树加载完成就开始执行，并不会等待图片、文件的加载。放在body前头才要入口函数，要是放在body末尾即文档树已加载完成，不用入口函数
```

### jQuery对象和DOM对象

#### jQuery对象和DOM对象的区别

#### DOM对象

```
用原生JavaScript获取的DOM对象
	通过document.getElementById()  反馈的是元素(带有该id的DOM对象)
以下这些都是 伪数组(集合)，集合中的每一个对象是DOM对象
	通过document.getElementsByTagName()获取标签（元素）名的DOM对象
	document.querySelector() 获取选择器
	documet.getElemnetsByClassName() 获取的是带有该类名的DOM对象
```

#### jQuery对象

```
jQuery对象用$()的方式获取的对象，当$(js的dom对象)时为jq对象（js转jq）
jQuery对象又可以叫做包装集(包装的DOM对象的集合)，当jQ对象使用数组确定某个元素时，这时的对象为dom元素对象（jq转js）
```

### jQuery对象和DOM对象的相互转换

```javascript
jQuery对象转换成（等同）DOM对象(jq转js)：   
	jQuery对象.get(索引值); 
	jQuery对象[索引值] 
    //jQuery对象是包装集(集合)，从集合中取数据可以使用索引的方式
DOM对象转换成jQuery对象（js转jq）：   
	$(DOM对象) 只有这一种方法;
```

#### 区别

jQuery对象不能使用DOM对象的成员（属性和方法），DOM对象不能使用jQuery对象的（属性和方法）

```javascript
// DOM对象
var box = document.getElementById('box');
// 错误
box.text('hello');
// 正确
box.innerText = 'hello';

// jQuery对象，jQuery对象加前缀$，用以区分DOM对象
var $box = $('#box');
// 错误
$box.innerText = 'hello';
// 正确
$box.text('hello');
```

### 案例

- 开关灯 [01-开关灯.html]

```javascript
// 仅仅演示对象之间的转换，代码不推荐这么写
jQuery(document).ready(function () {
  // 获取元素；
  var inpArr = document.getElementsByTagName('input');
  // 获取第一个按钮，然后绑定事件；
  $(inpArr[0]).click(function () {
    // 设置body的背景色
    $('body')[0].style.background = '#fff';
  });
  // 获取第二个按钮，然后绑定事件；
  $(inpArr[1]).click(function () {
    // 设置body的背景色
    $('body').get(0).style.background = '#000';
  });
});
	$('body').css('background','#000');
	$('body').css({'background':'#000','height':100});
```

## 选择器

jQuery选择器是jQuery为我们提供的一组方法，让我们更加方便的获取到页面中的元素。注意：jQuery选择器返回的是jQuery对象。

jQuery选择器有很多，基本兼容了CSS1到CSS3所有的选择器，并且jQuery还添加了很多更加复杂的选择器。（查看jQuery文档）

jQuery选择器虽然很多，但是选择器之间可以相互替代，就是说获取一个元素，你会有很多种方法获取到。所以我们平时真正能用到的只是少数的最常用的选择器。



### jQuery基本选择器

| 名称    | 用法                 | 描述                     |
| ----- | ------------------ | :--------------------- |
| ID选择器 | $('#id');          | 获取指定ID的元素              |
| 类选择器  | $('.class');       | 获取同一类class的元素          |
| 标签选择器 | $('div');          | 获取同一类标签的所有元素           |
| 并集选择器 | $('div,p,li');     | 使用逗号分隔，只要符合条件之一就可。     |
| 交集选择器 | $('div.redClass'); | 获取class为redClass的div元素 |

- 总结：跟css的选择器用法一模一样。



### jQuery层级选择器

| 名称    | 用法            | 描述                              |
| ----- | :------------ | :------------------------------ |
| 子代选择器 | $('ul > li'); | 使用-号，获取儿子层级的元素，注意，并不会获取孙子层级的元素  |
| 后代选择器 | $('ul li');   | 使用空格，代表后代选择器，获取ul下的所有li元素，包括孙子等 |

- 跟CSS的选择器一模一样。



### jQuery过滤选择器

- 这类选择器都带冒号:

| 名称         | 用法                                       | 描述                                 |
| ---------- | ---------------------------------------- | :--------------------------------- |
| index      | $obj.index();                            | 该jq对象中的第一个dom对象在其同级元素之间的索引值        |
| :eq（index） | $('li:eq(2)').css('color', 'red');$ 正确 ('li')[2].css('color', 'red');为错误 | 获取到的li元素中，选择索引号为2的元素，索引号index从0开始。 |
| :odd       | $('li:odd').css('color', 'red');         | 获取到的li元素中，选择索引号为奇数的元素              |
| :even      | $('li:even').css('color', 'red');        | 获取到的li元素中，选择索引号为偶数的元素              |



### jQuery筛选选择器(方法)

- 筛选选择器的功能与过滤选择器有点类似，但是用法不一样，筛选选择器主要是方法。

| 名称                 | 用法                      | 描述                                       |
| ------------------ | ----------------------- | :--------------------------------------- |
| children(selector) | $('ul').children('li')  | 相当于$('ul>li')，子类选择器，可以指定特定元素             |
| find(selector)     | $('ul').find('li');     | 相当于$('ul li'),后代选择器(很消耗性能，不推荐)           |
| siblings(selector) | $('#first').siblings(); | 查找除自身以外的同级元素，可以指定特定元素。                   |
| parent()           | $('#first').parent();   | 查找父级元素，可以指定特定元素                          |
| eq(index)          | $('li').eq(2);          | 相当于$('li:eq(2)'),index从0开始               |
| next()             | $('li').next()          | 找下一个同级元素，可以指定特定元素，例($('li').next('div')) |
| prev()             | $('li').prev()          | 找上一个同级元素，原理同上                            |

### 案例

- 鼠标放上突出展示  [02-突出展示.html]
- 鼠标进入高亮显示 [03-鼠标进入高亮显示.html]
- 下拉菜单 [04-下拉菜单.html]
- 手风琴 [05-手风琴.html]
- 淘宝服饰精品 [06-淘宝服饰精品.html]

## jQuery操作样式

### CSS操作

- 功能：设置或者修改样式，操作的是style属性。

- 操作单个样式

```javascript
// name：需要设置的样式名称
// value：对应的样式值
$obj.css(name, value);
// 使用案例
$('#one').css('background','gray');// 这里的属性必须是字符串（引号），属性值可为数字
```

- 设置多个样式

```javascript
// 参数是一个对象，对象中包含了需要设置的样式名和样式值
$obj.css(obj);
// 使用案例
$('#one').css({
    'background':'gray',
    'width':'400px',//  width:400,
    'height':'200px'//  height:200
});//这里的属性不用引号也可以，属性值可为数字也可为字符串要注意数值的单位
```

- 获取样式

```javascript
// name:需要获取的样式名称
$obj.css(name);
// 案例
$('div').css('background-color');
```

注意：获取样式操作只会返回第一个元素对应的样式值。

隐式迭代：

1. 设置操作的时候，如果是多个元素，那么给所有的元素设置相同的值
2. 获取操作的时候，如果是多个元素，那么只会返回第一个元素的值。

### class操作（参数为可选）

- 添加样式类

```javascript
// name：需要添加的样式类名，注意参数不要带点.
$obj.addClass(name);
// 例子,给所有的div添加one的样式。
$('div').addClass('one');
//js原生-----add("类名")
```

- 移除样式类

```javascript
// name:需要移除的样式类名
$obj.removeClass('name');
// 例子，移除div中one的样式类名
$('div').removeClass('one');

又或者------------$('div').attr('class','')
又或者jq和js原生都能使用的---$('div').className=''
```

- 判断是否有某个样式类

```javascript
// name:用于判断的样式类名，返回值为true false
$obj.hasClass(name)
// 例子，判断第一个div是否有one的样式类
$('div').hasClass('one');
```

- 切换样式类

```javascript
// name:需要切换的样式类名，如果有，移除该样式，如果没有，添加该样式。
$obj.toggleClass(name);
// 例子
$('div').toggleClass('one');
```

### 案例

- tab栏切换案例 [07-tab栏切换.html]

## jQuery动画

- jQuery提供了三组基本动画，这些动画都是标准的、有规律的效果，jQuery还提供了自定义动画的功能。
- 演示动画效果  [08-演示jQuery动画（animate）.html]

### 三组基本动画

- 显示(show)与隐藏(hide)是一组动画：
- 滑入(slideUp)与滑出(slideDown)与切换(slideToggle)，效果与卷帘门类似
- 淡入(fadeIn)与淡出(fadeOut)与切换(fadeToggle)

```javascript
$obj.show([time], [callback]);
// speed(可选)：动画的执行时间
	 // 1.如果不传，就没有动画效果。如果是slide和fade系列，会默认为normal
	 // 2.毫秒值(比如1000),动画在1000毫秒执行完成(推荐)
     // 3.固定字符串，slow(200)、normal(400)、fast(600)，如果传其他字符串，则默认为normal。
// callback(可选):执行完动画后执行的回调函数

slideDown()/slideUp()/slideToggle();同理
fadeIn()/fadeOut()/fadeToggle();同理
fadeTo([speed],[opacity],[callback])

//例子
$("#box").fadeTo(1000,0.5,function(){
                console.log("若隐若现");
            });
```

### 自定义动画

- animate: 自定义动画

```javascript
$(selector).animate({params},[speed],[easing],[callback]);
// {params}：要执行动画的CSS属性，和属性值（必选）
// speed：执行动画时长（可选）
// easing:执行效果，默认为swing（缓动）  可以是linear（匀速）ease ease-in ease-out(可选)
// callback：动画执行完后立即执行的回调函数（可选）
//案例：
$("div").animate({height:100,width:100},500,ease,function(){})
//animate不支持transform,也不支持background的背景色的改变（可以通过add添加类名和css动画达到效果）
```

定时器

> //**指定定时执行的函数时不要使用引号和括号**
>
> var a=setInterval(function(){
>
> },1000)
>
> var b=setTimeout(function(){
>
> },1000)

清除定时器

> clearInterval(a)和clearTimeout(b)
>
> //定时器即使清除了，其返回值也不会清除，之后设置的定时器的返回值也会在其返回值的基础上继续向后排，这点类似于银行的排队领号，即使1号的业务办理完了，后边的人仍是从2号开始继续领号，而不是重新从1开始；

### 动画队列与停止动画

- 在同一个元素上执行多个动画，那么对于这个动画来说，后面的动画会被放到动画队列中，等前面的动画执行完成了才会执行（联想：火车进站）。

```javascript
// stop方法：停止动画效果，针对jq对象执行中的animate()动画
stop(clearQueue, jumpToEnd);
//jq对象.stop(是否清除动画队列(其他动画),是否立即到达当期执行的动画的结果（为否会停在当前执行的位置）)
//参数可选 当为空时，默认是false
// 第一个参数：是否清除其他动画
// 第二个参数：是否跳转到最终效果
```

### 案例

- 动画停止案例 [03-动画停止详解.html]
- 下拉菜单-动画 [02-下拉菜单-动画.html]



## jQuery节点操作

### 创建节点

```javascript
// $(htmlStr)
// htmlStr为html格式的字符串
//例子
$('<span-这是一个span元素</span>');

$('body').html('<span-这是一个span元素</span>');//$('body').html(htmlStr);
//js原生为document.creatElement()和innerhtml
```

### 添加节点

```javascript
append  			jq对象1.append(jq对象2) 	--- 把jq1作为jq2父元素---js原生appendChild
appendTo  			jq对象1.appendTo(jq对象2)   --  把jq2作为jq1父元素
//把子元素添加到了队列末尾
prepend 			jq对象1.prepend(jq对象2）  ---  把jq1作为jq2的父元素
prependTo	        jq对象1.prependTo(jq对象2)  --  把jq2作为jq1的父元素          
//把子元素添加到了队列开头
//以上是层级关系

before				jq对象1.before(jq对象2)	--把jq对象2，作为jq对象1的兄弟元素，在其之前插入
after				jq对象1.after(jq对象2）	--作为兄弟(同级)元素，但是是在之后插入
//这两个是同级关系   
//js原生-----父节点.insertbefore(插入的子节点，目标节点)
```

### 案例

*追加节点的方式-[06-追加节点的方式.html]*

*城市选择 [11-城市选择案例.html]*

### 获取父节点方法

parent()，parents()，closest()//js原生为parentNode和  parentElement--ie

> <ul class="parent1">
> <li><a href="#" id="item1">jquery获取父节点</a></li> 
> <li><a href="#">jquery获取父元素</a></li> 
> </ul>
>
> 1.$('#item1').parent().parent('.parent1'); 
>
> 2.$('li:parent'); 
>
> 3.$('#item1') .closest('.parent1'); 
>
> 4.$('#item1').parents('.parent1');
>
> closest和parents的主要区别是：1，前者从当前元素开始匹配寻找，后者从父元素开始匹配寻找；2，前者逐级向上查找，直到发现匹配的元素后 就停止了，后者一直向上查找直到根元素，然后把这些元素放进一个临时集合中，再用给定的选择器表达式去过滤；3，前者返回0或1个元素，后者可能包含0 个，1个，或者多个元素。closest对于处理事件委派非常有用。
>

### 获取子节点方法

find()，children()【找到就停止寻找】或者直接$(父元素    子元素)【获取的是数组】

find方法可以找到任意深度的子元素,而children方法只能找第一级的子元素，找不到就返回undefined

> //js原生获取子元素数组
>
> childNodes--选出所有或特定子节点，包括前和后空位---有些把换行符也看作子节点
>
> children------选出所有或特定子元素，只包括DOM元素--ie
>
> 获取单个子节点
>
> firstChild和firstElementChild---lastChild和lastElementChild
>
> firstChild性质与childNodes相似
>
> firstElementChild性质与children相似
>
> firstChild和lastChild-----ie
>

### 兄弟节点

next()和prev()，nextAll和()prev()，siblings()//所有兄弟节点

> //js原生
>
> nextSibling和previousSibing---nextElementSibling和previousElementSibling
>
> 性质同上
>
> nextSibling和previousSibing-----ie

### 清空节点与删除节点

- $empty：清空指定节点的所有元素，自身保留(清理门户)

```javascript
$('div').empty(); // 清空div的所有内容（推荐使用，会清除子元素上绑定的内容，源码）
$('div').html('');// html方法来清空元素，不推荐使用，会造成内存泄漏，绑定的事件不会被清除。
//等同DOM方式   --  element.innerHTML = "";
```

- remove：相比于empty，自身也删除（自杀）

```javascript
$('div').remove();//js原生  父元素.removeChild(子元素)只删子节点
```

替换节点

- $(selector).replaceWith(content)  和 $(content).replaceAll(selector)

```
js原生为replaceChild()
```

### 克隆节点

- 作用：复制匹配的元素

```javascript
// js原生cloneNode(是否复制已经绑定的事件);//为空默认是false
// 返回值为复制的新元素，和原来的元素没有任何关系了。即修改新元素，不会影响到原来的元素。
$(selector).clone(true/false);
```

### 案例

- 删除表格 [12 表格删除案例.html]
- 根据数据生成表格 [13-表格生成案例.html]
- 添加和删除表格数据 [14-动态数据添加和删除.html]

## jQuery操作属性

### 属性设置

#### attr操作

- 设置单个属性

```javascript
// 第一个参数：需要设置的属性名
// 第二个参数：对应的属性值
$obj.attr(name, value);
// 用法举例
$('img').attr('title','哎哟，不错哦');
$('img').attr('alt','哎哟，不错哦');
//js原生---getAttribute(属性)
//--------setAttribute("属性","值")
```

#### css()和attr()的区别是，css只作用于style中的样式，attr是都可以(除了style属性还包括了行内样式的属性和自定义属性，例如alt,href...，前者是后者的子集，但对于属性值为布尔值的属性要用prop)

- 设置多个属性

```javascript
// 参数是一个对象，包含了需要设置的属性名和属性值
$obj.attr(obj)
// 用法举例
$('img').attr({
    title:'哎哟，不错哦',
    alt:'哎哟，不错哦',
    style:'opacity:.5'
});
```

- 获取属性

```javascript
// 传需要获取的属性名称，返回对应的属性值
$obj.attr(name)
// 用法举例
var oTitle = $('img').attr('title');
alert(oTitle);
```

- 移除属性

```javascript
// 参数：需要移除的属性名，
$obj.removeAttr(name);
// 用法举例
$('img').removeAttr('title');
```

#### prop操作

- 在jQuery1.6之后，对于checked、selected、disabled这类boolean类型的属性（属性值为true或false，属性值不用加引号！）来说，不能用attr方法，只能用prop方法。

```javascript
// 设置属性
$(':checked').prop('checked',true);
// 获取属性
$(':checked').prop('checked');// 返回true或者false
```

### 移除节点属性

removeAttr("属性")

> js原生---removeAttribute("属性")

### val()/text/()html()

```javascript
$obj.val()		获取或者设置表单元素的value属性的值
$obj.html() 	对应innerHTML
$obj.text()		对应innerText/textContent，处理了浏览器的兼容性
```

### 自定义属性--data-xxx

```
$(selector).data(name，value)---两个参数，当两个都没有则该方法将以对象的形式从元素中返回所有存储的数据data-对象；name为data-后面的字符，为获取属性值，value为设置的属性值（该jq的data方法操作是不可见的，例如在dom对象中并不会改变，要改变要用attr（）设置）；
//js原生是dataset---$(selector)[0].dataset获取所有data-对象，$(selector).dataset.xxx获取具体属性值，也可以设置，设置后能改变dom对象里的data-的属性值
```



### 案例

- 表格全选反选 [15-表格全选反选.html]
- 打字效果 [16-打字效果.html]



# 第三天

## jQuery尺寸和位置操作

```
resize 事件：改变大小事件  --  一般用来动态地监控window的大小
// DOM 例子
window.onresize = function(){
        console.log(window.innerWidth);
        console.log(window.innerHeight);
    }
//jq 例子
$(window).resize(function(){
            var h = $(window).height();
            var w = $(window).width();
            console.clear();
            console.log(h,w);
        })
```



### window和document的区别

1、window代表的是浏览器窗口，即可视的浏览器窗口

 document代表的是整个页面的dom元素

而document是window的一个属性；

2、两者的区别在页面有滚动条时可以直观的显示出来，当出现滚动条时，\$(window).height和\$(document).height是不相等的，\$(document).height比\$(window).height大，因为window的高度始终都是可见的浏览器窗口的高度，而document的高度则是整个页面的dom元素的高度，即超出一屏幕了。

### width方法与height方法

- 设置或者获取高度（W3C标准），不包括内边距、边框和外边距

  (即使设置了box-sizing:border-box;也还是原内容的宽/高（content-box），总高加上原设置的内外边距、边框和外边距)

```javascript
$('img').height(200);
// 带参数表示设置高度
$('img').height();
// 不带参数获取高度
//js原生的offsetHeight，offsetWidth只返回明确值且不能赋值；而style.top和style.left返回css所设定的值可以为百分比，可赋值
```

- 获取整个网页的宽高和网页的可视区窗口宽高

```javascript
$(document).width()和$(window).width();
// 获取获取整个高和可视区宽度
$(document).height()和$(window).height();
// 获取获取整个宽和可视区高度
//document==window.document
```

### js：宽高获取

```javascript
//jq的width()||height() 方法返回元素的宽高（仅为css中的对应属性值）

window对象的方法：
innerWidth()||innerHeight()	（包括内边距）。//width(height) + padding
outerWidth()||outerHeight()  （包括内边距和边框）。//width(height) + padding + border
outerWidth(true)||outerHeight(true)  方法返回值（包括内边距、边框和外边距）//为空默认为false

document.body对象的属性:
offsetHeight---显示的内容+内边距+边框
clientHeight为显示的内容+内边距
srollTop为滚动元素的高度（实际的总高度）//父元素导致隐藏的不算，要本身导致隐藏的才算，显示了多少就为真正的显示内容
offsetTop   ---距离父元素间的高度(相当于当前元素的offset().top - 父元素的offset().top)

//style.top和style.left返回css所设定的值可赋值，可以为百分比
```

### jq：offset方法与position方法

- offset方法获取元素相对于document(html的左上角)的位置//而off()是事件解绑，易混淆

- position方法获取的是元素距离有定位(relative、absolute、fixed)的父元素(offsetParent)的位置。

  //初始空位有影响

```javascript
$(selector).offset();//{$(selector).offset().left , $(selector).offset().top}
// 获取元素距离html的位置,返回值为对象，如：{left:100, top:100}//对隐藏元素无效
$(selector).position();//{$(selector).position().left,$(selector).position().top}
// 获取距离相对于其最近的有定位的父元素的位置，要是父元素没有定位则获取距离body边缘的位置，与offset相同。
//类似--js原生的offsetLeft,offsetTOP--只读，不能赋值
```

案例：固定导航栏   [17-固定导航栏.html]
案例：电梯导航 	[18-电梯导航.html]

### js和jq--offset，srollTop：

```
js:
offsetHeight---显示的内容+内边距+边框
offsetTop   ---距离父元素间的高度(相当于当前元素的offset().top - 父元素的offset().top)

jq:
jq的offset().top---距离可视区的高度，包含隐藏

js:
srollTop--为滚动元素的高度（实际的总高度）//父元素导致隐藏的不算，要本身导致隐藏的才算，显示了多少就为真正的显示内容

jq: 
$(window).scrollTop();// 获取页面被卷曲的高度
$(window).scrollLeft();// 获取页面被卷曲的宽度
//能获取隐藏的元素
```

## jQuery事件机制

- JavaScript中已经学习过了事件，jQuery对JavaScript事件进行了封装，增加并扩展了事件处理机制。jQuery不仅提供了更加优雅的事件处理语法，而且极大的增强了事件的处理能力。

### jQuery事件发展历程(了解)

简单事件绑定--bind事件绑定--delegate事件绑定--on事件绑定(推荐)

```
通过事件对象.data可以得到从事件绑定方法里传递进来的数据
```

- 简单事件注册

```javascript
mouseover			鼠标进入后离开(不论鼠标指针穿过被选元素或其子元素，都会触发)
mouseout			不论鼠标指针离开被选元素还是任何子元素，都会触发		
mouseenter(handler)		鼠标进入事件   (只有在鼠标指针穿过被选元素时，才会触发)	 
mouseleave(handler)		鼠标离开事件	 (只有在鼠标指针离开被选元素时，才会触发)		 
click(handler)			单击事件
mousedown   鼠标点击不放
mouseup     鼠标放开
mousemove	 鼠标移动
```

缺点：不能同时注册多个事件

- bind方式注册事件

```javascript
// 第一个参数：事件类型
// 第二个参数：事件处理程序
$('p').bind('click mouseenter', function(){
    // 事件响应方法
});
jq中的bind() 方法为被选元素添加一个或多个事件处理程序，并规定事件发生时运行的函数。
js中的bind() 为为被选函数指定this的指向//小心混淆
```

缺点：不支持动态事件绑定，没法为后来生成的元素绑定事件

- delegate注册委托事件

```javascript
// 第一个参数：selector，要绑定事件的元素
// 第二个参数：事件类型
// 第三个参数：事件处理函数
$('.parentBox').delegate('p', 'click', function(){
    // 为 .parentBox下面的所有的p标签绑定事件
});
```

缺点：只能注册委托事件，因此注册事件需要记得方法太多了

- on注册事件

### on注册事件(重点)

- jQuery1.7之后，jQuery用on统一了所有事件的处理方法。
- 最现代的方式，兼容zepto(移动端类似jQuery的一个库)，强烈建议使用。

on注册简单事件

```javascript
// 表示给$(selector)绑定事件，并且由自己触发，不支持动态绑定。
$(selector).on( 'click', function() {});
```

on注册事件委托

```javascript
// 表示给$(selector)绑定代理事件，当必须是它的内部元素span才能触发这个事件，支持动态绑定
$(selector).on( 'click mouseover','span , p', function() {});
```

事件委托原理

```javascript
// 事件委托的原理
var ul = document.querySelector('#ul');
ul.onclick = function (e) {
  // console.log(e.target.tagName);
  if (e.target.tagName.toLowerCase() === 'li') {
    console.log(e.target);//e.target为所触发的当前元素（不冒泡），e.currentTarget为所触发的元素冒泡
  }
}
```



on注册事件的语法：

```javascript
// 第一个参数：events，绑定事件的名称可以是由空格分隔的多个事件（标准事件或者自定义事件）
// 第二个参数：selector, 执行事件的后代元素可由逗号分隔的多个后代元素（可选），如果没有定义后代元素，那么事件将有自己执行。
// 第三个参数：data，传递给处理函数的数据，事件触发的时候通过event.data来使用（不常使用）
// 第四个参数：handler，事件处理函数
$(selector).on(events，[,selector]，[,data],handler);
```

- 通过源码查看 bind click delegate on 注册事件的区别

### 事件解绑

- unbind方式（不用）

```javascript
$(selector).unbind(); // 解绑所有的事件
$(selector).unbind('click'); // 解绑指定的事件
```

- undelegate方式（不用）

```javascript
$( selector ).undelegate(); // 解绑所有的delegate事件
$( selector).undelegate( 'click' ); // 解绑所有的click事件
```

- off方式（推荐）

```javascript
// 解绑匹配元素的所有事件
$(selector).off();
// 解绑匹配元素的所有click事件
$(selector).off('click');
//jq对象.off(事件类型,后代元素选择器,函数名);
```

### 触发事件

```javascript
$(selector).click(); // 触发 click事件,click(fn)
$(selector).trigger('click');//自动在所选择的元素上触发指定类型的事件，且能传参，即trigger(type, [data]) 
```

### jQuery事件对象

jQuery事件对象其实就是js事件对象的一个封装，处理了兼容性。ie不支持window.event

```javascript
// offsetX和offsetY  距离父元素的位置（要是父元素在滚动条之上，计算滚动条）（position）
// screenX和screenY	相对应整个电脑(不是浏览器)屏幕的显示屏左上角的值
// clientX和clientY	距离浏览器窗口页面左上角的位置(可视区)（忽视滚动条）
// pageX和pageY	距离浏览器窗口页面最顶部的左上角的位置（会计算滚动条的距离）(无滚动条时和client的值一样)（不包括隐藏了的滚动条）（scroll/）

// event.keyCode	按下的键盘代码 (jq对象.on（keydown）按键按下的事件)
// event.data	存储绑定事件时传递的附加数据

// event.stopPropagation()	阻止事件向祖辈元素的冒泡传递行为，ie用window.event.cancelBubble = true
// event.preventDefault()	阻止浏览器默认行为，ie用window.event.returnValue = false；javascript中的默认行为是指javascript中事件本身具有的属性，如<a>标签可以跳转，文本框可输入文字、字母等，右键浏览器会出现菜单等行为
// return false    在javascript的return false只会阻止默认行为，而是用jQuery的话则既阻止默认行为又防止对象冒泡。。
```

### 案例

- 按键变色 [19-按键变色.html]



# 第四天

## jQuery补充知识点

### 链式编程

- 通常情况下，只有设置操作才能把链式编程延续下去。因为获取操作的时候，会返回获取到的相应的值，无法返回 jQuery对象。

  ```
  var obj = {

      sayHi : function(){
          console.log("你好");
          return this;
      },
      sayHello:function(){
          console.log("hello");
          return this;
      },
      shuawodeka:function(){
          console.log("刷我的卡");
          return this;
      }

  };

  obj.sayHi().sayHello().shuawodeka().sayHi().shuawodeka().sayHello();
  ```

```javascript
end(); 
// 该筛选选择器会改变jQuery对象的DOM对象，想要回复到上一次的状态，并且返回匹配元素上一个的状态。
//例如A元素.B元素.end()//B元素执行完方法后结束B的引用又回到A元素对象（this的指向）
```

### each方法

- jQuery的隐式迭代会对所有的DOM对象设置相同的值，但是如果我们需要给每一个对象设置不同的值的时候，就需要自己进行迭代了。

作用：遍历jQuery对象集合，为每个匹配的元素执行一个函数

```javascript
// 参数一表示当前元素在所有匹配元素中的索引号
// 参数二表示当前元素（DOM对象）
$(selector).each(function(index,element){});//index==i;element==$(selector)[index]
```

### 多库共存

- jQuery使用$作为标示符，但是如果与其他框架中的$冲突时，jQuery可以释放$符的控制权.

```javascript
$.noConflict();//jQuery代替了$

//要是声明变量赋值则
var c = $.noConflict();// 释放$的控制权,并且把$的能力给了c
```

### form表单序列化

jQuery ajax中数据以键值对（Key/Value）的形式发送到服务器，使用ajax提交表单数据时可以使用jQuery ajax的serialize() 方法表单序列化为键值对（key1=value1&key2=value2…）后提交。serialize() 方法使用标准的 URL-encoded 编码表示文本字符串。

```
$.ajax({
   type: "POST",
   url: ajaxCallUrl,
   data: "Key=Value&Key2=Value2",
   success: function(msg){alert(msg);}
 });
```

```
$.ajax({
         type: "POST",
         url:ajaxCallUrl,
         data:$('#formID').serialize(),// 要提交的表单 ,formID表单id
         success: function(msg) {alert(msg);}
     });
```

------

query form表单.serialize()序列化后中文乱码问题原因及解决

原因：.serialize()自动调用了encodeURIComponent方法将数据编码了 
解决方法：调用decodeURIComponent(XXX,true);将数据解码 
例如： 
var params = jQuery("#formId").serialize(); // http request parameters. 
params = decodeURIComponent(params,true);

### 案例

- 五角星评分案例 [20-五角星评分案例.html]

## jQuery插件开发

- 给jQuery增加方法的两种方式

```javascript
$.method = fn		静态方法
$.fn.method = fn	实例方法（批量执行）
```

- 增加一个静态方法，实现两个数的和，插件

```javascript
(function ($) {
  $.add = function (a, b) {
    return a + b;
  }
}(jQuery))

$.add(5, 6);
```

- tab栏插件 [21-tab栏插件.html]

```javascript
(function ($) {
  // {tabMenu: '#aa'}
  $.tab = function (options) {
    // 默认参数
    var defaults = {
      tabMenu: '#tab',
      activeClass: 'active',
      tabMain: '#tab-main',
      tabMainSub: '.main',
      selectedClass: 'selected'
    }
    // 把options中的属性，把对应属性的值赋给defaults对应的属性
    // defaults.tabMenu = options.tabMenu || defaults.tabMenu;
    // for(var key in options) {
    //   defaults[key] = options[key];
    // }
    
    $.extend(defaults, options);//将多个对象合并进第一个对象

    $(defaults.tabMenu).on('click', 'li', function () {
      $(this)
        .addClass(defaults.activeClass)
        .siblings()
        .removeClass(defaults.activeClass);

      //
      var index = $(this).index();
      //
      $(defaults.tabMain + ' ' + defaults.tabMainSub)
        .eq(index)
        .addClass(defaults.selectedClass)
        .siblings()
        .removeClass(defaults.selectedClass);
    })
  }
}(window.jQuery))
```

- 表格插件  [22-表格插件.html]

```javascript
(function($) {
  // 内部的变量，外部无法访问，防止变量名冲突
  var a = 0;
  // 给$增加了一个实例方法
  $.fn.table = function (header, data) {
    var array = [];
    array.push('<table>');
    array.push('<tr>');

    // 生成表头
    $.each(header, function () {
      array.push('<th>' + this + '</th>');
    })
    array.push('</tr>');


    // 生成数据行
    $.each(data, function (index) {
      // this是当前遍历到的数组中的每一个对象
      // 拼数据行
      array.push('<tr>');
      array.push('<td>' + (index + 1) + '</td>');

      // 遍历对象，拼表格
      for (var key in this) {
        array.push('<td>' + this[key] + '</td>');
      }

      array.push('</tr>');
    })
    array.push('</table>');

    this.append(array.join(''));
  }

}(window.jQuery))
```



## jQuery自带的一些常用方法总结

**（1）\$.trim**

$.trim方法用于移除字符串头部和尾部多余的空格。

**（2）\$.contains**

$.contains方法返回一个布尔值，表示某个DOM元素（第二个参数）是否为另一个DOM元素（第一个参数）的下级元素。

（3）\$.each和\$.map

$.each方法用于遍历数组和对象，然后return返回的还是原始（来）数组或对象。它接受两个参数，分别是数据集合和回调函数。

（jquery中的\$().each和\$.each的区别，前者只能遍历数组，后者可以遍历数组和对象）

//jQuery对象实例也有一个each方法（\$.fn.each），两者的作用差不多。

$.map方法，同样接受两个参数，也是用来遍历数组或对象，但是会返回一个改变后的新数组或对象。

**（4）$.inArray**

$.inArray方法返回一个值在数组中的位置（从0开始）。如果该值不在数组中，则返回-1。

**（5）$.extend**

$.extend方法用于将多个对象合并进第一个对象。

$.extend的另一种用法是生成一个新对象，用来继承原有对象。这时，它的第一个参数应该是一个空对象。

默认情况下，extend方法生成的对象是“浅拷贝”，也就是说，如果某个属性是对象或数组，那么只会生成指向这个对象或数组的指针，而不会复制值。如果想要“深拷贝”，可以在extend方法的第一个参数传入布尔值true。

**（6）$.ajax**

jQuery对象上面还定义了Ajax方法（\$.ajax()），用来处理Ajax操作。调用该方法后，浏览器就会向服务器发出一个HTTP请求。

（$.ajax()操作完成后，如果使用的是低于1.5.0版本的jQuery，返回的是XHR对象，你没法进行链式操作；如果高于1.5.0版本，返回的是deferred对象，可以进行链式操作。 ）

```
$.ajax(/*...*/)
.success(function(){/*...*/})
.error(function(){/*...*/})
.complete(function(){/*...*/})
分别表示ajax请求成功、失败、结束的回调。这三个方法与Deferred又是什么关系呢？其实就是语法糖，success对应done，error对应fail，complete对应always，就这样，只是为了与ajax的参数名字上保持一致而已。（always：不论执行完成还是执行失败，always都会执行，有点类似ajax中的complete。）
//但jquery的ajax返回一个受限的Deferred对象，也就是没有resolve方法和reject方法，不能从外部改变状态
```

**（7）$.deferred**

jQuery中的Promise，也就是jQuery的Deferred对象。（与es6的promise不是同一个，但作用类似）。

jQuery规定deferred对象的三种执行状态：**未完成**、**已完成**和**已失败**。（状态一旦改变，就不会再变，任何时候可以得到这个结果。只有两个结果：`Pending -> Resolved` 和 `Pending -> Rejected`。）

- 如果执行状态是”已完成”（resolved）,（deferred.resolve()后）deferred对象立刻调用done()方法指定的回调函数；

- 如果执行状态是”已失败”（rejected），调用fail()方法指定的回调函数；

- 如果执行状态是”未完成”（pending），则继续等待，或者调用progress()方法指定的回调函数（jQuery1.7版本添加）。

  **deferred对象的方法**

  1. `$.Deferred()` 生成一个deferred对象。

  2. `deferred.done(function(){})` 指定操作成功时的回调函数

  3. `deferred.fail(function(){})` 指定操作失败时的回调函数

  4. `deferred.promise()` 
     没有参数时，返回一个新的deferred对象，但该对象的运行状态无法被改变（即没有resolve和reject方法，无法手动改变，也可以理解为promise是deferred的只读版）； 

     接受参数时，作用为在参数对象上部署deferred接口。

  5. `deferred.resolve()` 手动改变deferred对象的运行状态为”已完成”（done的快捷方式），从而立即触发done()方法。

  6. `deferred.reject()` 手动改变deferred对象的运行状态变为”已失败”（fail的快捷方式），从而立即触发fail()方法。

  7. `deferred.always()`不管成功与否，都会执行 `always()` 添加的回调。 

     ```
     var myDeferred = $.post('/echo/json/', {json:JSON.stringify({'error':true})})
         .then(function (response) {
                 if (response.error) {//成功中的错误
                     return $.Deferred().reject(response);
                 }
                 return response;
             },function () {/从开始就失败
                 return $.Deferred().reject({error:true});
             }
         );
     myDeferred.done(function (response) {
             $("#status").html("Success!");
         }).fail(function (response) {
             $("#status").html("An error occurred");
         });
     ```

     ​

  8. `$.when()` 为多个操作指定回调函数。（类似Promise.all）

     $.when()接受多个deferred对象（也只能是deferred对象）作为参数，当它们全部运行成功后，才调用resolved状态的回调函数，但只要其中有一个失败，就调用rejected状态的回调函数。它相当于将多个非同步操作，合并成一个。

     when方法里面要执行多少个操作，回调函数就有多少个参数，对应前面每一个操作的返回结果。

     when方法的另一个作用是，如果它的参数返回的不是一个Deferred或Promise对象，那么when方法的回调函数将 立即运行。

     ```
     //jq语法
     <script>
     var def = $.Deferred();
      function runAsync(def){
         //var def = $.Deferred();
         //做一些异步操作
         setTimeout(function(){
            var num = Math.ceil(Math.random()*10); //生成1-10的随机数
            def.resolve(num);
         }, 2000);
         return def.promise(); //就在这里调用
         //1、jQuery规定，任意一个deferred对象有三种执行状态----未完成，已完成和已失败。如果直接返回dtd，$.when()的默认执行状态为"已完成"，立即触发后面的done()/then（）方法，这就失去回调函数的作用了。def.promise()的目的，就是保证目前的执行状态----也就是"未完成"----不变，从而确保只有操作完成后，才会触发回调函数。
         //2、操作完成后，必须手动改变Deferred对象的执行状态，否则回调函数无法触发。dtd.resolve()的作用，就是将dtd的执行状态从"未完成"变成"已完成"，从而触发done()方法。
       }
       $.when(runAsync(), runAsync(), runAsync()) .then(function(data1, data2, data3){
     　　　　 console.log('全部执行完成');
     　　　　 console.log(data1, data2, data3);
     　　});
     </script>
     
     //jQuery规定，$.Deferred()可以接受一个函数作为参数，该函数将在$.Deferred()返回结果之前执行。并且，$.Deferred()所生成的Deferred对象将作为这个函数的默认参数。即：
     $.Deferred(runAsync).then()
     ```

     ```
     //es6语法
     var p1 = Promise.resolve(1),
         p2 = Promise.resolve(2),
         p3 = Promise.resolve(3);
     //或者var p1 = new Promise(function (resolve，reject) {resolve(1)});
     //或者var p2 = new Promise(function (resolve，reject) {resolve(2)});
     
     Promise.all([p1,p2,p3]).then(function (results) {
         console.log(results);  // [1, 2, 3]
     });
     //Promise.all 方法会按照数组里面的顺序将结果返回。
     ```

     ​

  9. `deferred.then()` 有时为了省事，可以把done()和fail()合在一起写，这就是then()方法。

     （在jQuery 1.8之前，then()只是.done().fail()写法的语法糖，两种写法是等价的。在jQuery 1.8之后，then()返回一个新的deferred对象，而done()返回的是原有的deferred对象。如果then()指定的回调函数有返回值（return），该返回值会作为参数，传入后面的回调函数。而1.8之前的不行）

  ```
  $.when($.ajax("/main.php" ))
      .then(successFunc, failureFunc );
  ```

  如果then()有两个参数，那么第一个参数是done()方法的回调函数，第二个参数是fail()方法的回调方法。如果then()只有一个参数，那么等同于done()。 (es6中把then当作成功时的回调，把catch当作失败时的回调（promise.then(undefined, onRejected)）)

  1. `deferred.always()`这个方法也是用来指定回调函数的，它的作用是，不管调用的是`deferred.resolve()`还是`deferred.reject()`，最后总是执行。

  ```
  $.ajax("test.html")
      .always(function(){ 
          console.log("已执行！");
      });
  
  ```

#### jq的deferred对象和es6的promise对象

在jq中

```
var deferred = $.Deferred();
deferred.resolve(valve);
var promise = deferred.promise();
$.when(promise).then(function(value){})
```

在es6中

```
var promise =  new Promise(function(resolve,reject){resolve(value)});
promise.then(function(value){})
```

1、创建$.Deferred对象的时候没有传参；而创建new Promise对象的时候，传了一个匿名函数，函数有两个参数：resolve、reject；

2、\$.Deferred对象直接调用了resolve方法（$.Deferred.resolve( )）；而Promise对象则是在内部调用的resolve方法（new Promise(resolve，reject)的第一个参数作为resolve方法）；

说明：Deferred对象本身就有resolve方法，而Promise对象是在构造器中通过执行resolve方法，给Promise对象赋上了执行结果的状态。

这样就有一个弊端：因为Deferred对象自带resolve方法，拿到Deferred对象之后，就可以随时调用resolve方法，其状态可以进行手动干预了，解决方法就是通过deferred.promise()方法

3、在ES6的Promise规范中，then方法接受两个参数，分别是执行完成和执行失败的回调，而jquery中进行了增强，还可以接受第三个参数，就是在pending状态时的回调