const script = require('../calculator.js');
const calc = script.calc;


describe('Метод getSum()', () => {
	it('должен возвращать 10 при аргументах (3, 7)', () => {
		expect(calc.getSum(3, 7)).toBe(10);
	});
	it('должен возвращать "3spam" при аргументах (3, "spam")', () => {
		expect(calc.getSum(3, 'spam')).toBe('3spam');
	});
	it('должен возвращать 3 при аргументах (3, null)', () => {
		expect(calc.getSum(3, null)).toBe(3);
	});
	it('должен возвращать NaN при аргументах (3, undefined)', () => {
		expect(calc.getSum(3, undefined)).toEqual(NaN);
	});
});

describe('Метод getSub()', () => {
	it('должен возвращать 3 при аргументах (7, 4)', () => {
		expect(calc.getSub(7, 4)).toBe(3);
	});
	it('должен возвращать "NaN" при аргументах (3, "spam")', () => {
		expect(calc.getSub(3, 'spam')).toEqual(NaN);
	});
	it('должен возвращать 3 при аргументах (3, null)', () => {
		expect(calc.getSub(3, null)).toBe(3);
	});
	it('должен возвращать NaN при аргументах (3, undefined)', () => {
		expect(calc.getSub(3, undefined)).toEqual(NaN);
	});
});

describe('Метод getMul()', () => {
	it('должен возвращать 12 при аргументах (3, 4)', () => {
		expect(calc.getMul(3, 4)).toBe(12);
	});
	it('должен возвращать "NaN" при аргументах (3, "spam")', () => {
		expect(calc.getMul(3, 'spam')).toEqual(NaN);
	});
	it('должен возвращать 0 при аргументах (3, null)', () => {
		expect(calc.getMul(3, null)).toBe(0);
	});
	it('должен возвращать NaN при аргументах (3, undefined)', () => {
		expect(calc.getMul(3, undefined)).toEqual(NaN);
	});
});

describe('Метод getDiv()', () => {
	it('должен возвращать 3 при аргументах (12, 4)', () => {
		expect(calc.getDiv(12, 4)).toBe(3);
	});
	it('должен возвращать "NaN" при аргументах (3, "spam")', () => {
		expect(calc.getDiv(3, 'spam')).toEqual(NaN);
	});
	it('должен возвращать Infinity при аргументах (3, null)', () => {
		expect(calc.getDiv(3, null)).toBe(Infinity);
	});
	it('должен возвращать NaN при аргументах (3, undefined)', () => {
		expect(calc.getDiv(3, undefined)).toEqual(NaN);
	});
});