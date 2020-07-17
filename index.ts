import express from "express";
import path from "path";
import bodyParser from 'body-parser'
import fs from 'fs'
import xml2js from "xml2js";
import fetchPointInPolygon from './server/services/fetch_in_polygon'

const app = express();

app.use(bodyParser.json())

// path for static files
app.use(express.static(path.join(__dirname, 'client','build')));


app.post('/location',(req,res)=>{


    let response:string = "Not outlet found";
    // parser logic
    var parser = new xml2js.Parser();
    fs.readFile(__dirname + '/data/deliveryAreas.kml', function(err, data) {
        parser.parseString(data, function (err:any, result:any) {
            for (var i in result.kml.Document[0].Placemark) {
                if(result.kml.Document[0].Placemark[i].Polygon){
                    let polygonsArr = result.kml.Document[0].Placemark[i].Polygon[0].outerBoundaryIs[0].LinearRing[0].coordinates[0].split('\n')
                    let polygons = []
                    for(var j in polygonsArr){
                        if(polygonsArr[j] != ''){
                            polygons.push(polygonsArr[j].trim().split(','))
                        }
                    }
                    if(fetchPointInPolygon([req.body.lng,req.body.lat],polygons)){
                        response = result.kml.Document[0].Placemark[i].name[0];
                        break;
                    }
                }
            }
            res.json({
                message: 'success',
                status: 200,
                name: response
            })
        });
    })
})

app.get("*", (req, res) => {
    res.render(path.resolve(__dirname, "client", "build", "index.html"));
});


app.listen('5000',() => {
    console.log('server started listening on port 5000');
})