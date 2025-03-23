var infoBox_ratingType = 'star-rating';
(function($) {
    "use strict";

    function mainMap() {
        var ib = new InfoBox();

        function locationData(locationURL, locationImg, locationTitle, locationAddress,) {
            return ('' +
                '<a href="' + locationURL + '" class="listing-img-container">' +
                '<div class="infoBox-close"><i class="fa fa-times"></i></div>' +
                '<img src="' + locationImg + '" alt="">' +
                '<div class="listing-item-content">' +
                '<h3>' + locationTitle + '</h3>' +
                '<span>' + locationAddress + '</span>' +
                '</div>' +
                '</a>' +
                '<div class="listing-content">' +
                '<div class="listing-title">' +
                '</div>' +
                '</div>')
        }
 var locations = [

[locationData('job-detail.html', 'images/jobs-company/pic2.jpg', 'Senior Rolling Stock Technician', 'NJ 07932, United States of America', '4.0', '06'),40.78263477785881,-74.3855024580078, 4,'<i class="fa fa-briefcase"></i>'],
[locationData('job-detail.html', 'images/jobs-company/pic3.jpg', 'IT Department Manager', 'NJ 10921, United States of America', '4.0', '12'),41.3212039026965,-74.35902140895382, 5,'<i class="fa fa-briefcase"></i>'],

[locationData('job-detail.html', 'images/jobs-company/pic5.jpg', 'Recreation & Fitness Worker', 'NJ 07481, United States of America', '4.0', '06'),40.974261526761296,-74.15371440211788, 8,'<i class="fa fa-briefcase"></i>'],
[locationData('job-detail.html', 'images/jobs-company/pic2.jpg', 'Senior Web Designer , Developer', 'NJ 07646, United States of America', '4.0', '06'),40.92222618539489,-74.02393840114132, 9, '<i class="fa fa-briefcase"></i>'],



[locationData('job-detail.html', 'images/jobs-company/pic1.jpg', '61 John Street', 'NJ 07481, United States of America', '4.0', '06'),40.84422081239799,-74.27912244349648, 13,'<i class="fa fa-briefcase"></i>'],
[locationData('job-detail.html', 'images/jobs-company/pic5.jpg', 'Recreation & Fitness Worker', 'NJ 07646, United States of America', '4.0', '06'),40.79520211025921,-74.35534009486366, 14,'<i class="fa fa-briefcase"></i>'],
[locationData('job-detail.html', 'images/jobs-company/pic4.jpg', 'Art Production Specialist', 'st Street, Mineola, NY 11501, United States of America', '4.0', '06'),40.69722959123321,-74.4068385079496, 10,'<i class="fa fa-briefcase"></i>'],
[locationData('job-detail.html', 'images/jobs-company/pic2.jpg', 'Senior Rolling Stock Technician', 'NY 11798, United States of America', '4.0', '06'),40.79381588568169,-74.99666699916054, 15,'<i class="fa fa-briefcase"></i>'],
[locationData('job-detail.html', 'images/jobs-company/pic3.jpg', 'IT Department Manager', 'NY 11782, United States of America', '4.0', '06'),40.7686857353089,-75.14704236537148, 16,'<i class="fa fa-briefcase"></i>'],
[locationData('job-detail.html', 'images/jobs-company/pic2.jpg', 'Senior Web Designer , Developer', '1363-1385 Sunset Blvd Los Angeles, CA 90026, USA', '4.0', '06'),40.66963252905638,-75.34685620814491, 17, '<i class="fa fa-briefcase"></i>'],









        ];

        var mapZoomAttr = $('#map').attr('data-map-zoom');
        var mapScrollAttr = $('#map').attr('data-map-scroll');
        if (typeof mapZoomAttr !== typeof undefined && mapZoomAttr !== false) {
            var zoomLevel = parseInt(mapZoomAttr);
        } else {
            var zoomLevel = 5;
        }
        if (typeof mapScrollAttr !== typeof undefined && mapScrollAttr !== false) {
            var scrollEnabled = parseInt(mapScrollAttr);
        } else {
            var scrollEnabled = false;
        }
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: zoomLevel,
            scrollwheel: scrollEnabled,
            center: new google.maps.LatLng(40.80, -73.70),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            panControl: false,
            navigationControl: false,
            streetViewControl: false,
            gestureHandling: 'cooperative',
            styles: [
    {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#2c2e33"
            },
            {
                "saturation": 7
            },
            {
                "lightness": 19
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": "-3"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#1967d2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 100
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#1967d2"
            },
            {
                "saturation": "0"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ff6f00"
            },
            {
                "saturation": "100"
            },
            {
                "lightness": 31
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#1967d2"
            },
            {
                "saturation": "0"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#008eff"
            },
            {
                "saturation": -93
            },
            {
                "lightness": 31
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#f3dbc8"
            },
            {
                "saturation": "0"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#bbc0c4"
            },
            {
                "saturation": -93
            },
            {
                "lightness": -2
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#e9ebed"
            },
            {
                "saturation": -90
            },
            {
                "lightness": -8
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#e9ebed"
            },
            {
                "saturation": 10
            },
            {
                "lightness": 69
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#e9ebed"
            },
            {
                "saturation": -78
            },
            {
                "lightness": 67
            },
            {
                "visibility": "simplified"
            }
        ]
    }
]
        });
        $('.listing-item-container').on('mouseover', function() {
            var listingAttr = $(this).data('marker-id');
            if (listingAttr !== undefined) {
                var listing_id = $(this).data('marker-id') - 1;
                var marker_div = allMarkers[listing_id].div;
                $(marker_div).addClass('clicked');
                $(this).on('mouseout', function() {
                    if ($(marker_div).is(":not(.infoBox-opened)")) {
                        $(marker_div).removeClass('clicked');
                    }
                });
            }
        });
        var boxText = document.createElement("div");
        boxText.className = 'map-box'
        var currentInfobox;
        var boxOptions = {
            content: boxText,
            disableAutoPan: false,
            alignBottom: true,
            maxWidth: 0,
            pixelOffset: new google.maps.Size(-134, -55),
            zIndex: null,
            boxStyle: {
                width: "270px"
            },
            closeBoxMargin: "0",
            closeBoxURL: "",
            infoBoxClearance: new google.maps.Size(25, 25),
            isHidden: false,
            pane: "",
            enableEventPropagation: false,
        };
        var markerCluster, overlay, i;
        var allMarkers = [];
        var clusterStyles = [{
            textColor: 'white',
            url: '',
            height: 50,
            width: 50
        }];
        var markerIco;
        for (i = 0; i < locations.length; i++) {
            markerIco = locations[i][4];
            var overlaypositions = new google.maps.LatLng(locations[i][1], locations[i][2]),
                overlay = new CustomMarker(overlaypositions, map, {
                    marker_id: i
                }, markerIco);
            allMarkers.push(overlay);
            google.maps.event.addDomListener(overlay, 'click', (function(overlay, i) {
                return function() {
                    ib.setOptions(boxOptions);
                    boxText.innerHTML = locations[i][0];
                    ib.close();
                    ib.open(map, overlay);
                    currentInfobox = locations[i][3];
                    google.maps.event.addListener(ib, 'domready', function() {
                        $('.infoBox-close').click(function(e) {
                            e.preventDefault();
                            ib.close();
                            $('.map-marker-container').removeClass('clicked infoBox-opened');
                        });
                    });
                }
            })(overlay, i));
        }
        var options = {
            imagePath: 'images/',
            styles: clusterStyles,
            minClusterSize: 2
        };
        markerCluster = new MarkerClusterer(map, allMarkers, options);
        google.maps.event.addDomListener(window, "resize", function() {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });
        var zoomControlDiv = document.createElement('div');
        var zoomControl = new ZoomControl(zoomControlDiv, map);

        function ZoomControl(controlDiv, map) {
            zoomControlDiv.index = 1;
            map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(zoomControlDiv);
            controlDiv.style.padding = '5px';
            controlDiv.className = "zoomControlWrapper";
            var controlWrapper = document.createElement('div');
            controlDiv.appendChild(controlWrapper);
            var zoomInButton = document.createElement('div');
            zoomInButton.className = "custom-zoom-in";
            controlWrapper.appendChild(zoomInButton);
            var zoomOutButton = document.createElement('div');
            zoomOutButton.className = "custom-zoom-out";
            controlWrapper.appendChild(zoomOutButton);
            google.maps.event.addDomListener(zoomInButton, 'click', function() {
                map.setZoom(map.getZoom() + 1);
            });
            google.maps.event.addDomListener(zoomOutButton, 'click', function() {
                map.setZoom(map.getZoom() - 1);
            });
        }
        
    }
    var map = document.getElementById('map');
    if (typeof(map) != 'undefined' && map != null) {
        google.maps.event.addDomListener(window, 'load', mainMap);
    }
	






	
	
