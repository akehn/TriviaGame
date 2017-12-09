// JavaScript: Trivia Game
// =====================================================================================

var triviaArray = [{
  answer: "Elsa",
  description: "<strong>Elsa was not part of Disney's official princess lineup</strong>",
  title: "Which one of these princesses is NOT part of Disney’s official princess lineup?",
  img: "assets/images/elsa.jpg",
  choices: ["Rapunzel", "Merida", "Elsa", "Pocahontas"]
},
{
  answer: "A loaf of bread",
  description: "Aladdin and Abu steal a piece of <strong>bread</strong>.",
  title: "What do Aladdin and his monkey Abu steal from the marketplace when you’re first introduced to them in the movie?",
  img: "assets/images/abu.gif",
  choices: ["A loaf of bread", "An apple", "Cheese", "Crackers"]
},
{
  answer: "Mickey Mouse",
  description: "<strong>Mickey Mouse</strong> made an appearance in Frozen.",
  title: "What popular Disney character makes an appearance as a stuffed animal in Frozen?",
  img: "assets/images/mickey.jpg",
  choices: ["Winnie the Pooh", "Mickey Mouse", "Tinker Bell", "Mr. Potato Head"]
},
{
  answer: "Cinderella",
  description: "<strong>Cinderella</strong> was the first Disney princess.",
  title: "Who was the first Disney princess?",
  img: "assets/images/cinderella.jpg",
  choices: ["Cinderella", "Snow White", "Aurora", "Pocahontas"]
},
{
  answer: "Anastasia and Drizella",
  description: "<strong>Anastasia & Drizell</strong> where Cinderella's evil stepsisters",
  title: "What are the names of Cinderella's evil stepsisters?",
  img: "assets/images/ad.jpg",
  choices: ["Ana and Diana", "Anastasia and Drizella", "Beatrice and Daphine", "Mary and Prudence"]
},
{
  answer: "Prince George",
  description: "<strong>Prince George</strong> is not a Disney prince",
  title: "Which is NOT a Disney prince?",
  img: "assets/images/george.jpg",
  choices: ["Prince Eric", "Prince Charming", "Prince Naveen", "Prince George"]
},
{
  answer: "A Bear",
  description: "A <strong>Bear</strong> what Merida's mother turns into.",
  title: "What does the enchanted cake in Brave turn Merida's mother into?",
  img: "assets/images/brave.jpg",
  choices: ["A Frog", "A Cat", "A Bear", "A Dog"]
},
{
  answer: "Chip Potts",
  description: "<strong>Chip Potts</strong> is the name of the tea cup from Beauty and the Beast.",
  title: "What is the name of the tea cup from Beauty and the Beast?",
  img: "assets/images/chip.jpg",
  choices: ["Chippy Potts", "Mr. Potts", "Chip Potts", "Monsieur Potts"]
}
]

var originalTriviaArrayLength = triviaArray.length

var targetCharacter;

var characterIndex;

var wins = 0;

var questions = 1;

var number = 10;

var counter;

var unanswered = 0;

function questionTimer(){
counter = setInterval(decrement, 1000);
}

function stop(){
clearInterval(counter);
}

function decrement(){
number--;
$('#timer').html("<h3><strong>You have " + number + " seconds left</strong></h3>");
if(number === 0){
  stop();
  triviaArray.splice(characterIndex, 1);
  unanswered++;
  $("#instructions").html("<p>You've run out of time!</p>");
  $("#timer").empty();
  $("#answerChoices").html("<p class='options'>" + targetCharacter.description + "</p>");
  $("#eventButton").html("<button class='btn btn-lg btn-primary text-center button button'>Next</button>")
  if(triviaArray.length === 0){
    empty();
    $("#instructions").html("You answered " + wins + " out of " + originalTriviaArrayLength + " correctly!")
  }
}
}

function populateQuestion(){
targetCharacter = triviaArray[Math.floor(Math.random()*triviaArray.length)];
characterIndex = triviaArray.indexOf(targetCharacter);
//populate instructions/disply
$("#questionsLeft").html("<h1>" + questions + "/" + originalTriviaArrayLength + " Questions." + "</h1>");
$("#instructions").html("<h2 id='title'>" + targetCharacter.title + "</h2>");
$("#image").html("<p><img class=charImage src='" + targetCharacter.img + "'></p>");
//reset timer
number = 10;
//start timer
questionTimer();
//display timer
for (var i = 0; i < targetCharacter.choices.length; i++){
  $("#answerChoices").append("<button id='choice' class='btn btn-lg btn-primary text-center button button choices'>" + targetCharacter.choices[i] + "</button>" + "</br>" );
}
questions++;
}

function empty(){
$("#instructions").empty();
$("#image").empty();
$("#answerChoices").empty();
$("#timer").empty();
$("#eventButton").empty();
$("#scoreButton").empty();
}

function checkAnswer(){
$(".choices").on('click', function(){
  var guessedName = $(this).text();
  triviaArray.splice(characterIndex, 1); //removes character so no duplicates
  stop();
  if(triviaArray.length >= 0){
    if (guessedName === targetCharacter.answer){
      wins++;
      $("#instructions").html("<p>Correct!</p>");
      $("#timer").empty();
      $("#answerChoices").html("<p>" + targetCharacter.description + "</p>");
      $("#eventButton").html("<button class='btn btn-lg btn-primary text-center button button'>Next</button>");
    }
    else{
      $("#instructions").html("<p>Incorrect!</p>");
      $("#timer").empty();
      $("#answerChoices").html("<p>" + targetCharacter.description + "</p>");
      $("#eventButton").html("<button id='nextButton' class='btn btn-lg btn-primary text-center button button'>Next</button>");
    }
  }
  
  if(triviaArray.length === 0){
    if (guessedName === targetCharacter.answer){
      wins++;
      $("#instructions").html("<p>Correct!</p>");
      $("#timer").empty();
      $("#answerChoices").html("<p>" + targetCharacter.description + "</p>");
      $("#eventButton").html("<button class='btn btn-lg btn-primary text-center button button'>See your score</button>");
    }
    else{
      $("#instructions").html("<p>Incorrect!</p>");
      $("#timer").empty();
      $("#answerChoices").html("<p>" + targetCharacter.description + "</p>");
      $("#scoreButton").html("<button id='nextButton' class='btn btn-lg btn-primary text-center button button button'>See your score</button>");
    }
  }
});
}

$(document).ready(function(){
$("#startButton").on('click', function(){
  populateQuestion();
  checkAnswer();
});

$("#eventButton").on('click', function(){
  empty();
  populateQuestion();
  checkAnswer();
});

$("#scoreButton").on('click', function(){
  empty();
  $("#questionsLeft").empty();
  $("#instructions").html("You answered " + wins + " out of " + originalTriviaArrayLength + " correctly!<br><h2>You left " + unanswered + " unanswered." + "</h2>");
});

});