import { PipeTransform } from '@angular/core';
import { currencyModel } from '../../home-page/interfaces';
import { HomePageService } from '../../home-page/services/home-page.service';
import * as i0 from "@angular/core";
export declare class ExchangePipe implements PipeTransform {
    home: HomePageService;
    currentCurruncy: currencyModel;
    transform(value: any, args?: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExchangePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<ExchangePipe, "exchange", false>;
}
