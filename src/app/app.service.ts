import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) {
  }

  getposts(){
   return this.http.get("https://jsonplaceholder.typicode.com/posts")
 }

}
