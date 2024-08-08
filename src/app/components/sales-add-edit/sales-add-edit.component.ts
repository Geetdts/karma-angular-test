import { Component, Inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, NativeDateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';
import { SalesService } from '../../services/sales.service';
import { DialogRef } from '@angular/cdk/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-sales-add-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
    { provide: MatDialog }
  ],
  templateUrl: './sales-add-edit.component.html',
  styleUrl: './sales-add-edit.component.css'
})

export class SalesAddEditComponent implements OnInit {
  salesForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _salesService: SalesService,
    private _dialogRef: MatDialogRef<SalesAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.salesForm = this._fb.group({
      customerName: ['', Validators.required],
      paymentDate: ['', Validators.required],
      status: ['', Validators.required],
      grandTotal: [0, [Validators.required, Validators.min(0)]],
      paid: [0, [Validators.required, Validators.min(0)]],
      biller: ['', Validators.required]
    })
  }

  /**
  * Handles the form submission for adding or updating sales.
  * If the form is valid, calculates due and payment status,
  * then either updates an existing sale or adds a new sale.
  * Displays a snackbar notification upon success and closes the dialog.
  */
  onFormSubmit() {
    if (this.salesForm.valid) {
      const formData = this.calculateDueAndPaymentStatus(this.salesForm.value);
      if (this.data) {
        this._salesService
          .updateSales(this.data.id, formData)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Sale detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._salesService.addSales(formData).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar("Sale added successfully");
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }
    }
  }

  /**
   * Calculates the due amount and payment status based on the form data.
   * This calculation is typically handled in the backend, but is performed
   * here on the frontend for demonstration purposes using static data.
   * 
   * @param formData - The sales form data containing grandTotal and paid amounts.
   * @returns An object containing the original form data along with calculated due and payment status.
   */
  private calculateDueAndPaymentStatus(formData: any): any {
    const grandTotal = formData.grandTotal || 0;
    const paid = formData.paid || 0;
    const due = grandTotal - paid;
    const paymentStatus = due === 0 ? 'Paid' : 'Due';
    return { ...formData, due, paymentStatus };
  }

  ngOnInit(): void {
    this.salesForm.patchValue(this.data);
  }
  onCancel(): void {
    this._dialogRef.close(false);
  }

}
