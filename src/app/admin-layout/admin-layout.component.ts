import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private AuthService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      maxWidth: '500px',
      data: { message: 'Are you sure you want to logout?',submit:'Yes',cancel:'No' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.apiService.logout().subscribe(
          res => {
            this.AuthService.removeuserdata()
            this.router.navigateByUrl('/signin');
          }
        )
      }
    })
  }

}
