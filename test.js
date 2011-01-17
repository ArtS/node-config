require.paths.unshift('.');

var sys = require('sys'),
    conf = require('./index');

function assert(value, message) {
    if(!value) {
        message = 'FAIL: ' + message;
    } else {
        message = 'PASS: ' + message;
    }

    console.log(message);
}

conf.initConfig(
    function(err) {
        if(err) {
            console.log(err);
            return;
        }

        assert(conf.a == 'a', 'conf.a == a');
        assert(conf.b == 'redefined b', 'conf.b == redefined b');
    },
    'hostname'
);
