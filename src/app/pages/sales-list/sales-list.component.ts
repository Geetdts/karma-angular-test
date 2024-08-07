import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { SalesAddEditComponent } from '../../components/sales-add-edit/sales-add-edit.component';
import { SalesService } from '../../services/sales.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoreService } from '../../core/core.service';

interface Sale {
  customerName: string;
  reference: string;
  date: string;
  status: string;
  grandTotal: number;
  paid: number;
  due: number;
  paymentStatus: string;
  biller: string;
}

@Component({
  selector: 'app-sales-list',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule

  ],
  templateUrl: './sales-list.component.html',
  styleUrl: './sales-list.component.css'
})
export class SalesListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'customerName',
    'reference',
    'paymentDate',
    'status',
    'grandTotal',
    'paid',
    'due',
    'paymentStatus',
    'biller',
    'action',

  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _dialog: MatDialog,
    private _salesService: SalesService,
    private _coreService: CoreService
  ) { }
  openAddEditSalesForm() {
    const dialogRef = this._dialog.open(SalesAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getSalesList();
        }
      }
    })
  }
  ngOnInit(): void {
    this.getSalesList();
  }
  getSalesList() {
    this._salesService.getSalesList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteSale(id: number) {
    this._salesService.deleteSale(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Sale deleted!', 'done');
        this.getSalesList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(SalesAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getSalesList();
        }
      },
    });
  }

  // filetr for table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
