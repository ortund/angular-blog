import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../blog.service';
import { LoginResult } from '../login-result';
import { LoginError } from '../login-error';
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
      .subscribe((result: LoginResult | LoginError) => {
        if (this.isLoginResult(result)) {
          if (this.returnUrl != "") {
            this.router.navigate([this.returnUrl]);
          }
          else
          {
            this.router.navigate(['/']);
          }
        }
        else if (this.isLoginError(result)) {
          this.result = result.error_description;
        }
        else
        {
          this.result = "Unknown login result.";
        }
      })
  }

  // https://stackoverflow.com/questions/43894565/cast-object-to-interface-in-typescript
  private isLoginResult(obj: any): obj is LoginResult {
    return obj && typeof obj.access_token === "string";
  }

  private isLoginError(obj: any): obj is LoginError {
    return obj && typeof obj.error_description === "string";
  }
}
