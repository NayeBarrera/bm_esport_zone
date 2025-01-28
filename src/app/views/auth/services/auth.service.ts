import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RutasBackend } from 'src/app/infraestructure/helpers/RutasBackend';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AxiosService } from 'src/app/infraestructure/helpers/AxiosInstance';
import { UsuarioResponse, AuthCredentials } from 'src/app/models/entities/Entidades';
import { ResponseBackend } from 'src/app/models/entities/Response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly currentUsuarioSubject: BehaviorSubject<UsuarioResponse | null>;
  public currentUsuario: Observable<UsuarioResponse | null>;

  constructor(
    private router: Router,
    private axiosService: AxiosService,
    private alertController: AlertController
  ) {
    const storedUserString = localStorage.getItem('currentUser');
    const storedUser = storedUserString ? JSON.parse(storedUserString) : null;
    this.currentUsuarioSubject = new BehaviorSubject<UsuarioResponse | null>(storedUser);
    this.currentUsuario = this.currentUsuarioSubject.asObservable();
  }

  public get currentUsuarioValue(): UsuarioResponse | null {
    return this.currentUsuarioSubject.value;
  }

  login(userName: string, password: string): Observable<ResponseBackend<UsuarioResponse>> {
    const data: AuthCredentials = {
      username: userName,
      password: password,
    };

    const noAuthInstance = this.axiosService.getNoAuthInstance();

    return from(
      noAuthInstance.post<ResponseBackend<UsuarioResponse>>(
        RutasBackend.usuarios.Authenticate,
        data
      )
    ).pipe(
      map((response) => {
        const userData = response.data.data;
        if (userData) {
          localStorage.removeItem('currentUser');
          localStorage.setItem('currentUser', JSON.stringify(userData));
          this.currentUsuarioSubject.next(userData);
        }
        return response.data;
      }),
      catchError((error) => {
        const errorMessage = error.response?.data?.message || 'Error inesperado';
        return throwError(() => ({
          data: null,
          isSuccess: false,
          statusCode: error.response?.status || 500,
          message: errorMessage
        }));
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUsuarioSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    const user = this.currentUsuarioValue;
    return user ? user.token as string : null;
  }

  hasRole(role: string): boolean {
    const user = this.currentUsuarioValue;
    if (user?.token) {
      try {
        const decodedToken = decodeToken(user.token as string);
        const roles = decodedToken.role;
        return Array.isArray(roles) ? roles.includes(role) : roles === role;
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return false;
  }
}

function decodeToken(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}
