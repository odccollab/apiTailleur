import { Server } from 'socket.io';
import MessageModel from '../models/MessageModel.js';
import UserModel from '../models/User.js';

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    }
  });

  io.use((socket, next) => {
    const userId = socket.handshake.auth.userId;
    if (!userId) {
      return next(new Error('Authentication error'));
    }
    socket.userId = userId;
    next();
  });

  io.on('connection', (socket) => {
    console.log('a user connected', socket.userId);

    // Gestion de la réception d'un message privé
    socket.on('private_message', async ({ receiverId, content }) => {
      const message = new MessageModel({
        sender: socket.userId,
        receiver: receiverId,
        content,
      });
      await message.save();

      // Envoi du message au destinataire
      socket.to(receiverId).emit('private_message', message);
    });

    // Gestion de l'envoi d'un message de superadmin à tous les utilisateurs
    socket.on('broadcast_message', async ({ content }) => {
      const user = await UserModel.findById(socket.userId);
      if (user.userType !== 'superAdmin') {
        return;
      }

      const message = new MessageModel({
        sender: socket.userId,
        receiver: null, // null pour indiquer un message de diffusion
        content,
      });
      await message.save();

      // Envoi du message à tous les utilisateurs connectés
      io.emit('broadcast_message', message);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected', socket.userId);
    });
  });

  return io;
};

export default setupSocket;
