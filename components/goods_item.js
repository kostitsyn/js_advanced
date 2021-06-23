import {bus} from '../script.js';

export const goodsItem = Vue.component('goods-item', {
	props: ['product', 'basketGoods'],
	template: `<div class="goods-item p-3 bg-light border-warning mx-3 animated" @mouseover="mouseOver($event)"
			   @mouseout="mouseOut($event)">
			       <h3 class='goods-name'>{{ product.product_name }}</h3>
				   <p class='goods-price'>{{ product.price }}</p>
				   <button :name="product.id" class="btn btn-danger btn-sm add-basket-btn" 
				   @click="addProductInBasket($event)">В корзину</button>
		       </div>`,
	data () {
		return {
			localBasketGoods: this.basketGoods
		}
	},
	methods: {
		async addProductInBasket(event) {
			bus.$emit('add-basket-product', event);
		},
		mouseOver(event) {
			bus.$emit('add-animate', event);


		},
		mouseOut(event) {
			bus.$emit('remove-animate', event);
		}
	}
});