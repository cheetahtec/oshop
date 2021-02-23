import { Product } from "./product.model";
import { ShoppingCartItem } from "./shopping-cart-item.model";

export class ShoppingCart {
    
    items?: ShoppingCartItem[] = [];
   

    constructor(private itemsMap: { [productId: string] : ShoppingCartItem}) {
        this.itemsMap = itemsMap || {};
        for( let productId in itemsMap) {
            let item = itemsMap[productId];
        this.items?.push(new ShoppingCartItem({...item, key: productId }));
        }
            
    }

   getCartCount() {
        let count=0;
        for (let id in this.itemsMap) {
            count += this.itemsMap[id].quantity || 0;
        }
        return count;
    }

    get totalCartPrice() {
        let sum = 0;
        for(let item in this.items)
            sum += this.items[<any>item].totalPrice;
        return sum;
    }

    getQuantity(product?: Product) {
        const productKey = product?.key!;
        if(this.itemsMap[productKey])
          return this.itemsMap[productKey].quantity;
        else return 0;
      }
}