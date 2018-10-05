var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const bodyparser = require('body-parser');
const port = 3000;


io.on('connection', function (socket) {
    console.log('a user connected');
});

app.use((req, res, next) => {
    req.io = io
    next()
})

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); //pour résoudre prb des méthodes 
    next();
});

app.use(bodyparser.json());

const auth = require('./server/routes/auth');
app.use('/auth', auth);

const blog = require('./server/routes/blog');
app.use('/blog', blog);




http.listen(port, err => {
    console.log(`connect with port ${port}`)
})