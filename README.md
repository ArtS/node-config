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