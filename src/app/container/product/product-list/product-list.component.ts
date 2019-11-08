import { Component, OnInit } from '@angular/core';
import { GiftService } from 'src/app/service/gift.service';
import { Gift, GiftResponse } from 'src/app/model/gift';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pagination } from 'src/app/model/api-results';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  gift$: Observable<any>;
  pagination: Pagination;
  constructor(private giftService: GiftService) { }

  ngOnInit() {
    this.getGifts();
  }


  getGifts() {
    this.gift$ = this.giftService.getGifts().pipe(
      map(x => {
        return x;
      })
    )
  }
}
