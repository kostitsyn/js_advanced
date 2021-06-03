// Пропишем константы чтобы уйти от хардкода
const bigSize = 'big';
const smallSize = 'small';
const cheeseStuffing = 'cheese';
const saladStuffing = 'salad';
const potatoStuffing = 'potato';
const spiceTopping = 'spice';
const mayoTopping = 'mayo';  

class Hamburger {
	constructor(size, stuffing) {
		this.sizeType = {
			small: {price: 50, calories: 20},
			big: {price: 100, calories: 40}

		}
		this.stuffingType = {
			cheese: {price: 10, calories: 20},
			salad: {price: 20, calories: 5},
			potato: {price: 15, calories: 10}
		}
		this.toppingType = {
			spice: {price: 15, calories: 0},
			mayo: {price: 20, calories: 5}
		}
		this._size = this.validateSize(size);
		this._stuffing = this.validateStuffing(stuffing);
		this.toppings = [];
			
	}

	// Сначала прописал валидацию в классе, потом в клиентском коде, не знаю, где лучше её прописывать.

	validateSize(size) {
		if (!(size in this.sizeType)) {
			alert(`Размер '${size}' для гамбургера недоступен!`);
		}else {
			return size;
		}
	}

	validateStuffing(stuffing) {
		if (!(stuffing in this.stuffingType)) {
			alert(`Начинка '${stuffing}' недоступна!`);
		}else {
			return stuffing;
		}
	}


	set size(value) {
		if (!(value in this.sizeType)) {
			alert(`Размер '${value}' для гамбургера недоступен!`);
		}else {
			this._size = value;
		}
	}

	set stuffing(value) {
		if (!(value in this.stuffingType)) {
			alert(`Начинка ${value} недоступна!`);
		}else {
			this._stuffing = value;
		}
	}

	/**
	 * Добавить приправу.
	 * @param {string} topping Название приправы.
	 */
	addTopping(topping) {
		if (!(topping in this.toppingType)) {
			alert(`Приправа ${topping} недоступна!`);
		}else {
			this.toppings.push(topping);
		}
	}

	/**
	 * Убрать приправу.
	 * @param  {string} topping Название приправы.
	 */
	removeTopping(topping) {
		if (!(topping in this.toppings)) {
			alert(`Приправа ${topping} отстутствует для данного гамбургера!`);
		}else {
			const index = this.toppings.indexof(topping);
			this.toppings.splice(index, 1);
		}
	}

	/**
	 * Получить список приправ.
	 * @return {string} Строка с названиями приправ.
	 */
	getToppings() {
		let toppingsList = this.toppings.map(function(topping) {
			if (topping == spiceTopping) {
				return 'специи';
			}else if (topping == mayoTopping) {
				return 'майонез';
			}
		})
		return toppingsList.join(', ');
	}

	/**
	 * Получить размер гамбургера.
	 * @return {string} Размер гамбургера.
	 */
	getSize() {
		return this._size == bigSize ? 'большой': 'маленький';
	}

	/**
	 * Получить данные о начинке гамбургера.
	 * @return {string} Начинка гамбургера.
	 */
	getStuffing() {
		let stuffing = '';
		switch (this._stuffing) {
			case cheeseStuffing:
				stuffing = 'сырную';
				break;
			case saladStuffing:
			 	stuffing = 'салатную';
			 	break;
			case potatoStuffing:
				stuffing = 'картофельную';
				break;
		}
		return stuffing;
	}

	/**
	 * Узнать цену гамбургера.
	 * @return {integer} Цена гамбургера.
	 */
	calculatePrice() {
		let totalPrice = this.sizeType[this._size].price + this.stuffingType[this._stuffing].price;
		let toppingsPrice = 0;
		for (let topping of this.toppings) {
			toppingsPrice += this.toppingType[topping].price;
		}
		totalPrice += toppingsPrice;
		return totalPrice;
	}

	/**
	 * Узнать калорийность гамбургера.
	 * @return {integer} Калорийность гамбургера.
	 */
	calculateCalories() {
		let totalCalories = this.sizeType[this._size].calories + this.stuffingType[this._stuffing].calories;
		let toppingsCalories = 0;
		for (let topping of this.toppings) {
			toppingsCalories += this.toppingType[topping].calories;
		}
		totalCalories += toppingsCalories;
		return totalCalories;
	}

	
}

let size;
let stuffing;
document.body.insertAdjacentHTML('afterbegin', `<form id="data">
													<p><b>Выберите размер гамбургера:</b></p>
													<p><input type="radio" name="size" value=${smallSize}>Маленький гамбургер</p>
													<p><input type="radio" name="size" value=${bigSize}>Большой гамбургер</p>
													<br>
													<p><b>Выберите начинку гамбургера:</b></p>
													<p><input type="radio" name="stuffing" value=${cheeseStuffing}>Сыр</p>
													<p><input type="radio" name="stuffing" value=${saladStuffing}>Салат</p>
													<p><input type="radio" name="stuffing" value=${potatoStuffing}>Картофель</p>
													<br>
													<p><b>Выберите специи:</b></p>
													<p><input type="checkbox" name="toppings" value=${spiceTopping}>Специи</p>
													<p><input type="checkbox" name="toppings" value=${mayoTopping}>Майонез</p>	
												</form>
												<button name="create-burger">Посчитать</button>
												<p class='info'></p>`);

let createBurgerBtn = document.querySelector('button[name=create-burger]');

createBurgerBtn.addEventListener('click', event => {
	let typesSizeElem = document.getElementsByName('size');
	let infoElem = document.querySelector('.info');
	typesSizeElem.forEach(typeItem => {
		if (typeItem.checked) {
			size = typeItem.value;
		}
	})

	let stuffingsElem = document.getElementsByName('stuffing');
	stuffingsElem.forEach(stuffingItem => {
		if (stuffingItem.checked) {
			stuffing = stuffingItem.value;
		}
	})

	const hamburgerObj = new Hamburger(size, stuffing);

	let toppingsElem = document.getElementsByName('toppings');
	toppingsElem.forEach(toppingItem => {
		if (toppingItem.checked) {
			hamburgerObj.addTopping(toppingItem.value);
		}
	})
	infoElem.innerText = `Приготовлен ${hamburgerObj.getSize()} гамбургер
	${hamburgerObj.getToppings() ? `c добавками: ${hamburgerObj.getToppings()}.`: "без добавок"}
	Гамбургер содержит ${hamburgerObj.getStuffing()} начинку.
	Цена гамбургера: ${hamburgerObj.calculatePrice()}р,
	калорийность ${hamburgerObj.calculateCalories()} калорий.`

	if (hamburgerObj.getToppings()) {
	infoElem.insertAdjacentHTML('afterend', `<p><b>Удалить специи:</b></p>
											 ${for (spam of hamburgerObj.getToppings().split(', ')) {
											 	`123`
											 }}`);
	}
})
	


/*let startButton = document.getElementsByName('start-button')[0];
startButton.addEventListener('click', (event) => {
	event.target.style.display = 'none';
	document.body.insertAdjacentHTML('afterbegin', `<div class="select-size"><p>Выберите размер гамбургера:</p>
													<button name="small-hamburger">Маленький гамбургер</button>
													<button name="big-hamburger">Большой гамбургер</button></div>`);

	let selectSizeElem = document.querySelector('.select-size');
	selectSizeElem.addEventListener('click', (event) => {
		if (event.target.name === 'small-hamburger') {
			size = 'small';
		}else {
			size = 'big';
		}
		selectSizeElem.style.display = 'none';
		document.body.insertAdjacentHTML('afterbegin', `<div class="select-stuffing"><p>Укажите начинку:</p>
													<button name="cheese">Сыр</button>
													<button name="salad">Салат</button>
													<button name="potato">Картофель</button></div>`);

		let selectStuffingElem = document.querySelector('.select-stuffing');
		selectStuffingElem.addEventListener('click', (event) => {
			if (event.target.name === 'cheese') {
				stuffing = 'cheese';
			}else if (event.target.name === 'salad') {
				stuffing = 'salad';
			} else {
				stuffing = 'potato';
			}
			selectStuffingElem.style.display = 'none';

			const hamburgerObj = new Hamburger(size, stuffing);
		})

	})
})*/



/*let size;
while (true) {
	size = prompt('Укажите размер гамбургера:\nб-большой\nм-маленький').toLowerCase();
	if (size == 'б' || size == 'м') {
		break;
	}
}
switch(size) {
	case 'б':
		size = bigSize;
		break;
	case 'м':
		size = smallSize;
		break;
}

let stuffing;
while (true) {
	stuffing = prompt('Укажите начинку:\n1-сыр\n2-салат\n3-картофель');
	if (['1', '2', '3'].includes(stuffing)) {
		break;
	}
}
switch(stuffing) {
	case '1':
		stuffing = cheeseStuffing;
		break;
	case '2':
		stuffing = saladStuffing;
		break;
	case '3':
		stuffing = potatoStuffing;
		break;
}

const hamburgerObj = new Hamburger(size, stuffing);

let toppingsArr;
while (true) {
	toppingsArr = prompt('По желанию, укажите через пробел добавляемые специи:\n1-приправа\n2-майонез').split(' ');
	if (toppingsArr[0] == '') {
		break;
	}
	if (toppingsArr.length === 1 && (toppingsArr.includes('1') || toppingsArr.includes('2'))) {
		break;
	}
	if(toppingsArr.length === 2 && toppingsArr.includes('1') && toppingsArr.includes('2')) {
		break;
	}	
}

for(let toppingNum of toppingsArr) {
	switch (toppingNum) {
		case '1':
			hamburgerObj.addTopping(spiceTopping);
			break;
		case '2':
			hamburgerObj.addTopping(mayoTopping);
			break;
	}	
}

alert(`Приготовлен ${hamburgerObj.getSize()} гамбургер
	c добавками: ${hamburgerObj.getToppings()}.
	Гамбургер содержит ${hamburgerObj.getStuffing()} начинку.
	Цена гамбургера: ${hamburgerObj.calculatePrice()}р,
	калорийность ${hamburgerObj.calculateCalories()} калорий.`);*/
