//! Presentation Logic
import View from './View.js';

class ResponseView extends View {
	_parentElement = document.querySelector('#welcome');
	_errorMessage = 'Error. Modal not loaded';
	_message = '';

	addHandlerRender(handler) {
		window.addEventListener('load', (e) => handler());
	}

	toggleActiveClass() {
		const overlay = document.querySelector('#response-overlay');
		const modal = document.querySelector('#modal');
		overlay.classList.toggle('active');
		modal.classList.toggle('active');
	}

	_generateMarkup() {
		return `
			<div id="response-overlay" class="active"></div>
			<div class="response modal active" id="modal">
				<div class="modal-body">
					<h1>${this._data.isResponseCorrect ? 'Correct' : 'Wrong'}</h1>
				</div>
			</div>
		`;
	}
}

export default new ResponseView();
