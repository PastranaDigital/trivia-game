import * as model from './model.js';
import welcomeView from './views/welcomeView.js';
import totalsView from './views/totalsView.js';
import questionView from './views/questionView.js';
import numberOfQuestionsView from './views/numberOfQuestionsView.js';
import { shuffleArray } from './helper.js';

const controlTotals = function () {
	totalsView.render(model.state.totals);
};

const controlQuestion = function () {
	shuffleArray(model.state.questionBank[model.state.totals.currentQuestion - 1].answers);
	questionView.render(model.state.questionBank[model.state.totals.currentQuestion - 1]);
};

const controlNumberOfQuestions = function () {
	numberOfQuestionsView.render(model.state.totals);
};

const controlFrontPage = function () {
	welcomeView.render(model.state.totals);
};

const init = function () {
	// for front page modal buttons
	// enable active states for buttons in mobile safari
	document.addEventListener('touchstart', function () {}, false);

	model.shuffleQuestionOrder();

	welcomeView.addHandlerRender(controlFrontPage);
	totalsView.addHandlerRender(controlTotals);
	questionView.addHandlerRender(controlQuestion);
	numberOfQuestionsView.addHandlerRender(controlNumberOfQuestions);

	document.addEventListener('click', setNumber(event));

	setInputButtonState();
};

//! ----------------------------------------------------

function handleNumberInput() {
	setInputButtonState();
}

function handleNumberInputBlur(event) {
	const value = event.target.value;

	if (event.target.hasAttribute('min') && value < parseFloat(event.target.min)) event.target.value = event.target.min;

	if (event.target.hasAttribute('max') && value > parseFloat(event.target.max)) event.target.value = event.target.max;
}

function setInputButtonState() {
	const inputs = document.getElementsByClassName('number-input-text-box');

	for (let input of inputs) {
		if (input.id.length > 0) {
			// during value transition the old input won't have an id
			const value = input.value;
			const parent = input.parentElement.parentElement;

			if (parent.children[0] && input.hasAttribute('min'))
				parent.children[0].disabled = value <= parseFloat(input.min);

			if (parent.children[2] && input.hasAttribute('max'))
				parent.children[2].disabled = value >= parseFloat(input.max);
		}
	}
}

function setNumber(event) {
	let button = event.target;
	let input = document.getElementById(button.dataset.inputId);

	if (input) {
		let value = parseFloat(input.value);
		let step = parseFloat(input.dataset.step);

		if (button.dataset.operation === 'decrement') {
			value -= isNaN(step) ? 1 : step;
		} else if (button.dataset.operation === 'increment') {
			value += isNaN(step) ? 1 : step;
		}

		if (input.hasAttribute('min') && value < parseFloat(input.min)) {
			value = input.min;
		}

		if (input.hasAttribute('max') && value > parseFloat(input.max)) {
			value = input.max;
		}

		if (input.value !== value) {
			setInputValue(input, value);
			setInputButtonState();
		}
	}
}

function setInputValue(input, value) {
	let newInput = input.cloneNode(true);
	const parentBox = input.parentElement.getBoundingClientRect();

	input.id = '';

	newInput.value = value;

	if (value > input.value) {
		// right to left
		input.parentElement.appendChild(newInput);
		input.style.marginLeft = -parentBox.width + 'px';
	} else if (value < input.value) {
		// left to right
		newInput.style.marginLeft = -parentBox.width + 'px';
		input.parentElement.prepend(newInput);
		window.setTimeout(function () {
			newInput.style.marginLeft = 0;
		}, 20);
	}

	window.setTimeout(function () {
		input.parentElement.removeChild(input);
	}, 250);
}

init();
