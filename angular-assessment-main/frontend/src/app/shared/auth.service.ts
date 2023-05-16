import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {Authdata} from "../login.model"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authtoken:any;
  headers: HttpHeaders | undefined;
  bookmarkurl='http://localhost:3000/api/videos/bookmarks'

  constructor(private http:HttpClient,private router:Router){

  }

  createUser(username:string,password:string,name:string){
      const authData:Authdata={username:username,password:password,name:name}
      this.http.post("http://localhost:3000/signup",authData).subscribe(response=>{
        console.log(response);
      });

  }

  login(username:string,password:string){
    const authData:Authdata={username:username,password:password};
    this.http.post("http://localhost:3000/login",authData).subscribe((response:any)=>{
     
      this.authtoken=response["token"];
      console.log(this.authtoken);
      

   
      localStorage.setItem('username',JSON.stringify(username));
      if(response){
        this.router.navigate(['video'])
      }
    })

  }

  // postingBookmarkData(videoId:string,timestamp:any,bearertoken:string){
  //   const url = `${this.bookmarkurl}/${videoId}`;
  //   const headers={
  //     'Authorization': `Bearer ${this.authtoken}`,
  //     'Content-Type': 'application/json',
  //   };
  //   return this.http.post(url, bookmarkdata,{headers});
  // }
  postVideoWithTimestamp(videoId: string, timestamp: any, bearerToken: string) {
    const apiUrl = `${this.bookmarkurl}/${videoId}`;
    const requestBody = {
      videoId: videoId,
      timestamp: timestamp
    };
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`
    });
    return this.http.post(apiUrl, requestBody, { headers: headers })

}

getVideoWithTimestamp(videoId:any,bearerToken:string){
  const apiUrl = `${this.bookmarkurl}/${videoId}`;
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearerToken}`
  });
  return this.http.get(apiUrl,{headers:headers})

}

}


