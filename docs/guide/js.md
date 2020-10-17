# Snake game in Javascript

### benodigheden
<ul>
<li>Visual studio Code</li>
</ul>

### programeren van de snake game in Javascript

Stap 1: open visual studio code en maak en index.html aan 

Stap 2: copy paste deze code

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

stap 3: maakt een snake js bestand aan (snake.js)

stap 4: roep de Canvas aan

``` js 

const canvas = document.getElementById('snake');
const ctx = canvas.getContext("2d");
```

stap 5: creer  het veld van de snake
``` js
const box = 32;
```

stap 6: laad de pngs in en et geluid
``` js
const ground = new Image();
ground.src = 'images/ground.png';

const apple = new Image();
apple.src = 'images/food.png';

const eat = new Audio();
eat.src = "audio/eat.wav";
```
stap 7: maak de snake array aan 

```js
let snake = [];
snake[0]= {
	x: 9 * box,
	y: 10 * box
}
```

stap 8: maak het food object aan en zet deze altijd op een andere positie

```js
let food = {
	x:Math.floor(Math.random()* 17+1) * box,
	y:Math.floor(Math.random()* 15+3) * box
}
```

stap 9: maak ook de variabelen score en direction aan 
```js
let score = 0;
let d;
```

Nu beginnen we met het effectief displayen van ons veld, slang,appel en de bijhorende scores.

stap 10: maak een draw functie aan  en teken  op je canvas je plattegrond met de drawImage canvas functie
```js
function draw() {
ctx.drawImage(ground, 0,0);
}
```

stap 11: zorg ook dat je deze oproept door bijvoorbeeld  een gamevariabele
```js
function draw() {
ctx.drawImage(ground, 0,0);
}

let game = setInterval(draw, 100)
```
Nu gaan we onze snake gaan displayen op onze plattegrond. Onze snake is een array object dus omdat deze steeds langer wordt als deze appels eet dan moeten al zijn lichaamsdelen gedsiplayd worden dus loopen we door de array en geven we ieder object een  basic css stijl.

stap 12: loop door de snake array en zorg dat ieder deel van de snake een kleurtje krijgt naar ggelang zijn functie (hoofd, lichaam)
```js
for (let i= 0; i < snake.length; i ++){
	ctx.fillStyle = (i == 0)? "red" : "black";
	ctx.fillRect(snake[i].x, snake[i].y,box, box);

	ctx.strokeStyle = "white"
	ctx.strokeRect(snake[i].x, snake[i].y, box, box);
}
```

stap 13: Teken de appel op je canvas met de drawImage  canvas functie

```js 
ctx.drawImage(apple, food.x, food.y);

```
stap 14: geef score  een CSS stijl
```js 
ctx.fillStyle = "white";
ctx.font = "45 px";
ctx.fillText(score,2*box,1.6*box);

```

Nu gaan we over naar het gedeelte dat we onze slang effectief gaan kunnen controlleren  aan de hand van de pijltjes toesten.Dit doen we zo.

stap 15: Maak een functie aan direction roep hier de keycode van alle pijltjes toetsen op met een if else statement
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

stap 16: Defineer een eventlistener om er voor te zorgen dat je pijltjes toetsen  werken roep hier ook de direction functie in op
```js
document.addEventListener('keydown', direction);
```

Stap 17: defineer in je draw functie je oude head positie
```js
let snakeX = snake[0].x;
let snakeY = snake[0].y;
```
Stap 18: Check welke directie de slange heeft en Zorg dat de slang 1 plaats opschijft naar gelang zijn directie.
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

Stap 20: Zorg er voor als de slang de appel eet de score moet vermeerderen met 1 en  een nieuwe appel object moet worden aangemaakt = verwijder ook de staart
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

stap 21: Defineer de botsings functie en roep  deze aan in stap 22
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

stap 22: Zorg er voor dat als de snake de randen raakt deze dood is of een botsing met zichzelf 
```js 
if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead,snake)){
clearInterval(game);

}
```

Ondervindt je toch nog problemen met het programmeren van de snake game? 
Dan kan je altijd eens de video hier onder bekijken. Daag jezelf uit en probeer het eerst zelf en de logica er achter te snappen.  
<iframe width="560" height="315" src="https://www.youtube.com/embed/9TcU2C1AACw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>