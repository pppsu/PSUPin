ons.ready(function() {

    initTimeline();

    var tabar = document.querySelector('ons-tabbar');
    tabar.addEventListener('postchange', function(event) {
        if (event.index == 0) {
            initTimeline(event);
        }
    });

    $('#takephoto').click(function() {
        console.log("Take a photo");
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI
        });

        function onSuccess(imageURI) {
            console.log(imageURI);
            var image = $("#preview");
            image.attr("src", imageURI);
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    });

    var onSuccess = function(position) {
        $("#location").val(position.coords.latitude + "," + position.coords.longitude);
        console.log('Latitude: ' + position.coords.latitude + '\n' +
            'Longitude: ' + position.coords.longitude + '\n' +
            'Altitude: ' + position.coords.altitude + '\n' +
            'Accuracy: ' + position.coords.accuracy + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
            'Heading: ' + position.coords.heading + '\n' +
            'Speed: ' + position.coords.speed + '\n' +
            'Timestamp: ' + position.timestamp + '\n');

        var map;
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
        }

    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        console.log('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);



});


/*function initTimeline(event) {

    var url = "http://psupin.azurewebsites.net/pins";
    $.get(url, function(data) {
        $("#timetab").attr("badge", data.length);
        $.each(data, function(index, item) {
            $.get('card.html', function(template) {
                var rendered = Mustache.render(template, item);
                $("#pins").append(rendered);
            });
        });
    });*/

/*description */
$(function() {

    firebase.initializeApp({
        apiKey: "AIzaSyBrGo-o8oDQeVuGEzB79Td_b06xwzQKcN8",
        authDomain: "psupin-040a.firebaseapp.com",
        projectId: "psupin-040a"
    });

    // Initialize Cloud Firestore through Firebase
    var db = firebase.firestore();

    var save = (function() {

        var username = $('#username').val();
        var description = $('#description').val();
        var photourl = $('#preview').val();
        var locattion = $('#location').val();

        db.collection("pins").add({
                username: username,
                description: description,
                photourl: photourl,
                location: location
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);

                $('#pagebody').empty();

                db.collection("pins").get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {

                        console.log(doc.id, " => ", doc.data());
                        var username = doc.username;
                        var description = doc.description;
                        var photourl = doc.photourl;
                        var location = doc.location;

                        var row = "<tr>" +
                            "<th scope='row'>" + doc.id + "</th>" +
                            "<td>" + doc.data().username + "</td>" +
                            "<td>" + doc.data().description + "</td>" +
                            "<td>" + doc.data().photourl + "</td>" +
                            "<td>" + doc.data().location + "</td>" +
                            "</tr>"

                        $('#pagebody').append(row);

                    });
                });

            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });

    });


})

}