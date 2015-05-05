// Fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version
// http://developer.chrome.com/extensions/runtime.html#event-onInstalled
chrome.runtime.onInstalled.addListener(function (details) {

    // good place to set default options
    
    function setDefaults(callback) {
        /*
        storage.area.get(function (stored_options) {
            var default_options = storage.default_options,
                option,
                new_options = {};
            for (option in default_options) {
                if (!stored_options.hasOwnProperty(option)) {
                    new_options[option] = default_options[option];
                }
            }
            if (Object.keys(new_options).length !== 0) {
                // save to area if new default options is appeared
                storage.area.set(new_options, function () {
                    if (typeof callback === 'function') {
                        callback();
                    }
                });
            } else {
                if (typeof callback === 'function') {
                    callback();
                }
            }
        });
        */
    }
    

    switch (details.reason) {
    case 'install': // if ext is  first installed
        setDefaults(function () {
            // show options page
            chrome.tabs.create({'url': 'options.html'});
        });
        break;
    case 'update':
        setDefaults();
        break;
    default:
        break;
    }
});

chrome.browserAction.setBadgeText({text:'x'});

chrome.runtime.onUpdateAvailable.addListener(function (details) {
    // when an update is available - reload extension
    // update will be install immediately
    chrome.runtime.reload();
});

// wait for page load 
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        if (request.msg === 'loaded'){
            console.log(sender)
            //remove 'disabled' badge 
            chrome.browserAction.setBadgeText({text:'', tabId:sender.tab.id});

            //Extension button onClick listener
            chrome.browserAction.onClicked.addListener(function(tab){

                // call content_script
                chrome.tabs.getSelected(null,function(tab){
                    console.log(tab);
                    
                    chrome.tabs.sendMessage(tab.id,{msg: 'getNewsData'}, function (response) {
                        if (chrome.runtime.lastError){
                            console.log('Error' + chrome.runtime.lastError.message);
                        }
                        console.log(response.t);
                        if (response.t !== '') title = response.t;
                        else title = tab.title;

                        // redirect to news page
                        var tjNewPage = 'http://tjournal.ru/club/new'+'?title='+title+'&url='+encodeURIComponent(tab.url);
                        chrome.tabs.create({url:tjNewPage},function(tab){
                        //modify requested news page

                        });
                    });    
                });
            });
            sendResponse({msg:"load recieved"});
        }
    }
);