import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {GiftResponse} from '../../model/gift';
import {Pagination} from '../../model/api-results';
import {GiftService} from '../../service/gift.service';
import {map} from 'rxjs/operators';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  giftsShirt$: Observable<GiftResponse[]>;
  giftsTrousers$: Observable<GiftResponse[]>;
  pagination: Pagination;
  category$: Observable<Category[]>;
  constructor(private giftService: GiftService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getGiftsShirt();
    this.getGiftsTrousers();
    this.category$ = this.categoryService.getAll().pipe(map(x => x.data));
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
