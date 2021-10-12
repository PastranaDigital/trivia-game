const score = 0;
let selectedNumberOfQuestions;
let totalNumberOfQuestions;

const data = [
	{
		question: 'Who scored the winning goal in the 2104 World Cup Final?',
		answers: ['Alex', 'Brad', 'Carlos', 'Devin'],
	},
];

const questionElement = document.querySelector('.question');

/**
 *
 * @param {Array} array array that you want shuffled
 */
//* the de-facto unbaised shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle
const shuffleArray = function (array) {
	let currentIndex = array.length,
		randomIndex;

	//? While there remain elements to shuffle
	while (currentIndex != 0) {
		//? Pick a remaining element
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		//? swap that with the current element
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	const abcArray = ['A', 'B', 'C', 'D'];

	let finalAnswerOptions = [];
	array.forEach((element, index) => {
		console.log(`${abcArray[index]}.${element}`);
		finalAnswerOptions.push(`${abcArray[index]}.${element}`);
	});
	console.log(finalAnswerOptions);
	array = finalAnswerOptions;
	console.log(array);
	return array;
};

const init = function () {
	questionElement.innerHTML = '';
	//? print out the question
	questionElement.insertAdjacentHTML('afterbegin', data[0].question);
	//? print out the answer options
	data[0].answers.forEach((ans) => {
		console.log(ans);
		ans = ans.split('.');
		let markup = `
			<p data-letter='${ans[0]}'>${ans[0]}.  ${ans[1]}<p>
		`;
		questionElement.insertAdjacentHTML('beforeend', markup);
	});
};

// let arr = [2, 11, 37, 42];
console.log('data[0].answers', data[0].answers);
shuffleArray(data[0].answers);
// console.log(data[0].answers);
// console.log(arr);
// shuffleArray(arr);
// console.log(arr);

init();
