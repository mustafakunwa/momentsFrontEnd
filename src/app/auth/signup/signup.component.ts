import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '../../shared/snacbar.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  hide: boolean = true;

  constructor(private fb: FormBuilder,
    private ApiService:ApiService,
    private snacbarService:SnackbarService,
    private router: Router) { }

  ngOnInit() {
    this.createform();
  }

  createform() {
    this.form = this.fb.group({
      firstName: [null, [Validators.required, Validators.maxLength(50)]],
      lastName: [null, [Validators.required, Validators.maxLength(50)]],
      mobile: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      city: [null, [Validators.required, Validators.maxLength(50)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(7)]]
    })
  }
  signin() {
    this.router.navigateByUrl('/signin');
  }

  submit() {
    const controls = this.form.controls;
    if (this.form.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    const values = this.form.value;

    this.ApiService.singup(values).subscribe(
      res=>{
        this.snacbarService.openSnackBar('success','Your account has been created')
        this.signin();
      }
    )
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.form.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }


}
