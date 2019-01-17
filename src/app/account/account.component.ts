import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/bloguser';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  constructor(private router: Router, private blogService: BlogService, private cookieService: CookieService) { }

  user: User;

  ngOnInit() {
    // Read auth cookie to determine if the user is logged in or not.
    var authToken = sessionStorage.getItem("shmooToken");
    if (authToken == null)
    {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/account' } });
    }

    this.loadProfile();
  }

  loadProfile(): void {
    // get the user based on the username
    var username = sessionStorage.getItem("whoDis");
    this.blogService.getUser(username)
    .subscribe(result => {
      this.user = result;
    },
    (error: any) => {
      // Most likely the session expired, route back to login.
      // This probably shouldn't ever happen though.
      console.log(error);
    })
  }
}
