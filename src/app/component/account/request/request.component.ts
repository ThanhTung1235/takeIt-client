import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExchangeRequestResp } from 'src/app/model/exchange-request';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  @Input() owner: ExchangeRequestResp[];
  @Input() receiver: ExchangeRequestResp[];
  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  confirmRequest(Exid){
    this.confirm.emit(Exid);
  }
  cancelRequest(Exid){
    this.cancel.emit(Exid);
  }
}
