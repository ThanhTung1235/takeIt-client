import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../service/category.service';
import {Observable} from 'rxjs';
import {GiftResponse} from '../../../model/gift';
import {Pagination} from '../../../model/api-results';
import {Category} from '../../../model/category';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  category$: Observable<Category[]>;
  pagination: Pagination;
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll();
  }
  getAll(){
    this.category$ = this.categoryService.getAll().pipe(
      map(x => x.data)
    )
  }
}
