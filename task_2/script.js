// Дорабатываем чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.

const init = () => {
	const regexp = /(?<!\S\w)'/g;
	const originalText  = document.querySelector('.original-text').innerHTML;
	const modifyText = originalText.replace(regexp, '"');
	document.querySelector('.modify-text').innerHTML = modifyText;
}

window.onload = init;
