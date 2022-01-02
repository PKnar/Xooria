import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
import { IType } from './../shared/models/productType';
import { IBrand } from './../shared/models/brands';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = "https://localhost:5001/api/";

  constructor(private http:HttpClient) { }

  getProducts(shopParams:ShopParams){
    //this allows you to append params to the endpoint
    //in much cleaner way
    let params = new HttpParams();
    let {brandId,typeId,sort,search} = shopParams;

    if(brandId){
      params = params.append("brandId",brandId.toString());
    }

    if(typeId){
      params = params.append("typeId",typeId.toString());
    }

    if(sort){
      params = params.append("sort",sort);
    }

    if(search){
      params = params.append("search",search);
    }

    params=params.append("sort",shopParams.sort);
    params=params.append("pageIndex",shopParams.pageNumber.toString());
    params=params.append("pageSize",shopParams.pageSize.toString());
    

    //when you request data using httpParams and options {observe:"response",params}
    //the request does not return a response body right away
    //in this case we can use rxjs methods to pipe() the body out of the response and return it
    return this.http.get<IPagination>(this.baseUrl+"products",{observe:"response",params})
    .pipe(map(response=> response.body) )
  }

  getProduct(id:number){
    return this.http.get<IProduct>(`${this.baseUrl}products/${id}`)
  }

  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl+"products/brands");
  }

  getTypes(){
    return this.http.get<IType[]>(this.baseUrl+"products/types");
  }
}
