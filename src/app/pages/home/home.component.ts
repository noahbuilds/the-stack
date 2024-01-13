import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { BlogPreview } from 'src/app/models/blog';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  blogs!: BlogPreview[];
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.fetchBlogs().subscribe({
      next: (value) => {
        this.blogs = value;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      },
    });
  }
}
