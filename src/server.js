let express = require('express');
let bodyParser = require('body-parser');
// let socketio = require('socket.io');
// let http = require("http");

const app = express();
const httpServer = require("http").Server(app);
global.io = require("socket.io")(httpServer,   { cors: {
  origin: "http://localhost:4200",
  credentials: true
}
});

const db = require('./config/connectDB')
const socketService = require('./services/socketService')
const sensexRoutes = require('./routes/sensex');
const { seedSensexData } = require('./services/sensexService')
const port = process.env.PORT || 5000; // set port
// create our router
const router = express.Router();

global.io.listen(httpServer)
app.set('socketio', global.io);
app.set('server', httpServer);


// cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    '*'
  );
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

io.on('connection', (socket) => {
  console.log('[Socket Connected]', socket.id)
    io.to(socket.id).emit("socketId", socket.id);
   
    socket.on("userid", (userid) => {
      console.log('[socket event] userId ', userid)
      socketService.addActiveUser(userid, socket.id);
    });   

    socket.on("disconnect", () => {
        console.log("Socket with id:" + socket.id + " got disconnected");
        socketService.removeActiveUser(socket.id);
    });
})

// app.set('socketio', io);
// app.set('server', server);


// ROUTES FOR OUR API
// =============================================================================



// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

// REGISTER OUR ROUTES -------------------------------
app.use('/api/v1/sensex', sensexRoutes);

// Seeed Sensex Data
seedSensexData()


// START THE SERVERs
// =============================================================================
httpServer.listen(port, () => {
  console.log('server listening at port: ' + port)
});