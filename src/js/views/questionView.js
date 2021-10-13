//! Presentation Logic
import View from './View.js';

class QuestionView extends View {
	_parentElement = document.querySelector('.question-block');
	_errorMessage = 'Error. No question found';
	_message = '';

	addHandlerRender(handler) {
		window.addEventListener('load', (e) => handler());
	}

	_generateMarkup() {
		return `
			<div id="question">
				<h1>${this._data.question}</h1>
			</div>
			${this._data.answers.map(this._generateMarkupAnswer).join('')}
		`;
	}

	_generateMarkupAnswer(ans) {
		ans = ans.split('.');
		return `
			<div class="answers">
				<p data-letter='${ans[1] ? ans[1] : 'false'}'>${ans[0]}<p>
			</div>
		`;
	}
}

export default new QuestionView();
