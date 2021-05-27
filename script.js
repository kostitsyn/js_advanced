const goods = [
	{title: 'Shirt', price: 150 },
	{title: 'Socks', price: 50 },
	{title: 'Jacket', price: 350 },
	{title: 'Shoes', price: 250 },
];

const renderGoodsItem = (title = 'Default', price = 0) => `<div class='goods-item p-3 bg-light border border-warning mx-3'><h3>${title}</h3><br><p>${price}</p></div>`;

const renderGoodsList = list => {
	let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
	document.querySelector('.goods-list').innerHTML = goodsList.join(' ');
}

const init = () => {
	renderGoodsList(goods);
}

window.onload = init;