import { AuthenticationService } from './../../../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PoMenuItem } from '@po-ui/ng-components';
import { User } from './../../../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public pageTitle!: string;
  currentUser!: User | null;
  username: string | undefined;

  menu: Array<PoMenuItem> = [
    { label: 'Opcao 1', link: '/dashboard' },
    { label: 'Logout', action: this.logout.bind(this) }
  ];

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.titleService.setTitle(this.route.snapshot.data['title']);
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit() {

    function capitalizeName(name: string | undefined) {
      if (name) {
        return name.replace(/\b(\w)/g, s => s.toUpperCase());
      }
      else {
        return undefined;
      }
    }

    this.username = this.authenticationService.currentUserValue?.sub;
    this.username = this.username?.replace('.', ' ');
    this.username = capitalizeName(this.username);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}
