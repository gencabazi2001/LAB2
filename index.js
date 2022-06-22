
const   config = require("config-yml");
const   server = require('./server');

server.listen(config.port);
console.log('Server started at port ' + config.port);

server.on('error', err => {
    console.error(err);
});