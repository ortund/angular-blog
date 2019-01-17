import { Component } from '@angular/core';
import { ServiceError } from './models/service-error';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Blog';

  private isServiceError(obj: any) : obj is ServiceError {
    return obj && typeof obj.error_description === "string";
  }
}