// Sending a request from a content script
/*
chrome.extension.sendMessage({msg: "I'm content-script"}, function (response) {
    console.log(response);
});
*/


// Receiving message from a background page

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
    	sendResponse({m: 'NoNo'});

    	
    	/*
    	alert(1)

        if (request.msg === "Do you hear me?") {
            sendResponse({answer: "Yes"});
        }
        */
    }
);
