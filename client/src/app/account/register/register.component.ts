import { Router } from '@angular/router';
import { AccountService } from './../account-service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AsyncValidatorFn,
} from '@angular/forms';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: Array<string>;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe(
      (res) => {
        console.log(res);
        this.router.navigateByUrl('/shop');
      },
      (error) => {
        console.log(error);
        this.errors = error.errors;
      }
    );
  }

  createRegisterForm() {
    this.registerForm = new FormGroup({
      username: new FormControl(null, Validators.required),

      email: new FormControl(
        null,
        [
          Validators.required,
          Validators.pattern(
            '^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$'
          ),
        ],
        this.validateUniqueEmail()
      ),
      password: new FormControl(null, Validators.required),
    });
  }

  validateUniqueEmail(): AsyncValidatorFn {
    return (control) => {
      /* adds delay to the request so it does not
      do unnecessary API calls while user types */
      return timer(400).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }

          return this.accountService.checkEmaileExists(control.value).pipe(
            map((response) => {
              return response ? { emailExists: true } : null;
            })
          );
        })
      );
    };
  }
}
