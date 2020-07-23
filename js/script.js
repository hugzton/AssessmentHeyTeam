var values = [
    [180,161,102,31,31,46,175,199,106,89,137,200,199,126,159,114,184,198,10,183,30,150,47,187,35,126,131,159,173,178,174,69,87,157,75,190,181,122,65,19,63,67,56,115,65,162,159,144,77,36],
    [195,31,102,148,119,28,190,197,145,190,84,91,62,101,72,178,81,92,119,103,183,57,122,47,170,12,19,193,196,199,47,43,85,152,158,151,42,26,112,44,163,186,50,121,152,49,169,136,198,98], 
    [26,98,102,120,105,153,47,167,188,41,121,109,16,199,83,196,188,101,122,121,193,59,77,27,43,55,70,186,24,118,185,63,122,68,119,0,16,44,181,135,102,43,134,91,180,152,94,169,110,31]];

/**
 * 
 * @param {*} arr 
 * @param {*} val 
 * Used to find the occurences of value(val) in array(arr), return 0 if not
 */
const countOccurrences = (arr, val) => arr.reduce((a, currentValue) => (currentValue === val ? a + 1 : a), 0);

/**
 * 
 * @param {*} values 
 * init a list of object with item(values) given
 */
function initMap(values){
    let map = []
    values.forEach((column, i) => {
        map.push([])
        column.forEach((item) => {
            map[i].push({
                value: item,
                occur: 0,
                color: "white"
              })
        })
    })
    return map
}

/**
 * 
 * @param {*} map 
 * @param {*} limit 
 * Used to give green color for all first two value in map (left to right) under the limit
 */
function handleGreen(map, limit){
    let occur = []
    map.forEach((column) => {
        column.forEach((item) => {
            if (countOccurrences(occur, item.value) < 2  &&  item.value > limit) {
                item.color = "green"
            }
            occur.push(item.value)    
        })
    }) 
    return map
}

/**
 * 
 * @param {*} map 
 * @param {*} limit 
 * Used to give red color for first value in map (right to left) under the limit
 */
function handleRed(map, limit) {
    let occur = []
    map.slice().reverse()
	    .forEach((column) => {
			column.forEach((item) => {
                if (countOccurrences(occur, item.value) < 1  &&  item.value < limit) {
                    item.color = "red"
                }
                occur.push(item.value)        
            })
	})
    return map
}

/**
 * 
 * @param {*} map 
 * Used to handle color with handleRed & handleGreen method
 */
function handleColors(map){
    return handleRed(handleGreen(map, 100), 100)
}

/**
 * 
 * @param {*} values 
 * Used to generate html DOM table with map(values) given
 */
function createTable(values){
    var body = document.body,
        tbl  = document.createElement('table');

    values.forEach((column) => {
        var tr = tbl.insertRow()
        column.forEach((item) => {
          var td = tr.insertCell()
          td.appendChild(document.createTextNode(item.value))
          td.style.backgroundColor = item.color
        })
    })
    body.appendChild(tbl);
}

let map = initMap(values);
createTable(handleColors(map));