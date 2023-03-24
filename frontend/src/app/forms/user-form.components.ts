import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/services/service';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import Typewriter from 't-writer.js';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})

export class UserFormComponent implements OnInit {
    submitted = false;
    coverLetter = "";
    readyforGen = localStorage.getItem("personalInfo") !== null;
    generated = false;
    skipTyping = false;
    studentStatuses = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduated'];

    skillForm = this.fb.array([
        this.fb.control('')
    ])

    public experiences: FormArray;
    public experienceForm = this.fb.group({
        experiences: this.fb.array([this.createExperience()])
    })

    userForm = this.fb.group({
        fullName: ['', Validators.required],
        gradeLevel: [''],
        major: [''],
        skills: this.skillForm
    })

    ngOnInit(): void {
        if (localStorage.getItem("personalInfo")) {
            let info = JSON.parse(localStorage.getItem("personalInfo"));
            console.log(info["skills"]);
            let skillObj = Object.values(info["skills"]);
            let skillArr = [];
            for (let i = 0; i < skillObj.length; i++) {
                if (i > 0) {
                    this.addSkill();
                }
                skillArr.push(skillObj[i]);
            }
            this.userForm.patchValue({
                fullName: info["name"],
                gradeLevel: info["gradeLevel"],
                major: info["major"],
                skills: skillArr,
            });
            let experienceObj = Object.keys(info["experiences"]);
            let experienceArr = [];
            for (let i = 0; i < experienceObj.length; i++) {
                if (i > 0 ) {
                    this.addExperience();
                }
                experienceArr.push(info["experiences"][i]);
            }
            this.experienceForm.patchValue({
                experiences: experienceArr,
            })
        }
    }

    constructor(private service: Service, private fb: FormBuilder) { }

    createExperience(): FormGroup {
        return this.fb.group({
            title: '',
            company: '',
            onGoing: '',
            startDate: '',
            endDate: '',
            description: '',
        });
    }

    get experienceControls() {
        return this.experienceForm.get('experiences')['controls'];
    }

    addExperience() {
        this.experiences = this.experienceForm.get('experiences') as FormArray;
        this.experiences.push(this.createExperience());
    }

    removeExperience(i: number) {
        this.experiences.removeAt(i);
    }
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

    onSubmit() {
        this.submitted = true;
        console.log("Made it here");
        let experienceData = this.experienceForm.getRawValue();
        let exp = experienceData.experiences;
        let experienceObj = {};
        for (let i = 0; i < exp.length; i++) {
            if (exp.at(i)['endDate'] == '') {
                exp.at(i)['onGoing'] = true;
            }
            else {
                exp.at(i)['onGoing'] = false;
            }
            experienceObj[i] = exp.at(i);
        }
        let userData = this.userForm.getRawValue();
        let userSkills = userData.skills;
        let skillsObj = {};
        for (let i = 0; i < userSkills.length; i++) {
            skillsObj[i] = userSkills.at(i);
        }
        const returnData = {
            "name": userData.fullName,
            "gradeLevel": userData.gradeLevel,
            "major": userData.major,
            "skills": skillsObj,
            "experiences": experienceObj,
        }
        // console.warn(this.userForm.value);
        console.log(returnData);
        window.localStorage.setItem("personalInfo", JSON.stringify(returnData));
    }

    generate() {
        if (localStorage.getItem("personalInfo") === null) {
            let experienceData = this.experienceForm.getRawValue();
            console.log(experienceData);
            // var personalInfo = localStorage.getItem("personalInfo");
            // this.service.uploadCandidateInfo(returnData).subscribe(
            //     response => {
            //         console.log(response);
            //         this.coverLetter = response['data'];
            //         this.submitted = true;
            //         this.readyforGen = true;
            //     },
            //     error => {
            //         console.log(error);
            //     }
            // )
        }
        this.generated = true;
        let target = document.querySelector('.cl');
        let writer = new Typewriter(target, {
            loop: false,
            typeColor: 'black',
            typeSpeed: 15,
            cursorColor: 'black',
            blinkSpeed: 400,

        });
        writer
            .addCursor()
            .type(this.coverLetter)
            .rest(500)
            .removeCursor()
            .start();
    }

    skipGen() {
        this.skipTyping = true;
    }
}
