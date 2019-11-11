import { Component, OnInit, Input } from '@angular/core';
import { Gift } from 'src/app/model/gift';

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.css']
})
export class GiftCardComponent implements OnInit {
  @Input() gifts: Gift[];
  constructor() { }

  ngOnInit() {
  }
}
