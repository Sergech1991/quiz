const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

const headerContainer = document.querySelector('.quiz-header');
const listContainer = document.querySelector('.quiz-list');
const submitBtn = document.querySelector('.quiz-submit');

// кол-во правильных ответов
let score = 0;

//кол-во правильных ответов
let questionIndex = 0;




//очистка html разметки
function clearPage() {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

clearPage();


//рендер текущего вопроса
function showQusetion() {

	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
	headerContainer.innerHTML = title;

	for ([index, answerText] of questions[questionIndex]['answers'].entries()) {
		const questionTemplate = 
			`<li>
				<label>
					<input type="radio" value="%number%" class="answer" name="answer" />
					<span>%answer</span>
				</label>
			</li>`;

		const answerHTML = questionTemplate.replace('%answer', answerText).replace('%number%', index+1);
		listContainer.innerHTML += answerHTML;

	}

}

showQusetion();


function checkAnswer() {

	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
	
	if (!checkedRadio) {
		submitBtn.blur();
		return;
	}

	const userAnswer = parseInt(checkedRadio.value);

	
	
	if (userAnswer === questions[questionIndex]['correct']) {
		score++;
	}


	if (questionIndex !== questions.length - 1) {
			questionIndex++;
			clearPage();
			showQusetion();
	} else {
			clearPage();
			showResults();
	}

}



function showResults() {
	const resuktTemplate = 	`
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>
	`;

	let title, message;
	let result = `${score} из ${questions.length}`;

	if (score === questions.length) {
		title = 'Поздравляем!!!';
		message = 'Вы ответили верно на все вопросы';
	} else if ((score * 100) / questions.length >= 50) {
		title = 'Неплохой результат';
		message = 'Вы дали более половины правильных ответов';
	} else {
		title = 'Стоит постараться';
		message = 'Пока у вас менее половины правильных ответов';
	}


	const finallyMessage = resuktTemplate
								.replace('%title%', title)
								.replace('%message%', message)
								.replace('%result%', result);

	headerContainer.innerHTML = finallyMessage;


	submitBtn.blur();
	submitBtn.innerHTML = 'Начать заново';
	submitBtn.addEventListener('click', () => history.go());
}










submitBtn.addEventListener('click', checkAnswer);