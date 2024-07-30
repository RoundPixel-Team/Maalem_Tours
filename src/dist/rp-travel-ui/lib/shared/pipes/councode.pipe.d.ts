import { PipeTransform } from '@angular/core';
import { countries } from '../../home-page/interfaces';
import * as i0 from "@angular/core";
export declare class CouncodePipe implements PipeTransform {
    transform(value: countries[], args: string): countries[];
    static ɵfac: i0.ɵɵFactoryDeclaration<CouncodePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<CouncodePipe, "councode", false>;
}
