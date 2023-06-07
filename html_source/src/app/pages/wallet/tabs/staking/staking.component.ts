import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { VariablesService } from '@parts/services/variables.service';
import { Chart } from 'angular-highcharts';
import { BackendService } from '@api/services/backend.service';
import { ActivatedRoute } from '@angular/router';
import { IntToMoneyPipe } from '@parts/pipes/int-to-money-pipe/int-to-money.pipe';
import { TranslateService } from '@ngx-translate/core';
import { BigNumber } from 'bignumber.js';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-staking',
  template: `
    <div class="chart-wrap" fxFlexFill fxLayout="column">
      <div class="scrolled-content h-100" fxFlex="1 1 auto" fxLayout="column">
        <div class="chart-header mb-1" fxFlex="0 0 auto" fxLayout="column">
          <div
            class="row"
            fxFlex="0 0 auto"
            fxLayout="row nowrap"
            fxLayoutAlign="space-between start"
            fxLayoutGap="1rem"
          >
            <div
              class="left"
              fxFlex="1 1 calc(50% - 0.5rem)"
              fxLayout="row wrap"
              fxLayoutAlign="start center"
              fxLayoutGap="1rem"
            >
              <div class="items" fxLayout="row wrap" fxLayoutGap="1rem">
                <div
                  *ngIf="
                    (!variablesService.currentWallet.is_auditable &&
                      !variablesService.currentWallet.is_watch_only) ||
                    (variablesService.currentWallet.is_auditable &&
                      !variablesService.currentWallet.is_watch_only)
                  "
                  class="item overflow-hidden p-1 border-radius-0_8-rem mb-1"
                  fxLayout="row nowrap"
                  fxLayoutAlign="space-between center"
                >
                  <div
                    class="left overflow-hidden mr-1"
                    fxLayout="row"
                    fxLayoutAlign="start center"
                  >
                    {{ 'STAKING.TITLE' | translate }}
                  </div>

                  <div
                    class="right overflow-hidden w-100"
                    fxLayout="row"
                    fxLayoutAlign="end center"
                  >
                    <app-staking-switch
                      [(staking)]="variablesService.currentWallet.staking"
                      [wallet_id]="variablesService.currentWallet.wallet_id"
                    >
                    </app-staking-switch>
                  </div>
                </div>
                <div
                  class="item overflow-hidden p-1 border-radius-0_8-rem mb-1"
                  fxLayout="row nowrap"
                  fxLayoutAlign="space-between center"
                >
                  <div
                    class="left overflow-hidden mr-1"
                    fxLayout="row"
                    fxLayoutAlign="start center"
                  >
                    {{ 'STAKING.TITLE_PENDING' | translate }}
                    :
                  </div>
                  <div
                    class="right overflow-hidden w-100"
                    fxLayout="row"
                    fxLayoutAlign="end center"
                  >
                    <div class="text-ellipsis mr-1">
                      {{ pending.total | intToMoney }}
                    </div>
                    {{ variablesService.defaultCurrency }}
                  </div>
                </div>
                <div
                  class="item overflow-hidden p-1 border-radius-0_8-rem mb-1"
                  fxLayout="row nowrap"
                  fxLayoutAlign="space-between center"
                >
                  <div
                    class="left overflow-hidden mr-1"
                    fxLayout="row"
                    fxLayoutAlign="start center"
                  >
                    {{ 'STAKING.TITLE_TOTAL' | translate }}
                    :
                  </div>
                  <div
                    class="right overflow-hidden w-100"
                    fxLayout="row"
                    fxLayoutAlign="end center"
                  >
                    <div class="text-ellipsis mr-1">
                      {{ total | intToMoney }}
                    </div>
                    {{ variablesService.defaultCurrency }}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="right"
              fxFlex="1 1 calc(50% - 0.5rem)"
              fxLayout="row"
              fxLayoutAlign="end center"
              fxLayoutGap="1rem"
            >
              <div
                *ngIf="selectedDate && selectedDate.date"
                class="selected overflow-hidden"
                fxHide
                fxShow.lg
                fxShow.xl
              >
                <div class="overflow-hidden" fxLayout="row">
                  <div class="text-ellipsis">
                    {{ selectedDate.date | date : 'EEEE, MMMM d, y' }}
                    {{ selectedDate.amount }}
                  </div>
                  <div class="ml-0_5">
                    {{ variablesService.defaultCurrency }}
                  </div>
                </div>
              </div>

              <ng-select
                (change)="changeGroup($event)"
                [(ngModel)]="selectedGroup"
                [clearable]="false"
                [items]="groups"
                [searchable]="false"
                bindLabel="title"
                bindValue="key"
                class="selected-group max-w-19-rem w-100"
              >
                <ng-template let-item="item" ng-label-tmp>
                  Sort by {{ (item.title | translate | lowercase) + 's' }}
                </ng-template>
                <ng-template let-index="index" let-item="item" ng-option-tmp>
                  {{ item.title | translate }}
                </ng-template>
              </ng-select>
            </div>
          </div>
          <div
            class="row"
            fxFlex="0 0 2rem"
            fxHide.lg
            fxHide.xl
            fxLayout="row nowrap"
            fxLayoutAlign="space-between center"
            fxLayoutGap="1rem"
            fxShow
          >
            <div class="left"></div>
            <div class="right" fxLayoutAlign="end center">
              <div
                *ngIf="selectedDate && selectedDate.date"
                class="selected overflow-hidden"
              >
                <div class="overflow-hidden" fxLayout="row">
                  <div class="text-ellipsis">
                    {{ selectedDate.date | date : 'EEEE, MMMM d, y' }}
                    {{ selectedDate.amount }}
                  </div>
                  <div class="ml-0_5">
                    {{ variablesService.defaultCurrency }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="chart border-radius-0_8-rem"
          fxFlex="1 1 auto"
          fxLayoutAlign=" center"
        >
          <div [chart]="chart"></div>
        </div>

        <div
          class="chart-options mt-2"
          fxFlex="0 0 auto"
          fxLayoutAlign=" center"
        >
          <ng-container *ngFor="let period of periods; let last = last">
            <button
              (click)="changePeriod(period)"
              [class.active]="period.active"
              [class.mr-1]="!last"
              [class.outline]="!last"
              [class.primary]="last"
              class="big w-100"
              type="button"
            >
              {{ period.title }}
            </button>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        width: 100%;
        height: auto;
      }
    `,
  ],
})
export class StakingComponent implements OnInit, OnDestroy {
  periods = [
    {
      title: this.translate.instant('STAKING.PERIOD.WEEK1'),
      key: '1 week',
      active: false,
    },
    {
      title: this.translate.instant('STAKING.PERIOD.WEEK2'),
      key: '2 week',
      active: false,
    },
    {
      title: this.translate.instant('STAKING.PERIOD.MONTH1'),
      key: '1 month',
      active: false,
    },
    {
      title: this.translate.instant('STAKING.PERIOD.MONTH3'),
      key: '3 month',
      active: false,
    },
    {
      title: this.translate.instant('STAKING.PERIOD.MONTH6'),
      key: '6 month',
      active: false,
    },
    {
      title: this.translate.instant('STAKING.PERIOD.YEAR'),
      key: '1 year',
      active: false,
    },
    {
      title: this.translate.instant('STAKING.PERIOD.ALL'),
      key: 'All',
      active: true,
    },
  ];

