import { Component, OnInit } from '@angular/core';
import { GiftService } from 'src/app/service/gift.service';
import { Gift, GiftResponse } from 'src/app/model/gift';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Pagination } from 'src/app/model/api-results';
import { ActivatedRoute, RouterEvent, RouterLinkActive, Router } from '@angular/router';
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
    private activeRoute: ActivatedRoute,
    private router: Router,
    private addressService: AddressService) {
  }

  ngOnInit() {
    this.searchGift();
    this.getCities();
    this.city.id = 0;
  }
  refreshSearch() {
    this.router.navigate(['/products'])
  }

  searchGift() {
    this.activeRoute.queryParams.subscribe(
      x => {
        let city = x['city'];
        let district = x['district'];
        let gender = x['gender'];
        let age = x['age'];
        let cate = x['cate'];
        // console.log(city + " - " + district + " - gender: " + gender + " - age:" + age);
        this.gift$ = this.giftService.search(city, district, gender, age, cate).pipe(
          map(x => {
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
    this.router.navigate(['/products'], { queryParams: { city: city.name }, queryParamsHandling: "merge" })
    if (city.id > 0) {
      this.districts$ = this.addressService.getDistricts(city.id).pipe(
        map(x => { return x.data })
      )
    }

  }

  onDistrictChange(district) {
    this.router.navigate(['/products'], { queryParams: { district: district.name }, queryParamsHandling: "merge" })
  }
}
