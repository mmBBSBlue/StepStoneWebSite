var vectorSource = new ol.source.Vector();
var vectorLayer = new ol.layer.Vector({
    source: vectorSource
});

var features = new ol.Collection();
var areaSource = new ol.source.Vector({
    features: features
});

var areaVectorLayer = new ol.layer.Vector({
    source: areaSource,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 167, 66, 0.4)'
        }),
        stroke: new ol.style.Stroke({
            color: '#ff7733',
            width: 2
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ff7733'
            })
        })
    })
});

var iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0,0],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: 'images/marker.png'
    })
});

var map = new ol.Map({
    layers: [
    new ol.layer.Tile({
        source: new ol.source.OSM()
    }),
    vectorLayer,
        areaVectorLayer],
    feature: features,
    target: 'map',
    controls: ol.control.defaults({
        attributionOptions: /** @type {olx.control.AttributionOptions} */
        ({
            collapsible: false
        })
    }),
    view: new ol.View({
        center: [0, 0],
        zoom: 2
    })
});

map.on('click', function (evt) {
    $('.contextMenu').hide();
});

map.getViewport().addEventListener('contextmenu', function (e) {
    e.preventDefault();
    var divPosition = $("#map").position();
    console.log("y: " + divPosition.top);
    openContextMenu(e.layerX + divPosition.left, e.layerY + divPosition.top);
});

function openContextMenu(x, y) {
    $('.contextMenu').remove();
    $('body').append('<div class="contextMenu" style=" top: ' + y + 'px; left:' + x + 'px;">' +
        '<div class="menuItem" onclick="handleContexMenuEvent(\'zoomIn\', \''+ x +'\', \''+ y +'\');"> Zoom In </div>' +
		'<div class="menuItem" onclick="handleContexMenuEvent(\'zoomOut\', \''+ x +'\', \''+ y +'\');"> Zoom Out </div>' +
		'<div class="menuItem" onclick="handleContexMenuEvent(\'centerMap\', \''+ x +'\', \''+ y +'\');"> Map Zentrieren </div>' +													'<div class="menuSeparator"> </div>' +
        '<div class="menuItem" onclick="handleContexMenuEvent(\'newStepStone\', \'' + x + '\', \'' + y + '\');"> Neuer Stolperstein </div>' +
        '</div>');
}

function handleContexMenuEvent(option, x, y) {
    $('.contextMenu').remove();

    var divPosition = $("#map").position();
    console.log("x:y" + x + " " + y);
    console.log("div y " + divPosition.top);
    var location = map.getCoordinateFromPixel([x - divPosition.left,y - divPosition.top + 7]);

    if (option == 'zoomIn' ) {
        var view = map.getView();
        map.getView().setZoom(view.getZoom() + 1);
    } else if (option == 'zoomOut' ) {
        var view = map.getView();
        map.getView().setZoom(view.getZoom() - 1);
        
    } else if (option == 'centerMap' ) {
        console.log(location);
        goToCoord(location[0], location[1]);
    } else if (option == 'newStepStone') {
        $("#newStepStone").modal('show');
        $(window).resize(
            resizeModalContent()
        );
        $('#newStepStone').on('shown.bs.modal', function (e) {
            resizeModalContent();
        });
        var feature = new ol.Feature(
            new ol.geom.Point(location));
        feature.setStyle(iconStyle);
        features.push(feature);
        //vectorSource.addFeature(feature);
        
    }
}

function goToCoord(x, y) {
    var p = new ol.geom.Point([x,y]).getCoordinates();
    map.getView().setCenter(p);
}

function resizeModalContent(){
    $.each( $(".device-width"), function(i, obj){
        if($(obj).is(":visible")){
            var device = $(obj).attr('id');
            if(device == "lg" || device == "md"){
                $("#ImageUploadDiv").height($("#ImageUploadDiv").parent().height() - ($('label[for="stepStoneImage"]').height()*2)); 
                $("#stepStoneImage").removeClass("imageUploadInput");
                $("#stepStoneImage").addClass("imageUploadInput");            
            }
            else{
                //$("#ImageUploadDiv").height() =  $("#stepStoneName").height();
                $("#stepStoneImage").removeClass("imageUploadInput");
            }
        }
    });  
}



