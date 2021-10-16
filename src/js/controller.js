import * as model from './model.js';
import totalsView from './views/totalsView.js';
import questionView from './views/questionView.js';
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

const init = function () {
	model.shuffleQuestionOrder();
	totalsView.addHandlerRender(controlTotals);
	questionView.addHandlerRender(controlQuestion);
	numberOfQuestionsView.addHandlerRender(controlNumberOfQuestions);
};

init();
