// src/services/websocket.js
import { io } from 'socket.io-client';
import { store } from '../store';
import { addNotification } from '../store/notificationsSlice';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect() {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.socket = io(import.meta.env.VITE_WS_URL || 'wss://api.changexacademy.ng', {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    this.socket.on('notification', (notification) => {
      store.dispatch(addNotification(notification));
    });

    this.socket.on('chat_message', (message) => {
      const handler = this.listeners.get('chat_message');
      if (handler) handler(message);
    });

    this.socket.on('typing', (data) => {
      const handler = this.listeners.get('typing');
      if (handler) handler(data);
    });

    this.socket.on('read_receipt', (data) => {
      const handler = this.listeners.get('read_receipt');
      if (handler) handler(data);
    });

    this.socket.on('xp_earned', (data) => {
      const handler = this.listeners.get('xp_earned');
      if (handler) handler(data);
    });

    this.socket.on('new_post', (post) => {
      const handler = this.listeners.get('new_post');
      if (handler) handler(post);
    });

    this.socket.on('new_comment', (comment) => {
      const handler = this.listeners.get('new_comment');
      if (handler) handler(comment);
    });

    this.socket.on('course_update', (update) => {
      const handler = this.listeners.get('course_update');
      if (handler) handler(update);
    });

    this.socket.on('live_stream_started', (data) => {
      const handler = this.listeners.get('live_stream_started');
      if (handler) handler(data);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  on(event, callback) {
    this.listeners.set(event, callback);
  }

  off(event) {
    this.listeners.delete(event);
  }

  emit(event, data) {
    if (this.socket && this.socket.connected) {
      this.socket.emit(event, data);
    }
  }

  // Chat methods
  sendMessage(recipientId, message, type = 'text') {
    this.emit('send_message', { recipientId, message, type });
  }

  markAsRead(chatId, messageId) {
    this.emit('mark_read', { chatId, messageId });
  }

  sendTyping(chatId, isTyping) {
    this.emit('typing', { chatId, isTyping });
  }

  joinChat(chatId) {
    this.emit('join_chat', { chatId });
  }

  leaveChat(chatId) {
    this.emit('leave_chat', { chatId });
  }

  // Group methods
  joinGroup(groupId) {
    this.emit('join_group', { groupId });
  }

  leaveGroup(groupId) {
    this.emit('leave_group', { groupId });
  }

  sendGroupMessage(groupId, message) {
    this.emit('group_message', { groupId, message });
  }
}

export const wsService = new WebSocketService();
