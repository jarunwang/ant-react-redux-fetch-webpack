export function checkKey(list) {
    let items = list;

    if(checkType.isArray(items)){
        function connetKey(item){
            return item.key = createUUID();
        }
        items.map(item=>{
            item = item.key?item:connetKey(item);
        })
        return items;
    }else{
        return items;
    }
}

export function getNowTime(){
    return new Date().getTime();
}

export function createUUID(){
    var d = getNowTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    return uuid;
}

export const checkType = {
	isNumber : function(arg){
		return Object.prototype.toString.call(arg) === '[object Number]';
	},
	isString : function(arg){
		return Object.prototype.toString.call(arg) === '[object String]';
	},
	isUndefined : function(arg){
		return Object.prototype.toString.call(arg) === '[object Undefined]';
	},
	isBoolean : function(arg){
		return Object.prototype.toString.call(arg) === '[object Boolean]';
	},
	isObject : function(arg){
		return Object.prototype.toString.call(arg) === '[object Object]';
	},
	isArray : function(arg){
		return Object.prototype.toString.call(arg) === '[object Array]';
	},
	isFunction : function(arg){
		return Object.prototype.toString.call(arg) === '[object Function]';
	}
}

export function filterList(list,filterKey){
    // let _filterList = list;
    // for(var key in filterKey){
    //      if(filterKey[key]&&filterKey[key]!=undefined){
    //         _filterList.push(list.filter((i)=>{i[key]==filterKey[key]}));
    //      }else{
    //         _filterList = list;
    //      }
    // }
    return list
}