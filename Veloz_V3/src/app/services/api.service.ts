import { Injectable } from '@angular/core';
import { HttpHeaders } from '@capacitor/core';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) }

  apiURL = 'https://my-json-server.typicode.com/victorrosendo/repoUsuariosRamos';
  autosURL = 'https://my-json-server.typicode.com/victorrosendo/repoListadoAutos';

  constructor(private http: HttpClient) { }
}
