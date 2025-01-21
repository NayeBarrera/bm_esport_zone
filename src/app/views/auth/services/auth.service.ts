import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, from, map } from 'rxjs';
import axiosInstance from 'src/app/infraestructure/helpers/AxiosInstance';
import { LocalStorageItems } from './LocalStorageItems';
import { AuthCredentials, ResponseAuth, UpdateUserDTO, Usuario } from 'src/app/models/entities/Entidades';
import { ResponseBackend } from 'src/app/models/entities/Response';
import { RutasBackend } from 'src/app/infraestructure/helpers/RutasBackend';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly currentUsuarioSubject: BehaviorSubject<Usuario | null>;
  public currentUsuario: Observable<Usuario | null>;

  constructor(private router: Router) {
    let storedUser: Usuario | null = null;
    try {
      const storedUserString = localStorage.getItem(LocalStorageItems.currentUser);
      if (storedUserString) {
        storedUser = JSON.parse(storedUserString);
      }
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      localStorage.removeItem(LocalStorageItems.currentUser);
    }

    this.currentUsuarioSubject = new BehaviorSubject<Usuario | null>(storedUser);
    this.currentUsuario = this.currentUsuarioSubject.asObservable();
  }

  public get currentUsuarioValue(): Usuario | null {
    return this.currentUsuarioSubject.value;
  }

  async updateUser(dto:UpdateUserDTO){

    return axiosInstance.post<ResponseBackend<ResponseAuth>>(RutasBackend.usuarios.updateUser,dto)

  }

  login(username: string, password: string): Observable<ResponseBackend<Usuario>> {
    const data: AuthCredentials = {
      username: username,
      password: password,
    };
    return from(
      axios.post<ResponseBackend<Usuario>>(`${environment.baseUrl}${RutasBackend.usuarios.Authenticate}`, data)
      
    ).pipe(
      map((response) => {
        if (response.data.data) {
          localStorage.setItem(LocalStorageItems.currentUser, JSON.stringify(response.data.data));
          this.currentUsuarioSubject.next(response.data.data);
        }
        return response.data;
      })
    );
  }

  logout() {
    localStorage.removeItem(LocalStorageItems.currentUser);
    this.currentUsuarioSubject.next(null);
    this.router.navigate(['/login']); // Redirigir a la página de login
  }
}