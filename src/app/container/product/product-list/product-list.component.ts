import { Component, OnInit } from '@angular/core';
import { GiftService } from 'src/app/service/gift.service';
import { Gift, GiftResponse } from 'src/app/model/gift';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pagination } from 'src/app/model/api-results';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  gift$: Observable<GiftResponse[]>;
  pagination: Pagination;

  constructor(
    private giftService: GiftService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      let cate = params['cate'];
      let city = params['city'];
      console.log("this test params" + cate + city);
    })
  }

  ngOnInit() {
    this.getGifts();
  }


  getGifts() {
    this.gift$ = this.giftService.getGifts().pipe(
      map(x => {
        return x.data;
      })
    );
  }
}
