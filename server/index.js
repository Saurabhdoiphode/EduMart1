const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
require('dotenv').config();
const connectDB = require('./config/database');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
  }
});

// Make socket.io instance available to route handlers
app.set('io', io);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  // Handle message sent - send delivery confirmation
  socket.on('send-message', (data) => {
    const { chatId, messageId, receiverId, sender, message, timestamp, status } = data;
    
    // Emit to receiver that message is delivered
    io.to(receiverId).emit('receive-message', {
      chatId,
      messageId,
      sender,
      message,
      timestamp,
      status: 'delivered' // Message delivered to recipient
    });

    // Send delivery confirmation back to sender
    io.to(sender).emit('message-delivered', {
      messageId,
      chatId,
      status: 'delivered',
      timestamp: Date.now()
    });
  });

  // Handle message read notification
  socket.on('mark-message-read', (data) => {
    const { chatId, messageId, senderId } = data;
    
    // Notify sender that message was read
    io.to(senderId).emit('message-read', {
      messageId,
      chatId,
      status: 'read',
      timestamp: Date.now()
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400 // 24 hours
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static files from React build (if exists)
const buildPath = path.join(__dirname, '../client/build');
app.use(express.static(buildPath));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.get('/', (req, res) => {
  res.json({ message: '🚀 EduMart Backend is running!', status: 'OK' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Mount API route handlers
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/wishlist', require('./routes/wishlist'));
app.use('/api/complaints', require('./routes/complaints'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/ratings', require('./routes/ratings'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/seller', require('./routes/seller'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Serve React app for all other routes (SPA - Single Page Application)
// SPA catch-all removed for now to avoid path-to-regexp issues.

server.listen(PORT, () => {
  console.log(`🎯 Server running on port ${PORT}`);
});


