## Description
Lightweight configuration engine for node.js

Allows you to have a common configuration file with an ability to override particular
settings in host-specific configuratin files.

## How it works
For example, name of your application stays the same, i.e.

conf/common.js:
    exports.conf = {
        name: 'My Super Awesome Kick Ass Startup'
    }

but the connection string to the database is different in case of
CI/Dev/Production machines:

conf/ci-hostname.js:
    exports.conf = {
        db_connection: 'ci.mongo-db.local'
    }

conf/my-dev.js:
    exports.conf = {
        db_connection: 'localhost'
    }

conf/linode.beefed-up.server.com.js:
    exports.conf = {
        db_connection: 'nosql-super-clustered-cloud-database'
    }

where ci-hostname/my-dev/linode.beefed-up.server.com are corresponding
hostnames.

Node-config will load common configuration values and then override them with
appropriate values from host-specific config file.

## Example

Loading of configuration is as simple as this:

    // Presuming that node-config sits under ./external folder in the project
    require.paths.unshift('./external');

    var conf = require('node-config'),
        sys = require('sys');

    conf.initConfig(
        function(err) {
            if(err) {
                sys.log('Unable to init the config: ' + err); 
                return;
            }

            // Config loaded, can do those things now:

            console.log(conf.db_connection);
        }
    );

## Setup

You need to have a `conf` directory in your project root folder (where your
main .js file sits), and it has to contain`common.js` file with following
format:
    
    exports.conf = {
        name: 'value',
        // ...
        name_m: 'value M'
    };

If you wish to add host-specific config files, execute `hostname` from command
line to find out what your hostname is and name your file accordingly.

Please see `node-config/conf/*` and `node-config/test.js` for examples.

Thanks!
