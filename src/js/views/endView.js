//! Presentation Logic
import View from './View.js';

class endView extends View {
	_parentElement = document.querySelector('.question-block');
	_errorMessage = 'Error. No question found';
	_message = '';

	toggleActiveClass() {
		const wrapper = document.querySelector('.question-wrapper');
		wrapper.classList.toggle('active');
	}

	addHandlerRender(handler) {
		window.addEventListener('load', (e) => handler());
	}

	addHandlerResetClick(handler) {
		this._parentElement.addEventListener('click', function (e) {
			const btn = e.target.closest('.reset-button'); //? search the DOM
			if (!btn) return;

			// console.log('reseting values...');
			handler('reseting values...');
		});
	}

	_generateMarkup() {
		return `
		<div id="question">Final Score</div>
		<div class="final-score-wrapper">
			${this._data.correctAnswers * 100}
		</div>
		<div class="reset-wrapper">
			<button data-start-reset class="reset-button">Start Again</button>
		</div>
		`;
	}
}

export default new endView();
