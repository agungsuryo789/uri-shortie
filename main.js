var endpoint = "https://www.jsonstore.io/df72ffb10a1adb794c88c21b7152acb22d63b6b2f9ee1a56fb30dc34bb2888b6";

// Get the long URL
function geturl() {
    var url = document.getElementById("urlinput").value;
    var protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");
    if (!protocol_ok) {
        newurl = "http://" + url;
        return newurl;
    } else {
        return url;
    }
}

//Function to random the short url string
function getrandom() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

//function to combine the main url with the shortened url
function genhash() {
    if (window.location.hash == "") {
        window.location.hash = getrandom();
    }
}

// Post request to jsonstore
function send_request(url) {
    this.url = url;
    $.ajax({
        'url': endpoint + "/" + window.location.hash.substr(1),
        'type': 'POST',
        'data': JSON.stringify(this.url),
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
    })
}

//Button event click
function shorturl() {
    var longurl = geturl();
    genhash();
    send_request(longurl);
    document.write("This is your shortened Url ", window.location.href);
}

//GET method for url with hash/shortened url
var hashh = window.location.hash.substr(1)

if (window.location.hash != "") {
    $.getJSON(endpoint + "/" + hashh, function(data) {
        data = data["result"];

        if (data != null) {
            window.location.href = data;
        }

    });
}