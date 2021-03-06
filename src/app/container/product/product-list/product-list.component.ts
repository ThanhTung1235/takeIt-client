import { Component, OnInit } from '@angular/core';
import { GiftService } from 'src/app/service/gift.service';
import { Gift, GiftResponse } from 'src/app/model/gift';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Pagination, ApiResult } from 'src/app/model/api-results';
import { ActivatedRoute, RouterEvent, RouterLinkActive, Router } from '@angular/router';
import { AddressService } from 'src/app/service/address.service';
import { City, District } from 'src/app/model/address';
import { Category } from 'src/app/model/category';
import { Account } from 'src/app/model/account';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExchangeFormComponent } from 'src/app/component/gift/exchange-form/exchange-form.component';
import { ExchangeRequest } from 'src/app/model/exchange-request';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  apiResult$: Observable<ApiResult<GiftResponse[]>>;
  gift$: Observable<GiftResponse[]>;
  cities$: Observable<City[]>;
  districts$: Observable<District[]>;
  pagination: Pagination;
  city = new City(0, "");
  district = new District(0, "", "");
  account = new Account(0, "", "", "");
  category = new Category(0, "");
  gift = new Gift(0, "", "", "", 0, 0, "", this.city, this.district, this.account, this.category);
  exchange = new ExchangeRequest("", this.gift);
  sub: Subscription;
  



  constructor(
    private giftService: GiftService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private addressService: AddressService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.searchGift();
    this.getCities();
    this.city.id = 0;
    this.sub = this.activatedRoute.queryParams.subscribe(
      x => {
        const keyword = x.keyword;
        const city = x.keyword;
        const district = x.keyword;
        const gender = x.keyword;
        const age = x.keyword;
        const cate = x.keyword;
        this.gift$ = this.giftService.search(city, district, gender, age, cate,'','',keyword).pipe(
          map(x => {
            this.pagination = x.pagination;
            return x.data;
          })
        );
      }
    );
  }
  refreshSearch() {
    this.router.navigate(['/products']);
  }

  searchGift() {
    this.activeRoute.queryParams.subscribe(
      x => {
        const city = x.city;
        const district = x.district;
        const gender = x.gender;
        const age = x.age;
        const cate = x.cate;
        const keyword = x.keyword;
        console.log("list:" +keyword);
        // console.log(city + " - " + district + " - gender: " + gender + " - age:" + age);
        this.gift$ = this.giftService.search(city, district, gender, age, cate,'','',keyword).pipe(
          map(x => {
            this.pagination = x.pagination;
            return x.data;
          })
        );
      }
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
    this.router.navigate(['/products'], { queryParams: { city: city.name }, queryParamsHandling: 'merge' });
    if (city.id > 0) {
      this.districts$ = this.addressService.getDistricts(city.id).pipe(
        map(x => x.data)
      );
    }
  }
  onDistrictChange(district) {
    this.router.navigate(['/products'], { queryParams: { district: district.name }, queryParamsHandling: 'merge' });
  }
  pageChange(event) {
    console.log(event);
    let pageIndex = event;
    this.activeRoute.queryParams.subscribe(
      x => {
        const city = x.city;
        const district = x.district;
        const gender = x.gender;
        const age = x.age;
        const cate = x.cate;
        // console.log(city + " - " + district + " - gender: " + gender + " - age:" + age);
        this.gift$ = this.giftService.search(city, district, gender, age, cate, pageIndex,'','').pipe(
          map(x => {
            this.pagination = x.pagination;
            return x.data;
          })
        );
      }
    );
  }
}
