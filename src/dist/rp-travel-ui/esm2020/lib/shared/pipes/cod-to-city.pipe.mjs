import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class CodToCityPipe {
    transform(value, args) {
        if (!value || !args) {
            return value;
        }
        else {
            for (let index = 0; index < args.length; index++) {
                let element = args[index];
                let a = element.cityCode.toLowerCase();
                if (a == value.toLowerCase()) {
                    return element.cityName;
                }
            }
            return value;
        }
    }
}
CodToCityPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CodToCityPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
CodToCityPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: CodToCityPipe, name: "codToCity" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CodToCityPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'codToCity'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kLXRvLWNpdHkucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3JwLXRyYXZlbC11aS9zcmMvbGliL3NoYXJlZC9waXBlcy9jb2QtdG8tY2l0eS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQU1wRCxNQUFNLE9BQU8sYUFBYTtJQUV4QixTQUFTLENBQUMsS0FBYSxFQUFFLElBQWdCO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDbkIsT0FBTyxLQUFLLENBQUM7U0FDZDthQUNJO1lBRUgsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ2hELElBQUksT0FBTyxHQUFhLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFFdkMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUFHO29CQUM3QixPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUE7aUJBQ3hCO2FBRUY7WUFDRCxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQzs7MEdBbkJVLGFBQWE7d0dBQWIsYUFBYTsyRkFBYixhQUFhO2tCQUh6QixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxXQUFXO2lCQUNsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgYWlyUG9ydHMgfSBmcm9tICcuLi8uLi9ob21lLXBhZ2UvaW50ZXJmYWNlcyc7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ2NvZFRvQ2l0eSdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvZFRvQ2l0eVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuXHJcbiAgdHJhbnNmb3JtKHZhbHVlOiBzdHJpbmcsIGFyZ3M6IGFpclBvcnRzW10pOiBzdHJpbmcge1xyXG4gICAgaWYgKCF2YWx1ZSB8fCAhYXJncykge1xyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcmdzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGxldCBlbGVtZW50OiBhaXJQb3J0cyA9IGFyZ3NbaW5kZXhdO1xyXG4gICAgICAgIGxldCBhID0gZWxlbWVudC5jaXR5Q29kZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgXHJcbiAgICAgICAgaWYgKGEgPT0gdmFsdWUudG9Mb3dlckNhc2UoKSApIHtcclxuICAgICAgICAgIHJldHVybiBlbGVtZW50LmNpdHlOYW1lXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=