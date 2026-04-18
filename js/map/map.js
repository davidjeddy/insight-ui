$( document ).ready(function() {
    var store = {};

    $.ajax({
        url: 'http://34.230.19.251:8080/api/v1/store/index',
        success: function(result) {
            store = result;
        },
        complete: function () {
            initMap(store);
        }
    });

    /**
     * @param store
     * @returns void
     */
    function initMap(store) {

        // Create the map.
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: {lat: 27.50, lng:  -82.61},
            mapTypeId: 'terrain'
        });

        // Construct the circle for each value in city map.
        for (var count in store.items) {

            // no location? no mapping
            if (!store.items[count].lati || !store.items[count].long) {
                continue;
            }

            // Add the circle for this city to the map.
            var storeCircle = new google.maps.Circle({
                strokeColor: '#666666',
                strokeOpacity: 0.75,
                strokeWeight: 1,
                fillColor: getColor(store.items[count].aov),
                fillOpacity: 0.33,
                map: map,
                center: {lat: parseFloat(store.items[count].lati), lng:  parseFloat(store.items[count].long)},
                radius: 7500
            });

            // Add the marker itself
            var marker = new google.maps.Marker({
                position: {lat: parseFloat(store.items[count].lati), lng:  parseFloat(store.items[count].long)},
                map: map
            });

            // Add infoWindow textual data to locations
            var infoWindow = new google.maps.InfoWindow({
                content: ' <div><b>Store:</b>&nbsp;'+store.items[count].name+'</div>'
                + '<div><b>Order Count:</b>&nbsp;'+store.items[count].order_count+'</div>'
                + '<div><b>Ave. Order Price: </b>&nbsp;$'+store.items[count].aov+'</div>',
                maxWidth: 160
            });

            // Open the infoWindow by default
            infoWindow.open(map, marker);
        }
    }

    /**
     * @param value
     * @returns string
     */
    function getColor(value) {
        if (value > 115) {
            return 'green';
        } else if (value > 110 && value <= 115) {
            return 'yellow';
        } else if (value > 100 && value <= 110) {
            return 'red';
        } else {
            return 'black';
        }
    }
});