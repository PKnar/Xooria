import { ShopParams } from '../shared/models/shopParams';
import { IType } from './../shared/models/productType';
import { IBrand } from './../shared/models/brands';
import { IProduct } from '../shared/models/product';

import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm: ElementRef;
  @ViewChildren('brandListItem') brandListItems: QueryList<ElementRef>;
  @ViewChildren('typeListItem') typeListItems: QueryList<ElementRef>;

  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
    {
      name: 'Alphabetical',
      value: 'name',
    },
    {
      name: 'Price:Low to High',
      value: 'priceAsc',
    },
    {
      name: 'Price: High to Low',
      value: 'priceDesc',
    },
  ];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  handleFilterSelection(target, filterOption) {
    let items =
      filterOption === 'brands' ? this.brandListItems : this.typeListItems;

    items.forEach((item) => {
      item.nativeElement.classList.remove('bgColor');
    });

    target.classList.add('bgColor');
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(
      (response) => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getBrands() {
    this.shopService.getBrands().subscribe(
      (response) => {
        this.brands = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTypes() {
    this.shopService.getTypes().subscribe(
      (response) => {
        this.types = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onBrandSelected(brandId: number, target?) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    target && this.handleFilterSelection(target, 'brands');
    this.getProducts();
  }

  onTypeSelected(typeId: number, target?) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    target && this.handleFilterSelection(target, 'types');

    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onPageChanged(pageNum) {
    //this prevents from sending multiple request
    //while filtering
    //it makes sure getProduct() is called
    //in this function only when the page is changed
    if (this.shopParams.pageNumber !== pageNum) {
      this.shopParams.pageNumber = pageNum;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams = new ShopParams();
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.getProducts();
  }

  onSearchInput(value: string) {
    if (!value) {
      this.onSearchReset();
    }
  }

  onSearchReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
