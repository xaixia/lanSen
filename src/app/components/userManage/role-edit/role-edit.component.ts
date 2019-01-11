import { Component, OnInit } from '@angular/core';
import { AppAnimations } from '../../../common/app-animations';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss'],
  animations: [AppAnimations.openClose]
})
export class RoleEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
