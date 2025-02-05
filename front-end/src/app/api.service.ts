import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://127.0.0.1:8000'

  httpHeaders = { headers : new HttpHeaders({'Content-Type': 'application/json'})}

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  registerNewUser(data): Observable<any> {
    const body = {username: data.username, email: data.email, password: data.password, isParent: data.isParent}
    const url = this.baseUrl + '/user/'

    return this.http.post(url, body, this.httpHeaders)
  }

  createNewFamily(data): Observable<any> {
    const body = {name: data.name}
    const url = this.baseUrl + '/family/'
    const httpHeadersWithToken = { headers : new HttpHeaders({'Content-Type': 'application/json',
                                   'Authorization':'Bearer '+ this.cookieService.get("accessToken")})}
    return this.http.post(url, body, httpHeadersWithToken)
  }

  connectToFamily(data): Observable<any> {
    const body = {}
    const url = this.baseUrl + '/family/' + data.family_id + '/user'

    const httpHeadersWithToken = { headers : new HttpHeaders({'Content-Type': 'application/json',
                                 'Authorization':'Bearer '+ this.cookieService.get("accessToken")})}
    return this.http.post(url, body, httpHeadersWithToken)
  }

  refreshToken(): Observable<any> {
    const body = { "refresh": this.cookieService.get("refreshToken")}
    const url = this.baseUrl + '/login/refresh'

    const httpHeadersWithToken = { headers : new HttpHeaders({'Content-Type': 'application/json'})}
    return this.http.post(url, body, httpHeadersWithToken)
  }

  refreshTokenSubs() : void {
    this.refreshToken().subscribe(
      data => {
        this.setCookie({"accessToken":data.access, "refreshToken":data.refresh})
      },
      error => {
        console.log(error)
      }
    )
  }

  setCookie(data) : void {
    this.cookieService.set("accessToken",data.accessToken)
    if(data.refreshToken){
      this.cookieService.set("refreshToken",data.refreshToken)
    }
  }
}
