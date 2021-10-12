/**
 *
 * @param {Array} array array that you want shuffled
 */
//* the de-facto unbaised shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle
export const shuffleAnswers = function (array) {
	let currentIndex = array.length;
	let randomIndex;

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
