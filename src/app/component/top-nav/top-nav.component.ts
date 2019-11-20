import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Gender, GiftResponse} from '../../model/gift';
import {Pagination} from '../../model/api-results';
import {GiftService} from '../../service/gift.service';
import {CategoryService} from '../../service/category.service';
import {map} from 'rxjs/operators';
import {Category} from '../../model/category';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  giftsShirt$: Observable<GiftResponse[]>;
  giftsTrousers$: Observable<GiftResponse[]>;
  category$: Observable<Category[]>;
  pagination: Pagination;
  showNav = false;
  constructor(private giftService: GiftService,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.getGiftsShirt();
    this.getGiftsTrousers();
    this.category$ = this.categoryService.getAll().pipe(map(x => x.data));
  }
  showSideBar() {
    if (this.showNav) {
      this.showNav = false;
    } else {
      this.showNav = true;
    }
  }
  getGiftsShirt() {
    this.giftsShirt$ = this.giftService.getGiftsByCateId(1).pipe(
      map(x => {
        return x.data;
      })
    );
  }

  getGiftsTrousers() {
    this.giftsTrousers$ = this.giftService.getGiftsByCateId(2).pipe(
      map(x => {
        return x.data;
      })
    );
  }
}
