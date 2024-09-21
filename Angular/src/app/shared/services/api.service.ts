import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  feedBasePath = environment.feedPath;
  userBasePath = environment.userPath;
  basepostpath = environment.basepostpath;

  constructor(private http: HttpClient, private router: Router) { }

getUser(){
  try {
    return this.http.get(`${this.userBasePath}/getAll`)
    
  } catch (error) {
    throw new Error()
  }
}

getPost(){
  try {
    return this.http.get(this.feedBasePath)
    
  } catch (error) {
    throw new Error()
  }
}


login(userName: string, password: string) {
  return this.http.get<any>(`${this.userBasePath}/getSingle`, {
    params: {
      userName: userName,
      password: password
    }
  });
}

register(signUpUserName: string, signUpPassword: string) {
  return this.http.post<any>(`${this.userBasePath}/add`, {
    userName: signUpUserName,
    password: signUpPassword
  });
}


getFeed(): Observable<any> {
  const data = {
    userID: localStorage.getItem('UserID')
  }
  return this.http.post<any>(`${this.basepostpath}/postbyUserId`, data);
}


addPost(title: string, description: string): Observable<any> {
  const data = {
    userId: localStorage.getItem("UserID"),
    title: title,
    description: description,
    createdOn: new Date()
  }
  return this.http.post<any>(`${this.basepostpath}/add`, data);
}

updatePost(title: string, description: string, postId: number): Observable<any> {
  const data = {
    postId: postId,
    userId: localStorage.getItem("UserID"),
    title: title,
    description: description
  }
  return this.http.put<any>(`${this.basepostpath}/update`, data);
}

deletePost(postId: Number): Observable<any> {
  return this.http.delete<any>(`${this.basepostpath}/delete`, {
    params: { postId: postId.toString() }
  });
}

isLoggedIn(): boolean {
  return !!localStorage.getItem('UserID');
}

}