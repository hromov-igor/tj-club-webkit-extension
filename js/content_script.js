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
			var metaTags = document.getElementsByTagName('meta');
			for (var i=0;i<metaTags.length;i++){
				if (metaTags[i].getAttribute('property') === 'og:title'){
					title = metaTags[i].getAttribute('content'); 
				}
			}
			console.log(title);
			sendResponse({t:title});
		}
	}
);
