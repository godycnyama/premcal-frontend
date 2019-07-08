// tslint:disable-next-line:max-line-length
import { animate, AnimationTriggerMetadata, state, style, transition, trigger, group, animateChild, query, stagger } from '@angular/animations';

export const slideInLeftAnimation: AnimationTriggerMetadata =
  trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0)',
      }),
    ),
    transition(':enter', [
      group([
        query('@*', animateChild(), { optional: true }),
        style({
          opacity: 0,
          transform: 'translateX(-100%)',
        }),
        animate('1.0s ease-in'),
      ]),
    ]),
    transition(':leave', [
      group([
        query('@*', animateChild(), { optional: true }),
        animate('1.0s ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)',
        })),
      ]),
    ]),
  ]);
export const slideInDownAnimation: AnimationTriggerMetadata =
  trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateY(0)',
      }),
    ),
    transition(':enter', [
      group([
        query('@*', animateChild(), { optional: true }),
        style({
          opacity: 0,
          transform: 'translateY(-100%)',
        }),
        animate('0.5s ease-in'),
      ]),
    ]),
    transition(':leave', [
      group([
        query('@*', animateChild(), { optional: true }),
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)',
        })),
      ]),
    ]),
  ]);

export const itemFadeAnimation: AnimationTriggerMetadata =
  trigger('item', [
    transition(':enter', [
      query('mat-form-field,mat-checkbox, div, quill-editor, p, table' ,
        stagger(75, [
          style({ transform: 'translateY(10%)', opacity: 0 }),
          animate(
            '0.5s ease-in-out',
            style({ transform: 'translateY(0%)', opacity: 1 })
          )
        ]),
        { optional: true }
      )
      /*
      query('*', [
        style({ transform: 'translateX(200px)', opacity: 0 }),
        stagger(100, [
          animate('1200ms cubic-bezier(0.35, 0, 0.25, 1)', style('*'))
        ])
      ])
      */
    ])
  ]);
