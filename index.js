const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: false}))

messages = {
    'oskar':
}

io.on('connection', socket => {
        console.log('A new user connected');
})


const PORT = 3000;
http.listen(PORT, () => {
        console.log(`Server is now listening on port ${PORT}`);
});