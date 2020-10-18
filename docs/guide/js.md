# Snake game in Javascript

### Benodigheden
<ul>
<li>Visual studio Code</li>
</ul>

### Programmeren van de snake game in Javascript

Stap 1: Open visual studio code en maak en index.html aan 

Stap 2: Copy paste deze code

``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Snake Game</title>
</head>
<body>
	<canvas id="snake" height="608" width="608"></canvas>
	<script src="snake.js"></script>
</body>
</html>
```

Stap 3: Maak een snake js bestand aan (snake.js)

Stap 4: Roep de canvas aan

``` js 

const canvas = document.getElementById('snake');
const ctx = canvas.getContext("2d");
```

Stap 5: Creer  het veld van de snake
``` js
const box = 32;
```

Stap 6: Laad de pngs in en het geluid
``` js
const ground = new Image();
ground.src = 'images/ground.png';

const apple = new Image();
apple.src = 'images/food.png';

const eat = new Audio();
eat.src = "audio/eat.wav";
```
Stap 7: Maak de snake array aan 

```js
let snake = [];
snake[0]= {
	x: 9 * box,
	y: 10 * box
}
```

Stap 8: Maak het food object aan en zet deze altijd op een andere positie

```js
let food = {
	x:Math.floor(Math.random()* 17+1) * box,
	y:Math.floor(Math.random()* 15+3) * box
}
```

Stap 9: Maak ook de variabelen score en direction aan 
```js
let score = 0;
let d;
```

Nu beginnen we met het effectief displayen van ons veld, slang, appel en de bijhorende scores.

Stap 10: Maak een draw functie aan  en teken  op je canvas je plattegrond met de drawImage canvas functie
```js
function draw() {
ctx.drawImage(ground, 0,0);
}
```

Stap 11: Zorg ook dat je deze oproept door bijvoorbeeld  een gamevariabele
```js
function draw() {
ctx.drawImage(ground, 0,0);
}

let game = setInterval(draw, 100)
```
Nu gaan we onze snake gaan displayen op onze plattegrond. Onze snake is een array object dus omdat deze steeds langer wordt als deze appels eet dan moeten al zijn lichaamsdelen gedsiplayd worden dus loopen we door de array en geven we ieder object een  basic css stijl.

Stap 12: Loop door de snake array en zorg dat ieder deel van de snake een kleurtje krijgt naar gelang zijn functie (hoofd, lichaam)
```js
for (let i= 0; i < snake.length; i ++){
	ctx.fillStyle = (i == 0)? "red" : "black";
	ctx.fillRect(snake[i].x, snake[i].y,box, box);

	ctx.strokeStyle = "white"
	ctx.strokeRect(snake[i].x, snake[i].y, box, box);
}
```

Stap 13: Teken de appel op je canvas met de drawImage  canvas functie

```js 
ctx.drawImage(apple, food.x, food.y);

```
Stap 14: Geef score  een CSS stijl
```js 
ctx.fillStyle = "white";
ctx.font = "45 px";
ctx.fillText(score,2*box,1.6*box);

```

Nu gaan we over naar het gedeelte dat we onze slang effectief gaan kunnen controlleren  aan de hand van de pijltjes toesten. Dit doen we zo.

Stap 15: Maak een functie aan direction roep hier de keycode van alle pijltjes toetsen op met een if else statement
```js 
function direction(event) {
	if (event.keyCode == 37 && d != "RIGHT"){
	d = "LEFT";
}else if(event.keyCode == 38 && d != "DOWN"){
	d = "UP";
	} else if (event.keyCode == 39 && d != "LEFT"){
	d = "RIGHT";
	} else if (event.keyCode == 40 && d != "UP"){
	d = "DOWN";
}
}
```

Stap 16: Defineer een Eventlistener om er voor te zorgen dat je pijltjes toetsen  werken roep hier ook de direction functie in op
```js
document.addEventListener('keydown', direction);
```

Stap 17: Defineer in je draw functie je oude snake head positie
```js
let snakeX = snake[0].x;
let snakeY = snake[0].y;
```
Stap 18: Check welke richting de slange heeft en zorg dat de slang 1 plaats opschuift naar gelang zijn richting.
```js
if( d==="LEFT") snakeX -= box;
if (d === "UP") snakeY -= box;
if( d==="RIGHT") snakeX += box;
if( d==="DOWN") snakeY += box;
```
Stap 19: Maak het nieuwe hoofd van de slang als deze een appel eet
```js
let newHead = {
	x: snakeX,
	y: snakeY,
}
snake.unshift(newHead);
```

Wat als de slang nu op dezelfde positie zit als de slang zijn hoofd?
Dit pakken we aan in stap 20. 

Stap 20: Zorg er voor als de slang de appel eet de score moet vermeerderen met 1 en een nieuw appel object moet worden aangemaakt + verwijder ook de staart
```js
if(snakeX === food.x && snakeY === food.y){
	score++;
	eat.play();
	// create new food (object)
	food = {
		x: Math.floor(Math.random() * 17 + 1) * box,
		y: Math.floor(Math.random() * 15 + 3) * box
	}
	// don't remove the tail
} else {
	// remove the tail of the snake
	snake.pop();
}

```
Wat als de slang nu tegen zichzelf botst? Dat mag niet gebeuren. Gebeurt dit wel direct einde van het spel.

Stap 21: Defineer de botsingsfunctie en roep  deze aan in stap 22
```js 
function collision(header, array){
	for(let i = 0; i < array.length; i++){
		if (header.x === array[i].x && header.y === array[i].y){
			return true;
		}
	}
	return false;
}
```

Wat als onze slang dood is wat moet er dan gebeuren? 
Dat zien we in de volgende stap.

Stap 22: Zorg er voor dat als de snake de randen raakt deze dood is of een botsing met zichzelf heeft deze ook meteen dood gaat
```js 
if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead,snake)){
clearInterval(game);

}
```

Ondervindt je toch nog problemen met het programmeren van de snake game? 
Dan kan je altijd eens de video hier onder bekijken. Daag jezelf uit en probeer het eerst zelf en probeer de logica er achter te achterhalen.  
<iframe width="730" height="400" src="https://www.youtube.com/embed/9TcU2C1AACw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>