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

let oldHref = document.location.href;

window.addEventListener("load", () => {
    let bodyList = document.querySelector("body")
    let observer = new MutationObserver(function(mutations){
        mutations.forEach(function(mutation){
            if (oldHref != document.location.href){
                oldHref = document.location.href;
                console.log("URL Changed :)");
                port.postMessage({message: "loaded"});
            }
        });
    });

    let config = {
        childList: true,
        subtree: true
    };

    observer.observe(bodyList, config);
});

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