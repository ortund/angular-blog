import { Component, OnInit, Input } from '@angular/core';

import { BlogService } from '../blog.service';
import { CookieService} from 'ngx-cookie-service';

import { ServiceError } from '../models/service-error';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginResult } from '../models/login-result';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  result: string;
  returnUrl: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private blogService: BlogService, private cookieService: CookieService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'];
    });
  }

  login(emailAddress: string, password: string) : void {
    this.blogService.login(emailAddress, password)
    .subscribe(result => {
      this.setAuthData(result);

      if (this.returnUrl != "") {
        this.router.navigate([this.returnUrl]);
      }
      else {
        this.router.navigate(['/']);
      }
    },
    (error: any) => {
      if (this.isServiceError(error))
      {
        this.result = error.error_description;
      }
      else
      {
        this.result = "Invalid user login.";
      }
    })
  }

  setAuthData(data: LoginResult) : void
  {
    sessionStorage.setItem("shmooToken", data.access_token);
    sessionStorage.setItem("fuzzyBear", data.token_type);
    sessionStorage.setItem("whoDis", data.userName);

    this.cookieService.set("_un", data.userName); // read with this.cookieService.get("_un");
  }

  // https://stackoverflow.com/questions/43894565/cast-object-to-interface-in-typescript
  //private isLoginResult(obj: any): obj is LoginResult {
  //  return obj && typeof obj.access_token === "string";
  //}

  private isServiceError(obj: any) : obj is ServiceError {
    return obj && typeof obj.error_description === "string";
  }
}
