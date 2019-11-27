import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {
  @Input() thumbnails: string[];
  @Input() state: string;
  showDetail: boolean;
  showHome: boolean;
  constructor() { }

  ngOnInit() {
    switch (this.state) {
      case "home":
        this.showHome = true;
        this.showDetail = false;
        break;
      case "detail":
        this.showHome = false;
        this.showDetail = true;
        break;
      default:
        break;
    }
  }


}
