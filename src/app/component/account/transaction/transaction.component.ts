import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Transaction } from 'src/app/model/transaction';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  @Input() owner: Transaction[];
  @Input() receiver: Transaction[];
  @Output() confirmTran = new EventEmitter();
  @Output() cancelTran = new EventEmitter();
  constructor() { }
  
  ngOnInit() {
  }
  confirmTransaction(transactionId){
    this.confirmTran.emit(transactionId)
  }
  cancelTransaction(transactionId){
    this.cancelTran.emit(transactionId)
  }
}
