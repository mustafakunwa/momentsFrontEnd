import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { SnackbarService } from "../../shared/snacbar.service";
import { ApiService } from "../../services/api.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationModalComponent } from "../../shared/confirmation-modal/confirmation-modal.component";

@Component({
  selector: "app-momentlist",
  templateUrl: "./momentlist.component.html",
  styleUrls: ["./momentlist.component.scss"],
})
export class MomentlistComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ["#", "images", "title", "tags", "action"];
  dataSource: MatTableDataSource<any>;
  pageSize: number = 5;

  constructor(
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getMoments();
  }

  getMoments() {
    this.apiService.getMoments().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  delete(id) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      maxWidth: "500px",
      data: { message: "Are you sure to permanently delete this Moment?" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.deleteMomentFromId(id).subscribe((res) => {
          this.snackbarService.openSnackBar("success", "delete successfully");
          const index = this.dataSource.data.findIndex(
            (moment) => moment._id == id
          );
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        });
      }
    });
  }
}
