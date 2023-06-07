import { Component, inject, NgZone, OnInit, Renderer2 } from '@angular/core';
import { VariablesService } from '@parts/services/variables.service';
import { BackendService } from '@api/services/backend.service';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { scaleItems } from '@parts/data/scale-items';
import { regExpPassword, InfiniumValidators } from '@parts/utils/infinium-validators';

@Component({
  selector: 'app-settings',
  template: `<div class="page-container">
    <div class="toolbar mb-2">
      <div class="left">
        <button appBackButton class="btn-icon circle big mr-2" type="button">
          <i class="icon dropdown-arrow-left"></i>
        </button>
        <h1>{{ 'SETTINGS.TITLE' | translate }}</h1>
      </div>
      <div class="right"></div>
    </div>

    <div class="page-content">
      <div class="scrolled-content">
        <div
          class="settings"
          fxFlex="0 1 50rem"
          fxFlexFill
          fxLayout="column"
          fxLayoutAlign="start stretch"
          fxLayoutGap="2rem"
        >
          <div class="form__field">
            <label>{{ 'SETTINGS.LANGUAGE.TITLE' | translate }}</label>
            <ng-select
              (change)="onLanguageChange()"
              [(ngModel)]="variablesService.settings.language"
              [clearable]="false"
              [items]="languagesOptions"
              [searchable]="false"
              bindLabel="language"
              bindValue="name"
              class="with-circle"
            >
              <ng-template let-item="item" ng-label-tmp>
                {{ item.language | translate }}
              </ng-template>
              <ng-template let-index="index" let-item="item" ng-option-tmp>
                {{ item.language | translate }}
              </ng-template>
            </ng-select>
          </div>

          <div class="form__field">
            <label>{{ 'SETTINGS.APP_LOCK.TITLE' | translate }}</label>
            <ng-select
              (change)="onLockChange()"
              [(ngModel)]="variablesService.settings.appLockTime"
              [clearable]="false"
              [items]="appLockOptions"
              [searchable]="false"
              bindLabel="translationKey"
              bindValue="time"
              class="with-circle"
            >
              <ng-template let-item="item" ng-label-tmp>
                {{ item.translationKey | translate }}
              </ng-template>
              <ng-template let-index="index" let-item="item" ng-option-tmp>
                {{ item.translationKey | translate }}
              </ng-template>
            </ng-select>
          </div>

          <div class="form__field">
            <label>{{ 'SETTINGS.SCALE.TITLE' | translate }}</label>
            <ng-select
              (change)="setScale()"
              [(ngModel)]="variablesService.settings.scale"
              [clearable]="false"
              [items]="appScaleOptions"
              [searchable]="false"
              bindLabel="name"
              bindValue="value"
              class="with-circle"
            >
              <ng-template let-item="item" ng-label-tmp>
                {{ item.name | translate }}
              </ng-template>
              <ng-template let-index="index" let-item="item" ng-option-tmp>
                {{ item.name | translate }}
              </ng-template>
            </ng-select>
          </div>

          <div class="form__field">
            <label>{{ 'SETTINGS.APP_LOG_TITLE' | translate }}</label>
            <ng-select
              (change)="onLogChange()"
              [(ngModel)]="variablesService.settings.appLog"
              [clearable]="false"
              [items]="appLogOptions"
              [searchable]="false"
              bindLabel="id"
              bindValue="id"
              class="with-circle"
            >
            </ng-select>
          </div>

          <div class="form__field">
            <label>{{ 'SETTINGS.NOTIFICATIONS' | translate }}</label>
            <app-switch
              (emitChange)="toggleNotifications()"
              [value]="currentNotificationsState"
            ></app-switch>
          </div>

          <div class="form__field">
            <label>{{
              'SETTINGS.USE_TOR_TO_RELAY_TRANSACTIONS' | translate
            }}</label>
            <app-switch
              (emitChange)="toggleUseTor()"
              [value]="appUseTor"
            ></app-switch>
          </div>

          <form
            (ngSubmit)="onSubmitChangePass()"
            [formGroup]="changeForm"
            class="form"
          >
            <h4 class="master-password-title mb-2">
              {{ 'SETTINGS.MASTER_PASSWORD.TITLE' | translate }}
            </h4>

            <div *ngIf="variablesService.appPass" class="form__field">
              <label for="old-password">{{
                'SETTINGS.MASTER_PASSWORD.OLD' | translate
              }}</label>
              <input
                (contextmenu)="
                  variablesService.onContextMenuPasteSelect($event)
                "
                [class.invalid]="
                  changeForm.invalid &&
                  changeForm.controls['password'].valid &&
                  (changeForm.controls['password'].dirty ||
                    changeForm.controls['password'].touched) &&
                  changeForm.errors &&
                  changeForm.errors['pass_mismatch'] &&
                  changeForm.get('password').value.length > 0
                "
                class="form__field--input"
                formControlName="password"
                id="old-password"
                placeholder="{{ 'PLACEHOLDERS.PLACEHOLDER_OLD' | translate }}"
                type="password"
              />
              <div
                *ngIf="
                  changeForm.invalid &&
                  changeForm.controls['password'].valid &&
                  (changeForm.controls['password'].dirty ||
                    changeForm.controls['password'].touched) &&
                  changeForm.errors &&
                  changeForm.errors['pass_mismatch'] &&
                  changeForm.get('password').value.length > 0
                "
                class="error"
              >
                {{ 'SETTINGS.FORM_ERRORS.PASS_NOT_MATCH' | translate }}
              </div>
            </div>

            <div class="form__field">
              <label for="new-password">{{
                'SETTINGS.MASTER_PASSWORD.NEW' | translate
              }}</label>
              <input
                (contextmenu)="
                  variablesService.onContextMenuPasteSelect($event)
                "
                [class.invalid]="
                  changeForm.controls['new_password'].touched &&
                  changeForm.controls['new_password'].invalid
                "
                class="form__field--input"
                formControlName="new_password"
                id="new-password"
                placeholder="{{ 'PLACEHOLDERS.PLACEHOLDER_NEW' | translate }}"
                type="password"
              />
              <div
                *ngIf="
                  changeForm.controls['new_password'].touched &&
                  changeForm.controls['new_password'].invalid
                "
                class="error"
              >
                <div
                  *ngIf="changeForm.controls['new_password'].errors?.pattern"
                >
                  {{ 'ERRORS.WRONG_PASSWORD' | translate }}
                </div>
                <div
                  *ngIf="
                    changeForm.controls['new_password'].hasError('required')
                  "
                >
                  {{ 'ERRORS.REQUIRED' | translate }}
                </div>
              </div>
            </div>

            <div class="form__field">
              <label for="confirm-password">{{
                'SETTINGS.MASTER_PASSWORD.CONFIRM' | translate
              }}</label>
              <input
                (contextmenu)="
                  variablesService.onContextMenuPasteSelect($event)
                "
                [class.invalid]="
                  changeForm.invalid &&
                  (changeForm.controls['new_confirmation'].dirty ||
                    changeForm.controls['new_confirmation'].touched) &&
                  changeForm.errors &&
                  changeForm.errors['mismatch'] &&
                  changeForm.get('new_confirmation').value.length > 0
                "
                class="form__field--input"
                formControlName="new_confirmation"
                id="confirm-password"
                placeholder="{{
                  'PLACEHOLDERS.PLACEHOLDER_CONFIRM' | translate
                }}"
                type="password"
              />
              <div
                *ngIf="
                  changeForm.invalid &&
                  (changeForm.controls['new_confirmation'].dirty ||
                    changeForm.controls['new_confirmation'].touched) &&
                  changeForm.errors &&
                  changeForm.errors['mismatch'] &&
                  changeForm.get('new_confirmation').value.length > 0
                "
                class="error"
              >
                {{ 'SETTINGS.FORM_ERRORS.CONFIRM_NOT_MATCH' | translate }}
              </div>
            </div>

            <div class="submit-button-container">
              <button
                [disabled]="!changeForm.valid"
                class="primary big max-w-19-rem w-100"
                type="submit"
              >
                {{ 'SETTINGS.MASTER_PASSWORD.BUTTON' | translate }}
              </button>
              <span
                *ngIf="ifSaved"
                [class.active]="ifSaved"
                class="ml-1 color-aqua"
                >{{ 'SETTINGS.SETTINGS_SAVED' | translate }}</span
              >
            </div>
          </form>
          <p>Build version: {{ currentBuild }}</p>
        </div>
      </div>
    </div>
  </div> `,
  styles: [
    `
      :host {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    `,
  ],
})
export class SettingsComponent implements OnInit {
  ifSaved = false;