//====================================Map In Popup======================================================//	


//single list map in popup
    function singleListingMappopup() {
        var myLatlng_popup = new google.maps.LatLng({
            lng: $('#singleListingMappopup').data('longitude'),
            lat: $('#singleListingMappopup').data('latitude'),
        });
        var single_map_popup = new google.maps.Map(document.getElementById('singleListingMappopup'), {
            zoom: 15,
            center: myLatlng_popup,
            scrollwheel: false,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            panControl: false,
            navigationControl: false,
            streetViewControl: false,
            styles: [
    {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#2c2e33"
            },
            {
                "saturation": 7
            },
            {
                "lightness": 19
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": "-3"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#1967d2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 100
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#1967d2"
            },
            {
                "saturation": "0"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ff6f00"
            },
            {
                "saturation": "100"
            },
            {
                "lightness": 31
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#1967d2"
            },
            {
                "saturation": "0"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#008eff"
            },
            {
                "saturation": -93
            },
            {
                "lightness": 31
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#f3dbc8"
            },
            {
                "saturation": "0"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#bbc0c4"
            },
            {
                "saturation": -93
            },
            {
                "lightness": -2
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#e9ebed"
            },
            {

                "saturation": -90
            },
            {
                "lightness": -8
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#e9ebed"
            },
            {
                "saturation": 10
            },
            {
                "lightness": 69
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#e9ebed"
            },
            {
                "saturation": -78
            },
            {
                "lightness": 67
            },
            {
                "visibility": "simplified"
            }
        ]
    }
]
        });
        var zoomControlDiv = document.createElement('div');
        var zoomControl = new ZoomControl(zoomControlDiv, single_map_popup);

        function ZoomControl(controlDiv, single_map_popup) {
            zoomControlDiv.index = 1;
            single_map_popup.controls[google.maps.ControlPosition.RIGHT_CENTER].push(zoomControlDiv);
            controlDiv.style.padding = '5px';
            var controlWrapper_popup = document.createElement('div');
            controlDiv.appendChild(controlWrapper);
            var zoomInButton_popup = document.createElement('div');
            zoomInButton_popup.className = "custom-zoom-in";
            controlWrapper.appendChild(zoomInButton);
            var zoomOutButton_popup = document.createElement('div');
            zoomOutButton_popup.className = "custom-zoom-out";
            controlWrapper_popup.appendChild(zoomOutButton_popup);
            google.maps.event.addDomListener(zoomInButton_popup, 'click', function() {
                single_map_popup.setZoom(single_map_popup.getZoom() + 1);
            });
            google.maps.event.addDomListener(zoomOutButton_popup, 'click', function() {
                single_map_popup.setZoom(single_map_popup.getZoom() - 1);
            });
        }
        var singleMapIco_popup = "<i class='" + $('#singleListingMappopup').data('map-icon') + "'></i>";
        new CustomMarker(myLatlng, single_map_popup, {
            marker_id: '1'
        }, singleMapIco_popup);
    }
    var single_map_popup = document.getElementById('singleListingMappopup');
    if (typeof(single_map_popup) != 'undefined' && single_map_popup != null) {
        google.maps.event.addDomListener(window, 'load', singleListingMappopup);
    }

    function CustomMarker(latlng, map, args, markerIco) {
        this.latlng = latlng;
        this.args = args;
        this.markerIco = markerIco;
        this.setMap(map);
    }
    CustomMarker.prototype = new google.maps.OverlayView();
    CustomMarker.prototype.draw = function() {
        var self = this;
        var div = this.div;
        if (!div) {
            div = this.div = document.createElement('div');
            div.className = 'map-marker-container';
            div.innerHTML = '<div class="marker-container">' +
                '<div class="marker-card">' +
                '<div class="front face">' + self.markerIco + '</div>' +
                '<div class="back face">' + self.markerIco + '</div>' +
                '<div class="marker-arrow"></div>' +
                '</div>' +
                '</div>'
            google.maps.event.addDomListener(div, "click", function(event) {
                $('.map-marker-container').removeClass('clicked infoBox-opened');
                google.maps.event.trigger(self, "click");
                $(this).addClass('clicked infoBox-opened');
            });
            if (typeof(self.args.marker_id) !== 'undefined') {
                div.dataset.marker_id = self.args.marker_id;
            }
            var panes = this.getPanes();
            panes.overlayImage.appendChild(div);
        }
        var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
        if (point) {
            div.style.left = (point.x) + 'px';
            div.style.top = (point.y) + 'px';
        }
    };
    CustomMarker.prototype.remove = function() {
        if (this.div) {
            this.div.parentNode.removeChild(this.div);
            this.div = null;
            $(this).removeClass('clicked');
        }
    };
    CustomMarker.prototype.getPosition = function() {
        return this.latlng;
    };
	
	
