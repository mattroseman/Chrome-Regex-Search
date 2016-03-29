/*jslint browser: true*/
/*global $, jQuery, alert*/

console.log("popup.js started");

$(document).ready(function() {

    $("#next").click(function () {
        var regex = $("#regex").val();
        console.log(regex);
    });
});
