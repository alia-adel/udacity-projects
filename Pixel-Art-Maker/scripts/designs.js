/**
 * @description Draw the grid based on the user's entered height & width
 */
function makeGrid() {
    const tableRowHtml =
        `<tr>
		</tr>`;
    const tableColHtml = `<td></td>`;

    //Get user's entered grid height
    let gridHeight = $('#input_height').val();

    //Get user's entered grid width
    let gridWidth = $('#input_width').val();

    //Draw a table with ${gridHeight} rows & ${gridWidth} as columns
    if (gridHeight > 1 && gridWidth > 1) {
        for (let row = 0; row < gridHeight; row++) {

            $('#pixel_canvas').append(tableRowHtml);

            for (let col = 0; col < gridWidth; col++) {
                $('tr').last().append(tableColHtml);
            }

        }

        // Add click events on cells
        $('td').click(function(event) {
            $(this).css('background-color', function() {
                return $('#colorPicker').val();
            });
        });

    } else {
        alert('Entered height & width are not sufficient to draw the grid');
    }

}

// call makeGrid() when form gets submitted
$('#sizePicker').submit(function(event) {
    event.preventDefault();
    makeGrid();
});

//Resets sizePicker form & grid back to 1x1
$('#resetBtn').click(function() {
    $('tr').remove();
    $('#colorPicker').val('#000');
});
