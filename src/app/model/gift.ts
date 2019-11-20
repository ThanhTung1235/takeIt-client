export class GiftResponse {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public gender: string,
        public ageRange: string,
        public accountName: string,
        public accountId: number,
        public cityName: string,
        public districtName: string,
        public streetName: string,
        public categoryName: string,
        public createdAt: string,
        public updatedAt: string,
        public deletedAt: string,
        public email: string
    ) { }
}
export class Gift {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public gender: string,
        // tslint:disable-next-line:variable-name
        public age_range: string,

    ) { }
}

