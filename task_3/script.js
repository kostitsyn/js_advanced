// Валидация введённых значений в форме.

const init = () => {
	let formElem = document.querySelector('form');
	formElem.addEventListener('submit', event => {
		let errorsElem = [];

		/**
		 *  Скрывает сообщение об ошибке и возвращает серый цвет рамке.
		 * @param  {object} Элемент инпута.
		 */
		function hideErrorMsg(elem) {
			elem.style.borderColor = 'rgb(118, 118, 118)';
			let errorElem = document.getElementById(`${elem.name}-error`);
			if (errorElem) {
				errorElem.style.display = 'none';
			}
			
		}

		// Проверяем имя на наличие только букв.
		let nameElem = document.getElementsByName('name')[0];
		nameElem.style.borderColor = 'default';
		const nameRegexp = /^[a-zA-Zа-яА-Я]+$/g;
		let isOnlylettersInName = nameRegexp.test(nameElem.value);
		if (!isOnlylettersInName) {
			errorsElem.push(nameElem);
		}else { 
			hideErrorMsg(nameElem);
		}

		// Проверяем телефон на соответствие формату +7(000)000-0000.
		let phoneElem = document.getElementsByName('phone')[0];
		phoneElem.style.borderColor = 'default';
		const phoneRegexp =/^\+7\(\d{3}\)\d{3}-\d{4}$/g;
		let isValidPhone = phoneRegexp.test(phoneElem.value);
		if (!isValidPhone) {
			errorsElem.push(phoneElem);
		}else { 
			hideErrorMsg(phoneElem);
		}

		// Проверяем Email на соответствие виду mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
		let emailElem = document.getElementsByName('email')[0];
		const emailRegexp = /^\S+@mail\.ru$/g;
		let isValidEmail = emailRegexp.test(emailElem.value);
		if (!isValidEmail) {
			errorsElem.push(emailElem);
		}else { 
			hideErrorMsg(emailElem);
		}


		for (let elem of errorsElem) {
			console.log(elem);
			elem.style.borderColor = 'red';
			let warningMsgElem = document.getElementById(`${elem.name}-error`);
			if (warningMsgElem) {
				warningMsgElem.innerText = ' Ошибка!';
			}else {
				elem.parentNode.insertAdjacentHTML('beforebegin', `<p id="${elem.name}-error">Ошибка!</p>`);
				console.log('123');
			}
		}

		event.preventDefault();
	})
}

window.onload = init