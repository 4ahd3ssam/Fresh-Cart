import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { FlowbiteService } from '../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, { validators: this.confirmPassword })

  isLoadingSubmission: boolean = false;
  errorSubmissionMsg: string = "";
  successSubmissionMsg: string = "";


  constructor(private flowbiteService: FlowbiteService) { }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  confirmPassword(form: AbstractControl) {
    const password = form.get("password")?.value;
    const rePassword = form.get("rePassword")?.value;
    if (password == rePassword) {
      return null;
    }
    else {
      return { mismatch: true };
    }
  }

  submitForm() {
    if (this.registerForm.valid) {
      this.isLoadingSubmission = true;
      this.authService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          this.isLoadingSubmission = false;
          this.errorSubmissionMsg = "";
          this.successSubmissionMsg = res.message;
          setTimeout(() => {
            this.router.navigate(["/login"]);
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
      this.registerForm.markAllAsTouched();
    }
  }
}
