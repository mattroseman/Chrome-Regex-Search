/*jslint browser: true*/
/*global $, jQuery, alert, getInputText, chrome, getNextResult, getPrevResult*/


var regex; // the regular expression being searched
var results; // the results of the regex search on a page

$(document).ready(function() {

    console.log("popup.js started");

    // text field is submitted
    $("#regex").on({
        // disables normal text form action
        submit: function(event) {
            return false;
        },
        // recreates submit action on enter press
        keydown: function(event) {
            if (event.which == 13) {
                getNextResult();
                return false;
            }
        }
    });


    // button next is pressed
    $("#next").click(function () {
        getNextResult();
    });

    // button prev is pressed
    $("#prev").click(function () {
        getPrevResult();
    });
});

/**
 * Handles when a request for next result comes through
 */
function getNextResult() {
    getInputText();
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {search: "true"}, function(response) {
            console.log(response.successful);
        });
    });
}

/**
 * Handles when a request for previous result comes through
 */
function getPrevResult() {
    getInputText();
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {search: "true"}, function(response) {
            console.log(response.successful);
        });
    });
}

/**
 * Grabs text form the search textbox and assigns it to regex 
 * @return void returns the new regex value gotten from the textbox id="regex"
 */
function getInputText() {
    // get input text from #regex and assign it to regex
    regex = $("#regex").val();
    // keep the text in the textbox the same
    $("#regex").val(regex);
    return regex;
}
