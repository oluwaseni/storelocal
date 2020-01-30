import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';




export interface Item{
  id: number,
  title: string,
  value: string,
  modified: number
}

const ITEMS_KEY = 'my-items';

@Injectable({
  providedIn: 'root'
})


export class StorageService {

  constructor(private storage:Storage) { }
// Create read update
  addItem(item: Item): Promise<any> {
    

    return this.storage.get(ITEMS_KEY).then((items:Item[])=>{

      if(items){
        items.push(item);
        return this.storage.set(ITEMS_KEY, items);

      }
      else{
        return this.storage.set(ITEMS_KEY, [item]);
      }

    });
  }
// Get read update
  readItem(): Promise<Item[]> {
    return this.storage.get(ITEMS_KEY);

  }
// Delete read update
  getItems(item:Item){

  }
// Update read update
  updateItem(item:Item): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items:Item[])=>{
      if(!items || items.length == 0){
        return null
      }
      let newItems: Item[]=[]
      for(let i of items){
        if(i.id === item.id){
          newItems.push(item);
        }
        else{
          newItems.push(i)
        }

        return this.storage.set(ITEMS_KEY, newItems);
      }

    });
  }
// delete item
  deleteItem(id:number): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items:Item[])=>{
      if(!items || items.length == 0){
        return null
      }
      let toKeep: Item[] = [];

      for (let i of items){
        if(i.id !== id){
          toKeep.push(i);
        }
      }

      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }
}
