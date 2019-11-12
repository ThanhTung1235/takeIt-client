import {Component, OnInit} from '@angular/core';
import {GiftService} from '../../../service/gift.service';
import {Observable} from 'rxjs';
import {GiftResponse} from '../../../model/gift';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  gift: GiftResponse;

  constructor(
    private giftService: GiftService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.giftService.getGift(id).subscribe(
      x => this.gift = x.data
    );
  }

}
