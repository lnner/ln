var message = document.getElementById('message');

var start = document.getElementById('start');
var wugong = ['天马流星拳', '庐山升龙霸', '葵花点穴手', '爱的暴击', '降龙十八掌', '如来神掌', '佛山无影脚', '咏春拳', '洪拳', '下毒', '治疗', '色诱']
start.onclick = function () {
    var player1 = document.getElementById('player1');
    var player2 = document.getElementById('player2');
    var obj1 = {};
    obj1.name = player1.value;
    obj1.hp = getNum(200) + 100;
    var obj2 = {};
    obj2.name = player2.value;
    obj2.hp = getNum(200) + 100;

    var flag = true;
    var hurt = 0;
    var suiji = 0;
    var index = 0;
    var hp = 0;
    while (flag) {
        suiji = getNum(5);
        index = getNum(wugong.length);
        obj2.lucky = getNum(10);
        obj1.lucky = getNum(10);
        hurt = getNum(50) + 10;
        if(wugong[index]=='治疗'){
            hurt = - hurt;
        }
        if (obj1.lucky > obj2.lucky) {
           
            obj2.hp = obj2.hp - hurt;
            message.innerText += obj1.name + "对" + obj2.name + '使用了' +wugong[index]  + "," + obj2.name + '受到了' + hurt + '点伤害,剩余' + obj2.hp + '\n';
        } else {
           
            obj1.hp = obj1.hp - hurt;
            message.innerText += obj2.name + "对" + obj1.name + '使用了' + wugong[index] + "," + obj1.name + '受到了' + hurt + '点伤害,剩余' + obj1.hp + '\n';
        }
        if (obj1.lucky == suiji) {
            hp = suiji * getNum(50);
            message.innerText += obj1.name + "受到了幸运女神的眷顾，hp恢复" + hp + '点\n';
            obj1.hp = obj1.hp + hp;
        }
        if (obj2.lucky == suiji) {
            hp = suiji * getNum(50);
            message.innerText += obj2.name + "受到了幸运女神的眷顾，hp恢复" + hp + '点\n';
            obj2.hp = obj2.hp + hp;
        }

        if (obj1.hp <= 0) {
            message.innerText += obj2.name + ' is winner\n';
            flag = false;
        }
        if (obj2.hp <= 0) {
            message.innerText += obj1.name + ' is winner\n';
            flag = false;
        }
    }
}
function getNum(num) {
    return parseInt(Math.random() * num);
}