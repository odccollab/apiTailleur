export default class Model {
   static getIndex(tab,id){
        tab.forEach((element,index) => {
            if(element.id == id)
                return index;
        });
    }
   static getMaxId(items) {
        return items.reduce((maxId, item) => item.id > maxId ? item.id : maxId, 0);
    }

}