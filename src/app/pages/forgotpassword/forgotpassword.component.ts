import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotpasswordService } from '../../core/services/forgotpassword/forgotpassword.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent implements OnInit {
  @Input() isActive = false;
  @Output() close = new EventEmitter<void>();

  private readonly forgotpasswordService = inject(ForgotpasswordService);
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  constructor(private flowbiteService: FlowbiteService) { }

  forgotPasswordForm = new FormGroup({
    email: new FormControl(null, [Validators.required])
  });

  verifyCodeForm = new FormGroup({
    digitOne: new FormControl(""),
    digitTwo: new FormControl(""),
    digitThree: new FormControl(""),
    digitFour: new FormControl(""),
    digitFive: new FormControl(""),
    digitSix: new FormControl("")
  });

  resetPasswordForm = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    newPassword: new FormControl(null, [Validators.required])
  });

  step: number = 1;
  isLoadingSubmission: boolean = false;
  errorSubmissionMsg: string = "";
  successSubmissionMsg: string = "";

  submitForgotPassword() {
    if (this.forgotPasswordForm.valid) {
      this.isLoadingSubmission = true;
      let emailValue = this.forgotPasswordForm.value.email!;
      this.resetPasswordForm.get("email")?.patchValue(emailValue);
      this.forgotpasswordService.forgotPassword(this.forgotPasswordForm.value).subscribe({
        next: (res) => {
          this.isLoadingSubmission = false;
          this.errorSubmissionMsg = "";
          this.successSubmissionMsg = res.message;
          setTimeout(() => {
            this.step = 2;
          }, 2000);
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          this.isLoadingSubmission = false;
          this.successSubmissionMsg = "";
          this.errorSubmissionMsg = err.error.message;
        }
      })
    }
    else {
      this.errorSubmissionMsg = "Please fill all fileds";
    }
  }

  submitVerifyCode() {
    if (this.verifyCodeForm.valid) {
      this.isLoadingSubmission = true;

      const code = ['digitOne', 'digitTwo', 'digitThree', 'digitFour', 'digitFive', 'digitSix']
        .map(key => this.verifyCodeForm.get(key)?.value || '')
        .join('');

      let data = { resetCode: code }
      this.forgotpasswordService.verifyCode(data).subscribe({
        next: (res) => {
          this.isLoadingSubmission = false;
          this.errorSubmissionMsg = "";
          this.successSubmissionMsg = "Code is verified successfully";
          setTimeout(() => {
            this.step = 3;
          }, 2000);
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          this.isLoadingSubmission = false;
          this.successSubmissionMsg = "";
          this.errorSubmissionMsg = err.error.message;
        }
      })
    }
    else {
      this.errorSubmissionMsg = "Please fill all fileds";
    }
  }

  submitResetPassword() {
    if (this.resetPasswordForm.valid) {
      this.isLoadingSubmission = true;

      this.forgotpasswordService.resetPassword(this.resetPasswordForm.value).subscribe({
        next: (res) => {
          this.isLoadingSubmission = false;
          this.errorSubmissionMsg = "";
          this.successSubmissionMsg = "Success";
          setTimeout(() => {
            this.isActive = false;
          }, 2000);
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          this.isLoadingSubmission = false;
          this.successSubmissionMsg = "";
          this.errorSubmissionMsg = err.error.message;
        }
      })
    }
    else {
      this.errorSubmissionMsg = "Please fill all fileds";
    }
  }

  closeModal(): void {
    this.close.emit();
  }

  // Styling of the verify code form
  focusNextInput(el: HTMLInputElement, prevId: string | null, nextId: string | null): void {
    if (el.value.length === 0 && prevId) {
      document.getElementById(prevId)?.focus();
    } else if (el.value.length >= 1 && nextId) {
      document.getElementById(nextId)?.focus();
    }
  }

  onKeyUp(event: Event, currentId: string, prevId: string | null = null, nextId: string | null = null): void {
    const target = event.target as HTMLInputElement;
    this.focusNextInput(target, prevId, nextId);
    this.verifyCodeForm.get(currentId)?.setValue(target.value);
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasteData = (event.clipboardData || (window as any).clipboardData).getData('text');
    const digits = pasteData.replace(/\D/g, '').split('').slice(0, 6); // Get first 6 digits

    ['digitOne', 'digitTwo', 'digitThree', 'digitFour', 'digitFive', 'digitSix'].forEach((id, index) => {
      const value = digits[index] || '';
      this.verifyCodeForm.get(id)?.setValue(value);
      const element = document.getElementById(id) as HTMLInputElement;
      if (element) {
        element.value = value;
        if (index < 5 && value) {
          document.getElementById(`digit${index + 2}`)?.focus();
        }
      }
    });
  }
}