//! Presentation Logic
import View from './View.js';
import { state } from '../model.js';

class QuestionView extends View {
	_parentElement = document.querySelector('.question-block');
	_errorMessage = 'Error. No question found';
	_message = '';

	addHandlerRender(handler) {
		window.addEventListener('load', (e) => handler(0));
	}

	_generateMarkup() {
		return `
			<div id="question">
				<h1>${this._data[0].question}</h1>
			</div>
			${this._data[0].answers.map(this._generateMarkupAnswer).join('')}
		`;
	}

	_generateMarkupAnswer(ans) {
		ans = ans.split('.');
		return `
			<div class="answers">
				<p data-letter='${ans[3] ? ans[3] : 'false'}'>${ans[0]}.  ${ans[1]}<p>
			</div>
		`;
	}
}

//? we will only export this object
export default new QuestionView();

/*
<div id="question">
				<h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta.</h1>
				<!-- Question Box -->
			</div>

			<div class="answers">
				<p>Lorem ipsum dolor sit amet</p>
			</div>
			<div class="answers">
				<p>Lorem ipsum dolor sit amet</p>
				<!-- 4 different answer boxes/ may change this later-->
			</div>

			<div class="answers2">
				<p>Lorem ipsum dolor sit amet</p>
			</div>

			<div class="answers2">
				<p>Lorem ipsum dolor sit amet</p>
			</div>
*/
