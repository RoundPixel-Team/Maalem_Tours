import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class HighlighterPipe {
    transform(text, search) {
        const pattern = search
            .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
            .split(' ')
            .filter((t) => t.length > 0)
            .join('|');
        const regex = new RegExp(pattern, 'gi');
        return search ? text.replace(regex, match => `<strong>${match}</strong>`) : text;
    }
}
HighlighterPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: HighlighterPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
HighlighterPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: HighlighterPipe, name: "highlighter" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: HighlighterPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'highlighter'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0ZXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3JwLXRyYXZlbC11aS9zcmMvbGliL3NoYXJlZC9waXBlcy9oaWdobGlnaHRlci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUtwRCxNQUFNLE9BQU8sZUFBZTtJQUMxQixTQUFTLENBQUMsSUFBWSxFQUFFLE1BQVU7UUFDaEMsTUFBTSxPQUFPLEdBQUcsTUFBTTthQUNuQixPQUFPLENBQUMscUNBQXFDLEVBQUUsTUFBTSxDQUFDO2FBQ3RELEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixNQUFNLENBQUMsQ0FBQyxDQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2FBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNiLE1BQU0sS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV4QyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNuRixDQUFDOzs0R0FWVSxlQUFlOzBHQUFmLGVBQWU7MkZBQWYsZUFBZTtrQkFIM0IsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsYUFBYTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ2hpZ2hsaWdodGVyJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgSGlnaGxpZ2h0ZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgdHJhbnNmb3JtKHRleHQ6IHN0cmluZywgc2VhcmNoOmFueSk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBwYXR0ZXJuID0gc2VhcmNoXHJcbiAgICAgIC5yZXBsYWNlKC9bXFwtXFxbXFxdXFwvXFx7XFx9XFwoXFwpXFwqXFwrXFw/XFwuXFxcXFxcXlxcJFxcfF0vZywgXCJcXFxcJCZcIilcclxuICAgICAgLnNwbGl0KCcgJylcclxuICAgICAgLmZpbHRlcigodDphbnkpID0+IHQubGVuZ3RoID4gMClcclxuICAgICAgLmpvaW4oJ3wnKTtcclxuICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCAnZ2knKTtcclxuXHJcbiAgICByZXR1cm4gc2VhcmNoID8gdGV4dC5yZXBsYWNlKHJlZ2V4LCBtYXRjaCA9PiBgPHN0cm9uZz4ke21hdGNofTwvc3Ryb25nPmApIDogdGV4dDtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==