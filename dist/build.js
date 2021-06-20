(()=>{"use strict";Vue.component("goods-list",{props:["goods","basketGoods"],template:'<div class="goods-list row-cols-lg-5 d-flex justify-content-center mb-5 flex-wrap">\n\t\t\t       <goods-item v-for="goodItem in goods" :product="goodItem" :basket-goods="basketGoods"></goods-item>\n\t\t\t   </div>'}),Vue.component("goods-item",{props:["product","basketGoods"],template:'<div class="goods-item p-3 bg-light border-warning mx-3 animated" @mouseover="mouseOver($event)"\n\t\t\t   @mouseout="mouseOut($event)">\n\t\t\t       <h3 class=\'goods-name\'>{{ product.product_name }}</h3>\n\t\t\t\t   <p class=\'goods-price\'>{{ product.price }}</p>\n\t\t\t\t   <button :name="product.id" class="btn btn-danger btn-sm add-basket-btn" \n\t\t\t\t   @click="addProductInBasket($event)">В корзину</button>\n\t\t       </div>',data(){return{localBasketGoods:this.basketGoods}},methods:{async addProductInBasket(t){const e={id:+t.target.name},s=(await fetch("http://localhost:3000/addToBasket",{method:"POST",mode:"cors",headers:{"Content-type":"application/json;charset=utf-8"},body:JSON.stringify(e)}),await fetch("http://localhost:3000/basketData"));if(s.ok){const t=await s.json();app.BasketGoods=t,this.isServerRespond=!0}else this.isServerRespond=!1},mouseOver(t){t.target.classList.add("pulse")},mouseOut(t){t.target.classList.remove("pulse")}}}),Vue.component("search-block",{props:["searchLine"],template:'<form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" @submit.prevent="$emit(\'start-search\')">\n\t\t          <input type="search" class="form-control form-control-dark  border-0 rounded-0 rounded-start search-field"\n\t\t           placeholder="Search..." aria-label="Search" :value="searchLine"\n\t\t           v-on:input="$emit(\'input\', $event.target.value)">\n\t\t          <button type="button" class="btn btn-light border-0 rounded-0 rounded-end bg-white search-btn">\n\t\t          \t<i class="fad fa-search" @click="$emit(\'start-search\')"></i>\n\t\t          </button>\n\t\t        </form>'}),Vue.component("basket-list",{props:["basketArr","getPrice","getTotalPrice"],template:'<div>\n\t\t\t\t\t\t<div class="basket-list row-cols-lg-5 d-flex justify-content-center flex-wrap">\n\t\t\t\t\t       <basket-item v-for="basketItem in basketArr" :get-price="getPrice" :product="basketItem"></basket-item>\n\t\t\t\t\t    </div>\n\t\t\t\t\t    <p class="position-static goods-total-price text-center">{{ getTotalPrice() }}</p>\n\t\t\t\t\t</div>'}),Vue.component("basket-item",{props:["product","getPrice"],template:'<div class=\'basket-item p-3 bg-light border-warning mx-3 animated\' @mouseover="mouseOver($event)" \n\t\t\t   @mouseout="mouseOut($event)">\n\t\t\t       <h3 class=\'goods-name\'>{{ product.product_name }}</h3>\n\t\t\t\t   <p class=\'goods-price\'>{{ getPrice(product) }}</p>\n\t\t\t\t   <p class=\'basket-product-quantity\'>Количество:</p>\n\t\t\t\t   <input class="mb-3 d-block" v-bind:name="product.id" type="number" \n\t\t\t\t   v-bind:value="product.quantity" @change="updateQuantity($event)">\n\t\t\t\t   <button v-bind:name="product.id" class="btn btn-danger btn-sm remove-basket-btn" \n\t\t\t\t   @click="removeProductInBasket($event)">Удалить</button>\n\t\t\t   </div>',methods:{removeProductInBasket(t){app.removeProductInBasket(t)},updateQuantity(t){app.updateQuantity(t)},mouseOver(t){t.target.classList.add("pulse")},mouseOut(t){t.target.classList.remove("pulse")}}}),Vue.component("bad-response-server",{template:'<h1 class="text-center text-danger">Ошибка соединения с сервером!!!</h1>'}),window.onload=()=>{new Vue({el:"#app",data:{goods:[],filteredGoods:[],searchLine:"",basketGoods:[],API_URL:"http://localhost:3000",isServerRespond:null},methods:{async fetchGoods(){const t=await fetch(`${this.API_URL}/catalogData`);if(t.ok){const e=await t.json();this.goods=e,this.filteredGoods=e,this.isServerRespond=!0}else this.isServerRespond=!1},async updateBasketArr(){const t=await fetch(`${this.API_URL}/basketData`);if(t.ok){const e=await t.json();this.basketGoods=e,this.isServerRespond=!0}else this.isServerRespond=!1},getTotalPrice(){let t=0;return this.filteredGoods.forEach((e=>{t+=e.price})),`Общая стоимость товаров: ${t}`},getTotalPriceInBasket(){let t=0;return this.basketGoods.forEach((e=>{t+=e.price*e.quantity})),`Общая стоимость товаров в корзине: ${t}`},filterGoods(){let t=new RegExp(this.searchLine,"i");this.filteredGoods=this.goods.filter((e=>t.test(e.product_name)))},async addProductInBasket(t){const e={id:+t.target.name};await this.sendPostRequest("addToBasket",JSON.stringify(e));const s={action:"add",productName:t.target.parentNode.querySelector(".goods-name").innerText};await this.sendGetRequest("static",s),this.updateBasketArr()},checkIfExistsInBasket(t){return Boolean(this.basketGoods.find((e=>e.id==t.id)))},getProductById:(t,e)=>e.find((e=>e.id==t)),async removeProductInBasket(t){const e={id:+t.target.name};await this.sendPostRequest("removeToBasket",JSON.stringify(e));const s={action:"remove",productName:t.target.parentNode.querySelector(".goods-name").innerText};await this.sendGetRequest("static",s),this.updateBasketArr()},getTotalPriceForItem:t=>"Цена: "+t.price*+t.quantity,async updateQuantity(t){const e={id:+t.target.name,quantity:+t.target.value};if(await this.sendPostRequest("addToBasket",JSON.stringify(e)),t.target.value<=0){const e={id:t.target.name};await this.sendPostRequest("removeToBasket",JSON.stringify(e))}this.updateBasketArr()},mouseOver(t){t.target.classList.add("pulse")},mouseOut(t){t.target.classList.remove("pulse")},async sendPostRequest(t,e){await fetch(`${this.API_URL}/${t}`,{method:"POST",mode:"cors",headers:{"Content-type":"application/json;charset=utf-8"},body:e})},async sendGetRequest(t,e){let s=new URL(`${this.API_URL}/${t}`);s.search=new URLSearchParams(e),await fetch(s)}},async mounted(){await this.fetchGoods(),await this.updateBasketArr()}})}})();