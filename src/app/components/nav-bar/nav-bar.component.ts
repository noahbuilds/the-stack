import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { Blog, Login, NewBlog } from 'src/app/models/blog';
import { User } from 'src/app/models/user';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  newBlog: NewBlog = new NewBlog();
  newAccount: User = new User();
  newLogin: Login = new Login();
  currentUser!: User;

  constructor(
    private http: HttpService,
    private modalService: NgbModal,
    private router: Router,
    private userService: UserService,
    private notifierService: NotifierService
  ) {}
  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  openModal(content: any, size?: string) {
    this.newBlog = new NewBlog();
    this.newAccount = new User();
    this.newLogin = new Login();
    this.modalService.open(content, { size: size ? size : 'md' });
  }
  gotoNewBlogPage() {
    this.router.navigate(['blog/new']);
  }

  createAccount() {
    this.http.createAccount(this.newAccount).subscribe({
      next: (value) => {
        this.userService.setCurrentUser(value);
        this.currentUser = this.userService.getCurrentUser();
        this.notifierService.notify('success', ' account created successfully');
        this.closeModal();
      },
      error: (err: HttpErrorResponse) => {
        this.notifierService.notify('error', err.error.message);
        console.log(err.error.message);
      },
    });
  }

  doLogin() {
    this.http.doLogin(this.newLogin).subscribe({
      next: (value) => {
        this.userService.setCurrentUser(value);
        this.currentUser = this.userService.getCurrentUser();
        this.notifierService.notify(
          'success',
          `Welcome Back ${this.currentUser.firstname}`
        );

        this.closeModal();
        console.log(value);
      },
      error: (err: HttpErrorResponse) => {
        this.notifierService.notify('error', err.error.message);
        console.log(err.error.message);
      },
    });
  }
}
