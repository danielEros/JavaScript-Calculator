function main(){
    localStorage.setItem('floatAdded', 'false');
    $('.digit').on('click', handleDigitClick);
    $('.operation').on('click', handleOperationClick);
    $('#equals').on('click', handleEqualsClick);
    $('#clear').on('click', handleClearClick);
    $('#float_point').on('click', handleFoatPointClick);
}

function handleDigitClick(event){
    if ($('#display').text() === '0' || $('#display').text().includes('=')){
        $('#display').text($(this).text());
    } else {
        if (shortNumber($('#display').text())){
            $('#display').text($('#display').text() + $(this).text());
        }
    }
}

function handleOperationClick(event){
    if ($.isNumeric($('#display').text()[$('#display').text().length-1]) && !($('#display').text().includes('='))){
        $('#display').text($('#display').text() + ' ' + $(this).text() + ' ');
        localStorage.setItem('floatAdded', 'false');
    }
}

function handleEqualsClick(event){
    if ($.isNumeric($('#display').text()[$('#display').text().length-1]) && !($('#display').text().includes('='))){
        $('#display').html($('#display').text() + ' = ' + '<strong>' + eval(($('#display').text())) + '</strong>');
        localStorage.setItem('floatAdded', false);
    }
}

function handleClearClick(event){
    $('#display').text(0);
    localStorage.setItem('floatAdded', false);
}

function handleFoatPointClick(event){
    var floatAdded = eval(localStorage.getItem('floatAdded'));
    if (!(floatAdded) && !($('#display').text().includes('=')) && shortNumber($('#display').text())) {
        $('#display').text($('#display').text() + '.');
        localStorage.setItem('floatAdded', 'true');
    }
}

function shortNumber(numberToCheck){
    if (numberToCheck.includes(' ')){
        var startIndex = numberToCheck.lastIndexOf(' ') + 1;
    } else {
        var startIndex = 0;
    }
    return (numberToCheck.length - startIndex < 12);
}

$(document).ready(main);