import { Pipe, inject } from '@angular/core';
import { HomePageService } from '../../home-page/services/home-page.service';
import * as i0 from "@angular/core";
export class ExchangePipe {
    constructor() {
        this.home = inject(HomePageService);
        this.currentCurruncy = this.home.selectedCurrency;
    }
    transform(value, args) {
        this.currentCurruncy = this.home.selectedCurrency;
        if (!value || !args) {
            return value;
        }
        else {
            if (args == "value" && this.currentCurruncy.Currency_Code == 'KWD') {
                let total = value * this.currentCurruncy.rate;
                return parseFloat((Math.round(total * 1000) / 1000).toFixed(3));
            }
            if (args == "value" && this.currentCurruncy.Currency_Code != 'KWD') {
                let total = value * this.currentCurruncy.rate;
                return parseFloat((Math.round(total * 100) / 100).toFixed(2));
            }
            if (args == "code") {
                return this.currentCurruncy.Currency_Code;
            }
        }
    }
}
ExchangePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ExchangePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
ExchangePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: ExchangePipe, name: "exchange", pure: false });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ExchangePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'exchange',
                    pure: false
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjaGFuZ2UucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3JwLXRyYXZlbC11aS9zcmMvbGliL3NoYXJlZC9waXBlcy9leGNoYW5nZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQTZCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNENBQTRDLENBQUM7O0FBTzdFLE1BQU0sT0FBTyxZQUFZO0lBSnpCO1FBS1MsU0FBSSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUNyQyxvQkFBZSxHQUFpQixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO0tBd0I1RDtJQXRCQyxTQUFTLENBQUMsS0FBVSxFQUFFLElBQVU7UUFDOUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ2xELElBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDbEIsT0FBTyxLQUFLLENBQUM7U0FDZDthQUNJO1lBQ0gsSUFBRyxJQUFJLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxJQUFJLEtBQUssRUFBRTtnQkFDakUsSUFBSSxLQUFLLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFFO2dCQUMvQyxPQUFPLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzdEO1lBQ0QsSUFBRyxJQUFJLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxJQUFJLEtBQUssRUFBRTtnQkFDakUsSUFBSSxLQUFLLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO2dCQUM5QyxPQUFPLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFDLEdBQUcsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzNEO1lBQ0QsSUFBRyxJQUFJLElBQUksTUFBTSxFQUFFO2dCQUNqQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDO2FBQzNDO1NBQ0Y7SUFFSCxDQUFDOzt5R0F2QlUsWUFBWTt1R0FBWixZQUFZOzJGQUFaLFlBQVk7a0JBSnhCLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLElBQUksRUFBQyxLQUFLO2lCQUNYIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSwgSW5qZWN0YWJsZSwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGN1cnJlbmN5TW9kZWwgfSBmcm9tICcuLi8uLi9ob21lLXBhZ2UvaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEhvbWVQYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL2hvbWUtcGFnZS9zZXJ2aWNlcy9ob21lLXBhZ2Uuc2VydmljZSc7XHJcblxyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdleGNoYW5nZScsXHJcbiAgcHVyZTpmYWxzZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRXhjaGFuZ2VQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgcHVibGljIGhvbWUgPSBpbmplY3QoSG9tZVBhZ2VTZXJ2aWNlKVxyXG4gIGN1cnJlbnRDdXJydW5jeTpjdXJyZW5jeU1vZGVsID0gdGhpcy5ob21lLnNlbGVjdGVkQ3VycmVuY3k7XHJcblxyXG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBhcmdzPzogYW55KTogYW55IHtcclxuICAgIHRoaXMuY3VycmVudEN1cnJ1bmN5ID0gdGhpcy5ob21lLnNlbGVjdGVkQ3VycmVuY3k7XHJcbiAgICBpZighdmFsdWUgfHwgIWFyZ3MpIHtcclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGlmKGFyZ3MgPT0gXCJ2YWx1ZVwiICYmIHRoaXMuY3VycmVudEN1cnJ1bmN5LkN1cnJlbmN5X0NvZGUgPT0gJ0tXRCcpIHtcclxuICAgICAgICBsZXQgdG90YWwgPSB2YWx1ZSAqIHRoaXMuY3VycmVudEN1cnJ1bmN5LnJhdGUgO1xyXG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KChNYXRoLnJvdW5kKHRvdGFsKjEwMDApLzEwMDApLnRvRml4ZWQoMykpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKGFyZ3MgPT0gXCJ2YWx1ZVwiICYmIHRoaXMuY3VycmVudEN1cnJ1bmN5LkN1cnJlbmN5X0NvZGUgIT0gJ0tXRCcpIHtcclxuICAgICAgICBsZXQgdG90YWwgPSB2YWx1ZSAqIHRoaXMuY3VycmVudEN1cnJ1bmN5LnJhdGU7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoKE1hdGgucm91bmQodG90YWwqMTAwKS8xMDApLnRvRml4ZWQoMikpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKGFyZ3MgPT0gXCJjb2RlXCIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50Q3VycnVuY3kuQ3VycmVuY3lfQ29kZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9XHJcbiAgXHJcblxyXG59XHJcblxyXG4iXX0=