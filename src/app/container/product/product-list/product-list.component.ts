import { Component, OnInit } from '@angular/core';
import { GiftService } from 'src/app/service/gift.service';
import { Gift, GiftResponse } from 'src/app/model/gift';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Pagination } from 'src/app/model/api-results';
import { ActivatedRoute, RouterEvent, RouterLinkActive } from '@angular/router';
import { AddressService } from 'src/app/service/address.service';
import { City, District } from 'src/app/model/address';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  gift$: Observable<GiftResponse[]>;
  cities$: Observable<City[]>;
  districts$: Observable<District[]>;
  pagination: Pagination;

  city: City = { id: 0, name: "Thành Phố" };
  district: District = { id: 0, name: "Quận huyện", cityName: "" };
  category = new Category(0, "");
  gift = new Gift(0, "", "", "", "");


  constructor(
    private giftService: GiftService,
    private route: ActivatedRoute,
    private addressService: AddressService) {
  }

  ngOnInit() {
    this.searchGift();
    this.getCities();
    this.city.id = 0;
  }


  searchGift() {
    this.gift$ = this.giftService.search().pipe(
      map(x => {
        return x.data;
      })
    );
  }
  getCities() {
    this.cities$ = this.addressService.getCities().pipe(
      map(x => {
        return x.data;
      })
    );
  }

  onCityChange(city) {
    if (city.id > 0) {
      this.districts$ = this.addressService.getDistricts(city.id).pipe(
        map(x => {
          return x.data
        })
      )
    }
    console.log(this.city + " - " + this.district)
  }
}
