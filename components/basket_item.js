export const basketItem = Vue.component('basket-item', {
	props: ['product', 'getPrice'],
	template: `<div class='basket-item p-3 bg-light border-warning mx-3 animated' @mouseover="mouseOver($event)" 
			   @mouseout="mouseOut($event)">
			       <h3 class='goods-name'>{{ product.product_name }}</h3>
				   <p class='goods-price'>{{ getPrice(product) }}</p>
				   <p class='basket-product-quantity'>Количество:</p>
				   <input class="mb-3 d-block" v-bind:name="product.id" type="number" 
				   v-bind:value="product.quantity" @change="updateQuantity($event)">
				   <button v-bind:name="product.id" class="btn btn-danger btn-sm remove-basket-btn" 
				   @click="removeProductInBasket($event)">Удалить</button>
			   </div>`,
	methods: {
		removeProductInBasket(event) {
			/*bus.$emit('remove-basket-product', event);*/
			app.removeProductInBasket(event);
		},
		updateQuantity(event) {
			/*bus.$emit('update-quantity-product', event);*/
			app.updateQuantity(event);
		},
		mouseOver(event) {
			/*bus.$emit('add-animate', event);*/
			/*app.mouseOver(event);*/
			event.target.classList.add('pulse');
		},
		mouseOut(event) {
			/*bus.$emit('remove-animate', event);*/
			/*app.mouseOut(event);*/
			event.target.classList.remove('pulse');
		},
	}		   
});
