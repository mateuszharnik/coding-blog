import axios from 'axios';

export const getMessages = (skip = 0, limit = 6) => axios.get(`/messages?skip=${skip}&limit=${limit}`);

export const getMessage = (id) => axios.get(`/messages/${id}`);

export const createMessage = (data) => axios.post('/messages', data);

export const deleteMessages = () => axios.delete('/messages');

export const deleteMessage = (id) => axios.delete(`/messages/${id}`);
