import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class TaskAddService {

  baseUrl = 'http://192.168.1.24:8000'

  httpHeaders = new HttpHeaders({'Content-Type': 'application/json',
  'Authorization':'Bearer '+ this.tokenService.getAccess()})

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  createTask(task,category): Observable<any> {
    const body = {category: category,name_task: task.name_task, info_task: task.info_task, point_task: task.point_task, id_family: 1};
    return this.http.post(this.baseUrl + "/task/create/" ,body, {headers: this.httpHeaders})
  }
}