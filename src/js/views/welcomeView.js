//! Presentation Logic
import View from './View.js';

class WelcomeView extends View {
	_parentElement = document.querySelector('#welcome');
	_errorMessage = 'Error. Modal not loaded';
	_message = '';

	addHandlerRender(handler) {
		window.addEventListener('load', (e) => handler());
	}

	toggleModal() {
		const overlay = document.querySelector('#overlay');
		const modal = document.querySelector('#modal');
		console.log(overlay.classList);
		overlay.classList.remove('active');
		modal.classList.remove('active');
	}

	addHandlerClick(handler) {
		let btnOperation;
		this._parentElement.addEventListener('click', function (e) {
			const btn = e.target.closest('.number-button'); //? search the DOM
			if (!btn) return;

			console.log(btn.dataset.operation);
			btnOperation = btn.dataset.operation;
			// const goToPage = +btn.dataset.goto;
			// handler(goToPage);
		});
		handler(btnOperation);
	}

	addHandlerGoClick() {
		this._parentElement.addEventListener('click', function (e) {
			const btn = e.target.closest('.start-button'); //? search the DOM
			if (!btn) return;

			console.log('Go click');
			// const goToPage = +btn.dataset.goto;
			// handler(goToPage);

			// this.toggleModal();
			const overlay = document.querySelector('#overlay');
			const modal = document.querySelector('#modal');
			console.log(overlay.classList);
			overlay.classList.remove('active');
			modal.classList.remove('active');
		});
	}

	_generateMarkup() {
		return `
			<div id="overlay" class="active">
				<div id="title">
					<h1>Trivia Game</h1>
				</div>
			</div>
			<div class="modal active" id="modal">
				<div id="questionamt" class="modal-body">
					<h1>How many questions for this game?</h1>

					<!-- https://codepen.io/viestursm/pen/mdJeKVw -->
					<form action="javascript:void(0);">
						<div class="number-input-container">
							<button
								type="button"
								class="number-button button-decrement"
								data-operation="decrement"
							></button>
							<div class="number-input">
								<input
									type="number"
									id="questions"
									name="questions"
									class="number-input-text-box"
									value="10"
									min="5"
									max="100"
									data-step="5"
								/>
							</div>
							<button
								type="button"
								class="number-button button-increment"
								data-operation="increment"
							></button>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button data-start-button class="start-button">GO</button>
				</div>
			</div>
		`;
	}
}

export default new WelcomeView();

/*
<div id="overlay" class="active">
	<div id="title">
		<h1>Trivia Game</h1>
	</div>
</div>
<div class="modal active" id="modal">
	<div id="questionamt" class="modal-body">
		<h1>How many questions for this game?</h1>

		<!-- https://codepen.io/viestursm/pen/mdJeKVw -->
		<form action="javascript:void(0);">
			<div class="number-input-container">
				<button
					type="button"
					class="number-button button-decrement"
					onclick="setNumber()"
					data-input-id="questions"
					data-operation="decrement"
				></button>
				<div class="number-input">
					<input
						type="number"
						id="questions"
						name="questions"
						class="number-input-text-box"
						value="10"
						min="5"
						max="100"
						oninput="handleNumberInput()"
						onblur="handleNumberInputBlur(event)"
						data-step="5"
					/>
				</div>
				<button
					type="button"
					class="number-button button-increment"
					onclick="setNumber()"
					data-input-id="questions"
					data-operation="increment"
				></button>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button data-start-button class="start-button">GO</button>
	</div>
</div>
*/
