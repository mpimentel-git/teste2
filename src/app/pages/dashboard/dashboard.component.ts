import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public pageTitle!: string;

  constructor(private titleService: Title, private route: ActivatedRoute) {
    this.titleService.setTitle(this.route.snapshot.data['title']);
  }
}
