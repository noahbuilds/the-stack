import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Blog,
  BlogList,
  BlogPreview,
  EditBlog,
  Login,
  NewBlog,
} from '../models/blog';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  fetchBlogs(limit: number, page: number): Observable<BlogList> {
    return this.http.get<BlogList>(
      `${environment.baseUrl}/blog?limit=${limit}&page=${page}`
    );
  }

  fetchBlogById(id: string): Observable<BlogPreview> {
    return this.http.get<BlogPreview>(`${environment.baseUrl}/blog/${id}`);
  }

  createBlog(payload: NewBlog): Observable<BlogPreview> {
    return this.http.post<BlogPreview>(`${environment.baseUrl}/blog`, payload);
  }

  updateBlog(id: string, payload: EditBlog): Observable<any> {
    return this.http.put(`${environment.baseUrl}/blog/${id}`, payload);
  }

  deleteBlog(id: string): Observable<string> {
    return this.http.delete<string>(`${environment.baseUrl}/blog/${id}`);
  }

  addComment() {}

  searchByTitle(
    title: string,
    limit: number,
    page: number
  ): Observable<BlogList> {
    return this.http.get<BlogList>(
      `${environment.baseUrl}/blog?page=${page}&limit=${limit}&title=${title}`
    );
  }
  createAccount(payload: User): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/user`, payload);
  }

  doLogin(payload: Login): Observable<any> {
    return this.http.post(`${environment.baseUrl}/user/login`, payload);
  }
}
