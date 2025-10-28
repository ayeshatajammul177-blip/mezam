import { Component, signal } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  protected readonly title = signal('mezam-frontend');

    showLayout = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const noLayoutRoutes = ['/login', '/signup','/admin-dashboard', '/admin/applications'];
      this.showLayout = !noLayoutRoutes.includes(event.urlAfterRedirects);
    });
  }


}
