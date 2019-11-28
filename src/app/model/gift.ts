import { City, District } from './address';
import { Account } from './account';
import { Category } from './category';

export class GiftResponse {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public thumbnail: string,
        public gender: string,
        public age_range: string,
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
        public street_name: string,
        public gender: number,
        public age_range: number,
        public thumbnail: string,
        public city: City,
        public district: District,
        public account: Account,
        public category: Category


    ) { }
}
export enum Gender {
    Trai = 1,
    Gái = 2
}
export interface ThumbnailResp {
    file: string;
    progress: string;
    data: {
        url: string
    },
    status: number
}
