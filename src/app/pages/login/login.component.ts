import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { FlowbiteService } from '../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ForgotpasswordComponent } from "../forgotpassword/forgotpassword.component";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, ForgotpasswordComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  })

  isLoadingSubmission: boolean = false;
  errorSubmissionMsg: string = "";
  successSubmissionMsg: string = "";
  isOpenForgot: boolean = false;

  constructor(private flowbiteService: FlowbiteService) { }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  submitForm() {
    console.log("clicked");
    if (this.loginForm.valid) {
      this.isLoadingSubmission = true;
      this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoadingSubmission = false;
          this.errorSubmissionMsg = "";
          this.successSubmissionMsg = res.message;
          localStorage.setItem("token", res.token);
          this.authService.getUserData();
          setTimeout(() => {
            this.router.navigate(["/home"]);
          }, 2000);
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
      this.loginForm.markAllAsTouched();
    }
  }

  openForgot(): void {
    this.isOpenForgot = true;
    document.body.style.overflow = 'hidden';
  }
  closeForgot(): void {
    this.isOpenForgot = false;
    document.body.style.overflow = 'auto';

  }
}

