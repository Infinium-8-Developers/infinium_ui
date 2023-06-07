import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  AsyncCommandResults,
  BackendService,
  CurrentActionState,
  ResponseAsyncTransfer,
  StatusCurrentActionState,
} from '@api/services/backend.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { VariablesService } from '@parts/services/variables.service';
import { filter, takeUntil } from 'rxjs/operators';

const successfulStatuses: string[] = [
  StatusCurrentActionState.STATE_SENDING,
  StatusCurrentActionState.STATE_SENT_SUCCESS,
  StatusCurrentActionState.STATE_INITIALIZING,
  StatusCurrentActionState.STATE_DOWNLOADING_CONSENSUS,
  StatusCurrentActionState.STATE_MAKING_TUNNEL_A,
  StatusCurrentActionState.STATE_MAKING_TUNNEL_B,
  StatusCurrentActionState.STATE_CREATING_STREAM,
  StatusCurrentActionState.STATE_SUCCESS,
];

const failedStatuses: string[] = [StatusCurrentActionState.STATE_SEND_FAILED, StatusCurrentActionState.STATE_FAILED];

@Component({
  selector: 'app-send-details-modal',
  template: `<div
      class="modal p-2 border-radius-0_8-rem bg-light-blue w-100 max-h-100"
      fxFlex="0 1 54rem"
    >
      <div
        class="wrapper w-100"
        fxFlex
        fxLayout="column"
      >
        <h3
          class="title mb-2"
          fxFlex="0 0 auto"
        >
          {{ 'SEND_DETAILS_MODAL.TITLE1' | translate }}
        </h3>

        <div
          class="content mb-2 overflow-x-hidden overflow-y-auto"
          fxFlex="1 1 auto"
          fxLayout="column"
        >
          <div
            class="status mb-2"
            fxFlex="0 0 auto"
            fxLayout="column"
            fxLayoutAlign=" center"
          >
            <div
              *ngIf="isSentSuccess"
              class="image"
            >
              <img
                alt="success"
                src="assets/icons/aqua/transaction_success.svg"
              />
            </div>

            <div
              *ngIf="isSentFailed"
              class="image"
            >
              <img
                alt="failed"
                class="image"
                src="assets/icons/red/transaction_failed.svg"
              />
            </div>

            <div
              *ngIf="!isSentSuccess && !isSentFailed"
              class="loader"
            ></div>

            <p
              class="color-primary mt-2"
              *ngIf="currentActionState$ | async as currentActionState"
            >
              {{
                (currentActionState ? 'TOR_LIB_STATE' + '.' + currentActionState.status : 'TOR_LIB_STATE.STATE_INITIALIZING') | translate
              }}
              {{ !isSentSuccess && !isSentFailed ? '...' : '' }}
            </p>

            <ng-container *ngIf="responseData$ | async as data">
              <ng-container
                *ngTemplateOutlet="
                  errorCodesTemplate;
                  context: {
                    error_code: data.error_code
                  }
                "
              ></ng-container>
            </ng-container>
          </div>

          <div
            class="details border-radius-0_8-rem overflow-hidden"
            fxFlex="0 0 auto"
            fxLayout="column"
          >
            <div
              (click)="isDetailsNotEmpty && toggleDetails()"
              class="header overflow-hidden py-1 px-2 w-100 cursor-pointer"
              fxLayout="row"
              fxLayoutAlign="space-between center"
            >
              <p class="title text-ellipsis mr-2">
                {{ 'SEND_DETAILS_MODAL.TITLE2' | translate }}
              </p>
              <button
                *ngIf="isDetailsNotEmpty"
                fxLayout="row"
                fxLayoutAlign="center center"
              >
                <img
                  *ngIf="!(stateDetails$ | async)"
                  alt="dropdown-arrow-down"
                  src="assets/icons/white/dropdown-arrow-down.svg"
                />
                <img
                  *ngIf="stateDetails$ | async"
                  alt="dropdown-arrow-up"
                  src="assets/icons/white/dropdown-arrow-up.svg"
                />
              </button>
            </div>
            <div
              [class.px-2]="stateDetails$ | async"
              [class.py-1]="stateDetails$ | async"
              [fxHide]="!(stateDetails$ | async)"
              class="details-wrapper"
              fxFlex="1 1 auto"
              fxLayout="row"
            >
              <ul
                #elDetailsList
                class="details-list scrolled-content"
              >
                <li
                  *ngFor="let action of currentActionStates$ | async; let last = last; trackBy: trackBy"
                  class="item mb-1 color-primary"
                  fxLayout="row nowrap"
                  fxLayoutAlign=" center"
                >
                  <span class="text text-ellipsis mr-1"
                    >{{ 'TOR_LIB_STATE' + '.' + action?.status | translate
                    }}{{ last && !isSentSuccess && !isSentFailed ? '...' : '' }}</span
                  >
                  <ng-container *ngIf="!last">
                    <img
                      *ngIf="isSuccess(action)"
                      alt="success"
                      class="image"
                      src="assets/icons/blue/check_with_blue_bg.svg"
                    />

                    <img
                      *ngIf="isFailed(action)"
                      alt="failed"
                      class="image"
                      src="assets/icons/red/transaction_failed.svg"
                    />
                  </ng-container>

                  <ng-container *ngIf="last">
                    <img
                      *ngIf="last && isSentSuccess"
                      alt="success"
                      class="image"
                      src="assets/icons/blue/check_with_blue_bg.svg"
                    />

                    <img
                      *ngIf="last && isSentFailed"
                      alt="failed"
                      class="image"
                      src="assets/icons/red/transaction_failed.svg"
                    />
                  </ng-container>
                </li>

                <ng-container *ngIf="responseData$ | async as data">
                  <li
                    class="item mb-1 color-primary"
                    fxLayout="row nowrap"
                    fxLayoutAlign=" center"
                  >
                    <span class="word-break-break-all"> tx id: {{ data.response_data.tx_hash || '---' }} </span>
                    <app-copy-button
                      *ngIf="data.response_data.tx_hash"
                      [value]="data.response_data.tx_hash"
                      class="ml-1"
                    >
                    </app-copy-button>
                  </li>
                  <li
                    class="item mb-1 color-primary"
                    fxLayout="row nowrap"
                    fxLayoutAlign=" center"
                  >
                    <div class="word-break-break-all">
                      tx size:
                      {{ data.response_data.tx_blob_size }}
                      bytes
                    </div>
                  </li>
                  <li
                    *ngIf="data.error_code !== 'OK'"
                    class="item"
                  >
                    <ng-container
                      *ngTemplateOutlet="
                        errorCodesTemplate;
                        context: {
                          prefix: 'Error:',
                          error_code: data.error_code
                        }
                      "
                    ></ng-container>
                  </li>
                </ng-container>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="controls"
          fxFlex="0 0 auto"
        >
          <button
            (click)="eventClose.emit(success)"
            [disabled]="!isSentSuccess && !isSentFailed"
            class="primary big w-100"
          >
            {{ 'Ok' | translate }}
          </button>
        </div>
      </div>
    </div>

    <ng-template
      #errorCodesTemplate
      let-prefix="prefix"
      let-error_code="error_code"
    >
      <ng-container [ngSwitch]="error_code">
        <ng-container *ngSwitchCase="'NOT_ENOUGH_MONEY'">
          <p class="color-red">{{ prefix }} {{ 'SEND.ERROR_CODES' + '.' + error_code | translate }}</p>
        </ng-container>
        <ng-container *ngSwitchCase="'OK'"></ng-container>
        <ng-container *ngSwitchDefault>
          <p class="color-red">{{ prefix }} {{ error_code }}</p>
        </ng-container>
      </ng-container>
    </ng-template> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendDetailsModalComponent implements OnInit, OnDestroy {
  @HostBinding('class.modal-overlay') modalOverlay = true;

  @Input() job_id: number;

  @Output() eventClose = new EventEmitter<boolean>();

  @ViewChild('elDetailsList', { static: true }) elDetailsList: ElementRef;

  responseData$ = new BehaviorSubject<ResponseAsyncTransfer>(null);

  stateDetails$ = new BehaviorSubject<boolean>(false);

  currentActionState$ = new BehaviorSubject<CurrentActionState>(null);

  currentActionStates$ = new BehaviorSubject<CurrentActionState[]>([]);

  success = false;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private backendService: BackendService, private variablesService: VariablesService, private renderer: Renderer2) {}

  get currentActionState(): CurrentActionState {
    return this.currentActionState$.value;
  }

  get currentActionStates(): CurrentActionState[] {
    return this.currentActionStates$.value;
  }

  get isSentSuccess(): boolean {
    return this.currentActionState && this.currentActionState.status === StatusCurrentActionState.STATE_SENT_SUCCESS;
  }

  get isSentFailed(): boolean {
    return this.currentActionState && this.currentActionState.status === StatusCurrentActionState.STATE_SEND_FAILED;
  }

  get isDetailsNotEmpty(): boolean {
    return !!(this.responseData$.value || this.currentActionStates$.value.length > 0);
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'no-scroll');
    const {
      currentWallet: { wallet_id },
      settings: { appUseTor },
    } = this.variablesService;

    if (appUseTor) {
      this.backendService.handleCurrentActionState$.pipe(takeUntil(this.destroy$)).subscribe({
        next: (currentActionState: CurrentActionState) => {
          this.currentActionState$.next(currentActionState);
          this.currentActionStates$.next([...this.currentActionStates, currentActionState]);
        },
      });
    } else {
      const actionState: CurrentActionState = {
        status: StatusCurrentActionState.STATE_INITIALIZING,
        wallet_id,
      };
      this.currentActionState$.next(actionState);
      this.currentActionStates$.next([...this.currentActionStates, actionState]);
    }

    this.backendService.dispatchAsyncCallResult$
      .pipe(
        filter(({ job_id, response }: AsyncCommandResults) => this.job_id === job_id && !!response),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: ({ response }: AsyncCommandResults) => {
          const {
            response_data: { success },
          } = response;
          this.success = success;
          if (!appUseTor || !success) {
            const actionState: CurrentActionState = {
              status: success ? StatusCurrentActionState.STATE_SENT_SUCCESS : StatusCurrentActionState.STATE_SEND_FAILED,
              wallet_id,
            };
            this.currentActionState$.next(actionState);
            this.currentActionStates$.next([...this.currentActionStates, actionState]);
          }

          this.responseData$.next(response);
        },
      });
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'no-scroll');
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleDetails(): void {
    this.stateDetails$.next(!this.stateDetails$.value);
    setTimeout(() => this.scrollToBottomDetailsList(), 100);
  }

  trackBy(index: number): number {
    return index;
  }

  isSuccess(action: CurrentActionState): boolean {
    return successfulStatuses.includes(action && action.status);
  }

  isFailed(action: CurrentActionState): boolean {
    return failedStatuses.includes(action && action.status);
  }

  private scrollToBottomDetailsList(): void {
    if (this.elDetailsList) {
      const { nativeElement } = this.elDetailsList;
      nativeElement.scrollTop = nativeElement.scrollHeight;
    }
  }
}
