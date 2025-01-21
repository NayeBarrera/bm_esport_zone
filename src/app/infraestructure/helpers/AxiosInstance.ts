import axios from 'axios';
import { environment } from 'src/environments/environment';
import { LocalStorageItems } from '../../views/auth/services/LocalStorageItems';
import { ResponseAuth } from 'src/app/models/entities/Entidades';

const axiosInstance = axios.create({
  baseURL: environment.baseUrl, 
});


axiosInstance.interceptors.request.use(
  (config) => {
    const usuario:ResponseAuth = JSON.parse(localStorage.getItem(LocalStorageItems.currentUser)!);
    if (usuario.token) {
      config.headers['Authorization'] = `Bearer ${usuario.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;