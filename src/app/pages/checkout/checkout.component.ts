import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/payment/payment.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly paymentService = inject(PaymentService);


  private readonly activatedRoute = inject(ActivatedRoute);
  paymentForm!: FormGroup;
  cartID: string = localStorage.getItem("cartID")!;


  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      details: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: [null, [Validators.required]]
    })
  }


  isLoadingSubmission: boolean = false;
  errorSubmissionMsg: string = "";
  successSubmissionMsg: string = "";

  submitPayment() {

    this.paymentService.checkoutSession(this.cartID, this.paymentForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if(res.status == "success") {
          window.open(res.session.url, "_self");
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
