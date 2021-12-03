import { Server, Socket } from 'socket.io';
import { Container } from 'typedi';
import chatRoutes from '../api/ws-routes/chat';

export default (io: Server): void => {
  Container.set('socketIO', io);
  const initPassport = Container.get('initPassport');
  const initPassportSession = Container.get('initPassportSession');
  const sessionMiddleware = Container.get('sessionMiddleware');
  const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

  const chatNamespace = io.of('/chat');
  chatNamespace.use(wrap(sessionMiddleware));
  chatNamespace.use(wrap(initPassport));
  chatNamespace.use(wrap(initPassportSession));
  Container.set('chatNamespace', chatNamespace);
  chatNamespace.on('connection', chatRoutes);
};