  groups = [
    {
      title: this.translate.instant('STAKING.GROUP.DAY'),
      key: 'day',
      active: true,
    },
    {
      title: this.translate.instant('STAKING.GROUP.WEEK'),
      key: 'week',
      active: false,
    },
    {
      title: this.translate.instant('STAKING.GROUP.MONTH'),
      key: 'month',
      active: false,
    },
  ];

  selectedGroup = this.groups[0].key;

  selectedDate = {
    date: null,
    amount: null,
  };

  originalData = [];

  chart: Chart;

  total = new BigNumber(0);

  pending = {
    list: [],
    total: new BigNumber(0),
  };

  private destroy$ = new Subject<void>();

  constructor(
    public variablesService: VariablesService,
    private route: ActivatedRoute,
    private backend: BackendService,
    private ngZone: NgZone,
    private intToMoneyPipe: IntToMoneyPipe,
    private translate: TranslateService
  ) {}

  static makeGroupTime(key, date): number {
    if (key === 'day') {
      return date.setHours(0, 0, 0, 0);
    } else if (key === 'week') {
      return new Date(date.setDate(date.getDate() - date.getDay())).setHours(
        0,
        0,
        0,
        0
      );
    } else {
      return new Date(date.setDate(1)).setHours(0, 0, 0, 0);
    }
  }

