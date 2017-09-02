// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()


/**
* @description Draws the grid based on the user's entered height & width
*/
function makeGrid() {
	// Your code goes here!
	// Get the height & width values & draw the table.
	const tableRowHtml =
		`<tr>
		</tr>`;
	const tableColHtml = `<td></td>`;

	//Get user's entered grid height
	let gridHeight = $('#input_height').val();

	//Get user's entered grid height
	let gridWidth = $('#input_width').val();

	//Draw a table with ${gridHeight} rows & ${gridWidth} as columns
	if(gridHeight > 1 && gridWidth > 1){
		for(let row=0; row<gridHeight; row++) {
			$('#pixel_canvas').append(tableRowHtml);

			for(let col=0; col<gridWidth; col++) {
				$('tr').last().append(tableColHtml);
			}
		}
		// Add width & Height to cells
		$('td').attr('style', 'width: 20px; height: 20px');

		// Add click events on cells
		$('td').click(function(event) {
			$(this).css('background-color', function() {
				return $('#colorPicker').val();
			});
		});

	} else {
		alert('Entered Height & Width are not sufficient to draw the grid');
	}

}

// call makeGrid() when form gets submitted
$('#sizePicker').submit(function(event){
	event.preventDefault();
	makeGrid();
});


