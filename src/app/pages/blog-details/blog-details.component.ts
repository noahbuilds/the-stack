import { HttpErrorResponse } from '@angular/common/http';
import {
  APP_ID,
  Component,
  PLATFORM_ID,
  Inject,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Blog, BlogPreview, EditBlog } from 'src/app/models/blog';
import { HttpService } from 'src/app/services/http.service';
// import * as Editor from '../../../../ckeditor5-custom-build/build/ckeditor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { NotifierService } from 'angular-notifier';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent {
  blogDetails!: BlogPreview;
  blogId: string = '';
  processingFetch: boolean = false;
  processingDeleteItem: boolean = false;
  stripedText!: SafeHtml;
  isPlatformBrowser: boolean = false;
  currentUser!: User;

  constructor(
    private httpService: HttpService,
    private ar: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private sanitized: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string,
    private notifierService: NotifierService,
    private userService: UserService
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
    console.log(this.isPlatformBrowser);
  }

  ngOnInit(): void {
    this.blogId = this.ar.snapshot.params['id'];
    this.fetchBlogById();
  }

  fetchBlogById() {
    this.processingFetch = true;
    this.httpService.fetchBlogById(this.blogId).subscribe({
      next: (value) => {
        this.blogDetails = value;
        this.stripedText = this.sanitized.bypassSecurityTrustHtml(
          this.blogDetails.body
        ) as string;

        console.log(this.stripedText);

        this.processingFetch = false;
      },
      error: (err: HttpErrorResponse) => {
        this.processingFetch = false;
        this.notifierService.notify('error', err.error.message);
        console.log(err.error.message);
      },
    });
  }

  openModal(content: any, size?: string) {
    this.modalService.open(content, { size: size ? size : 'md' });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  userIsLoggedIn(): boolean {
    return this.userService.getCurrentUser() ? true : false;
  }

  deleteBlog(id: string) {
    this.processingDeleteItem = true;

    if (!this.userService.getCurrentUser()) {
      this.notifierService.notify('error', 'Please login to edit blog');
      this.processingDeleteItem = false;
      return;
    }
    this.httpService.deleteBlog(id).subscribe({
      next: (value) => {
        this.processingDeleteItem = false;
        this.notifierService.notify('success', 'blog deleted');
        this.modalService.dismissAll();
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        this.processingDeleteItem = false;
        this.notifierService.notify('error', err.error.message);
        console.log(err.error.message);
      },
    });
  }

  editBlog() {
    if (!this.userService.getCurrentUser()) {
      this.notifierService.notify('error', 'Please login to edit blog');
      return;
    }
    const update: EditBlog = new EditBlog();
    // this.stripedText =
    update.body = this.blogDetails.body;

    update.image = this.blogDetails.image;

    update.title = this.blogDetails.title;

    this.httpService.updateBlog(this.blogDetails._id, update).subscribe({
      next: (value) => {
        console.log(value);
        this.closeModal();
        this.notifierService.notify('success', 'Blog updated successfully');
        this.fetchBlogById();
      },
      error: (err: HttpErrorResponse) => {
        this.notifierService.notify('error', err.error.message);
        console.log(err.error);
      },
    });
  }
}
