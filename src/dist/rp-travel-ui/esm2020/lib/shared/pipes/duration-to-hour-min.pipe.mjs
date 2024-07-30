import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class DurationToHourMinPipe {
    transform(value) {
        const duration = value.split(':');
        const hours = +duration[0];
        const minutes = +duration[1];
        return hours + 'h ' + minutes + 'm';
    }
}
DurationToHourMinPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: DurationToHourMinPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
DurationToHourMinPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: DurationToHourMinPipe, name: "durationToHourMin" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: DurationToHourMinPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'durationToHourMin'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVyYXRpb24tdG8taG91ci1taW4ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3JwLXRyYXZlbC11aS9zcmMvbGliL3NoYXJlZC9waXBlcy9kdXJhdGlvbi10by1ob3VyLW1pbi5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUtwRCxNQUFNLE9BQU8scUJBQXFCO0lBRWhDLFNBQVMsQ0FBQyxLQUFhO1FBQ3JCLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUU7UUFDNUIsTUFBTSxPQUFPLEdBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsT0FBTyxLQUFLLEdBQUcsSUFBSSxHQUFHLE9BQU8sR0FBRyxHQUFHLENBQUM7SUFDdEMsQ0FBQzs7a0hBUFUscUJBQXFCO2dIQUFyQixxQkFBcUI7MkZBQXJCLHFCQUFxQjtrQkFIakMsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsbUJBQW1CO2lCQUMxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnZHVyYXRpb25Ub0hvdXJNaW4nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEdXJhdGlvblRvSG91ck1pblBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuXHJcbiAgdHJhbnNmb3JtKHZhbHVlOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgY29uc3QgZHVyYXRpb24gPSB2YWx1ZS5zcGxpdCgnOicpO1xyXG4gICAgY29uc3QgaG91cnMgPSArZHVyYXRpb25bMF0gO1xyXG4gICAgY29uc3QgbWludXRlcyA9ICArZHVyYXRpb25bMV07XHJcbiAgICByZXR1cm4gaG91cnMgKyAnaCAnICsgbWludXRlcyArICdtJztcclxuICB9XHJcblxyXG59XHJcbiJdfQ==