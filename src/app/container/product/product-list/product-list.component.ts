import {Component, OnInit} from '@angular/core';
import {GiftService} from 'src/app/service/gift.service';
import {Gift, GiftResponse} from 'src/app/model/gift';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Pagination} from 'src/app/model/api-results';
import {ActivatedRoute, RouterEvent, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  gift$: Observable<GiftResponse[]>;
  pagination: Pagination;

  constructor(private giftService: GiftService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      const id = queryParams.get('cateId');
      if (id == null) {
        this.getGifts();
      } else {
        this.getGiftByCateId(queryParams.get('cateId'));
      }
    });
  }


  getGifts() {
    this.gift$ = this.giftService.getGifts().pipe(
      map(x => {
        return x.data;
      })
    );
  }

  getGiftByCateId(cateId) {
    this.gift$ = this.giftService.getGiftsByCateId(cateId).pipe(map(
      x => {
        return x.data;
      }
    ));
  }
}
