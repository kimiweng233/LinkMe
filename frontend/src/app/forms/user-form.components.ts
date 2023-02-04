import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ExperienceFormComponent } from '../experience-form/experience-form.component';
import { User } from '../user';
import { Service } from 'src/app/services/service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})

export class UserFormComponent {

    @ViewChild(ExperienceFormComponent) exp;
    studentStatuses = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'];

    skillForm = this.fb.array([
        this.fb.control('')
    ])
    url: string;
    experiences: object;
    userForm = this.fb.group({
        url: [''],
        fullName: ['', Validators.required],
        gradeLevel: [''],
        major: [''],
        skills: this.skillForm,
        experiences: [],
    })

    constructor(private service: Service, private fb: FormBuilder) { }
    
    
    // name, student status, major, skills, experience
    model = new User('','', '', '', {}, {});
    
    submitted = false;

    get userFormData() {
        return this.userForm as FormGroup;
    }
    get skills(): FormArray {
        return this.userForm.get('skills') as FormArray;
    }
    addSkill() {
        this.skills.push(this.fb.control(''));
    }
    removeSkill(i: number) {
        this.skills.removeAt(i);
    }
    ngAfterViewInit() {
        this.experiences = this.exp.getRawValue();
    }
    onSubmit() { 
        this.submitted = true; 
        console.log("Made it here");
        
        let temp = this.userForm.getRawValue();
        temp['experiences'].push(this.experiences);
        // const testData = {
        //     "url": "https://www.linkedin.com/jobs/search/?currentJobId=3339978993&f_JT=I&keywords=software%20engineer%20intern",
        //     "name": "Kimi Weng",
        //     "gradeLevel": "Sophomore",
        //     "major": "Computer Science",
        //     "skills": {
        //         "1": "C++",
        //         "2": "Python",
        //         "3": "Javascript",
        //         "4": "Unreal Engine",
        //         "5": "Rust",
        //         "6": "SQL",
        //         "7": "Docker",
        //         "8": "AWS"
        //     },
        //     "experiences": {
        //         "1": {
        //             "title": "MES Software Engineer Intern",
        //             "company": "Yanfeng Automotive Interior Systems Co.",
        //             "onGoing": false,
        //             "startDate": "May 2022",
        //             "endDate": "Jul 2022",
        //             "description": "Self proposed and led a team of two to develop a web application for parsing multiple 1000+ lines of on-site MES engineers’ troubleshooting logs and generating statistical reports with graphics with Javascript and React.js, which greatly increased the efficiency of the employees. Showcased the product in a department-wide presentation and hosted the application on the company network. Troubleshooting company proprietary manufacturing software with SQL on-site to maintain production line uptime."
        //         },
        //         "2": {
        //             "title": "Research Programmer",
        //             "company": "Department of Nuclear Engineering, University of Michigan",
        //             "onGoing": true,
        //             "startDate": "Sep 2022",
        //             "endDate": "n/a",
        //             "description": "Developing AR software for displaying 3D visualizations of radiation signals with C++, Rust, and Unity C#. Iterating on the Marching Cube algorithm that triangulates 3D point cloud data structure and generates a 3D mesh representation that could be displayed in augmented reality efficiently through multithreading with the GPU. Designing data structures and building the data pipeline for parsing and transforming binary data produced by nuclear radiation detectors; contributed to the optimization of the processing algorithm to decrease the run time by 10 times. Presenting results at the Monitoring, Technology, & Verification research fair in Ann Arbor to 100+ researchers."
        //         }
        //     }
        // }
        this.service.uploadCandidateInfo(temp).subscribe(
            response => {
                console.log(response);
                this.submitted = true;
            },
            error => {
                console.log(error);
            }
        )
    }

    newUser() {
        this.model = new User('', '', '', '', {}, {});
    }

    changeBool(val: boolean) {
        val = !val;
    }
}