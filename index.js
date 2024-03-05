import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHanlder } from './middleware/errorHanler.js';
import chatRoutes from './routes/chatRoutes.js';
import messageRoutes from './routes/messageRouter.js'
import { Server } from 'socket.io';
import { createServer } from 'http';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use(
    cors({ 
        origin: [
            'http://localhost:3000',
            'https://chattyverse.netlify.app'
        ],
        credentials: true 
    })
)

const PORT = process.env.PORT || 9000;

app.get('/api/health', async(req, res) => {
    res.status(200).send({
        data : null,
        message : "Backend server is running fine",
        success : true,
    });
});

const server = createServer(app);
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes)

app.use(notFound);
app.use(errorHanlder);
connectDb()
.then(()=>{
    console.log("Db connected")
})
.catch(error =>{
    console.log("Error in db connection");
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


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



