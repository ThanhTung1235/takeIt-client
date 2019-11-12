import { Component, OnInit, NgZone, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  ngOnInit(): void {
  }
  @Input()
  responses: Array<any>;


  constructor() { }

}


