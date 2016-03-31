var regex;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        if (request.search === "true") {
            console.log("search request sent");

            regex = request.argument;
            highlight(document.body, regex);

            sendResponse({successful: "true"});
        } else {
            sendResponse({successful: "false"});
        }
    });

/**
 * Takes html object and regex, and highlights the text that matches the regex
 * @param html the html object that will be searched
 * @param regex the regular expression to match to the html text
 */
function highlight(searchNode, regex)  {

    // if this is a nonempty text node
    if (searchNode.nodeType === Node.TEXT_NODE && searchNode.nodeValue.trim() !== "") {
        console.log(searchNode.nodeValue);
    }

    searchNode = searchNode.firstChild;
    while (searchNode) {
        highlight(searchNode);
        searchNode = searchNode.nextSibling;
    }

    return;
}
