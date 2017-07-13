import { OpaqueToken } from '@angular/core';

export let JQ_TOKEN = new OpaqueToken('jQuery');

// export function jQueryFactory() {
//   return window['jQuery'];
// }
//
// export const JQUERY_PROVIDER = [
//   {
//     provide : JQ_TOKEN,
//     useFactory : jQueryFactory
//   }
// ];
