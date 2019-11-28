import {Component, OnInit, OnDestroy} from '@angular/core';
import {CategoryService} from '../../../service/category.service';
import {Observable, Subscription} from 'rxjs';
import {GiftResponse} from '../../../model/gift';
import {Pagination} from '../../../model/api-results';
import {Category} from '../../../model/category';
import {filter, map} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {withIdentifier} from 'codelyzer/util/astQuery';
import {GiftService} from '../../../service/gift.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  category$: Observable<Category[]>;
  pagination: Pagination;
  showLoginForm: boolean;
  showRegisterForm: boolean;
  isLogin: boolean;
  sub: Subscription;
  keyword: string;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private giftService: GiftService
  ) {
  }

  ngOnInit() {
    const apiKey = localStorage.getItem('_apikey');
    if (apiKey != null) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }

    this.sub = this.activatedRoute.queryParams.subscribe(
      x => {
        const params = x.action;
        if (params === 'login') {
          this.showLoginForm = true;
          this.showRegisterForm = false;
        }
      }
    );
    this.categoryService.getAll();
    this.detectUrl();
  }

  detectUrl() {
    let currentUrl = '';
    let lastPath = '';
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(
      (e: NavigationEnd) => {
        currentUrl = e.url;
        lastPath = currentUrl.substring(currentUrl.lastIndexOf('=') + 1);
        if (lastPath === 'login') {
          this.showLoginForm = true;
          this.showRegisterForm = false;
        }
        if (lastPath === 'register') {
          this.showLoginForm = false;
          this.showRegisterForm = true;
        }
        if (lastPath === 'logout') {

        }
      }
    );
  }

  getAll() {
    this.category$ = this.categoryService.getAll().pipe(
      map(x => x.data)
    );
  }

  logout() {
    localStorage.removeItem('_apikey');
    this.isLogin = false;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSearchChage(event) {
    console.log(event.target.value);
    this.keyword = event.target.value;
  }
  search(event){
    this.router.navigate(['/products'], {queryParams: {keyword: this.keyword}});
  }
}
