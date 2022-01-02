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
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  basket$: Observable<IBasket>;
  currentUser$: Observable<IUser>;
  logoColor = 'black';
  bgColor = '';
  displayState = 'block';

  @HostListener('window:scroll', []) onWindowScroll() {
    this.bgColor = document.scrollingElement.scrollTop > 55 ? 'white' : '';
  }

  constructor(
    private basketService: BasketService,
    private accountService: AccountService,
    private router: Router
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.logoColor = event.url === '/' ? 'white' : 'black';
        this.displayState =
          event.url === '/account/login' || event.url === '/account/register'
            ? 'none'
            : 'block';
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
