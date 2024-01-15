import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';

import { NewBlog } from 'src/app/models/blog';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css'],
})
export class NewBlogComponent {
  newBlog: NewBlog = new NewBlog();
  constructor(
    private http: HttpService,
    private modalService: NgbModal,
    private router: Router,
    private userService: UserService,
    private notifierService: NotifierService
  ) {}

  createBlog() {
    this.newBlog.author = this.userService.getCurrentUser()._id;
    this.http.createBlog(this.newBlog).subscribe({
      next: (value) => {
        this.notifierService.notify('success', 'Blog created successfully');
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        this.notifierService.notify('error', err.error.message);
        console.log(err.error.message);
      },
    });
  }
}
