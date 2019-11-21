export class City {
    constructor(
        public id: number,
        public name: string
    ) { }
}
export class District {
    constructor(
        public id: number,
        public name: string,
        public cityName: string
    ) { }
}