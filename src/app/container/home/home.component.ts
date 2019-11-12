import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {GiftResponse} from '../../model/gift';
import {Pagination} from '../../model/api-results';
import {GiftService} from '../../service/gift.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  gift$: Observable<GiftResponse[]>;
  pagination: Pagination;

  constructor(private giftService: GiftService) {
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
