export class Transaction {
    constructor(
        public id: number,
        public accountId: string,
        public receiverName: string,
        public ownerName: string,
        public giftId: string,
        public giftName: string,
        public thumnail: string,
        public requestId: string,
        public createdAt: string,
        public updatedAt: string,
        public expirationAt: string,
    ) { }
}