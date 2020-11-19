import axios from 'axios';

export const getAbout = () => axios.get('/about');

export const updateAbout = (id, data) => axios.put(`/about/${id}`, { data });
