import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://apiprosoft1.onrender.com/';

  constructor(private http: HttpClient) { }
  async verificarUser(email: string, password: string): Promise<any> {
    const data = { email, password };
    this.apiUrl='https://apiprosoft1.onrender.com/api/login/';
    try {
      const response = await firstValueFrom(this.http.post(this.apiUrl, data));
      console.log('Respuesta del servidor:', response);
      
      return response;
    } catch (error) {
      console.error('Error en la verificación:', error);
      throw error;
    }
  }

   registerMember(name: string, email: string, password:string, id_company:string): Observable<any> {
    const data = {full_name: name, email:email,password:password, id_company:id_company};
    this.apiUrl= 'https://apiprosoft1.onrender.com/user/register/';
    console.log(data);
    return this.http.post(this.apiUrl, data);
  }
  
  registerUser(name: string, email: string, password:string): Observable<any>{
    const data = {full_name: name, email:email,password:password};
    this.apiUrl= 'https://apiprosoft1.onrender.com/user/register/';
    
    return this.http.post(this.apiUrl, data);

  }

  registerProject(name: string, description: string, idUser: string): Observable<any>{
    const data = {name: name, description:description,admin:idUser};
    this.apiUrl= 'https://apiprosoft1.onrender.com/projects/';
    return this.http.post(this.apiUrl, data);

  }
  deleteProject(projectId: string) {
    this.apiUrl='https://apiprosoft1.onrender.com/projects/'+projectId+'/';
    return this.http.delete(this.apiUrl);
  }
  getProjectforAdmin(userId: string) {
    this.apiUrl= 'https://apiprosoft1.onrender.com/projects/?user_id='+userId;
    return this.http.get(this.apiUrl);
  }
  

  activateUser(userId: string,token:string){
    this.apiUrl= 'http://apiprosoft1.onrender.com/user/activate/';
    const data = {uid: userId,code:token};
    return this.http.post(this.apiUrl, data);
  }


  
}