  scale: string;

  appUseTor: boolean;

  fb = inject(FormBuilder);

  changeForm = this.fb.group(
    {
      password: this.fb.nonNullable.control(
        '',
        Validators.compose([Validators.pattern(regExpPassword)])
      ),
      new_password: this.fb.nonNullable.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(regExpPassword),
        ])
      ),
      new_confirmation: this.fb.nonNullable.control(''),
      appPass: this.fb.nonNullable.control(this.variablesService.appPass ?? ''),
    },
    {
      validators: [
        InfiniumValidators.formMatch('new_password', 'new_confirmation'),
        InfiniumValidators.formMatch('password', 'appPass', 'pass_mismatch'),
      ],
    }
  );

  public currentNotificationsState;

  languagesOptions = [
    {
      name: 'en',
      language: 'SETTINGS.LANGUAGE.EN',
    },
    {
      name: 'fr',
      language: 'SETTINGS.LANGUAGE.FR',
    },
    {
      name: 'de',
      language: 'SETTINGS.LANGUAGE.DE',
    },
    {
      name: 'id',
      language: 'SETTINGS.LANGUAGE.ID',
    },
    {
      name: 'it',
      language: 'SETTINGS.LANGUAGE.IT',
    },
    {
      name: 'pt',
      language: 'SETTINGS.LANGUAGE.PT',
    },
  ];

  appLockOptions = [
    {
      time: 5,
      translationKey: 'SETTINGS.APP_LOCK.TIME1',
    },
    {
      time: 15,
      translationKey: 'SETTINGS.APP_LOCK.TIME2',
    },
    {
      time: 60,
      translationKey: 'SETTINGS.APP_LOCK.TIME3',
    },
    {
      time: 0,
      translationKey: 'SETTINGS.APP_LOCK.TIME4',
    },
  ];

  appScaleOptions = scaleItems;

  appLogOptions = [
    {
      id: -1,
    },
    {
      id: 0,
    },
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
  ];

  currentBuild = '';

  appPass: any;

  constructor(
    public translate: TranslateService,
    public variablesService: VariablesService,
    private renderer: Renderer2,
    private backend: BackendService,
    private ngZone: NgZone
  ) {
    this.scale = this.variablesService.settings.scale;
    this.appUseTor = this.variablesService.settings.appUseTor;
  }

  ngOnInit(): void {
    this.backend.getVersion((version, type) => {
      this.ngZone.run(() => {
        this.currentBuild = version;
        this.variablesService.testnet = false;
        if (type === 'testnet') {
          this.currentBuild += ' TESTNET';
          this.variablesService.testnet = true;
        }
        this.variablesService.networkType = type;
      });
    });
    this.backend.getIsDisabledNotifications(res => {
      this.currentNotificationsState = res;
    });
  }

  setScale(): void {
    this.scale = this.variablesService.settings.scale;
    this.renderer.setStyle(document.documentElement, 'font-size', this.scale);
    this.backend.storeAppData();
  }

  onSubmitChangePass(): void {
    if (this.changeForm.valid) {
      this.variablesService.appPass = this.changeForm.get('new_password').value;

      this.backend.setMasterPassword(
        { pass: this.variablesService.appPass },
        (status, data) => {
          if (status) {
            this.backend.storeSecureAppData({
              pass: this.variablesService.appPass,
            });
            this.variablesService.appLogin = true;
            this.variablesService.dataIsLoaded = true;
            if (this.variablesService.settings.appLockTime) {
              this.variablesService.startCountdown();
            }
            this.onSave();
          } else {
            console.log(data['error_code']);
          }
        }
      );

      this.changeForm.reset();
    }
  }

  toggleNotifications(): void {
    if (!this.currentNotificationsState) {
      this.backend.setIsDisabledNotifications('true');
      this.currentNotificationsState = true;
    } else {
      this.backend.setIsDisabledNotifications('false');
      this.currentNotificationsState = false;
    }
  }

  toggleUseTor(): void {
    this.appUseTor = !this.appUseTor;
    this.variablesService.settings.appUseTor = this.appUseTor;
    this.backend.setEnableTor(this.appUseTor);
    this.backend.storeAppData();
  }

  onSave(): void {
    this.ifSaved = true;
    setTimeout(() => {
      this.ifSaved = false;
    }, 3000);
  }

  onLockChange(): void {
    this.variablesService.restartCountdown();
  }

  onLogChange(): void {
    this.backend.setLogLevel(this.variablesService.settings.appLog);
    this.backend.storeAppData();
  }

  onLanguageChange(): void {
    this.translate.use(this.variablesService.settings.language);
    this.backend.storeAppData();
  }
}
