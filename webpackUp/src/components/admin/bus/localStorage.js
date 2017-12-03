
// 职责：负责结合加入购物车这个业务来操作localStorate的数据

// 1.0 定义一个全局key
const KEY = 'buyGoods';

// 2.0 从localStorage中获取到数据
export function getItem(){
  var jsongString =  localStorage.getItem(KEY);

//   如果localStorage中没有这个key对应的数据则返回一个空对象
  if(!jsongString){
      return {};
  }
  
//   如果有值，则将这个字符串转换成对象返回
  return JSON.parse(jsongString);
}


// 3.0 设置localStorage中的数据
// gobjgeshi：{gid:91,count:1}
export function setItem(gobj){

    // 1.0 从localStorage中获取购买商品的对象
   var obj = getItem();

    // 2.0 判断gobj.gid的值在obj中是否存在，
    // 如果存在将gobj.count的值叠加上去即可
    if(obj[gobj.getId]){
        // obj.91 = obj.91 + 1;
        obj[gobj.getId] = obj[gobj.getId] + gobj.count;
    }else{
        // 如果不存在，则动态向ob对象中添加一个商品的购买数量
        // 等价于  obj.91 = 1;
        obj[gobj.getId] = gobj.count;
    }

    // 3.0 将obj存储会loacalStorage中
    localStorage.setItem(KEY,JSON.stringify(obj));
}

export function setItemReplace(obj){
    var obj=getItem();
    obj[obj.gid]=obj.count;
    localStorage.setItem(KEY,JSON.stringify(obj))
}
// 4.0 删除localStorage数据

export function remoteItem(goodsid){
    var obj=getItem();
    delete obj[goodsid];
    localStorage.setItem(KEY,JSON.stringify(obj));
}
