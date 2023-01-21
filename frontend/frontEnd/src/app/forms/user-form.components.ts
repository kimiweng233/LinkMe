import { Component } from '@angular/core';
import { User } from '../user';

@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
    
    studentStatuses = ['Fresh - Junior', 'Senior', 'Graduate'];
    jobExperience = "Conducting weekly help sessions for women of underrepresented groups in their AP Computer Science A/P classes focused on fundamentals of programming in Java and Python Leading a 3-hour intensive program that occurs once per month to introduce object-oriented programming concepts such as class design, polymorphism and inheritance, and abstraction";
    model = new User('Michael Hu', 'Computer Science', this.studentStatuses[1], this.jobExperience, '2017-01-01', '2017-12-31');
    submitted = false;
    onSubmit() { this.submitted = true; }

}