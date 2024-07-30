import { Injectable, inject } from '@angular/core';
import { ConfirmationApiService } from './confirmation-api.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
export class ConfirmationService {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.api = inject(ConfirmationApiService);
        this.loading = false;
    }
    /**
     * fetching confirmation data
     * update state of [confirmationData:FlightSearchResult] in case of success response
     * update loading state
     * @param searchId
     * @param hgNum
     * @param tok
     */
    getConfirmationDate(searchId, hgNum, tok) {
        this.loading = true;
        this.error = undefined;
        this.api.getConfirmation(hgNum, searchId, tok).subscribe((res) => {
            if (res) {
                this.confirmationData = res;
                this.formatWegoClicktUrl();
                this.loading = false;
            }
        }, (err) => {
            this.error = err;
            this.loading = false;
        });
    }
    /**
     *
     * @returns formatt wgo deeb url
     */
    formatWegoClicktUrl() {
        let comm_currency_code = 'USD';
        let bv_currency_code = 'KWD';
        let transaction_id = this.confirmationData.pnr;
        let total_booking_value = this.confirmationData.fareAmount;
        let commission = total_booking_value * .02;
        let status = 'confirmed';
        if (localStorage.getItem('click_id')) {
            var url = `https://secure.wego.com/analytics/v2/conversions?conversion_id=c-wego-khaleejgate.com&click_id=${localStorage.getItem('click_id')}&comm_currency_code=${comm_currency_code}&bv_currency_code=${bv_currency_code}&transaction_id=${transaction_id}&commission=${commission}&total_booking_value=${total_booking_value}&status=${status}`;
        }
        else {
            console.log("CLICK ID NOT FOUND");
            var url = `https://secure.wego.com/analytics/v2/conversions?conversion_id=c-wego-triphands.com&click_id=${'no_click_id'}&comm_currency_code=${comm_currency_code}&bv_currency_code=${bv_currency_code}&transaction_id=${transaction_id}&commission=${commission}&total_booking_value=${total_booking_value}&status=${status}`;
        }
        this.wgoDeebUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
ConfirmationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConfirmationService, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Injectable });
ConfirmationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConfirmationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConfirmationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybWF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ycC10cmF2ZWwtdWkvc3JjL2xpYi9mbGlnaHQtY29uZmlybWF0aW9uL2NvbmZpcm1hdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7QUFRcEUsTUFBTSxPQUFPLG1CQUFtQjtJQVM5QixZQUFvQixTQUF1QjtRQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBUDNDLFFBQUcsR0FBRyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtRQUVwQyxZQUFPLEdBQWEsS0FBSyxDQUFBO0lBS3NCLENBQUM7SUFFaEQ7Ozs7Ozs7T0FPRztJQUNILG1CQUFtQixDQUFDLFFBQWUsRUFBQyxLQUFZLEVBQUMsR0FBVTtRQUN6RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQTtRQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBQyxFQUFFO1lBQzVELElBQUcsR0FBRyxFQUFDO2dCQUNMLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLENBQUE7Z0JBQzNCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO2dCQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQTthQUNyQjtRQUNILENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFO1lBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUE7WUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7UUFDdEIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBSUQ7OztPQUdHO0lBQ0gsbUJBQW1CO1FBQ2pCLElBQUksa0JBQWtCLEdBQUUsS0FBSyxDQUFDO1FBQzlCLElBQUksZ0JBQWdCLEdBQUUsS0FBSyxDQUFDO1FBQzVCLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUM7UUFDL0MsSUFBSSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDO1FBQzNELElBQUksVUFBVSxHQUFFLG1CQUFtQixHQUFFLEdBQUcsQ0FBQztRQUN6QyxJQUFJLE1BQU0sR0FBRSxXQUFXLENBQUM7UUFDeEIsSUFBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFDO1lBQ2xDLElBQUksR0FBRyxHQUFHLGtHQUFrRyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsa0JBQWtCLHFCQUFxQixnQkFBZ0IsbUJBQW1CLGNBQWMsZUFBZSxVQUFVLHdCQUF3QixtQkFBbUIsV0FBVyxNQUFNLEVBQUUsQ0FBQztTQUNwVjthQUNJO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ2xDLElBQUksR0FBRyxHQUFHLGdHQUFnRyxhQUFhLHVCQUF1QixrQkFBa0IscUJBQXFCLGdCQUFnQixtQkFBbUIsY0FBYyxlQUFlLFVBQVUsd0JBQXdCLG1CQUFtQixXQUFXLE1BQU0sRUFBRSxDQUFDO1NBQy9UO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLDhCQUE4QixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7O2dIQXhEVSxtQkFBbUI7b0hBQW5CLG1CQUFtQixjQUZsQixNQUFNOzJGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29uZmlybWF0aW9uQXBpU2VydmljZSB9IGZyb20gJy4vY29uZmlybWF0aW9uLWFwaS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRmxpZ2h0U2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vZmxpZ2h0LXJlc3VsdC9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IGNvbmZpcm1hdGlvbk1vZGVsIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbmZpcm1hdGlvblNlcnZpY2Uge1xyXG5cclxuICBhcGkgPSBpbmplY3QoQ29uZmlybWF0aW9uQXBpU2VydmljZSlcclxuXHJcbiAgbG9hZGluZyA6IGJvb2xlYW4gPSBmYWxzZVxyXG4gIGNvbmZpcm1hdGlvbkRhdGEhIDogY29uZmlybWF0aW9uTW9kZWwgXHJcbiAgd2dvRGVlYlVybCEgOiBTYWZlVXJsO1xyXG4gIGVycm9yOmFueVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogZmV0Y2hpbmcgY29uZmlybWF0aW9uIGRhdGFcclxuICAgKiB1cGRhdGUgc3RhdGUgb2YgW2NvbmZpcm1hdGlvbkRhdGE6RmxpZ2h0U2VhcmNoUmVzdWx0XSBpbiBjYXNlIG9mIHN1Y2Nlc3MgcmVzcG9uc2VcclxuICAgKiB1cGRhdGUgbG9hZGluZyBzdGF0ZVxyXG4gICAqIEBwYXJhbSBzZWFyY2hJZCBcclxuICAgKiBAcGFyYW0gaGdOdW0gXHJcbiAgICogQHBhcmFtIHRvayBcclxuICAgKi9cclxuICBnZXRDb25maXJtYXRpb25EYXRlKHNlYXJjaElkOnN0cmluZyxoZ051bTpzdHJpbmcsdG9rOnN0cmluZyl7XHJcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlXHJcbiAgICB0aGlzLmVycm9yID0gdW5kZWZpbmVkXHJcbiAgICB0aGlzLmFwaS5nZXRDb25maXJtYXRpb24oaGdOdW0sc2VhcmNoSWQsdG9rKS5zdWJzY3JpYmUoKHJlcyk9PntcclxuICAgICAgaWYocmVzKXtcclxuICAgICAgICB0aGlzLmNvbmZpcm1hdGlvbkRhdGEgPSByZXNcclxuICAgICAgICB0aGlzLmZvcm1hdFdlZ29DbGlja3RVcmwoKVxyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlXHJcbiAgICAgIH1cclxuICAgIH0sKGVycik9PntcclxuICAgICAgdGhpcy5lcnJvciA9IGVyclxyXG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxyXG4gICAgfSlcclxuICB9XHJcblxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHJldHVybnMgZm9ybWF0dCB3Z28gZGVlYiB1cmxcclxuICAgKi9cclxuICBmb3JtYXRXZWdvQ2xpY2t0VXJsKCl7XHJcbiAgICBsZXQgY29tbV9jdXJyZW5jeV9jb2RlID0nVVNEJztcclxuICAgIGxldCBidl9jdXJyZW5jeV9jb2RlID0nS1dEJztcclxuICAgIGxldCB0cmFuc2FjdGlvbl9pZCA9IHRoaXMuY29uZmlybWF0aW9uRGF0YS5wbnI7XHJcbiAgICBsZXQgdG90YWxfYm9va2luZ192YWx1ZSA9IHRoaXMuY29uZmlybWF0aW9uRGF0YS5mYXJlQW1vdW50O1xyXG4gICAgbGV0IGNvbW1pc3Npb24gPXRvdGFsX2Jvb2tpbmdfdmFsdWUgKi4wMjtcclxuICAgIGxldCBzdGF0dXMgPSdjb25maXJtZWQnO1xyXG4gICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NsaWNrX2lkJykpe1xyXG4gICAgICB2YXIgdXJsID0gYGh0dHBzOi8vc2VjdXJlLndlZ28uY29tL2FuYWx5dGljcy92Mi9jb252ZXJzaW9ucz9jb252ZXJzaW9uX2lkPWMtd2Vnby1raGFsZWVqZ2F0ZS5jb20mY2xpY2tfaWQ9JHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2xpY2tfaWQnKX0mY29tbV9jdXJyZW5jeV9jb2RlPSR7Y29tbV9jdXJyZW5jeV9jb2RlfSZidl9jdXJyZW5jeV9jb2RlPSR7YnZfY3VycmVuY3lfY29kZX0mdHJhbnNhY3Rpb25faWQ9JHt0cmFuc2FjdGlvbl9pZH0mY29tbWlzc2lvbj0ke2NvbW1pc3Npb259JnRvdGFsX2Jvb2tpbmdfdmFsdWU9JHt0b3RhbF9ib29raW5nX3ZhbHVlfSZzdGF0dXM9JHtzdGF0dXN9YDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkNMSUNLIElEIE5PVCBGT1VORFwiKTtcclxuICAgICAgdmFyIHVybCA9IGBodHRwczovL3NlY3VyZS53ZWdvLmNvbS9hbmFseXRpY3MvdjIvY29udmVyc2lvbnM/Y29udmVyc2lvbl9pZD1jLXdlZ28tdHJpcGhhbmRzLmNvbSZjbGlja19pZD0keydub19jbGlja19pZCd9JmNvbW1fY3VycmVuY3lfY29kZT0ke2NvbW1fY3VycmVuY3lfY29kZX0mYnZfY3VycmVuY3lfY29kZT0ke2J2X2N1cnJlbmN5X2NvZGV9JnRyYW5zYWN0aW9uX2lkPSR7dHJhbnNhY3Rpb25faWR9JmNvbW1pc3Npb249JHtjb21taXNzaW9ufSZ0b3RhbF9ib29raW5nX3ZhbHVlPSR7dG90YWxfYm9va2luZ192YWx1ZX0mc3RhdHVzPSR7c3RhdHVzfWA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRoaXMud2dvRGVlYlVybCA9IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh1cmwpO1xyXG4gIH1cclxuXHJcblxyXG59XHJcbiJdfQ==