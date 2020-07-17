const fetchPointInPolygon = (point:number[], vs:string[][]) => {
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


export default fetchPointInPolygon;