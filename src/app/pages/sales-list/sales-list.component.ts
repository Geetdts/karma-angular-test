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
import { DeleteConfirmDialogComponent } from '../../components/delete-confirm-dialog/delete-confirm-dialog.component';

interface Sale {
  customerName: string;
  reference: string;
  paymentDate: string;
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

  ngOnInit(): void {
    this.getSalesList();
  }
  /**
 * Opens the Add/Edit Sales form in a dialog.
 * 
 * Opens a dialog containing the SalesAddEditComponent. 
 * After the dialog is closed, it refreshes the sales list if 
 * there were changes (indicated by a truthy value returned).
 */
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

  /**
 * Fetches the list of sales from the sales service, updates the data source 
 * for the table, and sets up sorting and pagination.
 */
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

  /**
 * Opens a confirmation dialog to delete a sale. If confirmed, deletes the sale 
 * with the specified ID and refreshes the sales list.
 * 
 * @param id - The ID of the sale to be deleted.
 */
  deleteSale(id: number) {
    const dialogRef = this._dialog.open(DeleteConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._salesService.deleteSale(id).subscribe({
          next: (res) => {
            this._coreService.openSnackBar('Sale deleted!', 'done');
            this.getSalesList();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  /**
 * Opens the edit sales form in a dialog, passing the selected sale data.
 * Refreshes the sales list if the dialog is closed with a value.
 * 
 * @param data - The sales data to be edited.
 */
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

  // filetr table data
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Sort list by date
  sortByDate() {
    this._salesService.getSalesList().subscribe({
      next: (res) => {
        // Sort the fetched data by paymentDate
        const sortedData = res.sort((a: Sale, b: Sale) => {
          const dateA = new Date(a.paymentDate);
          const dateB = new Date(b.paymentDate);
          return dateA.getTime() - dateB.getTime(); // Ascending order
        });

        // Update the data source with the sorted data
        this.dataSource = new MatTableDataSource(sortedData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
