import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Service } from 'src/app/services/service';

@Component({
    selector: 'signup-form',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})

export class SignupFormComponent {

    constructor(private service: Service, private router: Router) {

    }

    ngOnInit() {
        this.service.getUserAuthStatus().subscribe(
            response => {
                if (response.status) {
                    this.router.navigateByUrl('/home');
                }
            }
        )
    }

    submit(data: any) {
        data["username"] = data["email"]
        delete data.confirmPassword
        this.service.createUserProfile(data).subscribe(
            response => {
                this.router.navigateByUrl('/login');
            },
            error => {
                console.log(error);
            }
        )
    }
}