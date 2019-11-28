import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isLogin: boolean;
  constructor() { }

  ngOnInit() {
  }
  logout() {
    localStorage.removeItem('_apikey');
    this.isLogin = false;
  }
}
