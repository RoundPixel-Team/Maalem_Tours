import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class LimitToPipe {
    transform(value, args) {
        if (!value || !args) {
            return value;
        }
        else {
            if (value.length > args) {
                return value.slice(0, args);
            }
            else {
                return value;
            }
        }
    }
}
LimitToPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: LimitToPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
LimitToPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: LimitToPipe, name: "limitTo" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: LimitToPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'limitTo'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGltaXQtdG8ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3JwLXRyYXZlbC11aS9zcmMvbGliL3NoYXJlZC9waXBlcy9saW1pdC10by5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUtwRCxNQUFNLE9BQU8sV0FBVztJQUV0QixTQUFTLENBQUMsS0FBWSxFQUFFLElBQVk7UUFDbEMsSUFBRyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRTtZQUNsQixPQUFPLEtBQUssQ0FBQztTQUNoQjthQUFLO1lBQ0osSUFBRyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksRUFBQztnQkFDckIsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQzthQUM1QjtpQkFDRztnQkFDRixPQUFPLEtBQUssQ0FBQTthQUNiO1NBQ0Y7SUFDQyxDQUFDOzt3R0FiUSxXQUFXO3NHQUFYLFdBQVc7MkZBQVgsV0FBVztrQkFIdkIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsU0FBUztpQkFDaEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ2xpbWl0VG8nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaW1pdFRvUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICB0cmFuc2Zvcm0odmFsdWU6IGFueVtdLCBhcmdzOiBudW1iZXIpOmFueVtdIHtcclxuICAgIGlmKCF2YWx1ZSB8fCAhYXJncykge1xyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgfWVsc2Uge1xyXG4gICAgaWYodmFsdWUubGVuZ3RoID4gYXJncyl7XHJcbiAgICAgIHJldHVybiB2YWx1ZS5zbGljZSgwLGFyZ3MpO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgcmV0dXJuIHZhbHVlXHJcbiAgICB9XHJcbiAgfVxyXG4gICAgfVxyXG4gICAgXHJcblxyXG59XHJcbiJdfQ==