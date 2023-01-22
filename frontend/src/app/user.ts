export class User {

    constructor(
        public fullName: string,
        public studentStatus: string,
        public experienceDescription: string,
        public experienceStart: string,
        public experienceEnd?: string,  
        public major?: string,
    ) { }

}