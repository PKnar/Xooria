import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() totalCount:number;
  @Input() pageSize:number;
  //child component outputs props through @Output() method
  @Output() pageChanged=new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
  }

  onPageChangedChildComp(event){
    //pageChange = onPagedChange parent function
    //emit() is called onPageChange function and passes the value
     this.pageChanged.emit(event.page)
  }

}
