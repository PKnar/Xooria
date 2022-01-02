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
  constructor(
    private accountService: AccountService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {}

  saveDefaultAddress() {
    this.accountService
      .updateUserAddress(this.checkoutForm.get('addressForm').value)
      .subscribe(
        () => {
          this.toaster.success('Address saved!');
        },
        (error) => {
          this.toaster.error('Failed saving the address');
          console.log(error);
        }
      );
  }
}
