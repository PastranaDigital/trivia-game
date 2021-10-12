import * as model from './model.js';
import questionView from './views/questionView.js';
import { shuffleAnswers } from './helper.js';

const controlQuestion = function (qNumber = 1) {
	console.log('model.state.questionBank.answers', model.state.questionBank[qNumber].answers);
	shuffleAnswers(model.state.questionBank[qNumber].answers);
	questionView.render(model.state.questionBank);
};

const init = function () {
	questionView.addHandlerRender(controlQuestion);
};

init();
