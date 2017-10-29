/*
 *  This event listener will populate the top of the home screen with user stories when the page is initialized.
 *  It uses the generateStoryBubbles functiono so.
 */

document.addEventListener('init', function(event) {



});

//The show event listener does the same thing as the one above but on the search page when it's shown.

document.addEventListener('show', function(event) {
    var page = event.target;

    if (page.id == "search-page") {
        var channels = page.querySelector('#channels');

        generateStoryBubbles(channels);
    }
});

/*
 * This function is used to toggle the grid/list display of the posts in the profile page as well as
 * change the color of the buttons to show which is the current view.
 */

function display(id) {
    document.getElementById("list").style.color = "#1f1f21";
    document.getElementById("grid").style.color = "#1f1f21";
    document.getElementById(id).style.color = "#5fb4f4";

    document.getElementById("list_view").style.display = "none";
    document.getElementById("grid_view").style.display = "none";
    document.getElementById(id + "_view").style.display = "block";
}

//The generateStoryBubbles function is used to create the carousel items be used as stories by the upper two events.



//The Like function is used to make the white heart appear in front of the picture as well as make the like button into a red heart and vice versa.

var like = function(num) {
    if (document.getElementById("button-post-like-" + num).classList.contains("like")) {
        document.getElementById("button-post-like-" + num).classList.remove("ion-ios-heart", "like");
        document.getElementById("button-post-like-" + num).classList.add("ion-ios-heart-outline");
    } else {
        document.getElementById("button-post-like-" + num).classList.remove("ion-ios-heart-outline");
        document.getElementById("button-post-like-" + num).classList.add("ion-ios-heart", "like");
        document.getElementById("post-like-" + num).style.opacity = 1;

        setTimeout(function() {
            document.getElementById("post-like-" + num).style.opacity = 0;
        }, 600);
    }
}

//The readStory function is used to change the red circle around a new story into grey after tapping on the new storry (thus reading it)

var readStory = function(event) {
    event.parentNode.classList.remove("unread");
    event.parentNode.classList.add("read");
}



///mapp 
/*var map;
var marker;

function init() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    document.addEventListener("online", onOnline, false);
    document.addEventListener("offline", onOffline, false);
}

function onOffline() {
    var mapObj = document.getElementById("map-canvas");
    mapObj.innerHTML = "please connect to the internet";
}

function onOnline() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAAqirzvb5xK1A00b44Ya123e1xaIF1tDc' + 'callback=getGeolocation';
    document.body.appendChild(script);
}

function getGeolocation() {
    var options = {
        maximumAge: 3000,
        timeout: 5000,
        enableHighAccuracy: true
    };
    navigator.geolocation.getCurrentPosition(loadMap, geoError, options);
}

function loadMap(position) {
    var myLatitude = position.coords.latitude;
    var myLongilude = position.coords.longitude;
    var latlng = new google.maps.LatLng(myLatitude, myLongilude);
    var myOptions = { zoom: 18, center: latlng, mapTypeId: google.maps.MapTypeId.ROADMAP };
    var mapObj = document.getElementById("map-canvas");
    map = new google.maps.Map(mapObj, myOptions);
    var image = 'img/mappin.png';
    var marker = new google.maps.Marker({ position: latlng, icon: image, title: "You are here" });
    marker.setMap(map);
}

function geoError(error) {
    aler('code:' + error.code + '\n' + 'message' + error.message + '\n');
}*/