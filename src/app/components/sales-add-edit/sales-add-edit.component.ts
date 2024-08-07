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
      customerName: '',
      reference: '',
      paymentDate: '',
      status: '',
      grandTotal: '',
      paid: '',
      due: '',
      paymentStatus: '',
      biller: ''
    })
  }

  //submit add,edit sales 
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
  //Calculate Due and payment status
  //this should be done in backend ,hence we are using static data here, we dit it frontend 
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
