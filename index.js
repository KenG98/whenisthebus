/** 
 * The Vue app is what renders the web page
 * with the given information.
 */

var app = new Vue({
  el: '#app',
  data: {
    stopTimes: {"Loading...": 0},
    stationNames: {
      4068466: "710 Albany St",
      4114006: "Amory St",
      4068470: "Hotel Commonwealth",
      4160730: "Silber Way",
      4149154: "St. Mary's Way",
      4110206: "Huntington Ave",
      4160738: "College of Fine Arts",
      1: "Student Village 2",
      2: "Blandford St",
      3: "Danielsen Hall",
      4: "Myles Standish",
      5: "Marsh Plaza",
      6: "Nickerson Field",
      7: "",
      8: "",
      9: ""
    },
    service: "Loading..."
  }
})

/**
 * This function should fill in the above datastructure
 * for the Vue app. Access variables with app.stations.whatever
 */

var getTimes = function() {
  // this isn't necessary yet
  var ms = (new Date()).valueOf()
  // the URL to request
  var requestStr = "https://www.bu.edu/bumobile/rpc/bus/livebus.json.php?callback=jQuery112408381368480827249_1506980760004&_=1506980760313" 
  // the callback which is called when the above URL returns something
  var gotData = function(d) {
    console.log(d)
    var firstParen = d.indexOf('(')
    var lastParen = d.indexOf(')')
    var realData = d.slice(firstParen + 1, lastParen)
    realData = JSON.parse(realData)
    app.service = realData.service
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
      stopTimes[k] = stopTimes[k].filter(a => a < 21)
    })
    app.stopTimes = stopTimes
  }
  // make and send a request
  var testing = true
  var testResponse = 'jQuery112408381368480827249_1506980760004({"title":"BU Bus Positions","service":"Late Night Saturday","service_id":"lnw5","ResultSet":{"Result":[{"id":"4010503","call_name":"2020","heading":"7","speed":"0","timestamp":"2017-10-22T00:12:48+00Z","route":"weekday","coordinates":"-71.03097,42.19464","lng":"-71.03097","lat":"42.19464","general_heading":0},{"id":"4007520","call_name":"2016","heading":"339","speed":"1","timestamp":"2017-10-21T23:41:18+00Z","route":"weekday","coordinates":"-71.03103,42.19484","lng":"-71.03103","lat":"42.19484","general_heading":0},{"id":"4007504","call_name":"2127","heading":"245","speed":"0","timestamp":"2017-10-22T03:11:23+00Z","route":"weekday","coordinates":"-71.117193758475,42.351378705207","lng":"-71.117193758475","lat":"42.351378705207","general_heading":225,"arrival_estimates":[{"route_id":"4005182","arrival_at":"2017-10-21T23:13:03-04:00","stop_id":"4160714"},{"route_id":"4005182","arrival_at":"2017-10-21T23:19:05-04:00","stop_id":"4114006"},{"route_id":"4005182","arrival_at":"2017-10-21T23:21:55-04:00","stop_id":"4149154"},{"route_id":"4005182","arrival_at":"2017-10-21T23:23:38-04:00","stop_id":"4068466"},{"route_id":"4005182","arrival_at":"2017-10-21T23:26:04-04:00","stop_id":"4068470"},{"route_id":"4005182","arrival_at":"2017-10-21T23:51:59-04:00","stop_id":"4110206"}]}]},"totalResultsAvailable":3,"isMissingResults":0}); '
  if (testing) {
    gotData(testResponse)
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

/** 
 * Finally, call the function to fill in the stations and times.
 */

getTimes()

/** 
 * NOTES:
 * 
 * Replace development version of vue with production.
 *
 * Add google analytics javascript snippet.
 * 
 */

