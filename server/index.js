const express = require('express')
const app = express()
const cors = require('cors')
const client = require('./db/conn')
const authRouter = require('./routes/authRouter')
const { Server } = require("socket.io");
const { createServer } = require("http");
const { log } = require('console')

app.use(cors())
app.use(express.json())

require('dotenv').config()

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST","PUT","PATCH"]
    }
});

var mp = new Map()
io.on("connection", (socket) => {
    console.log("Someone just connected " + socket.id);

    socket.on("join_lobby", (lobby) => {
        if (mp.has(lobby)) {
            const opponentSocketId = mp.get(lobby)[0]
            console.log(opponentSocketId + " and " + socket.id + ' are playing!');
            mp.get(lobby).shift();
            if (!mp.get(lobby).length) mp.delete(lobby)
            io.to(socket.id).emit("userPaired", opponentSocketId)
            io.to(opponentSocketId).emit("userPaired", socket.id)
        }
        else {
            socket.join(lobby)
            console.log(socket.id + " just joined lobby " + lobby);
            mp.set(lobby, [socket.id]) // Later more than 1 player should be able to join the lobby, presently one is joining then removing with other player. Fix it
            io.to(socket.id).emit("wait", lobby)
        }

    })
    socket.on("disconnect", () => {
        console.log("Someone just disconnected " + socket.id);
    })
});


const port = process.env.PORT || 5000


app.get('/', (req, res) => { res.send("flame") })
app.use('/api/v1/auth', authRouter)

httpServer.listen(port);
