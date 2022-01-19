import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../../account/account-service';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss'],
})
export class CheckoutAddressComponent implements OnInit {
  @Input() checkoutForm: FormGroup;

  currentUserAddress: any;
  edit = false;

  constructor(
    private accountService: AccountService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCurrentUserInfo();
  }

  loadCurrentUserInfo() {
    this.accountService.getUserAddress().subscribe((userInfo) => {
      this.currentUserAddress = userInfo;
    });
  }

  handleEdit() {
    this.edit = true;
  }

  handleCancel() {
    this.edit = false;
  }

  saveDefaultAddress() {
    this.accountService
      .updateUserAddress(this.checkoutForm.get('addressForm').value)
      .subscribe(
        () => {
          this.toaster.success('Address saved!');
          this.loadCurrentUserInfo();
        },
        (error) => {
          this.toaster.error('Failed saving the address');
        }
      );

    this.edit = false;
  }
}