//==============================================Single List Map =============================================//
	
//single list map 
    function singleListingMap() {
        var myLatlng = new google.maps.LatLng({
            lng: $('#singleListingMap').data('longitude'),
            lat: $('#singleListingMap').data('latitude'),
        });
        var single_map = new google.maps.Map(document.getElementById('singleListingMap'), {
            zoom: 15,
            center: myLatlng,
            scrollwheel: false,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            panControl: false,
            navigationControl: false,
            streetViewControl: false,
            styles: [
    {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#2c2e33"
            },
            {
                "saturation": 7
            },
            {
                "lightness": 19
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": "-3"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#1967d2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 100
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#1967d2"
            },
            {
                "saturation": "0"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ff6f00"
            },
            {
                "saturation": "100"
            },
            {
                "lightness": 31
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#1967d2"
            },
            {
                "saturation": "0"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#008eff"
            },
            {
                "saturation": -93
            },
            {
                "lightness": 31
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#f3dbc8"
            },
            {
                "saturation": "0"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#bbc0c4"
            },
            {
                "saturation": -93
            },
            {
                "lightness": -2
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#e9ebed"
            },
            {

                "saturation": -90
            },
            {
                "lightness": -8
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#e9ebed"
            },
            {
                "saturation": 10
            },
            {
                "lightness": 69
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#e9ebed"
            },
            {
                "saturation": -78
            },
            {
                "lightness": 67
            },
            {
                "visibility": "simplified"
            }
        ]
    }
]
        });
        var zoomControlDiv = document.createElement('div');
        var zoomControl = new ZoomControl(zoomControlDiv, single_map);

        function ZoomControl(controlDiv, single_map) {
            zoomControlDiv.index = 1;
            single_map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(zoomControlDiv);
            controlDiv.style.padding = '5px';
            var controlWrapper = document.createElement('div');
            controlDiv.appendChild(controlWrapper);
            var zoomInButton = document.createElement('div');
            zoomInButton.className = "custom-zoom-in";
            controlWrapper.appendChild(zoomInButton);
            var zoomOutButton = document.createElement('div');
            zoomOutButton.className = "custom-zoom-out";
            controlWrapper.appendChild(zoomOutButton);
            google.maps.event.addDomListener(zoomInButton, 'click', function() {
                single_map.setZoom(single_map.getZoom() + 1);
            });
            google.maps.event.addDomListener(zoomOutButton, 'click', function() {
                single_map.setZoom(single_map.getZoom() - 1);
            });
        }
        var singleMapIco = "<i class='" + $('#singleListingMap').data('map-icon') + "'></i>";
        new CustomMarker(myLatlng, single_map, {
            marker_id: '1'
        }, singleMapIco);
    }
    var single_map = document.getElementById('singleListingMap');
    if (typeof(single_map) != 'undefined' && single_map != null) {
        google.maps.event.addDomListener(window, 'load', singleListingMap);
    }

    function CustomMarker(latlng, map, args, markerIco) {
        this.latlng = latlng;
        this.args = args;
        this.markerIco = markerIco;
        this.setMap(map);
    }
    CustomMarker.prototype = new google.maps.OverlayView();
    CustomMarker.prototype.draw = function() {
        var self = this;
        var div = this.div;
        if (!div) {
            div = this.div = document.createElement('div');
            div.className = 'map-marker-container';
            div.innerHTML = '<div class="marker-container">' +
                '<div class="marker-card">' +
                '<div class="front face">' + self.markerIco + '</div>' +
                '<div class="back face">' + self.markerIco + '</div>' +
                '<div class="marker-arrow"></div>' +
                '</div>' +
                '</div>'
            google.maps.event.addDomListener(div, "click", function(event) {
                $('.map-marker-container').removeClass('clicked infoBox-opened');
                google.maps.event.trigger(self, "click");
                $(this).addClass('clicked infoBox-opened');
            });
            if (typeof(self.args.marker_id) !== 'undefined') {
                div.dataset.marker_id = self.args.marker_id;
            }
            var panes = this.getPanes();
            panes.overlayImage.appendChild(div);
        }
        var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
        if (point) {
            div.style.left = (point.x) + 'px';
            div.style.top = (point.y) + 'px';
        }
    };
    CustomMarker.prototype.remove = function() {
        if (this.div) {
            this.div.parentNode.removeChild(this.div);
            this.div = null;
            $(this).removeClass('clicked');
        }
    };
    CustomMarker.prototype.getPosition = function() {
        return this.latlng;
    };	
	
	
	
})(this.jQuery);