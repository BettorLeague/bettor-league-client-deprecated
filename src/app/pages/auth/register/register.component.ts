import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { fuseAnimations } from '../../../../@fuse/animations';
import {AuthService} from "../../../shared/services/authentication/auth.service";
import {Router} from "@angular/router";
import {SignupRequestModel} from './model/signup-request.model';

@Component({
    selector   : 'app-register',
    templateUrl: './register.component.html',
    styleUrls  : ['./register.component.scss'],
    animations : fuseAnimations
})
export class RegisterComponent implements OnInit
{
    registerForm: FormGroup;
    registerFormErrors: any;

    registerRequest:SignupRequestModel;

    constructor(

        private router: Router,
        private authService : AuthService,
        private formBuilder: FormBuilder
    )
    {

        this.registerFormErrors = {
            name           : {},
            email          : {},
            password       : {},
            passwordConfirm: {}
        };
    }

    ngOnInit()
    {
        this.registerForm = this.formBuilder.group({
            name           : ['', Validators.required],
            email          : ['', [Validators.required, Validators.email]],
            password       : ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPassword]]
        });

        this.registerForm.valueChanges.subscribe(() => {
            this.onRegisterFormValuesChanged();
        });
    }

    onRegisterFormValuesChanged()
    {
        for ( const field in this.registerFormErrors )
        {
            if ( !this.registerFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.registerFormErrors[field] = {};

            // Get the control
            const control = this.registerForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.registerFormErrors[field] = control.errors;
            }
        }
    }
    onSubmit(){
      this.registerRequest = new SignupRequestModel();
      this.registerRequest.password = this.registerForm.value.password;
      this.registerRequest.username = this.registerForm.value.name;
      this.registerRequest.email = this.registerForm.value.email;

      this.authService.attemptSignUp(this.registerRequest)
        .subscribe(data => {
            this.router.navigate(['/auth/login']);
          },
          error => {
          //afficher une popup d'erreur
          });

    }
}

function confirmPassword(control: AbstractControl)
{
    if ( !control.parent || !control )
    {
        return;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if ( !password || !passwordConfirm )
    {
        return;
    }

    if ( passwordConfirm.value === '' )
    {
        return;
    }

    if ( password.value !== passwordConfirm.value )
    {
        return {
            passwordsNotMatch: true
        };
    }

}
