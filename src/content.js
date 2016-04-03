/* Some code shamelessly stolen from https://github.com/gsingh93/regex=search */

var regexString;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        if (request.search === "true") {
            console.log("search request sent");

            regexString = request.argument;

            console.log(document.body);
            console.log(window.location.href);

            //highlight(document.body, regexString);
            highlight(document.body, regexString);
        } else {
            sendResponse({successful: "false"});
        }
    });

/**
 * Takes html object and regex, and highlights the text that matches the regex
 * @param html the html object that will be searched
 * @param regex the regular expression to match to the html text
 */
function highlight(searchNode, regexString)  {

    /*if (searchNode.nodeName == "MARK" ||
        searchNode.nodeName == "SCRIPT" ||
        searchNode.nodeName == "NOSCRIPT" ||
        searchNode.nodeName == "STYLE") {

            return;
    }*/

    // if this is a nonempty text node
    if (searchNode.nodeType === Node.TEXT_NODE && searchNode.nodeValue.trim() !== "") {
        var nodeValue, before, match, after; // string value of nodes
        var regex; // the Regular Expression
        var result; // result of regex.exec("string");
        var parentNode;
        var beforeNode, matchNode, afterNode; // the new nodes being added
        var span; // the node being added above the match for highlighting
        do {
            nodeValue = searchNode.nodeValue;
            regex = new RegExp(regexString, "g");
            result = regex.exec(nodeValue);
            // if a match was found
            if (result != null) {
                console.log("found match: " + result);

                parentNode = searchNode.parentNode;

                before = nodeValue.substring(0, result.index); // the string up to the first match
                match = nodeValue.substring(result.index, regex.lastIndex); // the string of matched text
                after = nodeValue.substring(regex.lastIndex); // the rest of the text (still to be matched)

                console.log("The string: " + result[0] + " matches the search regular expression");

                if (before) {
                    beforeNode = document.createTextNode(before);  
                    parentNode.insertBefore(beforeNode, searchNode);
                }

                matchNode = document.createTextNode(match);

                span = document.createElement("span");
                span.style.backgroundColor = "green";
                span.appendChild(matchNode);

                parentNode.insertBefore(span, searchNode);

                if (after) {
                    afterNode = document.createTextNode(after);
                    parentNode.insertBefore(afterNode, searchNode);
                    parentNode.removeChild(searchNode);
                    searchNode = afterNode;
                // if this is the end of the text node
                } else {
                    parentNode.removeChild(searchNode);
                    searchNode = matchNode;
                    break;
                }
            }
        } while (result != null);
    } else {
        // if this is a hidden node or not displayed in on screen
        //if ($(searchNode).css('display') == 'none' || $(searchNode).css('display') == 'hidden') {
         //   return;
        //}
    }

    searchNode = searchNode.firstChild;
    while (searchNode) {
        highlight(searchNode, regexString);
        searchNode = searchNode.nextSibling;
    }

    return;
}
