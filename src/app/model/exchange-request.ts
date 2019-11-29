import { Gift } from './gift';

export class ExchangeRequest {
    constructor(
        public message: string,
        public gift: Gift
    ) { }
}
export class ExchangeRequestResp {
    constructor(
        public id: number,
        public message: string,
        public accountName: string,
        public giftName: string,
        public thumnail: string,
    ) { }
}