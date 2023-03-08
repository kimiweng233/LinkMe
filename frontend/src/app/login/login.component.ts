import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Service } from 'src/app/services/service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    constructor(private service: Service, private router: Router) {
        if (localStorage.getItem('userData')) {
            this.router.navigateByUrl('/home');
        }
    }

    submit(data: any) {
        this.service.loginUser(data).subscribe(
            response => {
                var responseData = JSON.stringify(response);
                localStorage.setItem('userData', responseData);
                let id = JSON.parse(localStorage.getItem('userData') || '{}').id;
                this.router.navigateByUrl(`/profile/${id}`);
            },
            error => {
                console.log(error);
            }
        )
    }
}
