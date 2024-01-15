import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BlogList, BlogPreview } from 'src/app/models/blog';
import { HttpService } from 'src/app/services/http.service';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  blogs!: BlogList;
  page: number = 0;
  limit: number = 10;
  processingFetch: boolean = false;
  title: string = '';
  platformId: Object;

  canReload!: boolean;
  constructor(
    private httpService: HttpService,
    private router: Router,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.platformId = platformId;
  }

  ngOnInit(): void {
    if (this.transferState.hasKey(makeStateKey('blogList'))) {
      this.blogs = this.transferState.get(
        makeStateKey('blogList'),
        new BlogList()
      );
    } else {
      this.fetchBlogs();
    }
  }

  fetchBlogs() {
    this.processingFetch = true;
    this.httpService.fetchBlogs(this.limit, this.page).subscribe({
      next: (value) => {
        if (isPlatformServer(this.platformId)) {
          this.transferState.set<BlogList>(makeStateKey('blogList'), value);
        }
        this.blogs = value;
        this.processingFetch = false;
      },
      error: (err: HttpErrorResponse) => {
        this.processingFetch = false;
        console.log(err.error);
      },
    });
  }

  onPageChange(event: any) {
    this.page = event.page;
    this.limit = event.rows;
    this.fetchBlogs();
  }

  gotoDetails(blodId: string) {
    this.router.navigate([`blog/${blodId}/details`]);
  }

  searchByTitile() {
    this.httpService
      .searchByTitle(this.title, this.limit, this.page)
      .subscribe({
        next: (value) => {
          this.blogs = value;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error.message);
        },
      });
  }
}
