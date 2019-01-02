import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, ActivatedRouteSnapshot, Router } from '@angular/router';
import { BaseService } from '../../../common/base.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridOptions, GridApi, ColGroupDef, ColDef } from 'ag-grid-community';
import { PaginationApi } from '../../common/pagination/pagination.component';
import { AppAnimations } from '../../../common/app-animations';
import { checkAndUpdateDirectiveDynamic } from '@angular/core/src/view/provider';
declare let $: any;

@Component({
  selector: 'app-bu040-d02',
  templateUrl: './bu040-d02.component.html',
  styleUrls: ['./bu040-d02.component.scss'],
  animations: [ AppAnimations.openClose ]
})
export class Bu040D02Component implements OnInit {

  public form: FormGroup;
  public messageUseFlag: true;
  public opencontraction = true;
  public SearcBtnContent = '検索条件+';

  paginationApi: PaginationApi;

  constructor(
    private fb: FormBuilder,
    private el: ElementRef
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.messageUseFlag = true;
  }
    /**
   * createForm
   */
  createForm(): void {
    this.form = this.fb.group({
    });
  }

  conditionPanelOpenOrClose() {
    if (this.opencontraction) {
      // $(this.conditonPanel.nativeElement).slideUp(500);
      this.opencontraction = false;
      this.SearcBtnContent = '検索条件+';
    } else {
      // $(this.conditonPanel.nativeElement).slideDown(500);
      this.opencontraction = true;
      this.SearcBtnContent = '検索条件-';
    }
  }

  messageUseChange(event: any) {
    const useFlag = event.target.checked;
    this.messageUseFlag = useFlag;
  }

}
