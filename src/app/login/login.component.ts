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
      .subscribe((result: any) => {
        console.log(result);
        if (result.hasOwnProperty("access_token")) {
          if (this.returnUrl != "") {
            this.router.navigate([this.returnUrl]);
          }
          else
          {
            this.router.navigate(['/']);
          }
        }
        else if (result.hasOwnProperty("error")) {
          this.result = result.error_description;
        }
        else
        {
          this.result = "Unknown login result.";
        }
      })
  }
}