import fs from 'fs'
import xml2js from "xml2js";


function inside(point:number[], vs:string[][]) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = parseFloat(vs[i][0]), yi = parseFloat(vs[i][1]);
        var xj = parseFloat(vs[j][0]), yj = parseFloat(vs[j][1]);

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
};



const createPolygons = () => {
    var parser = new xml2js.Parser();
    fs.readFile(__dirname + '/data/deliveryAreas.kml', function(err, data) {
        parser.parseString(data, function (err:any, result:any) {
            var data = [];
            for (var i in result.kml.Document[0].Placemark) {
                if(result.kml.Document[0].Placemark[i].Polygon){
                    let polygonsArr = result.kml.Document[0].Placemark[i].Polygon[0].outerBoundaryIs[0].LinearRing[0].coordinates[0].split('\n')
                    let polygons = []
                    for(var j in polygonsArr){
                        if(polygonsArr[j] != ''){
                            polygons.push({
                                name: result.kml.Document[0].Placemark[i].name[0],
                                polygon_data: polygonsArr[j].trim().split(',')
                            })
                        }
                    }
                }
            }
        });
    })
}