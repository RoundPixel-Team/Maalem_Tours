import { PipeTransform } from '@angular/core';
import { hotelCities } from '../../home-page/interfaces';
import * as i0 from "@angular/core";
export declare class HotelecitesPipe implements PipeTransform {
    transform(value: hotelCities[], args: string): hotelCities[];
    static ɵfac: i0.ɵɵFactoryDeclaration<HotelecitesPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<HotelecitesPipe, "hotelecites", false>;
}
