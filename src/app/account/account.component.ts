import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    // Read auth cookie to determine if the user is logged in or not.
    var authCookie = this.readCookie('_a');
    if (authCookie == null)
    {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/account' } });
    }
  }

  readCookie(name: string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }
}
