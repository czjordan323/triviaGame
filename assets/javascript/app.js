var card = $('#quiz-area');
var countStart = 30;

var questions = [{
    question: 'What year was the game Zelda released?',
    answers: ["1979", "1996", "1983", "1986"],
    correctAnswer: "1986",
    image: "assets/images/zelda.gif"
}, {
    question: 'What team won the NBA Finals in 2001?',
    answers: ["New York Knicks", "Boston Celtics", "Chicago Bulls", "Los Angeles Lakers"],
    correctAnswer: "Los Angeles Lakers",
    image: 'assets/images/kobeshaq.gif'
}, {
    question: 'What is the most valuable global brand in the world?',
    answers: ["Samsung", "Apple", "Google", "Amazon" ],
    correctAnswer: "Apple",
    image: 'assets/images/apple.gif'
}, {
    question: 'What year was the first cell phone invented?',
    answers: ["1965", "1970", "1973", "1982"],
    correctAnswer: "1973",
    image: 'assets/images/cellphone.gif'
}, {
    question: 'What is Harry Potters middle name?',
    answers: ["Sirius", "Vernon", "James", "Fred"],
    correctAnswer: "James",
    image: 'assets/images/harrypotter.gif'
}, {
    question: 'What is Darth Vaders real name?',
    answers: ["Lord Voldemort", "Luke Skywalker", "Anakin Skywalker", "Chancellor Palpatine"],
    correctAnswer: "Anakin Skywalker",
    image: 'assets/images/anakinskywalker.gif'
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
    $("#counter-number").text(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(game.countdown, 1000);

    card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      card.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
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

    card.html("<h2>All done, heres how you did!</h2>");

    $("#counter-number").text(game.counter);

    card.append("<h3>Correct Answers: " + game.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    card.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    card.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    game.incorrect++;

    clearInterval(timer);

    card.html("<h2>Wrong Answer!</h2>");
    card.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    card.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(timer);

    game.correct++;

    card.html("<h2>Correct! Wow you are smart</h2>");
    card.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStart;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};



$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion();
});

