import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class CouncodePipe {
    transform(value, args) {
        if (!value || !args) {
            return [];
        }
        else {
            if (args.length < 1) {
                return [];
            }
            let result = [];
            for (let index = 0; index < value.length; index++) {
                let element = value[index];
                let a = element.countryName.toLowerCase();
                if (a.indexOf(args.toLowerCase()) != -1) {
                    result.push(element);
                }
            }
            return result;
        }
    }
}
CouncodePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CouncodePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
CouncodePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: CouncodePipe, name: "councode" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CouncodePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'councode'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bmNvZGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3JwLXRyYXZlbC11aS9zcmMvbGliL3NoYXJlZC9waXBlcy9jb3VuY29kZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQU1wRCxNQUFNLE9BQU8sWUFBWTtJQUN2QixTQUFTLENBQUMsS0FBa0IsRUFBRSxJQUFZO1FBQ3hDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDbkIsT0FBTyxFQUFFLENBQUM7U0FDWDthQUNJO1lBQ0gsSUFBRyxJQUFJLENBQUMsTUFBTSxHQUFFLENBQUMsRUFBQztnQkFDaEIsT0FBTyxFQUFFLENBQUM7YUFDVjtZQUNGLElBQUksTUFBTSxHQUFnQixFQUFFLENBQUE7WUFDNUIsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ2pELElBQUksT0FBTyxHQUFjLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFFMUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFHO29CQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUN0QjthQUVGO1lBQ0QsT0FBTyxNQUFNLENBQUM7U0FDZjtJQUNILENBQUM7O3lHQXJCVSxZQUFZO3VHQUFaLFlBQVk7MkZBQVosWUFBWTtrQkFIeEIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsVUFBVTtpQkFDakIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGNvdW50cmllcyB9IGZyb20gJy4uLy4uL2hvbWUtcGFnZS9pbnRlcmZhY2VzJztcclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnY291bmNvZGUnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb3VuY29kZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0odmFsdWU6IGNvdW50cmllc1tdLCBhcmdzOiBzdHJpbmcpOiBjb3VudHJpZXNbXSB7XHJcbiAgICBpZiAoIXZhbHVlIHx8ICFhcmdzKSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBpZihhcmdzLmxlbmd0aDwgMSl7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgfVxyXG4gICAgICBsZXQgcmVzdWx0OiBjb3VudHJpZXNbXSA9IFtdXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB2YWx1ZS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBsZXQgZWxlbWVudDogY291bnRyaWVzID0gdmFsdWVbaW5kZXhdO1xyXG4gICAgICAgIGxldCBhID0gZWxlbWVudC5jb3VudHJ5TmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgXHJcbiAgICAgICAgaWYgKGEuaW5kZXhPZihhcmdzLnRvTG93ZXJDYXNlKCkpICE9IC0xICkge1xyXG4gICAgICAgICAgcmVzdWx0LnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIl19