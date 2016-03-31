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
        var nodeValue = searchNode.nodeValue;
        regex = new RegExp(regex, "g");
        var result = regex.exec(nodeValue);
        // if a match was found
        if (result !== null) {
            var before = nodeValue.substring(0, result.index); // the string up to the first match
            var match = nodeValue.substring(result.index, regex.lastIndex); // the string of matched text
            var after = nodeValue.substring(result.lastIndex); // the rest of the text (still to be matched)
            // TODO create the HTMLElements and replace the current searchNode with these elements
        }
    }

    searchNode = searchNode.firstChild;
    while (searchNode) {
        highlight(searchNode);
        searchNode = searchNode.nextSibling;
    }

    return;
}
