import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from './../account-service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('passValidList') passValidList: ElementRef;
  returnUrl: string;
  registerForm: FormGroup;
  errors: Array<string>;
  validation = {
    uppercase: false,
    lowercase: false,
    number: false,
    character: false,
    strength: 0,
  };

  constructor(
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.returnUrl =
    //   this.activatedRoute.snapshot.queryParams.returnUrl || '/shop';
    this.createRegisterForm();
  }

  handlePassChange(event) {
    let value = event.target.value;
    this.validation.strength = value.length;

    if (value.match(/[A-Z]/)) {
      this.validation.uppercase = true;
    } else {
      this.validation.uppercase = false;
    }
    if (value.match(/[a-z]/)) {
      this.validation.lowercase = true;
    } else {
      this.validation.lowercase = false;
    }
    if (value.match(/[0-9]/)) {
      this.validation.number = true;
    } else {
      this.validation.number = false;
    }
    if (value.match(/[!&$?{}\/\/]/)) {
      this.validation.character = true;
    } else {
      this.validation.character = false;
    }
  }

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe(
      () => {
        const { redirect } = window.history.state;
        this.router.navigateByUrl(redirect || '/shop');
      },
      (error) => {
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
