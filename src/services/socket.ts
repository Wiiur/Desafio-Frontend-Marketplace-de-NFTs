// src/services/socket.ts
import { io } from 'socket.io-client';

export const socket = io('ws://localhost:9999', {
  transports: ['websocket'],
  autoConnect: false, // O App.tsx é que vai mandar ligar
});