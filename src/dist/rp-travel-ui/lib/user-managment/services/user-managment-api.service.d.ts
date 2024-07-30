import { EnvironmentService } from '../../shared/services/environment.service';
import { HttpClient } from '@angular/common/http';
import { userLoginForm, userModel, userSignupForm } from '../interfaces';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class UserManagmentApiService {
    http: HttpClient;
    env: EnvironmentService;
    constructor();
    /**
     *
     * @param body [Login form value]
     * @returns all the user data needed to be authinticated within the application
     */
    login(body: userLoginForm): Observable<userModel>;
    /**
     *
     * @param body [Signup form value]
     * @returns all the user data needed to be authinticated within the application
     * also saves a new user on the the database
     */
    signup(body: userSignupForm): Observable<userModel>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserManagmentApiService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserManagmentApiService>;
}
