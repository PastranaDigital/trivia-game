//! Presentation Logic
import View from './View.js';

class ResponseView extends View {
	_parentElement = document.querySelector('#welcome');
	_errorMessage = 'Error. Modal not loaded';
	_message = '';
	_correctImg = 'https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-512.png';
	_wrongImg = 'https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Close_Icon_Dark-512.png';

	addHandlerRender(handler) {
		window.addEventListener('load', (e) => handler());
	}

	toggleActiveClass() {
		const overlay = document.querySelector('#response-overlay');
		const modal = document.querySelector('#modal');
		// if (!overlay) return;
		overlay.classList.toggle('active');
		modal.classList.toggle('active');
	}

	_generateMarkup() {
		return `
			<div id="response-overlay" class="active"></div>
			<div class="response modal active" id="modal">
				<div class="modal-body">
					<h1>${this._data.isResponseCorrect ? 'Correct' : 'Wrong'}</h1>
					<img width='256px' src='${this._data.isResponseCorrect ? this._correctImg : this._wrongImg}'/>
				</div>
			</div>
		`;
	}
}

export default new ResponseView();
