import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  description: String;
  constructor() {
    this.description = 'This is a map';
   }

  ngOnInit() {
  }

}
