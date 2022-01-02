import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss'],
})
export class SectionHeaderComponent implements OnInit {
  displayState = 'block';
  //observable props needs to be distiguished with $ sign
  breadcrumb$: Observable<any[]>;

  constructor(private breadcrumService: BreadcrumbService, router: Router) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        let isAuthenticating =
          event.url === '/account/login' || event.url === '/account/register';

        this.displayState = isAuthenticating ? 'none' : 'block';
      });
  }

  ngOnInit(): void {
    this.breadcrumb$ = this.breadcrumService.breadcrumbs$;
  }
}
