import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { AxiosService } from 'src/app/infraestructure/helpers/AxiosInstance';
import { RutasBackend } from 'src/app/infraestructure/helpers/RutasBackend';
import { Persona, SetPersonasCommand,  } from 'src/app/models/entities/Entidades';
import { ResponseBackend } from 'src/app/models/entities/Response';


@Injectable({
  providedIn: 'root'
})
export class personasService {
  constructor (
    private readonly axiosInstance: AxiosService
  )
  {}

  getPersona(){
    return from (this.axiosInstance.getJsonInstance().get<ResponseBackend<Persona[]>>(RutasBackend.Persona.getpersona))
  }

  setPersona(newPersona: SetPersonasCommand){
    return from (this.axiosInstance.getJsonInstance().post<ResponseBackend<Persona>>(RutasBackend.Persona.setpersona,newPersona))
  }

  getusuariobyidPersona(idPersonas?: Partial<Persona>) {
    const params = new URLSearchParams();
    if (idPersonas?.idPersonas) {
      params.append("IdPersonas", idPersonas.idPersonas.toString());
    }
    return from(this.axiosInstance.getJsonInstance().get<ResponseBackend<Persona>>(RutasBackend.Persona.getpersona, { params }));
  }


}
