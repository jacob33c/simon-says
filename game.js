// IDEA: this will hold the color of the buttons
var buttonColors = ["green", "red", "yellow", "blue"];

// IDEA: this is the computer generated pattern
var gamePattern = [];

// IDEA: this is the user genertate pattern
var userClickedPattern = [];

// used to determine what level we are one
var level = 0;

//used to determine if the game has been started
var gameStart = false;
$(document).keypress(function(event) {
  if (gameStart == false) {
    gameStart = true;
    nextSequence();
  }
});



// this will listen and track the clicking of the four buttons
$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  if(gamePattern.length == 0 ){
    return;
  }
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  compareArray(userChosenColor);
});

// IDEA: this function will add a new color to the computer generated sequennce
function nextSequence() {
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  flashSequence();
  level++;
  $("#level-title").text("Level " + level);
}

// IDEA: this function will flash the computer generated sequence
function flashSequence() {
  switch (gamePattern[level]) {
    case "green":
      animatePress("green");
      playSound("green");
      break;
    case "blue":
      animatePress("blue");
      playSound("blue");
      break;
    case "yellow":
      animatePress("yellow");
      playSound("yellow");
      break;
    case "red":
      animatePress("red");
      playSound("red");
      break;
    default:
      console.log(gamePattern);
  }
}

// IDEA: this function will play the sounds
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

// IDEA: this function will animate the buttons
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// this will run whenever the user loses
function gameOver(){
  $("#level-title").text("Game over! Press any key to start");
  level = 0;
  gameStart = false;
  gamePattern = [];
  userClickedPattern = [];
}

// IDEA: this is the core game logic that compares user pattern switch
//computer pattern
function compareArray(chosenColor) {
  if(gamePattern.length == userClickedPattern.length){
    for (var i = 0; i < userClickedPattern.length; i++){
      if (userClickedPattern[i] != gamePattern[i]){
        console.log("failure");
        gameOver();
        return;
      }
    }
    console.log("success");
    userClickedPattern = [];
    setTimeout(function() {
    nextSequence();
  }, 1000);
}
}
