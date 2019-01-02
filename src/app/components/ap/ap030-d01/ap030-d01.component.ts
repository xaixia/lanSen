import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ap030-d01',
  templateUrl: './ap030-d01.component.html',
  styleUrls: ['./ap030-d01.component.scss']
})
export class Ap030D01Component implements OnInit {

  isDis = true;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = Number.parseInt(params['id']);
      if (id === 1) {
        this.isDis = true;
      } else {
        this.isDis = false;
      }
    });
  }
}
