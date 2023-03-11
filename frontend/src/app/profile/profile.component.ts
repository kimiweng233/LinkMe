import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Service } from 'src/app/services/service';
import { Router } from "@angular/router";
import { Profile } from 'src/app/services/service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    profile: Profile;

    constructor(private service: Service, private activatedRoute: ActivatedRoute, private router: Router) {
        
    }

    ngOnInit(): void {
      this.service.receiveLoadingPermission().subscribe(
        response => {
          const userId = this.activatedRoute.snapshot.paramMap.get('id');
          this.service.getCandidateInto(userId).subscribe(
              response => {
                this.profile = response;
                console.log(this.profile);
              },
              error => {
                console.log(error);
              }
          );
        }
      )
    }

    submit() {
        this.service.logoutUser().subscribe(
          response => {
            localStorage.removeItem('userData');
            this.router.navigateByUrl(`/home`);
          },
          error => {
            console.log(error);
          }
        );
    }
}
