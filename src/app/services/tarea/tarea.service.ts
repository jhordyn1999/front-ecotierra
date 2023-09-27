import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TareaService {
  API: string = environment.app.api;
  constructor(private clienteHttp: HttpClient) { }
  ObtenerResponsable(): Observable<any> {
    return this.clienteHttp.get(this.API + "responsible");
}
  ObtenerTarea(): Observable<any> {
    return this.clienteHttp.get(this.API + "taskChildAll");

}
Insertar(data:{},modalidad: string): Observable<any> {
if (modalidad === "subTarea") {
  return this.clienteHttp.post(this.API + "sub-tasks",data);

}else{
  return this.clienteHttp.post(this.API + "tasks",data);

}

}
Modificar(data:{},id:number,modalidad:string): Observable<any> {
  if (modalidad == "subTarea") {
    return this.clienteHttp.put(this.API + "sub-tasks/"+id,data);
  
  }else{
    return this.clienteHttp.put(this.API + "tasks/"+id,data);
  
  }
}
Eliminar(id:number,modalidad:string): Observable<any> {
  if (modalidad == "subTarea") {
    return this.clienteHttp.delete(this.API + "sub-tasks/"+id);
  
  }else{
    return this.clienteHttp.delete(this.API + "tasks/"+id);
  
  }
}

ObtenerSubTarea(id:number): Observable<any> {
  return this.clienteHttp.get(this.API + "sub-tasks/"+id);

}
}