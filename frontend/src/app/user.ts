export class User {

    constructor(
        public url: string,
        public fullName: string,
        public studentStatus: string,
        public major: string,
        public skills: object,
        public experience: Array<object>,
    ) { }

}