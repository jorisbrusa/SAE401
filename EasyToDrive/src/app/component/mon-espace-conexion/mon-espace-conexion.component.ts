import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mon-espace-conexion',
  templateUrl: './mon-espace-conexion.component.html',
  styleUrls: ['./mon-espace-conexion.component.css']
})
export class MonEspaceConexionComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.http.post('https://your-api-endpoint.com/login', loginData).subscribe(
        (response: any) => {
          if (response.success) {
            // Assuming the response contains a token and user data
            localStorage.setItem('token', response.token);
            this.router.navigate(['/another-page']);
          } else {
            this.errorMessage = 'Invalid credentials';
          }
        },
        (error) => {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      );
    }
  }
}