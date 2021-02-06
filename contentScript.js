let regex = /.+(:\/\/).*(robinhood)(.com).*/g;
let port = chrome.runtime.connect({name: "robinhood"});
let temp;

port.postMessage({message: "loaded"});

port.onMessage.addListener(function(request){
    switch(request.message){
        case "loaded":
            temp = findStuffToRemove();
            if (temp.length == 0){
                port.postMessage({message: "loaded"});
            }else{
                port.postMessage({message: "initialSearch", count: temp.length});
            }
            break;
        case "deleteTags":
            temp.forEach(element => {
                element.remove()
            });
        
    }
})




function findStuffToRemove() {
    let spanTags = document.getElementsByTagName("span");
    let searchText = "Sell"
    let found = [];

    for (let i = 0; i < spanTags.length; i++) {
        if (spanTags[i].textContent.includes(searchText)) {
            found.push(spanTags[i]);
        }
    }
    return found;
}