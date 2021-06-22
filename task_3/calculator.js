class Calculator {
	constructor(num1, num2) {
		this.num1 = num1;
		this.num2 = num2;
	}

	getSum() {
		return this.num1 + this.num2;
	}

	getSub() {
		return this.num1 - this.num2;
	}

	getMul() {
		return this.num1 * this.num2;
	}

	getDiv() {
		return this.num1 / this.num2;
	}
}

let myObj = new Calculator(6, 5);
console.log(myObj.getSum());
console.log(myObj.getSub());
console.log(myObj.getMul());
console.log(myObj.getDiv());