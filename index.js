/** 
 * The Vue app is what renders the web page
 * with the given information.
 */

var app = new Vue({
  el: '#app',
  data: {
    // these are baloney values. just placeholders
    stations: [{ 
      name: "Student Village 2",
      arrivals: [2, 10, 15]
    },{
      name: "Amory St.",
      arrivals: [5, 13, 20]
    },{
      name: "St. Mary's St.",
      arrivals: [10, 19]
    }], 
    others: ["Blandford St.", "Hotel Commonwealth", "Huntington Ave.", "710 Albany St."]
  }
})

/**
 * This function should fill in the above datastructure
 * for the Vue app. Access variables with app.stations.whatever
 */

var getTimes = function() {
  console.log("I don't do anything yet.")
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
 * Add distinction between weekend and weekday schedules
 *
 */

