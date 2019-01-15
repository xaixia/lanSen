import { Component, OnInit } from '@angular/core';
import { AppModalConfig } from '../../../common/modal.directive';
import { CommissionComponent } from '../commission/commission.component';
import { OrderEndComponent } from '../order-end/order-end.component';
import { ChangeWorkerComponent } from '../change-worker/change-worker.component';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {

  commissionModalConfig = <AppModalConfig>{
    component: CommissionComponent,
    modalOptions: {
      class: 'app-modal-xl'
    }
  };

  orderEndModalConfig = <AppModalConfig>{
    component: OrderEndComponent,
    modalOptions: {
      class: 'app-modal-xl'
    }
  };

  changeWorkerModalConfig = <AppModalConfig>{
    component: ChangeWorkerComponent,
    modalOptions: {
      class: 'app-modal-xl'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
