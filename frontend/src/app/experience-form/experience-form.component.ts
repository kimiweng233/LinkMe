import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.css']
})
export class ExperienceFormComponent {
  public experiences: FormArray;
  public experienceForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.experienceForm = this.fb.group({
        experiences: this.fb.array([this.createExperience()])
    });
   }

  createExperience(): FormGroup {
    return this.fb.group({
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
    });
  }

  get experienceControls() {
    return this.experienceForm.get('experiences')['controls'];
  }

  addExperience(): void {
    this.experiences = this.experienceForm.get('experiences') as FormArray;
    this.experiences.push(this.createExperience());
  }

  removeExperience(i: number): void {
    this.experiences.removeAt(i);
  }
}
