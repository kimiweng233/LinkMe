import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Service } from 'src/app/services/service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    constructor(private service: Service, private activatedRoute: ActivatedRoute) {

    }

    ngOnInit(): void {
        const userId = this.activatedRoute.snapshot.paramMap.get('id');
        this.service.getCandidateInto(userId).subscribe(
            response => {
              console.log(response);
            },
            error => {
              console.log(error);
            }
        );
    }

    submit() {
        this.service.logoutUser().subscribe(
          response => {
            localStorage.removeItem('userData');
          },
          error => {
            console.log(error);
          }
        );
    }


}
