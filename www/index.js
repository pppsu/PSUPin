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


function initTimeline(event) {

    var url = "http://psupin.azurewebsites.net/pins";
    $.get(url, function(data) {
        $("#timetab").attr("badge", data.length);
        $.each(data, function(index, item) {
            $.get('card.html', function(template) {
                var rendered = Mustache.render(template, item);
                $("#pins").append(rendered);
            });
        });
    });
}