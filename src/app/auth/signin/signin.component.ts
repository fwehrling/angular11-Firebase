import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(/[0-9A-Za-z]{6,}/)],
      ],
    });
  }

  onSubmit(): void {
    const email = this.signinForm.get('email')?.value;
    const password = this.signinForm.get('password')?.value;

    this.authService
      .signinUser(email, password)
      .then(() => this.router.navigate(['/books']))
      .catch((error) => (this.errorMessage = error));
  }
}
