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
    correct: 0,
    incorrect: 0,

    countdown: function() {
        game.counter--;
        $('#counter-number').text(game.counter);
        if (game.counter === 0) {
            console.log('OUT OF TIME');
            game.timeUp();
        }
    },

    loadQuestion: function() {
        timer = setInterval(game.countdown, 1000);

        card.html('<h2>' +questions[this.currentQuestion].question + '</h2>');
        
        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
            card.append("<button class='answer-button' id= 'button' data-name='" + questions[this.currentQuestion].answers[i]
            + " '>" + questions[this.currentQuestion].answers[i] + "</button>");
        }
    },

    nextQuestion: function() {
        game.counter = countStart;
        $("#counter-number").text(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },

    timeUp: function() {
        clearInterval(timer);
        $("#counter-number").html(game.counter);

        card.html("<h2>Out of Time!</h2>");
        card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
        card.append("<img src='" + questions[this.currentQuestion].image + "' />");

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        }
        else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }

    },


    results: function() {
        clearInterval(timer);

        card.html("<h2>All done, check your score!</h2>");
        $("#counter-number").text(game.counter);

        card.append("<h3>Correct Answers: " + game.correct + "</h3>");
    }
}