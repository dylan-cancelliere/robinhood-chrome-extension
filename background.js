let regex = /.+(:\/\/).*(robinhood)(.com).*/g;

let port;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log(tab.url);
    if (regex.test(tab.url)){
        console.log("passed regex");
        port = chrome.tabs.connect(tabId, {name: "robinhood"});
    }
});

let counter = 0, previousLength;

chrome.runtime.onConnect.addListener(function(port){
    console.assert(port.name == "robinhood");
    port.onMessage.addListener(function(msg){
        switch (msg.message){
            case "loaded":
                if (counter <= 100){
                    setTimeout(initiate.bind(null, port), 200);
                }else{
                    console.log("No tags found");
                    counter = 0;
                }
                break;
            case "initialSearch":
                counter = 0;
                if (previousLength == null){
                    previousLength = msg.count;
                    setTimeout(initiate.bind(null, port), 200);
                }else if (previousLength != 0 && previousLength != msg.count){
                    port.postMessage({message: "deleteTags"});
                }else{
                    setTimeout(initiate.bind(null, port), 200);
                }
        }
    })
});

function initiate(port){
    port.postMessage({message: "loaded"});
}