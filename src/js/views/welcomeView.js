//! Presentation Logic
import View from './View.js';

class WelcomeView extends View {
	_parentElement = document.querySelector('#welcome');
	_errorMessage = 'Error. Modal not loaded';
	_message = '';

	addHandlerRender(handler) {
		window.addEventListener('load', (e) => handler());
	}

	_generateMarkup() {
		return `
			<p>Score: ${this._data.correctAnswers * 100}</p>
			<p>Correct: ${this._data.correctAnswers}</p>
			<p>Total: ${this._data.totalSelectedQuestions}</p>
		`;
	}
}

export default new WelcomeView();
