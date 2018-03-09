(function() {

	var
	max = 90,
	number = 0,
	called = [],
	numbers = [],
	target = document.getElementById('app'),
	template = '<div id="number">{number}</div><div class="cards">{cards}</div>',
	colours = [
		'red',
		'orange',
		'yellow',
		'green',
		'blue',
		'indigo',
		'violet'
	],
	colour = 0,
	cols = [[1, 10], [11, 20], [21, 30], [31, 40], [41, 50], [51, 60], [61, 70], [71, 80], [81, 90]],
	cards = [],
	cardCount = 6,
	getNumber = function() {

		if(numbers.length) {

			var index = ROCK.MATH.random(0, numbers.length-1);
			number = numbers[index];

			called.push(numbers.splice(index, 1)[0]);

		}
		else {

			number = 0;

		};

		return number;

	},
	replacer = function(string, replacers) {
		var out = string;
		for(var replacer in replacers) {
			out = out.replace('{' + replacer + '}', replacers[replacer]);
		};
		return out;
	},
	render = function(props) {
		target.innerHTML = replacer(template, {
			number: number,
			cards: cardsToString()
		});
		document.body.setAttribute('data-colour', colours[colour]);
	},
	incrementColour = function() {

		if(colour===colours.length-1) {
			colour = 0;
		}
		else {
			colour ++;
		};

		return colour;

	},
	calledToString = function() {

		var
		out = [];

		called.forEach(function(item) {

			out.push('<div>' + item + '</div>');

		});

		return '<div>fresh out! call order...</div><div>' + out.join('') + '</div>';

	},
	cardsToString = function() {

		var
		output = '';

		cards.forEach(function(card) {

			output += '<div class="card">';

			card.forEach(function(row) {

				output += '<div class="card-row">';

				row.forEach(function(col) {

					output += '<div class="card-row-col">' + (col>0?col:'') + '</div>';

				});

				output += '</div>';

			});

			output += '</div>';

		});

		return output;

	},
	populateNumbers = function() {

		for(var i=1;i<=max;i++) {
			numbers.push(i);
		};

	},
	populateCards = function() {

		while(cardCount--) {
			cards.push([
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]);
		};

		var
		numberToUse = 0,
		addNumber = function() {

			var
			card,
			row,
			col,
			numberOfNumbersInRow = 0;

			numberToUse = getNumber();

			console.log('numberToUse', numberToUse);

			for(var cardIndex=0;cardIndex<cards.length;cardIndex++) {

				if(!numberToUse) {
					break;
				};

				card = cards[cardIndex];

				for(var rowIndex=0;rowIndex<card.length;rowIndex++) {

					if(!numberToUse) {
						break;
					};

					row = card[rowIndex];

					numberOfNumbersInRow = 0;

					for(var colIndex=0;colIndex<row.length;colIndex++) {

						col = row[colIndex];

						if(col>0) {
							numberOfNumbersInRow ++;
						};

					};

					if(numberOfNumbersInRow>=5) {
						continue;
					};

					for(var colIndex=0;colIndex<row.length;colIndex++) {

						if(!numberToUse) {
							break;
						};

						col = row[colIndex];

						console.log(numberToUse);

						if(col===0&&numberToUse>=cols[colIndex][0]&&numberToUse<=cols[colIndex][1]) {

							cards[cardIndex][rowIndex][colIndex] = numberToUse;

							console.log([cardIndex, rowIndex, colIndex, numberToUse].join(' '));
							addNumber();

						};

					};

				};

			};


		};

		addNumber();

		console.log(numbers);
		console.log(cards);

	};

	document.addEventListener('mousedown', function(e) {

		e.preventDefault();

	});

	document.addEventListener('click', function(e) {

		incrementColour();
		getNumber();
		render();

	});

	populateNumbers();
	populateCards();
	render();

})();