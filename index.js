/** 
 * The Vue app is what renders the web page
 * with the given information.
 */

var app = new Vue({
  el: '#app',
  data: {
    stopTimes: { 0: 0 }, // stopID -> [minutes, minutes, minutes]
    stopNames: { 0: "Loading..." }, // stopID -> "stationName"
    service: "Loading..." 
  }
})

/**
 * This function should fill in the above datastructure
 * for the Vue app. Access variables with app.stations.whatever
 */

function getTimes() {
  // this isn't necessary yet
  var ms = (new Date()).valueOf()
  // the URL to request
  var requestStr = "https://www.bu.edu/bumobile/rpc/bus/livebus.json.php?callback=jQuery112408381368480827249_1506980760004&_=1506980760313" 
  // the callback which is called when the above URL returns something
  var gotData = function(d) {
    // console.log(d)
    var firstParen = d.indexOf('(')
    var lastParen = d.indexOf(')')
    var realData = d.slice(firstParen + 1, lastParen)
    realData = JSON.parse(realData)
    if (realData.service == null) {
      app.service = "No BUS service today"
    } else {
      app.service = realData.service
    }
    var stopTimes = {}
    results = realData.ResultSet.Result
    results.forEach((res) => {
      if (res.arrival_estimates != undefined) {
        res.arrival_estimates.forEach((arrEstim) => {
          var stopid = arrEstim.stop_id
          if (stopTimes[stopid] == undefined) stopTimes[stopid] = []
          var minutesUntil = Math.floor((((new Date(arrEstim.arrival_at)).valueOf()) - (new Date()).valueOf()) / 1000 / 60 * 10) / 10
          stopTimes[stopid].push(minutesUntil)
        })
      }
    })
    Object.keys(stopTimes).forEach((k) => {
      stopTimes[k].sort((a,b) => a-b)
      stopTimes[k] = stopTimes[k].filter(a => (a < 35))
      if (stopTimes[k].length < 1) {
        delete stopTimes[k]
      }
    })
    app.stopTimes = stopTimes
  }
  // make and send a request
  var testing = false
  if (testing) {
    // gotData(testResponse)
    app.stopTimes = {
      4114006: [3.5, 13, 23],
      4160714: [1, 10, 18]
    }
    app.service = "Testing Data"
  }
  else {
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      gotData(xmlHttp.responseText)
    }
    xmlHttp.open("GET", requestStr, true)
    xmlHttp.send(null)
  }
}

function getStops() {
  // the URL to request
  // var requestStr = "https://www.bu.edu/bumobile/rpc/bus/stops.json.php?service_id=caloop&callback=jQuery112400993204061098556_1508688412845&_=1508688412846"
  var requestStr = "https://www.bu.edu/bumobile/rpc/bus/stops.json.php?service_id=fall&callback=jQuery1124010487279827426832_1508775399203&_=1508775399204"
  // the callback which is called when the above URL returns something
  var gotData = function(d) {
    // console.log(d)
    var firstParen = d.indexOf('(')
    var lastParen = d.indexOf(')')
    var realData = d.slice(firstParen + 1, lastParen)
    realData = JSON.parse(realData)
    var newStopNames = {}
    realData.ResultSet.Result.forEach(stop => {
      newStopNames[stop.transloc_stop_id] = stop.stop_name
    })
    app.stopNames = newStopNames
  }
  // make and send a request
  var xmlHttp = new XMLHttpRequest()
  xmlHttp.onreadystatechange = function() { 
  if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
    gotData(xmlHttp.responseText)
  }
  xmlHttp.open("GET", requestStr, true)
  xmlHttp.send(null)
}

/** 
 * Finally, call the function to fill in the stations and times.
 */
getStops()
getTimes()

/** 
 * NOTES:
 * 
 * Replace development version of vue with production.
 *
 * Add google analytics javascript snippet.
 * 
 */

