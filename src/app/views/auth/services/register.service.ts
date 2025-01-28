import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { AxiosService } from 'src/app/infraestructure/helpers/AxiosInstance';
import { RutasBackend } from 'src/app/infraestructure/helpers/RutasBackend';
import { Persona, SetPersonasCommand, SetUsuarioCommand, Usuario } from 'src/app/models/entities/Entidades';
import { ResponseBackend } from 'src/app/models/entities/Response';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor (
    private readonly axiosInstance: AxiosService
  )
  {}

  setPersona(newPersona: SetPersonasCommand){
    return from (this.axiosInstance.getJsonInstance().post<ResponseBackend<Persona>>(RutasBackend.Persona.setpersona,newPersona))
  }

  setUsuario(newUsuario:SetUsuarioCommand){
    return from (this.axiosInstance.getJsonInstance().post<ResponseBackend<Usuario>>(RutasBackend.Usuario.setUsuario,newUsuario))
  }

}
