Array.prototype.shuffle = function() {
    var input = this;
     
    for (var i = input.length-1; i >=0; i--) {
     
        var randomIndex = Math.floor(Math.random()*(i+1)); 
        var itemAtIndex = input[randomIndex]; 
         
        input[randomIndex] = input[i]; 
        input[i] = itemAtIndex;
    }
    return input;
}

let images = ['bug.png', 'dove.png', 'koala-filled.png', 'pig.png', 'pinguin.png', 
	'rabbit.png', 'sheep.png', 'squirrel.png', 'swan.png', 'turtle.png'];

function randomize_array(){
	// shuffle array, extract first 8 from it, double it, shuffle again
	let image_array = images.shuffle();
	image_array = image_array.splice(0,8);

	image_array = $.merge(image_array, image_array);
	image_array = image_array.shuffle();
	create_table(image_array);
}

function create_table(image_array){
	let i, j, img, k=0, opt1, opt2, counter=0;

	// create table and append it to body
	let table = `<table>`;
	for(i = 0; i < 4; i++){
		table += `<tr>`
		for(j = 0; j < 4; j++){
			img ='images/' + image_array[k];
			table += `<td> <div class="${image_array[k]}">
				<img src='${img}' class="hide">
			</div></td>`;
			k++;
		}
		table += `</tr>`;
	}
	table += `</table>`;
	$(document.body).append(table);

	// bind click event for a div
	$("div").click(function (event) {
		var classOfDiv = this.className;
		let im = $(this).children();
		$(im[0]).removeClass('hide'); // find image inside clicked div and make it visible

		if(!opt1) {
			opt1 = [classOfDiv, im[0]];
		} else if(opt1 && !opt2){
			opt2 = [classOfDiv, im[0]];

			// if both the images are not same, hode them again in 0.5ms
			if(opt1[0] != opt2[0]) {
				setTimeout(function() {
					$(opt1[1]).addClass('hide');
					$(opt2[1]).addClass('hide');
					opt1 = null; opt2 = null;
				}, 500);
			} else {
				// else make them stay visible
				opt1 = null; opt2 = null;
				counter++;
				// if all the images are flipped, reset the game!
				setTimeout(function() {
					if(counter == image_array.length/2){
						alert("Game Over! Resetting");
						$(document.body).empty();
						location.reload();
						counter = 0;
					}
				}, 1000);

			}
		} else {
			// incase someone clicks on too many divs simultaneously
			$(im[0]).addClass('hide');
		}

	});

}

// begin game
randomize_array(images);