import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
import userRoutes from './src/routes/authRoutes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import productRoutes from './src/routes/productRoutes';
import categoryRoutes from './src/routes/categoryRoutes';
import specificationRoutes from './src/routes/specificationRoutes';
import User from './src/models/User';
import supplierRoutes from './src/routes/supplierRoutes';

dotenv.config();

const app = express();

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:8080', 'https://oliviashop.ca'],
  credentials: true
};

app.use(cors(corsOptions));

app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(cookieParser());

app.use('/api', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/specifications', specificationRoutes);
app.use('/api/supplier', supplierRoutes);

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.log(err);
  });



const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:8080', 'https://oliviashop.ca'],
   // methods: ['GET', 'POST'],
    credentials: true
  }
});
// In-memory storage for user sockets (can be replaced with a more persistent storage)
const userSockets = new Map()
io.use((socket, next) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    socket.userId = userId; // Attach the user ID to the socket
    next();
  } else {
    console.log('User ID is missing or null');
    next(new Error('Authentication error: User ID is missing'));
  }
});

io.on('connection',(socket)=>{
 if(socket.userId) {
   userSockets.set(socket.id,socket.userId)
   console.log(userSockets);
   const clientSocket = userSockets.get(socket.idw);
   console.log('clientsocket' ,clientSocket);
 } 
})

/* app.post('/hello', (req, res) => {
  //console.log(req.body);
  res.send('Hello received');
}); */

app.post('/check-code', (req, res) => {
  const { id, code } = req.body;
  console.log('id and code are :',id ,code);
  res.send('m3alem')
  
  const clientSocket = userSockets.get(id);
  console.log('clientsocket' ,clientSocket);
  

  if (!true) {
    return res.status(404).send({ error: 'Client not found' });
  }

  if (true) {
    io.send('message', { status: 'success' });
    res.send({ status: 'Success' });
  } else {
    clientSocket.emit('result', { status: 'rejected' });
    res.send({ status: 'Rejected' });
  }
});


/* io.on('connection', (socket) => {
  if (socket.userId && socket.userId !== 'null') {
    console.log(`User connected: ${socket.userId}`);
    console.log('socket id',socket.id);
    console.log('usersockets :',userSockets);
    

    // Add the socket ID to the user's entry in the Map
    if (userSockets.has(socket.userId)) {
      userSockets.get(socket.userId).push(socket.id);
    } else {
      userSockets.set(socket.userId, [socket.id]);
    }

    // Log all connected users
    logConnectedUsers();

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.userId}`);
      // Remove the socket ID from the user's entry
      const sockets = userSockets.get(socket.userId);
      if (sockets) {
        const index = sockets.indexOf(socket.id);
        if (index !== -1) {
          sockets.splice(index, 1);
        }
        // If no more sockets remain for the user, remove the entry
        if (sockets.length === 0) {
          userSockets.delete(socket.userId);
        }
      }

      // Log all connected users after a disconnection
      logConnectedUsers();
    });

    // Example event handler for incoming messages
    socket.on('message', (message) => {
      console.log(`Received message from user ${socket.userId}:`, message);
    });
  } else {
    console.log('Connection attempt without valid user ID, ignoring...');
    socket.disconnect();
  }
});
 */
// Function to log all connected users
/* function logConnectedUsers() {
  const connectedUsers = Array.from(userSockets.keys()).filter(userId => userId && userId !== 'null');
  console.log('Connected users:', connectedUsers);
} */


/* // Store connected clients
const clients = new Map();

io.on('connection', (socket) => {
  console.log('Server1: Client connected with socket id :',socket.id);


  socket.on('register', (id) => {
    clients.set(id, socket);
    console.log(`Client with ID ${id} registered`);
  });

  socket.on('disconnect', () => {
    clients.forEach((clientSocket, id) => {
      if (clientSocket === socket) {
        clients.delete(id);
        console.log(`Client with ID ${id} disconnected`);
      }
    });
  });
});

app.post('/check-code', (req, res) => {
  const { id, code } = req.body;
  const clientSocket = clients.get(id);

  if (!clientSocket) {
    return res.status(404).send({ error: 'Client not found' });
  }

  if (code === '444') {
    clientSocket.emit('result', { status: 'success' });
    res.send({ status: 'Success' });
  } else {
    clientSocket.emit('result', { status: 'rejected' });
    res.send({ status: 'Rejected' });
  }
}); */

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
