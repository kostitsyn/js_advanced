export const goodsList = Vue.component('goods-list', {
	props: ['goods', 'basketGoods'],
	template: `<div class="goods-list row-cols-lg-5 d-flex justify-content-center mb-5 flex-wrap">
			       <goods-item v-for="goodItem in goods" :product="goodItem" :basket-goods="basketGoods"></goods-item>
			   </div>`,

});
