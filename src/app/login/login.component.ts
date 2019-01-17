import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../blog.service';
import { LoginError } from '../models/login-error';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  result: string;
  returnUrl: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private blogService: BlogService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'];
    });
  }

  login(emailAddress: string, password: string): void {
    this.blogService.login(emailAddress, password)
      .subscribe(result => {
          sessionStorage.setItem("shmooToken", result.access_token);
          if (this.returnUrl != "") {
            this.router.navigate([this.returnUrl]);
          }
          else {
            this.router.navigate(['/']);
          }
        },
        (error: any) => {
          if (this.isLoginError(error))
          {
            this.result = error.error_description;
          }
          else
          {
            this.result = "Invalid user login.";
          }
        }
      )
  }

  // https://stackoverflow.com/questions/43894565/cast-object-to-interface-in-typescript
  //private isLoginResult(obj: any): obj is LoginResult {
  //  return obj && typeof obj.access_token === "string";
  //}

  private isLoginError(obj: any): obj is LoginError {
    return obj && typeof obj.error_description === "string";
  }
}
