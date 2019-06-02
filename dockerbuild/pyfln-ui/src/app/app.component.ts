import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sbs3app';

  showsidebar = false;

  onSidebarToggle(showsidebar: boolean) {
    this.showsidebar = showsidebar;
  }
}
