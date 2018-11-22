'use strict';
module.exports = function() {
    let request = require('request');
    
    function register(address, info, callback) {
        let options = {
            url: address,
            body: JSON.stringify(info),
            headers: {
                //authorization header
            },
            method: 'POST'
        };
        request(options, (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return callback(error||Error('Unable to register'));
            }
            return callback();
        });
    }

    return {
        register: register
    }
}