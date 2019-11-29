import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { Subscription, Observable } from 'rxjs';
import { Account, AccountInfo } from 'src/app/model/account';
import { Transaction } from 'src/app/model/transaction';
import { TransactionService } from 'src/app/service/transaction.service';
import { map } from 'rxjs/operators';
import { Pagination } from 'src/app/model/api-results';
import { GiftService } from 'src/app/service/gift.service';
import { ExchangeRequestResp } from 'src/app/model/exchange-request';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  transactionsOwner$: Observable<Transaction[]>;
  transactionsReceiver$: Observable<Transaction[]>;
  paginationTrOwner: Pagination;
  paginationTrReceiver: Pagination;

  exchangesReceiver$: Observable<ExchangeRequestResp[]>;
  exchangesOwner$: Observable<ExchangeRequestResp[]>;
  paginationExOwner: Pagination;
  paginationExReceiver: Pagination;

  sub: Subscription;
  account: Account;
  accountInfo: AccountInfo;

  exchangeResp: ExchangeRequestResp[];
  loader: boolean;

  constructor(
    private accountSerivce: AccountService,
    private giftService: GiftService,
    private transactionService: TransactionService
  ) {
    this.loader = false;
    this.getAccount();
    this.getAccountInfo();
    this.getTrasactionOwner();
    this.getTrasactionReceiver();

    this.getExchangesOwner();
    this.getExchangesReceiver();
  }

  ngOnInit() {

  }

  confirm(event) {
    let isConfirm = confirm("Bạn có đồng ý cho");
    let status = true;
    this.giftService.confirmExchange(event, status).subscribe(x => {
      if (x.status == 200) {
        alert("xác nhận thành công")
      } else {
        alert("lỗi hệ thống")
      }
      if (x != null) {
        setInterval(function(){ 
          window.location.reload();
         }, 3000);
      }
    });
  }
  cancel(event) {
    let status = false;
    this.giftService.confirmExchange(event, status).subscribe(x => {
      if (x.status == 200) {
        alert("Không chấp nhận trao đổi")
      } else {
        alert("lỗi hệ thống")
      }
      if (x != null) {
        setInterval(function(){ 
          window.location.reload();
         }, 3000);
      }
    });
  }


  confirmTran(transactionId) {
    let status = true;
    this.transactionService.confirmTransaction(transactionId, status).subscribe(
      x => {
        if (x.status == 200) {
          alert("Giao dịch hoành thành")
        } else {
          alert("lỗi hệ thống")
        }
        if (x != null) {
          setInterval(function(){ 
            window.location.reload();
           }, 3000);
        }
      })
  }
  cancelTran(transactionId) {
    let status = false;
    this.transactionService.confirmTransaction(transactionId, status).subscribe(
      x => {
        if (x.status == 200) {
          alert("Giao dịch không hoành thành")
        } else {
          alert("lỗi hệ thống")
        }
        if (x != null) {
          setInterval(function(){ 
            window.location.reload();
           }, 3000);
        }
      })
  }
  getExchangesOwner() {
    this.exchangesOwner$ = this.giftService.getRequestOfOwner().pipe(
      map(x => {
        this.paginationExOwner = x.pagination;
        return x.data;
      })
    )
  }

  getExchangesReceiver() {
    this.exchangesReceiver$ = this.giftService.getRequestOfReceiver().pipe(
      map(x => {
        this.paginationExReceiver = x.pagination;
        return x.data;
      })
    )
  }

  getTrasactionOwner() {
    this.transactionsOwner$ = this.transactionService.getTransactionOwner().pipe(
      map(x => {
        this.paginationTrOwner = x.pagination;
        return x.data;
      })
    )
  }

  getTrasactionReceiver() {
    this.transactionsReceiver$ = this.transactionService.getTransactionReceiver().pipe(
      map(x => {
        this.paginationTrReceiver = x.pagination;
        return x.data;
      })
    )
  }

  getAccount() {
    this.sub = this.accountSerivce.getDetail().subscribe(x => this.account = x.data);
  }
  getAccountInfo() {
    this.sub = this.accountSerivce.getInfo().subscribe(x => this.accountInfo = x.data);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
