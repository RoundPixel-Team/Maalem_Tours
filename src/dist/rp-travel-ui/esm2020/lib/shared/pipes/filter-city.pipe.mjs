import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
//this pipe take an argument as the input and return a filterd array wich include the search input
export class FilterCityPipe {
    transform(value, args) {
        if (!value || !args) {
            return [];
        }
        else {
            if (args.length < 3) {
                return [];
            }
            let result = [];
            for (let index = 0; index < value.length; index++) {
                let element = value[index];
                let a = element.cityName.toLowerCase();
                let b = element.airportCode.toLowerCase();
                let c = element.airportName.toLowerCase();
                if (a.indexOf(args.toLowerCase()) != -1 || b.indexOf(args.toLowerCase()) != -1 || c.indexOf(args.toLowerCase()) != -1) {
                    result.push(element);
                }
            }
            return result;
        }
    }
}
FilterCityPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FilterCityPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
FilterCityPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: FilterCityPipe, name: "filterCity" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FilterCityPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'filterCity'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWNpdHkucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3JwLXRyYXZlbC11aS9zcmMvbGliL3NoYXJlZC9waXBlcy9maWx0ZXItY2l0eS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUVwRCxrR0FBa0c7QUFJbEcsTUFBTSxPQUFPLGNBQWM7SUFFekIsU0FBUyxDQUFDLEtBQWlCLEVBQUUsSUFBWTtRQUN2QyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ25CLE9BQU8sRUFBRSxDQUFDO1NBQ1g7YUFDSTtZQUNILElBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRSxDQUFDLEVBQUM7Z0JBQ2hCLE9BQU8sRUFBRSxDQUFDO2FBQ1Y7WUFDRixJQUFJLE1BQU0sR0FBZSxFQUFFLENBQUE7WUFDM0IsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ2pELElBQUksT0FBTyxHQUFhLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtvQkFDckgsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDdEI7YUFFRjtZQUNELE9BQU8sTUFBTSxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzsyR0F2QlUsY0FBYzt5R0FBZCxjQUFjOzJGQUFkLGNBQWM7a0JBSDFCLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLFlBQVk7aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBhaXJQb3J0cyB9IGZyb20gJy4uLy4uL2hvbWUtcGFnZS9pbnRlcmZhY2VzJztcclxuLy90aGlzIHBpcGUgdGFrZSBhbiBhcmd1bWVudCBhcyB0aGUgaW5wdXQgYW5kIHJldHVybiBhIGZpbHRlcmQgYXJyYXkgd2ljaCBpbmNsdWRlIHRoZSBzZWFyY2ggaW5wdXRcclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdmaWx0ZXJDaXR5J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRmlsdGVyQ2l0eVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuXHJcbiAgdHJhbnNmb3JtKHZhbHVlOiBhaXJQb3J0c1tdLCBhcmdzOiBzdHJpbmcpOiBhaXJQb3J0c1tdIHtcclxuICAgIGlmICghdmFsdWUgfHwgIWFyZ3MpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGlmKGFyZ3MubGVuZ3RoPCAzKXtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICB9XHJcbiAgICAgIGxldCByZXN1bHQ6IGFpclBvcnRzW10gPSBbXVxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdmFsdWUubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQ6IGFpclBvcnRzID0gdmFsdWVbaW5kZXhdO1xyXG4gICAgICAgIGxldCBhID0gZWxlbWVudC5jaXR5TmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGxldCBiID0gZWxlbWVudC5haXJwb3J0Q29kZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGxldCBjID0gZWxlbWVudC5haXJwb3J0TmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGlmIChhLmluZGV4T2YoYXJncy50b0xvd2VyQ2FzZSgpKSAhPSAtMSB8fCBiLmluZGV4T2YoYXJncy50b0xvd2VyQ2FzZSgpKSAhPSAtMSB8fCBjLmluZGV4T2YoYXJncy50b0xvd2VyQ2FzZSgpKSAhPSAtMSkge1xyXG4gICAgICAgICAgcmVzdWx0LnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIl19