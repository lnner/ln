var img = document.getElementById('lady');
var mask = document.getElementById('mask');
var btn = document.getElementById('guess');
var arr = [{src:'img/炮姐.jpeg',name:'炮姐',info:'bilibili'},{src:'img/长泽雅美.jpg',name:'长泽雅美',info:'笑得和gakki一样好看'},{src:'img/gakki.png',name:'gakki',info:'前女友'}];
var index = parseInt(Math.random() * arr.length);
img.src = arr[index].src;
img.alt =arr[index].name;
alert(arr[index].info);
var opactiy = 1.0;
btn.onclick = function(){
    var starname = document.getElementById('starname').value;
   if(img.alt == starname)
    {
        mask.style.backgroundColor = 'rgba(0,0,0,'+0+')';
        alert('看来你是人肉识别机');
    }
    else{
         opactiy  =  opactiy -0.1;
         mask.style.backgroundColor = 'rgba(0,0,0,'+opactiy+')';
    }
}