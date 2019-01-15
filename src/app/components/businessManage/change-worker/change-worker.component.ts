import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-worker',
  templateUrl: './change-worker.component.html',
  styleUrls: ['./change-worker.component.scss']
})
export class ChangeWorkerComponent implements OnInit {

  isChangeWorker = false;
  constructor() { }

  ngOnInit() {
  }

  changeWorker() {
    this.isChangeWorker = true;
  }

}
