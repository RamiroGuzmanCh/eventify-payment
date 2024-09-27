import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {PaymentService} from "../../services/payment.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-form-payment',
  standalone: true,
  imports: [
    MatButton,
    MatDialogContent,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatPrefix,
    ReactiveFormsModule,
    MatDialogTitle
  ],
  templateUrl: './form-payment.component.html',
  styleUrl: './form-payment.component.css'
})
export class FormPaymentComponent {
  form!: FormGroup;

  constructor(
      private paymentService: PaymentService,
      private fb: FormBuilder,
      private _snackBar: MatSnackBar
  ) {}


  ngOnInit(): void {
    this.form = this.fb.group({
      cardHolderName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expirationDate: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
      amount: ['', [Validators.required, Validators.min(0.01)]],
    });
  }

  processPayment() {
    if (this.form.valid) {
      this.paymentService
          .processPayment({
            cardHolderName: this.form.value.cardHolderName,
            cardNumber: this.form.value.cardNumber,
            expirationDate: this.form.value.expirationDate,
            cvv: this.form.value.cvv,
            amount: this.form.value.amount,
          })
          .subscribe({
            next: (response) => {
              this.openSnackBar('Pago procesado correctamente', 'Ok');
            },
            error: (error) => {
              this.openSnackBar('Error al procesar el pago', 'Ok');
            },
          });
    }
  }
  onCancel(): void {
    this.form.reset();  // Resetea el formulario
  }
  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, { duration: 5_000 });
  }
}
