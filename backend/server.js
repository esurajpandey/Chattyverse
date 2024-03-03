import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHanlder } from './middleware/errorHanler.js';
import chatRoutes from './routes/chatRoutes.js';
import messageRoutes from './routes/messageRouter.js'
import { Server } from 'socket.io';
import { createServer } from 'http';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const server = createServer(app);


app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes)


//------Deployment-----//
const __dirname = path.resolve();
var __dirname1 = path.resolve(__dirname, '..');
if (`${process.env.NODE_ENV}` === "production") {

    app.use(express.static(path.join(__dirname1, "/client/build")));

    app.get("*", (req, resp) => {
        resp.sendFile(path.resolve(__dirname1, "client", "build", "index.html"));
    });

} else {
    app.use('/', (res, resp) => {
        resp.send("Api is running");
    })
}



//---Deployemnet----//
const PORT = process.env.PORT || 5000;

app.use(notFound);
app.use(errorHanlder);
connectDb()
.then(()=>{
    console.log("Db connected")
})
.catch(error =>{
    console.log("Error in db connection");
})


server.listen(PORT, () => {
    console.log("Server is running at ", PORT)
})

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "*",
    }
})


io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    socket.on("setup", (userData) => {
        socket.join(userData._id);
        console.log("User joined=", userData._id);
        socket.emit('connected');
    });


    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User joined", room);
    })

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
        let chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        console.log("User disconnected");
        socket.leave(userData._id);
    })
})



