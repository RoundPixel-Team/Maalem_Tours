import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class HotelecitesPipe {
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
                let a = element.City.toLowerCase();
                let b = element.Country.toLowerCase();
                if (a.indexOf(args.toLowerCase()) != -1 || b.indexOf(args.toLowerCase()) != -1) {
                    result.push(element);
                }
            }
            return result;
        }
    }
}
HotelecitesPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: HotelecitesPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
HotelecitesPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: HotelecitesPipe, name: "hotelecites" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: HotelecitesPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'hotelecites'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG90ZWxlY2l0ZXMucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3JwLXRyYXZlbC11aS9zcmMvbGliL3NoYXJlZC9waXBlcy9ob3RlbGVjaXRlcy5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQU1wRCxNQUFNLE9BQU8sZUFBZTtJQUUxQixTQUFTLENBQUMsS0FBb0IsRUFBRSxJQUFZO1FBQzFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDbkIsT0FBTyxFQUFFLENBQUM7U0FDWDthQUNJO1lBQ0gsSUFBRyxJQUFJLENBQUMsTUFBTSxHQUFFLENBQUMsRUFBQztnQkFDakIsT0FBTyxFQUFFLENBQUM7YUFDVjtZQUNELElBQUksTUFBTSxHQUFrQixFQUFFLENBQUE7WUFDOUIsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ2pELElBQUksT0FBTyxHQUFnQixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFJO29CQUNoRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUN0QjthQUVGO1lBQ0QsT0FBTyxNQUFNLENBQUM7U0FDZjtJQUNILENBQUM7OzRHQXRCVSxlQUFlOzBHQUFmLGVBQWU7MkZBQWYsZUFBZTtrQkFIM0IsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsYUFBYTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGhvdGVsQ2l0aWVzIH0gZnJvbSAnLi4vLi4vaG9tZS1wYWdlL2ludGVyZmFjZXMnO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdob3RlbGVjaXRlcydcclxufSlcclxuZXhwb3J0IGNsYXNzIEhvdGVsZWNpdGVzUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICB0cmFuc2Zvcm0odmFsdWU6IGhvdGVsQ2l0aWVzW10sIGFyZ3M6IHN0cmluZyk6IGhvdGVsQ2l0aWVzW10ge1xyXG4gICAgaWYgKCF2YWx1ZSB8fCAhYXJncykge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgaWYoYXJncy5sZW5ndGg8IDMpe1xyXG4gICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCByZXN1bHQ6IGhvdGVsQ2l0aWVzW10gPSBbXVxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdmFsdWUubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQ6IGhvdGVsQ2l0aWVzID0gdmFsdWVbaW5kZXhdO1xyXG4gICAgICAgIGxldCBhID0gZWxlbWVudC5DaXR5LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgbGV0IGIgPSBlbGVtZW50LkNvdW50cnkudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBpZiAoYS5pbmRleE9mKGFyZ3MudG9Mb3dlckNhc2UoKSkgIT0gLTEgfHwgYi5pbmRleE9mKGFyZ3MudG9Mb3dlckNhc2UoKSkgIT0gLTEgICkge1xyXG4gICAgICAgICAgcmVzdWx0LnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIl19