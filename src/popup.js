/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function() {

    console.log("popup.js started");

    $("#next").click(function () {
        var regex = $("#regex").val();
        console.log(regex);
    });
});
