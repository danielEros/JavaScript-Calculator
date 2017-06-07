function main(){
    localStorage.setItem('floatAdded', 'false');
    $('.digit').on('click', handleDigitClick);
    $('.operation').on('click', handleOperationClick);
    $('#equals').on('click', handleEqualsClick);
    $('#clear').on('click', handleClearClick);
    $('#float_point').on('click', handleFoatPointClick);
}

function handleDigitClick(event){
    displayedText = $('#display').text();
    newText = $(this).text();
    if (displayedText === '0' || displayedText.includes('=')){
        $('#display').text(newText);
    } else if (isShortNumber(displayedText)){
        $('#display').text(displayedText + newText);
    }
}

function handleOperationClick(event){
    displayedText = $('#display').text();
    newText = $(this).text();
    if ($.isNumeric(displayedText[displayedText.length-1]) && !(displayedText.includes('='))){
        $('#display').text(displayedText + ' ' + newText + ' ');
        localStorage.setItem('floatAdded', 'false');
    }
}

function handleEqualsClick(event){
    displayedText = $('#display').text();
    newText = $(this).text();
    if ($.isNumeric(displayedText[displayedText.length-1]) && !(displayedText.includes('='))){
        $('#display').html(displayedText + ' = ' + '<strong>' + eval(displayedText) + '</strong>');
        localStorage.setItem('floatAdded', false);
    }
}

function handleClearClick(event){
    $('#display').text(0);
    localStorage.setItem('floatAdded', false);
}

function handleFoatPointClick(event){
    displayedText = $('#display').text();
    var floatAdded = eval(localStorage.getItem('floatAdded'));
    if (!(floatAdded) && !(displayedText.includes('=')) && isShortNumber(displayedText)) {
        $('#display').text(displayedText + '.');
        localStorage.setItem('floatAdded', 'true');
    }
}

function isShortNumber(numberToCheck){
    if (numberToCheck.includes(' ')){
        var startIndex = numberToCheck.lastIndexOf(' ') + 1;
    } else {
        var startIndex = 0;
    }
    return (numberToCheck.length - startIndex < 12);
}

$(document).ready(main);