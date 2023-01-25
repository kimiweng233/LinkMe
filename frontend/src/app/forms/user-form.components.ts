import { Component } from '@angular/core';
import { User } from '../user';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})

export class UserFormComponent {
    
    studentStatuses = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'];

    technicalSkills = ['Java', 'Python', 
                        'C++', 'C', 
                        'C#', 'JavaScript', 
                        'HTML', 'CSS', 
                        'SQL', 'NoSQL', 
                        'React', 'Angular', 
                        'Vue', 'Node', 
                        'Express', 'Django', 
                        'Flask', 'Ruby', 
                        'Rails', 'PHP', 
                        'Laravel', 'Swift', 
                        'Kotlin', 'Android', 
                        'Git',]
    jobExperience = {
        'Title' : '',
        'Company' : '',
        'Start' : '',
        'End' : '',
        'Description' : '',
        'Skiils' : [],
    }
    
    model = new User('Michael Hu', this.studentStatuses[1], this.jobExperience, this.technicalSkills, 'Computer Science');
    
    submitted = false;
    
    onSubmit() { 
        this.submitted = true; 
        console.log("Made it here");
    }

    newUser() {
        this.model = new User('', '', {}, [], '');
    }

    changeBool(val: boolean) {
        val = !val;
    }
}