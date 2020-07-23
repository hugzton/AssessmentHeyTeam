var values = [
    [180,161,102,31,31,46,175,199,106,89,137,200,199,126,159,114,184,198,10,183,30,150,47,187,35,126,131,159,173,178,174,69,87,157,75,190,181,122,65,19,63,67,56,115,65,162,159,144,77,36],
    [195,31,102,148,119,28,190,197,145,190,84,91,62,101,72,178,81,92,119,103,183,57,122,47,170,12,19,193,196,199,47,43,85,152,158,151,42,26,112,44,163,186,50,121,152,49,169,136,198,98], 
    [26,98,102,120,105,153,47,167,188,41,121,109,16,199,83,196,188,101,122,121,193,59,77,27,43,55,70,186,24,118,185,63,122,68,119,0,16,44,181,135,102,43,134,91,180,152,94,169,110,31]];

const countOccurrences = (arr, val) => arr.reduce((a, currentValue) => (currentValue === val ? a + 1 : a), 0);

function initMap(values){
    let map = []
    for(var i = 0; i < values.length; i++){
        map.push([])
        for(var j = 0; j < values[i].length ; j++){
            map[i].push({
              value: values[i][j],
              occur: 0,
              color: "white"
            })
        }
    }
    return map
}

function handleColors(map){
    let occur = []
    for(var i = 0; i < map.length; i++){
      for(var j = 0; j < map[i].length ; j++){
        if (countOccurrences(occur, map[i][j].value) < 2  &&  map[i][j].value > 100) {
          map[i][j].color = "green"
        }
        occur.push(map[i][j].value)
      }
    }
    occur = []
    for(var i = map.length - 1; i >= 0; i--){
      for(var j = 0; j < map[i].length; j++){
        if (countOccurrences(occur, map[i][j].value) < 1  &&  map[i][j].value < 100) {
          map[i][j].color = "red"
        }
        occur.push(map[i][j].value)
      }
    }
    return map
}

function createTable(values){
    var body = document.body,
        tbl  = document.createElement('table');

    for(var i = 0; i < values.length; i++){
        var tr = tbl.insertRow();
        for(var j = 0; j < values[i].length ; j++){
          var td = tr.insertCell();
          td.appendChild(document.createTextNode(values[i][j].value));
          td.style.backgroundColor = values[i][j].color;
        }
    }
    body.appendChild(tbl);
}

let map = initMap(values);
createTable(handleColors(map));