//! Presentation Logic
import View from './View.js';
import { state } from '../model.js';

class QuestionView extends View {
	_parentElement = document.querySelector('.question');
	_errorMessage = 'Error. No question found';
	_message = '';

	addHandlerRender(handler) {
		window.addEventListener('load', (e) => handler(0));
	}

	_generateMarkup() {
		return `
			<div class="question-block">
				<h2 class="question">${this._data[0].question}</h2>
				<ul class="answer-choices">
					${this._data[0].answers.map(this._generateMarkupAnswer).join('')}
				</ul>
			</div>
		`;
	}

	_generateMarkupAnswer(ans) {
		ans = ans.split('.');
		return `
			<li class="answer">
				<div>
					<p data-letter='${ans[3] ? ans[3] : 'false'}'>${ans[0]}.  ${ans[1]}<p>
				</div>
			</li>
		`;
	}
}

//? we will only export this object
export default new QuestionView();

/*
questionElement.innerHTML = '';
	//? print out the question
	const questionMarkup = `
		<h2>${model.data[0].question}</h2>
	`;
	questionElement.insertAdjacentHTML('afterbegin', questionMarkup);
	//? print out the answer options
	model.data[0].answers.forEach((ans) => {
		console.log(ans);
		ans = ans.split('.');
		let markup = `
			<p data-letter='${ans[3] ? ans[3] : 'false'}'>${ans[0]}.  ${ans[1]}<p>
		`;
		questionElement.insertAdjacentHTML('beforeend', markup);
	});
*/
