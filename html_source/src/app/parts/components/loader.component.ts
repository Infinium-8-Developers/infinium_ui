import { Component, Input } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

type LoaderType =
  | 'circle'
  | 'circle-2'
  | 'circle-3'
  | 'dots'
  | 'dots-2'
  | 'pulse';

@Component({
  selector: 'infinium-loader',
  standalone: true,
  template: `
    <ng-container [ngSwitch]="[type]">
      <!-- Loader 1-->
      <div *ngSwitchCase="'circle'" class="loader-1"><span></span></div>

      <!-- Loader 2 -->
      <div *ngSwitchCase="'circle-2'" class="loader-2"><span></span></div>

      <!-- Loader 3 -->
      <div *ngSwitchCase="'circle-3'" class="loader-3"><span></span></div>

      <!-- Loader 4 -->
      <div *ngSwitchCase="'dots'" class="loader-4"><span></span></div>

      <!-- Loader 5 -->
      <div *ngSwitchCase="'dots-2'" class="loader-5"><span></span></div>

      <!-- Loader 6 -->
      <div *ngSwitchCase="'pulse'" class="loader-6"><span></span></div>

      <!-- Default-->
      <div *ngSwitchDefault class="loader-1"><span></span></div>
    </ng-container>
  `,
  styles: [
    `
      /* Loader 1 */
      .loader-1 {
        height: 32px;
        width: 32px;
        -webkit-animation: loader-1-1 4.8s linear infinite;
        animation: loader-1-1 4.8s linear infinite;
      }

      @-webkit-keyframes loader-1-1 {
        0% {
          -webkit-transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
        }
      }

      @keyframes loader-1-1 {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      .loader-1 span {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        height: 32px;
        width: 32px;
        clip: rect(0, 32px, 32px, 16px);
        -webkit-animation: loader-1-2 1.2s linear infinite;
        animation: loader-1-2 1.2s linear infinite;
      }

      @-webkit-keyframes loader-1-2 {
        0% {
          -webkit-transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(220deg);
        }
      }

      @keyframes loader-1-2 {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(220deg);
        }
      }

      .loader-1 span::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        height: 32px;
        width: 32px;
        clip: rect(0, 32px, 32px, 16px);
        border: 3px solid #fff;
        border-radius: 50%;
        -webkit-animation: loader-1-3 1.2s cubic-bezier(0.77, 0, 0.175, 1)
          infinite;
        animation: loader-1-3 1.2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
      }

      @-webkit-keyframes loader-1-3 {
        0% {
          -webkit-transform: rotate(-140deg);
        }
        50% {
          -webkit-transform: rotate(-160deg);
        }
        100% {
          -webkit-transform: rotate(140deg);
        }
      }

      @keyframes loader-1-3 {
        0% {
          transform: rotate(-140deg);
        }
        50% {
          transform: rotate(-160deg);
        }
        100% {
          transform: rotate(140deg);
        }
      }

      /* Loader 2 */
      .loader-2 {
        display: block;
        height: 32px;
        width: 32px;
        -webkit-animation: loader-2-1 3s linear infinite;
        animation: loader-2-1 3s linear infinite;
      }

      @-webkit-keyframes loader-2-1 {
        0% {
          -webkit-transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
        }
      }

      @keyframes loader-2-1 {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      .loader-2 span {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        height: 32px;
        width: 32px;
        clip: rect(16px, 32px, 32px, 0);
        -webkit-animation: loader-2-2 1.5s cubic-bezier(0.77, 0, 0.175, 1)
          infinite;
        animation: loader-2-2 1.5s cubic-bezier(0.77, 0, 0.175, 1) infinite;
      }

      @-webkit-keyframes loader-2-2 {
        0% {
          -webkit-transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
        }
      }

      @keyframes loader-2-2 {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      .loader-2 span::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        height: 32px;
        width: 32px;
        border: 3px solid transparent;
        border-top: 3px solid #fff;
        border-radius: 50%;
        -webkit-animation: loader-2-3 1.5s cubic-bezier(0.77, 0, 0.175, 1)
          infinite;
        animation: loader-2-3 1.5s cubic-bezier(0.77, 0, 0.175, 1) infinite;
      }

      @-webkit-keyframes loader-2-3 {
        0% {
          -webkit-transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
        }
      }

      @keyframes loader-2-3 {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      .loader-2 span::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        height: 32px;
        width: 32px;
        border: 3px solid rgba(255, 255, 255, 0.5);
        border-radius: 50%;
      }

      /* Loader 3 */
      .loader-3 {
        display: block;
        height: 32px;
        width: 32px;
      }

      .loader-3 span {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        height: 32px;
        width: 32px;
      }

      .loader-3 span::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        height: 32px;
        width: 32px;
        border: 3px solid #fff;
        border-bottom: 3px solid transparent;
        border-radius: 50%;
        -webkit-animation: loader-3-1 1.5s cubic-bezier(0.77, 0, 0.175, 1)
          infinite;
        animation: loader-3-1 1.5s cubic-bezier(0.77, 0, 0.175, 1) infinite;
      }

      @-webkit-keyframes loader-3-1 {
        0% {
          -webkit-transform: rotate(0deg);
        }
        40% {
          -webkit-transform: rotate(180deg);
        }
        60% {
          -webkit-transform: rotate(180deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
        }
      }

      @keyframes loader-3-1 {
        0% {
          transform: rotate(0deg);
        }
        40% {
          transform: rotate(180deg);
        }
        60% {
          transform: rotate(180deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      .loader-3 span::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        width: 6px;
        height: 6px;
        background: #fff;
        border-radius: 50%;
        -webkit-animation: loader-3-2 1.5s cubic-bezier(0.77, 0, 0.175, 1)
          infinite;
        animation: loader-3-2 1.5s cubic-bezier(0.77, 0, 0.175, 1) infinite;
      }

      @-webkit-keyframes loader-3-2 {
        0% {
          -webkit-transform: translate3d(0, -32px, 0) scale(0, 2);
          opacity: 0;
        }
        50% {
          -webkit-transform: translate3d(0, 0, 0) scale(1.25, 1.25);
          opacity: 1;
        }
        100% {
          -webkit-transform: translate3d(0, 8px, 0) scale(0, 0);
          opacity: 0;
        }
      }

      @keyframes loader-3-2 {
        0% {
          transform: translate3d(0, -32px, 0) scale(0, 2);
          opacity: 0;
        }
        50% {
          transform: translate3d(0, 0, 0) scale(1.25, 1.25);
          opacity: 1;
        }
        100% {
          transform: translate3d(0, 8px, 0) scale(0, 0);
          opacity: 0;
        }
      }

      /* Loader 4 */
      .loader-4 {
        height: 32px;
        width: 32px;
      }

      .loader-4::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        width: 12px;
        height: 12px;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        background: #fff;
        border-radius: 50%;
        -webkit-animation: loader-4-1 2s cubic-bezier(0.77, 0, 0.175, 1)
          infinite;
        animation: loader-4-1 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
      }

      @-webkit-keyframes loader-4-1 {
        0% {
          -webkit-transform: scale(0);
          opacity: 0;
        }
        50% {
          -webkit-transform: scale(1);
          opacity: 1;
        }
        100% {
          -webkit-transform: scale(0);
          opacity: 0;
        }
      }

      @keyframes loader-4-1 {
        0% {
          transform: scale(0);
          opacity: 0;
        }
        50% {
          transform: scale(1);
          opacity: 1;
        }
        100% {
          transform: scale(0);
          opacity: 0;
        }
      }

      .loader-4 span {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        height: 32px;
        width: 32px;
        -webkit-animation: loader-4-2 2s cubic-bezier(0.77, 0, 0.175, 1)
          infinite;
        animation: loader-4-2 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
      }

      @-webkit-keyframes loader-4-2 {
        0% {
          -webkit-transform: rotate(0deg);
        }
        50% {
          -webkit-transform: rotate(180deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
        }
      }

      @keyframes loader-4-2 {
        0% {
          transform: rotate(0deg);
        }
        50% {
          transform: rotate(180deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      .loader-4 span::before,
      .loader-4 span::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        height: 12px;
        width: 12px;
        background: #fff;
        border-radius: 50%;
        -webkit-animation: loader-4-3 2s cubic-bezier(0.77, 0, 0.175, 1)
          infinite;
        animation: loader-4-3 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
      }

      @-webkit-keyframes loader-4-3 {
        0% {
          -webkit-transform: translate3d(0, 0, 0) scale(1);
        }
        50% {
          -webkit-transform: translate3d(-16px, 0, 0) scale(0.5);
        }
        100% {
          -webkit-transform: translate3d(0, 0, 0) scale(1);
        }
      }

      @keyframes loader-4-3 {
        0% {
          transform: translate3d(0, 0, 0) scale(1);
        }
        50% {
          transform: translate3d(-16px, 0, 0) scale(0.5);
        }
        100% {
          transform: translate3d(0, 0, 0) scale(1);
        }
      }

      .loader-4 span::after {
        -webkit-animation: loader-4-4 2s cubic-bezier(0.77, 0, 0.175, 1)
          infinite;
        animation: loader-4-4 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
      }

      @-webkit-keyframes loader-4-4 {
        0% {
          -webkit-transform: translate3d(0, 0, 0) scale(1);
        }
        50% {
          -webkit-transform: translate3d(16px, 0, 0) scale(0.5);
        }
        100% {
          -webkit-transform: translate3d(0, 0, 0) scale(1);
        }
      }

      @keyframes loader-4-4 {
        0% {
          transform: translate3d(0, 0, 0) scale(1);
        }
        50% {
          transform: translate3d(16px, 0, 0) scale(0.5);
        }
        100% {
          transform: translate3d(0, 0, 0) scale(1);
        }
      }

      /* Loader 5 */
      .loader-5 {
        height: 32px;
        width: 32px;
        -webkit-animation: loader-5-1 2s cubic-bezier(0.77, 0, 0.175, 1)
          infinite;
        animation: loader-5-1 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
      }

      @-webkit-keyframes loader-5-1 {
        0% {
          -webkit-transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
        }
      }

      @keyframes loader-5-1 {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      .loader-5::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: auto;
        margin: auto;
        width: 8px;
        height: 8px;
        background: #fff;
        border-radius: 50%;
        -webkit-animation: loader-5-2 2s cubic-bezier(0.77, 0, 0.175, 1)
          infinite;
        animation: loader-5-2 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
      }

      @-webkit-keyframes loader-5-2 {
        0% {
          -webkit-transform: translate3d(0, 0, 0) scale(1);
        }
        50% {
          -webkit-transform: translate3d(24px, 0, 0) scale(0.5);
        }
        100% {
          -webkit-transform: translate3d(0, 0, 0) scale(1);
        }
      }

      @keyframes loader-5-2 {
        0% {
          transform: translate3d(0, 0, 0) scale(1);
        }
        50% {
          transform: translate3d(24px, 0, 0) scale(0.5);
        }
        100% {
          transform: translate3d(0, 0, 0) scale(1);
        }
      }

      .loader-5::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: auto;
        bottom: 0;
        right: 0;
        margin: auto;
        width: 8px;
        height: 8px;
        background: #fff;
        border-radius: 50%;
        -webkit-animation: loader-5-3 2s cubic-bezier(0.77, 0, 0.175, 1)
          infinite;
        animation: loader-5-3 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
      }

      @-webkit-keyframes loader-5-3 {
        0% {
          -webkit-transform: translate3d(0, 0, 0) scale(1);
        }
        50% {
          -webkit-transform: translate3d(-24px, 0, 0) scale(0.5);
        }
        100% {
          -webkit-transform: translate3d(0, 0, 0) scale(1);
        }
      }

      @keyframes loader-5-3 {
        0% {
          transform: translate3d(0, 0, 0) scale(1);
        }
        50% {
          transform: translate3d(-24px, 0, 0) scale(0.5);
        }
        100% {
          transform: translate3d(0, 0, 0) scale(1);
        }
      }

      .loader-5 span {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        height: 32px;
        width: 32px;
      }

      .loader-5 span::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: auto;
        right: 0;
        margin: auto;
        width: 8px;
        height: 8px;
        background: #fff;
        border-radius: 50%;
        -webkit-animation: loader-5-4 2s cubic-bezier(0.77, 0, 0.175, 1)
          infinite;
        animation: loader-5-4 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
      }

      @-webkit-keyframes loader-5-4 {
        0% {
          -webkit-transform: translate3d(0, 0, 0) scale(1);
        }
        50% {
          -webkit-transform: translate3d(0, 24px, 0) scale(0.5);
        }
        100% {
          -webkit-transform: translate3d(0, 0, 0) scale(1);
        }
      }

      @keyframes loader-5-4 {
        0% {
          transform: translate3d(0, 0, 0) scale(1);
        }
        50% {
          transform: translate3d(0, 24px, 0) scale(0.5);
        }
        100% {
          transform: translate3d(0, 0, 0) scale(1);
        }
      }

      .loader-5 span::after {
        content: '';
        display: block;
        position: absolute;
        top: auto;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        width: 8px;
        height: 8px;
        background: #fff;
        border-radius: 50%;
        -webkit-animation: loader-5-5 2s cubic-bezier(0.77, 0, 0.175, 1)
          infinite;
        animation: loader-5-5 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
      }

      @-webkit-keyframes loader-5-5 {
        0% {
          -webkit-transform: translate3d(0, 0, 0) scale(1);
        }
        50% {
          -webkit-transform: translate3d(0, -24px, 0) scale(0.5);
        }
        100% {
          -webkit-transform: translate3d(0, 0, 0) scale(1);
        }
      }

      @keyframes loader-5-5 {
        0% {
          transform: translate3d(0, 0, 0) scale(1);
        }
        50% {
          transform: translate3d(0, -24px, 0) scale(0.5);
        }
        100% {
          transform: translate3d(0, 0, 0) scale(1);
        }
      }

      /* Loader 6 */
      .loader-6 {
        height: 32px;
        width: 32px;
      }

      .loader-6 span {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        height: 32px;
        width: 32px;
      }

      .loader-6 span::before,
      .loader-6 span::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        height: 32px;
        width: 32px;
        border: 2px solid #fff;
        border-radius: 50%;
        opacity: 0;
        -webkit-animation: loader-6-1 1.5s cubic-bezier(0.075, 0.82, 0.165, 1)
          infinite;
        animation: loader-6-1 1.5s cubic-bezier(0.075, 0.82, 0.165, 1) infinite;
      }

      @-webkit-keyframes loader-6-1 {
        0% {
          -webkit-transform: translate3d(0, 0, 0) scale(0);
          opacity: 1;
        }
        100% {
          -webkit-transform: translate3d(0, 0, 0) scale(1.5);
          opacity: 0;
        }
      }

      @keyframes loader-6-1 {
        0% {
          transform: translate3d(0, 0, 0) scale(0);
          opacity: 1;
        }
        100% {
          transform: translate3d(0, 0, 0) scale(1.5);
          opacity: 0;
        }
      }

      .loader-6 span::after {
        -webkit-animation: loader-6-2 1.5s cubic-bezier(0.075, 0.82, 0.165, 1)
          0.25s infinite;
        animation: loader-6-2 1.5s cubic-bezier(0.075, 0.82, 0.165, 1) 0.25s
          infinite;
      }

      @-webkit-keyframes loader-6-2 {
        0% {
          -webkit-transform: translate3d(0, 0, 0) scale(0);
          opacity: 1;
        }
        100% {
          -webkit-transform: translate3d(0, 0, 0) scale(1);
          opacity: 0;
        }
      }

      @keyframes loader-6-2 {
        0% {
          transform: translate3d(0, 0, 0) scale(0);
          opacity: 1;
        }
        100% {
          transform: translate3d(0, 0, 0) scale(1);
          opacity: 0;
        }
      }
    `,
  ],
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault],
})
export class LoaderComponent {
  @Input()
  type: LoaderType = 'circle';
}
