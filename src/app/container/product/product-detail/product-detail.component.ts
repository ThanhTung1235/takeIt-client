import { Component, OnInit, OnDestroy } from '@angular/core';
import { GiftService } from '../../../service/gift.service';
import { Observable, Subscription } from 'rxjs';
import { GiftResponse, Gift } from '../../../model/gift';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ExchangeRequest, ExchangeRequestResp } from 'src/app/model/exchange-request';
import { Account } from 'src/app/model/account';
import { City, District } from 'src/app/model/address';
import { Category } from 'src/app/model/category';
import { ToastrService } from 'ngx-toastr';
import { noUndefined } from '@angular/compiler/src/util';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  gifts$: Observable<GiftResponse[]>;

  gift: GiftResponse;
  state: string;
  sub: Subscription;
  account = new Account(0, "", "", "");
  city: City;
  district: District;
  cate: Category;
  giftP = new Gift(0, "", "", "", 0, 0, "", this.city, this.district, this.account, this.cate);
  giftId: number;
  exchange = new ExchangeRequest("", this.giftP);
  exchangeResp: ExchangeRequestResp[];
  showRequest: boolean;
  cateName: string;

  constructor(
    private giftService: GiftService,
    private route: ActivatedRoute,
    private toastService: ToastrService) {
    this.state = "detail";
  }

  ngOnInit() {
    this.showRequest = true;
    this.giftId = +this.route.snapshot.paramMap.get('id');
    this.sub = this.giftService.getGift(this.giftId).subscribe(
      x => {
        this.gift = x.data;
        this.giftP.account.id = x.data.accountId;
        this.giftP.thumbnail = x.data.thumbnail[0];
        this.cateName = x.data.categoryName;
      }
    );
    this.getRequestOfGift(this.giftId);
    this.getGiftRelatedTo();
  }

  getRequestOfGift(giftId) {
    this.sub = this.giftService.getRequestOfGift(giftId).subscribe((x) => {
      this.exchangeResp = x.data;

      if (x.status === 200) {
        this.showRequest = false;
      } else {
        this.showRequest = true;
      }

    })
  }

  submitExchange(message) {
    let token = window.localStorage.getItem("_apikey");
    if (token != null || token != undefined) {
      this.exchange.message = message;
      this.giftP.id = this.giftId;

      this.giftService.sendExchageRequest(this.exchange).subscribe(
        (x) => {
          if (x.status == 201) {
            this.toastService.success('Quan tâm món đồ thành công bạn hãy chờ chủ nhân xác nhận nhé', '', {
              timeOut: 5000,
              positionClass: 'toast-top-full-width'
            })
          } else {
            this.toastService.error('Lỗi hệ thống', '', {
              timeOut: 5000
            })
          }
          if (x.status == 500 && x.message != " ") {
            this.toastService.error(x.message, '', {
              timeOut: 5000
            })
          }
          if (x.status == 401) {
            this.toastService.error('Bạn cần đăng nhập để sử dụng tính năng này', '', {
              timeOut: 5000
            })
          }
          if (x.status == 500) {
            this.toastService.error('Lỗi hệ thống', '', {
              timeOut: 5000,
              positionClass: 'toast-top-right'
            })
          }
        }
      );
    }else{
      this.toastService.error('Bạn hãy đăng nhập để sử dụng tính năng này', '', {
        timeOut: 5000
      })
    }
  }
  getGiftRelatedTo() {
    this.gifts$ = this.giftService.search("", "", "", "", this.cateName).pipe(map(x => {
      return x.data;
    }));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
