// Global Variables
var map;
var markers;
var zoom = 14;
var clickedLonLat;
var parentOffset;
var divPosition;

$(document).ready(function () {
        InitalizeMap();
});

// Initalize the Openstreetmap
function InitalizeMap() {
    // Set Global Variables
    parentOffset = $("#map").parent().offset();
    divPosition = $("#map").position();
    mapHeight = window.outerHeight / 2;

    // Set Map height
    $("#map").attr("style", "height:" + mapHeight + "px;");

    // Get all exist StepStones
    $.get("/Home/GetAllStepStones",
        function (e) {
            $.each(e,
                function (index, step) {
                    var marker = new OpenLayers.Marker(new OpenLayers.LonLat(step.lon, step.lat));
                    markers.addMarker(marker);
                    marker.events.register('click', marker, function (e) {
                        popup = new OpenLayers.Popup("StepStonePopUp", marker.lonlat, new OpenLayers.Size(350, 300), false);
                        map.addPopup(popup);
                        popup.hide();
                        $("#StepStonePopUp").css("border", "1px solid");
                        $("#StepStonePopUp_GroupDiv").load("/Home/Popup?lon=" + marker.lonlat.lon + "&lat=" + marker.lonlat.lat);
                    });
                }
            )
        }
    );

    // Initalize Map
    map = new OpenLayers.Map("map");
    map.addLayer(new OpenLayers.Layer.OSM());

    // Map Dispose Events
    map.events.register("move", map,
        function () {
            $('.contextMenu').remove();
            $("#StepStonePopUp").remove();
        }
    );
    map.events.register("moveend", map,
        function () {
            $('.contextMenu').remove();
            $('#StepStonePopUp').remove();
        }
    );
    map.events.register("zoom", map,
        function () {
            $('.contextMenu').remove();
            $('#StepStonePopUp').remove();
        }
    )

    // Initalize Marker Layer
    markers = new OpenLayers.Layer.Markers("Markers");
    map.addLayer(markers);
    StartFocus();

    // Add Contextmenu Event
    map.getViewport().addEventListener('contextmenu', function (e) {
        e.preventDefault();
        openContextMenu(e);
    });
}

// Set focus to Hannover, Germany
function StartFocus() {
    var hannoverLocation = new OpenLayers.LonLat(1084686.2185368, 6867932.5105859);
    map.setCenter(hannoverLocation, zoom);
}


// Contextmenu
function openContextMenu(e) {
    // Keep Save
    $('.contextMenu').remove();

    // Default Values
    x = 1;
    y = 1;

    // Calculate correct Positions
    var relX = e.pageX - parentOffset.left;
    var relY = e.pageY - parentOffset.top;

    // The Contextmenu 
    $('#map').append('<div class="contextMenu" style=" top: ' + (relY) + 'px; left:' + (relX) + 'px; z-index: 9999;"  >' +
        '<div class="menuItem" onclick="handleContexMenuEvent(\'zoomIn\', \'' + relX + '\', \'' + relY + '\');"> Zoom In </div>' +
        '<div class="menuItem" onclick="handleContexMenuEvent(\'zoomOut\', \'' + relX + '\', \'' + relY + '\');"> Zoom Out </div>' +
        '<div class="menuItem" onclick="handleContexMenuEvent(\'centerMap\', \'' + relX + '\', \'' + relY + '\');"> Map Zentrieren </div>' +
        '<div class="menuSeparator"> </div>' +
        '<div class="menuItem" onclick="handleContexMenuEvent(\'newStepStone\', \'' + relX + '\', \'' + relY + '\');" > Neuer Stolperstein </div>' +
        '</div>');
}

// Close Contextmenu
function closeContextMenu() {
    $('.contextMenu').remove();
}

// Contextmenu Logic
function handleContexMenuEvent(option, x, y) {
    // Switched Clicked Option from Contextmenu
    switch (option) {
        case "zoomIn":
            map.setCenter(
                map.getLonLatFromPixel(
                    new OpenLayers.Pixel(x - divPosition.left, y - divPosition.top)
                ), map.zoom);
            map.zoomIn();
            break;
        case "zoomOut":
            map.setCenter(
                map.getLonLatFromPixel(
                    new OpenLayers.Pixel(x - divPosition.left, y - divPosition.top)
                ), map.zoom);
            map.zoomOut();
            break;
        case "centerMap":
            map.setCenter(
                map.getLonLatFromPixel(
                    new OpenLayers.Pixel(x - divPosition.left, y - divPosition.top)
                ), zoom);
            break;
        case "newStepStone":
            // the correct Clicked Position
            clickedLonLat = map.getLonLatFromPixel(
                new OpenLayers.Pixel(x - divPosition.left, y - divPosition.top)
            );

            // Resize the Modal when activated
            $('#newStepStone').on('shown.bs.modal', function (e) {
                resizeModalContent();
            });

            // Show Modal
            $("#newStepStone").modal();
            break;
        default: break;
    }

    $('.contextMenu').remove();
}

// Resize Modal
function resizeModalContent() {
    // Calc the correct Scale
    $.each($(".device-width"), function (i, obj) {
        if ($(obj).is(":visible")) {
            var device = $(obj).attr('id');
            if (device == "lg" || device == "md") {
                //$("#ImageUploadDiv").height($("#ImageUploadDiv").parent().height() - ($('label[for="stepStoneImage"]').height() * 2));
                //$("#stepStoneImage").removeClass("imageUploadInput");
                //$("#stepStoneImage").addClass("imageUploadInput");
            }
            else {
            //    $("#stepStoneImage").removeClass("imageUploadInput");
            }
        }
    });
}

// Create a new Stepstone
function PostStepStone() {
    var data = new FormData();
    
    // Get Userinput
    var info = $("#stepStoneInformation")[0].value;
    var image = $("#stepStoneImage").get(0).files[0];
    console.log(info);
    console.log(image);

    // Data Validation
    if (info == "") {
        $("#stepStoneInformation").addClass("is-invalid");
    }

    if (image == null) {
        $("#stepStoneImage").addClass("is-invalid");
    }

    if (image == null || info == null) {
        return;
    }

    // Create FormData Object to Post
    data.append(image.name, image);
    data.append("Description", info);
    data.append("Lon", clickedLonLat.lon);
    data.append("Lat", clickedLonLat.lat);

    // Post data to Controller
    $.ajax({
        type: "POST",
        url: "/Home/NewStepStone",
        contentType: false,
        processData: false,
        data: data,
        success: function (message) {
            // Close Modal
            $('#newStepStone').modal('hide');

            // Add new Marker for the new Stepstone
            var marker = new OpenLayers.Marker(clickedLonLat);
            markers.addMarker(marker);

            // Add a Click event to the new Marker
            marker.events.register('click', marker, function (e) {
                // Add a new Popup to the new Click event
                popup = new OpenLayers.Popup("StepStonePopUp", marker.lonlat, new OpenLayers.Size(350, 300), false);
                map.addPopup(popup);

                // First hide Popup to Redesign the Popup
                popup.hide();
                $("#StepStonePopUp").css("border", "1px solid");

                // Load the Popup Partial View
                $("#StepStonePopUp_GroupDiv").load("/Home/Popup?lon=" + marker.lonlat.lon + "&lat=" + marker.lonlat.lat);
            });
        },
        error: function () {
            //TODO: JBO
        }
    });
}

// Close Popup
function ClosePopup() {
    $("#StepStonePopUp").remove();
}

