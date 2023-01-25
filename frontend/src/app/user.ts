export class User {

    constructor(
        public fullName: string,
        public studentStatus: string,
        public experience: object,
        public skills: string[],
        public major?: string,
    ) { }

}