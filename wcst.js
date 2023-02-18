const all_colors = ['red', 'green', 'blue', 'yellow'];
const all_shapes = ['square', 'circle', 'triangle','cross'];
const all_numbers = [1, 2, 3, 4];
const rules = ['color', 'shape', 'number'];

let stimulusColor, stimulusShape, stimulusNumber, stimulusCard;
let responseColor, responseShape, responseNumber, responseCards;
let rule = rules[Math.floor(Math.random() * rules.length)]
let changer = 0;
let score = 0;
let level = 2;

// Initialize the game
initGame();

// Attach click handlers to response cards
responseCards.forEach((responseCard, i) => {
  responseCard.addEventListener('click', () => {
	if (checkAnswer(i)) {
	  handleCorrectAnswer();
	} else {
	  handleIncorrectAnswer();
	}
	initRound();
  });
});

function initGame() {
	//initialize difficulty, ruleset, etc
  initRound();
}

function initRound() {
  // Randomly select stimulus card properties
  colors = all_colors.slice(0,level)
  shapes = all_shapes.slice(0,level)
  numbers = all_numbers.slice(0,level)
  
  stimulusColor = colors[Math.floor(Math.random() * level)];
  stimulusShape = shapes[Math.floor(Math.random() * level)];
  stimulusNumber = numbers[Math.floor(Math.random() * level)];
	console.log(rule)
	
  // Update the stimulus card display
  stimulusCard = document.getElementById('stimulus-card');
  stimulusCard.replaceChildren();
  renderCard(stimulusCard, stimulusColor, stimulusShape, stimulusNumber);
  //stimulusCard.style.backgroundColor = stimulusColor;
  //stimulusCard.innerHTML = `${stimulusNumber} ${stimulusShape}s`;

  // Update the response card display
  
  responseColors = shuffleArray(colors)
  responseShapes = shuffleArray(shapes)
  responseNumbers = shuffleArray(numbers)
	
  responseCards = document.querySelectorAll('.response-card');
  
  responseCards.forEach((responseCard, i) => {
	responseCard.replaceChildren();
	//responseCard.style.backgroundColor = responseColors[i];
	//responseCard.innerHTML = `${responseNumbers[i]} ${responseShapes[i]}s`;
	renderCard(responseCard, responseColors[i], responseShapes[i], responseNumbers[i]);
  });
}

function renderCard(card, color, shape, number) {
	for (let i=0; i<number; i++) {
		const s = document.createElement('span');
		s.classList.add(shape);
		s.style.backgroundColor = color
		s.style.setProperty('--bg-color', color)
		card.appendChild(s);
	}
}

function checkAnswer(index) {
  switch (getHiddenRule(rule)) {
	case 'color':
	  return responseColors[index] === stimulusColor;
	case 'shape':
	  return responseShapes[index] === stimulusShape;
	case 'number':
	  return responseNumbers[index] === stimulusNumber;
  }
}

function handleCorrectAnswer() {
  score++;
  checkProgress();
  document.getElementById('score').innerHTML = `Score: ${score}`;
  var popup = document.getElementById("popup");
  popup.style.display = "block";
  popup.innerHTML = "Correct Answer";
  popup.style.backgroundColor = "green"
  setTimeout(function(){ popup.style.display = "none"; }, 500);
}

function handleIncorrectAnswer() {
  score--;
  checkProgress();
  document.getElementById('score').innerHTML = `Score: ${score}`;
  var popup = document.getElementById("popup");
  popup.style.display = "block";
  popup.innerHTML = "Wrong";
  popup.style.backgroundColor = "red"
  setTimeout(function(){ popup.style.display = "none"; }, 500);
  
  var bod = document.body
  bod.style.backgroundColor = "red"
  setTimeout(function(){ bod.style.backgroundColor = "white"; }, 300);
  
}

function checkProgress() {
	if (score>19) {
		level = 4
	} else if (score>9) {
		level = 3
	} else {
		level = 2
	}
	document.getElementById('level').innerHTML = `Level: ${level}`;
}

function getHiddenRule(r,difficulty=1) {
  // Return a random hidden rule
  if (Math.random() > 0.3) { changer++ }
  if (changer > 2) {
	  changer = 0
	rule = rules[Math.floor(Math.random() * rules.length)];
	}
	else { rule = r; }
	return rule
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}