const https = require('https');

var buAdapter = function() {
    var self = this;



    function getBuses(callback) {
        var apiURL = 'https://www.bu.edu/bumobile/rpc/bus/livebus.json.php?callback=jQuery112408557333015351714_1504309662064&_=1504309662068';
        https.get(apiURL, function(res) {
            if (res.statusCode == '200') {
                res.setEncoding('utf8');

                res.on('data', (data) => {
                    var firstParenIndex = data.indexOf('(');
                    var frontFixed = data.substring(firstParenIndex + 1);
                    var frontAndBackFixed = frontFixed.substring(0, frontFixed.length - 2);

                    var responseJson = JSON.parse(frontAndBackFixed);
                    callback(responseJson);
                });
            }
            else {
                console.log('Status code not 200:' + res.statusCode);
            }

        });
    }

    self.getBuses = getBuses;


}

module.exports = buAdapter;
