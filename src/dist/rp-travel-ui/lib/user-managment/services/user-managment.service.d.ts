import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { UserManagmentApiService } from './user-managment-api.service';
import { Router } from '@angular/router';
import { userModel } from '../interfaces';
import * as i0 from "@angular/core";
export declare class UserManagmentService {
    private __fb;
    private __router;
    subscription: Subscription;
    api: UserManagmentApiService;
    loginForm: FormGroup;
    registerForm: FormGroup;
    loading: boolean;
    currentUser: userModel;
    userChange: Subject<string>;
    constructor(__fb: FormBuilder, __router: Router);
    /**
     * this function is responsible to initialize the Login Form
     */
    initLoginForm(): void;
    /**
     * this function is responsible to initialize the Register(sign up) Form
     */
    initRegisterForm(): void;
    /**
     * this function is responsible to check validation between password and confirm password
     */
    ConfirmPasswordValidator(controlName: string, matchingControlName: string): (formGroup: FormGroup) => void;
    /**
     * this function is responsible to make intgeration between front and backend request (USER LOGIN)
     * @params router navigation name to navigate to another page (HOME PAGE) after login
     */
    loginSubmit(routerName: string): void;
    /**
     * this function is responsible to make intgeration between front and backend request (USER REGISTER)
     * @params router navigation name to navigate to another page (LOGIN PAGE) after register
    */
    regitserSubmit(routerName: string): void;
    /**
     * this function is responsible to destory any opened subscription on this service
     */
    destroyer(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserManagmentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserManagmentService>;
}
