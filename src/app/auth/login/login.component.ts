import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hide: boolean = true;

  constructor(private fb: FormBuilder,
    private router: Router,
    private _authservice: AuthService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.createform();
  }

  createform() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  signUp() {
    this.router.navigateByUrl('/signup')
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

    this.apiService.signin(values).subscribe(
      res=>{
        this._authservice.setuserData(res);
        this.router.navigateByUrl('/new-moment')
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
