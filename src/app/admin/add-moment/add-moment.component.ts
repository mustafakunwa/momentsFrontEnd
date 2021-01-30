import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../shared/snacbar.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-moment',
  templateUrl: './add-moment.component.html',
  styleUrls: ['./add-moment.component.scss']
})
export class AddMomentComponent implements OnInit {

  form: FormGroup;
  tags: any[] = [];
  images: any[] = [];

  momendId = this.route.snapshot.params.id;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA]

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.createform();
    if (this.momendId) {
      this.getDeail();
    }
  }

  getDeail() {
    this.apiService.getMomentFromId(this.momendId).subscribe(
      res => {
        if (res) {
          this.form.patchValue({
            title: res.title
          })
          this.tags = res.tags;
          this.images = res.images;
        }

      }
    )
  }

  createform() {
    this.form = this.fb.group({
      title: [null, [Validators.required, Validators.maxLength(100)]],
    })
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
    if (this.images.length == 0) {
      return this.snackbarService.openSnackBar('error', 'Images are required')
    }

    const requestData = {
      ...values,
      tags: this.tags,
      images: this.images
    }
    if (this.momendId) {
      this.apiService.updateMoment(requestData, this.momendId).subscribe(
        res => {
          this.snackbarService.openSnackBar('success', 'Updated Successfully')
          this.router.navigateByUrl('/moment-list');

        }
      )
    } else {
      this.apiService.insertMoment(requestData).subscribe(
        res => {
          this.snackbarService.openSnackBar('success', 'Inserted Successfully')
          this.router.navigateByUrl('/moment-list')
        }
      )
    }
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

  removeImage(index) {
    this.images.splice(index, 1);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  remove(tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        if (file.type.indexOf('image/') >= 0 && file.size <= 1048576) {
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e: any) => {
            if(this.images.length<5)
              this.images.push({ name: file.name, image: e.target.result })
          }
        }
      }
    }
  }

}
