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
        //anchor: [0,0],
        //anchorXUnits: 'fraction',
        //anchorYUnits: 'pixels',
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

//map.on('click', function (evt) {
//    console.log("map" + evt);
//    $('.contextMenu').hide();
//});

//map.getViewport().addEventListener('contextmenu', function (e) {
//    e.preventDefault();
//    var divPosition = $("#map").position();
//    console.log("mapposition x:" + e.layerX + ",mapposition y:" + e.layerY);
//    openContextMenu(e, e.layerX + divPosition.left, e.layerY + divPosition.top);
//});

//function openContextMenu(e, x, y) {
//    $('.contextMenu').remove();
//    $('body').append('<div class="contextMenu" style=" top: ' + y + 'px; left:' + x + 'px;">' +
//        '<div class="menuItem" onclick="handleContexMenuEvent(\'zoomIn\', \''+ x +'\', \''+ y +'\');"> Zoom In </div>' +
//		'<div class="menuItem" onclick="handleContexMenuEvent(\'zoomOut\', \''+ x +'\', \''+ y +'\');"> Zoom Out </div>' +
//		'<div class="menuItem" onclick="handleContexMenuEvent(\'centerMap\', \''+ x +'\', \''+ y +'\');"> Map Zentrieren </div>' +													'<div class="menuSeparator"> </div>' +
//        '<div class="menuItem"> Neuer Stolperstein </div>' +
//        '</div>');
//}

var contextmenuItems = [
    {
        text: 'Neuer Stolperstein',
        icon: pinIcon,
        callback: marker
    },
    '-' // this is a separator
];

var contextmenu = new ContextMenu({
    width: 180,
    items: contextmenuItems
});

map.addControl(contextmenu);
contextmenu.on('open', function (evt) {
        contextmenu.clear();
        contextmenu.extend(contextmenuItems);
        contextmenu.extend(contextmenu.getDefaultItems());
});

function marker(obj) {
    var coord4326 = ol.proj.transform(obj.coordinate, 'EPSG:3857', 'EPSG:4326'),
        template = 'Coordinate is ({x} | {y})',
        iconStyle = new ol.style.Style({
            image: new ol.style.Icon({ scale: .6, src: pinIcon }),
            text: new ol.style.Text({
                offsetY: 25,
                text: ol.coordinate.format(coord4326, template, 2),
                font: '15px Open Sans,sans-serif',
                fill: new ol.style.Fill({ color: '#111' }),
                stroke: new ol.style.Stroke({ color: '#eee', width: 2 })
            })
        }),
        feature = new ol.Feature({
            type: 'removable',
            geometry: new ol.geom.Point(obj.coordinate)
        });

    feature.setStyle(iconStyle);
    vectorLayer.getSource().addFeature(feature);
}


function handleContexMenuEvent(option, x, y) {
    $('.contextMenu').remove();
    console.log("content x:" + x + ", content y:" + y);


    var divPosition = $("#map").position();
    console.log("x:y" + x + " " + y);
    console.log("div y " + divPosition.top);
    var location = map.getCoordinateFromPixel([x - divPosition.left, y - divPosition.top + 7]);

    if (option == 'zoomIn' ) {
        var view = map.getView();
        map.getView().setZoom(view.getZoom() + 1);
        console.log(map.getView());
    } else if (option == 'zoomOut' ) {
        var view = map.getView();
        map.getView().setZoom(view.getZoom() - 1);
        
    } else if (option == 'centerMap' ) {
        console.log(location);
        goToCoord(location[0], location[1]);
    } else if (option == 'newStepStone') {
        //var iconFeature1 = new ol.Feature({
        //    geometry: new ol.geom.Point(ol.proj.transform([-4.5, 30.59375], 'EPSG:4326',
        //        'EPSG:3857')),
        //    population: 4001,
        //    rainfall: 501
        //});
        //features.push(iconFeature1);
        //console.log(features);
        //vectorSource.addFeature(iconFeature1);
        //$("#newStepStone").modal('show');
        //$(window).resize(
        //    resizeModalContent()
        //);
        //$('#newStepStone').on('shown.bs.modal', function (e) {
        //    resizeModalContent();
        //});
        var feature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform(location, 'EPSG:4326','EPSG:3857'))
        });
        var iconFeature1 = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform(x, y, 'EPSG:3857', 'EPSG:4326')),
            population: 4001,
            rainfall: 501
        });
            //new ol.geom.Point(location));
        //feature.setStyle(iconStyle);
        //features.push(feature);
        features.push(iconFeature1);
        vectorSource.addFeature(iconFeature1);
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



