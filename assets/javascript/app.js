var card = $('#quiz-area');
var countStart = 30;

var questions = [{
    question:'',
    answers: [],
    correctAnswer: '',
    image: ''
}, {
    question:'',
    answers: [],
    correctAnswer: '',
    image: ''
}, {
    question:'',
    answers: [],
    correctAnswer: '',
    image: ''
}, {
    question:'',
    answers: [],
    correctAnswer: '',
    image: ''
}];

var timer;

var game = {

    questions: questions,
    currentQuestion: 0,
    counter: countStart,
}