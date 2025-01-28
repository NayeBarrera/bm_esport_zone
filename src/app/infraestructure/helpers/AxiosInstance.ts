import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  private readonly jsonInstance: AxiosInstance;
  private readonly multipartInstance: AxiosInstance;
  private readonly noAuthInstance: AxiosInstance;

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {
    // Your existing instance creation logic
    this.jsonInstance = axios.create({
      baseURL: environment.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.multipartInstance = axios.create({
      baseURL: environment.baseUrl,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    this.noAuthInstance = axios.create({
      baseURL: environment.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.addRequestInterceptor(this.jsonInstance);
    this.addRequestInterceptor(this.multipartInstance);
    this.addErrorInterceptor(this.jsonInstance);
    this.addErrorInterceptor(this.multipartInstance);
    this.addErrorInterceptor(this.noAuthInstance);
  }

  private addRequestInterceptor(instance: AxiosInstance) {
    instance.interceptors.request.use(
      (config) => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
          const user = JSON.parse(currentUser);
          if (user?.token) {
            config.headers['Authorization'] = `Bearer ${user.token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(new Error(`Error: ${error}`))
    );
  }

  private addErrorInterceptor(instance: AxiosInstance) {
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          const alert = await this.alertController.create({
            header: 'Sesión Expirada',
            message: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
            buttons: [{
              text: 'Aceptar',
              handler: () => {
                localStorage.removeItem('currentUser');
                this.router.navigate(['/login']);
              }
            }]
          });
          await alert.present();
        }
        return Promise.reject(error);
      }
    );
  }

  getJsonInstance(): AxiosInstance {
    return this.jsonInstance;
  }

  getMultipartInstance(): AxiosInstance {
    return this.multipartInstance;
  }

  getNoAuthInstance(): AxiosInstance {
    return this.noAuthInstance;
  }
}
