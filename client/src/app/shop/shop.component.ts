import { ShopParams } from '../shared/models/shopParams';
import { IType } from './../shared/models/productType';
import { IBrand } from './../shared/models/brands';
import { IProduct } from '../shared/models/product';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild("search") searchTerm:ElementRef;
  products:IProduct[];
  brands:IBrand[];
  types:IType[];
  shopParams = new ShopParams();
  totalCount:number;
  sortOptions=[{
    name:"Alphabetical",value:"name"
  },
  {
    name:"Price:Low to High",value:"priceAsc"
  },
  {
    name:"Price: High to Low",value:"priceDesc"
  },
]

 
  constructor(private shopService:ShopService){}

  ngOnInit(): void {
   this.getProducts();
   this.getBrands();
   this.getTypes();
 
 
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe(response=>{
      this.products = response.data;
      this.shopParams.pageNumber= response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    },error=>{
      console.log(error)
    });
  }

  getBrands(){
    this.shopService.getBrands().subscribe(response=>{
      this.brands = [{id:0,name:"All"},...response];
    },error=>{
      console.log(error)
    });
  }

  getTypes(){
    this.shopService.getTypes().subscribe(response=>{
      this.types = [{id:0,name:"All"},...response];
    },error=>{
      console.log(error)
    });
  }

  onBrandSelected(brandId:number){
   this.shopParams.brandId = brandId;
   this.shopParams.pageNumber=1;
   this.getProducts();
  }

  onTypeSelected(typeId:number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber=1;
    this.getProducts();
   }

   onSortSelected(sort:string){
    this.shopParams.sort=sort;
    this.shopParams.pageNumber=1;
    this.getProducts();
   }

   onPageChanged(pageNum){

    //this prevents from sending multiple request
    //while filtering 
    //it makes sure getProduct() is called
    //in this function only when the page is changed
     if(this.shopParams.pageNumber !==pageNum){
      this.shopParams.pageNumber= pageNum;
      this.getProducts();
     }
   
   }

   onSearch(){
     this.shopParams.search=this.searchTerm.nativeElement.value;
     this.getProducts();
   }
   onSearchReset(){
    this.searchTerm.nativeElement.value="";
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}
