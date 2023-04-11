import { Component, OnInit } from '@angular/core';
import { UtilityService } from './services/utility.service';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home'},
    { title: 'Schedule', url: '/schedule', icon: 'alarm' },
    { title: 'Recurring', url: '/recurring', icon: 'infinite' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  isPaneHidden = false;

  constructor(private utilSrv: UtilityService, private authSrv: AuthService) {
    utilSrv.isPaneHidden.subscribe({
      next: (isHidden) => {
        console.log(isHidden)
        this.isPaneHidden = isHidden
      }
    })
  }

  ngOnInit(): void {
    this.authSrv.autoAuthUser()
  }



}
