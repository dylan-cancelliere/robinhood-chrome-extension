let regex = /.+(:\/\/).*(robinhood)(.com).*/g;

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