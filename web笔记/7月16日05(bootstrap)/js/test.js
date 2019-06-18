var a = 10,
    b = 32;
console.log(a + b);
console.log(b - a);
console.log(a * b);
console.log(a / b);
console.log(100 % 38);
var c = 0;
c = a + b;
// 一个等号 赋值运算符 =
// 两个等号 比较运算符 < > >= <= != !== === ==会得到两个结果 true false 布尔运算 bool


var father = document.getElementById('father');
var btn = document.getElementById('btn');
father.style = 'height:200px;width:200px;border:1px solid #0094ff;';
btn.onclick = function(){
    father.style.backgroundColor='#0094ff';
}

console.dir(father);
// dom 编程  document object model