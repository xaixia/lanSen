import { trigger, state, style, transition, animate } from '@angular/animations';

export class AppAnimations {
  static openClose = trigger('openClose', [
    state('open', style({
      display: 'block',
      height: '*',
      opacity: 1,
    })),
    state('closed', style({
      display: 'none',
      height: '0px',
      opacity: 0,
    })),
    transition('open => closed', [
      animate('0.5s')
    ]),
    transition('closed => open', [
      animate('0.5s')
    ]),
    transition('* => closed', [
      animate('0.5s')
    ]),
    transition('* => open', [
      animate('0.5s')
    ]),
    transition('open <=> closed', [
      animate('0.5s')
    ]),
    transition('* => open', [
      animate('0.5s',
        style({ opacity: '*' }),
      ),
    ]),
    transition('* => *', [
      animate('0.5s')
    ]),
  ]);
}
