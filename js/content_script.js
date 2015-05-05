// Sending a request from a content script
/*
chrome.extension.sendMessage({msg: "I'm content-script"}, function (response) {
    console.log(response);
});
*/

// Receiving message from a background page
chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse){
		console.log(request);
		if (request.msg === 'getNewsData'){
			tjTitle = '';
			var metaTags = document.getElementsByTagName('meta');
			for (var i=0;i<metaTags.length;i++){
				if (metaTags[i].getAttribute('property') === 'og:title'){
					tjTitle = metaTags[i].getAttribute('content');
					break;
				}

			}
			console.log(tjTitle);
			sendResponse({t:tjTitle});
		}
	}
);
