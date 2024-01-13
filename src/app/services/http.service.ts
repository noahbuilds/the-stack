import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogPreview } from '../models/blog';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  fetchBlogs(): Observable<BlogPreview[]> {
    return this.http.get<BlogPreview[]>(`${environment.baseUrl}/post`);
  }

  fetchBlogById(id: string) {}

  createBlog() {}

  updateBlog() {}

  deleteBlog(id: string) {}

  addComment() {}
}
