import { Component, OnInit } from '@angular/core';
import { AppAnimations } from '../../common/app-animations';
import { AppModalResult, AppModalConfig } from '../../common/modal.directive';
import { PopwindowComponent } from './popwindow/popwindow.component';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss'],
  animations: [ AppAnimations.openClose ],
})
export class DesignComponent implements OnInit {

  searchFormOpend = true;
  infoAreaOpend = true;
  searchModalConfig = <AppModalConfig> {
    component: PopwindowComponent,
    // http://ngx-bootstrap.com/#/modals#modal-options
    // テスト1
    modalOptions: {
      class: 'app-modal-xl'
    }
  };

  defaultModalConfig = <AppModalConfig> {
    component: PopwindowComponent,
  };

  defaultModalData = {
    kbn: 0
  };

  searchModalData = {
    kbn: 1
  };

  constructor(
  ) { }

  ngOnInit() {
  }

  changeSearchForm() {
    this.searchFormOpend = !this.searchFormOpend;
  }

  changeInfoArea() {
    this.infoAreaOpend = !this.infoAreaOpend;
  }

  done(event: AppModalResult) {
    console.log(event);
  }
}
