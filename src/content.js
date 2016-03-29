/*jslint browser: true*/
/*global $, JQuery, alert, chrome*/

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        if (request.search === "true") {
            // TODO perform search for regex in html
            sendResponse({successful: "true"});
        } else {
            sendResponse({successful: "false"});
        }
    });
