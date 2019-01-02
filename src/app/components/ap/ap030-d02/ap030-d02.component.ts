import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ap030-d02',
  templateUrl: './ap030-d02.component.html',
  styleUrls: ['./ap030-d02.component.scss']
})
export class Ap030D02Component implements OnInit {

  text = '';

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = Number.parseInt(params['id']);
      if (id === 1) {
        this.text = '承認';
      }
      if (id === 2) {
        this.text = '差戻';
      }
      if (id === 3) {
        this.text = '引戻';
      }
    });
  }
}
