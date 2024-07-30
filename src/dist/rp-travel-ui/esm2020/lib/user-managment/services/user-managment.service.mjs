import { Injectable, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { UserManagmentApiService } from './user-managment-api.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/router";
const REG_DATA = 'reg_data';
export class UserManagmentService {
    //#endregion
    constructor(__fb, __router) {
        this.__fb = __fb;
        this.__router = __router;
        //#region Variablses
        this.subscription = new Subscription();
        this.api = inject(UserManagmentApiService);
        this.loginForm = new FormGroup({});
        this.registerForm = new FormGroup({});
        this.loading = false;
        this.userChange = new Subject;
    }
    /**
     * this function is responsible to initialize the Login Form
     */
    initLoginForm() {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl(false, [Validators.required]),
        });
    }
    /**
     * this function is responsible to initialize the Register(sign up) Form
     */
    initRegisterForm() {
        this.registerForm = this.__fb.group({
            Isbase: new FormControl(1),
            Email: new FormControl('', [Validators.email, Validators.minLength(8), Validators.required]),
            Password: new FormControl('', [Validators.required, Validators.minLength(8)]),
            FirstName: new FormControl(''),
            LastName: new FormControl(''),
            ImageURL: new FormControl(''),
            PhoneNumber: new FormControl('', [Validators.required, Validators.minLength(5)]),
            ConfirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
            User_Name: new FormControl(''),
            notification: new FormControl(true)
        }, {
            validators: this.ConfirmPasswordValidator('Password', 'ConfirmPassword'),
        });
    }
    /**
     * this function is responsible to check validation between password and confirm password
     */
    ConfirmPasswordValidator(controlName, matchingControlName) {
        return (formGroup) => {
            let control = formGroup.controls[controlName];
            let matchingControl = formGroup.controls[matchingControlName];
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ custom: true });
            }
            else {
                matchingControl.setErrors(null);
            }
        };
    }
    /**
     * this function is responsible to make intgeration between front and backend request (USER LOGIN)
     * @params router navigation name to navigate to another page (HOME PAGE) after login
     */
    loginSubmit(routerName) {
        this.loading = true;
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            this.loading = false;
        }
        else {
            this.subscription.add(this.api.login(this.loginForm.value).subscribe((val) => {
                console.log("show me login submit", val);
                this.loading = false;
                this.currentUser = val;
                this.userChange.next('logedin');
                // this.__router.navigate([`/${routerName}`])     //navigate to paramter name page after login
                // window.location.reload();
            }, (err) => { console.log("user login error", err); this.loading = false; }));
        }
    }
    /**
     * this function is responsible to make intgeration between front and backend request (USER REGISTER)
     * @params router navigation name to navigate to another page (LOGIN PAGE) after register
    */
    regitserSubmit(routerName) {
        this.loading = true;
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            this.loading = false;
        }
        else {
            this.api.signup(this.registerForm.value).subscribe((val) => {
                console.log("show me register submit", val);
                localStorage.setItem(REG_DATA, JSON.stringify(this.registerForm.value));
                this.loading = false;
                this.currentUser = val;
                this.userChange.next('signedup');
                // this.__router.navigate([`/${routerName}`]) //navigate to paramter name page after registerate the account
            }, (error) => {
                console.log("show me signup error", error);
                this.loading = false;
            });
        }
    }
    /**
     * this function is responsible to destory any opened subscription on this service
     */
    destroyer() {
        this.subscription.unsubscribe();
    }
}
UserManagmentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: UserManagmentService, deps: [{ token: i1.FormBuilder }, { token: i2.Router }], target: i0.ɵɵFactoryTarget.Injectable });
UserManagmentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: UserManagmentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: UserManagmentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i2.Router }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1tYW5hZ21lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3JwLXRyYXZlbC11aS9zcmMvbGliL3VzZXItbWFuYWdtZW50L3NlcnZpY2VzL3VzZXItbWFuYWdtZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBQyxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFlLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakYsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7Ozs7QUFJdkUsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDO0FBSTVCLE1BQU0sT0FBTyxvQkFBb0I7SUFXL0IsWUFBWTtJQUVaLFlBQW9CLElBQWlCLEVBQVMsUUFBZ0I7UUFBMUMsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVE7UUFaOUQsb0JBQW9CO1FBQ3BCLGlCQUFZLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEQsUUFBRyxHQUFHLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO1FBQ3JDLGNBQVMsR0FBYyxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QyxpQkFBWSxHQUFjLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTVDLFlBQU8sR0FBYSxLQUFLLENBQUE7UUFHekIsZUFBVSxHQUFxQixJQUFJLE9BQU8sQ0FBQTtJQUd1QixDQUFDO0lBQ2xFOztPQUVHO0lBQ0gsYUFBYTtRQUNYLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUM7WUFDN0IsS0FBSyxFQUFFLElBQUksV0FBVyxD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LDRHQUE0RztZQUM5RyxDQUFDLEVBQUMsQ0FBQyxLQUFTLEVBQUMsRUFBRTtnQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQTtZQUN0QixDQUFDLENBQUMsQ0FBQTtTQUNIO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsU0FBUztRQUNQLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7aUhBaEhVLG9CQUFvQjtxSEFBcEIsb0JBQW9CLGNBRm5CLE1BQU07MkZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgVXNlck1hbmFnbWVudEFwaVNlcnZpY2UgfSBmcm9tICcuL3VzZXItbWFuYWdtZW50LWFwaS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgdXNlck1vZGVsIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XHJcblxyXG5jb25zdCBSRUdfREFUQSA9ICdyZWdfZGF0YSc7XHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBVc2VyTWFuYWdtZW50U2VydmljZSB7XHJcbiAgLy8jcmVnaW9uIFZhcmlhYmxzZXNcclxuICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcclxuICBhcGkgPSBpbmplY3QoVXNlck1hbmFnbWVudEFwaVNlcnZpY2UpIFxyXG4gIGxvZ2luRm9ybTogRm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7fSk7XHJcbiAgcmVnaXN0ZXJGb3JtOiBGb3JtR3JvdXAgPSBuZXcgRm9ybUdyb3VwKHt9KTtcclxuXHJcbiAgbG9hZGluZyA6IGJvb2xlYW4gPSBmYWxzZVxyXG5cclxuICBjdXJyZW50VXNlciEgOiB1c2VyTW9kZWwgO1xyXG4gIHVzZXJDaGFuZ2UgOiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9fZmI6IEZvcm1CdWlsZGVyLHByaXZhdGUgX19yb3V0ZXI6IFJvdXRlcikge31cclxuICAvKipcclxuICAgKiB0aGlzIGZ1bmN0aW9uIGlzIHJlc3BvbnNpYmxlIHRvIGluaXRpYWxpemUgdGhlIExvZ2luIEZvcm1cclxuICAgKi9cclxuICBpbml0TG9naW5Gb3JtKCkge1xyXG4gICAgdGhpcy5sb2dpbkZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgZW1haWw6IG5ldyBGb3JtQ29udHJvbCgnJywgW1ZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMuZW1haWxdKSxcclxuICAgICAgcGFzc3dvcmQ6IG5ldyBGb3JtQ29udHJvbChmYWxzZSwgW1ZhbGlkYXRvcnMucmVxdWlyZWRdKSxcclxuICAgIH0pO1xyXG4gIH1cclxuICAvKipcclxuICAgKiB0aGlzIGZ1bmN0aW9uIGlzIHJlc3BvbnNpYmxlIHRvIGluaXRpYWxpemUgdGhlIFJlZ2lzdGVyKHNpZ24gdXApIEZvcm1cclxuICAgKi9cclxuICBpbml0UmVnaXN0ZXJGb3JtKCkge1xyXG4gICAgdGhpcy5yZWdpc3RlckZvcm0gPSB0aGlzLl9fZmIuZ3JvdXAoIHtcclxuICAgIElzYmFzZTpuZXcgRm9ybUNvbnRyb2woMSksXHJcbiAgICBFbWFpbDogbmV3IEZvcm1Db250cm9sKCcnLFtWYWxpZGF0b3JzLmVtYWlsLFZhbGlkYXRvcnMubWluTGVuZ3RoKDgpLFZhbGlkYXRvcnMucmVxdWlyZWRdKSxcclxuICAgIFBhc3N3b3JkOiBuZXcgRm9ybUNvbnRyb2woJycsW1ZhbGlkYXRvcnMucmVxdWlyZWQsVmFsaWRhdG9ycy5taW5MZW5ndGgoOCldKSxcclxuICAgIEZpcnN0TmFtZTogbmV3IEZvcm1Db250cm9sKCcnKSxcclxuICAgIExhc3ROYW1lOiBuZXcgRm9ybUNvbnRyb2woJycpLFxyXG4gICAgSW1hZ2VVUkw6IG5ldyBGb3JtQ29udHJvbCgnJyksXHJcbiAgICBQaG9uZU51bWJlcjogbmV3IEZvcm1Db250cm9sKCcnLFtWYWxpZGF0b3JzLnJlcXVpcmVkLFZhbGlkYXRvcnMubWluTGVuZ3RoKDUpXSksXHJcbiAgICBDb25maXJtUGFzc3dvcmQ6IG5ldyBGb3JtQ29udHJvbCgnJyxbVmFsaWRhdG9ycy5yZXF1aXJlZCxWYWxpZGF0b3JzLm1pbkxlbmd0aCg4KV0pLFxyXG4gICAgVXNlcl9OYW1lOiBuZXcgRm9ybUNvbnRyb2wgKCcnKSxcclxuICAgIG5vdGlmaWNhdGlvbjpuZXcgRm9ybUNvbnRyb2wodHJ1ZSlcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHZhbGlkYXRvcnM6IHRoaXMuQ29uZmlybVBhc3N3b3JkVmFsaWRhdG9yKCdQYXNzd29yZCcsICdDb25maXJtUGFzc3dvcmQnKSxcclxuICAgIH0pO1xyXG4gIH1cclxuICAvKipcclxuICAgKiB0aGlzIGZ1bmN0aW9uIGlzIHJlc3BvbnNpYmxlIHRvIGNoZWNrIHZhbGlkYXRpb24gYmV0d2VlbiBwYXNzd29yZCBhbmQgY29uZmlybSBwYXNzd29yZFxyXG4gICAqL1xyXG4gIENvbmZpcm1QYXNzd29yZFZhbGlkYXRvcihjb250cm9sTmFtZTogc3RyaW5nLCBtYXRjaGluZ0NvbnRyb2xOYW1lOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiAoZm9ybUdyb3VwOiBGb3JtR3JvdXApID0+IHtcclxuICAgICAgbGV0IGNvbnRyb2wgPSBmb3JtR3JvdXAuY29udHJvbHNbY29udHJvbE5hbWVdO1xyXG4gICAgICBsZXQgbWF0Y2hpbmdDb250cm9sID0gZm9ybUdyb3VwLmNvbnRyb2xzW21hdGNoaW5nQ29udHJvbE5hbWVdO1xyXG5cclxuICAgICAgaWYgKGNvbnRyb2wudmFsdWUgIT09IG1hdGNoaW5nQ29udHJvbC52YWx1ZSkge1xyXG4gICAgICAgIG1hdGNoaW5nQ29udHJvbC5zZXRFcnJvcnMoeyBjdXN0b206IHRydWUgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbWF0Y2hpbmdDb250cm9sLnNldEVycm9ycyhudWxsKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogdGhpcyBmdW5jdGlvbiBpcyByZXNwb25zaWJsZSB0byBtYWtlIGludGdlcmF0aW9uIGJldHdlZW4gZnJvbnQgYW5kIGJhY2tlbmQgcmVxdWVzdCAoVVNFUiBMT0dJTilcclxuICAgKiBAcGFyYW1zIHJvdXRlciBuYXZpZ2F0aW9uIG5hbWUgdG8gbmF2aWdhdGUgdG8gYW5vdGhlciBwYWdlIChIT01FIFBBR0UpIGFmdGVyIGxvZ2luXHJcbiAgICovXHJcbiAgbG9naW5TdWJtaXQocm91dGVyTmFtZTpzdHJpbmcpe1xyXG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZVxyXG4gICAgaWYodGhpcy5sb2dpbkZvcm0uaW52YWxpZCl7XHJcbiAgICAgIHRoaXMubG9naW5Gb3JtLm1hcmtBbGxBc1RvdWNoZWQoKVxyXG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcclxuICAgICAgICB0aGlzLmFwaS5sb2dpbih0aGlzLmxvZ2luRm9ybS52YWx1ZSkuc3Vic2NyaWJlKCh2YWw6dXNlck1vZGVsKT0+e1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJzaG93IG1lIGxvZ2luIHN1Ym1pdFwiLHZhbCk7XHJcbiAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxyXG4gICAgICAgICAgdGhpcy5jdXJyZW50VXNlciA9IHZhbFxyXG4gICAgICAgICAgdGhpcy51c2VyQ2hhbmdlLm5leHQoJ2xvZ2VkaW4nKVxyXG4gICAgICAgICAgLy8gdGhpcy5fX3JvdXRlci5uYXZpZ2F0ZShbYC8ke3JvdXRlck5hbWV9YF0pICAgICAvL25hdmlnYXRlIHRvIHBhcmFtdGVyIG5hbWUgcGFnZSBhZnRlciBsb2dpblxyXG4gICAgICAgICAgLy8gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKGVycjphbnkpPT57Y29uc29sZS5sb2coXCJ1c2VyIGxvZ2luIGVycm9yXCIsZXJyKTt0aGlzLmxvYWRpbmcgPSBmYWxzZX0pXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIHRoaXMgZnVuY3Rpb24gaXMgcmVzcG9uc2libGUgdG8gbWFrZSBpbnRnZXJhdGlvbiBiZXR3ZWVuIGZyb250IGFuZCBiYWNrZW5kIHJlcXVlc3QgKFVTRVIgUkVHSVNURVIpXHJcbiAgICogQHBhcmFtcyByb3V0ZXIgbmF2aWdhdGlvbiBuYW1lIHRvIG5hdmlnYXRlIHRvIGFub3RoZXIgcGFnZSAoTE9HSU4gUEFHRSkgYWZ0ZXIgcmVnaXN0ZXJcclxuICAqL1xyXG4gIHJlZ2l0c2VyU3VibWl0KHJvdXRlck5hbWU6c3RyaW5nKXtcclxuICAgIHRoaXMubG9hZGluZyA9IHRydWVcclxuICAgIGlmKHRoaXMucmVnaXN0ZXJGb3JtLmludmFsaWQpe1xyXG4gICAgICB0aGlzLnJlZ2lzdGVyRm9ybS5tYXJrQWxsQXNUb3VjaGVkKCk7XHJcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlXHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICB0aGlzLmFwaS5zaWdudXAodGhpcy5yZWdpc3RlckZvcm0udmFsdWUpLnN1YnNjcmliZSgodmFsOmFueSk9PntcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNob3cgbWUgcmVnaXN0ZXIgc3VibWl0XCIsdmFsKVxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFJFR19EQVRBLEpTT04uc3RyaW5naWZ5KHRoaXMucmVnaXN0ZXJGb3JtLnZhbHVlKSlcclxuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuY3VycmVudFVzZXIgPSB2YWxcclxuICAgICAgICB0aGlzLnVzZXJDaGFuZ2UubmV4dCgnc2lnbmVkdXAnKVxyXG4gICAgICAgIC8vIHRoaXMuX19yb3V0ZXIubmF2aWdhdGUoW2AvJHtyb3V0ZXJOYW1lfWBdKSAvL25hdmlnYXRlIHRvIHBhcmFtdGVyIG5hbWUgcGFnZSBhZnRlciByZWdpc3RlcmF0ZSB0aGUgYWNjb3VudFxyXG4gICAgICB9LChlcnJvcjphbnkpPT57XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzaG93IG1lIHNpZ251cCBlcnJvclwiLGVycm9yKTtcclxuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogdGhpcyBmdW5jdGlvbiBpcyByZXNwb25zaWJsZSB0byBkZXN0b3J5IGFueSBvcGVuZWQgc3Vic2NyaXB0aW9uIG9uIHRoaXMgc2VydmljZVxyXG4gICAqL1xyXG4gIGRlc3Ryb3llcigpIHtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==