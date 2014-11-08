// data extracted from http://www.in-n-out.com/locations

var fs = require('fs');
var path = require('path');
var xml2js = require('xml2js');

var xml_parser = new xml2js.Parser();

var featureCollection_stub = {
    "type": "FeatureCollection",
    "features": []
};

var xml_path = path.join(__dirname, "loc.xml");
fs.readFile(xml_path, function(err, data) {
    xml_parser.parseString(data, function(err, result) {
        var pois = result['response']['collection'][0]['poi'];
        pois.forEach(function(poi){
            var feature = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates":[
                        parseFloat(poi.longitude[0]),
                        parseFloat(poi.latitude[0])
                        ]
                },
                "properties": {}
            };

            // add properties
            for (var property in poi) {
                feature['properties'][property] = poi[property];
            }

            featureCollection_stub['features'].push(feature);
        });

        console.log(JSON.stringify(featureCollection_stub));
    });
});