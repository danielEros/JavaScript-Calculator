function main(){
    localStorage.setItem('floatAdded', 'false');
    arrayOfQueries = ['.digit', '.operation', '#equals', '#clear', '#float_point'];
    for(var i=0; i<arrayOfQueries.length; i++){
        $(arrayOfQueries[i]).on('click', handleClick);
    }
}

function handleClick(event){
    displayedText = $('#display').text();
    newText = $(this).text();
    if ($.isNumeric(newText)){
        if (displayedText === '0' || displayedText.includes('=')){
            $('#display').text(newText);
        } else if (isShortNumber(displayedText)){
            $('#display').text(displayedText + newText);
        }
    } else if(['+', '-', '*', '/', '%', '='].indexOf(newText) !== -1){
        if ($.isNumeric(displayedText[displayedText.length-1]) && !(displayedText.includes('='))){
            if (['+', '-', '*', '/', '%'].indexOf(newText) !== -1){
                $('#display').text(displayedText + ' ' + newText + ' ');
            } else if(newText === '='){
                $('#display').html(displayedText + ' = ' + '<strong>' + eval(displayedText) + '</strong>');
            }
            localStorage.setItem('floatAdded', 'false');
        }
    } else if (newText === 'C'){
        $('#display').text(0);
        localStorage.setItem('floatAdded', false);
    } else if (newText === '.'){
        var floatAdded = eval(localStorage.getItem('floatAdded'));
        if (!(floatAdded) && !(displayedText.includes('=')) && isShortNumber(displayedText)) {
            $('#display').text(displayedText + '.');
            localStorage.setItem('floatAdded', 'true');
        }
    }
}

function isShortNumber(numberToCheck){
    const SHORTNUMBER = 12;
    if (numberToCheck.includes(' ')){
        var startIndex = numberToCheck.lastIndexOf(' ') + 1;
    } else {
        var startIndex = 0;
    }
    return (numberToCheck.length - startIndex < SHORTNUMBER);
}

$(document).ready(main);