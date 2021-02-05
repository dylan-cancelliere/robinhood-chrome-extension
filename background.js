    let regex = /.+(:\/\/).*(robinhood)(.com).*/g;

    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        if (regex.test(changeInfo.url)) {
            console.log("Test 1");
            let tags = findStuffToRemove();
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                function: findStuffToRemove,
            });
        }
    });

    function removeStuff() {

    }

    function findStuffToRemove() {
        console.log(this);
        let spanTags = document.getElementsByTagName("span");
        let searchText = "Sell"
        let found = [];

        for (let i = 0; i < spanTags.length; i++) {
            console.log(spanTags[i]);
            if (spanTags[i].textContent.includes(searchText)) {
                found.push(spanTags[i]);
            }
        }
        return found;
    }