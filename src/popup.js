/*jslint browser: true*/
/*global $, jQuery, alert, getInputText*/


var regex; // the regular expression being searched

$(document).ready(function() {

    console.log("popup.js started");


    // button next is pressed
    $("#next").click(function () {
        getInputText();
    });

    $("#prev").click(function () {
        getInputText();
    });
});

/**
 * Grabs text form the search textbox and assigns it to regex 
 * @return returns the new regex value gotten from the textbox id="regex"
 */
function getInputText() {
    // get input text from #regex and assign it to regex
    regex = $("#regex").val();
    // keep the text in the textbox the same
    $("#regex").val(regex);
    return regex;
}
