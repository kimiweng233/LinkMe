import { Component } from '@angular/core';
import { Service } from 'src/app/services/service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn!: boolean;
  currUserID!: number;

  constructor(private router: Router, private service: Service) {

  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.service.getUserAuthStatus().subscribe(
          response => {
            this.isLoggedIn = response.status;
            if (this.isLoggedIn) {
              this.service.getUserID().subscribe(
                response => {
                  this.currUserID = parseInt(response.ID);
                }
              )
            }
          }
        )
      }
    })
  }
}
