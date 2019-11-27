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
    // @ts-ignore
    this.giftsShirt$ = this.giftService.search('', '', '', '', 'áo').pipe(
      map(x => {
        // @ts-ignore
        return x.data;
      })
    );
  }

  getGiftsTrousers() {
    // @ts-ignore
    this.giftsTrousers$ = this.giftService.search('', '', '', '', 'quần').pipe(
      map(x => {
        // @ts-ignore
        return x.data;
      })
    );
  }

}
