import { PipeTransform } from '@angular/core';
import { airPorts } from '../../home-page/interfaces';
import * as i0 from "@angular/core";
export declare class CodToCityPipe implements PipeTransform {
    transform(value: string, args: airPorts[]): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CodToCityPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<CodToCityPipe, "codToCity", false>;
}
