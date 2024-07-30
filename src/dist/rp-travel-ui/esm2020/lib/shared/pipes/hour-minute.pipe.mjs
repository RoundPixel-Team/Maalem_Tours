import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class HourMinutePipe {
    transform(value) {
        const hours = value / 60 | 0;
        const minutes = value % 60 | 0;
        return hours + 'h ' + minutes + 'm';
    }
}
HourMinutePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: HourMinutePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
HourMinutePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: HourMinutePipe, name: "hourminute" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: HourMinutePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'hourminute'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG91ci1taW51dGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3JwLXRyYXZlbC11aS9zcmMvbGliL3NoYXJlZC9waXBlcy9ob3VyLW1pbnV0ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUtwRCxNQUFNLE9BQU8sY0FBYztJQUV6QixTQUFTLENBQUMsS0FBYTtRQUNyQixNQUFNLEtBQUssR0FBRyxLQUFLLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBRTtRQUM5QixNQUFNLE9BQU8sR0FBSSxLQUFLLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoQyxPQUFPLEtBQUssR0FBRyxJQUFJLEdBQUcsT0FBTyxHQUFHLEdBQUcsQ0FBQztJQUN0QyxDQUFDOzsyR0FOVSxjQUFjO3lHQUFkLGNBQWM7MkZBQWQsY0FBYztrQkFIMUIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsWUFBWTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ2hvdXJtaW51dGUnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBIb3VyTWludXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICB0cmFuc2Zvcm0odmFsdWU6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICBjb25zdCBob3VycyA9IHZhbHVlIC8gNjAgfCAwIDtcclxuICAgIGNvbnN0IG1pbnV0ZXMgPSAgdmFsdWUgJSA2MCB8IDA7XHJcbiAgICByZXR1cm4gaG91cnMgKyAnaCAnICsgbWludXRlcyArICdtJztcclxuICB9XHJcblxyXG59XHJcbiJdfQ==