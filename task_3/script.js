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
			this.toppings.pop(topping);
		}
	}

	/**
	 * Получить список приправ.
	 * @return {string} Строка с названиями приправ.
	 */
	getToppings() {
		let toppingsList = this.toppings.map(function(topping) {
			if (topping == 'spice') {
				return 'специи';
			}else if (topping == 'mayo') {
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
		return this._size == 'big' ? 'большой': 'маленький';
	}

	/**
	 * Получить данные о начинке гамбургера.
	 * @return {string} Начинка гамбургера.
	 */
	getStuffing() {
		let stuffing = '';
		switch (this._stuffing) {
			case 'cheese':
				stuffing = 'сырную';
				break;
			case 'salad':
			 	stuffing = 'салатную';
			 	break;
			case 'potato':
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

// Пропишем константы чтобы уйти от хардкода
const bigSize = 'big';
const smallSize = 'small';
const cheeseStuffing = 'cheese';
const saladStuffing = 'salad';
const potatoStuffing = 'potato';
const spiceTopping = 'spice';
const mayoTopping = 'mayo';  

let size;
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
	калорийность ${hamburgerObj.calculateCalories()} калорий.`);
