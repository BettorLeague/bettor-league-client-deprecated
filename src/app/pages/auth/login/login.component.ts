import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/authentication/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {fuseAnimations} from '../../../../@fuse/animations';
import {MatDialog} from '@angular/material';
import {TokenStorage} from '../../../shared/services/authentication/token.storage';
import {AuthenticationRequestModel} from './model/authentication-request.model';
import {SplashScreenService} from '../../../../@fuse/services/splash-screen.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations : fuseAnimations
})
export class LoginComponent implements OnInit {

    loginRequest:AuthenticationRequestModel;
    loginForm: FormGroup;
    loginFormErrors: any;
    returnUrl: string;
    rememberMe:boolean = false;



    constructor(
        private dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private authService : AuthService,
        private splashScreenService:SplashScreenService,
        private tokenStorage: TokenStorage) {
      this.loginFormErrors = {email   : {}, password: {}};

    }

    ngOnInit() {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

      this.loginForm = this.formBuilder.group({
        email   : ['', [Validators.required]],
        //email   : ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });

      this.loginForm.valueChanges.subscribe(() => {
        this.onLoginFormValuesChanged();
      });
    }

    onLoginFormValuesChanged() {
      for ( const field in this.loginFormErrors )
      {
        if ( !this.loginFormErrors.hasOwnProperty(field) )
        {
          continue;
        }
        // Clear previous errors
        this.loginFormErrors[field] = {};

        // Get the control
        const control = this.loginForm.get(field);

        if ( control && control.dirty && !control.valid )
        {
          this.loginFormErrors[field] = control.errors;
        }
      }
    }

    onSubmit() {
        this.loginRequest = new AuthenticationRequestModel();
        this.loginRequest.password = this.loginForm.value.password;
        this.loginRequest.username = this.loginForm.value.email;

        this.authService.attemptAuth(this.loginRequest)
            .subscribe(data => {
              this.splashScreenService.show();
              this.tokenStorage.saveToken(data.token);
              setTimeout(() => {
                this.router.navigate(['app']).then(res => {
                  this.splashScreenService.hide();
                });
              }, 1000);


            });

    }





}
