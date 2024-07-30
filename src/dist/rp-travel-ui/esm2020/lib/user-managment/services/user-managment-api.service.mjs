import { Injectable, inject } from '@angular/core';
import { EnvironmentService } from '../../shared/services/environment.service';
import { HttpClient } from '@angular/common/http';
import { catchError, retry, take } from 'rxjs';
import * as i0 from "@angular/core";
export class UserManagmentApiService {
    constructor() {
        this.http = inject(HttpClient);
        this.env = inject(EnvironmentService);
    }
    /**
     *
     * @param body [Login form value]
     * @returns all the user data needed to be authinticated within the application
     */
    login(body) {
        let api = `${this.env.users}/api/Account/Login`;
        return this.http.post(api, body).pipe(retry(3), take(1), catchError(err => { throw err; }));
    }
    /**
     *
     * @param body [Signup form value]
     * @returns all the user data needed to be authinticated within the application
     * also saves a new user on the the database
     */
    signup(body) {
        let api = `${this.env.users}/api/Account/Register`;
        return this.http.post(api, body).pipe(retry(3), take(1), catchError(err => { throw err; }));
    }
}
UserManagmentApiService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: UserManagmentApiService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
UserManagmentApiService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: UserManagmentApiService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: UserManagmentApiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1tYW5hZ21lbnQtYXBpLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ycC10cmF2ZWwtdWkvc3JjL2xpYi91c2VyLW1hbmFnbWVudC9zZXJ2aWNlcy91c2VyLW1hbmFnbWVudC1hcGkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFbEQsT0FBTyxFQUFjLFVBQVUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUszRCxNQUFNLE9BQU8sdUJBQXVCO0lBS2xDO1FBSE8sU0FBSSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUN6QixRQUFHLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUE7SUFFdkIsQ0FBQztJQUdqQjs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLElBQW1CO1FBQ3ZCLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLG9CQUFvQixDQUFBO1FBQy9DLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQVksR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUEsRUFBRSxHQUFDLE1BQU0sR0FBRyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQy9GLENBQUE7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsSUFBb0I7UUFDekIsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssdUJBQXVCLENBQUE7UUFDbEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBWSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQSxFQUFFLEdBQUMsTUFBTSxHQUFHLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FDL0YsQ0FBQTtJQUNILENBQUM7O29IQTdCVSx1QkFBdUI7d0hBQXZCLHVCQUF1QixjQUZ0QixNQUFNOzJGQUVQLHVCQUF1QjtrQkFIbkMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRW52aXJvbm1lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2Vudmlyb25tZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyB1c2VyTG9naW5Gb3JtLCB1c2VyTW9kZWwsIHVzZXJTaWdudXBGb3JtIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIGNhdGNoRXJyb3IsIHJldHJ5LCB0YWtlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBVc2VyTWFuYWdtZW50QXBpU2VydmljZSB7XHJcblxyXG4gIHB1YmxpYyBodHRwID0gaW5qZWN0KEh0dHBDbGllbnQpXHJcbiAgcHVibGljIGVudiA9IGluamVjdChFbnZpcm9ubWVudFNlcnZpY2UpXHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0gYm9keSBbTG9naW4gZm9ybSB2YWx1ZV1cclxuICAgKiBAcmV0dXJucyBhbGwgdGhlIHVzZXIgZGF0YSBuZWVkZWQgdG8gYmUgYXV0aGludGljYXRlZCB3aXRoaW4gdGhlIGFwcGxpY2F0aW9uXHJcbiAgICovXHJcbiAgbG9naW4oYm9keTogdXNlckxvZ2luRm9ybSk6T2JzZXJ2YWJsZTx1c2VyTW9kZWw+IHtcclxuICAgIGxldCBhcGkgPSBgJHt0aGlzLmVudi51c2Vyc30vYXBpL0FjY291bnQvTG9naW5gXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8dXNlck1vZGVsPihhcGksIGJvZHkpLnBpcGUocmV0cnkoMyksIHRha2UoMSksIGNhdGNoRXJyb3IoZXJyPT57dGhyb3cgZXJyfSlcclxuICAgIClcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSBib2R5IFtTaWdudXAgZm9ybSB2YWx1ZV1cclxuICAgKiBAcmV0dXJucyBhbGwgdGhlIHVzZXIgZGF0YSBuZWVkZWQgdG8gYmUgYXV0aGludGljYXRlZCB3aXRoaW4gdGhlIGFwcGxpY2F0aW9uXHJcbiAgICogYWxzbyBzYXZlcyBhIG5ldyB1c2VyIG9uIHRoZSB0aGUgZGF0YWJhc2VcclxuICAgKi9cclxuICBzaWdudXAoYm9keTogdXNlclNpZ251cEZvcm0pOk9ic2VydmFibGU8dXNlck1vZGVsPiB7XHJcbiAgICBsZXQgYXBpID0gYCR7dGhpcy5lbnYudXNlcnN9L2FwaS9BY2NvdW50L1JlZ2lzdGVyYFxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PHVzZXJNb2RlbD4oYXBpLCBib2R5KS5waXBlKHJldHJ5KDMpLCB0YWtlKDEpLCBjYXRjaEVycm9yKGVycj0+e3Rocm93IGVycn0pXHJcbiAgICApXHJcbiAgfVxyXG4gIFxyXG59XHJcbiJdfQ==