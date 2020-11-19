import axios from 'axios';

export const getAuthors = (skip = 0, limit = 6) => axios.get(`/authors?skip=${skip}&limit=${limit}`);

export const getAuthor = (id) => axios.get(`/authors/${id}`);

export const createAuthor = (data) => axios.post('/authors', { data });

export const updateAuthor = (id, data) => axios.put(`/authors/${id}`, { data });

export const deleteAuthors = () => axios.delete('/authors');

export const deleteAuthor = (id) => axios.delete(`/authors/${id}`);
