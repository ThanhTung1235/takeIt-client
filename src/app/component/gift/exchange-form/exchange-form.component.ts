import { Component, OnInit, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Gift, GiftResponse } from 'src/app/model/gift';
import { GiftService } from 'src/app/service/gift.service';
import { ToastrService } from 'ngx-toastr';
import { ExchangeRequest } from 'src/app/model/exchange-request';
import { Subscription } from 'rxjs';
import { ifError } from 'assert';

@Component({
  selector: 'exchange-form',
  templateUrl: './exchange-form.component.html',
  styleUrls: ['./exchange-form.component.css']
})
export class ExchangeFormComponent implements OnInit, OnDestroy {
  showError: boolean;
  sub: Subscription;
  message: string;
  @Output() submitExchange = new EventEmitter();
  constructor(
    private giftService: GiftService,
    private toastService: ToastrService) { }

  ngOnInit() {
    this.showError = false;
  }
  onAddressChange(event) {
    this.message = event;
  }
  submit() {
    if (this.message === null || this.message === "" || this.message === undefined) {
      this.showError = true;
      return;
    }
    else {
      this.showError = false;
      this.submitExchange.emit(this.message);
    }
  }
  ngOnDestroy() {
  }

}
