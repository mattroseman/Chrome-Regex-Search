var regex;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        if (request.search === "true") {
            console.log("search request sent");

            // TODO perform search for regex in html
            regex = request.argument;
            highlight($("body").html(), regex);

            sendResponse({successful: "true"});
        } else {
            sendResponse({successful: "false"});
        }
    });

/**
 * Takes html object and regex, and highlights the text that matches the regex
 * @param html the html object that will be searched
 * @param regex the regular expression to match to the html text
 * @return null this is a recursive function that walks through the HTML text
 */
function highlight(node, regex)  {
    
    // if this is a leaf node and a text node
    if (node.childNodes.length == 0 && node.nodeType == Node.TEXT_NODE) {
        console.log(node.nodeValue);
    }
}
