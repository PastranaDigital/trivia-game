import * as model from './model.js';
import welcomeView from './views/welcomeView.js';
import responseView from './views/responseView.js';
import totalsView from './views/totalsView.js';
import questionView from './views/questionView.js';
import endView from './views/endView.js';
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

const controlWelcome = function () {
	welcomeView.render(model.state.totals);
};

const controlWelcomeClick = function (operation, inputElem) {
	if (inputElem) {
		let value = parseFloat(inputElem.value);
		let step = parseFloat(inputElem.dataset.step);

		if (operation === 'decrement') {
			value -= isNaN(step) ? 1 : step;
		} else if (operation === 'increment') {
			value += isNaN(step) ? 1 : step;
		}

		if (inputElem.hasAttribute('min') && value < parseFloat(inputElem.min)) {
			value = inputElem.min;
		}

		if (inputElem.hasAttribute('max') && value > parseFloat(inputElem.max)) {
			value = inputElem.max;
		}

		if (inputElem.value !== value) {
			welcomeView.setInputValue(inputElem, value);
			welcomeView.setInputButtonState();
		}
		// console.log('New number of questions: ', value);

		//? update the value inside the data with new number of questions
		model.updateNumOfQuestions(value);
	}
};

const controlWelcomeGoClick = function (payload) {
	console.log(payload);

	//? close modal
	welcomeView.toggleActiveClass();
	questionView.toggleActiveClass();

	//? render the quiz
	renderQuiz();
};

const controlResetClick = function (payload) {
	console.log(payload);
	window.location.reload(false);

	// //? reset values in the modal
	// model.resetScore();

	// //? render the welcomeView
	// controlWelcome();
};

const controlQuestionClick = function (payload) {
	// payload is the data answer value of the button pressed
	console.log(`Answer is: ${payload}`);

	//? handle logic for the answer
	//? 	if it is correct, increase correctAnswers
	//? 	else don't
	//? 	regardless, increase currentQuestion (inside function)
	const response = payload === 'correct';
	model.updateScore(response);

	//! check if done with questions
	if (model.checkIfCompleted()) {
		console.log('END OF GAME');
		questionView.toggleActiveClass();
		responseView.render(model.state.totals);
		setTimeout(() => {
			responseView.toggleActiveClass();
			endView.toggleActiveClass();
			totalsView.update(model.state.totals);
			// totalsView.toggleActiveClass();

			// numberOfQuestionsView.toggleActiveClass();
			endView.render(model.state.totals);
		}, 1500);
	} else {
		//? render the response to the answer selected
		questionView.toggleActiveClass();
		responseView.render(model.state.totals);
		setTimeout(() => {
			responseView.toggleActiveClass();
			questionView.toggleActiveClass();
		}, 1500);

		//? update now with new data
		totalsView.update(model.state.totals);
		numberOfQuestionsView.update(model.state.totals);

		//? render view with next question
		//? chose this function since it exists and shuffles answers around before render
		controlQuestion();
		// model.checkIfCompleted() ? console.log('END OF GAME') : controlQuestion();

		//! check if done with questions
		// if (model.state.totals) endView.render();
		// model.checkIfCompleted() ? console.log('END OF GAME') : console.log('NOT END OF GAME');
	}
};

const renderQuiz = function () {
	// console.log(model.state);
	model.shuffleQuestionOrder();

	controlTotals();
	controlQuestion();
	controlNumberOfQuestions();
};

const init = function () {
	// for front page modal buttons
	// enable active states for buttons in mobile safari
	document.addEventListener('touchstart', function () {}, false);

	welcomeView.addHandlerRender(controlWelcome);
	welcomeView.addHandlerClick(controlWelcomeClick);
	welcomeView.addHandlerGoClick(controlWelcomeGoClick);

	questionView.addHandlerQuestionClick(controlQuestionClick);
	endView.addHandlerResetClick(controlResetClick);
};

init();
