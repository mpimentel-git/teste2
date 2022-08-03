import { Login } from './../../models/login';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PoLanguage } from '@po-ui/ng-components';
import { PoPageLoginLiterals } from '@po-ui/ng-templates';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{
  public pageTitle!: string;
  loading = false;
  submitted = false;
  formData: any;
  languages: Array<PoLanguage> = [];
  hideRemember = true;
  passwordError: Array<string> = [];

  customLiterals: PoPageLoginLiterals = {
    loginHint: '',
  };

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.titleService.setTitle(this.route.snapshot.data['title']);

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }
  }

  loginSubmit(formData: Login) {
    this.submitted = true;
    formData = formData;
    // console.log(formData);
    this.loading = true;
    this.authenticationService
      .login(formData.login, formData.password)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from route parameters or default to '/'
          this.passwordError = [];
          const returnUrl =
            this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
          this.router.navigate([returnUrl]);
        },
        error: () => {
          this.passwordError = ['Senha e/ou usuário inválido, verifique e tente novamente.'];
          this.loading = false;
        },
      });
  }

  passwordChange() {
    if (this.passwordError.length) {
      this.passwordError = [];
    }
  }
}
