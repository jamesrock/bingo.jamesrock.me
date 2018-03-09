(function() {

	var
	max = 90,
	number = 0,
	called,
	numbers,
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
	cols = [[1, 9], [10, 19], [20, 29], [30, 39], [40, 49], [50, 59], [60, 69], [70, 79], [80, 90]],
	cards,
	cardCount,
	logging = false,
	ifOneOf = function(collection, value) {

		var
		loop = collection.length,
		out = false;

		while(loop--) {
			if(collection[loop]===value) {
				out = true;
				break;
			}
		};

		return out;

	},
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
	cardsToString = function() {

		var
		output = '';

		cards.forEach(function(card) {

			output += '<div class="card">';

			card.forEach(function(row) {

				output += '<div class="card-row">';

				row.forEach(function(col) {

					var className = ifOneOf(called, col)?'card-row-col called':'card-row-col';
					output += '<div class="' + className + '">' + (col>0?col:'') + '</div>';

				});

				output += '</div>';

			});

			output += '</div>';

		});

		return output;

	},
	populateNumbers = function() {

		called = [];
		numbers = [];

		for(var i=1;i<=max;i++) {
			numbers.push(i);
		};

	},
	populateCards = function() {

		cards = [];
		cardCount = 6;
		populateNumbers();

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

			logging&&console.log('numberToUse', numberToUse);

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

						logging&&console.log(numberToUse);

						if(col===0&&numberToUse>=cols[colIndex][0]&&numberToUse<=cols[colIndex][1]) {

							cards[cardIndex][rowIndex][colIndex] = numberToUse;

							logging&&console.log([cardIndex, rowIndex, colIndex, numberToUse].join(' '));
							addNumber();

						};

					};

				};

			};

		};

		addNumber();

		if(number) {
			console.log('not all numbers used, so cards are repopulated');
			populateCards();
		}
		else {
			console.log('all numbers used, so numbers are repopulated');
			populateNumbers();
		};

		console.log(numbers);

	};

	document.addEventListener('mousedown', function(e) {

		e.preventDefault();

	});

	document.addEventListener('click', function(e) {

		// incrementColour();
		getNumber();
		render();

	});

	// populateNumbers();
	populateCards();
	render();

})();