  ngOnInit(): void {
    this.route.parent.params.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.getMiningHistory();
      },
    });
    this.variablesService.getHeightAppEvent
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (newHeight: number) => {
          if (!this.pending.total.isZero()) {
            const pendingCount = this.pending.list.length;
            for (let i = pendingCount - 1; i >= 0; i--) {
              if (newHeight - this.pending.list[i].h >= 10) {
                this.pending.list.splice(i, 1);
              }
            }
            if (pendingCount !== this.pending.list.length) {
              this.pending.total = new BigNumber(0);
              for (let i = 0; i < this.pending.list.length; i++) {
                this.pending.total = this.pending.total.plus(
                  this.pending.list[i].a
                );
              }
            }
          }
        },
      });
    this.variablesService.getRefreshStackingEvent
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (wallet_id: number) => {
          if (this.variablesService.currentWallet.wallet_id === wallet_id) {
            this.getMiningHistory();
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  drawChart(data): void {
    this.chart = new Chart({
      title: { text: '' },
      credits: { enabled: false },
      exporting: { enabled: false },
      legend: { enabled: false },
      chart: {
        type: 'line',
        backgroundColor: 'transparent',
        height: null,
        events: {
          load: (): void => {
            this.changePeriod();
          },
        },
      },

      yAxis: {
        min: 0,
        tickAmount: 5,
        title: {
          text: '',
        },
        gridLineColor: '#2b3644',
        gridLineWidth: 2,
        lineColor: '#2b3644',
        lineWidth: 2,
        tickWidth: 2,
        tickLength: 120,
        tickColor: '#2b3644',
        labels: {
          y: -8,
          align: 'left',
          x: -120,
          style: {
            color: '#e0e0e0',
            fontSize: '13px',
          },
          format: '{value} ' + this.variablesService.defaultCurrency,
        },
      },

      xAxis: {
        type: 'datetime',
        gridLineColor: '#2b3644',
        lineColor: '#2b3644',
        lineWidth: 2,
        tickWidth: 2,
        tickLength: 10,
        tickColor: '#2b3644',
        labels: {
          style: {
            color: '#e0e0e0',
            fontSize: '13px',
          },
        },
        minPadding: 0,
        maxPadding: 0,
        minRange: 86400000,
        // tickInterval: 86400000,
        minTickInterval: 3600000,
      },

      tooltip: {
        enabled: false,
      },

      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [
              [0, 'rgba(124,181,236,0.2)'],
              [1, 'rgba(124,181,236,0)'],
            ],
          },
          marker: {
            enabled: false,
            radius: 2,
          },
          lineWidth: 2,
          threshold: null,
        },

        series: {
          point: {
            events: {
              mouseOver: (obj): void => {
                this.selectedDate.date = obj.target['x'];
                this.selectedDate.amount = obj.target['y'];
              },
            },
          },
          events: {
            mouseOut: (): void => {
              this.selectedDate.date = null;
              this.selectedDate.amount = null;
            },
          },
        },
      },
      series: [
        {
          type: 'area',
          data: data,
        },
      ],
    });
  }

  getMiningHistory(): void {
    if (this.variablesService.currentWallet.loaded) {
      this.backend.getMiningHistory(
        this.variablesService.currentWallet.wallet_id,
        (status, data) => {
          this.total = new BigNumber(0);
          this.pending.list = [];
          this.pending.total = new BigNumber(0);
          this.originalData = [];
          if (data.mined_entries) {
            data.mined_entries.forEach((item, key) => {
              if (item.t.toString().length === 10) {
                data.mined_entries[key].t = new Date(
                  item.t * 1000
                ).setUTCMilliseconds(0);
              }
            });
            data.mined_entries.forEach(item => {
              this.total = this.total.plus(item.a);
              if (this.variablesService.height_app - item.h < 10) {
                this.pending.list.push(item);
                this.pending.total = this.pending.total.plus(item.a);
              }
              this.originalData.push([
                parseInt(item.t, 10),
                parseFloat(this.intToMoneyPipe.transform(item.a)),
              ]);
            });
            this.originalData = this.originalData.sort(function (a, b) {
              return a[0] - b[0];
            });
          }
          this.ngZone.run(() => {
            this.drawChart([]);
          });
        }
      );
    }
  }

  changePeriod(period?): void {
    if (period) {
      this.periods.forEach(p => {
        p.active = false;
      });
      period.active = true;
    } else {
      period = this.periods.find(p => p.active);
    }

    const d = new Date();
    let min = null;
    const newData = [];

    const group = this.groups.find(g => g.active);

    if (period.key === '1 week') {
      this.originalData.forEach(item => {
        const time = StakingComponent.makeGroupTime(
          group.key,
          new Date(item[0])
        );
        const find = newData.find(itemNew => itemNew[0] === time);
        if (find) {
          find[1] = new BigNumber(find[1]).plus(item[1]).toNumber();
        } else {
          newData.push([time, item[1]]);
        }
      });
      this.chart.ref?.series[0].setData(newData, true);
      min = Date.UTC(
        d.getFullYear(),
        d.getMonth(),
        d.getDate() - 7,
        0,
        0,
        0,
        0
      );
    } else if (period.key === '2 week') {
      this.originalData.forEach(item => {
        const time = StakingComponent.makeGroupTime(
          group.key,
          new Date(item[0])
        );
        const find = newData.find(itemNew => itemNew[0] === time);
        if (find) {
          find[1] = new BigNumber(find[1]).plus(item[1]).toNumber();
        } else {
          newData.push([time, item[1]]);
        }
      });
      this.chart.ref?.series[0].setData(newData, true);
      min = Date.UTC(
        d.getFullYear(),
        d.getMonth(),
        d.getDate() - 14,
        0,
        0,
        0,
        0
      );
    } else if (period.key === '1 month') {
      this.originalData.forEach(item => {
        const time = StakingComponent.makeGroupTime(
          group.key,
          new Date(item[0])
        );
        const find = newData.find(itemNew => itemNew[0] === time);
        if (find) {
          find[1] = new BigNumber(find[1]).plus(item[1]).toNumber();
        } else {
          newData.push([time, item[1]]);
        }
      });
      this.chart.ref?.series[0].setData(newData, true);
      min = Date.UTC(
        d.getFullYear(),
        d.getMonth() - 1,
        d.getDate(),
        0,
        0,
        0,
        0
      );
    } else if (period.key === '3 month') {
      this.originalData.forEach(item => {
        const time = StakingComponent.makeGroupTime(
          group.key,
          new Date(item[0])
        );
        const find = newData.find(itemNew => itemNew[0] === time);
        if (find) {
          find[1] = new BigNumber(find[1]).plus(item[1]).toNumber();
        } else {
          newData.push([time, item[1]]);
        }
      });
      this.chart.ref?.series[0].setData(newData, true);
      min = Date.UTC(
        d.getFullYear(),
        d.getMonth() - 3,
        d.getDate(),
        0,
        0,
        0,
        0
      );
    } else if (period.key === '6 month') {
      this.originalData.forEach(item => {
        const time = StakingComponent.makeGroupTime(
          group.key,
          new Date(item[0])
        );
        const find = newData.find(itemNew => itemNew[0] === time);
        if (find) {
          find[1] = new BigNumber(find[1]).plus(item[1]).toNumber();
        } else {
          newData.push([time, item[1]]);
        }
      });
      this.chart.ref?.series[0].setData(newData, true);
      min = Date.UTC(
        d.getFullYear(),
        d.getMonth() - 6,
        d.getDate(),
        0,
        0,
        0,
        0
      );
    } else if (period.key === '1 year') {
      this.originalData.forEach(item => {
        const time = StakingComponent.makeGroupTime(
          group.key,
          new Date(item[0])
        );
        const find = newData.find(itemNew => itemNew[0] === time);
        if (find) {
          find[1] = new BigNumber(find[1]).plus(item[1]).toNumber();
        } else {
          newData.push([time, item[1]]);
        }
      });
      this.chart.ref?.series[0].setData(newData, true);
      min = Date.UTC(
        d.getFullYear() - 1,
        d.getMonth(),
        d.getDate(),
        0,
        0,
        0,
        0
      );
    } else {
      this.originalData.forEach(item => {
        const time = StakingComponent.makeGroupTime(
          group.key,
          new Date(item[0])
        );
        const find = newData.find(itemNew => itemNew[0] === time);
        if (find) {
          find[1] = new BigNumber(find[1]).plus(item[1]).toNumber();
        } else {
          newData.push([time, item[1]]);
        }
      });
      this.chart.ref?.series[0].setData(newData, true);
    }

    this.chart.ref?.xAxis[0].setExtremes(min, null);
  }

  changeGroup(group): void {
    this.groups.forEach(g => {
      g.active = false;
    });
    group.active = true;
    this.changePeriod();
  }
}
