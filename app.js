/**
 * Created by quintotechnologiespvtltd on 23/01/18.
 */
let express = require('express');
let app = express();
let fs = require('fs');
let path = require('path');
let port;
let protocol;
port = process.env.PORT || 3000;
protocol = require('http').createServer(app);
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let socketio = require('socket.io');
//socket.io
const io = socketio.listen(protocol);
//db connection
let dbPath = "mongodb://localhost/Dalviroo";
mongoose.connect(dbPath);
mongoose.connection.once('open', function () {
    console.log("Database Connection Established Successfully.");
    const createNameSpaceForStore = require('./Libs/CreateNameSpace').createNameSpaceForStore;
    const StoreModel = require('./Models').StoreModel;
    StoreModel.getAllStores()
        .then(function (stores) {
            stores.forEach(function (store) {
                createNameSpaceForStore(io, store);
            })
        })
        .catch(function (err) {
            console.log("Error while createing namespace for store")
        })
});

//public folder as static
app.use(express.static(path.resolve(__dirname, './Public')));

//views folder and setting ejs engine
app.set('views', path.resolve(__dirname, './Views'));
app.set('view engine', 'ejs');

//parsing middlewares
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

//including controllers files.
fs.readdirSync("./ApiControllers").forEach(function (file) {
    if (file.indexOf(".js")) {
        let apiRoute = require("./ApiControllers/" + file);
        apiRoute.io = io;
        app.use('/api/v1', apiRoute);
    }
});
fs.readdirSync("./Routes").forEach(function (file) {
    if (file.indexOf(".js")) {
        let route = require("./Routes/" + file);
        app.use('/', route);
    }
});

protocol.listen(port, function () {
    console.log("Chat App started at port :" + port);
});

module.exports = io;



