import { Gift } from './gift';

export class ExchangeRequest {
    constructor(
        public message: string,
        public gift: Gift
    ) { }
}