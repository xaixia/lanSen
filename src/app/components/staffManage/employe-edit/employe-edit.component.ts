import { Component, OnInit } from '@angular/core';
import { RefuseModalComponent } from '../refuse-modal/refuse-modal.component';
import { AppModalConfig } from '../../../common/modal.directive';

@Component({
  selector: 'app-employe-edit',
  templateUrl: './employe-edit.component.html',
  styleUrls: ['./employe-edit.component.scss']
})
export class EmployeEditComponent implements OnInit {

  refuseModalConfig = <AppModalConfig>{
    component: RefuseModalComponent,
  };
  constructor() { }

  ngOnInit() {
  }

}
