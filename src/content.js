var regex;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        if (request.search === "true") {
            console.log("search request sent");

            regex = request.argument;
            console.log("test1");
            console.log(document);
            console.log("test2");
            highlight(document, regex);

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
function highlight(node, regex)  {
    console.log(node);
    
    // if this is a text node
    if (node.nodeType == Node.TEXT_NODE) {
        console.log(node.nodeValue);
    }

    // for every child node call the highlight function to recursively search
    for (node n : node.childNodes) {
        highlight(n, regex);
    }
}
