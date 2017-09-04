/**
 * @description Draw the grid based on the user's entered height & width
 */
function makeGrid() {

    // Get user's entered grid height
    let gridHeight = document.getElementById('input_height').value;

    // Get user's entered grid width
    let gridWidth = document.getElementById('input_width').value;

    if (gridHeight > 1 && gridWidth > 1) {
        let tableElement = document.getElementById('pixel_canvas');

        // In case user re-submits the form, clear the previous table
        if (tableElement.childNodes.length > 0) {
            removeRowsFromTable(tableElement);
        }

        // Draw a table with ${gridHeight} rows & ${gridWidth} as columns
        for (let row = 0; row < gridHeight; row++) {

            let tableElement = document.getElementById('pixel_canvas');
            tableElement.appendChild(document.createElement('tr'));

            for (let col = 0; col < gridWidth; col++) {
                tableElement.lastChild.appendChild(document.createElement('td'));
            }

        }

        // Add click event on cells
        let tableCells = Array.from(document.getElementsByTagName('td'));

        tableCells.forEach(function(cell) {
            cell.addEventListener('click', function() {
                this.style.backgroundColor = document.getElementById('colorPicker').value;
            });
        });

    } else {
        alert('Entered height & width are not sufficient to draw the grid');
    }

}

/**
 * @description Remove all rows from the table
 * @param {Object} tableElement - Canvas table node
 */
function removeRowsFromTable(tableElement) {
    while (tableElement.childNodes.length > 0) {
        tableElement.removeChild(tableElement.childNodes[0]);
    }
}

// call makeGrid() when form gets submitted
document.getElementById('sizePicker').addEventListener('submit', function(event) {
    event.preventDefault();
    makeGrid();
});


//Resets sizePicker form & grid back to 1x1
document.getElementById('resetBtn').addEventListener('click', function() {
    removeRowsFromTable(document.getElementById('pixel_canvas'));
    // reset color back to black
    document.getElementById('colorPicker').value = '#000';
});
