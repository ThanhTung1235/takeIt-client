import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GiftResponse } from '../../model/gift';
import { Pagination } from '../../model/api-results';
import { GiftService } from '../../service/gift.service';
import { map } from 'rxjs/operators';
import { Category } from '../../model/category';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  giftsShirt$: Observable<GiftResponse[]>;
  giftsTrousers$: Observable<GiftResponse[]>;
  gifts$: Observable<GiftResponse[]>;
  pagination: Pagination;
  category$: Observable<Category[]>;
  state: string;
  constructor(private giftService: GiftService,
    private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.state = "home"
    this.getGiftsShirt();
    this.getGiftsTrousers();
    this.category$ = this.categoryService.getAll().pipe(map(x => x.data));
    this.getGifts();
  }

  getGifts() {
    this.gifts$ = this.giftService.search('', '', '', '', '', '', '', '').pipe(
      map(x => {
        return x.data;
      })
    );
  }

  getGiftsShirt() {
    this.giftsShirt$ = this.giftService.search('', '', '', '', 'Áo', '', '', '').pipe(
      map(x => {
        return x.data;
      })
    );
  }

  getGiftsTrousers() {
    this.giftsTrousers$ = this.giftService.search('', '', '', '', 'Quần', '', '', '').pipe(
      map(x => {
        return x.data;
      })
    );
  }

}
