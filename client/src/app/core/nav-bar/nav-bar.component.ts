import { AccountService } from './../../account/account-service';
import { IUser } from './../../shared/models/user';
import { IBasket } from '../../shared/models/basket';
import { Observable } from 'rxjs';
import { BasketService } from '../../basket/basket.service';

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
  Host,
  HostListener,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  @ViewChildren('links') links: QueryList<ElementRef>;
  basket$: Observable<IBasket>;
  currentUser$: Observable<IUser>;
  logoColor = 'black';
  bgColor = '';
  displayState = 'block';
  currentRoute: string;

  @HostListener('window:scroll', []) onWindowScroll() {
    if (document.scrollingElement.scrollTop > 100) {
      this.bgColor = 'white';
      this.logoColor = 'black';
    } else {
      this.bgColor = '';
      this.logoColor = this.currentRoute === '/' ? 'white' : 'black';
    }

    this.changeBorderColor();
  }

  constructor(
    private basketService: BasketService,
    private accountService: AccountService,
    private router: Router
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
        this.logoColor =
          event.url === '/' && this.bgColor !== 'white' ? 'white' : 'black';
        this.displayState =
          event.url === '/account/login' || event.url === '/account/register'
            ? 'none'
            : 'block';
        this.changeBorderColor();
      });
  }

  changeBorderColor() {
    this.links.forEach((link) => {
      link.nativeElement.style.borderColor =
        this.currentRoute === '/' && this.logoColor === 'white'
          ? 'white'
          : 'black';
    });
  }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.currentUser$ = this.accountService.currentUser$;
  }

  logout() {
    this.accountService.logout();
  }
}
