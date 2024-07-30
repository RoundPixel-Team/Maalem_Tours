import { PipeTransform } from '@angular/core';
import { airPorts } from '../../home-page/interfaces';
import * as i0 from "@angular/core";
export declare class FilterCityPipe implements PipeTransform {
    transform(value: airPorts[], args: string): airPorts[];
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterCityPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FilterCityPipe, "filterCity", false>;
}
