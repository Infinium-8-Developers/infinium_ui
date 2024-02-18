(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./no-wallet/no-wallet.module": [
		"./src/app/pages/auth/no-wallet/no-wallet.module.ts",
		"common"
	],
	"./pages/auth/auth.module": [
		"./src/app/pages/auth/auth.module.ts",
		"common",
		"pages-auth-auth-module"
	],
	"./pages/ui-kit/ui-kit.module": [
		"./src/app/pages/ui-kit/ui-kit.module.ts",
		"pages-ui-kit-ui-kit-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		var id = ids[0];
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/_helpers/data/scale-items.ts":
/*!**********************************************!*\
  !*** ./src/app/_helpers/data/scale-items.ts ***!
  \**********************************************/
/*! exports provided: scaleItems */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleItems", function() { return scaleItems; });
/** List of items with supported scale */
var scaleItems = [
    {
        value: '8px',
        name: 'SETTINGS.SCALE.75'
    },
    {
        value: '10px',
        name: 'SETTINGS.SCALE.100'
    },
    {
        value: '12px',
        name: 'SETTINGS.SCALE.125'
    },
    {
        value: '14px',
        name: 'SETTINGS.SCALE.150'
    }
];


/***/ }),

/***/ "./src/app/_helpers/directives/input-disable-selection/input-disable-selection.directive.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/_helpers/directives/input-disable-selection/input-disable-selection.directive.ts ***!
  \**************************************************************************************************/
/*! exports provided: InputDisableSelectionDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputDisableSelectionDirective", function() { return InputDisableSelectionDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var InputDisableSelectionDirective = /** @class */ (function () {
    function InputDisableSelectionDirective() {
    }
    InputDisableSelectionDirective.prototype.handleInput = function (event) {
        if (event.target.readOnly) {
            event.preventDefault();
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('mousedown', ['$event']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Event]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], InputDisableSelectionDirective.prototype, "handleInput", null);
    InputDisableSelectionDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: 'input'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], InputDisableSelectionDirective);
    return InputDisableSelectionDirective;
}());



/***/ }),

/***/ "./src/app/_helpers/directives/input-validate/input-validate.directive.ts":
/*!********************************************************************************!*\
  !*** ./src/app/_helpers/directives/input-validate/input-validate.directive.ts ***!
  \********************************************************************************/
/*! exports provided: InputValidateDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputValidateDirective", function() { return InputValidateDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_variables_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/variables.service */ "./src/app/_helpers/services/variables.service.ts");



var InputValidateDirective = /** @class */ (function () {
    function InputValidateDirective(el, variablesService) {
        this.el = el;
        this.variablesService = variablesService;
    }
    Object.defineProperty(InputValidateDirective.prototype, "defineInputType", {
        set: function (type) {
            this.type = type;
        },
        enumerable: true,
        configurable: true
    });
    InputValidateDirective.prototype.handleInput = function (event) {
        if (this.type === 'money') {
            this.moneyValidation(event);
        }
        else if (this.type === 'integer') {
            this.integerValidation(event);
        }
    };
    InputValidateDirective.prototype.moneyValidation = function (event) {
        var currentValue = event.target.value;
        var originalValue = currentValue;
        var OnlyD = /[^\d\.]/g;
        var _has_error = currentValue.match(OnlyD);
        if (_has_error && _has_error.length) {
            currentValue = currentValue.replace(',', '.').replace(OnlyD, '');
        }
        var _double_separator = currentValue.match(/\./g);
        if (_double_separator && _double_separator.length > 1) {
            currentValue = currentValue.substr(0, currentValue.lastIndexOf('.'));
        }
        if (currentValue.indexOf('.') === 0) {
            currentValue = '0' + currentValue;
        }
        var _zero_fill = currentValue.split('.');
        if (_zero_fill[0].length > 7) {
            _zero_fill[0] = _zero_fill[0].substr(0, 7);
        }
        if (1 in _zero_fill && _zero_fill[1].length) {
            _zero_fill[1] = _zero_fill[1].substr(0, this.variablesService.digits);
        }
        currentValue = _zero_fill.join('.');
        if (currentValue !== originalValue) {
            event.target.value = currentValue;
            var cursorPosition = event.target.selectionEnd;
            event.target.setSelectionRange(cursorPosition, cursorPosition);
            event.target.dispatchEvent(new Event('input'));
        }
    };
    InputValidateDirective.prototype.integerValidation = function (event) {
        var currentValue = event.target.value;
        var originalValue = currentValue;
        var OnlyD = /\D/g;
        var _has_error = currentValue.match(OnlyD);
        if (_has_error && _has_error.length) {
            currentValue = currentValue.replace(OnlyD, '');
        }
        if (currentValue !== originalValue) {
            var cursorPosition = event.target.selectionEnd;
            event.target.value = currentValue;
            event.target.setSelectionRange(cursorPosition, cursorPosition);
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('appInputValidate'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [String])
    ], InputValidateDirective.prototype, "defineInputType", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('input', ['$event']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Event]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], InputValidateDirective.prototype, "handleInput", null);
    InputValidateDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[appInputValidate]'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _services_variables_service__WEBPACK_IMPORTED_MODULE_2__["VariablesService"]])
    ], InputValidateDirective);
    return InputValidateDirective;
}());



/***/ }),

/***/ "./src/app/_helpers/directives/staking-switch/staking-switch.component.html":
/*!**********************************************************************************!*\
  !*** ./src/app/_helpers/directives/staking-switch/staking-switch.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"switch\"\n     (click)=\"toggleStaking(); $event.stopPropagation()\"\n     [class.on]=\"staking\"\n     [class.off]=\"!staking\">\n    <span class=\"circle\"></span>\n</div>\n"

/***/ }),

/***/ "./src/app/_helpers/directives/staking-switch/staking-switch.component.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/_helpers/directives/staking-switch/staking-switch.component.scss ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19oZWxwZXJzL2RpcmVjdGl2ZXMvc3Rha2luZy1zd2l0Y2gvc3Rha2luZy1zd2l0Y2guY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/_helpers/directives/staking-switch/staking-switch.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/_helpers/directives/staking-switch/staking-switch.component.ts ***!
  \********************************************************************************/
/*! exports provided: StakingSwitchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StakingSwitchComponent", function() { return StakingSwitchComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_backend_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _services_variables_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/variables.service */ "./src/app/_helpers/services/variables.service.ts");




var StakingSwitchComponent = /** @class */ (function () {
    function StakingSwitchComponent(backend, variablesService) {
        this.backend = backend;
        this.variablesService = variablesService;
        this.stakingChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    StakingSwitchComponent.prototype.ngOnInit = function () {
    };
    StakingSwitchComponent.prototype.toggleStaking = function () {
        var wallet = this.variablesService.getWallet(this.wallet_id);
        if (wallet && wallet.loaded) {
            this.stakingChange.emit(!this.staking);
            if (!this.staking) {
                this.backend.startPosMining(this.wallet_id);
            }
            else {
                this.backend.stopPosMining(this.wallet_id);
            }
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], StakingSwitchComponent.prototype, "wallet_id", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], StakingSwitchComponent.prototype, "staking", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], StakingSwitchComponent.prototype, "stakingChange", void 0);
    StakingSwitchComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-staking-switch',
            template: __webpack_require__(/*! ./staking-switch.component.html */ "./src/app/_helpers/directives/staking-switch/staking-switch.component.html"),
            styles: [__webpack_require__(/*! ./staking-switch.component.scss */ "./src/app/_helpers/directives/staking-switch/staking-switch.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_backend_service__WEBPACK_IMPORTED_MODULE_2__["BackendService"], _services_variables_service__WEBPACK_IMPORTED_MODULE_3__["VariablesService"]])
    ], StakingSwitchComponent);
    return StakingSwitchComponent;
}());



/***/ }),

/***/ "./src/app/_helpers/directives/staking-switch/staking-switch.module.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/_helpers/directives/staking-switch/staking-switch.module.ts ***!
  \*****************************************************************************/
/*! exports provided: StakingSwitchModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StakingSwitchModule", function() { return StakingSwitchModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _staking_switch_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./staking-switch.component */ "./src/app/_helpers/directives/staking-switch/staking-switch.component.ts");




var StakingSwitchModule = /** @class */ (function () {
    function StakingSwitchModule() {
    }
    StakingSwitchModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_staking_switch_component__WEBPACK_IMPORTED_MODULE_3__["StakingSwitchComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            exports: [_staking_switch_component__WEBPACK_IMPORTED_MODULE_3__["StakingSwitchComponent"]]
        })
    ], StakingSwitchModule);
    return StakingSwitchModule;
}());



/***/ }),

/***/ "./src/app/_helpers/directives/tooltip.directive.ts":
/*!**********************************************************!*\
  !*** ./src/app/_helpers/directives/tooltip.directive.ts ***!
  \**********************************************************/
/*! exports provided: TooltipDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooltipDirective", function() { return TooltipDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");



var TooltipDirective = /** @class */ (function () {
    function TooltipDirective(el, renderer, sanitizer) {
        this.el = el;
        this.renderer = renderer;
        this.sanitizer = sanitizer;
        this.timeout = 0;
        this.timeDelay = 0;
        this.delay = 0;
        this.showWhenNoOverflow = true;
        this.onHide = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    TooltipDirective.prototype.onMouseEnter = function () {
        var _this = this;
        if (this.showWhenNoOverflow || (!this.showWhenNoOverflow && this.el.nativeElement.offsetWidth < this.el.nativeElement.scrollWidth)) {
            this.cursor = 'pointer';
            if (!this.tooltip) {
                if (this.timeDelay !== 0) {
                    this.removeTooltipTimeDelay = setTimeout(function () {
                        _this.show();
                    }, this.timeDelay);
                }
                else {
                    this.show();
                }
            }
            else {
                this.cancelHide();
            }
        }
    };
    TooltipDirective.prototype.onMouseLeave = function () {
        clearTimeout(this.removeTooltipTimeDelay);
        if (this.tooltip) {
            this.hide();
        }
    };
    TooltipDirective.prototype.show = function () {
        this.create();
        this.placement = this.placement === null ? 'top' : this.placement;
        this.setPosition(this.placement);
    };
    TooltipDirective.prototype.hide = function () {
        var _this = this;
        this.removeTooltipTimeout = setTimeout(function () {
            _this.renderer.setStyle(_this.tooltip, 'opacity', '0');
            _this.removeTooltipTimeoutInner = setTimeout(function () {
                _this.renderer.removeChild(document.body, _this.tooltip);
                _this.tooltip.removeEventListener('mouseenter', _this.enter);
                _this.tooltip.removeEventListener('mouseleave', _this.leave);
                _this.tooltip = null;
                _this.onHide.emit(true);
            }, _this.delay);
        }, this.timeout);
    };
    TooltipDirective.prototype.cancelHide = function () {
        clearTimeout(this.removeTooltipTimeout);
        clearTimeout(this.removeTooltipTimeoutInner);
        this.renderer.setStyle(this.tooltip, 'opacity', '1');
    };
    TooltipDirective.prototype.create = function () {
        var _this = this;
        this.tooltip = this.renderer.createElement('div');
        var innerBlock = this.renderer.createElement('div');
        if (typeof this.tooltipInner === 'string') {
            innerBlock.innerText = this.sanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_1__["SecurityContext"].HTML, this.tooltipInner);
        }
        else {
            innerBlock = this.tooltipInner;
        }
        this.renderer.addClass(innerBlock, 'tooltip-inner');
        this.renderer.addClass(innerBlock, 'scrolled-content');
        this.renderer.appendChild(this.tooltip, innerBlock);
        this.renderer.appendChild(document.body, this.tooltip);
        this.enter = function () {
            _this.cancelHide();
        };
        this.tooltip.addEventListener('mouseenter', this.enter);
        this.leave = function () {
            if (_this.tooltip) {
                _this.hide();
            }
        };
        this.tooltip.addEventListener('mouseleave', this.leave);
        this.renderer.setStyle(document.body, 'position', 'relative');
        this.renderer.setStyle(this.tooltip, 'position', 'absolute');
        if (this.tooltipClass !== null) {
            var classes = this.tooltipClass.split(' ');
            for (var i = 0; i < classes.length; i++) {
                this.renderer.addClass(this.tooltip, classes[i]);
            }
        }
        this.renderer.setStyle(this.tooltip, 'opacity', '0');
        this.renderer.setStyle(this.tooltip, '-webkit-transition', "opacity " + this.delay + "ms");
        this.renderer.setStyle(this.tooltip, '-moz-transition', "opacity " + this.delay + "ms");
        this.renderer.setStyle(this.tooltip, '-o-transition', "opacity " + this.delay + "ms");
        this.renderer.setStyle(this.tooltip, 'transition', "opacity " + this.delay + "ms");
        window.setTimeout(function () {
            _this.renderer.setStyle(_this.tooltip, 'opacity', '1');
        }, 0);
    };
    TooltipDirective.prototype.setPosition = function (placement) {
        var hostPos = this.el.nativeElement.getBoundingClientRect();
        this.renderer.addClass(this.tooltip, 'ng-tooltip-' + placement);
        var topExit = hostPos.top - this.tooltip.getBoundingClientRect().height - parseInt(getComputedStyle(this.tooltip).marginTop, 10) < 0;
        var bottomExit = window.innerHeight < hostPos.bottom + this.tooltip.getBoundingClientRect().height + parseInt(getComputedStyle(this.tooltip).marginTop, 10);
        switch (placement) {
            case 'top':
                if (topExit) {
                    this.renderer.removeClass(this.tooltip, 'ng-tooltip-' + placement);
                    this.setPosition('bottom');
                    return;
                }
                else {
                    this.renderer.setStyle(this.tooltip, 'left', hostPos.left + (hostPos.right - hostPos.left) / 2 - this.tooltip.getBoundingClientRect().width / 2 + 'px');
                    this.renderer.setStyle(this.tooltip, 'top', hostPos.top - this.tooltip.getBoundingClientRect().height + 'px');
                    this.checkSides();
                }
                break;
            case 'top-left':
                if (topExit) {
                    this.renderer.removeClass(this.tooltip, 'ng-tooltip-' + placement);
                    this.setPosition('bottom-left');
                    return;
                }
                else {
                    this.renderer.setStyle(this.tooltip, 'left', hostPos.left + 'px');
                    this.renderer.setStyle(this.tooltip, 'top', hostPos.top - this.tooltip.getBoundingClientRect().height + 'px');
                    this.checkSides();
                }
                break;
            case 'top-right':
                if (topExit) {
                    this.renderer.removeClass(this.tooltip, 'ng-tooltip-' + placement);
                    this.setPosition('bottom-right');
                    return;
                }
                else {
                    this.renderer.setStyle(this.tooltip, 'left', hostPos.right - this.tooltip.offsetWidth + 'px');
                    this.renderer.setStyle(this.tooltip, 'top', hostPos.top - this.tooltip.getBoundingClientRect().height + 'px');
                    this.checkSides();
                }
                break;
            case 'bottom':
                if (bottomExit) {
                    this.renderer.removeClass(this.tooltip, 'ng-tooltip-' + placement);
                    this.setPosition('top');
                    return;
                }
                else {
                    this.renderer.setStyle(this.tooltip, 'top', hostPos.bottom + 'px');
                    this.renderer.setStyle(this.tooltip, 'left', hostPos.left + (hostPos.right - hostPos.left) / 2 - this.tooltip.getBoundingClientRect().width / 2 + 'px');
                    this.checkSides();
                }
                break;
            case 'bottom-left':
                if (bottomExit) {
                    this.renderer.removeClass(this.tooltip, 'ng-tooltip-' + placement);
                    this.setPosition('top-left');
                    return;
                }
                else {
                    this.renderer.setStyle(this.tooltip, 'top', hostPos.bottom + 'px');
                    this.renderer.setStyle(this.tooltip, 'left', hostPos.left + 'px');
                    this.checkSides();
                }
                break;
            case 'bottom-right':
                if (bottomExit) {
                    this.renderer.removeClass(this.tooltip, 'ng-tooltip-' + placement);
                    this.setPosition('top-right');
                    return;
                }
                else {
                    this.renderer.setStyle(this.tooltip, 'top', hostPos.bottom + 'px');
                    this.renderer.setStyle(this.tooltip, 'left', hostPos.right - this.tooltip.offsetWidth + 'px');
                    this.checkSides();
                }
                break;
            case 'left':
                this.renderer.setStyle(this.tooltip, 'left', hostPos.left - this.tooltip.getBoundingClientRect().width + 'px');
                this.renderer.setStyle(this.tooltip, 'top', hostPos.top + (hostPos.bottom - hostPos.top) / 2 - this.tooltip.getBoundingClientRect().height / 2 + 'px');
                break;
            case 'left-top':
                this.renderer.setStyle(this.tooltip, 'top', hostPos.top + 'px');
                this.renderer.setStyle(this.tooltip, 'left', hostPos.left - this.tooltip.getBoundingClientRect().width + 'px');
                break;
            case 'left-bottom':
                this.renderer.setStyle(this.tooltip, 'left', hostPos.left - this.tooltip.getBoundingClientRect().width + 'px');
                this.renderer.setStyle(this.tooltip, 'top', hostPos.bottom - this.tooltip.getBoundingClientRect().height + 'px');
                break;
            case 'right':
                this.renderer.setStyle(this.tooltip, 'left', hostPos.right + 'px');
                this.renderer.setStyle(this.tooltip, 'top', hostPos.top + (hostPos.bottom - hostPos.top) / 2 - this.tooltip.getBoundingClientRect().height / 2 + 'px');
                break;
            case 'right-top':
                this.renderer.setStyle(this.tooltip, 'top', hostPos.top + 'px');
                this.renderer.setStyle(this.tooltip, 'left', hostPos.right + 'px');
                break;
            case 'right-bottom':
                this.renderer.setStyle(this.tooltip, 'left', hostPos.right + 'px');
                this.renderer.setStyle(this.tooltip, 'top', hostPos.bottom - this.tooltip.getBoundingClientRect().height + 'px');
                break;
        }
    };
    TooltipDirective.prototype.checkSides = function () {
        if (this.tooltip.getBoundingClientRect().left < 0) {
            this.renderer.setStyle(this.tooltip, 'left', 0);
        }
        if (this.tooltip.getBoundingClientRect().right > window.innerWidth) {
            this.renderer.setStyle(this.tooltip, 'left', window.innerWidth - this.tooltip.getBoundingClientRect().width + 'px');
        }
    };
    TooltipDirective.prototype.ngOnDestroy = function () {
        clearTimeout(this.removeTooltipTimeout);
        clearTimeout(this.removeTooltipTimeoutInner);
        clearTimeout(this.removeTooltipTimeDelay);
        if (this.tooltip) {
            this.renderer.removeChild(document.body, this.tooltip);
            this.tooltip = null;
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('style.cursor'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], TooltipDirective.prototype, "cursor", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('tooltip'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], TooltipDirective.prototype, "tooltipInner", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], TooltipDirective.prototype, "placement", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], TooltipDirective.prototype, "tooltipClass", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], TooltipDirective.prototype, "timeout", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], TooltipDirective.prototype, "timeDelay", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], TooltipDirective.prototype, "delay", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], TooltipDirective.prototype, "showWhenNoOverflow", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], TooltipDirective.prototype, "onHide", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('mouseenter'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", []),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], TooltipDirective.prototype, "onMouseEnter", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('mouseleave'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", []),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], TooltipDirective.prototype, "onMouseLeave", null);
    TooltipDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[tooltip]'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]])
    ], TooltipDirective);
    return TooltipDirective;
}());



/***/ }),

/***/ "./src/app/_helpers/directives/tooltip.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/_helpers/directives/tooltip.module.ts ***!
  \*******************************************************/
/*! exports provided: TooltipModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooltipModule", function() { return TooltipModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _tooltip_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tooltip.directive */ "./src/app/_helpers/directives/tooltip.directive.ts");




var TooltipModule = /** @class */ (function () {
    function TooltipModule() {
    }
    TooltipModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_tooltip_directive__WEBPACK_IMPORTED_MODULE_3__["TooltipDirective"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            exports: [_tooltip_directive__WEBPACK_IMPORTED_MODULE_3__["TooltipDirective"]]
        })
    ], TooltipModule);
    return TooltipModule;
}());



/***/ }),

/***/ "./src/app/_helpers/directives/transaction-details/transaction-details.component.html":
/*!********************************************************************************************!*\
  !*** ./src/app/_helpers/directives/transaction-details/transaction-details.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"table py-1\"\n     fxLayout=\"column\">\n    <div class=\"row\"\n         fxFlex=\"100\"\n         fxLayout=\"row\"\n         fxLayoutAlign=\"start center\">\n        <span class=\"cell px-2 py-1 text-ellipsis\"\n              [style.flex-basis]=\"sizes[0] + 'px'\">{{ 'HISTORY.DETAILS.ID' | translate }}</span>\n        <span class=\"cell px-2 py-1 text-ellipsis color-primary cursor-pointer\"\n              [style.flex-basis]=\"sizes[1] + 'px'\"\n              (contextmenu)=\"variablesService.onContextMenuOnlyCopy($event, transaction.tx_hash)\"\n              (click)=\"openInBrowser(transaction.tx_hash)\">{{transaction.tx_hash}}</span>\n        <span class=\"cell px-2 py-1 text-ellipsis\"\n              [style.flex-basis]=\"sizes[2] + 'px'\">{{ 'HISTORY.DETAILS.SIZE' | translate }}</span>\n        <span class=\"cell px-2 py-1 text-ellipsis\"\n              [style.flex-basis]=\"sizes[3] + 'px'\">{{ 'HISTORY.DETAILS.SIZE_VALUE' | translate : { value: transaction.tx_blob_size } }}</span>\n    </div>\n    <div class=\"row\"\n         fxFlex=\"100\"\n         fxLayout=\"row\"\n         fxLayoutAlign=\"start center\">\n        <span class=\"cell px-2 py-1 text-ellipsis\"\n              [style.flex-basis]=\"sizes[0] + 'px'\">{{ 'HISTORY.DETAILS.HEIGHT' | translate }}</span>\n        <span class=\"cell px-2 py-1 text-ellipsis\"\n              [style.flex-basis]=\"sizes[1] + 'px'\">{{transaction.height}}</span>\n        <span class=\"cell px-2 py-1 text-ellipsis\"\n              [style.flex-basis]=\"sizes[2] + 'px'\">{{ 'HISTORY.DETAILS.CONFIRMATION' | translate }}</span>\n        <span class=\"cell px-2 py-1 text-ellipsis\"\n              [style.flex-basis]=\"sizes[3] + 'px'\">{{transaction.height === 0 ? 0 : variablesService.height_app - transaction.height}}</span>\n    </div>\n    <div class=\"row\"\n         fxFlex=\"100\"\n         fxLayout=\"row\"\n         fxLayoutAlign=\"start center\">\n        <span class=\"cell px-2 py-1 text-ellipsis\"\n              [style.flex-basis]=\"sizes[0] + 'px'\">{{ 'HISTORY.DETAILS.INPUTS' | translate }}</span>\n        <span class=\"cell px-2 py-1 text-ellipsis\"\n              [style.flex-basis]=\"sizes[1] + 'px'\"\n              tooltip=\"{{inputs.join(', ')}}\"\n              placement=\"top\"\n              tooltipClass=\"table-tooltip table-tooltip-dimensions\"\n              [delay]=\"500\"\n              [showWhenNoOverflow]=\"false\">{{inputs.join(', ')}}</span>\n        <span class=\"cell px-2 py-1 text-ellipsis\"\n              [style.flex-basis]=\"sizes[2] + 'px'\">{{ 'HISTORY.DETAILS.OUTPUTS' | translate }}</span>\n        <span class=\"cell px-2 py-1 text-ellipsis\"\n              [style.flex-basis]=\"sizes[3] + 'px'\"\n              tooltip=\"{{outputs.join(', ')}}\"\n              placement=\"top\"\n              tooltipClass=\"table-tooltip table-tooltip-dimensions\"\n              [delay]=\"500\"\n              [showWhenNoOverflow]=\"false\">{{outputs.join(', ')}}</span>\n    </div>\n    <div class=\"row\"\n         fxFlex=\"100\"\n         fxLayout=\"row\"\n         fxLayoutAlign=\"start center\">\n        <span class=\"cell px-2 py-1 text-ellipsis\"\n              [style.flex-basis]=\"sizes[0] + 'px'\">{{ 'HISTORY.DETAILS.PAYMENT_ID' | translate }}</span>\n        <span class=\"cell px-2 py-1 text-ellipsis\"\n              [style.flex-basis]=\"sizes[1] + sizes[2] + sizes[3] + 'px'\"\n              tooltip=\"{{transaction.payment_id}}\"\n              placement=\"top\"\n              tooltipClass=\"table-tooltip comment-tooltip\"\n              [delay]=\"500\"\n              [showWhenNoOverflow]=\"false\">\n            {{transaction.payment_id}}\n        </span>\n    </div>\n    <div class=\"row\"\n         fxFlex=\"100\"\n         fxLayout=\"row\"\n         fxLayoutAlign=\"start center\">\n        <span class=\"cell px-2 py-1 text-ellipsis\"\n              [style.flex-basis]=\"sizes[0] + 'px'\">{{ 'HISTORY.DETAILS.COMMENT' | translate }}</span>\n        <span class=\"cell px-2 py-1 text-ellipsis\"\n              [style.flex-basis]=\"sizes[1] + sizes[2] + sizes[3] + 'px'\"\n              tooltip=\"{{transaction.comment}}\"\n              placement=\"top\"\n              tooltipClass=\"table-tooltip comment-tooltip\"\n              [delay]=\"500\"\n              [showWhenNoOverflow]=\"false\"\n              (contextmenu)=\"variablesService.onContextMenuOnlyCopy($event, transaction.comment)\">\n            {{transaction.comment}}\n        </span>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/_helpers/directives/transaction-details/transaction-details.component.scss":
/*!********************************************************************************************!*\
  !*** ./src/app/_helpers/directives/transaction-details/transaction-details.component.scss ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL19oZWxwZXJzL2RpcmVjdGl2ZXMvdHJhbnNhY3Rpb24tZGV0YWlscy90cmFuc2FjdGlvbi1kZXRhaWxzLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9faGVscGVycy9kaXJlY3RpdmVzL3RyYW5zYWN0aW9uLWRldGFpbHMvdHJhbnNhY3Rpb24tZGV0YWlscy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL19oZWxwZXJzL2RpcmVjdGl2ZXMvdHJhbnNhY3Rpb24tZGV0YWlscy90cmFuc2FjdGlvbi1kZXRhaWxzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbn1cbiIsIjpob3N0IHtcbiAgd2lkdGg6IDEwMCU7XG59Il19 */"

/***/ }),

/***/ "./src/app/_helpers/directives/transaction-details/transaction-details.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/_helpers/directives/transaction-details/transaction-details.component.ts ***!
  \******************************************************************************************/
/*! exports provided: TransactionDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionDetailsComponent", function() { return TransactionDetailsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_transaction_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/transaction.model */ "./src/app/_helpers/models/transaction.model.ts");
/* harmony import */ var _services_variables_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _services_backend_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _pipes_int_to_money_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../pipes/int-to-money.pipe */ "./src/app/_helpers/pipes/int-to-money.pipe.ts");
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/constants */ "./src/app/_shared/constants.ts");







var TransactionDetailsComponent = /** @class */ (function () {
    function TransactionDetailsComponent(variablesService, backendService, intToMoneyPipe) {
        this.variablesService = variablesService;
        this.backendService = backendService;
        this.intToMoneyPipe = intToMoneyPipe;
        this.inputs = [];
        this.outputs = [];
    }
    TransactionDetailsComponent.prototype.ngOnInit = function () {
        for (var input in this.transaction.td['spn']) {
            if (this.transaction.td['spn'].hasOwnProperty(input)) {
                this.inputs.push(this.intToMoneyPipe.transform(this.transaction.td['spn'][input]));
            }
        }
        for (var output in this.transaction.td['rcv']) {
            if (this.transaction.td['rcv'].hasOwnProperty(output)) {
                this.outputs.push(this.intToMoneyPipe.transform(this.transaction.td['rcv'][output]));
            }
        }
    };
    TransactionDetailsComponent.prototype.openInBrowser = function (tr) {
        this.backendService.openUrlInBrowser((this.variablesService.testnet ? _shared_constants__WEBPACK_IMPORTED_MODULE_6__["BLOCK_EXPLORER_TN_TX_URL_PREFIX"] : _shared_constants__WEBPACK_IMPORTED_MODULE_6__["BLOCK_EXPLORER_TX_URL_PREFIX"]) + tr);
    };
    TransactionDetailsComponent.prototype.ngOnDestroy = function () {
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _models_transaction_model__WEBPACK_IMPORTED_MODULE_2__["Transaction"])
    ], TransactionDetailsComponent.prototype, "transaction", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], TransactionDetailsComponent.prototype, "sizes", void 0);
    TransactionDetailsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-transaction-details',
            template: __webpack_require__(/*! ./transaction-details.component.html */ "./src/app/_helpers/directives/transaction-details/transaction-details.component.html"),
            styles: [__webpack_require__(/*! ./transaction-details.component.scss */ "./src/app/_helpers/directives/transaction-details/transaction-details.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_variables_service__WEBPACK_IMPORTED_MODULE_3__["VariablesService"], _services_backend_service__WEBPACK_IMPORTED_MODULE_4__["BackendService"], _pipes_int_to_money_pipe__WEBPACK_IMPORTED_MODULE_5__["IntToMoneyPipe"]])
    ], TransactionDetailsComponent);
    return TransactionDetailsComponent;
}());



/***/ }),

/***/ "./src/app/_helpers/modals/confirm-modal/confirm-modal.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/_helpers/modals/confirm-modal/confirm-modal.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal p-2 border-radius-0_8-rem bg-light-blue max-w-54-rem w-100 max-h-100\">\n    <button type=\"button\"\n            class=\"close\"\n            (click)=\"close()\"><i class=\"icon close\"></i></button>\n\n    <div class=\"content mb-2\"\n         fxLayout=\"row\"\n         fxLayoutAlign=\"center center\"\n         fxLayoutGap=\"1rem\">\n        <i class=\"icon modal-info\"></i>\n\n        <div fxLayout=\"column\"\n             fxLayoutAlign=\"start stretch\">\n            <h3 class=\"title\">{{title}}</h3>\n            <p class=\"message\">{{message}}</p>\n        </div>\n    </div>\n\n    <div class=\"controls\"\n         fxLayout=\"row nowrap\"\n         fxLayoutGap=\"1rem\">\n        <button type=\"button\"\n                class=\"outline big w-100\"\n                (click)=\"close()\">{{ 'MODALS.CANCEL' | translate }}</button>\n        <button type=\"button\"\n                class=\"primary big w-100\"\n                (click)=\"onSubmit()\"\n                #btn>{{ 'MODALS.OK' | translate }}</button>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/_helpers/modals/confirm-modal/confirm-modal.component.scss":
/*!****************************************************************************!*\
  !*** ./src/app/_helpers/modals/confirm-modal/confirm-modal.component.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19oZWxwZXJzL21vZGFscy9jb25maXJtLW1vZGFsL2NvbmZpcm0tbW9kYWwuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/_helpers/modals/confirm-modal/confirm-modal.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/_helpers/modals/confirm-modal/confirm-modal.component.ts ***!
  \**************************************************************************/
/*! exports provided: ConfirmModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmModalComponent", function() { return ConfirmModalComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ConfirmModalComponent = /** @class */ (function () {
    function ConfirmModalComponent(renderer) {
        this.renderer = renderer;
        this.modalOverlay = true;
        this.confirmed = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    ConfirmModalComponent.prototype.ngOnInit = function () {
        this.renderer.addClass(document.body, 'no-scroll');
        this.button.nativeElement.focus();
    };
    ConfirmModalComponent.prototype.ngOnDestroy = function () {
        this.renderer.removeClass(document.body, 'no-scroll');
    };
    ConfirmModalComponent.prototype.onSubmit = function () {
        this.confirmed.emit(true);
    };
    ConfirmModalComponent.prototype.close = function () {
        this.confirmed.emit(false);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.modal-overlay'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ConfirmModalComponent.prototype, "modalOverlay", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], ConfirmModalComponent.prototype, "title", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], ConfirmModalComponent.prototype, "message", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], ConfirmModalComponent.prototype, "confirmed", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('btn'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], ConfirmModalComponent.prototype, "button", void 0);
    ConfirmModalComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-confirm-modal',
            template: __webpack_require__(/*! ./confirm-modal.component.html */ "./src/app/_helpers/modals/confirm-modal/confirm-modal.component.html"),
            styles: [__webpack_require__(/*! ./confirm-modal.component.scss */ "./src/app/_helpers/modals/confirm-modal/confirm-modal.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]])
    ], ConfirmModalComponent);
    return ConfirmModalComponent;
}());



/***/ }),

/***/ "./src/app/_helpers/modals/confirm-modal/confirm-modal.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/_helpers/modals/confirm-modal/confirm-modal.module.ts ***!
  \***********************************************************************/
/*! exports provided: ConfirmModalModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmModalModule", function() { return ConfirmModalModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _confirm_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./confirm-modal.component */ "./src/app/_helpers/modals/confirm-modal/confirm-modal.component.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");






var ConfirmModalModule = /** @class */ (function () {
    function ConfirmModalModule() {
    }
    ConfirmModalModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_confirm_modal_component__WEBPACK_IMPORTED_MODULE_3__["ConfirmModalComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__["FlexLayoutModule"]
            ],
            exports: [_confirm_modal_component__WEBPACK_IMPORTED_MODULE_3__["ConfirmModalComponent"]],
            entryComponents: [_confirm_modal_component__WEBPACK_IMPORTED_MODULE_3__["ConfirmModalComponent"]]
        })
    ], ConfirmModalModule);
    return ConfirmModalModule;
}());



/***/ }),

/***/ "./src/app/_helpers/modals/export-history-modal/export-history-modal.component.html":
/*!******************************************************************************************!*\
  !*** ./src/app/_helpers/modals/export-history-modal/export-history-modal.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal p-2 border-radius-0_8-rem bg-light-blue max-h-100 overflow-hidden\"\n     fxFlex=\"0 1 54rem\"\n     fxLayout=\"column\"\n     fxLayoutAlign=\"start stretch\">\n    <form class=\"form overflow-x-hidden overflow-y-auto\"\n          fxLayout=\"column\"\n          fxLayoutAlign=\"start stretch\">\n        <h4 class=\"text-ellipsis mb-2\"\n            fxFlex=\"0 0 auto\">\n            {{ 'EXPORT_HISTORY.TITLE' | translate }}\n        </h4>\n\n        <div class=\"content mb-2\"\n             fxFlex=\"1 1 auto\">\n            <div class=\"form__field\">\n                <label>Format:</label>\n                <ng-select [items]=\"exportFormats\"\n                           bindValue=\"format\"\n                           bindLabel=\"formatName\"\n                           name=\"format\"\n                           [(ngModel)]=\"currentFormat\"\n                           [clearable]=\"false\"\n                           [searchable]=\"false\">\n                    <ng-template ng-label-tmp\n                                 let-item=\"item\">\n                        {{item.formatName}}\n                    </ng-template>\n                    <ng-template ng-option-tmp\n                                 let-item=\"item\"\n                                 let-index=\"index\">\n                        {{item.formatName}}\n                    </ng-template>\n                </ng-select>\n            </div>\n\n            <div class=\"mb-2\"\n                 fxLayout=\"row\"\n                 fxLayoutAlign=\"start center\">\n                <span class=\"color-primary mr-1\">{{ 'EXPORT_HISTORY.FILTER' | translate }}</span>\n                <app-switch [value]=\"posFilterIsOn\"\n                            (emitChange)=\"posFilterIsOn = !posFilterIsOn\"></app-switch>\n            </div>\n        </div>\n\n        <div class=\"controls\"\n             fxFlex=\"0 0 auto\"\n             fxLayout=\"row\"\n             fxLayoutAlign=\"space-between center\">\n            <button type=\"submit\"\n                    class=\"primary big w-100 mr-0_5\"\n                    (click)=\"confirmExport()\">{{ 'EXPORT_HISTORY.EXPORT' | translate }}</button>\n            <button type=\"button\"\n                    class=\"outline big w-100 ml-0_5\"\n                    (click)=\"closeModal()\">{{ 'EXPORT_HISTORY.CANCEL' | translate }}</button>\n        </div>\n    </form>\n</div>\n"

/***/ }),

/***/ "./src/app/_helpers/modals/export-history-modal/export-history-modal.component.scss":
/*!******************************************************************************************!*\
  !*** ./src/app/_helpers/modals/export-history-modal/export-history-modal.component.scss ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19oZWxwZXJzL21vZGFscy9leHBvcnQtaGlzdG9yeS1tb2RhbC9leHBvcnQtaGlzdG9yeS1tb2RhbC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/_helpers/modals/export-history-modal/export-history-modal.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/_helpers/modals/export-history-modal/export-history-modal.component.ts ***!
  \****************************************************************************************/
/*! exports provided: ExportHistoryModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExportHistoryModalComponent", function() { return ExportHistoryModalComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _services_backend_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _services_variables_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/variables.service */ "./src/app/_helpers/services/variables.service.ts");





var ExportHistoryModalComponent = /** @class */ (function () {
    function ExportHistoryModalComponent(backend, variablesService, translate, renderer) {
        this.backend = backend;
        this.variablesService = variablesService;
        this.translate = translate;
        this.renderer = renderer;
        this.modalOverlay = true;
        this.posFilterIsOn = true;
        this.exportData = {
            wallet_id: 0,
            include_pos_transactions: false,
            path: 'C:\\some_file.txt',
            format: 'json'
        };
        this.exportFormats = [
            {
                format: 'json',
                formatName: 'JSON'
            },
            {
                format: 'text',
                formatName: 'Text'
            },
            {
                format: 'csv',
                formatName: 'CSV'
            }
        ];
        this.closeExportModal = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.currentFormat = this.exportFormats[0].format;
    }
    ExportHistoryModalComponent.prototype.ngOnInit = function () {
        this.renderer.addClass(document.body, 'no-scroll');
    };
    ExportHistoryModalComponent.prototype.ngOnDestroy = function () {
        this.renderer.removeClass(document.body, 'no-scroll');
    };
    ExportHistoryModalComponent.prototype.closeModal = function () {
        this.closeExportModal.emit(true);
    };
    ExportHistoryModalComponent.prototype.confirmExport = function () {
        var _this = this;
        this.exportData.format = "" + this.currentFormat;
        this.exportData.wallet_id = this.currentWalletId;
        this.exportData.include_pos_transactions = this.posFilterIsOn;
        this.backend.saveFileDialog(this.translate.instant('EXPORT_HISTORY.SAVED_FILE'), "" + this.exportData.format, this.variablesService.settings.default_path, function (file_status, file_data) {
            if (_this.exportData.format === 'text') {
                _this.exportData.path = file_data.path + '.txt';
            }
            else {
                _this.exportData.path = file_data.path + ("." + _this.exportData.format);
            }
            if (file_status) {
                _this.backend.exportWalletHistory(JSON.stringify(_this.exportData));
                _this.closeExportModal.emit(true);
            }
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.modal-overlay'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ExportHistoryModalComponent.prototype, "modalOverlay", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ExportHistoryModalComponent.prototype, "currentWalletId", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], ExportHistoryModalComponent.prototype, "closeExportModal", void 0);
    ExportHistoryModalComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-export-history-modal',
            template: __webpack_require__(/*! ./export-history-modal.component.html */ "./src/app/_helpers/modals/export-history-modal/export-history-modal.component.html"),
            styles: [__webpack_require__(/*! ./export-history-modal.component.scss */ "./src/app/_helpers/modals/export-history-modal/export-history-modal.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_backend_service__WEBPACK_IMPORTED_MODULE_3__["BackendService"],
            _services_variables_service__WEBPACK_IMPORTED_MODULE_4__["VariablesService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]])
    ], ExportHistoryModalComponent);
    return ExportHistoryModalComponent;
}());



/***/ }),

/***/ "./src/app/_helpers/modals/modal-container/modal-container.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/_helpers/modals/modal-container/modal-container.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal p-2 border-radius-0_8-rem bg-light-blue max-w-34-rem w-100 max-h-100\">\n    <button type=\"button\"\n            class=\"close\"\n            (click)=\"onClose()\"><i class=\"icon close\"></i></button>\n\n    <div class=\"content mb-2\"\n         fxLayout=\"row\"\n         fxLayoutAlign=\"start center\">\n        <i class=\"icon min-width-4_4-rem min-height-4_4-rem mr-1\"\n           fxFlex=\"0 0 auto\"\n           [class.error]=\"type === 'error'\"\n           [class.success]=\"type === 'success'\"\n           [class.info]=\"type === 'info'\"></i>\n        <div class=\"message-container\">\n\t\t\t<h3 class=\"title\">{{title}}</h3>\n\t\t\t<p class=\"message\">\n\t\t\t\t{{ message }}\n\t\t\t</p>\n\t\t</div>\n    </div>\n\n    <div class=\"controls\"\n         fxLayout=\"row\"\n         fxLayoutAlign=\"center center\">\n        <button type=\"button\"\n                class=\"primary max-w-19-rem w-100 big\"\n                (click)=\"onClose()\"\n                #btn>{{ 'MODALS.OK' | translate }}</button>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/_helpers/modals/modal-container/modal-container.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/_helpers/modals/modal-container/modal-container.component.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19oZWxwZXJzL21vZGFscy9tb2RhbC1jb250YWluZXIvbW9kYWwtY29udGFpbmVyLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/_helpers/modals/modal-container/modal-container.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/_helpers/modals/modal-container/modal-container.component.ts ***!
  \******************************************************************************/
/*! exports provided: ModalContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalContainerComponent", function() { return ModalContainerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");



var ModalContainerComponent = /** @class */ (function () {
    function ModalContainerComponent(translate, renderer) {
        this.translate = translate;
        this.renderer = renderer;
        this.modalOverlay = true;
        this.close = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    ModalContainerComponent.prototype.ngOnInit = function () {
        this.renderer.addClass(document.body, 'no-scroll');
        this.button.nativeElement.focus();
        switch (this.type) {
            case 'error':
                this.title = this.translate.instant('MODALS.ERROR');
                break;
            case 'success':
                this.title = this.translate.instant('MODALS.SUCCESS');
                break;
            case 'info':
                this.title = this.translate.instant('MODALS.INFO');
                break;
        }
    };
    ModalContainerComponent.prototype.ngOnDestroy = function () {
        this.renderer.removeClass(document.body, 'no-scroll');
    };
    ModalContainerComponent.prototype.onClose = function () {
        this.close.emit();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.modal-overlay'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalContainerComponent.prototype, "modalOverlay", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], ModalContainerComponent.prototype, "type", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], ModalContainerComponent.prototype, "message", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ModalContainerComponent.prototype, "close", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('btn'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], ModalContainerComponent.prototype, "button", void 0);
    ModalContainerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-modal-container',
            template: __webpack_require__(/*! ./modal-container.component.html */ "./src/app/_helpers/modals/modal-container/modal-container.component.html"),
            styles: [__webpack_require__(/*! ./modal-container.component.scss */ "./src/app/_helpers/modals/modal-container/modal-container.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]])
    ], ModalContainerComponent);
    return ModalContainerComponent;
}());



/***/ }),

/***/ "./src/app/_helpers/modals/sync-modal/sync-modal.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/_helpers/modals/sync-modal/sync-modal.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal p-2 border-radius-0_8-rem bg-light-blue max-w-54-rem w-100 max-h-100\">\n    <div class=\"content\"\n         fxLayout=\"column\"\n         fxLayoutAlign=\"center center\">\n        <h3 class=\"mb-2\">This action is not available\n                         during synchronization...</h3>\n        <button type=\"button\"\n                class=\"primary big max-w-19-rem w-100\"\n\t\t\t\t(click)=\"canselAction()\">\n            OK\n        </button>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/_helpers/modals/sync-modal/sync-modal.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/_helpers/modals/sync-modal/sync-modal.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19oZWxwZXJzL21vZGFscy9zeW5jLW1vZGFsL3N5bmMtbW9kYWwuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/_helpers/modals/sync-modal/sync-modal.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/_helpers/modals/sync-modal/sync-modal.component.ts ***!
  \********************************************************************/
/*! exports provided: SyncModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SyncModalComponent", function() { return SyncModalComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_variables_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/variables.service */ "./src/app/_helpers/services/variables.service.ts");



var SyncModalComponent = /** @class */ (function () {
    function SyncModalComponent(renderer, variablesService) {
        this.renderer = renderer;
        this.variablesService = variablesService;
        this.modalOverlay = true;
    }
    SyncModalComponent.prototype.ngOnInit = function () {
        this.renderer.addClass(document.body, 'no-scroll');
    };
    SyncModalComponent.prototype.ngOnDestroy = function () {
        this.renderer.removeClass(document.body, 'no-scroll');
    };
    SyncModalComponent.prototype.canselAction = function () {
        this.variablesService.deeplink$.next(null);
        this.variablesService.sendActionData$.next({});
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.modal-overlay'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SyncModalComponent.prototype, "modalOverlay", void 0);
    SyncModalComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-sync-modal',
            template: __webpack_require__(/*! ./sync-modal.component.html */ "./src/app/_helpers/modals/sync-modal/sync-modal.component.html"),
            styles: [__webpack_require__(/*! ./sync-modal.component.scss */ "./src/app/_helpers/modals/sync-modal/sync-modal.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"],
            _services_variables_service__WEBPACK_IMPORTED_MODULE_2__["VariablesService"]])
    ], SyncModalComponent);
    return SyncModalComponent;
}());



/***/ }),

/***/ "./src/app/_helpers/modals/sync-modal/sync-modal.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/_helpers/modals/sync-modal/sync-modal.module.ts ***!
  \*****************************************************************/
/*! exports provided: SyncModalModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SyncModalModule", function() { return SyncModalModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _sync_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sync-modal.component */ "./src/app/_helpers/modals/sync-modal/sync-modal.component.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");





var SyncModalModule = /** @class */ (function () {
    function SyncModalModule() {
    }
    SyncModalModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_sync_modal_component__WEBPACK_IMPORTED_MODULE_3__["SyncModalComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__["FlexLayoutModule"]
            ],
            exports: [_sync_modal_component__WEBPACK_IMPORTED_MODULE_3__["SyncModalComponent"]],
            entryComponents: [_sync_modal_component__WEBPACK_IMPORTED_MODULE_3__["SyncModalComponent"]]
        })
    ], SyncModalModule);
    return SyncModalModule;
}());



/***/ }),

/***/ "./src/app/_helpers/models/transaction.model.ts":
/*!******************************************************!*\
  !*** ./src/app/_helpers/models/transaction.model.ts ***!
  \******************************************************/
/*! exports provided: Transaction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Transaction", function() { return Transaction; });
var Transaction = /** @class */ (function () {
    function Transaction() {
    }
    return Transaction;
}());



/***/ }),

/***/ "./src/app/_helpers/models/wallet.model.ts":
/*!*************************************************!*\
  !*** ./src/app/_helpers/models/wallet.model.ts ***!
  \*************************************************/
/*! exports provided: Wallet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Wallet", function() { return Wallet; });
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bignumber.js */ "./node_modules/bignumber.js/bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_0__);

var Wallet = /** @class */ (function () {
    function Wallet(id, name, pass, path, address, balance, unlocked_balance, mined, tracking) {
        if (mined === void 0) { mined = 0; }
        if (tracking === void 0) { tracking = ''; }
        this.updated = false;
        this.history = [];
        this.pages = [];
        this.excluded_history = [];
        this.contracts = [];
        this.send_data = {
            address: null,
            amount: null,
            comment: null,
            mixin: null,
            fee: null,
            hide: null
        };
        this.wallet_id = id;
        this.name = name;
        this.pass = pass;
        this.path = path;
        this.address = address;
        this.balance = balance;
        this.unlocked_balance = unlocked_balance;
        this.mined_total = mined;
        this.tracking_hey = tracking;
        this.alias = {};
        this.staking = false;
        this.new_messages = 0;
        this.new_contracts = 0;
        this.history = [];
        this.excluded_history = [];
        this.progress = 0;
        this.loaded = false;
    }
    Wallet.prototype.getMoneyEquivalent = function (equivalent) {
        return this.balance.multipliedBy(equivalent).toFixed(0);
    };
    Wallet.prototype.havePass = function () {
        return (this.pass !== '' && this.pass !== null);
    };
    Wallet.prototype.isActive = function (id) {
        return this.wallet_id === id;
    };
    Wallet.prototype.prepareHistoryItem = function (item) {
        if (item.tx_type === 4) {
            item.sortFee = item.amount.plus(item.fee).negated();
            item.sortAmount = new bignumber_js__WEBPACK_IMPORTED_MODULE_0__["BigNumber"](0);
        }
        else if (item.tx_type === 3) {
            item.sortFee = new bignumber_js__WEBPACK_IMPORTED_MODULE_0__["BigNumber"](0);
        }
        else if ((item.hasOwnProperty('contract') && (item.contract[0].state === 3 || item.contract[0].state === 6 || item.contract[0].state === 601) && !item.contract[0].is_a)) {
            item.sortFee = item.fee.negated();
            item.sortAmount = item.amount;
        }
        else {
            if (!item.is_income) {
                item.sortFee = item.fee.negated();
                item.sortAmount = item.amount.negated();
            }
            else {
                item.sortAmount = item.amount;
            }
        }
        return item;
    };
    Wallet.prototype.prepareHistory = function (items) {
        for (var i = 0; i < items.length; i++) {
            if ((items[i].tx_type === 7 && items[i].is_income) || (items[i].tx_type === 11 && items[i].is_income) || (items[i].amount.eq(0) && items[i].fee.eq(0) && !items[i].is_mining)) {
                var exists = false;
                for (var j = 0; j < this.excluded_history.length; j++) {
                    if (this.excluded_history[j].tx_hash === items[i].tx_hash) {
                        exists = true;
                        if (this.excluded_history[j].height !== items[i].height) {
                            this.excluded_history[j] = items[i];
                        }
                        break;
                    }
                }
                if (!exists) {
                    this.excluded_history.push(items[i]);
                }
            }
            else {
                var exists = false;
                for (var j = 0; j < this.history.length; j++) {
                    if (this.history[j].tx_hash === items[i].tx_hash) {
                        exists = true;
                        if (this.history[j].height !== items[i].height) {
                            this.history[j] = this.prepareHistoryItem(items[i]);
                        }
                        break;
                    }
                }
                if (!exists) {
                    if (this.history.length && items[i].timestamp >= this.history[0].timestamp) {
                        this.history.unshift(this.prepareHistoryItem(items[i]));
                    }
                    else {
                        this.history.push(this.prepareHistoryItem(items[i]));
                    }
                }
            }
        }
    };
    Wallet.prototype.removeFromHistory = function (hash) {
        for (var i = 0; i < this.history.length; i++) {
            if (this.history[i].tx_hash === hash) {
                this.history.splice(i, 1);
                break;
            }
        }
    };
    Wallet.prototype.prepareContractsAfterOpen = function (items, exp_med_ts, height_app, viewedContracts, notViewedContracts) {
        var wallet = this;
        var _loop_1 = function (i) {
            var contract = items[i];
            var contractTransactionExist = false;
            if (wallet && wallet.history) {
                contractTransactionExist = wallet.history.some(function (elem) { return elem.contract && elem.contract.length && elem.contract[0].contract_id === contract.contract_id; });
            }
            if (!contractTransactionExist && wallet && wallet.excluded_history) {
                contractTransactionExist = wallet.excluded_history.some(function (elem) { return elem.contract && elem.contract.length && elem.contract[0].contract_id === contract.contract_id; });
            }
            if (!contractTransactionExist) {
                contract.state = 140;
            }
            else if (contract.state === 1 && contract.expiration_time < exp_med_ts) {
                contract.state = 110;
            }
            else if (contract.state === 2 && contract.cancel_expiration_time !== 0 && contract.cancel_expiration_time < exp_med_ts && contract.height === 0) {
                var searchResult1 = viewedContracts.some(function (elem) { return elem.state === 2 && elem.is_a === contract.is_a && elem.contract_id === contract.contract_id; });
                if (!searchResult1) {
                    contract.state = 130;
                    contract.is_new = true;
                }
            }
            else if (contract.state === 1) {
                var searchResult2 = notViewedContracts.find(function (elem) { return elem.state === 110 && elem.is_a === contract.is_a && elem.contract_id === contract.contract_id; });
                if (searchResult2) {
                    if (searchResult2.time === contract.expiration_time) {
                        contract.state = 110;
                    }
                    else {
                        for (var j = 0; j < notViewedContracts.length; j++) {
                            if (notViewedContracts[j].contract_id === contract.contract_id && notViewedContracts[j].is_a === contract.is_a) {
                                notViewedContracts.splice(j, 1);
                                break;
                            }
                        }
                        for (var j = 0; j < viewedContracts.length; j++) {
                            if (viewedContracts[j].contract_id === contract.contract_id && viewedContracts[j].is_a === contract.is_a) {
                                viewedContracts.splice(j, 1);
                                break;
                            }
                        }
                    }
                }
            }
            else if (contract.state === 2 && (contract.height === 0 || (height_app - contract.height) < 10)) {
                contract.state = 201;
            }
            else if (contract.state === 2) {
                var searchResult3 = viewedContracts.some(function (elem) { return elem.state === 120 && elem.is_a === contract.is_a && elem.contract_id === contract.contract_id; });
                if (searchResult3) {
                    contract.state = 120;
                }
            }
            else if (contract.state === 5) {
                var searchResult4 = notViewedContracts.find(function (elem) { return elem.state === 130 && elem.is_a === contract.is_a && elem.contract_id === contract.contract_id; });
                if (searchResult4) {
                    if (searchResult4.time === contract.cancel_expiration_time) {
                        contract.state = 130;
                    }
                    else {
                        for (var j = 0; j < notViewedContracts.length; j++) {
                            if (notViewedContracts[j].contract_id === contract.contract_id && notViewedContracts[j].is_a === contract.is_a) {
                                notViewedContracts.splice(j, 1);
                                break;
                            }
                        }
                        for (var j = 0; j < viewedContracts.length; j++) {
                            if (viewedContracts[j].contract_id === contract.contract_id && viewedContracts[j].is_a === contract.is_a) {
                                viewedContracts.splice(j, 1);
                                break;
                            }
                        }
                    }
                }
            }
            else if (contract.state === 6 && (contract.height === 0 || (height_app - contract.height) < 10)) {
                contract.state = 601;
            }
            var searchResult = viewedContracts.some(function (elem) { return elem.state === contract.state && elem.is_a === contract.is_a && elem.contract_id === contract.contract_id; });
            contract.is_new = !searchResult;
            wallet.contracts.push(contract);
        };
        for (var i = 0; i < items.length; i++) {
            _loop_1(i);
        }
        this.recountNewContracts();
    };
    Wallet.prototype.recountNewContracts = function () {
        this.new_contracts = (this.contracts.filter(function (item) { return item.is_new === true; })).length;
    };
    Wallet.prototype.getContract = function (id) {
        for (var i = 0; i < this.contracts.length; i++) {
            if (this.contracts[i].contract_id === id) {
                return this.contracts[i];
            }
        }
        return null;
    };
    return Wallet;
}());



/***/ }),

/***/ "./src/app/_helpers/pipes/contract-status-messages.pipe.ts":
/*!*****************************************************************!*\
  !*** ./src/app/_helpers/pipes/contract-status-messages.pipe.ts ***!
  \*****************************************************************/
/*! exports provided: ContractStatusMessagesPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractStatusMessagesPipe", function() { return ContractStatusMessagesPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");



var ContractStatusMessagesPipe = /** @class */ (function () {
    function ContractStatusMessagesPipe(translate) {
        this.translate = translate;
    }
    ContractStatusMessagesPipe.prototype.getStateSeller = function (stateNum) {
        var state = { part1: '', part2: '' };
        switch (stateNum) {
            case 1:
                state.part1 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.SELLER.NEW_CONTRACT');
                break;
            case 110:
                state.part1 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.SELLER.IGNORED');
                break;
            case 201:
                state.part1 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.SELLER.ACCEPTED');
                state.part2 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.SELLER.WAIT');
                break;
            case 2:
                state.part1 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.SELLER.WAITING_BUYER');
                break;
            case 3:
                state.part1 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.SELLER.COMPLETED');
                break;
            case 4:
                state.part1 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.SELLER.NOT_RECEIVED');
                state.part2 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.SELLER.NULLIFIED');
                break;
            case 5:
                state.part1 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.SELLER.PROPOSAL_CANCEL');
                break;
            case 601:
                state.part1 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.SELLER.BEING_CANCELLED');
                break;
            case 6:
                state.part1 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.SELLER.CANCELLED');
                break;
            case 130:
                state.part1 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.SELLER.IGNORED_CANCEL');
                break;
            case 140:
                state.part1 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.SELLER.EXPIRED');
                break;
        }
        return state.part1 + (state.part2.length ? '. ' + state.part2 : '');
    };
    ContractStatusMessagesPipe.prototype.getStateBuyer = function (stateNum) {
        var state = { part1: '', part2: '' };
        switch (stateNum) {
            case 1:
                state.part1 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.BUYER.WAITING');
                break;
            case 110:
                state.part1 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.BUYER.IGNORED');
                break;
            case 201:
                state.part1 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.BUYER.ACCEPTED');
                state.part2 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.BUYER.WAIT');
                break;
            case 2:
                state.part1 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.BUYER.ACCEPTED');
                break;
            case 120:
                state.part1 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.BUYER.WAITING_SELLER');
                break;
            case 3:
                state.part1 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.BUYER.COMPLETED');
                break;
            case 4:
                state.part1 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.BUYER.NOT_RECEIVED');
                state.part2 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.BUYER.NULLIFIED');
                break;
            case 5:
                state.part1 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.BUYER.WAITING_CANCEL');
                break;
            case 601:
                state.part1 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.BUYER.BEING_CANCELLED');
                break;
            case 6:
                state.part1 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.BUYER.CANCELLED');
                break;
            case 130:
                state.part1 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.BUYER.IGNORED_CANCEL');
                break;
            case 140:
                state.part1 = this.translate.instant('CONTRACTS.STATUS_MESSAGES.BUYER.EXPIRED');
                break;
        }
        return state.part1 + (state.part2.length ? '. ' + state.part2 : '');
    };
    ContractStatusMessagesPipe.prototype.transform = function (state, is_a) {
        if (is_a) {
            return this.getStateBuyer(state);
        }
        else {
            return this.getStateSeller(state);
        }
    };
    ContractStatusMessagesPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'contractStatusMessages'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"]])
    ], ContractStatusMessagesPipe);
    return ContractStatusMessagesPipe;
}());



/***/ }),

/***/ "./src/app/_helpers/pipes/contract-time-left.pipe.ts":
/*!***********************************************************!*\
  !*** ./src/app/_helpers/pipes/contract-time-left.pipe.ts ***!
  \***********************************************************/
/*! exports provided: ContractTimeLeftPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractTimeLeftPipe", function() { return ContractTimeLeftPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_variables_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");




var ContractTimeLeftPipe = /** @class */ (function () {
    function ContractTimeLeftPipe(service, translate) {
        this.service = service;
        this.translate = translate;
    }
    ContractTimeLeftPipe.prototype.transform = function (value, arg) {
        var time = parseInt(((parseInt(value, 10) - this.service.exp_med_ts) / 3600).toFixed(0), 10);
        var type = arg || 0;
        if (time === 0) {
            return this.translate.instant('CONTRACTS.TIME_LEFT.REMAINING_LESS_ONE');
        }
        if (this.service.settings.language === 'en') {
            if (type === 0) {
                if (time === 1) {
                    return this.translate.instant('CONTRACTS.TIME_LEFT.REMAINING_ONE', { time: time });
                }
                else {
                    return this.translate.instant('CONTRACTS.TIME_LEFT.REMAINING_MANY', { time: time });
                }
            }
            else if (type === 1) {
                if (time === 1) {
                    return this.translate.instant('CONTRACTS.TIME_LEFT.REMAINING_ONE_RESPONSE', { time: time });
                }
                else {
                    return this.translate.instant('CONTRACTS.TIME_LEFT.REMAINING_MANY_RESPONSE', { time: time });
                }
            }
            else if (type === 2) {
                if (time === 1) {
                    return this.translate.instant('CONTRACTS.TIME_LEFT.REMAINING_ONE_WAITING', { time: time });
                }
                else {
                    return this.translate.instant('CONTRACTS.TIME_LEFT.REMAINING_MANY_WAITING', { time: time });
                }
            }
        }
        else {
            var rest = time % 10;
            if (type === 0) {
                if (((time > 20) && (rest === 1)) || time === 1) {
                    return this.translate.instant('CONTRACTS.TIME_LEFT.REMAINING_ONE', { time: time });
                }
                else if ((time > 1) && (time < 5) || ((time > 20) && (rest === 2 || rest === 3 || rest === 4))) {
                    return this.translate.instant('CONTRACTS.TIME_LEFT.REMAINING_MANY', { time: time });
                }
                else {
                    return this.translate.instant('CONTRACTS.TIME_LEFT.REMAINING_MANY_ALT', { time: time });
                }
            }
            else if (type === 1) {
                if (((time > 20) && (rest === 1)) || time === 1) {
                    return this.translate.instant('CONTRACTS.TIME_LEFT.REMAINING_ONE_RESPONSE', { time: time });
                }
                else if ((time > 1) && (time < 5) || ((time > 20) && (rest === 2 || rest === 3 || rest === 4))) {
                    return this.translate.instant('CONTRACTS.TIME_LEFT.REMAINING_MANY_RESPONSE', { time: time });
                }
                else {
                    return this.translate.instant('CONTRACTS.TIME_LEFT.REMAINING_MANY_ALT_RESPONSE', { time: time });
                }
            }
            else if (type === 2) {
                if (((time > 20) && (rest === 1)) || time === 1) {
                    return this.translate.instant('CONTRACTS.TIME_LEFT.REMAINING_ONE_WAITING', { time: time });
                }
                else if ((time > 1) && (time < 5) || ((time > 20) && (rest === 2 || rest === 3 || rest === 4))) {
                    return this.translate.instant('CONTRACTS.TIME_LEFT.REMAINING_MANY_WAITING', { time: time });
                }
                else {
                    return this.translate.instant('CONTRACTS.TIME_LEFT.REMAINING_MANY_ALT_WAITING', { time: time });
                }
            }
        }
        return null;
    };
    ContractTimeLeftPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'contractTimeLeft'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_variables_service__WEBPACK_IMPORTED_MODULE_2__["VariablesService"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__["TranslateService"]])
    ], ContractTimeLeftPipe);
    return ContractTimeLeftPipe;
}());



/***/ }),

/***/ "./src/app/_helpers/pipes/history-type-messages.pipe.ts":
/*!**************************************************************!*\
  !*** ./src/app/_helpers/pipes/history-type-messages.pipe.ts ***!
  \**************************************************************/
/*! exports provided: HistoryTypeMessagesPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryTypeMessagesPipe", function() { return HistoryTypeMessagesPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");



var HistoryTypeMessagesPipe = /** @class */ (function () {
    function HistoryTypeMessagesPipe(translate) {
        this.translate = translate;
    }
    HistoryTypeMessagesPipe.prototype.transform = function (item, args) {
        if (item.tx_type === 0) {
            if (item.remote_addresses && item.remote_addresses[0]) {
                return item.remote_addresses[0];
            }
            else {
                if (item.is_income) {
                    return this.translate.instant('HISTORY.TYPE_MESSAGES.HIDDEN');
                }
                else {
                    return this.translate.instant('HISTORY.TYPE_MESSAGES.UNDEFINED');
                }
            }
        }
        else if (item.tx_type === 6 && item.height === 0) {
            return 'unknown';
        }
        else if (item.tx_type === 9) {
            if (item.hasOwnProperty('contract') && item.contract[0].is_a) {
                return this.translate.instant('HISTORY.TYPE_MESSAGES.COMPLETE_BUYER');
            }
            else {
                return this.translate.instant('HISTORY.TYPE_MESSAGES.COMPLETE_SELLER');
            }
        }
        else {
            switch (item.tx_type) {
                // case 0:
                //   return '';
                // case 1:
                //   return '';
                // case 2:
                //   return '';
                // case 3:
                //   return '';
                case 4:
                    return this.translate.instant('HISTORY.TYPE_MESSAGES.CREATE_ALIAS');
                case 5:
                    return this.translate.instant('HISTORY.TYPE_MESSAGES.UPDATE_ALIAS');
                case 6:
                    return (item.td['spn'] && item.td['spn'].length) ? this.translate.instant('HISTORY.TYPE_MESSAGES.POS_REWARD') : this.translate.instant('HISTORY.TYPE_MESSAGES.POW_REWARD');
                case 7:
                    return this.translate.instant('HISTORY.TYPE_MESSAGES.CREATE_CONTRACT');
                case 8:
                    return this.translate.instant('HISTORY.TYPE_MESSAGES.PLEDGE_CONTRACT');
                // case 9:
                //   return '';
                case 10:
                    return this.translate.instant('HISTORY.TYPE_MESSAGES.NULLIFY_CONTRACT');
                case 11:
                    return this.translate.instant('HISTORY.TYPE_MESSAGES.PROPOSAL_CANCEL_CONTRACT');
                case 12:
                    return this.translate.instant('HISTORY.TYPE_MESSAGES.CANCEL_CONTRACT');
            }
        }
        return this.translate.instant('HISTORY.TYPE_MESSAGES.UNDEFINED');
    };
    HistoryTypeMessagesPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'historyTypeMessages'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"]])
    ], HistoryTypeMessagesPipe);
    return HistoryTypeMessagesPipe;
}());



/***/ }),

/***/ "./src/app/_helpers/pipes/int-to-money.pipe.ts":
/*!*****************************************************!*\
  !*** ./src/app/_helpers/pipes/int-to-money.pipe.ts ***!
  \*****************************************************/
/*! exports provided: IntToMoneyPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntToMoneyPipe", function() { return IntToMoneyPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_variables_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bignumber.js */ "./node_modules/bignumber.js/bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_3__);




var IntToMoneyPipe = /** @class */ (function () {
    function IntToMoneyPipe(variablesService) {
        this.variablesService = variablesService;
    }
    IntToMoneyPipe.prototype.transform = function (value, args) {
        if (value === 0 || value === undefined) {
            return '0';
        }
        var maxFraction = this.variablesService.digits;
        if (args) {
            maxFraction = parseInt(args, 10);
        }
        var power = Math.pow(10, this.variablesService.digits);
        var str = (new bignumber_js__WEBPACK_IMPORTED_MODULE_3__["BigNumber"](value)).div(power).toFixed(maxFraction);
        for (var i = str.length - 1; i >= 0; i--) {
            if (str[i] !== '0') {
                str = str.substr(0, i + 1);
                break;
            }
        }
        if (str[str.length - 1] === '.') {
            str = str.substr(0, str.length - 1);
        }
        return str;
    };
    IntToMoneyPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'intToMoney'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_variables_service__WEBPACK_IMPORTED_MODULE_2__["VariablesService"]])
    ], IntToMoneyPipe);
    return IntToMoneyPipe;
}());



/***/ }),

/***/ "./src/app/_helpers/pipes/money-to-int.pipe.ts":
/*!*****************************************************!*\
  !*** ./src/app/_helpers/pipes/money-to-int.pipe.ts ***!
  \*****************************************************/
/*! exports provided: MoneyToIntPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MoneyToIntPipe", function() { return MoneyToIntPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_variables_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bignumber.js */ "./node_modules/bignumber.js/bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_3__);




var MoneyToIntPipe = /** @class */ (function () {
    function MoneyToIntPipe(variablesService) {
        this.variablesService = variablesService;
    }
    MoneyToIntPipe.prototype.transform = function (value, args) {
        var CURRENCY_DISPLAY_DECIMAL_POINT = this.variablesService.digits;
        var result;
        if (value) {
            var am_str = value.toString().trim();
            var point_index = am_str.indexOf('.');
            var fraction_size = 0;
            if (-1 !== point_index) {
                fraction_size = am_str.length - point_index - 1;
                while (CURRENCY_DISPLAY_DECIMAL_POINT < fraction_size && '0' === am_str[am_str.length - 1]) {
                    am_str = am_str.slice(0, am_str.length - 1);
                    --fraction_size;
                }
                if (CURRENCY_DISPLAY_DECIMAL_POINT < fraction_size) {
                    return undefined;
                }
                am_str = am_str.slice(0, point_index) + am_str.slice(point_index + 1, am_str.length);
            }
            else {
                fraction_size = 0;
            }
            if (!am_str.length) {
                return undefined;
            }
            if (fraction_size < CURRENCY_DISPLAY_DECIMAL_POINT) {
                for (var i = 0; i !== CURRENCY_DISPLAY_DECIMAL_POINT - fraction_size; i++) {
                    am_str = am_str + '0';
                }
            }
            result = (new bignumber_js__WEBPACK_IMPORTED_MODULE_3__["BigNumber"](am_str)).integerValue();
        }
        return result;
    };
    MoneyToIntPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'moneyToInt'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_variables_service__WEBPACK_IMPORTED_MODULE_2__["VariablesService"]])
    ], MoneyToIntPipe);
    return MoneyToIntPipe;
}());



/***/ }),

/***/ "./src/app/_helpers/pipes/pipes.module.ts":
/*!************************************************!*\
  !*** ./src/app/_helpers/pipes/pipes.module.ts ***!
  \************************************************/
/*! exports provided: PipesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PipesModule", function() { return PipesModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _int_to_money_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./int-to-money.pipe */ "./src/app/_helpers/pipes/int-to-money.pipe.ts");
/* harmony import */ var _safe_html_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./safe-html.pipe */ "./src/app/_helpers/pipes/safe-html.pipe.ts");
/* harmony import */ var _money_to_int_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./money-to-int.pipe */ "./src/app/_helpers/pipes/money-to-int.pipe.ts");
/* harmony import */ var _history_type_messages_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./history-type-messages.pipe */ "./src/app/_helpers/pipes/history-type-messages.pipe.ts");
/* harmony import */ var _contract_time_left_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./contract-time-left.pipe */ "./src/app/_helpers/pipes/contract-time-left.pipe.ts");
/* harmony import */ var _contract_status_messages_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./contract-status-messages.pipe */ "./src/app/_helpers/pipes/contract-status-messages.pipe.ts");









var PipesModule = /** @class */ (function () {
    function PipesModule() {
    }
    PipesModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_int_to_money_pipe__WEBPACK_IMPORTED_MODULE_3__["IntToMoneyPipe"], _safe_html_pipe__WEBPACK_IMPORTED_MODULE_4__["SafeHTMLPipe"], _money_to_int_pipe__WEBPACK_IMPORTED_MODULE_5__["MoneyToIntPipe"], _history_type_messages_pipe__WEBPACK_IMPORTED_MODULE_6__["HistoryTypeMessagesPipe"], _contract_time_left_pipe__WEBPACK_IMPORTED_MODULE_7__["ContractTimeLeftPipe"], _contract_status_messages_pipe__WEBPACK_IMPORTED_MODULE_8__["ContractStatusMessagesPipe"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            exports: [_int_to_money_pipe__WEBPACK_IMPORTED_MODULE_3__["IntToMoneyPipe"], _safe_html_pipe__WEBPACK_IMPORTED_MODULE_4__["SafeHTMLPipe"], _money_to_int_pipe__WEBPACK_IMPORTED_MODULE_5__["MoneyToIntPipe"], _history_type_messages_pipe__WEBPACK_IMPORTED_MODULE_6__["HistoryTypeMessagesPipe"], _contract_time_left_pipe__WEBPACK_IMPORTED_MODULE_7__["ContractTimeLeftPipe"], _contract_status_messages_pipe__WEBPACK_IMPORTED_MODULE_8__["ContractStatusMessagesPipe"]],
            providers: [_int_to_money_pipe__WEBPACK_IMPORTED_MODULE_3__["IntToMoneyPipe"], _safe_html_pipe__WEBPACK_IMPORTED_MODULE_4__["SafeHTMLPipe"], _money_to_int_pipe__WEBPACK_IMPORTED_MODULE_5__["MoneyToIntPipe"], _history_type_messages_pipe__WEBPACK_IMPORTED_MODULE_6__["HistoryTypeMessagesPipe"], _contract_time_left_pipe__WEBPACK_IMPORTED_MODULE_7__["ContractTimeLeftPipe"], _contract_status_messages_pipe__WEBPACK_IMPORTED_MODULE_8__["ContractStatusMessagesPipe"]]
        })
    ], PipesModule);
    return PipesModule;
}());



/***/ }),

/***/ "./src/app/_helpers/pipes/safe-html.pipe.ts":
/*!**************************************************!*\
  !*** ./src/app/_helpers/pipes/safe-html.pipe.ts ***!
  \**************************************************/
/*! exports provided: SafeHTMLPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SafeHTMLPipe", function() { return SafeHTMLPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");



var SafeHTMLPipe = /** @class */ (function () {
    function SafeHTMLPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafeHTMLPipe.prototype.transform = function (html) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    };
    SafeHTMLPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'safeHTML'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]])
    ], SafeHTMLPipe);
    return SafeHTMLPipe;
}());



/***/ }),

/***/ "./src/app/_helpers/services/backend.service.ts":
/*!******************************************************!*\
  !*** ./src/app/_helpers/services/backend.service.ts ***!
  \******************************************************/
/*! exports provided: ParamsType, getParamsType, convertersObjectForTypes, convertorParams, StatusCurrentActionState, BackendService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParamsType", function() { return ParamsType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParamsType", function() { return getParamsType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertersObjectForTypes", function() { return convertersObjectForTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertorParams", function() { return convertorParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatusCurrentActionState", function() { return StatusCurrentActionState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BackendService", function() { return BackendService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _variables_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _modal_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modal.service */ "./src/app/_helpers/services/modal.service.ts");
/* harmony import */ var _pipes_money_to_int_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../pipes/money-to-int.pipe */ "./src/app/_helpers/pipes/money-to-int.pipe.ts");
/* harmony import */ var json_bignumber__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! json-bignumber */ "./node_modules/json-bignumber/src/JSONBigNumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! bignumber.js */ "./node_modules/bignumber.js/bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_8__);

var _a;








var ParamsType;
(function (ParamsType) {
    ParamsType["array"] = "array";
    ParamsType["object"] = "object";
    ParamsType["string"] = "string";
})(ParamsType || (ParamsType = {}));
var getParamsType = function (value) {
    if (!value) {
        return null;
    }
    var array = Array.isArray(value) && ParamsType.array;
    var object = Object.keys(ParamsType).includes(typeof value) && ParamsType[typeof value];
    return array || object || null;
};
var convertersObjectForTypes = (_a = {},
    _a[ParamsType.string] = function (value) { return value; },
    _a[ParamsType.object] = function (value) { return json_bignumber__WEBPACK_IMPORTED_MODULE_7__["default"].stringify(value); },
    _a[ParamsType.array] = function (value) { return value.map(function (v) {
        return typeof v === ParamsType.string ? v : json_bignumber__WEBPACK_IMPORTED_MODULE_7__["default"].stringify(v);
    }); },
    _a);
var convertorParams = function (value) {
    var type = getParamsType(value);
    return convertersObjectForTypes[type](value);
};
var StatusCurrentActionState;
(function (StatusCurrentActionState) {
    StatusCurrentActionState["STATE_SENDING"] = "STATE_SENDING";
    StatusCurrentActionState["STATE_SENT_SUCCESS"] = "STATE_SENT_SUCCESS";
    StatusCurrentActionState["STATE_SEND_FAILED"] = "STATE_SEND_FAILED";
    StatusCurrentActionState["STATE_INITIALIZING"] = "STATE_INITIALIZING";
    StatusCurrentActionState["STATE_DOWNLOADING_CONSENSUS"] = "STATE_DOWNLOADING_CONSENSUS";
    StatusCurrentActionState["STATE_MAKING_TUNNEL_A"] = "STATE_MAKING_TUNNEL_A";
    StatusCurrentActionState["STATE_MAKING_TUNNEL_B"] = "STATE_MAKING_TUNNEL_B";
    StatusCurrentActionState["STATE_CREATING_STREAM"] = "STATE_CREATING_STREAM";
    StatusCurrentActionState["STATE_FAILED"] = "STATE_FAILED";
    StatusCurrentActionState["STATE_SUCCESS"] = "STATE_SUCCESS";
})(StatusCurrentActionState || (StatusCurrentActionState = {}));
var BackendService = /** @class */ (function () {
    function BackendService(translate, variablesService, modalService, moneyToIntPipe, ngZone) {
        this.translate = translate;
        this.variablesService = variablesService;
        this.modalService = modalService;
        this.moneyToIntPipe = moneyToIntPipe;
        this.ngZone = ngZone;
        this.dispatchAsyncCallResult$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.handleCurrentActionState$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.backendLoaded = false;
    }
    BackendService_1 = BackendService;
    BackendService.bigNumberParser = function (key, val) {
        if (val.constructor.name === 'BigNumber' &&
            ['balance', 'unlocked_balance', 'amount', 'fee', 'b_fee', 'to_pay', 'a_pledge', 'b_pledge', 'coast', 'a'].indexOf(key) === -1) {
            return val.toNumber();
        }
        if (key === 'rcv' || key === 'spn') {
            for (var i = 0; i < val.length; i++) {
                val[i] = new bignumber_js__WEBPACK_IMPORTED_MODULE_8__["BigNumber"](val[i]);
            }
        }
        return val;
    };
    BackendService.Debug = function (type, message) {
        switch (type) {
            case 0:
                console.error(message);
                break;
            case 1:
                console.warn(message);
                break;
            case 2:
                console.log(message);
                break;
            default:
                console.log(message);
                break;
        }
    };
    BackendService.prototype.informerRun = function (error, params, command) {
        var error_translate = '';
        switch (error) {
            case 'NOT_ENOUGH_MONEY':
                error_translate = 'ERRORS.NOT_ENOUGH_MONEY';
                // error_translate = 'ERRORS.NO_MONEY'; maybe that one?
                if (command === 'cancel_offer') {
                    error_translate = this.translate.instant('ERRORS.NO_MONEY_REMOVE_OFFER', {
                        'fee': this.variablesService.default_fee,
                        'currency': this.variablesService.defaultCurrency
                    });
                }
                break;
            case 'CORE_BUSY':
                error_translate = 'ERRORS.CORE_BUSY';
                break;
            case 'BUSY':
                error_translate = 'ERRORS.DAEMON_BUSY';
                break;
            case 'OVERFLOW':
                if (command !== 'get_all_aliases') {
                    error_translate = '';
                }
                break;
            case 'NOT_ENOUGH_OUTPUTS_FOR_MIXING':
                error_translate = 'ERRORS.NOT_ENOUGH_OUTPUTS_TO_MIX';
                break;
            case 'TX_IS_TOO_BIG':
                error_translate = 'ERRORS.TRANSACTION_IS_TO_BIG';
                break;
            case 'DISCONNECTED':
                error_translate = 'ERRORS.TRANSFER_ATTEMPT';
                break;
            case 'ACCESS_DENIED':
                error_translate = 'ERRORS.ACCESS_DENIED';
                break;
            case 'TX_REJECTED':
                // if (command === 'request_alias_registration') {
                // error_translate = 'INFORMER.ALIAS_IN_REGISTER';
                // } else {
                error_translate = 'ERRORS.TRANSACTION_ERROR';
                // }
                break;
            case 'INTERNAL_ERROR':
                error_translate = 'ERRORS.TRANSACTION_ERROR';
                break;
            case 'BAD_ARG':
                error_translate = 'ERRORS.BAD_ARG';
                break;
            case 'WALLET_WRONG_ID':
                error_translate = 'ERRORS.WALLET_WRONG_ID';
                break;
            case 'WALLET_WATCH_ONLY_NOT_SUPPORTED':
                error_translate = 'ERRORS.WALLET_WATCH_ONLY_NOT_SUPPORTED';
                break;
            // case 'WRONG_PASSWORD':
            // params = JSON.parse(params);
            // if (!params.testEmpty) {
            //   error_translate = 'ERRORS.WRONG_PASSWORD';
            // }
            // break;
            case 'FILE_RESTORED':
                if (command === 'open_wallet') {
                    error_translate = 'ERRORS.FILE_RESTORED';
                }
                break;
            case 'FILE_NOT_FOUND':
                if (command !== 'open_wallet' && command !== 'get_alias_info_by_name' && command !== 'get_alias_info_by_address') {
                    error_translate = this.translate.instant('ERRORS.FILE_NOT_FOUND');
                    params = JSON.parse(params);
                    if (params.path) {
                        error_translate += ': ' + params.path;
                    }
                }
                break;
            case 'NOT_FOUND':
                if (command !== 'open_wallet' && command !== 'get_alias_info_by_name' && command !== 'get_alias_info_by_address') {
                    error_translate = this.translate.instant('ERRORS.FILE_NOT_FOUND');
                    params = JSON.parse(params);
                    if (params.path) {
                        error_translate += ': ' + params.path;
                    }
                }
                break;
            case 'CANCELED':
            case '':
                break;
            case 'FAIL':
                if (command === 'create_proposal' ||
                    command === 'accept_proposal' ||
                    command === 'release_contract' ||
                    command === 'request_cancel_contract' ||
                    command === 'accept_cancel_contract') {
                    error_translate = ' ';
                }
                break;
            case 'ALREADY_EXISTS':
                error_translate = 'ERRORS.FILE_EXIST';
                break;
            case 'FAILED':
                BackendService_1.Debug(0, "Error: (" + error + ") was triggered by command: " + command);
                break;
            default:
                error_translate = '';
        }
        if (error.indexOf('FAIL:failed to save file') > -1) {
            error_translate = 'ERRORS.FILE_NOT_SAVED';
        }
        if (error.indexOf('FAILED:failed to open binary wallet file for saving') > -1 && command === 'generate_wallet') {
            error_translate = '';
        }
        if (error_translate !== '') {
            this.modalService.prepareModal('error', error_translate);
        }
    };
    BackendService.prototype.commandDebug = function (command, params, result) {
        BackendService_1.Debug(2, '----------------- ' + command + ' -----------------');
        var debug = {
            _send_params: params,
            _result: result
        };
        BackendService_1.Debug(2, debug);
        try {
            BackendService_1.Debug(2, json_bignumber__WEBPACK_IMPORTED_MODULE_7__["default"].parse(result, BackendService_1.bigNumberParser));
        }
        catch (e) {
            BackendService_1.Debug(2, { response_data: result, error_code: 'OK' });
        }
    };
    BackendService.prototype.backendCallback = function (resultStr, params, callback, command) {
        var _this = this;
        var Result = resultStr;
        if (command !== 'get_clipboard') {
            if (!resultStr || resultStr === '') {
                Result = {};
            }
            else {
                try {
                    Result = json_bignumber__WEBPACK_IMPORTED_MODULE_7__["default"].parse(resultStr, BackendService_1.bigNumberParser);
                }
                catch (e) {
                    Result = { response_data: resultStr, error_code: 'OK' };
                }
            }
        }
        else {
            Result = {
                error_code: 'OK',
                response_data: Result
            };
        }
        var core_busy = Result.error_code === 'CORE_BUSY';
        var Status = (Result.error_code === 'OK' || Result.error_code === 'TRUE');
        if (!Status && Status !== undefined && Result.error_code !== undefined) {
            BackendService_1.Debug(1, 'API error for command: "' + command + '". Error code: ' + Result.error_code);
        }
        var data = ((typeof Result === 'object') && 'response_data' in Result) ? Result.response_data : Result;
        var res_error_code = false;
        if (typeof Result === 'object' &&
            'error_code' in Result && Result.error_code !== 'OK' &&
            Result.error_code !== 'TRUE' &&
            Result.error_code !== 'FALSE' &&
            Result.error_code !== 'WRAP') {
            if (core_busy) {
                setTimeout(function () {
                    // this is will avoid update data when user
                    // on other wallet after CORE_BUSY (blink of data)
                    if (command !== 'get_recent_transfers') {
                        _this.runCommand(command, params, callback);
                    }
                    else {
                        var current_wallet_id = _this.variablesService.currentWallet.wallet_id;
                        if (current_wallet_id === params.wallet_id) {
                            _this.runCommand(command, params, callback);
                        }
                    }
                }, 50);
            }
            else {
                this.informerRun(Result.error_code, params, command);
                res_error_code = Result.error_code;
            }
        }
        // if ( command === 'get_offers_ex' ){
        //   Service.printLog( "get_offers_ex offers count "+((data.offers)?data.offers.length:0) );
        // }
        if (!core_busy) {
            if (typeof callback === 'function') {
                callback(Status, data, res_error_code);
            }
            else {
                return data;
            }
        }
    };
    BackendService.prototype.runCommand = function (command, params, callback) {
        if (!this.backendObject) {
            return;
        }
        if (command === 'get_recent_transfers') {
            this.variablesService.get_recent_transfers = true;
        }
        var Action = this.backendObject[command];
        if (!Action) {
            BackendService_1.Debug(0, 'Run Command Error! Command "' + command + '" don\'t found in backendObject');
            return;
        }
        var that = this;
        var type = getParamsType(params);
        params = params && convertorParams(params);
        if (type === ParamsType.array) {
            Action.apply(void 0, params.concat([function (resultStr) {
                    that.commandDebug(command, params, resultStr);
                    return that.backendCallback(resultStr, params, callback, command);
                }]));
            return;
        }
        if (command === 'get_recent_transfers') {
            this.variablesService.get_recent_transfers = false;
        }
        Action(params, function (resultStr) {
            that.commandDebug(command, params, resultStr);
            return that.backendCallback(resultStr, params, callback, command);
        });
    };
    BackendService.prototype.eventSubscribe = function (command, callback) {
        if (command === 'on_core_event') {
            this.backendObject[command].connect(callback);
        }
        else {
            this.backendObject[command].connect(function (str) {
                callback(json_bignumber__WEBPACK_IMPORTED_MODULE_7__["default"].parse(str, BackendService_1.bigNumberParser));
            });
        }
    };
    BackendService.prototype.initService = function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (observer) {
            if (!_this.backendLoaded) {
                _this.backendLoaded = true;
                var that_1 = _this;
                window.QWebChannel(window.qt.webChannelTransport, function (channel) {
                    that_1.backendObject = channel.objects.mediator_object;
                    observer.next('ok');
                });
            }
            else {
                if (!_this.backendObject) {
                    observer.error('error');
                    observer.error('error');
                }
            }
        });
    };
    BackendService.prototype.webkitLaunchedScript = function () {
        return this.runCommand('webkit_launched_script');
    };
    BackendService.prototype.quitRequest = function () {
        return this.runCommand('on_request_quit');
    };
    BackendService.prototype.getAppData = function (callback) {
        this.runCommand('get_app_data', {}, callback);
    };
    BackendService.prototype.storeAppData = function (callback) {
        var _this = this;
        if (this.variablesService.wallets.length) {
            this.variablesService.settings.wallets = [];
            this.variablesService.wallets.forEach(function (wallet) {
                _this.variablesService.settings.wallets.push({ name: wallet.name, path: wallet.path });
            });
        }
        this.runCommand('store_app_data', this.variablesService.settings, callback);
    };
    BackendService.prototype.getSecureAppData = function (pass, callback) {
        this.runCommand('get_secure_app_data', pass, callback);
    };
    BackendService.prototype.setMasterPassword = function (pass, callback) {
        this.runCommand('set_master_password', pass, callback);
    };
    BackendService.prototype.checkMasterPassword = function (pass, callback) {
        this.runCommand('check_master_password', pass, callback);
    };
    BackendService.prototype.getIsDisabledNotifications = function (callback) {
        var params = {};
        this.runCommand('get_is_disabled_notifications', params, callback);
    };
    BackendService.prototype.setIsDisabledNotifications = function (state) {
        this.runCommand('set_is_disabled_notifications', state);
    };
    BackendService.prototype.storeSecureAppData = function (callback) {
        var _this = this;
        var data;
        var wallets = [];
        var contacts = [];
        this.variablesService.wallets.forEach(function (wallet) {
            wallets.push({ name: wallet.name, pass: wallet.pass, path: wallet.path, staking: wallet.staking });
        });
        this.variablesService.contacts.forEach(function (contact) {
            contacts.push({ name: contact.name, address: contact.address, notes: contact.notes });
        });
        data = { wallets: wallets, contacts: contacts };
        this.backendObject['store_secure_app_data'](JSON.stringify(data), this.variablesService.appPass, function (dataStore) {
            _this.backendCallback(dataStore, {}, callback, 'store_secure_app_data');
        });
    };
    BackendService.prototype.dropSecureAppData = function (callback) {
        var _this = this;
        this.backendObject['drop_secure_app_data'](function (dataStore) {
            _this.backendCallback(dataStore, {}, callback, 'drop_secure_app_data');
        });
    };
    BackendService.prototype.haveSecureAppData = function (callback) {
        this.runCommand('have_secure_app_data', {}, callback);
    };
    BackendService.prototype.saveFileDialog = function (caption, fileMask, default_path, callback) {
        var dir = default_path ? default_path : '/';
        var params = {
            caption: caption,
            filemask: fileMask,
            default_dir: dir
        };
        this.runCommand('show_savefile_dialog', params, callback);
    };
    BackendService.prototype.openFileDialog = function (caption, fileMask, default_path, callback) {
        var dir = default_path ? default_path : '/';
        var params = {
            caption: caption,
            filemask: fileMask,
            default_dir: dir
        };
        this.runCommand('show_openfile_dialog', params, callback);
    };
    BackendService.prototype.storeFile = function (path, buff) {
        this.backendObject['store_to_file'](path, buff);
    };
    BackendService.prototype.loadFile = function (path, callback) {
        this.runCommand('load_from_file', path, callback);
    };
    BackendService.prototype.push_offer = function (params, callback) {
        this.runCommand('push_offer', params, callback);
    };
    BackendService.prototype.generateWallet = function (path, pass, callback) {
        var params = {
            path: path,
            pass: pass
        };
        this.runCommand('generate_wallet', params, callback);
    };
    BackendService.prototype.exportWalletHistory = function (json_string) {
        this.runCommand('export_wallet_history', json_string);
    };
    BackendService.prototype.openWallet = function (path, pass, txs_to_return, testEmpty, callback) {
        var params = {
            path: path,
            pass: pass,
            txs_to_return: txs_to_return
        };
        params['testEmpty'] = !!(testEmpty);
        this.runCommand('open_wallet', params, callback);
    };
    BackendService.prototype.closeWallet = function (wallet_id, callback) {
        this.runCommand('close_wallet', { wallet_id: +wallet_id }, callback);
    };
    BackendService.prototype.getSmartWalletInfo = function (_a, callback) {
        var wallet_id = _a.wallet_id, seed_password = _a.seed_password;
        this.runCommand('get_smart_wallet_info', { wallet_id: +wallet_id, seed_password: seed_password }, callback);
    };
    BackendService.prototype.getSeedPhraseInfo = function (param, callback) {
        this.runCommand('get_seed_phrase_info', param, callback);
    };
    BackendService.prototype.runWallet = function (wallet_id, callback) {
        this.runCommand('run_wallet', { wallet_id: +wallet_id }, callback);
    };
    BackendService.prototype.isValidRestoreWalletText = function (param, callback) {
        this.runCommand('is_valid_restore_wallet_text', param, callback);
    };
    BackendService.prototype.restoreWallet = function (path, pass, seed_phrase, seed_pass, callback) {
        var params = {
            seed_phrase: seed_phrase,
            path: path,
            pass: pass,
            seed_pass: seed_pass
        };
        this.runCommand('restore_wallet', params, callback);
    };
    BackendService.prototype.sendMoney = function (from_wallet_id, to_address, amount, fee, mixin, comment, hide, callback) {
        var params = {
            wallet_id: parseInt(from_wallet_id, 10),
            destinations: [
                {
                    address: to_address,
                    amount: amount
                }
            ],
            mixin_count: (mixin) ? parseInt(mixin, 10) : 0,
            lock_time: 0,
            fee: this.moneyToIntPipe.transform(fee),
            comment: comment,
            push_payer: !hide
        };
        this.asyncCall('transfer', params, callback);
    };
    BackendService.prototype.validateAddress = function (address, callback) {
        this.runCommand('validate_address', address, callback);
    };
    BackendService.prototype.setClipboard = function (str, callback) {
        return this.runCommand('set_clipboard', str, callback);
    };
    BackendService.prototype.getClipboard = function (callback) {
        return this.runCommand('get_clipboard', {}, callback);
    };
    BackendService.prototype.createProposal = function (wallet_id, title, comment, a_addr, b_addr, to_pay, a_pledge, b_pledge, time, payment_id, callback) {
        var params = {
            wallet_id: parseInt(wallet_id, 10),
            details: {
                t: title,
                c: comment,
                a_addr: a_addr,
                b_addr: b_addr,
                to_pay: this.moneyToIntPipe.transform(to_pay),
                a_pledge: this.moneyToIntPipe.transform(a_pledge),
                b_pledge: this.moneyToIntPipe.transform(b_pledge)
            },
            payment_id: payment_id,
            expiration_period: parseInt(time, 10) * 60 * 60,
            fee: this.variablesService.default_fee_big,
            b_fee: this.variablesService.default_fee_big
        };
        BackendService_1.Debug(1, params);
        this.runCommand('create_proposal', params, callback);
    };
    BackendService.prototype.getContracts = function (wallet_id, callback) {
        var params = {
            wallet_id: parseInt(wallet_id, 10)
        };
        BackendService_1.Debug(1, params);
        this.runCommand('get_contracts', params, callback);
    };
    BackendService.prototype.acceptProposal = function (wallet_id, contract_id, callback) {
        var params = {
            wallet_id: parseInt(wallet_id, 10),
            contract_id: contract_id
        };
        BackendService_1.Debug(1, params);
        this.runCommand('accept_proposal', params, callback);
    };
    BackendService.prototype.releaseProposal = function (wallet_id, contract_id, release_type, callback) {
        var params = {
            wallet_id: parseInt(wallet_id, 10),
            contract_id: contract_id,
            release_type: release_type // "normal" or "burn"
        };
        BackendService_1.Debug(1, params);
        this.runCommand('release_contract', params, callback);
    };
    BackendService.prototype.requestCancelContract = function (wallet_id, contract_id, time, callback) {
        var params = {
            wallet_id: parseInt(wallet_id, 10),
            contract_id: contract_id,
            fee: this.variablesService.default_fee_big,
            expiration_period: parseInt(time, 10) * 60 * 60
        };
        BackendService_1.Debug(1, params);
        this.runCommand('request_cancel_contract', params, callback);
    };
    BackendService.prototype.acceptCancelContract = function (wallet_id, contract_id, callback) {
        var params = {
            wallet_id: parseInt(wallet_id, 10),
            contract_id: contract_id
        };
        BackendService_1.Debug(1, params);
        this.runCommand('accept_cancel_contract', params, callback);
    };
    BackendService.prototype.getMiningHistory = function (wallet_id, callback) {
        this.runCommand('get_mining_history', { wallet_id: parseInt(wallet_id, 10) }, callback);
    };
    BackendService.prototype.startPosMining = function (wallet_id, callback) {
        this.runCommand('start_pos_mining', { wallet_id: parseInt(wallet_id, 10) }, callback);
    };
    BackendService.prototype.stopPosMining = function (wallet_id, callback) {
        this.runCommand('stop_pos_mining', { wallet_id: parseInt(wallet_id, 10) }, callback);
    };
    BackendService.prototype.openUrlInBrowser = function (url, callback) {
        this.runCommand('open_url_in_browser', url, callback);
    };
    BackendService.prototype.start_backend = function (node, host, port, callback) {
        var params = {
            configure_for_remote_node: node,
            remote_node_host: host,
            remote_node_port: parseInt(port, 10)
        };
        this.runCommand('start_backend', params, callback);
    };
    BackendService.prototype.getDefaultFee = function (callback) {
        this.runCommand('get_default_fee', {}, callback);
    };
    BackendService.prototype.setBackendLocalization = function (stringsArray, title, callback) {
        var params = {
            strings: stringsArray,
            language_title: title
        };
        this.runCommand('set_localization_strings', params, callback);
    };
    BackendService.prototype.registerAlias = function (wallet_id, alias, address, fee, comment, reward, callback) {
        var params = {
            wallet_id: wallet_id,
            alias: {
                alias: alias,
                address: address,
                tracking_key: '',
                comment: comment
            },
            fee: this.moneyToIntPipe.transform(fee),
            reward: this.moneyToIntPipe.transform(reward)
        };
        this.runCommand('request_alias_registration', params, callback);
    };
    BackendService.prototype.updateAlias = function (wallet_id, alias, fee, callback) {
        var params = {
            wallet_id: wallet_id,
            alias: {
                alias: alias.name.replace('@', ''),
                address: alias.address,
                tracking_key: '',
                comment: alias.comment
            },
            fee: this.moneyToIntPipe.transform(fee)
        };
        this.runCommand('request_alias_update', params, callback);
    };
    BackendService.prototype.getAllAliases = function (callback) {
        this.runCommand('get_all_aliases', {}, callback);
    };
    BackendService.prototype.getAliasByName = function (value, callback) {
        return this.runCommand('get_alias_info_by_name', value, callback);
    };
    BackendService.prototype.getAliasByAddress = function (value, callback) {
        return this.runCommand('get_alias_info_by_address', value, callback);
    };
    BackendService.prototype.getAliasCoast = function (alias, callback) {
        this.runCommand('get_alias_coast', { v: alias }, callback);
    };
    BackendService.prototype.resyncWallet = function (id) {
        this.runCommand('resync_wallet', { wallet_id: id });
    };
    BackendService.prototype.getWalletAlias = function (address) {
        var _this = this;
        if (address !== null && this.variablesService.daemon_state === 2) {
            if (this.variablesService.aliasesChecked[address] == null) {
                this.variablesService.aliasesChecked[address] = {};
                if (this.variablesService.aliases.length) {
                    for (var i = 0, length_1 = this.variablesService.aliases.length; i < length_1; i++) {
                        if (i in this.variablesService.aliases && this.variablesService.aliases[i]['address'] === address) {
                            this.variablesService.aliasesChecked[address]['name'] = this.variablesService.aliases[i].name;
                            this.variablesService.aliasesChecked[address]['address'] = this.variablesService.aliases[i].address;
                            this.variablesService.aliasesChecked[address]['comment'] = this.variablesService.aliases[i].comment;
                            return this.variablesService.aliasesChecked[address];
                        }
                    }
                }
                this.getAliasByAddress(address, function (status, data) {
                    if (status) {
                        _this.variablesService.aliasesChecked[data.address]['name'] = '@' + data.alias;
                        _this.variablesService.aliasesChecked[data.address]['address'] = data.address;
                        _this.variablesService.aliasesChecked[data.address]['comment'] = data.comment;
                    }
                });
            }
            return this.variablesService.aliasesChecked[address];
        }
        return {};
    };
    BackendService.prototype.getContactAlias = function () {
        var _this = this;
        if (this.variablesService.contacts.length && this.variablesService.daemon_state === 2) {
            this.variablesService.contacts.map(function (contact) {
                _this.getAliasByAddress(contact.address, function (status, data) {
                    if (status) {
                        if (data.alias) {
                            contact.alias = '@' + data.alias;
                        }
                    }
                    else {
                        contact.alias = null;
                    }
                });
            });
        }
    };
    BackendService.prototype.getRecentTransfers = function (id, offset, count, exclude_mining_txs, callback) {
        var params = {
            wallet_id: id,
            offset: offset,
            count: count,
            exclude_mining_txs: exclude_mining_txs
        };
        this.runCommand('get_recent_transfers', params, callback);
    };
    BackendService.prototype.getPoolInfo = function (callback) {
        this.runCommand('get_tx_pool_info', {}, callback);
    };
    BackendService.prototype.getVersion = function (callback) {
        var _this = this;
        this.runCommand('get_version', {}, function (status, version, errorVersion) {
            _this.runCommand('get_network_type', {}, function (status_network, type, errorType) {
                callback(version, type, (errorVersion || errorType));
            });
        });
    };
    BackendService.prototype.setLogLevel = function (level) {
        return this.runCommand('set_log_level', { v: level });
    };
    BackendService.prototype.asyncCall = function (command, params, callback) {
        return this.runCommand('async_call', [command, params], function (status, _a) {
            var job_id = _a.job_id;
            callback(job_id);
        });
    };
    BackendService.prototype.dispatchAsyncCallResult = function () {
        var _this = this;
        this.backendObject['dispatch_async_call_result'].connect(function (job_id, json_resp) {
            var asyncCommandResults = {
                job_id: +job_id,
                response: JSON.parse(json_resp)
            };
            _this.ngZone.run(function () { return _this.dispatchAsyncCallResult$.next(asyncCommandResults); });
        });
    };
    BackendService.prototype.handleCurrentActionState = function () {
        var _this = this;
        this.backendObject['handle_current_action_state']
            .connect(function (response) {
            var currentActionState = JSON.parse(response);
            _this.ngZone.run(function () { return _this.handleCurrentActionState$.next(currentActionState); });
        });
    };
    BackendService.prototype.setEnableTor = function (value) {
        return this.runCommand('set_enable_tor', { v: value });
    };
    BackendService.prototype.getOptions = function () {
        var _this = this;
        return this.runCommand('get_options', {}, function (status, _a) {
            var disable_price_fetch = _a.disable_price_fetch, use_debug_mode = _a.use_debug_mode;
            _this.variablesService.disable_price_fetch$.next(disable_price_fetch);
            _this.variablesService.use_debug_mode$.next(use_debug_mode);
        });
    };
    var BackendService_1;
    BackendService = BackendService_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__["TranslateService"],
            _variables_service__WEBPACK_IMPORTED_MODULE_4__["VariablesService"],
            _modal_service__WEBPACK_IMPORTED_MODULE_5__["ModalService"],
            _pipes_money_to_int_pipe__WEBPACK_IMPORTED_MODULE_6__["MoneyToIntPipe"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], BackendService);
    return BackendService;
}());

/*

      toggleAutoStart: function (value) {
        return this.runCommand('toggle_autostart', asVal(value));
      },

      getOptions: function (callback) {
        return this.runCommand('get_options', {}, callback);
      },

      isFileExist: function (path, callback) {
        return this.runCommand('is_file_exist', path, callback);
      },

      isAutoStartEnabled: function (callback) {
        this.runCommand('is_autostart_enabled', {}, function (status, data) {
          if (angular.isFunction(callback)) {
            callback('error_code' in data && data.error_code !== 'FALSE')
          }
        });
      },

      resetWalletPass: function (wallet_id, pass, callback) {
        this.runCommand('reset_wallet_password', {wallet_id: wallet_id, pass: pass}, callback);
      },



      getOsVersion: function (callback) {
        this.runCommand('get_os_version', {}, function (status, version) {
          callback(version)
        })
      },

      getLogFile: function (callback) {
        this.runCommand('get_log_file', {}, function (status, version) {
          callback(version)
        })
      },

      resync_wallet: function (wallet_id, callback) {
        this.runCommand('resync_wallet', {wallet_id: wallet_id}, callback);
      },

      storeFile: function (path, buff, callback) {
        this.backendObject['store_to_file'](path, (typeof buff === 'string' ? buff : JSON.stringify(buff)), function (data) {
          backendCallback(data, {}, callback, 'store_to_file');
        });
      },

      getMiningEstimate: function (amount_coins, time, callback) {
        var params = {
          "amount_coins": $filter('money_to_int')(amount_coins),
          "time": parseInt(time)
        };
        this.runCommand('get_mining_estimate', params, callback);
      },

      backupWalletKeys: function (wallet_id, path, callback) {
        var params = {
          "wallet_id": wallet_id,
          "path": path
        };
        this.runCommand('backup_wallet_keys', params, callback);
      },

      setBlockedIcon: function (enabled, callback) {
        var mode = (enabled) ? "blocked" : "normal";
        Service.runCommand('bool_toggle_icon', mode, callback);
      },

      getWalletInfo: function (wallet_id, callback) {
        this.runCommand('get_wallet_info', {wallet_id: wallet_id}, callback);
      },

      printText: function (content) {
        return this.runCommand('print_text', {html_text: content});
      },

      printLog: function (msg, log_level) {
        return this.runCommand('print_log', {msg: msg, log_level: log_level});
      },

*/


/***/ }),

/***/ "./src/app/_helpers/services/modal.service.ts":
/*!****************************************************!*\
  !*** ./src/app/_helpers/services/modal.service.ts ***!
  \****************************************************/
/*! exports provided: ModalService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalService", function() { return ModalService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _modals_modal_container_modal_container_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modals/modal-container/modal-container.component */ "./src/app/_helpers/modals/modal-container/modal-container.component.ts");




var ModalService = /** @class */ (function () {
    function ModalService(componentFactoryResolver, appRef, injector, ngZone, translate) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
        this.ngZone = ngZone;
        this.translate = translate;
        this.components = [];
    }
    ModalService.prototype.prepareModal = function (type, message) {
        var _this = this;
        var length = this.components.push(this.componentFactoryResolver.resolveComponentFactory(_modals_modal_container_modal_container_component__WEBPACK_IMPORTED_MODULE_3__["ModalContainerComponent"]).create(this.injector));
        this.components[length - 1].instance['type'] = type;
        this.components[length - 1].instance['message'] = message.length ? this.translate.instant(message) : '';
        this.components[length - 1].instance['close'].subscribe(function () {
            _this.removeModal(length - 1);
        });
        this.ngZone.run(function () {
            _this.appendModal(length - 1);
        });
    };
    ModalService.prototype.appendModal = function (index) {
        var _this = this;
        setTimeout(function () {
            _this.appRef.attachView(_this.components[index].hostView);
            var domElem = _this.components[index].hostView.rootNodes[0];
            document.body.appendChild(domElem);
        });
    };
    ModalService.prototype.removeModal = function (index) {
        if (this.components[index]) {
            this.appRef.detachView(this.components[index].hostView);
            this.components[index].destroy();
            this.components.splice(index, 1);
        }
        else {
            var last = this.components.length - 1;
            this.appRef.detachView(this.components[last].hostView);
            this.components[last].destroy();
            this.components.splice(last, 1);
        }
    };
    ModalService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ApplicationRef"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"]])
    ], ModalService);
    return ModalService;
}());



/***/ }),

/***/ "./src/app/_helpers/services/pagination.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/_helpers/services/pagination.service.ts ***!
  \*********************************************************/
/*! exports provided: PaginationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginationService", function() { return PaginationService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _variables_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _pagination_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pagination.store */ "./src/app/_helpers/services/pagination.store.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);





var PaginationService = /** @class */ (function () {
    function PaginationService(variables, ngZone, paginationStore) {
        this.variables = variables;
        this.ngZone = ngZone;
        this.paginationStore = paginationStore;
    }
    PaginationService.prototype.paginate = function (currentPage) {
        var _this = this;
        if (currentPage === void 0) { currentPage = 1; }
        if (currentPage < 1) {
            currentPage = 1;
        }
        else if (currentPage > this.variables.currentWallet.totalPages) {
            currentPage = this.variables.currentWallet.totalPages;
        }
        var startPage, endPage;
        if (this.variables.currentWallet.totalPages <= this.variables.maxPages) {
            startPage = 1;
            endPage = this.variables.currentWallet.totalPages;
        }
        else {
            var maxPagesBeforeCurrentPage = Math.floor(this.variables.maxPages / 2);
            var maxPagesAfterCurrentPage = Math.ceil(this.variables.maxPages / 2) - 1;
            if (currentPage <= maxPagesBeforeCurrentPage) {
                startPage = 1;
                this.variables.currentWallet.totalPages > this.variables.maxPages
                    ? endPage = this.variables.maxPages
                    : endPage = this.variables.currentWallet.totalPages;
            }
            else if (currentPage + maxPagesAfterCurrentPage >= this.variables.currentWallet.totalPages) {
                startPage = this.variables.currentWallet.totalPages - this.variables.maxPages + 1;
                endPage = this.variables.currentWallet.totalPages;
            }
            else {
                startPage = currentPage - maxPagesBeforeCurrentPage;
                endPage = currentPage + maxPagesAfterCurrentPage;
            }
        }
        this.ngZone.run(function () {
            _this.variables.currentWallet.pages = Array.from(Array((endPage + 1) - startPage).keys()).map(function (i) { return startPage + i; });
        });
    };
    PaginationService.prototype.getOffset = function (walletID) {
        var mining = this.variables.currentWallet.exclude_mining_txs;
        var currentPage = (this.variables.currentWallet.currentPage);
        var offset = ((currentPage - 1) * this.variables.count);
        if (!mining) {
            return offset || 0;
        }
        var value = this.paginationStore.value;
        var pages = value.filter(function (item) { return item.walletID === walletID; });
        if (pages && pages.length) {
            var max = lodash__WEBPACK_IMPORTED_MODULE_4__["maxBy"](pages, 'page');
            var isForward = this.paginationStore.isForward(pages, currentPage);
            if (isForward) {
                offset = max.offset || 0;
            }
            else {
                var index = pages.findIndex(function (item) { return item.page === (currentPage); });
                offset = pages[index].offset || 0;
            }
        }
        return offset;
    };
    PaginationService.prototype.calcPages = function (data) {
        if (data.total_history_items && (data && data.history)) {
            this.variables.currentWallet.totalPages = Math.ceil(data.total_history_items / this.variables.count);
            this.variables.currentWallet.totalPages > this.variables.maxPages
                ? this.variables.currentWallet.pages = new Array(5).fill(1).map(function (value, index) { return value + index; })
                : this.variables.currentWallet.pages =
                    new Array(this.variables.currentWallet.totalPages).fill(1).map(function (value, index) { return value + index; });
        }
        else if (this.variables.currentWallet.restore) {
            this.variables.currentWallet.totalPages = Math.ceil(data.history.length / this.variables.count);
            this.variables.currentWallet.totalPages > this.variables.maxPages
                ? this.variables.currentWallet.pages = new Array(5).fill(1).map(function (value, index) { return value + index; })
                : this.variables.currentWallet.pages =
                    new Array(this.variables.currentWallet.totalPages).fill(1).map(function (value, index) { return value + index; });
        }
    };
    PaginationService.prototype.prepareHistory = function (data, status) {
        var _this = this;
        if (status && (data && data.total_history_items)) {
            this.variables.currentWallet.history.splice(0, this.variables.currentWallet.history.length);
            this.ngZone.run(function () {
                _this.paginate(_this.variables.currentWallet.currentPage);
                if (data.history.length !== 0) {
                    _this.variables.currentWallet.restore = false;
                    _this.variables.currentWallet.total_history_item = data.total_history_items;
                    _this.variables.currentWallet.prepareHistory(data.history);
                    if (_this.variables.currentWallet.currentPage === 1 && data.unconfirmed) {
                        _this.variables.currentWallet.prepareHistory(data.unconfirmed);
                    }
                }
            });
        }
    };
    PaginationService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_variables_service__WEBPACK_IMPORTED_MODULE_2__["VariablesService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            _pagination_store__WEBPACK_IMPORTED_MODULE_3__["PaginationStore"]])
    ], PaginationService);
    return PaginationService;
}());



/***/ }),

/***/ "./src/app/_helpers/services/pagination.store.ts":
/*!*******************************************************!*\
  !*** ./src/app/_helpers/services/pagination.store.ts ***!
  \*******************************************************/
/*! exports provided: PaginationStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginationStore", function() { return PaginationStore; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);




var PaginationStore = /** @class */ (function () {
    function PaginationStore() {
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.pages$ = this.subject.asObservable();
    }
    PaginationStore.prototype.isForward = function (pages, currentPage) {
        var max = lodash__WEBPACK_IMPORTED_MODULE_3__["maxBy"](pages, 'page');
        return !max || max.page < currentPage || max.page === currentPage;
    };
    PaginationStore.prototype.setPage = function (pageNumber, offset, walletID) {
        var newPages = [];
        var pages = this.subject.getValue();
        if (pages && pages.length) {
            newPages = pages.slice(0);
        }
        newPages.push({ page: pageNumber, offset: offset, walletID: walletID });
        this.subject.next(newPages);
    };
    Object.defineProperty(PaginationStore.prototype, "value", {
        get: function () {
            return this.subject.value;
        },
        enumerable: true,
        configurable: true
    });
    PaginationStore = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], PaginationStore);
    return PaginationStore;
}());



/***/ }),

/***/ "./src/app/_helpers/services/variables.service.ts":
/*!********************************************************!*\
  !*** ./src/app/_helpers/services/variables.service.ts ***!
  \********************************************************/
/*! exports provided: VariablesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VariablesService", function() { return VariablesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var idlejs_dist__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! idlejs/dist */ "./node_modules/idlejs/dist/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_contextmenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-contextmenu */ "./node_modules/ngx-contextmenu/fesm5/ngx-contextmenu.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bignumber.js */ "./node_modules/bignumber.js/bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_6__);







var VariablesService = /** @class */ (function () {
    function VariablesService(router, ngZone, contextMenuService) {
        var _this = this;
        this.router = router;
        this.ngZone = ngZone;
        this.contextMenuService = contextMenuService;
        this.disable_price_fetch$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
        this.use_debug_mode$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
        this.request_on_in = {};
        this.stop_paginate = {};
        this.sync_started = false;
        this.sync_wallets = {};
        this.digits = 8;
        this.appPass = '';
        this.appLogin = false;
        this.moneyEquivalent = 0;
        this.moneyEquivalentPercent = 0;
        this.defaultCurrency = 'INF';
        this.exp_med_ts = 0;
        this.net_time_delta_median = 0;
        this.height_app = 0;
        this.height_max = 0;
        this.downloaded = 0;
        this.total = 0;
        this.last_build_available = '';
        this.last_build_displaymode = 0;
        this.daemon_state = 3;
        this.deeplink$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.sendActionData$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]({});
        this.sync = {
            progress_value: 0,
            progress_value_text: '0'
        };
        this.download = {
            progress_value: 0,
            progress_value_text: '0'
        };
        this.get_recent_transfers = false; // avoid of execute function before callback complete
        this.default_fee = '0.01000000';
        this.default_fee_big = new bignumber_js__WEBPACK_IMPORTED_MODULE_6__["BigNumber"]('10000000000');
        this.settings = {
            appLockTime: 15,
            appLog: 0,
            scale: '10px',
            appUseTor: false,
            language: 'en',
            default_path: '/',
            viewedContracts: [],
            notViewedContracts: [],
            wallets: []
        };
        this.count = 40;
        this.maxPages = 5;
        this.testnet = false;
        this.networkType = ''; // testnet of mainnet
        this.wallets = [];
        this.aliases = [];
        this.aliasesChecked = {};
        this.enableAliasSearch = false;
        this.maxWalletNameLength = 25;
        this.maxCommentLength = 255;
        this.dataIsLoaded = false;
        this.contacts = [];
        this.newContact = { name: null, address: null, notes: null };
        this.pattern = '^[a-zA-Z0-9_.\\\]\*\|\~\!\?\@\#\$\%\^\&\+\{\}\(\)\<\>\:\;\"\'\-\=\/\,\[\\\\]*$';
        this.after_sync_request = {};
        this.getExpMedTsEvent = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.getHeightAppEvent = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.getHeightMaxEvent = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.getDownloadedAppEvent = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.getTotalEvent = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.getRefreshStackingEvent = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.getAliasChangedEvent = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.getWalletChangedEvent = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.idle = new idlejs_dist__WEBPACK_IMPORTED_MODULE_3__["Idle"]()
            .whenNotInteractive()
            .do(function () {
            if (_this.appPass === '') {
                _this.restartCountdown();
            }
            else {
                _this.ngZone.run(function () {
                    _this.idle.stop();
                    _this.appPass = '';
                    _this.appLogin = false;
                    _this.router.navigate(['/login'], { queryParams: { type: 'auth' } });
                });
            }
        });
    }
    Object.defineProperty(VariablesService.prototype, "isCurrentWalletSync", {
        get: function () {
            if (this.currentWallet) {
                var wallet_id = this.currentWallet.wallet_id;
                return this.sync_wallets[wallet_id] || false;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VariablesService.prototype, "isCurrentWalletLoaded", {
        get: function () {
            if (this.currentWallet) {
                var loaded = this.currentWallet.loaded;
                return loaded;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    VariablesService.prototype.setExpMedTs = function (timestamp) {
        if (timestamp !== this.exp_med_ts) {
            this.exp_med_ts = timestamp;
            this.getExpMedTsEvent.next(timestamp);
        }
    };
    VariablesService.prototype.setHeightApp = function (height) {
        if (height !== this.height_app) {
            this.height_app = height;
            this.getHeightAppEvent.next(height);
        }
    };
    VariablesService.prototype.setHeightMax = function (height) {
        if (height !== this.height_max) {
            this.height_max = height;
            this.getHeightMaxEvent.next(height);
        }
    };
    VariablesService.prototype.setDownloadedBytes = function (bytes) {
        if (bytes !== this.downloaded) {
            this.downloaded = this.bytesToMb(bytes);
            this.getDownloadedAppEvent.next(bytes);
        }
    };
    VariablesService.prototype.setTotalBytes = function (bytes) {
        if (bytes !== this.total) {
            this.total = this.bytesToMb(bytes);
            this.getTotalEvent.next(bytes);
        }
    };
    VariablesService.prototype.setRefreshStacking = function (wallet_id) {
        this.getHeightAppEvent.next(wallet_id);
    };
    VariablesService.prototype.changeAliases = function () {
        this.getAliasChangedEvent.next(true);
    };
    VariablesService.prototype.setCurrentWallet = function (id) {
        var _this = this;
        this.wallets.forEach(function (wallet) {
            if (wallet.wallet_id === id) {
                _this.currentWallet = wallet;
                _this.getWalletChangedEvent.next(wallet);
            }
        });
    };
    VariablesService.prototype.getWallet = function (id) {
        for (var i = 0; i < this.wallets.length; i++) {
            if (this.wallets[i].wallet_id === id) {
                return this.wallets[i];
            }
        }
        return null;
    };
    VariablesService.prototype.getNotLoadedWallet = function () {
        for (var i = 0; i < this.wallets.length; i++) {
            if (!this.wallets[i].loaded) {
                return this.wallets[i];
            }
        }
        return null;
    };
    VariablesService.prototype.startCountdown = function () {
        this.idle.within(this.settings.appLockTime).start();
    };
    VariablesService.prototype.stopCountdown = function () {
        this.idle.stop();
    };
    VariablesService.prototype.restartCountdown = function () {
        this.idle.within(this.settings.appLockTime).restart();
    };
    VariablesService.prototype.bytesToMb = function (bytes) {
        return Number((bytes / Math.pow(1024, 2)).toFixed(1));
    };
    VariablesService.prototype.onContextMenu = function ($event) {
        $event.target['contextSelectionStart'] = $event.target['selectionStart'];
        $event.target['contextSelectionEnd'] = $event.target['selectionEnd'];
        if ($event.target && ($event.target['nodeName'].toUpperCase() === 'TEXTAREA' || $event.target['nodeName'].toUpperCase() === 'INPUT') && !$event.target['readOnly']) {
            this.contextMenuService.show.next({
                contextMenu: this.allContextMenu,
                event: $event,
                item: $event.target,
            });
            $event.preventDefault();
            $event.stopPropagation();
        }
    };
    VariablesService.prototype.onContextMenuOnlyCopy = function ($event, copyText) {
        this.contextMenuService.show.next({
            contextMenu: this.onlyCopyContextMenu,
            event: $event,
            item: copyText
        });
        $event.preventDefault();
        $event.stopPropagation();
    };
    VariablesService.prototype.onContextMenuPasteSelect = function ($event) {
        $event.target['contextSelectionStart'] = $event.target['selectionStart'];
        $event.target['contextSelectionEnd'] = $event.target['selectionEnd'];
        console.warn($event.target);
        console.warn($event.target['disabled']);
        if ($event.target && ($event.target['nodeName'].toUpperCase() === 'TEXTAREA' || $event.target['nodeName'].toUpperCase() === 'INPUT') && !$event.target['readOnly']) {
            this.contextMenuService.show.next({
                contextMenu: this.pasteSelectContextMenu,
                event: $event,
                item: $event.target,
            });
            $event.preventDefault();
            $event.stopPropagation();
        }
    };
    VariablesService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], ngx_contextmenu__WEBPACK_IMPORTED_MODULE_5__["ContextMenuService"]])
    ], VariablesService);
    return VariablesService;
}());



/***/ }),

/***/ "./src/app/_helpers/services/wallets.service.ts":
/*!******************************************************!*\
  !*** ./src/app/_helpers/services/wallets.service.ts ***!
  \******************************************************/
/*! exports provided: WalletsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletsService", function() { return WalletsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _backend_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _variables_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./variables.service */ "./src/app/_helpers/services/variables.service.ts");





var WalletsService = /** @class */ (function () {
    function WalletsService(backendService, variablesService, router, ngZone) {
        this.backendService = backendService;
        this.variablesService = variablesService;
        this.router = router;
        this.ngZone = ngZone;
    }
    Object.defineProperty(WalletsService.prototype, "wallets", {
        get: function () {
            return this.variablesService.wallets;
        },
        set: function (value) {
            this.variablesService.wallets = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WalletsService.prototype, "currentWallet", {
        get: function () {
            return this.variablesService.currentWallet;
        },
        set: function (value) {
            this.variablesService.currentWallet = value;
        },
        enumerable: true,
        configurable: true
    });
    WalletsService.prototype.addWallet = function (wallet) {
        var wallet_id = wallet.wallet_id;
        this.variablesService.wallets.push(wallet);
    };
    WalletsService.prototype.getWalletById = function (wallet_id) {
        var wallets = this.variablesService.wallets;
        return wallets.find(function (w) { return w.wallet_id === wallet_id; });
    };
    WalletsService.prototype.closeWallet = function (wallet_id) {
        var _this = this;
        var callback = function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.wallets = this.wallets.filter(function (w) { return w.wallet_id !== wallet_id; });
                        return [4 /*yield*/, this.ngZone.run(function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                var url;
                                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            url = '/';
                                            if (this.wallets.length > 0) {
                                                this.currentWallet = this.wallets[0];
                                                url = '/wallet/';
                                            }
                                            if (this.variablesService.appPass) {
                                                this.backendService.storeSecureAppData();
                                            }
                                            return [4 /*yield*/, this.router.navigate([url])];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.backendService.closeWallet(wallet_id, callback);
    };
    WalletsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_backend_service__WEBPACK_IMPORTED_MODULE_3__["BackendService"],
            _variables_service__WEBPACK_IMPORTED_MODULE_4__["VariablesService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], WalletsService);
    return WalletsService;
}());



/***/ }),

/***/ "./src/app/_shared/components/checkbox/checkbox.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/_shared/components/checkbox/checkbox.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"checkbox\">\n    <input type=\"checkbox\"\n           [id]=\"id\"\n           [checked]=\"value\"\n           (change)=\"handlerChange($event)\"\n           [readonly]=\"readonly\"\n           [disabled]=\"disabled\">\n    <label [for]=\"id\">{{ label }}</label>\n</div>\n"

/***/ }),

/***/ "./src/app/_shared/components/checkbox/checkbox.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/_shared/components/checkbox/checkbox.component.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: inline-flex;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL19zaGFyZWQvY29tcG9uZW50cy9jaGVja2JveC9jaGVja2JveC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvX3NoYXJlZC9jb21wb25lbnRzL2NoZWNrYm94L2NoZWNrYm94LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usb0JBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL19zaGFyZWQvY29tcG9uZW50cy9jaGVja2JveC9jaGVja2JveC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/_shared/components/checkbox/checkbox.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/_shared/components/checkbox/checkbox.component.ts ***!
  \*******************************************************************/
/*! exports provided: CheckboxComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckboxComponent", function() { return CheckboxComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");



var CheckboxComponent = /** @class */ (function () {
    function CheckboxComponent() {
        this.value = false;
        this.label = '';
        this.id = 'id-' + Math.random();
        this.disabled = false;
        this.readonly = false;
        this.emitChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onChange = function (_) {
        };
        this.onTouched = function () {
        };
    }
    CheckboxComponent_1 = CheckboxComponent;
    CheckboxComponent.prototype.ngOnInit = function () {
    };
    CheckboxComponent.prototype.handlerChange = function (_a) {
        var target = _a.target;
        var checked = target.checked;
        this.value = checked;
        this.emitChange.emit(checked);
        this.onChange(checked);
    };
    CheckboxComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    CheckboxComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    CheckboxComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    CheckboxComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    var CheckboxComponent_1;
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], CheckboxComponent.prototype, "value", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], CheckboxComponent.prototype, "label", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], CheckboxComponent.prototype, "id", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], CheckboxComponent.prototype, "disabled", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], CheckboxComponent.prototype, "readonly", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], CheckboxComponent.prototype, "emitChange", void 0);
    CheckboxComponent = CheckboxComponent_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-checkbox',
            template: __webpack_require__(/*! ./checkbox.component.html */ "./src/app/_shared/components/checkbox/checkbox.component.html"),
            providers: [
                {
                    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALUE_ACCESSOR"],
                    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () { return CheckboxComponent_1; }),
                    multi: true
                },
            ],
            styles: [__webpack_require__(/*! ./checkbox.component.scss */ "./src/app/_shared/components/checkbox/checkbox.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], CheckboxComponent);
    return CheckboxComponent;
}());



/***/ }),

/***/ "./src/app/_shared/components/checkbox/checkbox.module.ts":
/*!****************************************************************!*\
  !*** ./src/app/_shared/components/checkbox/checkbox.module.ts ***!
  \****************************************************************/
/*! exports provided: CheckboxModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckboxModule", function() { return CheckboxModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _checkbox_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./checkbox.component */ "./src/app/_shared/components/checkbox/checkbox.component.ts");




var CheckboxModule = /** @class */ (function () {
    function CheckboxModule() {
    }
    CheckboxModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_checkbox_component__WEBPACK_IMPORTED_MODULE_3__["CheckboxComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            exports: [_checkbox_component__WEBPACK_IMPORTED_MODULE_3__["CheckboxComponent"]]
        })
    ], CheckboxModule);
    return CheckboxModule;
}());



/***/ }),

/***/ "./src/app/_shared/components/index.ts":
/*!*********************************************!*\
  !*** ./src/app/_shared/components/index.ts ***!
  \*********************************************/
/*! exports provided: SwitchModule, CheckboxModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _switch_switch_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./switch/switch.module */ "./src/app/_shared/components/switch/switch.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SwitchModule", function() { return _switch_switch_module__WEBPACK_IMPORTED_MODULE_0__["SwitchModule"]; });

/* harmony import */ var _checkbox_checkbox_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./checkbox/checkbox.module */ "./src/app/_shared/components/checkbox/checkbox.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CheckboxModule", function() { return _checkbox_checkbox_module__WEBPACK_IMPORTED_MODULE_1__["CheckboxModule"]; });





/***/ }),

/***/ "./src/app/_shared/components/switch/switch.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/_shared/components/switch/switch.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"switch\"\n     [class.disabled]=\"disabled\"\n     (click)=\"toggle(); $event.stopPropagation()\"\n     [class.on]=\"value\"\n     [class.off]=\"!value\">\n    <span class=\"circle\"></span>\n</div>\n"

/***/ }),

/***/ "./src/app/_shared/components/switch/switch.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/_shared/components/switch/switch.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: inline-flex;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL19zaGFyZWQvY29tcG9uZW50cy9zd2l0Y2gvc3dpdGNoLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9fc2hhcmVkL2NvbXBvbmVudHMvc3dpdGNoL3N3aXRjaC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG9CQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9fc2hhcmVkL2NvbXBvbmVudHMvc3dpdGNoL3N3aXRjaC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/_shared/components/switch/switch.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/_shared/components/switch/switch.component.ts ***!
  \***************************************************************/
/*! exports provided: SwitchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwitchComponent", function() { return SwitchComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");



var SwitchComponent = /** @class */ (function () {
    function SwitchComponent() {
        this.value = false;
        this.disabled = false;
        this.emitChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onChange = function (_) {
        };
        this.onTouched = function () {
        };
    }
    SwitchComponent_1 = SwitchComponent;
    SwitchComponent.prototype.ngOnInit = function () {
    };
    SwitchComponent.prototype.toggle = function () {
        if (!this.disabled) {
            this.value = !this.value;
            this.emitChange.emit(this.value);
            this.onChange(this.value);
        }
    };
    SwitchComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    SwitchComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    SwitchComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    SwitchComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    var SwitchComponent_1;
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SwitchComponent.prototype, "value", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SwitchComponent.prototype, "disabled", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SwitchComponent.prototype, "emitChange", void 0);
    SwitchComponent = SwitchComponent_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-switch',
            template: __webpack_require__(/*! ./switch.component.html */ "./src/app/_shared/components/switch/switch.component.html"),
            providers: [
                {
                    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALUE_ACCESSOR"],
                    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () { return SwitchComponent_1; }),
                    multi: true
                },
            ],
            styles: [__webpack_require__(/*! ./switch.component.scss */ "./src/app/_shared/components/switch/switch.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], SwitchComponent);
    return SwitchComponent;
}());



/***/ }),

/***/ "./src/app/_shared/components/switch/switch.module.ts":
/*!************************************************************!*\
  !*** ./src/app/_shared/components/switch/switch.module.ts ***!
  \************************************************************/
/*! exports provided: SwitchModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwitchModule", function() { return SwitchModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _switch_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./switch.component */ "./src/app/_shared/components/switch/switch.component.ts");




var SwitchModule = /** @class */ (function () {
    function SwitchModule() {
    }
    SwitchModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_switch_component__WEBPACK_IMPORTED_MODULE_3__["SwitchComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            exports: [_switch_component__WEBPACK_IMPORTED_MODULE_3__["SwitchComponent"]]
        })
    ], SwitchModule);
    return SwitchModule;
}());



/***/ }),

/***/ "./src/app/_shared/constants.ts":
/*!**************************************!*\
  !*** ./src/app/_shared/constants.ts ***!
  \**************************************/
/*! exports provided: MIXIN, RCV_ADDR_QR_SCALE, AUDITABLE_WALLET_HELP_PAGE, CREATE_NEW_WALLET_HELP_PAGE, LOCKED_BALANCE_HELP_PAGE, DOWNLOADS_PAGE_URL, BLOCK_EXPLORER_TX_URL_PREFIX, BLOCK_EXPLORER_TN_TX_URL_PREFIX */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MIXIN", function() { return MIXIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RCV_ADDR_QR_SCALE", function() { return RCV_ADDR_QR_SCALE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUDITABLE_WALLET_HELP_PAGE", function() { return AUDITABLE_WALLET_HELP_PAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CREATE_NEW_WALLET_HELP_PAGE", function() { return CREATE_NEW_WALLET_HELP_PAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOCKED_BALANCE_HELP_PAGE", function() { return LOCKED_BALANCE_HELP_PAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOWNLOADS_PAGE_URL", function() { return DOWNLOADS_PAGE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BLOCK_EXPLORER_TX_URL_PREFIX", function() { return BLOCK_EXPLORER_TX_URL_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BLOCK_EXPLORER_TN_TX_URL_PREFIX", function() { return BLOCK_EXPLORER_TN_TX_URL_PREFIX; });
var MIXIN = 1; // default mixin value
var RCV_ADDR_QR_SCALE = 1.5; // scale factor for QR code
var AUDITABLE_WALLET_HELP_PAGE = 'docs.infinium.space/docs/auditable-wallets';
var CREATE_NEW_WALLET_HELP_PAGE = 'docs.infinium.space/docs/getting-started-1#section-create-new-wallet';
var LOCKED_BALANCE_HELP_PAGE = 'docs.infinium.space/docs/locked-balance';
var DOWNLOADS_PAGE_URL = 'infinium.space/downloads.html';
var BLOCK_EXPLORER_TX_URL_PREFIX = 'explorer.infinium.space/transaction/';
var BLOCK_EXPLORER_TN_TX_URL_PREFIX = 'testnet-explorer.infinium.space/transaction/';


/***/ }),

/***/ "./src/app/_shared/directives/autofocus.directive.ts":
/*!***********************************************************!*\
  !*** ./src/app/_shared/directives/autofocus.directive.ts ***!
  \***********************************************************/
/*! exports provided: AutoFocusDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutoFocusDirective", function() { return AutoFocusDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AutoFocusDirective = /** @class */ (function () {
    function AutoFocusDirective(elementRef) {
        this.elementRef = elementRef;
    }
    AutoFocusDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this.elementRef.nativeElement.focus(); });
    };
    AutoFocusDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[appAutofocus]',
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]])
    ], AutoFocusDirective);
    return AutoFocusDirective;
}());



/***/ }),

/***/ "./src/app/_shared/directives/disable-price-fetch/disable-price-fetch.directive.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/_shared/directives/disable-price-fetch/disable-price-fetch.directive.ts ***!
  \*****************************************************************************************/
/*! exports provided: DisablePriceFetchDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DisablePriceFetchDirective", function() { return DisablePriceFetchDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var DisablePriceFetchDirective = /** @class */ (function () {
    function DisablePriceFetchDirective(_variablesService, _templateRef, _viewContainer) {
        var _this = this;
        this._variablesService = _variablesService;
        this._templateRef = _templateRef;
        this._viewContainer = _viewContainer;
        this._destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this._variablesService.disable_price_fetch$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this._destroy$)).subscribe(function (disable_price_fetch) {
            return !disable_price_fetch ? _this._viewContainer.createEmbeddedView(_this._templateRef) : _this._viewContainer.clear();
        });
    }
    DisablePriceFetchDirective.prototype.ngOnDestroy = function () {
        this._destroy$.next();
    };
    DisablePriceFetchDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[appDisablePriceFetch]'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_2__["VariablesService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"]])
    ], DisablePriceFetchDirective);
    return DisablePriceFetchDirective;
}());



/***/ }),

/***/ "./src/app/_shared/directives/disable-price-fetch/disable-price-fetch.module.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/_shared/directives/disable-price-fetch/disable-price-fetch.module.ts ***!
  \**************************************************************************************/
/*! exports provided: DisablePriceFetchModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DisablePriceFetchModule", function() { return DisablePriceFetchModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _disable_price_fetch_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./disable-price-fetch.directive */ "./src/app/_shared/directives/disable-price-fetch/disable-price-fetch.directive.ts");




var DisablePriceFetchModule = /** @class */ (function () {
    function DisablePriceFetchModule() {
    }
    DisablePriceFetchModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_disable_price_fetch_directive__WEBPACK_IMPORTED_MODULE_3__["DisablePriceFetchDirective"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            exports: [_disable_price_fetch_directive__WEBPACK_IMPORTED_MODULE_3__["DisablePriceFetchDirective"]]
        })
    ], DisablePriceFetchModule);
    return DisablePriceFetchModule;
}());



/***/ }),

/***/ "./src/app/_shared/shared.module.ts":
/*!******************************************!*\
  !*** ./src/app/_shared/shared.module.ts ***!
  \******************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components */ "./src/app/_shared/components/index.ts");
/* harmony import */ var _directives_autofocus_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./directives/autofocus.directive */ "./src/app/_shared/directives/autofocus.directive.ts");





var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_directives_autofocus_directive__WEBPACK_IMPORTED_MODULE_4__["AutoFocusDirective"]],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _components__WEBPACK_IMPORTED_MODULE_3__["SwitchModule"], _components__WEBPACK_IMPORTED_MODULE_3__["CheckboxModule"]],
            exports: [_components__WEBPACK_IMPORTED_MODULE_3__["SwitchModule"], _components__WEBPACK_IMPORTED_MODULE_3__["CheckboxModule"], _directives_autofocus_directive__WEBPACK_IMPORTED_MODULE_4__["AutoFocusDirective"]],
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./src/app/add-contacts/add-contacts.component.html":
/*!**********************************************************!*\
  !*** ./src/app/add-contacts/add-contacts.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"page-container\">\n\n    <div class=\"toolbar mb-2\">\n        <div class=\"left\">\n            <button type=\"button\"\n                    class=\"btn-icon circle big mr-2\"\n                    (click)=\"back()\">\n                <i class=\"icon dropdown-arrow-left\"></i>\n            </button>\n            <h1>{{ 'CONTACTS.ADD_CONTACT' | translate }}</h1>\n        </div>\n        <div class=\"right\"></div>\n    </div>\n\n    <div class=\"page-content\">\n        <div class=\"breadcrumbs mb-2\">\n            <div class=\"breadcrumb\">\n                <a [routerLink]=\"['/contacts']\">{{'CONTACTS.TITLE' | translate}}</a>\n            </div>\n            <div class=\"breadcrumb\">\n                <span>{{ 'CONTACTS.ADD_CONTACT' | translate }}</span>\n            </div>\n        </div>\n\n        <div class=\"scrolled-content\">\n            <form class=\"form\"\n                  [formGroup]=\"addContactForm\"\n                  (ngSubmit)=\"add()\">\n                <div class=\"form__field form__field-name\">\n                    <label for=\"add-name\">{{ 'CONTACTS.FORM.NAME' | translate }}</label>\n                    <input type=\"text\"\n                           id=\"add-name\"\n                           class=\"form__field--input\"\n                           [placeholder]=\"'PLACEHOLDERS.NAME_PLACEHOLDER' | translate\"\n                           formControlName=\"name\"\n                           (contextmenu)=\"variablesService.onContextMenu($event)\">\n                    <div class=\"error\"\n                         *ngIf=\"addContactForm.controls['name'].invalid && (addContactForm.controls['name'].dirty || addContactForm.controls['name'].touched)\">\n                        <div\n                              *ngIf=\"addContactForm.controls['name'].errors['minlength'] || addContactForm.controls['name'].errors['maxlength']\">\n                            {{ 'CONTACTS.FORM_ERRORS.NAME_LENGTH' | translate }}\n                        </div>\n                        <div *ngIf=\"addContactForm.controls['name'].errors['dublicated']\">\n                            {{ 'CONTACTS.FORM_ERRORS.NAME_DUBLICATED' | translate }}\n                        </div>\n                        <div *ngIf=\"addContactForm.controls['name'].errors['required']\">\n                            {{ 'CONTACTS.FORM_ERRORS.NAME_REQUIRED' | translate }}\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"form__field form__field-dropdown\">\n                    <label for=\"address\">{{ 'CONTACTS.FORM.ADDRESS' | translate }}</label>\n\n                    <input type=\"text\"\n                           id=\"address\"\n                           class=\"form__field--input\"\n                           [placeholder]=\"'PLACEHOLDERS.ADRESS_PLACEHOLDER' | translate\"\n                           formControlName=\"address\"\n                           (contextmenu)=\"variablesService.onContextMenu($event)\">\n\n                    <div class=\"error\"\n                         *ngIf=\"addContactForm.controls['address'].invalid && (addContactForm.controls['address'].dirty || addContactForm.controls['address'].touched)\">\n                        <div *ngIf=\"addContactForm.controls['address'].errors['address_not_valid']\">\n                            {{ 'CONTACTS.FORM_ERRORS.ADDRESS_NOT_VALID' | translate }}\n                        </div>\n                        <div *ngIf=\"addContactForm.controls['address'].errors['dublicated']\">\n                            {{ 'CONTACTS.FORM_ERRORS.ADDRESS_DUBLICATED' | translate }}\n                        </div>\n                        <div *ngIf=\"addContactForm.controls['address'].errors['required']\">\n                            {{ 'CONTACTS.FORM_ERRORS.ADDRESS_REQUIRED' | translate }}\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"form__field form__field-notes\">\n                    <label for=\"notes\">{{ 'CONTACTS.FORM.NOTES' | translate }}</label>\n\n                    <input class=\"form__field--input\"\n                           type=\"text\"\n                           id=\"notes\"\n                           placeholder=\"{{ 'PLACEHOLDERS.NOTES_PLACEHOLDER' | translate }}\"\n                           formControlName=\"notes\"\n                           (contextmenu)=\"variablesService.onContextMenu($event)\">\n                    <div class=\"error\"\n                         *ngIf=\"addContactForm.controls['notes'].invalid\">\n                        <div *ngIf=\"addContactForm.controls['notes'].errors['maxLength']\">\n                            {{ 'CONTACTS.FORM_ERRORS.MAX_LENGTH' | translate }}\n                        </div>\n                    </div>\n                </div>\n\n                <button type=\"submit\"\n                        class=\"primary big w-100\"\n                        [disabled]=\"!addContactForm.valid\">{{ 'CONTACTS.BUTTON.ADD_EDIT' |translate }}</button>\n\n                <app-send-modal *ngIf=\"isModalDialogVisible\"\n                                [form]=\"addContactForm\"\n                                (confirmed)=\"confirmed()\">\n                </app-send-modal>\n\n            </form>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/add-contacts/add-contacts.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/add-contacts/add-contacts.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL2FkZC1jb250YWN0cy9hZGQtY29udGFjdHMuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2FkZC1jb250YWN0cy9hZGQtY29udGFjdHMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9hZGQtY29udGFjdHMvYWRkLWNvbnRhY3RzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuIiwiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/add-contacts/add-contacts.component.ts":
/*!********************************************************!*\
  !*** ./src/app/add-contacts/add-contacts.component.ts ***!
  \********************************************************/
/*! exports provided: AddContactsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddContactsComponent", function() { return AddContactsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_helpers/services/modal.service */ "./src/app/_helpers/services/modal.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");








var AddContactsComponent = /** @class */ (function () {
    function AddContactsComponent(route, backend, variablesService, modalService, ngZone, location) {
        var _this = this;
        this.route = route;
        this.backend = backend;
        this.variablesService = variablesService;
        this.modalService = modalService;
        this.ngZone = ngZone;
        this.location = location;
        this.addContactForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            address: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                function (g) {
                    if (g.value) {
                        _this.backend.validateAddress(g.value, function (valid_status) {
                            _this.ngZone.run(function () {
                                if (valid_status === false) {
                                    g.setErrors(Object.assign({ address_not_valid: true }, g.errors));
                                }
                                else {
                                    if (g.hasError('address_not_valid')) {
                                        delete g.errors['address_not_valid'];
                                        if (Object.keys(g.errors).length === 0) {
                                            g.setErrors(null);
                                        }
                                    }
                                }
                            });
                        });
                        return g.hasError('address_not_valid')
                            ? { address_not_valid: true }
                            : null;
                    }
                    return null;
                },
                function (g) {
                    var isDublicated = _this.variablesService.contacts.findIndex(function (contact) { return contact.address === g.value; });
                    if (isDublicated !== -1 && !(_this.id === isDublicated)) {
                        return { dublicated: true };
                    }
                    return null;
                }
            ]),
            notes: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
                function (g) {
                    if (g.value) {
                        if (g.value.length > _this.variablesService.maxCommentLength) {
                            return { maxLength: true };
                        }
                        else {
                            return null;
                        }
                    }
                    else {
                        return null;
                    }
                }
            ]),
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(4),
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(25),
                function (g) {
                    if (g.value) {
                        var isDublicated = _this.variablesService.contacts.findIndex(function (contact) { return contact.name === g.value.trim(); });
                        if (isDublicated !== -1 && !(_this.id === isDublicated)) {
                            return { dublicated: true };
                        }
                        return null;
                    }
                }
            ])
        });
    }
    AddContactsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.queryRouting = this.route.queryParams.subscribe(function (params) {
            if (params.id) {
                _this.id = parseInt(params.id, 10);
                _this.addContactForm.reset({
                    name: _this.variablesService.contacts[params.id]['name'],
                    address: _this.variablesService.contacts[params.id]['address'],
                    notes: _this.variablesService.contacts[params.id]['notes']
                });
            }
            else {
                _this.addContactForm.reset({
                    name: _this.variablesService.newContact['name'],
                    address: _this.variablesService.newContact['address'],
                    notes: _this.variablesService.newContact['notes']
                });
            }
        });
    };
    AddContactsComponent.prototype.add = function () {
        var _this = this;
        if (!this.variablesService.appPass) {
            this.modalService.prepareModal('error', 'CONTACTS.FORM_ERRORS.SET_MASTER_PASSWORD');
        }
        else {
            if (this.addContactForm.valid) {
                this.backend.validateAddress(this.addContactForm.get('address').value, function (valid_status) {
                    if (valid_status === false) {
                        _this.ngZone.run(function () {
                            _this.addContactForm
                                .get('address')
                                .setErrors({ address_not_valid: true });
                        });
                    }
                    else {
                        if (_this.id || _this.id === 0) {
                            _this.variablesService.contacts.forEach(function (contact, index) {
                                if (index === _this.id) {
                                    contact.name = _this.addContactForm.get('name').value.trim();
                                    contact.address = _this.addContactForm.get('address').value;
                                    contact.notes =
                                        _this.addContactForm.get('notes').value || '';
                                }
                            });
                            _this.backend.storeSecureAppData();
                            _this.backend.getContactAlias();
                            _this.modalService.prepareModal('success', 'CONTACTS.SUCCESS_SAVE');
                        }
                        else {
                            _this.variablesService.contacts.push({
                                name: _this.addContactForm.get('name').value.trim(),
                                address: _this.addContactForm.get('address').value,
                                notes: _this.addContactForm.get('notes').value || ''
                            });
                            _this.backend.storeSecureAppData();
                            _this.backend.getContactAlias();
                            _this.modalService.prepareModal('success', 'CONTACTS.SUCCESS_SENT');
                            _this.variablesService.newContact = {
                                name: null,
                                address: null,
                                notes: null
                            };
                            _this.addContactForm.reset();
                        }
                    }
                });
            }
        }
    };
    AddContactsComponent.prototype.confirmed = function () {
    };
    AddContactsComponent.prototype.back = function () {
        this.location.back();
    };
    AddContactsComponent.prototype.ngOnDestroy = function () {
        if (!(this.id || this.id === 0)) {
            this.variablesService.newContact = {
                name: this.addContactForm.get('name').value,
                address: this.addContactForm.get('address').value,
                notes: this.addContactForm.get('notes').value
            };
        }
        this.queryRouting.unsubscribe();
    };
    AddContactsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-add-contacts',
            template: __webpack_require__(/*! ./add-contacts.component.html */ "./src/app/add-contacts/add-contacts.component.html"),
            styles: [__webpack_require__(/*! ./add-contacts.component.scss */ "./src/app/add-contacts/add-contacts.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"],
            _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_3__["BackendService"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_4__["VariablesService"],
            _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_5__["ModalService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            _angular_common__WEBPACK_IMPORTED_MODULE_6__["Location"]])
    ], AddContactsComponent);
    return AddContactsComponent;
}());



/***/ }),

/***/ "./src/app/add-wallet/add-wallet.component.html":
/*!******************************************************!*\
  !*** ./src/app/add-wallet/add-wallet.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"page-container\">\n\n    <div class=\"toolbar mb-2\">\n        <div class=\"left\">\n            <button type=\"button\"\n                    class=\"btn-icon circle big mr-2\"\n                    (click)=\"back()\">\n                <i class=\"icon dropdown-arrow-left\"></i>\n            </button>\n            <h1>{{ 'BREADCRUMBS.ADD_WALLET' | translate }}</h1>\n        </div>\n        <div class=\"right\"></div>\n    </div>\n\n    <div class=\"page-content\">\n        <div class=\"scrolled-content\" fxFlex=\"1 1 auto\" fxLayout=\"column\" fxLayoutAlign=\"center center\">\n            <div class=\"add-wallet w-100\"\n                 fxLayout=\"row\"\n                 fxLayoutAlign=\"center center\">\n                <div class=\"wrap-controls text-align-center max-w-38-rem\">\n                    <h4 class=\"mb-2\">{{ 'MAIN.TITLE' | translate }}</h4>\n\n                    <button type=\"button\"\n                            class=\"primary big w-100 mb-1\"\n                            [routerLink]=\"['/create']\">\n                        {{ 'MAIN.BUTTON_NEW_WALLET' | translate}}\n                    </button>\n\n                    <button type=\"button\"\n                            class=\"primary big w-100 mb-1\"\n                            (click)=\"openWallet()\">{{ 'MAIN.BUTTON_OPEN_WALLET' | translate\n                        }}</button>\n\n                    <button type=\"button\"\n                            class=\"outline big w-100 mb-2\"\n                            [routerLink]=\"['/restore']\">{{ 'MAIN.BUTTON_RESTORE_BACKUP' |\n                          translate\n                        }}</button>\n\n                    <p class=\"text-align-center cursor-pointer\"\n                       fxLayout=\"row\"\n                       fxLayoutAlign=\"center center\"\n                       (click)=\"openInBrowser()\">\n                        <i class=\"icon question-circle mr-1\"></i>\n                        <span class=\"color-primary\">{{ 'MAIN.HELP' | translate }}</span>\n                    </p>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/add-wallet/add-wallet.component.scss":
/*!******************************************************!*\
  !*** ./src/app/add-wallet/add-wallet.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL2FkZC13YWxsZXQvYWRkLXdhbGxldC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvYWRkLXdhbGxldC9hZGQtd2FsbGV0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQ0NGIiwiZmlsZSI6InNyYy9hcHAvYWRkLXdhbGxldC9hZGQtd2FsbGV0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuIiwiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/add-wallet/add-wallet.component.ts":
/*!****************************************************!*\
  !*** ./src/app/add-wallet/add-wallet.component.ts ***!
  \****************************************************/
/*! exports provided: AddWalletComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddWalletComponent", function() { return AddWalletComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_shared/constants */ "./src/app/_shared/constants.ts");








var AddWalletComponent = /** @class */ (function () {
    function AddWalletComponent(route, router, location, backend, variablesService, ngZone, translate) {
        this.route = route;
        this.router = router;
        this.location = location;
        this.backend = backend;
        this.variablesService = variablesService;
        this.ngZone = ngZone;
        this.translate = translate;
        this.prevUrl = '';
    }
    AddWalletComponent.prototype.ngOnInit = function () {
        if (this.route.snapshot.queryParams && this.route.snapshot.queryParams.prevUrl) {
            this.prevUrl = this.route.snapshot.queryParams.prevUrl;
        }
    };
    AddWalletComponent.prototype.openWallet = function () {
        var _this = this;
        this.backend.openFileDialog(this.translate.instant('MAIN.CHOOSE_PATH'), '*', this.variablesService.settings.default_path, function (file_status, file_data) {
            if (file_status) {
                _this.variablesService.settings.default_path = file_data.path.substr(0, file_data.path.lastIndexOf('/'));
                _this.ngZone.run(function () {
                    _this.router.navigate(['/open'], { queryParams: { path: file_data.path } });
                });
            }
            else {
                console.log(file_data['error_code']);
            }
        });
    };
    AddWalletComponent.prototype.openInBrowser = function () {
        this.backend.openUrlInBrowser(_shared_constants__WEBPACK_IMPORTED_MODULE_7__["CREATE_NEW_WALLET_HELP_PAGE"]);
    };
    AddWalletComponent.prototype.back = function () {
        this.location.back();
    };
    AddWalletComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-add-wallet',
            template: __webpack_require__(/*! ./add-wallet.component.html */ "./src/app/add-wallet/add-wallet.component.html"),
            styles: [__webpack_require__(/*! ./add-wallet.component.scss */ "./src/app/add-wallet/add-wallet.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"],
            _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_3__["BackendService"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_4__["VariablesService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"]])
    ], AddWalletComponent);
    return AddWalletComponent;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _add_wallet_add_wallet_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./add-wallet/add-wallet.component */ "./src/app/add-wallet/add-wallet.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _wallet_wallet_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./wallet/wallet.component */ "./src/app/wallet/wallet.component.ts");
/* harmony import */ var _send_send_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./send/send.component */ "./src/app/send/send.component.ts");
/* harmony import */ var _receive_receive_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./receive/receive.component */ "./src/app/receive/receive.component.ts");
/* harmony import */ var _history_history_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./history/history.component */ "./src/app/history/history.component.ts");
/* harmony import */ var _contracts_contracts_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./contracts/contracts.component */ "./src/app/contracts/contracts.component.ts");
/* harmony import */ var _purchase_purchase_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./purchase/purchase.component */ "./src/app/purchase/purchase.component.ts");
/* harmony import */ var _staking_staking_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./staking/staking.component */ "./src/app/staking/staking.component.ts");
/* harmony import */ var _settings_settings_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./settings/settings.component */ "./src/app/settings/settings.component.ts");
/* harmony import */ var _create_wallet_create_wallet_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./create-wallet/create-wallet.component */ "./src/app/create-wallet/create-wallet.component.ts");
/* harmony import */ var _open_wallet_open_wallet_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./open-wallet/open-wallet.component */ "./src/app/open-wallet/open-wallet.component.ts");
/* harmony import */ var _restore_wallet_restore_wallet_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./restore-wallet/restore-wallet.component */ "./src/app/restore-wallet/restore-wallet.component.ts");
/* harmony import */ var _seed_phrase_seed_phrase_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./seed-phrase/seed-phrase.component */ "./src/app/seed-phrase/seed-phrase.component.ts");
/* harmony import */ var _wallet_details_wallet_details_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./wallet-details/wallet-details.component */ "./src/app/wallet-details/wallet-details.component.ts");
/* harmony import */ var _assign_alias_assign_alias_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./assign-alias/assign-alias.component */ "./src/app/assign-alias/assign-alias.component.ts");
/* harmony import */ var _edit_alias_edit_alias_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./edit-alias/edit-alias.component */ "./src/app/edit-alias/edit-alias.component.ts");
/* harmony import */ var _transfer_alias_transfer_alias_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./transfer-alias/transfer-alias.component */ "./src/app/transfer-alias/transfer-alias.component.ts");
/* harmony import */ var _contacts_contacts_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./contacts/contacts.component */ "./src/app/contacts/contacts.component.ts");
/* harmony import */ var _add_contacts_add_contacts_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./add-contacts/add-contacts.component */ "./src/app/add-contacts/add-contacts.component.ts");
/* harmony import */ var _contact_send_contact_send_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./contact-send/contact-send.component */ "./src/app/contact-send/contact-send.component.ts");
/* harmony import */ var _export_import_export_import_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./export-import/export-import.component */ "./src/app/export-import/export-import.component.ts");
/* harmony import */ var _deeplink_deeplink_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./deeplink/deeplink.component */ "./src/app/deeplink/deeplink.component.ts");
/* harmony import */ var _contracts_contracts_tab_contracts_tab_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./contracts/contracts-tab/contracts-tab.component */ "./src/app/contracts/contracts-tab/contracts-tab.component.ts");
/* harmony import */ var _paths__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./paths */ "./src/app/paths.ts");
/* harmony import */ var _layouts_full_layout_full_layout_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./layouts/full-layout/full-layout.component */ "./src/app/layouts/full-layout/full-layout.component.ts");
/* harmony import */ var _layouts_with_sidebar_layout_with_sidebar_layout_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./layouts/with-sidebar-layout/with-sidebar-layout.component */ "./src/app/layouts/with-sidebar-layout/with-sidebar-layout.component.ts");






























var routes = [
    {
        path: _paths__WEBPACK_IMPORTED_MODULE_27__["paths"].auth,
        component: _layouts_full_layout_full_layout_component__WEBPACK_IMPORTED_MODULE_28__["FullLayoutComponent"],
        loadChildren: './pages/auth/auth.module#AuthModule'
    },
    {
        path: _paths__WEBPACK_IMPORTED_MODULE_27__["paths"].addWallet,
        component: _layouts_with_sidebar_layout_with_sidebar_layout_component__WEBPACK_IMPORTED_MODULE_29__["WithSidebarLayoutComponent"],
        children: [
            {
                path: '', component: _add_wallet_add_wallet_component__WEBPACK_IMPORTED_MODULE_3__["AddWalletComponent"]
            }
        ]
    },
    {
        path: _paths__WEBPACK_IMPORTED_MODULE_27__["paths"].login,
        component: _layouts_full_layout_full_layout_component__WEBPACK_IMPORTED_MODULE_28__["FullLayoutComponent"],
        children: [
            {
                path: '', component: _login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"]
            }
        ]
    },
    {
        path: _paths__WEBPACK_IMPORTED_MODULE_27__["paths"].wallet,
        component: _layouts_with_sidebar_layout_with_sidebar_layout_component__WEBPACK_IMPORTED_MODULE_29__["WithSidebarLayoutComponent"],
        children: [
            {
                path: '',
                component: _wallet_wallet_component__WEBPACK_IMPORTED_MODULE_5__["WalletComponent"],
                children: [
                    {
                        path: _paths__WEBPACK_IMPORTED_MODULE_27__["pathsChildrenWallet"].send,
                        component: _send_send_component__WEBPACK_IMPORTED_MODULE_6__["SendComponent"]
                    },
                    {
                        path: _paths__WEBPACK_IMPORTED_MODULE_27__["pathsChildrenWallet"].receive,
                        component: _receive_receive_component__WEBPACK_IMPORTED_MODULE_7__["ReceiveComponent"]
                    },
                    {
                        path: _paths__WEBPACK_IMPORTED_MODULE_27__["pathsChildrenWallet"].history,
                        component: _history_history_component__WEBPACK_IMPORTED_MODULE_8__["HistoryComponent"]
                    },
                    {
                        path: _paths__WEBPACK_IMPORTED_MODULE_27__["pathsChildrenWallet"].contracts,
                        component: _contracts_contracts_tab_contracts_tab_component__WEBPACK_IMPORTED_MODULE_26__["ContractsTabComponent"],
                        children: [
                            {
                                path: '',
                                component: _contracts_contracts_component__WEBPACK_IMPORTED_MODULE_9__["ContractsComponent"],
                            },
                            {
                                path: _paths__WEBPACK_IMPORTED_MODULE_27__["pathsChildrenContracts"].purchase,
                                component: _purchase_purchase_component__WEBPACK_IMPORTED_MODULE_10__["PurchaseComponent"]
                            },
                            {
                                path: _paths__WEBPACK_IMPORTED_MODULE_27__["pathsChildrenContracts"].purchase + "/:id",
                                component: _purchase_purchase_component__WEBPACK_IMPORTED_MODULE_10__["PurchaseComponent"]
                            },
                            {
                                path: '**', redirectTo: '',
                            },
                        ]
                    },
                    {
                        path: _paths__WEBPACK_IMPORTED_MODULE_27__["pathsChildrenWallet"].staking,
                        component: _staking_staking_component__WEBPACK_IMPORTED_MODULE_11__["StakingComponent"]
                    },
                    {
                        path: '',
                        redirectTo: _paths__WEBPACK_IMPORTED_MODULE_27__["pathsChildrenWallet"].history,
                        pathMatch: 'full'
                    }
                ]
            }
        ]
    },
    {
        path: _paths__WEBPACK_IMPORTED_MODULE_27__["paths"].create,
        component: _layouts_with_sidebar_layout_with_sidebar_layout_component__WEBPACK_IMPORTED_MODULE_29__["WithSidebarLayoutComponent"],
        children: [
            {
                path: '',
                component: _create_wallet_create_wallet_component__WEBPACK_IMPORTED_MODULE_13__["CreateWalletComponent"]
            }
        ]
    },
    {
        path: _paths__WEBPACK_IMPORTED_MODULE_27__["paths"].open,
        component: _layouts_with_sidebar_layout_with_sidebar_layout_component__WEBPACK_IMPORTED_MODULE_29__["WithSidebarLayoutComponent"],
        children: [
            {
                path: '',
                component: _open_wallet_open_wallet_component__WEBPACK_IMPORTED_MODULE_14__["OpenWalletComponent"]
            }
        ]
    },
    {
        path: _paths__WEBPACK_IMPORTED_MODULE_27__["paths"].restore,
        component: _layouts_with_sidebar_layout_with_sidebar_layout_component__WEBPACK_IMPORTED_MODULE_29__["WithSidebarLayoutComponent"],
        children: [
            {
                path: '',
                component: _restore_wallet_restore_wallet_component__WEBPACK_IMPORTED_MODULE_15__["RestoreWalletComponent"]
            }
        ]
    },
    {
        path: _paths__WEBPACK_IMPORTED_MODULE_27__["paths"].seedPhrase,
        component: _layouts_with_sidebar_layout_with_sidebar_layout_component__WEBPACK_IMPORTED_MODULE_29__["WithSidebarLayoutComponent"],
        children: [
            {
                path: '',
                component: _seed_phrase_seed_phrase_component__WEBPACK_IMPORTED_MODULE_16__["SeedPhraseComponent"]
            }
        ]
    },
    {
        path: _paths__WEBPACK_IMPORTED_MODULE_27__["paths"].details,
        component: _layouts_with_sidebar_layout_with_sidebar_layout_component__WEBPACK_IMPORTED_MODULE_29__["WithSidebarLayoutComponent"],
        children: [
            {
                path: '',
                component: _wallet_details_wallet_details_component__WEBPACK_IMPORTED_MODULE_17__["WalletDetailsComponent"]
            }
        ]
    },
    {
        path: _paths__WEBPACK_IMPORTED_MODULE_27__["paths"].assignAlias,
        component: _layouts_with_sidebar_layout_with_sidebar_layout_component__WEBPACK_IMPORTED_MODULE_29__["WithSidebarLayoutComponent"],
        children: [
            {
                path: '',
                component: _assign_alias_assign_alias_component__WEBPACK_IMPORTED_MODULE_18__["AssignAliasComponent"]
            }
        ]
    },
    {
        path: _paths__WEBPACK_IMPORTED_MODULE_27__["paths"].editAlias,
        component: _layouts_with_sidebar_layout_with_sidebar_layout_component__WEBPACK_IMPORTED_MODULE_29__["WithSidebarLayoutComponent"],
        children: [
            {
                path: '',
                component: _edit_alias_edit_alias_component__WEBPACK_IMPORTED_MODULE_19__["EditAliasComponent"]
            }
        ]
    },
    {
        path: _paths__WEBPACK_IMPORTED_MODULE_27__["paths"].transferAlias,
        component: _layouts_with_sidebar_layout_with_sidebar_layout_component__WEBPACK_IMPORTED_MODULE_29__["WithSidebarLayoutComponent"],
        children: [
            {
                path: '',
                component: _transfer_alias_transfer_alias_component__WEBPACK_IMPORTED_MODULE_20__["TransferAliasComponent"]
            }
        ]
    },
    {
        path: _paths__WEBPACK_IMPORTED_MODULE_27__["paths"].settings,
        component: _layouts_with_sidebar_layout_with_sidebar_layout_component__WEBPACK_IMPORTED_MODULE_29__["WithSidebarLayoutComponent"],
        children: [
            {
                path: '',
                component: _settings_settings_component__WEBPACK_IMPORTED_MODULE_12__["SettingsComponent"]
            }
        ]
    },
    {
        path: _paths__WEBPACK_IMPORTED_MODULE_27__["paths"].contacts,
        component: _layouts_with_sidebar_layout_with_sidebar_layout_component__WEBPACK_IMPORTED_MODULE_29__["WithSidebarLayoutComponent"],
        children: [
            {
                path: '',
                component: _contacts_contacts_component__WEBPACK_IMPORTED_MODULE_21__["ContactsComponent"]
            }
        ]
    },
    {
        path: _paths__WEBPACK_IMPORTED_MODULE_27__["paths"].addContacts,
        component: _layouts_with_sidebar_layout_with_sidebar_layout_component__WEBPACK_IMPORTED_MODULE_29__["WithSidebarLayoutComponent"],
        children: [
            {
                path: '',
                component: _add_contacts_add_contacts_component__WEBPACK_IMPORTED_MODULE_22__["AddContactsComponent"]
            }
        ]
    },
    {
        path: _paths__WEBPACK_IMPORTED_MODULE_27__["paths"].editContacts + "/:id",
        component: _layouts_with_sidebar_layout_with_sidebar_layout_component__WEBPACK_IMPORTED_MODULE_29__["WithSidebarLayoutComponent"],
        children: [
            {
                path: '',
                component: _add_contacts_add_contacts_component__WEBPACK_IMPORTED_MODULE_22__["AddContactsComponent"]
            }
        ]
    },
    {
        path: _paths__WEBPACK_IMPORTED_MODULE_27__["paths"].contactSend + "/:id",
        component: _layouts_with_sidebar_layout_with_sidebar_layout_component__WEBPACK_IMPORTED_MODULE_29__["WithSidebarLayoutComponent"],
        children: [
            {
                path: '',
                component: _contact_send_contact_send_component__WEBPACK_IMPORTED_MODULE_23__["ContactSendComponent"]
            }
        ]
    },
    {
        path: _paths__WEBPACK_IMPORTED_MODULE_27__["paths"].import,
        component: _layouts_with_sidebar_layout_with_sidebar_layout_component__WEBPACK_IMPORTED_MODULE_29__["WithSidebarLayoutComponent"],
        children: [
            {
                path: '',
                component: _export_import_export_import_component__WEBPACK_IMPORTED_MODULE_24__["ExportImportComponent"]
            }
        ]
    },
    {
        path: _paths__WEBPACK_IMPORTED_MODULE_27__["paths"].deeplink,
        component: _layouts_with_sidebar_layout_with_sidebar_layout_component__WEBPACK_IMPORTED_MODULE_29__["WithSidebarLayoutComponent"],
        children: [
            {
                path: '',
                component: _deeplink_deeplink_component__WEBPACK_IMPORTED_MODULE_25__["DeeplinkComponent"]
            }
        ]
    },
    {
        path: _paths__WEBPACK_IMPORTED_MODULE_27__["paths"].uiKit,
        component: _layouts_with_sidebar_layout_with_sidebar_layout_component__WEBPACK_IMPORTED_MODULE_29__["WithSidebarLayoutComponent"],
        children: [
            {
                path: '',
                loadChildren: './pages/ui-kit/ui-kit.module#UiKitModule'
            }
        ]
    },
    {
        path: '',
        redirectTo: _paths__WEBPACK_IMPORTED_MODULE_27__["paths"].addWallet,
        pathMatch: 'full'
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet *ngIf=\"[0, 1, 2, 6].indexOf(variablesService.daemon_state) !== -1\"></router-outlet>\n\n<div class=\"preloader\"\n     *ngIf=\"[3, 4, 5].indexOf(variablesService.daemon_state) !== -1\">\n    <p class=\"mb-2\"\n       *ngIf=\"variablesService.daemon_state === 3\">{{ 'SIDEBAR.SYNCHRONIZATION.LOADING' | translate }}</p>\n    <p class=\"mb-2\"\n       *ngIf=\"variablesService.daemon_state === 4\">{{ 'SIDEBAR.SYNCHRONIZATION.ERROR' | translate }}</p>\n    <p class=\"mb-2\"\n       *ngIf=\"variablesService.daemon_state === 5\">{{ 'SIDEBAR.SYNCHRONIZATION.COMPLETE' | translate }}</p>\n    <div class=\"loading-bar\"></div>\n</div>\n\n\n<context-menu #allContextMenu>\n    <ng-template contextMenuItem\n                 (execute)=\"contextMenuCopy($event.item)\">{{ 'CONTEXT_MENU.COPY' | translate }}</ng-template>\n    <ng-template contextMenuItem\n                 (execute)=\"contextMenuPaste($event.item)\">{{ 'CONTEXT_MENU.PASTE' | translate }}</ng-template>\n    <ng-template contextMenuItem\n                 (execute)=\"contextMenuSelect($event.item)\">{{ 'CONTEXT_MENU.SELECT' | translate }}</ng-template>\n</context-menu>\n\n<context-menu #onlyCopyContextMenu>\n    <ng-template contextMenuItem\n                 (execute)=\"contextMenuOnlyCopy($event.item)\">{{ 'CONTEXT_MENU.COPY' | translate }}</ng-template>\n</context-menu>\n\n<context-menu #pasteSelectContextMenu>\n    <ng-template contextMenuItem\n                 (execute)=\"contextMenuPaste($event.item)\">{{ 'CONTEXT_MENU.PASTE' | translate }}</ng-template>\n    <ng-template contextMenuItem\n                 (execute)=\"contextMenuSelect($event.item)\">{{ 'CONTEXT_MENU.SELECT' | translate }}</ng-template>\n</context-menu>\n\n\n<app-open-wallet-modal *ngIf=\"needOpenWallets.length\"\n                       [wallets]=\"needOpenWallets\"></app-open-wallet-modal>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var ngx_contextmenu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-contextmenu */ "./node_modules/ngx-contextmenu/fesm5/ngx-contextmenu.js");
/* harmony import */ var _helpers_pipes_int_to_money_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./_helpers/pipes/int-to-money.pipe */ "./src/app/_helpers/pipes/int-to-money.pipe.ts");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! bignumber.js */ "./node_modules/bignumber.js/bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./_helpers/services/modal.service */ "./src/app/_helpers/services/modal.service.ts");
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! store */ "./src/store.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _paths__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./paths */ "./src/app/paths.ts");















var AppComponent = /** @class */ (function () {
    function AppComponent(http, renderer, translate, backend, router, variablesService, ngZone, intToMoneyPipe, modalService, store) {
        var _this = this;
        this.http = http;
        this.renderer = renderer;
        this.translate = translate;
        this.backend = backend;
        this.router = router;
        this.variablesService = variablesService;
        this.ngZone = ngZone;
        this.intToMoneyPipe = intToMoneyPipe;
        this.modalService = modalService;
        this.store = store;
        this.onQuitRequest = false;
        this.firstOnlineState = false;
        this.translateUsed = false;
        this.needOpenWallets = [];
        this._destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_12__["Subject"]();
        translate.addLangs(['en', 'fr', 'de', 'it', 'pt']);
        translate.setDefaultLang('en');
        // const browserLang = translate.getBrowserLang();
        // translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
        translate.use('en').subscribe(function () {
            _this.translateUsed = true;
        });
    }
    AppComponent.prototype.setBackendLocalization = function () {
        var _this = this;
        if (this.translateUsed) {
            var stringsArray = [
                this.translate.instant('BACKEND_LOCALIZATION.QUIT'),
                this.translate.instant('BACKEND_LOCALIZATION.IS_RECEIVED'),
                this.translate.instant('BACKEND_LOCALIZATION.IS_CONFIRMED'),
                this.translate.instant('BACKEND_LOCALIZATION.INCOME_TRANSFER_UNCONFIRMED'),
                this.translate.instant('BACKEND_LOCALIZATION.INCOME_TRANSFER_CONFIRMED'),
                this.translate.instant('BACKEND_LOCALIZATION.MINED'),
                this.translate.instant('BACKEND_LOCALIZATION.LOCKED'),
                this.translate.instant('BACKEND_LOCALIZATION.IS_MINIMIZE'),
                this.translate.instant('BACKEND_LOCALIZATION.RESTORE'),
                this.translate.instant('BACKEND_LOCALIZATION.TRAY_MENU_SHOW'),
                this.translate.instant('BACKEND_LOCALIZATION.TRAY_MENU_MINIMIZE')
            ];
            this.backend.setBackendLocalization(stringsArray, this.variablesService.settings.language);
        }
        else {
            console.warn('wait translate use');
            setTimeout(function () {
                _this.setBackendLocalization();
            }, 10000);
        }
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.variablesService.allContextMenu = this.allContextMenu;
        this.variablesService.onlyCopyContextMenu = this.onlyCopyContextMenu;
        this.variablesService.pasteSelectContextMenu = this.pasteSelectContextMenu;
        this.backend.initService().subscribe(function (initMessage) {
            console.log('Init message: ', initMessage);
            _this.backend.getOptions();
            _this.backend.webkitLaunchedScript();
            _this.backend.start_backend(false, '127.0.0.1', 11512, function (st2, dd2) {
                console.log(st2, dd2);
            });
            _this.backend.eventSubscribe('quit_requested', function () {
                if (!_this.onQuitRequest) {
                    _this.ngZone.run(function () {
                        _this.router.navigate(['/']);
                    });
                    _this.needOpenWallets = [];
                    _this.variablesService.daemon_state = 5;
                    var saveFunction_1 = function () {
                        _this.backend.storeAppData(function () {
                            var recursionCloseWallets = function () {
                                if (_this.variablesService.wallets.length) {
                                    var lastIndex_1 = _this.variablesService.wallets.length - 1;
                                    _this.backend.closeWallet(_this.variablesService.wallets[lastIndex_1].wallet_id, function () {
                                        _this.variablesService.wallets.splice(lastIndex_1, 1);
                                        recursionCloseWallets();
                                    });
                                }
                                else {
                                    _this.backend.quitRequest();
                                }
                            };
                            recursionCloseWallets();
                        });
                    };
                    if (_this.variablesService.appPass) {
                        _this.backend.storeSecureAppData(function () {
                            saveFunction_1();
                        });
                    }
                    else {
                        saveFunction_1();
                    }
                }
                _this.onQuitRequest = true;
            });
            _this.backend.eventSubscribe('update_wallet_status', function (data) {
                console.log('----------------- update_wallet_status -----------------');
                console.log(data);
                var wallet_state = data.wallet_state;
                var is_mining = data.is_mining;
                var wallet = _this.variablesService.getWallet(data.wallet_id);
                // 1-synch, 2-ready, 3 - error
                if (wallet) {
                    _this.ngZone.run(function () {
                        wallet.loaded = false;
                        wallet.staking = is_mining;
                        if (wallet_state === 2) { // ready
                            wallet.loaded = true;
                        }
                        if (wallet_state === 3) { // error
                            // wallet.error = true;
                        }
                        wallet.balance = data.balance;
                        wallet.unlocked_balance = data.unlocked_balance;
                        wallet.mined_total = data.minied_total;
                        wallet.alias_available = data.is_alias_operations_available;
                    });
                }
            });
            _this.backend.eventSubscribe('wallet_sync_progress', function (data) {
                console.log('----------------- wallet_sync_progress -----------------');
                console.log(data);
                var wallet = _this.variablesService.getWallet(data.wallet_id);
                if (wallet) {
                    _this.ngZone.run(function () {
                        wallet.progress = (data.progress < 0) ? 0 : ((data.progress > 100) ? 100 : data.progress);
                        if (!_this.variablesService.sync_started) {
                            _this.variablesService.sync_started = true;
                            _this.variablesService.sync_wallets[wallet.wallet_id] = true;
                        }
                        _this.addToStore(wallet, true); // subscribe on data
                        if (wallet.progress === 0) {
                            wallet.loaded = false;
                        }
                        else if (wallet.progress === 100) {
                            wallet.loaded = true;
                            _this.addToStore(wallet, false);
                            _this.variablesService.sync_started = false;
                            _this.variablesService.sync_wallets[wallet.wallet_id] = false;
                        }
                    });
                }
            });
            _this.backend.eventSubscribe('update_daemon_state', function (data) {
                console.log('----------------- update_daemon_state -----------------');
                console.log('DAEMON:' + data.daemon_network_state);
                console.log(data);
                // this.variablesService.exp_med_ts = data['expiration_median_timestamp'] + 600 + 1;
                _this.variablesService.setExpMedTs(data['expiration_median_timestamp'] + 600 + 1);
                _this.variablesService.net_time_delta_median = data.net_time_delta_median;
                _this.variablesService.last_build_available = data.last_build_available;
                _this.variablesService.last_build_displaymode = data.last_build_displaymode;
                _this.variablesService.setHeightApp(data.height);
                _this.variablesService.setHeightMax(data.max_net_seen_height);
                _this.variablesService.setDownloadedBytes(data.downloaded_bytes);
                _this.variablesService.setTotalBytes(data.download_total_data_size);
                _this.backend.getContactAlias();
                _this.ngZone.run(function () {
                    _this.variablesService.daemon_state = data['daemon_network_state'];
                    if (data['daemon_network_state'] === 1) {
                        var max = data['max_net_seen_height'] - data['synchronization_start_height'];
                        var current = data.height - data['synchronization_start_height'];
                        var return_val = Math.floor((current * 100 / max) * 100) / 100;
                        if (max === 0 || return_val < 0) {
                            _this.variablesService.sync.progress_value = 0;
                            _this.variablesService.sync.progress_value_text = '0.00';
                        }
                        else if (return_val >= 100) {
                            _this.variablesService.sync.progress_value = 100;
                            _this.variablesService.sync.progress_value_text = '99.99';
                        }
                        else {
                            _this.variablesService.sync.progress_value = return_val;
                            _this.variablesService.sync.progress_value_text = return_val.toFixed(2);
                        }
                    }
                    if (data['daemon_network_state'] === 6) {
                        var max = data['download_total_data_size'];
                        var current = data['downloaded_bytes'];
                        var return_val = Math.floor((current / max) * 100);
                        if (max === 0 || return_val < 0) {
                            _this.variablesService.download.progress_value = 0;
                            _this.variablesService.download.progress_value_text = '0.00';
                        }
                        else if (return_val >= 100) {
                            _this.variablesService.download.progress_value = 100;
                            _this.variablesService.download.progress_value_text = '99.99';
                        }
                        else {
                            _this.variablesService.download.progress_value = return_val;
                            _this.variablesService.download.progress_value_text = return_val.toFixed(2);
                        }
                    }
                });
                if (!_this.firstOnlineState && data['daemon_network_state'] === 2) {
                    _this.getAliases();
                    _this.backend.getContactAlias();
                    _this.backend.getDefaultFee(function (status_fee, data_fee) {
                        _this.variablesService.default_fee_big = new bignumber_js__WEBPACK_IMPORTED_MODULE_9__["BigNumber"](data_fee);
                        _this.variablesService.default_fee = _this.intToMoneyPipe.transform(data_fee);
                    });
                    _this.firstOnlineState = true;
                }
            });
            _this.backend.eventSubscribe('money_transfer', function (data) {
                console.log('----------------- money_transfer -----------------');
                console.log(data);
                if (!data.ti) {
                    return;
                }
                var wallet_id = data.wallet_id;
                var tr_info = data.ti;
                var wallet = _this.variablesService.getWallet(wallet_id);
                if (wallet) {
                    if (wallet.history.length > 40) {
                        wallet.history.splice(40, 1);
                    }
                    _this.ngZone.run(function () {
                        if (!wallet.loaded) {
                            wallet.balance = data.balance;
                            wallet.unlocked_balance = data.unlocked_balance;
                        }
                        else {
                            wallet.balance = data.balance;
                            wallet.unlocked_balance = data.unlocked_balance;
                        }
                        if (tr_info.tx_type === 6) {
                            _this.variablesService.setRefreshStacking(wallet_id);
                        }
                        var tr_exists = wallet.excluded_history.some(function (elem) { return elem.tx_hash === tr_info.tx_hash; });
                        tr_exists = (!tr_exists) ? wallet.history.some(function (elem) { return elem.tx_hash === tr_info.tx_hash; }) : tr_exists;
                        if (wallet.currentPage === 1) {
                            wallet.prepareHistory([tr_info]);
                            if (wallet.restore) {
                                wallet.total_history_item = wallet.history.length;
                                wallet.totalPages = Math.ceil(wallet.total_history_item / _this.variablesService.count);
                                wallet.totalPages > _this.variablesService.maxPages
                                    ? wallet.pages = new Array(5).fill(1).map(function (value, index) { return value + index; })
                                    : wallet.pages = new Array(wallet.totalPages).fill(1).map(function (value, index) { return value + index; });
                            }
                        }
                        if (tr_info.hasOwnProperty('contract')) {
                            var exp_med_ts = _this.variablesService.exp_med_ts;
                            var height_app = _this.variablesService.height_app;
                            var contract_1 = tr_info.contract[0];
                            if (tr_exists) {
                                for (var i = 0; i < wallet.contracts.length; i++) {
                                    if (wallet.contracts[i].contract_id === contract_1.contract_id && wallet.contracts[i].is_a === contract_1.is_a) {
                                        wallet.contracts[i].cancel_expiration_time = contract_1.cancel_expiration_time;
                                        wallet.contracts[i].expiration_time = contract_1.expiration_time;
                                        wallet.contracts[i].height = contract_1.height;
                                        wallet.contracts[i].timestamp = contract_1.timestamp;
                                        break;
                                    }
                                }
                                // $rootScope.getContractsRecount();
                                return;
                            }
                            if (contract_1.state === 1 && contract_1.expiration_time < exp_med_ts) {
                                contract_1.state = 110;
                            }
                            else if (contract_1.state === 5 && contract_1.cancel_expiration_time < exp_med_ts) {
                                contract_1.state = 130;
                            }
                            else if (contract_1.state === 1) {
                                var searchResult2 = _this.variablesService.settings.notViewedContracts.find(function (elem) { return elem.state === 110 && elem.is_a === contract_1.is_a && elem.contract_id === contract_1.contract_id; });
                                if (searchResult2) {
                                    if (searchResult2.time === contract_1.expiration_time) {
                                        contract_1.state = 110;
                                    }
                                    else {
                                        for (var j = 0; j < _this.variablesService.settings.notViewedContracts.length; j++) {
                                            if (_this.variablesService.settings.notViewedContracts[j].contract_id === contract_1.contract_id && _this.variablesService.settings.notViewedContracts[j].is_a === contract_1.is_a) {
                                                _this.variablesService.settings.notViewedContracts.splice(j, 1);
                                                break;
                                            }
                                        }
                                        for (var j = 0; j < _this.variablesService.settings.viewedContracts.length; j++) {
                                            if (_this.variablesService.settings.viewedContracts[j].contract_id === contract_1.contract_id && _this.variablesService.settings.viewedContracts[j].is_a === contract_1.is_a) {
                                                _this.variablesService.settings.viewedContracts.splice(j, 1);
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            else if (contract_1.state === 2 && (contract_1.height === 0 || (height_app - contract_1.height) < 10)) {
                                contract_1.state = 201;
                            }
                            else if (contract_1.state === 2) {
                                var searchResult3 = _this.variablesService.settings.viewedContracts.some(function (elem) { return elem.state === 120 && elem.is_a === contract_1.is_a && elem.contract_id === contract_1.contract_id; });
                                if (searchResult3) {
                                    contract_1.state = 120;
                                }
                            }
                            else if (contract_1.state === 5) {
                                var searchResult4 = _this.variablesService.settings.notViewedContracts.find(function (elem) { return elem.state === 130 && elem.is_a === contract_1.is_a && elem.contract_id === contract_1.contract_id; });
                                if (searchResult4) {
                                    if (searchResult4.time === contract_1.cancel_expiration_time) {
                                        contract_1.state = 130;
                                    }
                                    else {
                                        for (var j = 0; j < _this.variablesService.settings.notViewedContracts.length; j++) {
                                            if (_this.variablesService.settings.notViewedContracts[j].contract_id === contract_1.contract_id && _this.variablesService.settings.notViewedContracts[j].is_a === contract_1.is_a) {
                                                _this.variablesService.settings.notViewedContracts.splice(j, 1);
                                                break;
                                            }
                                        }
                                        for (var j = 0; j < _this.variablesService.settings.viewedContracts.length; j++) {
                                            if (_this.variablesService.settings.viewedContracts[j].contract_id === contract_1.contract_id && _this.variablesService.settings.viewedContracts[j].is_a === contract_1.is_a) {
                                                _this.variablesService.settings.viewedContracts.splice(j, 1);
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            else if (contract_1.state === 6 && (contract_1.height === 0 || (height_app - contract_1.height) < 10)) {
                                contract_1.state = 601;
                            }
                            var searchResult = _this.variablesService.settings.viewedContracts.some(function (elem) { return elem.state === contract_1.state && elem.is_a === contract_1.is_a && elem.contract_id === contract_1.contract_id; });
                            contract_1.is_new = !searchResult;
                            var findContract = false;
                            for (var i = 0; i < wallet.contracts.length; i++) {
                                if (wallet.contracts[i].contract_id === contract_1.contract_id && wallet.contracts[i].is_a === contract_1.is_a) {
                                    for (var prop in contract_1) {
                                        if (contract_1.hasOwnProperty(prop)) {
                                            wallet.contracts[i][prop] = contract_1[prop];
                                        }
                                    }
                                    findContract = true;
                                    break;
                                }
                            }
                            if (findContract === false) {
                                wallet.contracts.push(contract_1);
                            }
                            wallet.recountNewContracts();
                        }
                    });
                }
            });
            _this.backend.backendObject['handle_deeplink_click'].connect(function (data) {
                console.log('----------------- handle_deeplink_click -----------------');
                console.log(data);
                _this.ngZone.run(function () {
                    if (data) {
                        _this.variablesService.deeplink$.next(data);
                    }
                });
            });
            _this.backend.eventSubscribe('money_transfer_cancel', function (data) {
                console.log('----------------- money_transfer_cancel -----------------');
                console.log(data);
                if (!data.ti) {
                    return;
                }
                var wallet_id = data.wallet_id;
                var tr_info = data.ti;
                var wallet = _this.variablesService.getWallet(wallet_id);
                if (wallet) {
                    if (tr_info.hasOwnProperty('contract')) {
                        for (var i = 0; i < wallet.contracts.length; i++) {
                            if (wallet.contracts[i].contract_id === tr_info.contract[0].contract_id && wallet.contracts[i].is_a === tr_info.contract[0].is_a) {
                                if (wallet.contracts[i].state === 1 || wallet.contracts[i].state === 110) {
                                    wallet.contracts[i].is_new = true;
                                    wallet.contracts[i].state = 140;
                                    wallet.recountNewContracts();
                                }
                                break;
                            }
                        }
                    }
                    wallet.removeFromHistory(tr_info.tx_hash);
                    var error_tr = '';
                    switch (tr_info.tx_type) {
                        case 0:
                            error_tr = _this.translate.instant('ERRORS.TX_TYPE_NORMAL') + '<br>' +
                                tr_info.tx_hash + '<br>' + wallet.name + '<br>' + wallet.address + '<br>' +
                                _this.translate.instant('ERRORS.TX_TYPE_NORMAL_TO') + ' ' + _this.intToMoneyPipe.transform(tr_info.amount) + ' ' +
                                _this.translate.instant('ERRORS.TX_TYPE_NORMAL_END');
                            break;
                        case 1:
                            // this.translate.instant('ERRORS.TX_TYPE_PUSH_OFFER');
                            break;
                        case 2:
                            // this.translate.instant('ERRORS.TX_TYPE_UPDATE_OFFER');
                            break;
                        case 3:
                            // this.translate.instant('ERRORS.TX_TYPE_CANCEL_OFFER');
                            break;
                        case 4:
                            error_tr = _this.translate.instant('ERRORS.TX_TYPE_NEW_ALIAS') + '<br>' +
                                tr_info.tx_hash + '<br>' + wallet.name + '<br>' + wallet.address + '<br>' +
                                _this.translate.instant('ERRORS.TX_TYPE_NEW_ALIAS_END');
                            break;
                        case 5:
                            error_tr = _this.translate.instant('ERRORS.TX_TYPE_UPDATE_ALIAS') + '<br>' +
                                tr_info.tx_hash + '<br>' + wallet.name + '<br>' + wallet.address + '<br>' +
                                _this.translate.instant('ERRORS.TX_TYPE_NEW_ALIAS_END');
                            break;
                        case 6:
                            error_tr = _this.translate.instant('ERRORS.TX_TYPE_COIN_BASE');
                            break;
                    }
                    if (error_tr) {
                        _this.modalService.prepareModal('error', error_tr);
                    }
                }
            });
            _this.backend.eventSubscribe('on_core_event', function (data) {
                console.log('----------------- on_core_event -----------------');
                console.log(data);
                data = JSON.parse(data);
                if (data.events != null) {
                    var _loop_1 = function (i, length_1) {
                        switch (data.events[i].method) {
                            case 'CORE_EVENT_BLOCK_ADDED':
                                break;
                            case 'CORE_EVENT_ADD_ALIAS':
                                if (_this.variablesService.aliasesChecked[data.events[i].details.address] != null) {
                                    _this.variablesService.aliasesChecked[data.events[i].details.address]['name'] = '@' + data.events[i].details.alias;
                                    _this.variablesService.aliasesChecked[data.events[i].details.address]['address'] = data.events[i].details.address;
                                    _this.variablesService.aliasesChecked[data.events[i].details.address]['comment'] = data.events[i].details.comment;
                                }
                                if (_this.variablesService.enableAliasSearch) {
                                    var newAlias = {
                                        name: '@' + data.events[i].details.alias,
                                        address: data.events[i].details.address,
                                        comment: data.events[i].details.comment
                                    };
                                    _this.variablesService.aliases = _this.variablesService.aliases.concat(newAlias);
                                    _this.variablesService.changeAliases();
                                }
                                break;
                            case 'CORE_EVENT_UPDATE_ALIAS':
                                for (var address in _this.variablesService.aliasesChecked) {
                                    if (_this.variablesService.aliasesChecked.hasOwnProperty(address)) {
                                        if (_this.variablesService.aliasesChecked[address].name === '@' + data.events[i].details.alias) {
                                            if (_this.variablesService.aliasesChecked[address].address !== data.events[i].details.details.address) {
                                                delete _this.variablesService.aliasesChecked[address]['name'];
                                                delete _this.variablesService.aliasesChecked[address]['address'];
                                                delete _this.variablesService.aliasesChecked[address]['comment'];
                                            }
                                            else {
                                                _this.variablesService.aliasesChecked[address].comment = data.events[i].details.details.comment;
                                            }
                                            break;
                                        }
                                    }
                                }
                                if (_this.variablesService.aliasesChecked[data.events[i].details.details.address] != null) {
                                    _this.variablesService.aliasesChecked[data.events[i].details.details.address]['name'] = '@' + data.events[i].details.alias;
                                    _this.variablesService.aliasesChecked[data.events[i].details.details.address]['address'] = data.events[i].details.details.address;
                                    _this.variablesService.aliasesChecked[data.events[i].details.details.address]['comment'] = data.events[i].details.details.comment;
                                }
                                if (_this.variablesService.enableAliasSearch) {
                                    var CurrentAlias = _this.variablesService.aliases.find(function (element) { return element.name === '@' + data.events[i].details.alias; });
                                    if (CurrentAlias) {
                                        CurrentAlias.address = data.events[i].details.details.address;
                                        CurrentAlias.comment = data.events[i].details.details.comment;
                                    }
                                }
                                _this.variablesService.changeAliases();
                                break;
                            default:
                                break;
                        }
                    };
                    for (var i = 0, length_1 = data.events.length; i < length_1; i++) {
                        _loop_1(i, length_1);
                    }
                }
            });
            _this.intervalUpdateContractsState = setInterval(function () {
                _this.variablesService.wallets.forEach(function (wallet) {
                    wallet.contracts.forEach(function (contract) {
                        if (contract.state === 201 && contract.height !== 0 && (_this.variablesService.height_app - contract.height) >= 10) {
                            contract.state = 2;
                            contract.is_new = true;
                            console.warn('need check state in contracts');
                        }
                        else if (contract.state === 601 && contract.height !== 0 && (_this.variablesService.height_app - contract.height) >= 10) {
                            contract.state = 6;
                            contract.is_new = true;
                        }
                    });
                });
            }, 30000);
            _this.expMedTsEvent = _this.variablesService.getExpMedTsEvent.subscribe(function (newTimestamp) {
                _this.variablesService.wallets.forEach(function (wallet) {
                    wallet.contracts.forEach(function (contract) {
                        if (contract.state === 1 && contract.expiration_time <= newTimestamp) {
                            contract.state = 110;
                            contract.is_new = true;
                            wallet.recountNewContracts();
                        }
                        else if (contract.state === 5 && contract.cancel_expiration_time <= newTimestamp) {
                            contract.state = 130;
                            contract.is_new = true;
                            wallet.recountNewContracts();
                        }
                    });
                });
            });
            _this.backend.getAppData(function (status, data) {
                if (data && Object.keys(data).length > 0) {
                    for (var key in data) {
                        if (data.hasOwnProperty(key) && _this.variablesService.settings.hasOwnProperty(key)) {
                            _this.variablesService.settings[key] = data[key];
                        }
                    }
                    if (_this.variablesService.settings.hasOwnProperty('scale') && ['8px', '10px', '12px', '14px'].indexOf(_this.variablesService.settings.scale) !== -1) {
                        _this.renderer.setStyle(document.documentElement, 'font-size', _this.variablesService.settings.scale);
                    }
                    else {
                        _this.variablesService.settings.scale = '10px';
                        _this.renderer.setStyle(document.documentElement, 'font-size', _this.variablesService.settings.scale);
                    }
                }
                _this.translate.use(_this.variablesService.settings.language);
                _this.setBackendLocalization();
                _this.backend.setLogLevel(_this.variablesService.settings.appLog);
                _this.backend.setEnableTor(_this.variablesService.settings.appUseTor);
                if (!_this.variablesService.settings.wallets || !_this.variablesService.settings.wallets.length) {
                    return _this.router.navigate([_paths__WEBPACK_IMPORTED_MODULE_14__["paths"].auth + "/" + _paths__WEBPACK_IMPORTED_MODULE_14__["pathsChildrenAuth"].noWallet]).then();
                }
                if (_this.router.url !== '/login') {
                    _this.backend.haveSecureAppData(function (statusPass) {
                        if (statusPass) {
                            _this.ngZone.run(function () {
                                _this.router.navigate(['/login'], { queryParams: { type: 'auth' } });
                            });
                        }
                        else {
                            if (Object.keys(data).length !== 0) {
                                _this.needOpenWallets = JSON.parse(JSON.stringify(_this.variablesService.settings.wallets));
                                _this.ngZone.run(function () {
                                    _this.variablesService.appLogin = true;
                                    _this.router.navigate(['/']);
                                });
                            }
                            else {
                                _this.ngZone.run(function () {
                                    _this.router.navigate(['/login'], { queryParams: { type: 'reg' } });
                                });
                            }
                        }
                    });
                }
            });
            /** Start listening dispatchAsyncCallResult */
            _this.backend.dispatchAsyncCallResult();
            /** Start listening handleCurrentActionState */
            _this.backend.handleCurrentActionState();
        }, function (error) {
            console.log(error);
        });
        this.variablesService.disable_price_fetch$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeUntil"])(this._destroy$)).subscribe(function (disable_price_fetch) {
            if (!disable_price_fetch) {
                _this.getMoneyEquivalent();
                _this.intervalUpdatePriceState = setInterval(function () {
                    _this.getMoneyEquivalent();
                }, 30000);
            }
            else {
                if (_this.intervalUpdatePriceState) {
                    clearInterval(_this.intervalUpdatePriceState);
                }
            }
        });
    };
    AppComponent.prototype.getMoneyEquivalent = function () {
        var _this = this;
        this.http.get('https://api.coingecko.com/api/v3/ping').subscribe(function () {
            _this.http.get('https://api.coingecko.com/api/v3/simple/price?ids=infinium&vs_currencies=usd&include_24hr_change=true').subscribe(function (data) {
                _this.variablesService.moneyEquivalent = data['infinium']['usd'];
                _this.variablesService.moneyEquivalentPercent = data['infinium']['usd_24h_change'];
            }, function (error) {
                console.warn('api.coingecko.com price error: ', error);
            });
        }, function (error) {
            console.warn('api.coingecko.com error: ', error);
            setTimeout(function () {
                _this.getMoneyEquivalent();
            }, 30000);
        });
    };
    AppComponent.prototype.getAliases = function () {
        var _this = this;
        this.backend.getAllAliases(function (status, data, error) {
            console.warn(error);
            if (error === 'CORE_BUSY') {
                window.setTimeout(function () {
                    _this.getAliases();
                }, 10000);
            }
            else if (error === 'OVERFLOW') {
                _this.variablesService.aliases = [];
                _this.variablesService.enableAliasSearch = false;
                _this.variablesService.wallets.forEach(function (wallet) {
                    wallet.alias = _this.backend.getWalletAlias(wallet.address);
                });
            }
            else {
                _this.variablesService.enableAliasSearch = true;
                if (data.aliases && data.aliases.length) {
                    _this.variablesService.aliases = [];
                    data.aliases.forEach(function (alias) {
                        var newAlias = {
                            name: '@' + alias.alias,
                            address: alias.address,
                            comment: alias.comment
                        };
                        _this.variablesService.aliases.push(newAlias);
                    });
                    _this.variablesService.wallets.forEach(function (wallet) {
                        wallet.alias = _this.backend.getWalletAlias(wallet.address);
                    });
                    _this.variablesService.aliases = _this.variablesService.aliases.sort(function (a, b) {
                        if (a.name.length > b.name.length) {
                            return 1;
                        }
                        if (a.name.length < b.name.length) {
                            return -1;
                        }
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (a.name < b.name) {
                            return -1;
                        }
                        return 0;
                    });
                    _this.variablesService.changeAliases();
                }
            }
        });
    };
    AppComponent.prototype.contextMenuCopy = function (target) {
        if (target && (target['nodeName'].toUpperCase() === 'TEXTAREA' || target['nodeName'].toUpperCase() === 'INPUT')) {
            var start = (target['contextSelectionStart']) ? 'contextSelectionStart' : 'selectionStart';
            var end = (target['contextSelectionEnd']) ? 'contextSelectionEnd' : 'selectionEnd';
            var canUseSelection = ((target[start]) || (target[start] === '0'));
            var SelectedText = (canUseSelection) ? target['value'].substring(target[start], target[end]) : target['value'];
            this.backend.setClipboard(String(SelectedText));
        }
    };
    AppComponent.prototype.contextMenuOnlyCopy = function (text) {
        if (text) {
            this.backend.setClipboard(String(text));
        }
    };
    AppComponent.prototype.contextMenuPaste = function (target) {
        if (target && (target['nodeName'].toUpperCase() === 'TEXTAREA' || target['nodeName'].toUpperCase() === 'INPUT')) {
            this.backend.getClipboard(function (status, clipboard) {
                clipboard = String(clipboard);
                if (typeof clipboard !== 'string' || clipboard.length) {
                    var start = (target['contextSelectionStart']) ? 'contextSelectionStart' : 'selectionStart';
                    var end = (target['contextSelectionEnd']) ? 'contextSelectionEnd' : 'selectionEnd';
                    var _pre = target['value'].substring(0, target[start]);
                    var _aft = target['value'].substring(target[end], target['value'].length);
                    var text = _pre + clipboard + _aft;
                    var cursorPosition = (_pre + clipboard).length;
                    if (target['maxLength'] && parseInt(target['maxLength'], 10) > 0) {
                        text = text.substr(0, parseInt(target['maxLength'], 10));
                    }
                    target['value'] = text;
                    target.setSelectionRange(cursorPosition, cursorPosition);
                    target.dispatchEvent(new Event('input'));
                    target['focus']();
                }
            });
        }
    };
    AppComponent.prototype.contextMenuSelect = function (target) {
        if (target && (target['nodeName'].toUpperCase() === 'TEXTAREA' || target['nodeName'].toUpperCase() === 'INPUT')) {
            target['focus']();
            setTimeout(function () {
                target['select']();
            });
        }
    };
    AppComponent.prototype.addToStore = function (wallet, boolean) {
        var value = this.store.value.sync;
        if (value && value.length) {
            var sync = value.filter(function (item) { return item.wallet_id === wallet.wallet_id; });
            if (sync && sync.length) {
                var result = value.map(function (item) {
                    if (item.wallet_id === wallet.wallet_id) {
                        return { sync: boolean, wallet_id: wallet.wallet_id };
                    }
                    else {
                        return item;
                    }
                });
                this.store.set('sync', result);
            }
            else {
                value.push({ sync: boolean, wallet_id: wallet.wallet_id });
                this.store.set('sync', value);
            }
        }
        else {
            this.store.set('sync', [{ sync: boolean, wallet_id: wallet.wallet_id }]);
        }
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this._destroy$.next();
        if (this.intervalUpdateContractsState) {
            clearInterval(this.intervalUpdateContractsState);
        }
        if (this.intervalUpdatePriceState) {
            clearInterval(this.intervalUpdatePriceState);
        }
        this.expMedTsEvent.unsubscribe();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('allContextMenu'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", ngx_contextmenu__WEBPACK_IMPORTED_MODULE_7__["ContextMenuComponent"])
    ], AppComponent.prototype, "allContextMenu", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('onlyCopyContextMenu'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", ngx_contextmenu__WEBPACK_IMPORTED_MODULE_7__["ContextMenuComponent"])
    ], AppComponent.prototype, "onlyCopyContextMenu", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('pasteSelectContextMenu'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", ngx_contextmenu__WEBPACK_IMPORTED_MODULE_7__["ContextMenuComponent"])
    ], AppComponent.prototype, "pasteSelectContextMenu", void 0);
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__["TranslateService"],
            _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__["BackendService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_6__["VariablesService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            _helpers_pipes_int_to_money_pipe__WEBPACK_IMPORTED_MODULE_8__["IntToMoneyPipe"],
            _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_10__["ModalService"],
            store__WEBPACK_IMPORTED_MODULE_11__["Store"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: HttpLoaderFactory, highchartsFactory, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpLoaderFactory", function() { return HttpLoaderFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "highchartsFactory", function() { return highchartsFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _settings_settings_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./settings/settings.component */ "./src/app/settings/settings.component.ts");
/* harmony import */ var _add_wallet_add_wallet_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./add-wallet/add-wallet.component */ "./src/app/add-wallet/add-wallet.component.ts");
/* harmony import */ var _create_wallet_create_wallet_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./create-wallet/create-wallet.component */ "./src/app/create-wallet/create-wallet.component.ts");
/* harmony import */ var _open_wallet_open_wallet_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./open-wallet/open-wallet.component */ "./src/app/open-wallet/open-wallet.component.ts");
/* harmony import */ var _open_wallet_modal_open_wallet_modal_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./open-wallet-modal/open-wallet-modal.component */ "./src/app/open-wallet-modal/open-wallet-modal.component.ts");
/* harmony import */ var _restore_wallet_restore_wallet_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./restore-wallet/restore-wallet.component */ "./src/app/restore-wallet/restore-wallet.component.ts");
/* harmony import */ var _seed_phrase_seed_phrase_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./seed-phrase/seed-phrase.component */ "./src/app/seed-phrase/seed-phrase.component.ts");
/* harmony import */ var _wallet_details_wallet_details_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./wallet-details/wallet-details.component */ "./src/app/wallet-details/wallet-details.component.ts");
/* harmony import */ var _assign_alias_assign_alias_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./assign-alias/assign-alias.component */ "./src/app/assign-alias/assign-alias.component.ts");
/* harmony import */ var _edit_alias_edit_alias_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./edit-alias/edit-alias.component */ "./src/app/edit-alias/edit-alias.component.ts");
/* harmony import */ var _transfer_alias_transfer_alias_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./transfer-alias/transfer-alias.component */ "./src/app/transfer-alias/transfer-alias.component.ts");
/* harmony import */ var _wallet_wallet_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./wallet/wallet.component */ "./src/app/wallet/wallet.component.ts");
/* harmony import */ var _send_send_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./send/send.component */ "./src/app/send/send.component.ts");
/* harmony import */ var _receive_receive_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./receive/receive.component */ "./src/app/receive/receive.component.ts");
/* harmony import */ var _history_history_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./history/history.component */ "./src/app/history/history.component.ts");
/* harmony import */ var _contracts_contracts_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./contracts/contracts.component */ "./src/app/contracts/contracts.component.ts");
/* harmony import */ var _purchase_purchase_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./purchase/purchase.component */ "./src/app/purchase/purchase.component.ts");
/* harmony import */ var _staking_staking_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./staking/staking.component */ "./src/app/staking/staking.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @ngx-translate/http-loader */ "./node_modules/@ngx-translate/http-loader/fesm5/ngx-translate-http-loader.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/fesm5/ng-select.js");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./_helpers/services/modal.service */ "./src/app/_helpers/services/modal.service.ts");
/* harmony import */ var _helpers_services_pagination_store__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./_helpers/services/pagination.store */ "./src/app/_helpers/services/pagination.store.ts");
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! store */ "./src/store.ts");
/* harmony import */ var _helpers_directives_input_validate_input_validate_directive__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./_helpers/directives/input-validate/input-validate.directive */ "./src/app/_helpers/directives/input-validate/input-validate.directive.ts");
/* harmony import */ var _helpers_modals_modal_container_modal_container_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./_helpers/modals/modal-container/modal-container.component */ "./src/app/_helpers/modals/modal-container/modal-container.component.ts");
/* harmony import */ var _helpers_directives_transaction_details_transaction_details_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./_helpers/directives/transaction-details/transaction-details.component */ "./src/app/_helpers/directives/transaction-details/transaction-details.component.ts");
/* harmony import */ var ngx_contextmenu__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ngx-contextmenu */ "./node_modules/ngx-contextmenu/fesm5/ngx-contextmenu.js");
/* harmony import */ var angular_highcharts__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! angular-highcharts */ "./node_modules/angular-highcharts/fesm5/angular-highcharts.js");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! highcharts */ "./node_modules/highcharts/highcharts.js");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_38___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_38__);
/* harmony import */ var highcharts_modules_exporting_src__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! highcharts/modules/exporting.src */ "./node_modules/highcharts/modules/exporting.src.js");
/* harmony import */ var highcharts_modules_exporting_src__WEBPACK_IMPORTED_MODULE_39___default = /*#__PURE__*/__webpack_require__.n(highcharts_modules_exporting_src__WEBPACK_IMPORTED_MODULE_39__);
/* harmony import */ var _helpers_directives_input_disable_selection_input_disable_selection_directive__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./_helpers/directives/input-disable-selection/input-disable-selection.directive */ "./src/app/_helpers/directives/input-disable-selection/input-disable-selection.directive.ts");
/* harmony import */ var _send_modal_send_modal_component__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./send-modal/send-modal.component */ "./src/app/send-modal/send-modal.component.ts");
/* harmony import */ var _contacts_contacts_component__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./contacts/contacts.component */ "./src/app/contacts/contacts.component.ts");
/* harmony import */ var _add_contacts_add_contacts_component__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./add-contacts/add-contacts.component */ "./src/app/add-contacts/add-contacts.component.ts");
/* harmony import */ var _contact_send_contact_send_component__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./contact-send/contact-send.component */ "./src/app/contact-send/contact-send.component.ts");
/* harmony import */ var _export_import_export_import_component__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./export-import/export-import.component */ "./src/app/export-import/export-import.component.ts");
/* harmony import */ var ngx_papaparse__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ngx-papaparse */ "./node_modules/ngx-papaparse/fesm5/ngx-papaparse.js");
/* harmony import */ var _helpers_modals_export_history_modal_export_history_modal_component__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./_helpers/modals/export-history-modal/export-history-modal.component */ "./src/app/_helpers/modals/export-history-modal/export-history-modal.component.ts");
/* harmony import */ var _contracts_contracts_tab_contracts_tab_component__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./contracts/contracts-tab/contracts-tab.component */ "./src/app/contracts/contracts-tab/contracts-tab.component.ts");
/* harmony import */ var _send_details_modal_send_details_modal_component__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./send-details-modal/send-details-modal.component */ "./src/app/send-details-modal/send-details-modal.component.ts");
/* harmony import */ var _shared_directives_disable_price_fetch_disable_price_fetch_module__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./_shared/directives/disable-price-fetch/disable-price-fetch.module */ "./src/app/_shared/directives/disable-price-fetch/disable-price-fetch.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./_shared/shared.module */ "./src/app/_shared/shared.module.ts");
/* harmony import */ var _synchronization_status_synchronization_status_module__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./synchronization-status/synchronization-status.module */ "./src/app/synchronization-status/synchronization-status.module.ts");
/* harmony import */ var _helpers_directives_tooltip_module__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./_helpers/directives/tooltip.module */ "./src/app/_helpers/directives/tooltip.module.ts");
/* harmony import */ var _layouts_with_sidebar_layout_with_sidebar_layout_module__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./layouts/with-sidebar-layout/with-sidebar-layout.module */ "./src/app/layouts/with-sidebar-layout/with-sidebar-layout.module.ts");
/* harmony import */ var _layouts_full_layout_full_layout_module__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./layouts/full-layout/full-layout.module */ "./src/app/layouts/full-layout/full-layout.module.ts");
/* harmony import */ var _helpers_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./_helpers/pipes/pipes.module */ "./src/app/_helpers/pipes/pipes.module.ts");
/* harmony import */ var _helpers_modals_confirm_modal_confirm_modal_module__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./_helpers/modals/confirm-modal/confirm-modal.module */ "./src/app/_helpers/modals/confirm-modal/confirm-modal.module.ts");
/* harmony import */ var _deeplink_deeplink_module__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./deeplink/deeplink.module */ "./src/app/deeplink/deeplink.module.ts");
/* harmony import */ var _helpers_directives_staking_switch_staking_switch_module__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./_helpers/directives/staking-switch/staking-switch.module */ "./src/app/_helpers/directives/staking-switch/staking-switch.module.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");





























































function HttpLoaderFactory(httpClient) {
    return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_26__["TranslateHttpLoader"](httpClient, './assets/i18n/', '.json');
}
function highchartsFactory() {
    highcharts__WEBPACK_IMPORTED_MODULE_38__["setOptions"]({
        time: {
            useUTC: false
        }
    });
    return [highcharts_modules_exporting_src__WEBPACK_IMPORTED_MODULE_39___default.a];
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_5__["LoginComponent"],
                _settings_settings_component__WEBPACK_IMPORTED_MODULE_6__["SettingsComponent"],
                _add_wallet_add_wallet_component__WEBPACK_IMPORTED_MODULE_7__["AddWalletComponent"],
                _create_wallet_create_wallet_component__WEBPACK_IMPORTED_MODULE_8__["CreateWalletComponent"],
                _open_wallet_open_wallet_component__WEBPACK_IMPORTED_MODULE_9__["OpenWalletComponent"],
                _open_wallet_modal_open_wallet_modal_component__WEBPACK_IMPORTED_MODULE_10__["OpenWalletModalComponent"],
                _restore_wallet_restore_wallet_component__WEBPACK_IMPORTED_MODULE_11__["RestoreWalletComponent"],
                _seed_phrase_seed_phrase_component__WEBPACK_IMPORTED_MODULE_12__["SeedPhraseComponent"],
                _wallet_details_wallet_details_component__WEBPACK_IMPORTED_MODULE_13__["WalletDetailsComponent"],
                _assign_alias_assign_alias_component__WEBPACK_IMPORTED_MODULE_14__["AssignAliasComponent"],
                _edit_alias_edit_alias_component__WEBPACK_IMPORTED_MODULE_15__["EditAliasComponent"],
                _transfer_alias_transfer_alias_component__WEBPACK_IMPORTED_MODULE_16__["TransferAliasComponent"],
                _wallet_wallet_component__WEBPACK_IMPORTED_MODULE_17__["WalletComponent"],
                _send_send_component__WEBPACK_IMPORTED_MODULE_18__["SendComponent"],
                _receive_receive_component__WEBPACK_IMPORTED_MODULE_19__["ReceiveComponent"],
                _history_history_component__WEBPACK_IMPORTED_MODULE_20__["HistoryComponent"],
                _contracts_contracts_component__WEBPACK_IMPORTED_MODULE_21__["ContractsComponent"],
                _purchase_purchase_component__WEBPACK_IMPORTED_MODULE_22__["PurchaseComponent"],
                _staking_staking_component__WEBPACK_IMPORTED_MODULE_23__["StakingComponent"],
                _helpers_directives_input_validate_input_validate_directive__WEBPACK_IMPORTED_MODULE_33__["InputValidateDirective"],
                _helpers_modals_modal_container_modal_container_component__WEBPACK_IMPORTED_MODULE_34__["ModalContainerComponent"],
                _helpers_directives_transaction_details_transaction_details_component__WEBPACK_IMPORTED_MODULE_35__["TransactionDetailsComponent"],
                _helpers_directives_input_disable_selection_input_disable_selection_directive__WEBPACK_IMPORTED_MODULE_40__["InputDisableSelectionDirective"],
                _send_modal_send_modal_component__WEBPACK_IMPORTED_MODULE_41__["SendModalComponent"],
                _contacts_contacts_component__WEBPACK_IMPORTED_MODULE_42__["ContactsComponent"],
                _add_contacts_add_contacts_component__WEBPACK_IMPORTED_MODULE_43__["AddContactsComponent"],
                _contact_send_contact_send_component__WEBPACK_IMPORTED_MODULE_44__["ContactSendComponent"],
                _export_import_export_import_component__WEBPACK_IMPORTED_MODULE_45__["ExportImportComponent"],
                _helpers_modals_export_history_modal_export_history_modal_component__WEBPACK_IMPORTED_MODULE_47__["ExportHistoryModalComponent"],
                _contracts_contracts_tab_contracts_tab_component__WEBPACK_IMPORTED_MODULE_48__["ContractsTabComponent"],
                _send_details_modal_send_details_modal_component__WEBPACK_IMPORTED_MODULE_49__["SendDetailsModalComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_24__["HttpClientModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_25__["TranslateModule"].forRoot({
                    loader: {
                        provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_25__["TranslateLoader"],
                        useFactory: HttpLoaderFactory,
                        deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_24__["HttpClient"]]
                    }
                }),
                _angular_forms__WEBPACK_IMPORTED_MODULE_27__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_27__["ReactiveFormsModule"],
                _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_28__["NgSelectModule"],
                angular_highcharts__WEBPACK_IMPORTED_MODULE_37__["ChartModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_60__["FlexLayoutModule"],
                ngx_papaparse__WEBPACK_IMPORTED_MODULE_46__["PapaParseModule"],
                _shared_directives_disable_price_fetch_disable_price_fetch_module__WEBPACK_IMPORTED_MODULE_50__["DisablePriceFetchModule"],
                _helpers_directives_tooltip_module__WEBPACK_IMPORTED_MODULE_53__["TooltipModule"],
                _helpers_modals_confirm_modal_confirm_modal_module__WEBPACK_IMPORTED_MODULE_57__["ConfirmModalModule"],
                _helpers_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_56__["PipesModule"],
                _deeplink_deeplink_module__WEBPACK_IMPORTED_MODULE_58__["DeeplinkModule"],
                _helpers_directives_staking_switch_staking_switch_module__WEBPACK_IMPORTED_MODULE_59__["StakingSwitchModule"],
                _layouts_full_layout_full_layout_module__WEBPACK_IMPORTED_MODULE_55__["FullLayoutModule"],
                _layouts_with_sidebar_layout_with_sidebar_layout_module__WEBPACK_IMPORTED_MODULE_54__["WithSidebarLayoutModule"],
                _synchronization_status_synchronization_status_module__WEBPACK_IMPORTED_MODULE_52__["SynchronizationStatusModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_51__["SharedModule"],
                ngx_contextmenu__WEBPACK_IMPORTED_MODULE_36__["ContextMenuModule"].forRoot(),
            ],
            providers: [
                store__WEBPACK_IMPORTED_MODULE_32__["Store"],
                _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_29__["BackendService"],
                _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_30__["ModalService"],
                _helpers_services_pagination_store__WEBPACK_IMPORTED_MODULE_31__["PaginationStore"],
                { provide: angular_highcharts__WEBPACK_IMPORTED_MODULE_37__["HIGHCHARTS_MODULES"], useFactory: highchartsFactory }
            ],
            entryComponents: [
                _helpers_modals_modal_container_modal_container_component__WEBPACK_IMPORTED_MODULE_34__["ModalContainerComponent"],
                _send_modal_send_modal_component__WEBPACK_IMPORTED_MODULE_41__["SendModalComponent"],
                _helpers_modals_export_history_modal_export_history_modal_component__WEBPACK_IMPORTED_MODULE_47__["ExportHistoryModalComponent"],
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/assign-alias/assign-alias.component.html":
/*!**********************************************************!*\
  !*** ./src/app/assign-alias/assign-alias.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"page-container\">\n\n    <div class=\"toolbar mb-2\">\n        <div class=\"left\">\n            <button type=\"button\"\n                    class=\"btn-icon circle big mr-2\"\n                    (click)=\"back()\">\n                <i class=\"icon dropdown-arrow-left\"></i>\n            </button>\n            <h1>{{ 'BREADCRUMBS.ASSIGN_ALIAS' | translate }}</h1>\n        </div>\n        <div class=\"right\"></div>\n    </div>\n\n    <div class=\"page-content\">\n        <div class=\"breadcrumbs mb-2\">\n            <div class=\"breadcrumb\">\n                <a [routerLink]=\"['/wallet/history']\">{{ wallet.name }}</a>\n            </div>\n            <div class=\"breadcrumb\">\n                <span>{{ 'BREADCRUMBS.ASSIGN_ALIAS' | translate }}</span>\n            </div>\n        </div>\n\n        <div class=\"scrolled-content\">\n            <form class=\"form\"\n                  [formGroup]=\"assignForm\">\n\n                <div class=\"form__field\">\n                    <label for=\"alias-name\"\n                           tooltip=\"{{ 'ASSIGN_ALIAS.NAME.TOOLTIP' | translate }}\"\n                           placement=\"bottom-left\"\n                           tooltipClass=\"table-tooltip assign-alias-tooltip\"\n                           [delay]=\"50\">\n                        {{ 'ASSIGN_ALIAS.NAME.LABEL' | translate }}\n                    </label>\n                    <div class=\"has-no-edit-symbol\">\n                        <input class=\"form__field--input\"\n                               type=\"text\"\n                               id=\"alias-name\"\n                               formControlName=\"name\"\n                               [placeholder]=\"'ASSIGN_ALIAS.NAME.PLACEHOLDER' | translate\"\n                               (contextmenu)=\"variablesService.onContextMenu($event)\">\n                    </div>\n                    <div class=\"error\"\n                         *ngIf=\"assignForm.controls['name'].invalid &&  (assignForm.controls['name'].dirty || assignForm.controls['name'].touched)\">\n                        <div\n                              *ngIf=\"assignForm.controls['name'].errors['pattern'] && assignForm.get('name').value.length > 6 && assignForm.get('name').value.length <= 25\">\n                            {{ 'ASSIGN_ALIAS.FORM_ERRORS.NAME_WRONG' | translate }}\n                        </div>\n                        <div *ngIf=\"assignForm.get('name').value.length <= 6 || assignForm.get('name').value.length > 25\">\n                            {{ 'ASSIGN_ALIAS.FORM_ERRORS.NAME_LENGTH' | translate }}\n                        </div>\n                        <div *ngIf=\"assignForm.controls['name'].hasError('required')\">\n                            {{ 'ASSIGN_ALIAS.FORM_ERRORS.NAME_REQUIRED' | translate }}\n                        </div>\n                    </div>\n                    <div class=\"error\"\n                         *ngIf=\"alias.exists\">\n                        <div>\n                            {{ 'ASSIGN_ALIAS.FORM_ERRORS.NAME_EXISTS' | translate }}\n                        </div>\n                    </div>\n                    <div class=\"error\"\n                         *ngIf=\"notEnoughMoney\">\n                        <div>\n                            {{ 'ASSIGN_ALIAS.FORM_ERRORS.NO_MONEY' | translate }}\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"form__field textarea\">\n                    <label for=\"alias-comment\"\n                           tooltip=\"{{ 'ASSIGN_ALIAS.COMMENT.TOOLTIP' | translate }}\"\n                           placement=\"bottom-left\"\n                           tooltipClass=\"table-tooltip assign-alias-tooltip\"\n                           [delay]=\"50\">\n                        {{ 'ASSIGN_ALIAS.COMMENT.LABEL' | translate }}\n                    </label>\n                    <textarea id=\"alias-comment\"\n                              class=\"scrolled-content\"\n                              formControlName=\"comment\"\n                              placeholder=\"{{ 'ASSIGN_ALIAS.COMMENT.PLACEHOLDER' | translate }}\"\n                              [maxLength]=\"variablesService.maxCommentLength\"\n                              (contextmenu)=\"variablesService.onContextMenu($event)\">\n                    </textarea>\n                    <div class=\"error\"\n                         *ngIf=\"assignForm.get('comment').value.length >= variablesService.maxCommentLength\">\n                        {{ 'ASSIGN_ALIAS.FORM_ERRORS.MAX_LENGTH' | translate }}\n                    </div>\n                </div>\n\n                <p class=\"mb-2\">{{ \"ASSIGN_ALIAS.COST\" | translate : {\n                    value: alias.price | intToMoney, currency:\n                    variablesService.defaultCurrency\n                } }}</p>\n\n                <button type=\"button\"\n                        class=\"primary big w-100\"\n                        (click)=\"assignAlias()\"\n                        [disabled]=\"!assignForm.valid || !canRegister || notEnoughMoney\">{{ 'ASSIGN_ALIAS.BUTTON_ASSIGN' | translate\n                    }}</button>\n            </form>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/assign-alias/assign-alias.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/assign-alias/assign-alias.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL2Fzc2lnbi1hbGlhcy9hc3NpZ24tYWxpYXMuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2Fzc2lnbi1hbGlhcy9hc3NpZ24tYWxpYXMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9hc3NpZ24tYWxpYXMvYXNzaWduLWFsaWFzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuIiwiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/assign-alias/assign-alias.component.ts":
/*!********************************************************!*\
  !*** ./src/app/assign-alias/assign-alias.component.ts ***!
  \********************************************************/
/*! exports provided: AssignAliasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssignAliasComponent", function() { return AssignAliasComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_helpers/services/modal.service */ "./src/app/_helpers/services/modal.service.ts");
/* harmony import */ var _helpers_pipes_money_to_int_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../_helpers/pipes/money-to-int.pipe */ "./src/app/_helpers/pipes/money-to-int.pipe.ts");
/* harmony import */ var _helpers_pipes_int_to_money_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../_helpers/pipes/int-to-money.pipe */ "./src/app/_helpers/pipes/int-to-money.pipe.ts");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! bignumber.js */ "./node_modules/bignumber.js/bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_10__);











var AssignAliasComponent = /** @class */ (function () {
    function AssignAliasComponent(ngZone, location, router, backend, variablesService, modalService, moneyToInt, intToMoney) {
        var _this = this;
        this.ngZone = ngZone;
        this.location = location;
        this.router = router;
        this.backend = backend;
        this.variablesService = variablesService;
        this.modalService = modalService;
        this.moneyToInt = moneyToInt;
        this.intToMoney = intToMoney;
        this.assignForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern(/^@?[a-z\d\.\-]{6,25}$/)]),
            comment: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [function (g) {
                    if (g.value > _this.variablesService.maxCommentLength) {
                        return { 'maxLength': true };
                    }
                    else {
                        return null;
                    }
                }])
        });
        this.alias = {
            name: '',
            fee: this.variablesService.default_fee,
            price: new bignumber_js__WEBPACK_IMPORTED_MODULE_10___default.a(0),
            reward: '0',
            rewardOriginal: '0',
            comment: '',
            exists: false
        };
        this.canRegister = false;
        this.notEnoughMoney = false;
    }
    AssignAliasComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.wallet = this.variablesService.currentWallet;
        this.assignFormSubscription = this.assignForm.get('name').valueChanges.subscribe(function (value) {
            _this.canRegister = false;
            _this.alias.exists = false;
            var newName = value.toLowerCase().replace('@', '');
            if (!(_this.assignForm.controls['name'].errors && _this.assignForm.controls['name'].errors.hasOwnProperty('pattern')) && newName.length >= 6 && newName.length <= 25) {
                _this.backend.getAliasByName(newName, function (status) {
                    _this.ngZone.run(function () {
                        _this.alias.exists = status;
                    });
                    if (!status) {
                        _this.alias.price = new bignumber_js__WEBPACK_IMPORTED_MODULE_10___default.a(0);
                        _this.backend.getAliasCoast(newName, function (statusPrice, dataPrice) {
                            _this.ngZone.run(function () {
                                if (statusPrice) {
                                    _this.alias.price = bignumber_js__WEBPACK_IMPORTED_MODULE_10___default.a.sum(dataPrice['coast'], _this.variablesService.default_fee_big);
                                }
                                _this.notEnoughMoney = _this.alias.price.isGreaterThan(_this.wallet.unlocked_balance);
                                _this.alias.reward = _this.intToMoney.transform(_this.alias.price, false);
                                _this.alias.rewardOriginal = _this.intToMoney.transform(dataPrice['coast'], false);
                                _this.canRegister = !_this.notEnoughMoney;
                            });
                        });
                    }
                    else {
                        _this.notEnoughMoney = false;
                        _this.alias.reward = '0';
                        _this.alias.rewardOriginal = '0';
                    }
                });
            }
            else {
                _this.notEnoughMoney = false;
                _this.alias.reward = '0';
                _this.alias.rewardOriginal = '0';
            }
            _this.alias.name = newName;
        });
    };
    AssignAliasComponent.prototype.assignAlias = function () {
        var _this = this;
        var alias = this.backend.getWalletAlias(this.wallet.address);
        if (alias.hasOwnProperty('name')) {
            this.modalService.prepareModal('info', 'ASSIGN_ALIAS.ONE_ALIAS');
        }
        else {
            this.alias.comment = this.assignForm.get('comment').value;
            this.backend.registerAlias(this.wallet.wallet_id, this.alias.name, this.wallet.address, this.alias.fee, this.alias.comment, this.alias.rewardOriginal, function (status) {
                if (status) {
                    _this.wallet.wakeAlias = true;
                    _this.modalService.prepareModal('info', 'ASSIGN_ALIAS.REQUEST_ADD_REG');
                    _this.ngZone.run(function () {
                        _this.router.navigate(['/wallet/']);
                    });
                }
            });
        }
    };
    AssignAliasComponent.prototype.back = function () {
        this.location.back();
    };
    AssignAliasComponent.prototype.ngOnDestroy = function () {
        this.assignFormSubscription.unsubscribe();
    };
    AssignAliasComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-assign-alias',
            template: __webpack_require__(/*! ./assign-alias.component.html */ "./src/app/assign-alias/assign-alias.component.html"),
            styles: [__webpack_require__(/*! ./assign-alias.component.scss */ "./src/app/assign-alias/assign-alias.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["Location"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_5__["BackendService"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_6__["VariablesService"],
            _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_7__["ModalService"],
            _helpers_pipes_money_to_int_pipe__WEBPACK_IMPORTED_MODULE_8__["MoneyToIntPipe"],
            _helpers_pipes_int_to_money_pipe__WEBPACK_IMPORTED_MODULE_9__["IntToMoneyPipe"]])
    ], AssignAliasComponent);
    return AssignAliasComponent;
}());



/***/ }),

/***/ "./src/app/contact-send/contact-send.component.html":
/*!**********************************************************!*\
  !*** ./src/app/contact-send/contact-send.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"page-container\">\n\n    <div class=\"toolbar mb-2\">\n        <div class=\"left\">\n            <button type=\"button\"\n                    class=\"btn-icon circle big mr-2\"\n                    (click)=\"back()\">\n                <i class=\"icon dropdown-arrow-left\"></i>\n            </button>\n            <h1>{{ 'CONTACTS.TITLE' | translate }}</h1>\n        </div>\n        <div class=\"right\"></div>\n    </div>\n\n    <div class=\"page-content\">\n        <div class=\"breadcrumbs mb-2\">\n            <div class=\"breadcrumb\">\n                <a [routerLink]=\"['/contacts']\">{{'CONTACTS.TITLE' | translate}}</a>\n            </div>\n            <div class=\"breadcrumb\">\n                <span>{{ 'CONTACTS.SEND' | translate }}</span>\n            </div>\n        </div>\n\n        <div class=\"scrolled-content\">\n            <form class=\"form\">\n                <div class=\"form__field--row\">\n                    <div class=\"form__field\">\n                        <label>\n                            {{ 'CONTACTS.SEND_FROM' | translate }}\n                        </label>\n                        <ng-select class=\"custom-select\"\n                                   name=\"wallets\"\n                                   [items]=\"this.variablesService.wallets\"\n                                   [(ngModel)]=\"this.variablesService.selectWallet\"\n                                   bindValue=\"wallet_id\"\n                                   bindLabel=\"name\"\n                                   [clearable]=\"false\"\n                                   [searchable]=\"false\">\n                        </ng-select>\n                    </div>\n                    <div>\n                        <button class=\"outline w-100 mt-3 p-1\"\n                                [routerLink]=\"['/add-wallet']\">\n                            {{ 'CONTACTS.OPEN_ADD_WALLET' | translate }}\n                        </button>\n                    </div>\n                </div>\n\n                <div class=\"form__field\">\n                    <label for=\"address\">{{ 'CONTACTS.SEND_TO' | translate }}</label>\n                    <input class=\"form__field--input\"\n                           type=\"text\"\n                           id=\"address\"\n                           name=\"address\"\n                           [(ngModel)]=\"address\"\n                           [readonly]=\"true\"/>\n                </div>\n\n                <button type=\"button\"\n                        class=\"primary big w-100\"\n                        (click)=\"goToWallet(this.variablesService.selectWallet)\"\n                        [disabled]=\"!(this.variablesService.selectWallet === 0 || this.variablesService.selectWallet)\">\n                    {{'CONTACTS.BUTTON.GO_TO_WALLET' | translate }}\n                </button>\n            </form>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/contact-send/contact-send.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/contact-send/contact-send.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL2NvbnRhY3Qtc2VuZC9jb250YWN0LXNlbmQuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbnRhY3Qtc2VuZC9jb250YWN0LXNlbmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9jb250YWN0LXNlbmQvY29udGFjdC1zZW5kLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuIiwiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/contact-send/contact-send.component.ts":
/*!********************************************************!*\
  !*** ./src/app/contact-send/contact-send.component.ts ***!
  \********************************************************/
/*! exports provided: ContactSendComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactSendComponent", function() { return ContactSendComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");





var ContactSendComponent = /** @class */ (function () {
    function ContactSendComponent(location, variablesService, route, ngZone, router) {
        this.location = location;
        this.variablesService = variablesService;
        this.route = route;
        this.ngZone = ngZone;
        this.router = router;
    }
    ContactSendComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.queryRouting = this.route.queryParams.subscribe(function (params) {
            if (params.address) {
                _this.address = params.address;
            }
        });
    };
    ContactSendComponent.prototype.goToWallet = function (id) {
        var _this = this;
        this.variablesService.setCurrentWallet(id);
        this.variablesService.currentWallet.send_data['address'] = this.address;
        this.ngZone.run(function () {
            _this.router.navigate(['/wallet/send'], { queryParams: { send: true } });
        });
    };
    ContactSendComponent.prototype.back = function () {
        this.location.back();
    };
    ContactSendComponent.prototype.ngOnDestroy = function () {
        this.queryRouting.unsubscribe();
    };
    ContactSendComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-contact-send',
            template: __webpack_require__(/*! ./contact-send.component.html */ "./src/app/contact-send/contact-send.component.html"),
            styles: [__webpack_require__(/*! ./contact-send.component.scss */ "./src/app/contact-send/contact-send.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_3__["VariablesService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], ContactSendComponent);
    return ContactSendComponent;
}());



/***/ }),

/***/ "./src/app/contacts/contacts.component.html":
/*!**************************************************!*\
  !*** ./src/app/contacts/contacts.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"page-container\">\n\n    <div class=\"toolbar mb-2\">\n        <div class=\"left\">\n            <button type=\"button\"\n                    class=\"btn-icon circle big mr-2\"\n                    (click)=\"back()\">\n                <i class=\"icon dropdown-arrow-left\"></i>\n            </button>\n            <h1>{{ 'CONTACTS.TITLE' | translate }}</h1>\n        </div>\n        <div class=\"right\"></div>\n    </div>\n\n    <div class=\"page-content\">\n        <div fxFlex=\"1 1 auto\" fxLayout=\"row\">\n            <ng-container *ngIf=\"this.variablesService.contacts.length !== 0; else emptyList\">\n                <div class=\"contacts w-100\"\n                     fxLayout=\"column\"\n                     fxLayoutGap=\"2rem\"\n                     fxLayoutAlign=\"start stretch\">\n                    <div class=\"wrap-table scrolled-content\"\n                         fxLayout=\"column\"\n                         fxFlex=\"1 1 auto\">\n                        <table class=\"contacts-table\">\n                            <thead>\n                            <tr #head\n                                (window:resize)=\"calculateWidth()\">\n                                <th><div class=\"bg title\">{{ 'CONTACTS.TABLE.NAME' | translate }}</div></th>\n                                <th><div class=\"bg title\">{{ 'CONTACTS.TABLE.ALIAS' | translate }}</div></th>\n                                <th><div class=\"bg title\">{{ 'CONTACTS.TABLE.ADDRESS' | translate }}</div></th>\n                                <th><div class=\"bg title\">{{ 'CONTACTS.TABLE.NOTES' | translate }}</div></th>\n                              <th><div class=\"bg title\">&nbsp;</div></th>\n                            </tr>\n                            <div class=\"row-divider\"></div>\n                            </thead>\n                            <tbody>\n                            <ng-container *ngFor=\"let contact of this.variablesService.contacts; let i = index\">\n                                <tr>\n                                    <td>\n                                        {{ contact.name }}\n                                    </td>\n                                    <td>\n                                        <ng-container *ngIf=\"contact.alias\">\n                                            <span>{{ contact.alias }}</span>\n                                        </ng-container>\n                                    </td>\n                                    <td class=\"remote-address\" (contextmenu)=\"variablesService.onContextMenuOnlyCopy($event, contact.address)\">\n                                        {{ contact.address | slice:0:6 }}...{{ contact.address | slice:-6 }}\n                                    </td>\n                                    <td class=\"remote-notes\">\n                                        {{ contact.notes }}\n                                    </td>\n                                    <td>\n                                        <div class=\"button-wrapper\">\n                                            <button class=\"btn-icon small circle\"\n                                                    [routerLink]=\"['/contact-send/' + i]\"\n                                                    [queryParams]=\"{ address: contact.address }\">\n                                                <i class=\"icon arrow-up-square\"></i>\n                                            </button>\n                                            <button class=\"btn-icon small circle\"\n                                                    [routerLink]=\"['/edit-contacts/' + i]\"\n                                                    [queryParams]=\"{ id: i }\">\n                                                <i class=\"icon edit-square\"></i>\n                                            </button>\n                                            <button class=\"btn-icon small circle\"\n                                                    (click)=\"delete(i)\">\n                                                <i class=\"icon delete\"></i>\n                                            </button>\n                                        </div>\n                                    </td>\n                                </tr>\n                                <div class=\"row-divider\"></div>\n                            </ng-container>\n                            </tbody>\n                        </table>\n                    </div>\n                    <ng-container *ngTemplateOutlet=\"tempButtonAdd\"></ng-container>\n                </div>\n            </ng-container>\n        </div>\n    </div>\n</div>\n\n<ng-template #emptyList>\n    <div class=\"empty-list w-100\"\n         fxLayout=\"column\"\n         fxLayoutAlign=\"center center\">\n        <h4 class=\"mb-2\">{{ 'CONTACTS.TABLE.EMPTY' | translate }}</h4>\n        <ng-container *ngTemplateOutlet=\"tempButtonAdd\"></ng-container>\n    </div>\n</ng-template>\n\n<ng-template #tempButtonAdd>\n    <button [routerLink]=\"['/add-contacts']\"\n            class=\"primary big w-100 max-w-19-rem\">\n        {{ 'CONTACTS.BUTTON.ADD' | translate }}\n    </button>\n</ng-template>\n"

/***/ }),

/***/ "./src/app/contacts/contacts.component.scss":
/*!**************************************************!*\
  !*** ./src/app/contacts/contacts.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL2NvbnRhY3RzL2NvbnRhY3RzLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jb250YWN0cy9jb250YWN0cy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL2NvbnRhY3RzL2NvbnRhY3RzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuIiwiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/contacts/contacts.component.ts":
/*!************************************************!*\
  !*** ./src/app/contacts/contacts.component.ts ***!
  \************************************************/
/*! exports provided: ContactsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactsComponent", function() { return ContactsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");





var ContactsComponent = /** @class */ (function () {
    function ContactsComponent(location, variablesService, backend) {
        this.location = location;
        this.variablesService = variablesService;
        this.backend = backend;
        this.calculatedWidth = [];
    }
    ContactsComponent.prototype.ngOnInit = function () {
        this.backend.getContactAlias();
    };
    ContactsComponent.prototype.delete = function (index) {
        if (this.variablesService.appPass) {
            this.variablesService.contacts.splice(index, 1);
            this.backend.storeSecureAppData();
        }
    };
    ContactsComponent.prototype.calculateWidth = function () {
        this.calculatedWidth = [];
        this.calculatedWidth.push(this.head.nativeElement.childNodes[0].clientWidth);
        this.calculatedWidth.push(this.head.nativeElement.childNodes[1].clientWidth +
            this.head.nativeElement.childNodes[2].clientWidth);
        this.calculatedWidth.push(this.head.nativeElement.childNodes[3].clientWidth);
        this.calculatedWidth.push(this.head.nativeElement.childNodes[4].clientWidth);
    };
    ContactsComponent.prototype.back = function () {
        this.location.back();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('head'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], ContactsComponent.prototype, "head", void 0);
    ContactsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-contacts',
            template: __webpack_require__(/*! ./contacts.component.html */ "./src/app/contacts/contacts.component.html"),
            styles: [__webpack_require__(/*! ./contacts.component.scss */ "./src/app/contacts/contacts.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_3__["VariablesService"],
            _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__["BackendService"]])
    ], ContactsComponent);
    return ContactsComponent;
}());



/***/ }),

/***/ "./src/app/contracts/contracts-tab/contracts-tab.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/contracts/contracts-tab/contracts-tab.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/contracts/contracts-tab/contracts-tab.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/contracts/contracts-tab/contracts-tab.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL2NvbnRyYWN0cy9jb250cmFjdHMtdGFiL2NvbnRyYWN0cy10YWIuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbnRyYWN0cy9jb250cmFjdHMtdGFiL2NvbnRyYWN0cy10YWIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtBQ0NGIiwiZmlsZSI6InNyYy9hcHAvY29udHJhY3RzL2NvbnRyYWN0cy10YWIvY29udHJhY3RzLXRhYi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbn1cbiIsIjpob3N0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbn0iXX0= */"

/***/ }),

/***/ "./src/app/contracts/contracts-tab/contracts-tab.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/contracts/contracts-tab/contracts-tab.component.ts ***!
  \********************************************************************/
/*! exports provided: ContractsTabComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractsTabComponent", function() { return ContractsTabComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ContractsTabComponent = /** @class */ (function () {
    function ContractsTabComponent() {
    }
    ContractsTabComponent.prototype.ngOnInit = function () {
    };
    ContractsTabComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-contracts-tab',
            template: __webpack_require__(/*! ./contracts-tab.component.html */ "./src/app/contracts/contracts-tab/contracts-tab.component.html"),
            styles: [__webpack_require__(/*! ./contracts-tab.component.scss */ "./src/app/contracts/contracts-tab/contracts-tab.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ContractsTabComponent);
    return ContractsTabComponent;
}());



/***/ }),

/***/ "./src/app/contracts/contracts.component.html":
/*!****************************************************!*\
  !*** ./src/app/contracts/contracts.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"variablesService.currentWallet.contracts.length; else emptyContracts\"\n     class=\"container\"\n     fxLayout=\"column\"\n     fxFlexFill>\n  <div class=\"wrap-table scrolled-content mb-2\"\n       fxFlex=\"1 1 auto\">\n    <table class=\"contracts-table\">\n      <thead>\n      <tr>\n        <th>\n          <div class=\"bg title\">{{ 'CONTRACTS.CONTRACTS' | translate }}</div>\n        </th>\n        <th>\n          <div class=\"bg title\">{{ 'CONTRACTS.DATE' | translate }}</div>\n        </th>\n        <th>\n          <div class=\"bg title\">{{ 'CONTRACTS.AMOUNT' | translate }}</div>\n        </th>\n        <th>\n          <div class=\"bg title\">{{ 'CONTRACTS.STATUS' | translate }}</div>\n        </th>\n        <th>\n          <div class=\"bg title\">{{ 'CONTRACTS.COMMENTS' | translate }}</div>\n        </th>\n      </tr>\n      <div class=\"row-divider\"></div>\n      </thead>\n      <tbody>\n      <ng-container *ngFor=\"let item of sortedArrayContracts\">\n        <tr [routerLink]=\"'/wallet/contracts/purchase/' + item.contract_id\">\n          <td>\n            <div class=\"contract\"\n                 fxLayout=\"row\"\n                 fxLayoutAlign=\" center\">\n              <i class=\"icon alert mr-1\"\n                 *ngIf=\"!item.is_new\"></i>\n              <i class=\"icon new mr-1\"\n                 *ngIf=\"item.is_new\"></i>\n              <i class=\"icon mr-1\"\n                 [class.purchase-arrow-down]=\"item.is_a\"\n                 [class.purchase-arrow-up]=\"!item.is_a\"></i>\n              <span tooltip=\"{{ item.private_detailes.t }}\"\n                    placement=\"top-left\"\n                    tooltipClass=\"table-tooltip\"\n                    [delay]=\"500\"\n                    [showWhenNoOverflow]=\"false\">{{item.private_detailes.t}}</span>\n            </div>\n          </td>\n          <td>\n            <div>{{item.timestamp * 1000 | date : 'dd-MM-yyyy HH:mm'}}</div>\n          </td>\n          <td>\n            <div>{{item.private_detailes.to_pay | intToMoney}} {{variablesService.defaultCurrency}}</div>\n          </td>\n          <td>\n            <div class=\"status\"\n                 [class.color-red]=\"item.state === 4\"\n                 tooltip=\"{{item.state | contractStatusMessages : item.is_a}}\"\n                 placement=\"top\"\n                 tooltipClass=\"table-tooltip\"\n                 [delay]=\"500\">\n              {{item.state | contractStatusMessages : item.is_a}}\n            </div>\n          </td>\n          <td>\n            <div class=\"comment\"\n                 tooltip=\"{{ item.private_detailes.c }}\"\n                 placement=\"top-right\"\n                 tooltipClass=\"table-tooltip\"\n                 [delay]=\"500\"\n                 [showWhenNoOverflow]=\"false\">\n              {{item.private_detailes.c}}\n            </div>\n          </td>\n        </tr>\n        <div class=\"row-divider\"></div>\n      </ng-container>\n      </tbody>\n    </table>\n  </div>\n  <div class=\"buttons-wrap w-100\"\n       fxFlex=\"0 0 auto\"\n       fxLayout=\"row\"\n       fxLayoutAlign=\"start center\">\n    <button type=\"button\"\n            class=\"primary big max-w-19-rem w-100\"\n            [routerLink]=\"'/wallet/contracts/purchase'\">{{\n      'CONTRACTS.PURCHASE_BUTTON' | translate }}</button>\n  </div>\n</div>\n\n<ng-template #emptyContracts>\n  <div class=\"container\"\n       fxLayout=\"column\"\n       fxLayoutAlign=\"center center\"\n       fxFlexFill>\n    <span class=\"mb-2\">{{ 'CONTRACTS.EMPTY' | translate }}</span>\n    <button type=\"button\"\n            class=\"primary big max-w-19-rem w-100\"\n            [routerLink]=\"'/wallet/contracts/purchase'\">{{\n      'CONTRACTS.PURCHASE_BUTTON' | translate }}</button>\n  </div>\n</ng-template>\n"

/***/ }),

/***/ "./src/app/contracts/contracts.component.scss":
/*!****************************************************!*\
  !*** ./src/app/contracts/contracts.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL2NvbnRyYWN0cy9jb250cmFjdHMuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbnRyYWN0cy9jb250cmFjdHMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtBQ0NGIiwiZmlsZSI6InNyYy9hcHAvY29udHJhY3RzL2NvbnRyYWN0cy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbn1cbiIsIjpob3N0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbn0iXX0= */"

/***/ }),

/***/ "./src/app/contracts/contracts.component.ts":
/*!**************************************************!*\
  !*** ./src/app/contracts/contracts.component.ts ***!
  \**************************************************/
/*! exports provided: ContractsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractsComponent", function() { return ContractsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");



var ContractsComponent = /** @class */ (function () {
    function ContractsComponent(variablesService) {
        this.variablesService = variablesService;
    }
    Object.defineProperty(ContractsComponent.prototype, "sortedArrayContracts", {
        get: function () {
            return this.variablesService.currentWallet.contracts.sort(function (a, b) {
                if (a.is_new < b.is_new) {
                    return 1;
                }
                if (a.is_new > b.is_new) {
                    return -1;
                }
                if (a.timestamp < b.timestamp) {
                    return 1;
                }
                if (a.timestamp > b.timestamp) {
                    return -1;
                }
                if (a.contract_id < b.contract_id) {
                    return 1;
                }
                if (a.contract_id > b.contract_id) {
                    return -1;
                }
                return 0;
            });
        },
        enumerable: true,
        configurable: true
    });
    ContractsComponent.prototype.ngOnInit = function () {
    };
    ContractsComponent.prototype.ngOnDestroy = function () {
    };
    ContractsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-contracts',
            template: __webpack_require__(/*! ./contracts.component.html */ "./src/app/contracts/contracts.component.html"),
            styles: [__webpack_require__(/*! ./contracts.component.scss */ "./src/app/contracts/contracts.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_2__["VariablesService"]])
    ], ContractsComponent);
    return ContractsComponent;
}());



/***/ }),

/***/ "./src/app/create-wallet/create-wallet.component.html":
/*!************************************************************!*\
  !*** ./src/app/create-wallet/create-wallet.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"page-container\">\n\n\t<div class=\"toolbar mb-2\">\n\t\t<div class=\"left\">\n\t\t\t<button (click)=\"location.back()\"\n\t\t\t\t\tclass=\"btn-icon circle big mr-2\"\n\t\t\t\t\ttype=\"button\">\n\t\t\t\t<i class=\"icon dropdown-arrow-left\"></i>\n\t\t\t</button>\n\t\t\t<h1>{{ 'BREADCRUMBS.ADD_WALLET' | translate }}</h1>\n\t\t</div>\n\t\t<div class=\"right\"></div>\n\t</div>\n\n\t<div class=\"page-content\">\n\t\t<div class=\"breadcrumbs mb-2\">\n\t\t\t<div class=\"breadcrumb\">\n\t\t\t\t<a [routerLink]=\"['/add-wallet']\">{{'BREADCRUMBS.ADD_WALLET' | translate }}</a>\n\t\t\t</div>\n\t\t\t<div class=\"breadcrumb\">\n\t\t\t\t<span>{{'BREADCRUMBS.CREATE_WALLET' | translate}}</span>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"scrolled-content\">\n\t\t\t<form [formGroup]=\"createForm\"\n\t\t\t\t  class=\"form\">\n\t\t\t\t<div class=\"form__field\">\n\t\t\t\t\t<label for=\"wallet-name\">{{'CREATE_WALLET.NAME' | translate }}</label>\n\t\t\t\t\t<input (contextmenu)=\"variablesService.onContextMenu($event)\"\n\t\t\t\t\t\t   [placeholder]=\"'PLACEHOLDERS.WALLET_NAME_PLACEHOLDER' | translate\"\n\t\t\t\t\t\t   [readonly]=\"createForm.get('path').valid\"\n\t\t\t\t\t\t   class=\"form__field--input\"\n\t\t\t\t\t\t   formControlName=\"name\"\n\t\t\t\t\t\t   id=\"wallet-name\"\n\t\t\t\t\t\t   maxlength=\"{{ variablesService.maxWalletNameLength }}\"\n\t\t\t\t\t\t   type=\"text\">\n\t\t\t\t\t<div *ngIf=\"createForm.controls['name'].invalid && (createForm.controls['name'].dirty || createForm.controls['name'].touched)\"\n\t\t\t\t\t\t class=\"error\">\n\t\t\t\t\t\t<div *ngIf=\"createForm.controls['name'].errors['duplicate']\">\n\t\t\t\t\t\t\t{{ 'CREATE_WALLET.FORM_ERRORS.NAME_DUPLICATE' | translate }}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div *ngIf=\"createForm.controls['name'].errors['required']\">\n\t\t\t\t\t\t\t{{ 'CREATE_WALLET.FORM_ERRORS.NAME_REQUIRED' | translate }}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div *ngIf=\"createForm.get('name').value.length > variablesService.maxWalletNameLength\"\n\t\t\t\t\t\t class=\"error\">\n\t\t\t\t\t\t{{ 'CREATE_WALLET.FORM_ERRORS.MAX_LENGTH' | translate }}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"form__field\">\n\t\t\t\t\t<label for=\"wallet-password\">{{ 'CREATE_WALLET.PASS' | translate }}</label>\n\t\t\t\t\t<input (contextmenu)=\"variablesService.onContextMenuPasteSelect($event)\"\n\t\t\t\t\t\t   [readonly]=\"createForm.get('path').valid\"\n\t\t\t\t\t\t   class=\"form__field--input\"\n\t\t\t\t\t\t   formControlName=\"password\"\n\t\t\t\t\t\t   id=\"wallet-password\"\n\t\t\t\t\t\t   placeholder=\"{{ 'PLACEHOLDERS.PLACEHOLDER_NEW' | translate }}\"\n\t\t\t\t\t\t   type=\"password\">\n\t\t\t\t\t<div *ngIf=\"createForm.controls['password'].dirty && createForm.controls['password'].errors\"\n\t\t\t\t\t\t class=\"error\">\n\t\t\t\t\t\t<div *ngIf=\"createForm.controls['password'].errors.pattern\">\n\t\t\t\t\t\t\t{{ 'ERRORS.WRONG_PASSWORD' | translate }}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"form__field\">\n\t\t\t\t\t<label for=\"confirm-wallet-password\">{{ 'CREATE_WALLET.CONFIRM' | translate }}</label>\n\t\t\t\t\t<input (contextmenu)=\"variablesService.onContextMenuPasteSelect($event)\"\n\t\t\t\t\t\t   [class.invalid]=\"createForm.errors && createForm.errors['confirm_mismatch'] && createForm.get('confirm').value.length > 0\"\n\t\t\t\t\t\t   [readonly]=\"createForm.get('path').valid\"\n\t\t\t\t\t\t   class=\"form__field--input\"\n\t\t\t\t\t\t   formControlName=\"confirm\"\n\t\t\t\t\t\t   id=\"confirm-wallet-password\"\n\t\t\t\t\t\t   placeholder=\"{{ 'PLACEHOLDERS.PLACEHOLDER_CONFIRM' | translate }}\"\n\t\t\t\t\t\t   type=\"password\">\n\t\t\t\t\t<div *ngIf=\"createForm.controls['confirm'].dirty && createForm.controls['confirm'].dirty && createForm.errors\"\n\t\t\t\t\t\t class=\"error\">\n\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t*ngIf=\"createForm.errors['confirm_mismatch'] && createForm.get('confirm').value.length > 0\">\n\t\t\t\t\t\t\t{{ 'CREATE_WALLET.FORM_ERRORS.CONFIRM_NOT_MATCH' | translate }}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<button *ngIf=\"createForm.get('path').valid\"\n\t\t\t\t\t\tclass=\"outline big w-100 mb-2\"\n\t\t\t\t\t\tdisabled\n\t\t\t\t\t\ttype=\"button\">\n\t\t\t\t\t<i class=\"icon check-circle mr-1\"></i>\n\t\t\t\t\t{{savedWalletName}}\n\t\t\t\t</button>\n\n\t\t\t\t<button (click)=\"selectWalletLocation()\"\n\t\t\t\t\t\t*ngIf=\"createForm.get('path').invalid\"\n\t\t\t\t\t\t[disabled]=\"createForm.get('name').invalid || createForm.get('password').invalid || createForm.hasError('confirm_mismatch')\"\n\t\t\t\t\t\tclass=\"outline big w-100 mb-2\"\n\t\t\t\t\t\ttype=\"button\">\n\t\t\t\t\t{{ 'CREATE_WALLET.BUTTON_SELECT' | translate }}\n\t\t\t\t</button>\n\n\t\t\t\t<button (click)=\"createWallet()\"\n\t\t\t\t\t\t[disabled]=\"createForm.invalid\"\n\t\t\t\t\t\tclass=\"primary big w-100\"\n\t\t\t\t\t\ttype=\"button\">\n\t\t\t\t\t{{ 'CREATE_WALLET.BUTTON_CREATE' | translate }}\n\t\t\t\t</button>\n\t\t\t</form>\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ "./src/app/create-wallet/create-wallet.component.scss":
/*!************************************************************!*\
  !*** ./src/app/create-wallet/create-wallet.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL2NyZWF0ZS13YWxsZXQvY3JlYXRlLXdhbGxldC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY3JlYXRlLXdhbGxldC9jcmVhdGUtd2FsbGV0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQ0NGIiwiZmlsZSI6InNyYy9hcHAvY3JlYXRlLXdhbGxldC9jcmVhdGUtd2FsbGV0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuIiwiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/create-wallet/create-wallet.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/create-wallet/create-wallet.component.ts ***!
  \**********************************************************/
/*! exports provided: CreateWalletComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateWalletComponent", function() { return CreateWalletComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_helpers/services/modal.service */ "./src/app/_helpers/services/modal.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _helpers_models_wallet_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_helpers/models/wallet.model */ "./src/app/_helpers/models/wallet.model.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _helpers_services_wallets_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../_helpers/services/wallets.service */ "./src/app/_helpers/services/wallets.service.ts");











var CreateWalletComponent = /** @class */ (function () {
    function CreateWalletComponent(fb, router, backend, variablesService, walletsService, modalService, ngZone, translate, location) {
        var _this = this;
        this.fb = fb;
        this.router = router;
        this.backend = backend;
        this.variablesService = variablesService;
        this.walletsService = walletsService;
        this.modalService = modalService;
        this.ngZone = ngZone;
        this.translate = translate;
        this.location = location;
        this.createForm = this.fb.group({
            name: this.fb.control('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                function (g) {
                    for (var i = 0; i < _this.variablesService.wallets.length; i++) {
                        if (g.value === _this.variablesService.wallets[i].name) {
                            return { duplicate: true };
                        }
                    }
                    return null;
                },
            ]),
            password: this.fb.control('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern(this.variablesService.pattern)),
            confirm: this.fb.control(''),
            path: this.fb.control('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
        }, function (g) {
            return g.get('password').value === g.get('confirm').value ? null : { confirm_mismatch: true };
        });
    }
    Object.defineProperty(CreateWalletComponent.prototype, "savedWalletName", {
        get: function () {
            var path = this.createForm.get('path').value;
            return path.substr(path.lastIndexOf('/') + 1, path.length - 1);
        },
        enumerable: true,
        configurable: true
    });
    CreateWalletComponent.prototype.createWallet = function () {
        var _this = this;
        var _a = this.createForm.value, selectedPath = _a.path, password = _a.password, name = _a.name;
        this.backend.generateWallet(selectedPath, password, function (generate_status, generate_data, errorCode) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var wallet_id_1, _a, path, address, balance, unlocked_balance, mined_total, tracking_hey, wallet_1, errorTranslationKey;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!generate_status) return [3 /*break*/, 2];
                        wallet_id_1 = generate_data.wallet_id;
                        _a = generate_data['wi'], path = _a.path, address = _a.address, balance = _a.balance, unlocked_balance = _a.unlocked_balance, mined_total = _a.mined_total, tracking_hey = _a.tracking_hey;
                        wallet_1 = new _helpers_models_wallet_model__WEBPACK_IMPORTED_MODULE_7__["Wallet"](wallet_id_1, name, password, path, address, balance, unlocked_balance, mined_total, tracking_hey);
                        wallet_1.alias = this.backend.getWalletAlias(address);
                        wallet_1.total_history_item = 0;
                        wallet_1.pages = new Array(1).fill(1);
                        wallet_1.totalPages = 1;
                        wallet_1.currentPage = 1;
                        return [4 /*yield*/, this.backend.runWallet(wallet_id_1, function (run_status, run_data) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                var _this = this;
                                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!run_status) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.ngZone.run(function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                this.walletsService.addWallet(wallet_1);
                                                                if (this.variablesService.appPass) {
                                                                    this.backend.storeSecureAppData();
                                                                }
                                                                this.variablesService.setCurrentWallet(wallet_id_1);
                                                                return [4 /*yield*/, this.router.navigate(['/seed-phrase'], { queryParams: { wallet_id: wallet_id_1 } })];
                                                            case 1:
                                                                _a.sent();
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            console.log(run_data['error_code']);
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        errorTranslationKey = errorCode === 'ALREADY_EXISTS' ? 'CREATE_WALLET.ERROR_CANNOT_SAVE_TOP' : 'CREATE_WALLET.ERROR_CANNOT_SAVE_SYSTEM';
                        this.modalService.prepareModal('error', errorTranslationKey);
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    CreateWalletComponent.prototype.selectWalletLocation = function () {
        var _this = this;
        var caption = this.translate.instant('CREATE_WALLET.TITLE_SAVE');
        var fileMask = '*';
        var default_path = this.variablesService.settings.default_path;
        this.backend.saveFileDialog(caption, fileMask, default_path, function (file_status, file_data) {
            if (file_status) {
                _this.ngZone.run(function () {
                    var path = file_data.path;
                    _this.createForm.get('path').patchValue(path);
                    _this.variablesService.settings.default_path = path.substr(0, path.lastIndexOf('/'));
                });
            }
        });
    };
    CreateWalletComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-create-wallet',
            template: __webpack_require__(/*! ./create-wallet.component.html */ "./src/app/create-wallet/create-wallet.component.html"),
            styles: [__webpack_require__(/*! ./create-wallet.component.scss */ "./src/app/create-wallet/create-wallet.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_3__["BackendService"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_4__["VariablesService"],
            _helpers_services_wallets_service__WEBPACK_IMPORTED_MODULE_10__["WalletsService"],
            _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_5__["ModalService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_9__["Location"]])
    ], CreateWalletComponent);
    return CreateWalletComponent;
}());



/***/ }),

/***/ "./src/app/deeplink-modal/deeplink-modal.component.html":
/*!**************************************************************!*\
  !*** ./src/app/deeplink-modal/deeplink-modal.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal p-2 border-radius-0_8-rem bg-light-blue max-h-100\"\n     fxFlex=\"0 1 54rem\"\n     fxLayout=\"column\">\n    <ng-container *ngIf=\"walletsToPay.length > 1 && !secondStep\">\n        <div class=\"content mb-2\"\n             fxFlex=\"0 0 auto\"\n             fxLayout=\"column\">\n            <div class=\"form__field\"\n                 fxFlex=\"0 0 auto\">\n                <label>Select wallet for action:</label>\n                <ng-select [items]=\"walletsToPay\"\n                           bindValue=\"wallet_id\"\n                           bindLabel=\"name\"\n                           [(ngModel)]=\"walletToPayId\"\n                           [clearable]=\"false\"\n                           [searchable]=\"false\">\n                    <ng-template ng-label-tmp\n                                 let-item=\"item\">\n                        {{item.name}}\n                    </ng-template>\n                    <ng-template ng-option-tmp\n                                 let-item=\"item\"\n                                 let-index=\"index\">\n                        {{item.name}}\n                    </ng-template>\n                </ng-select>\n            </div>\n        </div>\n\n        <div class=\"controls\"\n             fxLayoutGap=\"1rem\"\n             fxFlex=\"0 0 auto\"\n             fxLayout=\"row nowrap\"\n             fxLayoutAlign=\"space-between center\">\n            <button type=\"button\"\n                    class=\"outline big w-100\"\n                    (click)=\"canselAction()\">{{ 'EXPORT_HISTORY.CANCEL' | translate }}</button>\n            <button type=\"submit\"\n                    class=\"primary big w-100\"\n                    (click)=\"nextStep()\">Next...\n            </button>\n        </div>\n    </ng-container>\n\n    <ng-container *ngIf=\"secondStep && marketplaceModalShow && actionData.action === 'marketplace_offer_create'\">\n        <h4 class=\"mb-2\"\n            fxFlex=\"0 0 auto\">\n            Creating a marketplace offer\n        </h4>\n        <div class=\"content scrolled-content mb-2\"\n             fxFlex=\"1 1 auto\"\n             fxLayout=\"column\">\n            <div class=\"table-info\"\n                 fxFlex=\"0 0 auto\">\n                <div class=\"row\">\n                    <div class=\"label max-w-19-rem w-100\">{{ 'Offer title' | translate }}</div>\n                    <div class=\"text\">{{ actionData.title }}</div>\n                </div>\n\n                <hr class=\"separator\"/>\n\n                <div class=\"row\">\n                    <div class=\"label max-w-19-rem w-100\">{{ 'Description' | translate }}</div>\n                    <div class=\"text\">{{ actionData.description }}</div>\n                </div>\n\n                <hr class=\"separator\"/>\n\n                <div class=\"row\">\n                    <div class=\"label max-w-19-rem w-100\">{{ 'Category' | translate }}</div>\n                    <div class=\"text\">{{ actionData.category }}</div>\n                </div>\n\n                <hr class=\"separator\"/>\n\n                <div class=\"row\">\n                    <div class=\"label max-w-19-rem w-100\">{{ 'Price' | translate }}</div>\n                    <div class=\"text\">{{actionData.price}} {{this.variablesService.defaultCurrency}}</div>\n                </div>\n\n                <hr class=\"separator\"/>\n\n                <div class=\"row\">\n                    <div class=\"label max-w-19-rem w-100\">{{ 'Preview url' | translate }}</div>\n                    <div class=\"text\">{{actionData.url || actionData.img_url}}</div>\n                </div>\n\n                <hr class=\"separator\"/>\n\n                <div class=\"row\">\n                    <div class=\"label max-w-19-rem w-100\">{{ 'Contacts' | translate }}</div>\n                    <div class=\"text\">{{actionData.contact}}</div>\n                </div>\n\n                <hr class=\"separator\"/>\n\n                <div class=\"row\">\n                    <div class=\"label max-w-19-rem w-100\">{{ 'Comments' | translate }}</div>\n                    <div class=\"text\">{{actionData.comment || actionData.comments}}</div>\n                </div>\n\n                <hr class=\"separator\"/>\n\n                <div class=\"row\">\n                    <div class=\"label max-w-19-rem w-100\">{{ 'Mixins' | translate }}</div>\n                    <div class=\"text\">{{actionData.mixins || defaultMixin}}</div>\n                </div>\n\n                <hr class=\"separator\"/>\n\n                <div class=\"row\">\n                    <div class=\"label max-w-19-rem w-100\">{{ 'Transaction fee' | translate }}</div>\n                    <div class=\"text\">\n                        {{actionData.price * (actionData.fee || this.variablesService.default_fee)}}\n                        {{this.variablesService.defaultCurrency}}\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"controls\"\n             fxFlex=\"0 0 auto\"\n             fxLayout=\"row nowrap\"\n             fxLayoutAlign=\"space-between center\"\n             fxLayoutGap=\"1rem\">\n            <button type=\"button\"\n                    class=\"outline big w-100\"\n                    (click)=\"canselAction()\">{{ 'EXPORT_HISTORY.CANCEL' | translate }}</button>\n            <button type=\"submit\"\n                    class=\"primary big w-100\"\n                    (click)=\"marketplaceSend()\">Sign & Send...\n            </button>\n        </div>\n\n    </ng-container>\n\n    <ng-container *ngIf=\"marketplaceConfirmHash\">\n        <h4 class=\"mb-2\"\n            fxFlex=\"0 0 auto\">\n            Operation successful\n        </h4>\n\n        <div class=\"content scrolled-content mb-2\"\n             fxLayout=\"column\"\n             fxFlex=\"1 1 auto\">\n            <div class=\"table-info\"\n                 fxFlex=\"0 0 auto\">\n                <div class=\"row\">\n                    <div class=\"label max-w-19-rem w-100\">{{ 'Operation hash' | translate }}</div>\n                    <div class=\"text\"\n                         fxLayout=\"row\"\n                         fxLayoutAlign=\"start center\"\n                         (contextmenu)=\"variablesService.onContextMenuOnlyCopy($event, marketplaceConfirmHash)\">\n                        {{marketplaceConfirmHash}}\n                        <i class=\"icon ml-1\"\n                           [class.copy]=\"!copyAnimation\"\n                           [class.check]=\"copyAnimation\"\n                           (click)=\"copyHash()\"></i>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"controls\"\n             fxFlex=\"0 0 auto\"\n             fxLayout=\"row\"\n             fxLayoutAlign=\"space-between center\">\n            <button type=\"button\"\n                    class=\"primary big w-100\"\n                    (click)=\"canselAction()\">\n                Close\n            </button>\n        </div>\n    </ng-container>\n\n\t<ng-container *ngIf=\"!walletsToPay.length\">\n\t\t<h4 class=\"mb-2\"\n\t\t\tfxFlex=\"0 0 auto\">\n\t\t\tYour wallets have not loaded yet. Try this action a little later.\n\t\t</h4>\n\n\t\t<div class=\"controls\"\n\t\t\t fxFlex=\"0 0 auto\"\n\t\t\t fxLayout=\"row\"\n\t\t\t fxLayoutAlign=\"space-between center\">\n\t\t\t<button type=\"button\"\n\t\t\t\t\tclass=\"primary big w-100\"\n\t\t\t\t\t(click)=\"canselAction()\">\n\t\t\t\tOk\n\t\t\t</button>\n\t\t</div>\n\t</ng-container>\n</div>\n"

/***/ }),

/***/ "./src/app/deeplink-modal/deeplink-modal.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/deeplink-modal/deeplink-modal.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RlZXBsaW5rLW1vZGFsL2RlZXBsaW5rLW1vZGFsLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/deeplink-modal/deeplink-modal.component.ts":
/*!************************************************************!*\
  !*** ./src/app/deeplink-modal/deeplink-modal.component.ts ***!
  \************************************************************/
/*! exports provided: DeeplinkModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeeplinkModalComponent", function() { return DeeplinkModalComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bignumber.js */ "./node_modules/bignumber.js/bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_shared/constants */ "./src/app/_shared/constants.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");









var DeeplinkModalComponent = /** @class */ (function () {
    function DeeplinkModalComponent(_router, variablesService, backend, ngZone, renderer) {
        this._router = _router;
        this.variablesService = variablesService;
        this.backend = backend;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.modalOverlay = true;
        this.secondStep = false;
        this.walletToPayId = 0;
        this.marketplaceModalShow = true;
        this.copyAnimation = false;
        this.marketplaceConfirmHash = null;
        this.actionData = {};
        this.defaultMixin = _shared_constants__WEBPACK_IMPORTED_MODULE_4__["MIXIN"];
        this.walletsToPay = [];
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_5__["Subject"]();
        this.walletsToPay = this.variablesService.wallets.filter(function (wallet) { return !wallet.is_watch_only || !wallet.is_auditable; });
    }
    DeeplinkModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.renderer.addClass(document.body, 'no-scroll');
        this.variablesService.deeplink$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this.destroy$))
            .subscribe(function (deeplink) {
            _this.actionData = {};
            if (deeplink) {
                if (!_this.walletsToPay.length) {
                    _this.canselAction();
                    return;
                }
                _this.actionData = _this.parseDeeplink(deeplink);
                if (_this.walletsToPay.length === 1) {
                    _this.walletToPayId = _this.walletsToPay[0].wallet_id;
                    var _a = _this.variablesService, daemon_state_1 = _a.daemon_state, sync_started_1 = _a.sync_started;
                    if (daemon_state_1 === 2 && sync_started_1 === false) {
                        _this.nextStep();
                    }
                    else {
                        _this.nextStepInterval = setInterval(function () {
                            if (daemon_state_1 === 2 && sync_started_1 === false) {
                                _this.nextStep();
                                clearInterval(_this.nextStepInterval);
                            }
                        }, 1500);
                    }
                }
            }
        });
    };
    DeeplinkModalComponent.prototype.parseDeeplink = function (deeplink) {
        var quotesRex = new RegExp(/'|"|”|%E2%80%9D|%22/g);
        var spaceSymbolRex = new RegExp(/%20/g);
        var newObj = {};
        var newString = deeplink.substr(5); // delete infinium:;
        newString.split('&').forEach(function (str) {
            var _a = str.split('='), key = _a[0], value = _a[1];
            newObj[key] = value.replace(quotesRex, '').replace(spaceSymbolRex, ' ').trim();
        });
        return newObj;
    };
    DeeplinkModalComponent.prototype.canselAction = function () {
        this.variablesService.deeplink$.next(null);
        this.variablesService.sendActionData$.next({});
        this.actionData = {};
        this.secondStep = false;
    };
    DeeplinkModalComponent.prototype.marketplaceSend = function () {
        var _this = this;
        var offerObject = {
            wallet_id: this.walletToPayId,
            od: {
                ap: this.actionData.price || '',
                at: '1',
                cat: this.actionData.category || '',
                cnt: this.actionData.contact || '',
                com: this.actionData.comment || this.actionData.comments || '',
                do: this.actionData.description || '',
                et: 10,
                fee: new bignumber_js__WEBPACK_IMPORTED_MODULE_3__["BigNumber"]('' + ((+this.actionData.fee || +this.variablesService.default_fee) * 1000000000000)),
                lci: '',
                lco: 'World Wide',
                ot: 1,
                pt: 'Credit cards, BTC, INF, ETH',
                t: this.actionData.title || '',
                url: this.actionData.url || this.actionData.img_url || '',
            },
        };
        this.backend.push_offer(offerObject, function (status, data) {
            _this.ngZone.run(function () {
                if (data.success) {
                    _this.marketplaceModalShow = false;
                    _this.marketplaceConfirmHash = data.tx_hash;
                }
                else {
                    _this.canselAction();
                }
            });
        });
    };
    DeeplinkModalComponent.prototype.copyHash = function () {
        var _this = this;
        this.backend.setClipboard(this.marketplaceConfirmHash);
        this.copyAnimation = true;
        setTimeout(function () { return _this.copyAnimation = false; }, 2000);
    };
    DeeplinkModalComponent.prototype.nextStep = function () {
        if (this.actionData.action === 'send') {
            this.variablesService.sendActionData$.next(this.actionData);
            this.variablesService.deeplink$.next(null);
            this.variablesService.setCurrentWallet(this.walletToPayId);
            this._router.navigate(['/wallet/send']).then();
            this.secondStep = false;
        }
        else if (this.actionData.action === 'escrow') {
            this.variablesService.sendActionData$.next(this.actionData);
            this.variablesService.deeplink$.next(null);
            this.variablesService.setCurrentWallet(this.walletToPayId);
            this._router.navigate(['/wallet/contracts/purchase']).then();
            this.secondStep = false;
        }
        else {
            this.secondStep = true;
        }
    };
    DeeplinkModalComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next();
        this.variablesService.deeplink$.next(null);
        this.renderer.removeClass(document.body, 'no-scroll');
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.modal-overlay'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], DeeplinkModalComponent.prototype, "modalOverlay", void 0);
    DeeplinkModalComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-deeplink-modal',
            template: __webpack_require__(/*! ./deeplink-modal.component.html */ "./src/app/deeplink-modal/deeplink-modal.component.html"),
            styles: [__webpack_require__(/*! ./deeplink-modal.component.scss */ "./src/app/deeplink-modal/deeplink-modal.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_2__["VariablesService"],
            _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_7__["BackendService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]])
    ], DeeplinkModalComponent);
    return DeeplinkModalComponent;
}());



/***/ }),

/***/ "./src/app/deeplink-modal/deeplink-modal.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/deeplink-modal/deeplink-modal.module.ts ***!
  \*********************************************************/
/*! exports provided: DeeplinkModalModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeeplinkModalModule", function() { return DeeplinkModalModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _deeplink_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./deeplink-modal.component */ "./src/app/deeplink-modal/deeplink-modal.component.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/fesm5/ng-select.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");








var DeeplinkModalModule = /** @class */ (function () {
    function DeeplinkModalModule() {
    }
    DeeplinkModalModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_deeplink_modal_component__WEBPACK_IMPORTED_MODULE_3__["DeeplinkModalComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_7__["FlexLayoutModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateModule"]
            ],
            exports: [_deeplink_modal_component__WEBPACK_IMPORTED_MODULE_3__["DeeplinkModalComponent"]],
            entryComponents: [_deeplink_modal_component__WEBPACK_IMPORTED_MODULE_3__["DeeplinkModalComponent"]]
        })
    ], DeeplinkModalModule);
    return DeeplinkModalModule;
}());



/***/ }),

/***/ "./src/app/deeplink/deeplink.component.html":
/*!**************************************************!*\
  !*** ./src/app/deeplink/deeplink.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"deeplink$ | async\">\n\t<app-deeplink-modal *ngIf=\"(variablesService?.daemon_state === 2 || !variablesService?.sync_started)\"></app-deeplink-modal>\n\n\t<app-sync-modal *ngIf=\"(variablesService?.daemon_state !== 2 || variablesService?.sync_started)\">\n\t</app-sync-modal>\n</ng-container>\n"

/***/ }),

/***/ "./src/app/deeplink/deeplink.component.scss":
/*!**************************************************!*\
  !*** ./src/app/deeplink/deeplink.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RlZXBsaW5rL2RlZXBsaW5rLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/deeplink/deeplink.component.ts":
/*!************************************************!*\
  !*** ./src/app/deeplink/deeplink.component.ts ***!
  \************************************************/
/*! exports provided: DeeplinkComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeeplinkComponent", function() { return DeeplinkComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");





var DeeplinkComponent = /** @class */ (function () {
    function DeeplinkComponent(variablesService) {
        this.variablesService = variablesService;
        this.deeplink$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    DeeplinkComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.variablesService.deeplink$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["delay"])(200), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeUntil"])(this.destroy$))
            .subscribe(function (data) {
            _this.deeplink$.next(data);
        });
    };
    DeeplinkComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next();
    };
    DeeplinkComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-deeplink',
            template: __webpack_require__(/*! ./deeplink.component.html */ "./src/app/deeplink/deeplink.component.html"),
            styles: [__webpack_require__(/*! ./deeplink.component.scss */ "./src/app/deeplink/deeplink.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_4__["VariablesService"]])
    ], DeeplinkComponent);
    return DeeplinkComponent;
}());



/***/ }),

/***/ "./src/app/deeplink/deeplink.module.ts":
/*!*********************************************!*\
  !*** ./src/app/deeplink/deeplink.module.ts ***!
  \*********************************************/
/*! exports provided: DeeplinkModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeeplinkModule", function() { return DeeplinkModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _deeplink_modal_deeplink_modal_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../deeplink-modal/deeplink-modal.module */ "./src/app/deeplink-modal/deeplink-modal.module.ts");
/* harmony import */ var _helpers_modals_sync_modal_sync_modal_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_helpers/modals/sync-modal/sync-modal.module */ "./src/app/_helpers/modals/sync-modal/sync-modal.module.ts");
/* harmony import */ var _deeplink_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./deeplink.component */ "./src/app/deeplink/deeplink.component.ts");






var DeeplinkModule = /** @class */ (function () {
    function DeeplinkModule() {
    }
    DeeplinkModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_deeplink_component__WEBPACK_IMPORTED_MODULE_5__["DeeplinkComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _deeplink_modal_deeplink_modal_module__WEBPACK_IMPORTED_MODULE_3__["DeeplinkModalModule"],
                _helpers_modals_sync_modal_sync_modal_module__WEBPACK_IMPORTED_MODULE_4__["SyncModalModule"]
            ],
            exports: [_deeplink_component__WEBPACK_IMPORTED_MODULE_5__["DeeplinkComponent"], _deeplink_modal_deeplink_modal_module__WEBPACK_IMPORTED_MODULE_3__["DeeplinkModalModule"], _helpers_modals_sync_modal_sync_modal_module__WEBPACK_IMPORTED_MODULE_4__["SyncModalModule"]],
            entryComponents: [_deeplink_component__WEBPACK_IMPORTED_MODULE_5__["DeeplinkComponent"]]
        })
    ], DeeplinkModule);
    return DeeplinkModule;
}());



/***/ }),

/***/ "./src/app/edit-alias/edit-alias.component.html":
/*!******************************************************!*\
  !*** ./src/app/edit-alias/edit-alias.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"page-container\">\n\n    <div class=\"toolbar mb-2\">\n        <div class=\"left\">\n            <button type=\"button\"\n                    class=\"btn-icon circle big mr-2\"\n                    (click)=\"back()\">\n                <i class=\"icon dropdown-arrow-left\"></i>\n            </button>\n            <h1>{{ 'BREADCRUMBS.EDIT_ALIAS' | translate }}</h1>\n        </div>\n        <div class=\"right\"></div>\n    </div>\n\n    <div class=\"page-content\">\n        <div class=\"breadcrumbs mb-2\">\n            <div class=\"breadcrumb\">\n                <a [routerLink]=\"['/wallet/history']\">{{ wallet.name }}</a>\n            </div>\n            <div class=\"breadcrumb\">\n                <span>{{ 'BREADCRUMBS.EDIT_ALIAS' | translate }}</span>\n            </div>\n        </div>\n\n        <div class=\"scrolled-content\">\n            <form class=\"form\">\n\n                <div class=\"form__field\">\n                    <label for=\"alias-name\">\n                        {{ 'EDIT_ALIAS.NAME.LABEL' | translate }}\n                    </label>\n                    <input class=\"form__field--input\"\n                           type=\"text\"\n                           id=\"alias-name\"\n                           [value]=\"alias.name\"\n                           placeholder=\"{{ 'EDIT_ALIAS.NAME.PLACEHOLDER' | translate }}\"\n                           readonly>\n                </div>\n\n                <div class=\"form__field textarea\">\n                    <label for=\"alias-comment\">\n                        {{ 'EDIT_ALIAS.COMMENT.LABEL' | translate }}\n                    </label>\n                    <textarea id=\"alias-comment\"\n                              [(ngModel)]=\"alias.comment\"\n                              [ngModelOptions]=\"{standalone: true}\"\n                              [maxlength]=\"variablesService.maxCommentLength\"\n                              (contextmenu)=\"variablesService.onContextMenu($event)\"\n                              placeholder=\"{{ 'EDIT_ALIAS.COMMENT.PLACEHOLDER' | translate }}\">\n            </textarea>\n                    <div class=\"error\"\n                         *ngIf=\"alias.comment.length > 0 && notEnoughMoney\">\n                        {{ 'EDIT_ALIAS.FORM_ERRORS.NO_MONEY' | translate }}\n                    </div>\n                    <div class=\"error\"\n                         *ngIf=\"alias.comment.length >= variablesService.maxCommentLength\">\n                        {{ 'EDIT_ALIAS.FORM_ERRORS.MAX_LENGTH' | translate }}\n                    </div>\n                </div>\n\n                <div class=\"alias-cost mb-2\">{{ \"EDIT_ALIAS.COST\" | translate : {\n                    value: variablesService.default_fee, currency:\n                    variablesService.defaultCurrency\n                } }}</div>\n\n                <button type=\"button\"\n                        class=\"primary big w-100\"\n                        (click)=\"updateAlias()\"\n                        [disabled]=\"notEnoughMoney || (oldAliasComment === alias.comment) || alias.comment.length > variablesService.maxCommentLength\">{{\n                    'EDIT_ALIAS.BUTTON_EDIT' | translate }}</button>\n            </form>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/edit-alias/edit-alias.component.scss":
/*!******************************************************!*\
  !*** ./src/app/edit-alias/edit-alias.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL2VkaXQtYWxpYXMvZWRpdC1hbGlhcy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvZWRpdC1hbGlhcy9lZGl0LWFsaWFzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQ0NGIiwiZmlsZSI6InNyYy9hcHAvZWRpdC1hbGlhcy9lZGl0LWFsaWFzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuIiwiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/edit-alias/edit-alias.component.ts":
/*!****************************************************!*\
  !*** ./src/app/edit-alias/edit-alias.component.ts ***!
  \****************************************************/
/*! exports provided: EditAliasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditAliasComponent", function() { return EditAliasComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_helpers/services/modal.service */ "./src/app/_helpers/services/modal.service.ts");







var EditAliasComponent = /** @class */ (function () {
    function EditAliasComponent(location, router, backend, variablesService, modalService, ngZone) {
        this.location = location;
        this.router = router;
        this.backend = backend;
        this.variablesService = variablesService;
        this.modalService = modalService;
        this.ngZone = ngZone;
        this.requestProcessing = false;
    }
    EditAliasComponent.prototype.ngOnInit = function () {
        this.wallet = this.variablesService.currentWallet;
        var alias = this.backend.getWalletAlias(this.wallet.address);
        this.alias = {
            name: alias.name,
            address: alias.address,
            comment: alias.comment
        };
        this.oldAliasComment = alias.comment;
        this.notEnoughMoney = this.wallet.unlocked_balance.isLessThan(this.variablesService.default_fee_big);
    };
    EditAliasComponent.prototype.updateAlias = function () {
        var _this = this;
        if (this.requestProcessing || this.notEnoughMoney || this.oldAliasComment === this.alias.comment || this.alias.comment.length > this.variablesService.maxCommentLength) {
            return;
        }
        this.requestProcessing = true;
        this.backend.updateAlias(this.wallet.wallet_id, this.alias, this.variablesService.default_fee, function (status) {
            if (status) {
                _this.modalService.prepareModal('success', '');
                _this.wallet.alias['comment'] = _this.alias.comment;
                _this.ngZone.run(function () {
                    _this.router.navigate(['/wallet/']);
                });
            }
            _this.requestProcessing = false;
        });
    };
    EditAliasComponent.prototype.back = function () {
        this.location.back();
    };
    EditAliasComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-edit-alias',
            template: __webpack_require__(/*! ./edit-alias.component.html */ "./src/app/edit-alias/edit-alias.component.html"),
            styles: [__webpack_require__(/*! ./edit-alias.component.scss */ "./src/app/edit-alias/edit-alias.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__["BackendService"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_5__["VariablesService"],
            _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_6__["ModalService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], EditAliasComponent);
    return EditAliasComponent;
}());



/***/ }),

/***/ "./src/app/export-import/export-import.component.html":
/*!************************************************************!*\
  !*** ./src/app/export-import/export-import.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"page-container\">\n\n    <div class=\"toolbar mb-2\">\n        <div class=\"left\">\n            <button type=\"button\"\n                    class=\"btn-icon circle big mr-2\"\n                    (click)=\"back()\">\n                <i class=\"icon dropdown-arrow-left\"></i>\n            </button>\n            <h1>{{ 'CONTACTS.IMPORT_EXPORT' | translate }}</h1>\n        </div>\n        <div class=\"right\"></div>\n    </div>\n\n    <div class=\"page-content\">\n        <div class=\"scrolled-content\">\n            <div class=\"controls flex\">\n                <button class=\"primary big max-w-19-rem w-100 mr-1\"\n                        type=\"button\"\n                        (click)=\"import()\">\n                    {{ 'CONTACTS.IMPORT' | translate }}\n                </button>\n                <button class=\"primary big max-w-19-rem w-100\"\n                        type=\"button\"\n                        (click)=\"export()\">\n                    {{ 'CONTACTS.EXPORT' | translate }}\n                </button>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/export-import/export-import.component.scss":
/*!************************************************************!*\
  !*** ./src/app/export-import/export-import.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n}\n\n.head {\n  justify-content: flex-end;\n}\n\n.contacts-title {\n  font-size: 1.7rem;\n  margin-bottom: 1rem;\n}\n\n.btn-wrapper {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin: 0 -0.5rem;\n  padding: 1.5rem 0;\n}\n\n.btn-wrapper button {\n  flex: 1 0 auto;\n  margin: 0 0.5rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL2V4cG9ydC1pbXBvcnQvZXhwb3J0LWltcG9ydC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvZXhwb3J0LWltcG9ydC9leHBvcnQtaW1wb3J0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtBQ0NGOztBREVBO0VBQ0UseUJBQUE7QUNDRjs7QURFQTtFQUNFLGlCQUFBO0VBQ0EsbUJBQUE7QUNDRjs7QURFQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDhCQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtBQ0NGOztBRENFO0VBQ0UsY0FBQTtFQUNBLGdCQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9leHBvcnQtaW1wb3J0L2V4cG9ydC1pbXBvcnQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uaGVhZCB7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG59XG5cbi5jb250YWN0cy10aXRsZSB7XG4gIGZvbnQtc2l6ZTogMS43cmVtO1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xufVxuXG4uYnRuLXdyYXBwZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIG1hcmdpbjogMCAtMC41cmVtO1xuICBwYWRkaW5nOiAxLjVyZW0gMDtcblxuICBidXR0b24ge1xuICAgIGZsZXg6IDEgMCBhdXRvO1xuICAgIG1hcmdpbjogMCAwLjVyZW07XG4gIH1cbn0iLCI6aG9zdCB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uaGVhZCB7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG59XG5cbi5jb250YWN0cy10aXRsZSB7XG4gIGZvbnQtc2l6ZTogMS43cmVtO1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xufVxuXG4uYnRuLXdyYXBwZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIG1hcmdpbjogMCAtMC41cmVtO1xuICBwYWRkaW5nOiAxLjVyZW0gMDtcbn1cbi5idG4td3JhcHBlciBidXR0b24ge1xuICBmbGV4OiAxIDAgYXV0bztcbiAgbWFyZ2luOiAwIDAuNXJlbTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/export-import/export-import.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/export-import/export-import.component.ts ***!
  \**********************************************************/
/*! exports provided: ExportImportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExportImportComponent", function() { return ExportImportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_helpers/services/modal.service */ "./src/app/_helpers/services/modal.service.ts");
/* harmony import */ var ngx_papaparse__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-papaparse */ "./node_modules/ngx-papaparse/fesm5/ngx-papaparse.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");









var ExportImportComponent = /** @class */ (function () {
    function ExportImportComponent(location, variablesService, backend, modalService, papa, translate, router, ngZone) {
        this.location = location;
        this.variablesService = variablesService;
        this.backend = backend;
        this.modalService = modalService;
        this.papa = papa;
        this.translate = translate;
        this.router = router;
        this.ngZone = ngZone;
    }
    ExportImportComponent.prototype.ngOnInit = function () {
    };
    ExportImportComponent.prototype.import = function () {
        var _this = this;
        this.backend.openFileDialog('', '*', this.variablesService.settings.default_path, function (file_status, file_data) {
            if (file_status) {
                _this.variablesService.settings.default_path = file_data.path.substr(0, file_data.path.lastIndexOf('/'));
                if (_this.isValid(file_data.path)) {
                    _this.backend.loadFile(file_data.path, function (status, data) {
                        if (!status) {
                            _this.modalService.prepareModal('error', 'CONTACTS.ERROR_IMPORT_EMPTY');
                        }
                        else {
                            var options = {
                                header: true
                            };
                            var elements = _this.papa.parse(data, options);
                            var isArray = Array.isArray(elements.data);
                            if (isArray && elements.data.length !== 0 && !elements.errors.length) {
                                if (!_this.variablesService.contacts.length) {
                                    elements.data.forEach(function (element) {
                                        _this.variablesService.contacts.push(element);
                                    });
                                }
                                else {
                                    elements.data.forEach(function (element) {
                                        var indexName = _this.variablesService.contacts.findIndex(function (contact) { return contact.name === element.name; });
                                        var indexAddress = _this.variablesService.contacts.findIndex(function (contact) { return contact.address === element.address; });
                                        if (indexAddress === -1 && indexName === -1) {
                                            _this.variablesService.contacts.push(element);
                                        }
                                        if (indexName !== -1 && indexAddress === -1) {
                                            _this.variablesService.contacts.push({
                                                name: element.name + " " + _this.translate.instant('CONTACTS.COPY'),
                                                address: element.address,
                                                notes: element.notes
                                            });
                                        }
                                    });
                                }
                                _this.backend.getContactAlias();
                                _this.ngZone.run(function () {
                                    _this.router.navigate(['/contacts']);
                                });
                            }
                            if (elements.errors.length) {
                                _this.modalService.prepareModal('error', 'CONTACTS.ERROR_IMPORT');
                                console.log(elements.errors);
                            }
                        }
                    });
                }
                else {
                    _this.modalService.prepareModal('error', 'CONTACTS.ERROR_TYPE_FILE');
                }
            }
        });
    };
    ExportImportComponent.prototype.export = function () {
        var _this = this;
        var contacts = [];
        this.variablesService.contacts.forEach(function (contact) {
            delete contact.alias;
            contacts.push(contact);
        });
        this.backend.saveFileDialog('', '*', this.variablesService.settings.default_path, function (file_status, file_data) {
            if (!_this.variablesService.contacts.length && !(file_data.error_code === 'CANCELED')) {
                _this.modalService.prepareModal('error', 'CONTACTS.ERROR_EMPTY_LIST');
            }
            var path = _this.isValid(file_data.path) ? file_data.path : file_data.path + ".csv";
            if (file_status && _this.isValid(path) && _this.variablesService.contacts.length) {
                _this.backend.storeFile(path, _this.papa.unparse(contacts));
            }
            if (!(file_data.error_code === 'CANCELED') && !_this.isValid(path)) {
                _this.modalService.prepareModal('error', 'CONTACTS.ERROR_EXPORT');
            }
        });
    };
    ExportImportComponent.prototype.isValid = function (file) {
        return file.endsWith('.csv');
    };
    ExportImportComponent.prototype.back = function () {
        this.location.back();
    };
    ExportImportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-export-import',
            template: __webpack_require__(/*! ./export-import.component.html */ "./src/app/export-import/export-import.component.html"),
            styles: [__webpack_require__(/*! ./export-import.component.scss */ "./src/app/export-import/export-import.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_4__["VariablesService"],
            _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_3__["BackendService"],
            _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_5__["ModalService"],
            ngx_papaparse__WEBPACK_IMPORTED_MODULE_6__["Papa"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], ExportImportComponent);
    return ExportImportComponent;
}());



/***/ }),

/***/ "./src/app/history/history.component.html":
/*!************************************************!*\
  !*** ./src/app/history/history.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"history-wrap\"\r\n\t fxLayout=\"column\"\r\n\t fxFlexFill>\r\n\t<div class=\"wrap-table scrolled-content mb-2\"\r\n\t\t fxFlex=\"1 1 auto\">\r\n\t\t<table class=\"history-table\">\r\n\t\t\t<thead>\r\n\t\t\t<tr #head\r\n\t\t\t\t(window:resize)=\"calculateWidth()\">\r\n\t\t\t\t<th>\r\n\t\t\t\t\t<div class=\"bg title\">{{ 'HISTORY.STATUS' | translate }}</div>\r\n\t\t\t\t</th>\r\n\t\t\t\t<th>\r\n\t\t\t\t\t<div class=\"bg title\">{{ 'HISTORY.AMOUNT' | translate }}</div>\r\n\t\t\t\t</th>\r\n\t\t\t\t<th>\r\n\t\t\t\t\t<div class=\"bg title\">{{ 'HISTORY.FEE' | translate }}</div>\r\n\t\t\t\t</th>\r\n\t\t\t\t<th>\r\n\t\t\t\t\t<div class=\"bg title\">{{ 'HISTORY.ADDRESS' | translate }}</div>\r\n\t\t\t\t</th>\r\n\t\t\t\t<th>\r\n\t\t\t\t\t<div class=\"bg title\">{{ 'HISTORY.DATE' | translate }}</div>\r\n\t\t\t\t</th>\r\n\t\t\t</tr>\r\n\t\t\t<div class=\"row-divider\"></div>\r\n\t\t\t</thead>\r\n\t\t\t<tbody>\r\n\t\t\t<ng-container *ngFor=\"let item of variablesService.currentWallet.history\">\r\n\t\t\t\t<tr (click)=\"openDetails(item.tx_hash)\"\r\n\t\t\t\t\t[class.locked-transaction]=\"!item.is_mining && item.unlock_time > 0\">\r\n\t\t\t\t\t<td>\r\n\t\t\t\t\t\t<div class=\"status text-ellipsis\"\r\n\t\t\t\t\t\t\t fxLayout=\"row\"\r\n\t\t\t\t\t\t\t fxLayoutAlign=\" center\"\r\n\t\t\t\t\t\t\t [ngClass]=\"item.is_income ? 'received' : 'send'\">\r\n\t\t\t\t\t\t\t<ng-container *ngIf=\"getHeight(item) < 10\">\r\n\t\t\t\t\t\t\t\t<svg class=\"confirmation mr-1\"\r\n\t\t\t\t\t\t\t\t\t style=\"transform: rotateZ(-90deg)\"\r\n\t\t\t\t\t\t\t\t\t tooltip=\"{{ 'HISTORY.STATUS_TOOLTIP' | translate : {'current': getHeight(item), 'total': 10} }}\"\r\n\t\t\t\t\t\t\t\t\t placement=\"bottom-left\"\r\n\t\t\t\t\t\t\t\t\t tooltipClass=\"table-tooltip\"\r\n\t\t\t\t\t\t\t\t\t [delay]=\"500\">\r\n\t\t\t\t\t\t\t\t\t<circle stroke-dasharray=\"100\"\r\n\t\t\t\t\t\t\t\t\t\t\tfill=\"transparent\"\r\n\t\t\t\t\t\t\t\t\t\t\tstroke-dashoffset=\"0\"\r\n\t\t\t\t\t\t\t\t\t\t\tcx=\"50%\"\r\n\t\t\t\t\t\t\t\t\t\t\tcy=\"50%\"\r\n\t\t\t\t\t\t\t\t\t\t\tstroke=\"rgba(31, 143, 235, 0.33)\"\r\n\t\t\t\t\t\t\t\t\t\t\tr=\"0.7rem\"\r\n\t\t\t\t\t\t\t\t\t\t\tstroke-width=\"0.3rem\">\r\n\t\t\t\t\t\t\t\t\t</circle>\r\n\t\t\t\t\t\t\t\t\t<circle class=\"progress-circle\"\r\n\t\t\t\t\t\t\t\t\t\t\tcx=\"50%\"\r\n\t\t\t\t\t\t\t\t\t\t\tcy=\"50%\"\r\n\t\t\t\t\t\t\t\t\t\t\t[style.stroke]=\"item.is_income ? '#16d1d6' : '#1f8feb'\"\r\n\t\t\t\t\t\t\t\t\t\t\tr=\"0.7rem\"\r\n\t\t\t\t\t\t\t\t\t\t\tfill=\"transparent\"\r\n\t\t\t\t\t\t\t\t\t\t\tstroke-width=\"0.3rem\"\r\n\t\t\t\t\t\t\t\t\t\t\tstroke-dasharray=\"4.5rem\"\r\n\t\t\t\t\t\t\t\t\t\t\tstroke-dashoffset=\"4.5rem\"\r\n\t\t\t\t\t\t\t\t\t\t\tstroke-linecap=\"round\"\r\n\t\t\t\t\t\t\t\t\t\t\t[style.stroke-dashoffset]=\"strokeSize(item)\"></circle>\r\n\t\t\t\t\t\t\t\t</svg>\r\n\t\t\t\t\t\t\t</ng-container>\r\n\t\t\t\t\t\t\t<ng-container *ngIf=\"getHeight(item) === 10\">\r\n\t\t\t\t\t\t\t\t<img *ngIf=\"!item.is_income\"\r\n\t\t\t\t\t\t\t\t\t class=\"status-transaction mr-1\"\r\n\t\t\t\t\t\t\t\t\t src=\"assets/icons/blue/send.svg\"\r\n\t\t\t\t\t\t\t\t\t alt=\"\">\r\n\t\t\t\t\t\t\t\t<img *ngIf=\"item.is_income\"\r\n\t\t\t\t\t\t\t\t\t class=\"status-transaction mr-1\"\r\n\t\t\t\t\t\t\t\t\t src=\"assets/icons/aqua/receive.svg\"\r\n\t\t\t\t\t\t\t\t\t alt=\"\">\r\n\t\t\t\t\t\t\t</ng-container>\r\n\t\t\t\t\t\t\t<span\r\n\t\t\t\t\t\t\t\tclass=\"status-transaction-text\">{{ (item.is_income ? 'HISTORY.RECEIVED' : 'HISTORY.SEND') | translate }}</span>\r\n\t\t\t\t\t\t\t<ng-container *ngIf=\"item.unlock_time !== 0 && item.tx_type !== 6\">\r\n\t\t\t\t\t\t\t\t<ng-container *ngIf=\"isLocked(item); else unlock\">\r\n\t\t\t\t\t\t\t\t\t<ng-container *ngIf=\"item.unlock_time < 500000000\">\r\n\t\t\t\t\t\t\t\t\t\t<i class=\"icon lock-transaction mr-1\"\r\n\t\t\t\t\t\t\t\t\t\t   tooltip=\"{{ 'HISTORY.LOCK_TOOLTIP' | translate : {'date': time(item) | date : 'MM.dd.yy'} }}\"\r\n\t\t\t\t\t\t\t\t\t\t   placement=\"bottom-left\"\r\n\t\t\t\t\t\t\t\t\t\t   tooltipClass=\"table-tooltip\"\r\n\t\t\t\t\t\t\t\t\t\t   [delay]=\"500\"\r\n\t\t\t\t\t\t\t\t\t\t   [class.position]=\"variablesService.height_app - item.height < 10 || item.height === 0 && item.timestamp > 0\"></i>\r\n\t\t\t\t\t\t\t\t\t</ng-container>\r\n\t\t\t\t\t\t\t\t\t<ng-container *ngIf=\"item.unlock_time > 500000000\">\r\n\t\t\t\t\t\t\t\t\t\t<i class=\"icon lock-transaction mr-1\"\r\n\t\t\t\t\t\t\t\t\t\t   tooltip=\"{{ 'HISTORY.LOCK_TOOLTIP' | translate : {'date': item.unlock_time * 1000 | date : 'MM.dd.yy'} }}\"\r\n\t\t\t\t\t\t\t\t\t\t   placement=\"bottom-left\"\r\n\t\t\t\t\t\t\t\t\t\t   tooltipClass=\"table-tooltip\"\r\n\t\t\t\t\t\t\t\t\t\t   [delay]=\"500\"\r\n\t\t\t\t\t\t\t\t\t\t   [class.position]=\"variablesService.height_app - item.height < 10 || item.height === 0 && item.timestamp > 0\"></i>\r\n\t\t\t\t\t\t\t\t\t</ng-container>\r\n\t\t\t\t\t\t\t\t</ng-container>\r\n\t\t\t\t\t\t\t\t<ng-template #unlock>\r\n\t\t\t\t\t\t\t\t\t<i class=\"icon unlock-transaction mr-1\"\r\n\t\t\t\t\t\t\t\t\t   [class.position]=\"variablesService.height_app - item.height < 10 || item.height === 0 && item.timestamp > 0\"></i>\r\n\t\t\t\t\t\t\t\t</ng-template>\r\n\t\t\t\t\t\t\t</ng-container>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t\t<td>\r\n\t\t\t\t\t\t<div class=\"text-ellipsis\" *ngIf=\"item.sortAmount && item.sortAmount.toString() !== '0'\">\r\n\t\t\t\t\t\t\t{{ item.sortAmount | intToMoney }}\r\n\t\t\t\t\t\t\t{{variablesService.defaultCurrency}}\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t\t<td>\r\n\t\t\t\t\t\t<div class=\"text-ellipsis\">\r\n                            <span *ngIf=\"item.sortFee && item.sortFee.toString() !== '0'\">\r\n                                {{item.sortFee | intToMoney}}\r\n\t\t\t\t\t\t\t\t{{variablesService.defaultCurrency}}\r\n                            </span>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t\t<td class=\"remote-address\">\r\n\t\t\t\t\t\t<ng-container class=\"text-ellipsis\" *ngIf=\"!(item.tx_type === 0); else walletOrAliases\">\r\n\t\t\t\t\t\t\t<span\r\n\t\t\t\t\t\t\t\t*ngIf=\"!(item.tx_type === 0 && item.remote_addresses && item.remote_addresses[0])\">\r\n\t\t\t\t\t\t\t\t{{item | historyTypeMessages}}\r\n\t\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t</ng-container>\r\n\t\t\t\t\t\t<ng-template #walletOrAliases>\r\n\t\t\t\t\t\t\t<div class=\"text-ellipsis\"\r\n\t\t\t\t\t\t\t\t *ngIf=\"item.tx_type === 0 && item.remote_addresses && item.remote_addresses[0] && !(item.remote_aliases && item.remote_aliases[0] && item.remote_aliases[0].trim().length)\">\r\n\t\t\t\t\t\t\t\t<span\r\n\t\t\t\t\t\t\t\t\t(contextmenu)=\"variablesService.onContextMenuOnlyCopy($event, item.remote_addresses[0])\">\r\n                                \t{{ item.remote_addresses[0] | slice:0:6 }}\r\n\t\t\t\t\t\t\t\t\t...{{ item.remote_addresses[0] | slice:-6 }}\r\n                            \t</span>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<ng-container\r\n\t\t\t\t\t\t\t\t*ngIf=\"item.remote_aliases && item.remote_aliases[0] && item.remote_aliases[0].trim().length\">\r\n\t\t\t\t\t\t\t\t<div fxLayout=\"row wrap\">\r\n\t\t\t\t\t\t\t\t\t<ng-container *ngFor=\"let alias of item.remote_aliases\">\r\n\t\t\t\t\t\t\t\t\t\t<ng-container *ngIf=\"alias && alias.length\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div fxLayout=\"row inline\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t class=\"alias\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t [class.available]=\"alias.length >= 1 && alias.length <= 5\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t [class.mr-0_5]=\"item.remote_aliases.length >= 2\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t [class.mb-0_5]=\"item.remote_aliases.length >= 2\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t (contextmenu)=\"variablesService.onContextMenuOnlyCopy($event, '@' + alias)\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t{{ '@' + alias }}\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</ng-container>\r\n\t\t\t\t\t\t\t\t\t</ng-container>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</ng-container>\r\n\t\t\t\t\t\t</ng-template>\r\n\t\t\t\t\t\t<ng-container *ngIf=\"!(item.remote_addresses?.length || item.remote_aliases?.length)\">\r\n\t\t\t\t\t\t\t{{ 'Hidden' | translate }}\r\n\t\t\t\t\t\t</ng-container>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t\t<td>\r\n\t\t\t\t\t\t<div class=\"text-ellipsis\">\r\n\t\t\t\t\t\t\t{{item.timestamp * 1000 | date : 'dd-MM-yyyy HH:mm'}}\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<div class=\"row-divider\"></div>\r\n\t\t\t\t<tr class=\"details\"\r\n\t\t\t\t\t[class.open]=\"item.tx_hash === openedDetails\">\r\n\t\t\t\t\t<td colspan=\"5\">\r\n\t\t\t\t\t\t<app-transaction-details *ngIf=\"item.tx_hash === openedDetails\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t [transaction]=\"item\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t [sizes]=\"calculatedWidth\"></app-transaction-details>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<div class=\"row-divider\"\r\n\t\t\t\t\t [class.hide]=\"item.tx_hash !== openedDetails\"></div>\r\n\t\t\t</ng-container>\r\n\t\t\t</tbody>\r\n\t\t</table>\r\n\t</div>\r\n\t<div class=\"pagination-wrapper\">\r\n\t\t<div class=\"pagination\"\r\n\t\t\t fxLayout=\"row\"\r\n\t\t\t fxLayoutAlign=\"space-between center\">\r\n\t\t\t<div class=\"left\"\r\n\t\t\t\t fxLayout=\"row\"\r\n\t\t\t\t fxLayoutAlign=\" center\">\r\n\t\t\t\t<button class=\"btn-icon circle small mr-1\"\r\n\t\t\t\t\t\t[disabled]=\"variablesService.currentWallet.currentPage === 1 || variablesService.isCurrentWalletSync || !variablesService.isCurrentWalletLoaded\"\r\n\t\t\t\t\t\t(click)=\"setPage(variablesService.currentWallet.currentPage - 1)\">\r\n\t\t\t\t\t<i class=\"icon arrow-left-stroke\"></i>\r\n\t\t\t\t</button>\r\n\r\n\t\t\t\t<ng-container *ngIf=\"!mining\">\r\n\t\t\t\t\t<button *ngFor=\"let page of variablesService.currentWallet.pages\"\r\n\t\t\t\t\t\t\t[class.color-primary]=\"variablesService.currentWallet.currentPage === page\"\r\n\t\t\t\t\t\t\t[disabled]=\"variablesService.isCurrentWalletSync || !variablesService.isCurrentWalletLoaded\"\r\n\t\t\t\t\t\t\tclass=\"mr-0_5\"\r\n\t\t\t\t\t\t\t(click)=\"setPage(page)\">{{page}}</button>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<ng-container *ngIf=\"mining\">\r\n\t\t\t\t\t<button class=\"mr-0_5\"\r\n\t\t\t\t\t\t\t[disabled]=\"stop_paginate || variablesService.isCurrentWalletSync || !variablesService.isCurrentWalletLoaded\"\r\n\t\t\t\t\t\t\t[ngClass]=\"{ 'color-primary': variablesService.currentWallet.currentPage, 'disabled': variablesService.isCurrentWalletSync || !variablesService.isCurrentWalletLoaded}\"\r\n\t\t\t\t\t\t\t(click)=\"setPage(variablesService.currentWallet.currentPage)\">\r\n\t\t\t\t\t\t{{variablesService.currentWallet.currentPage}}\r\n\t\t\t\t\t</button>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<button class=\"btn-icon circle small ml-0_5\"\r\n\t\t\t\t\t\t[disabled]=\"stop_paginate || variablesService.isCurrentWalletSync || !variablesService.isCurrentWalletLoaded\"\r\n\t\t\t\t\t\t(click)=\"setPage(variablesService.currentWallet.currentPage + 1)\">\r\n\t\t\t\t\t<i class=\"icon arrow-right-stroke\"></i>\r\n\t\t\t\t</button>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"right\"\r\n\t\t\t\t fxLayout=\"row\"\r\n\t\t\t\t fxLayoutAlign=\" center\">\r\n\t\t\t\t<span class=\"switch-text mr-2\">Hide mining transactions</span>\r\n\t\t\t\t<app-switch [value]=\"mining\"\r\n\t\t\t\t\t\t\t[disabled]=\"variablesService.isCurrentWalletSync || !variablesService.isCurrentWalletLoaded\"\r\n\t\t\t\t\t\t\t(emitChange)=\"toggleMiningTransactions()\"></app-switch>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/history/history.component.scss":
/*!************************************************!*\
  !*** ./src/app/history/history.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL2hpc3RvcnkvaGlzdG9yeS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvaGlzdG9yeS9oaXN0b3J5LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL2hpc3RvcnkvaGlzdG9yeS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbn1cbiIsIjpob3N0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbn0iXX0= */"

/***/ }),

/***/ "./src/app/history/history.component.ts":
/*!**********************************************!*\
  !*** ./src/app/history/history.component.ts ***!
  \**********************************************/
/*! exports provided: HistoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryComponent", function() { return HistoryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bignumber.js */ "./node_modules/bignumber.js/bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _helpers_services_pagination_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_helpers/services/pagination.service */ "./src/app/_helpers/services/pagination.service.ts");
/* harmony import */ var _helpers_services_pagination_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_helpers/services/pagination.store */ "./src/app/_helpers/services/pagination.store.ts");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");










var HistoryComponent = /** @class */ (function () {
    function HistoryComponent(route, variablesService, pagination, backend, ngZone, paginationStore) {
        this.route = route;
        this.variablesService = variablesService;
        this.pagination = pagination;
        this.backend = backend;
        this.ngZone = ngZone;
        this.paginationStore = paginationStore;
        this.openedDetails = '';
        this.calculatedWidth = [];
        this.stop_paginate = false;
        this.mining = false;
        this.x = new bignumber_js__WEBPACK_IMPORTED_MODULE_4___default.a(3);
        this.y = new bignumber_js__WEBPACK_IMPORTED_MODULE_4___default.a(0.2);
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__["Subject"]();
    }
    HistoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parentRouting = this.route.parent.params.subscribe(function () {
            _this.openedDetails = '';
        });
        this.init();
        this.variablesService.getWalletChangedEvent.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["takeUntil"])(this.destroy$)).subscribe({
            next: function () {
                _this.getRecentTransfers();
            }
        });
        this.variablesService
            .getWalletChangedEvent
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])(function (w) { return !!w; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["takeUntil"])(this.destroy$)).subscribe(function (currentWallet) {
            _this.mining = currentWallet.exclude_mining_txs;
        });
    };
    HistoryComponent.prototype.init = function () {
        var restore = false;
        if (this.variablesService.after_sync_request.hasOwnProperty(this.variablesService.currentWallet.wallet_id)) {
            restore = this.variablesService.after_sync_request[this.variablesService.currentWallet.wallet_id];
        }
        if (!this.variablesService.sync_started && restore && this.variablesService.currentWallet.wallet_id) {
            this.wallet = this.variablesService.getNotLoadedWallet();
            if (this.wallet) {
                this.tick();
            }
            // if this is was restore wallet and it was selected on moment when sync completed
            this.getRecentTransfers();
            this.variablesService.after_sync_request[this.variablesService.currentWallet.wallet_id] = false;
        }
        var after_sync_request = false;
        if (this.variablesService.after_sync_request.hasOwnProperty(this.variablesService.currentWallet.wallet_id)) {
            after_sync_request = this.variablesService.after_sync_request[this.variablesService.currentWallet.wallet_id];
        }
        if (after_sync_request && !this.variablesService.sync_started) {
            // if user click on the wallet at the first time after restore.
            this.getRecentTransfers();
        }
        if (this.variablesService.stop_paginate.hasOwnProperty(this.variablesService.currentWallet.wallet_id)) {
            this.stop_paginate = this.variablesService.stop_paginate[this.variablesService.currentWallet.wallet_id];
        }
        else {
            this.stop_paginate = false;
        }
        // this will hide pagination a bit earlier
        this.wallet = this.variablesService.getNotLoadedWallet();
        if (this.wallet) {
            this.tick();
        }
    };
    HistoryComponent.prototype.ngAfterViewChecked = function () {
        this.calculateWidth();
    };
    HistoryComponent.prototype.strokeSize = function (item) {
        var rem = this.variablesService.settings.scale;
        if ((this.variablesService.height_app - item.height >= 10 && item.height !== 0) || (item.is_mining === true && item.height === 0)) {
            return 0;
        }
        else {
            if (item.height === 0 || this.variablesService.height_app - item.height < 0) {
                return (4.5 * parseInt(rem, 10));
            }
            else {
                return ((4.5 * parseInt(rem, 10)) - (((4.5 * parseInt(rem, 10)) / 100) * ((this.variablesService.height_app - item.height) * 10)));
            }
        }
    };
    HistoryComponent.prototype.resetPaginationValues = function () {
        var _this = this;
        this.ngZone.run(function () {
            var total_history_item = _this.variablesService.currentWallet
                .total_history_item;
            var count = _this.variablesService.count;
            _this.variablesService.currentWallet.totalPages = Math.ceil(total_history_item / count);
            _this.variablesService.currentWallet.exclude_mining_txs = _this.mining;
            _this.variablesService.currentWallet.currentPage = 1;
            if (!_this.variablesService.currentWallet.totalPages) {
                _this.variablesService.currentWallet.totalPages = 1;
            }
            _this.variablesService.currentWallet.totalPages >
                _this.variablesService.maxPages
                ? (_this.variablesService.currentWallet.pages = new Array(5)
                    .fill(1)
                    .map(function (value, index) { return value + index; }))
                : (_this.variablesService.currentWallet.pages = new Array(_this.variablesService.currentWallet.totalPages)
                    .fill(1)
                    .map(function (value, index) { return value + index; }));
        });
    };
    HistoryComponent.prototype.setPage = function (pageNumber) {
        // this is will allow pagination for wallets that was open from existed wallets'
        if (pageNumber === this.variablesService.currentWallet.currentPage) {
            return;
        }
        if (this.variablesService.currentWallet.open_from_exist &&
            !this.variablesService.currentWallet.updated) {
            this.variablesService.get_recent_transfers = false;
            this.variablesService.currentWallet.updated = true;
        }
        // if not running get_recent_transfers callback
        if (!this.variablesService.get_recent_transfers) {
            this.variablesService.currentWallet.currentPage = pageNumber;
        }
        if (!this.variablesService.get_recent_transfers) {
            this.getRecentTransfers();
        }
    };
    HistoryComponent.prototype.toggleMiningTransactions = function () {
        var _this = this;
        if (!this.variablesService.sync_started && !this.wallet) {
            var value = this.paginationStore.value;
            if (!value) {
                this.paginationStore.setPage(1, 0, this.variablesService.currentWallet.wallet_id); // add back page for the first page
            }
            else {
                var pages = value.filter(function (item) { return item.walletID === _this.variablesService.currentWallet.wallet_id; });
                if (!pages.length) {
                    this.paginationStore.setPage(1, 0, this.variablesService.currentWallet.wallet_id); // add back page for the first page
                }
            }
            this.mining = !this.mining;
            this.resetPaginationValues();
            this.getRecentTransfers();
        }
    };
    HistoryComponent.prototype.getRecentTransfers = function () {
        var _this = this;
        var offset = this.pagination.getOffset(this.variablesService.currentWallet.wallet_id);
        var value = this.paginationStore.value;
        var pages = value
            ? value.filter(function (item) { return item.walletID === _this.variablesService.currentWallet.wallet_id; })
            : [];
        this.backend.getRecentTransfers(this.variablesService.currentWallet.wallet_id, offset, this.variablesService.count, this.variablesService.currentWallet.exclude_mining_txs, function (status, data) {
            var isForward = _this.paginationStore.isForward(pages, _this.variablesService.currentWallet.currentPage);
            if (_this.mining && isForward && pages && pages.length === 1) {
                _this.variablesService.currentWallet.currentPage = 1; // set init page after navigation back
            }
            var history = data && data.history;
            _this.variablesService.stop_paginate[_this.variablesService.currentWallet.wallet_id] =
                (history && history.length < _this.variablesService.count) || !history;
            _this.stop_paginate = _this.variablesService.stop_paginate[_this.variablesService.currentWallet.wallet_id];
            if (!_this.variablesService.stop_paginate[_this.variablesService.currentWallet.wallet_id]) {
                var page = _this.variablesService.currentWallet.currentPage + 1;
                if (isForward &&
                    _this.mining &&
                    history &&
                    history.length === _this.variablesService.count) {
                    _this.paginationStore.setPage(page, data.last_item_index, _this.variablesService.currentWallet.wallet_id); // add back page for current page
                }
            }
            _this.pagination.calcPages(data);
            _this.pagination.prepareHistory(data, status);
            _this.ngZone.run(function () {
                _this.variablesService.get_recent_transfers = false;
                if (_this.variablesService.after_sync_request.hasOwnProperty(_this.variablesService.currentWallet.wallet_id)) {
                    // this is will complete get_recent_transfers request
                    // this will switch of
                    _this.variablesService.after_sync_request[_this.variablesService.currentWallet.wallet_id] = false;
                }
            });
        });
    };
    HistoryComponent.prototype.tick = function () {
        var _this = this;
        var walletInterval = setInterval(function () {
            _this.wallet = _this.variablesService.getNotLoadedWallet();
            if (!_this.wallet) {
                clearInterval(walletInterval);
            }
        }, 1000);
    };
    HistoryComponent.prototype.getHeight = function (item) {
        if ((this.variablesService.height_app - item.height >= 10 && item.height !== 0) || (item.is_mining === true && item.height === 0)) {
            return 10;
        }
        else {
            if (item.height === 0 || this.variablesService.height_app - item.height < 0) {
                return 0;
            }
            else {
                return (this.variablesService.height_app - item.height);
            }
        }
    };
    HistoryComponent.prototype.openDetails = function (tx_hash) {
        if (tx_hash === this.openedDetails) {
            this.openedDetails = '';
        }
        else {
            this.openedDetails = tx_hash;
        }
    };
    HistoryComponent.prototype.calculateWidth = function () {
        this.calculatedWidth = [];
        this.calculatedWidth.push(this.head.nativeElement.childNodes[0].clientWidth);
        this.calculatedWidth.push(this.head.nativeElement.childNodes[1].clientWidth + this.head.nativeElement.childNodes[2].clientWidth);
        this.calculatedWidth.push(this.head.nativeElement.childNodes[3].clientWidth);
        this.calculatedWidth.push(this.head.nativeElement.childNodes[4].clientWidth);
    };
    HistoryComponent.prototype.time = function (item) {
        var now = new Date().getTime();
        var unlockTime = now + ((item.unlock_time - this.variablesService.height_max) * 60 * 1000);
        return unlockTime;
    };
    HistoryComponent.prototype.isLocked = function (item) {
        if ((item.unlock_time > 500000000) && (item.unlock_time > new Date().getTime() / 1000)) {
            return true;
        }
        if ((item.unlock_time < 500000000) && (item.unlock_time > this.variablesService.height_max)) {
            return true;
        }
        return false;
    };
    HistoryComponent.prototype.ngOnDestroy = function () {
        this.parentRouting.unsubscribe();
        this.destroy$.next();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('head'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], HistoryComponent.prototype, "head", void 0);
    HistoryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-history',
            template: __webpack_require__(/*! ./history.component.html */ "./src/app/history/history.component.html"),
            styles: [__webpack_require__(/*! ./history.component.scss */ "./src/app/history/history.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_2__["VariablesService"],
            _helpers_services_pagination_service__WEBPACK_IMPORTED_MODULE_5__["PaginationService"],
            _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_7__["BackendService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            _helpers_services_pagination_store__WEBPACK_IMPORTED_MODULE_6__["PaginationStore"]])
    ], HistoryComponent);
    return HistoryComponent;
}());



/***/ }),

/***/ "./src/app/layouts/full-layout/full-layout.component.html":
/*!****************************************************************!*\
  !*** ./src/app/layouts/full-layout/full-layout.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"overflow-auto p-2\"\n     fxFlex=\"100\"\n     fxFlexFill>\n    <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ "./src/app/layouts/full-layout/full-layout.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/layouts/full-layout/full-layout.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL2xheW91dHMvZnVsbC1sYXlvdXQvZnVsbC1sYXlvdXQuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2xheW91dHMvZnVsbC1sYXlvdXQvZnVsbC1sYXlvdXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXRzL2Z1bGwtbGF5b3V0L2Z1bGwtbGF5b3V0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuIiwiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/layouts/full-layout/full-layout.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/layouts/full-layout/full-layout.component.ts ***!
  \**************************************************************/
/*! exports provided: FullLayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FullLayoutComponent", function() { return FullLayoutComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var FullLayoutComponent = /** @class */ (function () {
    function FullLayoutComponent() {
    }
    FullLayoutComponent.prototype.ngOnInit = function () {
    };
    FullLayoutComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-full-layout',
            template: __webpack_require__(/*! ./full-layout.component.html */ "./src/app/layouts/full-layout/full-layout.component.html"),
            styles: [__webpack_require__(/*! ./full-layout.component.scss */ "./src/app/layouts/full-layout/full-layout.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], FullLayoutComponent);
    return FullLayoutComponent;
}());



/***/ }),

/***/ "./src/app/layouts/full-layout/full-layout.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/layouts/full-layout/full-layout.module.ts ***!
  \***********************************************************/
/*! exports provided: FullLayoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FullLayoutModule", function() { return FullLayoutModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _full_layout_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./full-layout.component */ "./src/app/layouts/full-layout/full-layout.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");






var FullLayoutModule = /** @class */ (function () {
    function FullLayoutModule() {
    }
    FullLayoutModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_full_layout_component__WEBPACK_IMPORTED_MODULE_3__["FullLayoutComponent"]],
            imports: [
                _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__["FlexLayoutModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            exports: [_full_layout_component__WEBPACK_IMPORTED_MODULE_3__["FullLayoutComponent"]]
        })
    ], FullLayoutModule);
    return FullLayoutModule;
}());



/***/ }),

/***/ "./src/app/layouts/with-sidebar-layout/with-sidebar-layout.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/layouts/with-sidebar-layout/with-sidebar-layout.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-sidebar></app-sidebar>\n\n<div class=\"overflow-auto p-2\"\n     fxFlex=\"100\">\n    <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ "./src/app/layouts/with-sidebar-layout/with-sidebar-layout.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/layouts/with-sidebar-layout/with-sidebar-layout.component.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  display: flex;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL2xheW91dHMvd2l0aC1zaWRlYmFyLWxheW91dC93aXRoLXNpZGViYXItbGF5b3V0LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9sYXlvdXRzL3dpdGgtc2lkZWJhci1sYXlvdXQvd2l0aC1zaWRlYmFyLWxheW91dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFFQSxhQUFBO0FDQUYiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXRzL3dpdGgtc2lkZWJhci1sYXlvdXQvd2l0aC1zaWRlYmFyLWxheW91dC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICBkaXNwbGF5OiBmbGV4O1xufVxuIiwiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBkaXNwbGF5OiBmbGV4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/layouts/with-sidebar-layout/with-sidebar-layout.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/layouts/with-sidebar-layout/with-sidebar-layout.component.ts ***!
  \******************************************************************************/
/*! exports provided: WithSidebarLayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WithSidebarLayoutComponent", function() { return WithSidebarLayoutComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var WithSidebarLayoutComponent = /** @class */ (function () {
    function WithSidebarLayoutComponent() {
    }
    WithSidebarLayoutComponent.prototype.ngOnInit = function () {
    };
    WithSidebarLayoutComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-with-sidebar-layout',
            template: __webpack_require__(/*! ./with-sidebar-layout.component.html */ "./src/app/layouts/with-sidebar-layout/with-sidebar-layout.component.html"),
            styles: [__webpack_require__(/*! ./with-sidebar-layout.component.scss */ "./src/app/layouts/with-sidebar-layout/with-sidebar-layout.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], WithSidebarLayoutComponent);
    return WithSidebarLayoutComponent;
}());



/***/ }),

/***/ "./src/app/layouts/with-sidebar-layout/with-sidebar-layout.module.ts":
/*!***************************************************************************!*\
  !*** ./src/app/layouts/with-sidebar-layout/with-sidebar-layout.module.ts ***!
  \***************************************************************************/
/*! exports provided: WithSidebarLayoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WithSidebarLayoutModule", function() { return WithSidebarLayoutModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _with_sidebar_layout_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./with-sidebar-layout.component */ "./src/app/layouts/with-sidebar-layout/with-sidebar-layout.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _sidebar_sidebar_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../sidebar/sidebar.module */ "./src/app/sidebar/sidebar.module.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");







var WithSidebarLayoutModule = /** @class */ (function () {
    function WithSidebarLayoutModule() {
    }
    WithSidebarLayoutModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_with_sidebar_layout_component__WEBPACK_IMPORTED_MODULE_3__["WithSidebarLayoutComponent"]],
            imports: [
                _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__["FlexLayoutModule"],
                _sidebar_sidebar_module__WEBPACK_IMPORTED_MODULE_5__["SidebarModule"]
            ],
            exports: [_with_sidebar_layout_component__WEBPACK_IMPORTED_MODULE_3__["WithSidebarLayoutComponent"]]
        })
    ], WithSidebarLayoutModule);
    return WithSidebarLayoutModule;
}());



/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"auth\"\n     fxLayout=\"row\"\n     fxLayoutAlign=\"center center\"\n     fxFlexFill>\n    <div\n          class=\"card max-w-42-rem max-h-100 w-100 p-2 border-radius-0_8-rem bg-light-blue overflow-x-hidden\">\n\n        <div class=\"logo border-radius-0_8-rem overflow-hidden mb-3\"\n             fxLayout=\"row\"\n             fxLayoutAlign=\"center center\">\n            <img src=\"assets/icons/blue/infinium-logo.svg\"\n                 alt=\"infinium-logo\">\n        </div>\n\n        <form *ngIf=\"type === 'reg'\"\n              class=\"form bg-light-blue-details\"\n              [formGroup]=\"regForm\"\n              (ngSubmit)=\"onSubmitCreatePass()\">\n            <div\n                  class=\"form__field--wrapper pt-2 pl-2 pr-2 pb-1 mb-2 bg-light-blue-details border-radius-0_8-rem overflow-hidden\">\n                <div class=\"form__field mb-2\">\n                    <label for=\"master-pass\">{{ 'LOGIN.SETUP_MASTER_PASS' | translate }}</label>\n                    <input class=\"form__field--input\"\n                           type=\"password\"\n                           id=\"master-pass\"\n                           formControlName=\"password\"\n\t\t\t\t\t\t   appAutofocus\n                           placeholder=\"{{ 'PLACEHOLDERS.MASTER_PASS_PLACEHOLDER' | translate }}\"\n                           (contextmenu)=\"variablesService.onContextMenuPasteSelect($event)\">\n                    <div class=\"error\"\n                         *ngIf=\"regForm.controls['password'].dirty && regForm.controls['password'].errors\">\n                        <div *ngIf=\"regForm.controls['password'].errors.pattern\">\n                            {{ 'ERRORS.WRONG_PASSWORD' | translate }}\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"form__field\">\n                    <label for=\"confirm-pass\">{{ 'LOGIN.SETUP_CONFIRM_PASS' | translate }}</label>\n                    <input class=\"form__field--input\"\n                           type=\"password\"\n                           id=\"confirm-pass\"\n                           placeholder=\"{{ 'PLACEHOLDERS.PLACEHOLDER_CONFIRM' | translate }}\"\n                           formControlName=\"confirmation\"\n                           (contextmenu)=\"variablesService.onContextMenuPasteSelect($event)\">\n                    <div class=\"error\"\n                         *ngIf=\"regForm.controls['password'].dirty && regForm.controls['confirmation'].dirty && regForm.errors\">\n                        <div *ngIf=\"regForm.errors['mismatch']\">\n                            {{ 'LOGIN.FORM_ERRORS.MISMATCH' | translate }}\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <button type=\"submit\"\n                    class=\"primary big w-100 mb-1\"\n                    [disabled]=\"!regForm.controls['password'].value.length || !regForm.controls['confirmation'].value.length || (regForm.errors && regForm.errors['mismatch']) || regForm.controls['password'].errors\">{{\n                'LOGIN.BUTTON_NEXT' | translate }}</button>\n\n            <button type=\"button\"\n                    class=\"primary big w-100\"\n                    (click)=\"onSkipCreatePass()\"\n                    [disabled]=\"regForm.controls['password'].value.length || regForm.controls['confirmation'].value.length\">{{\n                'LOGIN.BUTTON_SKIP' | translate }}</button>\n\n        </form>\n\n        <form *ngIf=\"type !== 'reg'\"\n              class=\"form\"\n              [formGroup]=\"authForm\"\n              (ngSubmit)=\"onSubmitAuthPass()\">\n            <div\n                  class=\"form__field--wrapper pt-2 pl-2 pr-2 pb-1 mb-2 bg-light-blue-details border-radius-0_8-rem overflow-hidden\">\n                <div class=\"form__field\">\n                    <label for=\"master-pass-login\">{{ 'LOGIN.MASTER_PASS' | translate }}</label>\n                    <input class=\"form__field--input\"\n                           type=\"password\"\n                           id=\"master-pass-login\"\n                           [placeholder]=\"'PLACEHOLDERS.MASTER_PASS_PLACEHOLDER' | translate\"\n                           formControlName=\"password\"\n\t\t\t\t\t\t   appAutofocus\n                           autofocus\n                           (contextmenu)=\"variablesService.onContextMenuPasteSelect($event)\">\n                    <div class=\"error\"\n                         *ngIf=\"authForm.controls['password'].invalid && (authForm.controls['password'].dirty || authForm.controls['password'].touched)\">\n                        <div *ngIf=\"authForm.controls['password'].hasError('wrong_password')\">\n                            {{ 'LOGIN.FORM_ERRORS.INVALID_PASS' | translate }}\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <button type=\"submit\"\n                    class=\"primary big w-100 mb-1\">\n                {{'LOGIN.BUTTON_NEXT' | translate }}</button>\n\n            <button type=\"button\"\n                    class=\"outline big w-100\"\n                    (click)=\"dropSecureAppData()\">\n                {{ 'LOGIN.BUTTON_RESET' | translate }}</button>\n        </form>\n    </div>\n\n    <app-synchronization-status class=\"max-w-19-rem\"></app-synchronization-status>\n</div>\n"

/***/ }),

/***/ "./src/app/login/login.component.scss":
/*!********************************************!*\
  !*** ./src/app/login/login.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9sb2dpbi9sb2dpbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuIiwiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_helpers/services/modal.service */ "./src/app/_helpers/services/modal.service.ts");
/* harmony import */ var _helpers_models_wallet_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_helpers/models/wallet.model */ "./src/app/_helpers/models/wallet.model.ts");








var LoginComponent = /** @class */ (function () {
    function LoginComponent(route, router, backend, variablesService, modalService, ngZone) {
        this.route = route;
        this.router = router;
        this.backend = backend;
        this.variablesService = variablesService;
        this.modalService = modalService;
        this.ngZone = ngZone;
        this.regForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern(this.variablesService.pattern)),
            confirmation: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('')
        }, [function (g) {
                return g.get('password').value === g.get('confirmation').value ? null : { 'mismatch': true };
            }
        ]);
        this.authForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('')
        });
        this.type = 'reg';
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.queryRouting = this.route.queryParams.subscribe(function (params) {
            if (params.type) {
                _this.type = params.type;
            }
        });
    };
    LoginComponent.prototype.onSubmitCreatePass = function () {
        var _this = this;
        if (this.regForm.valid) {
            this.variablesService.appPass = this.regForm.get('password').value; // the pass what was written in input of login form by user
            this.backend.setMasterPassword({ pass: this.variablesService.appPass }, function (status, data) {
                if (status) {
                    _this.backend.storeSecureAppData({ pass: _this.variablesService.appPass });
                    _this.variablesService.appLogin = true;
                    _this.variablesService.dataIsLoaded = true;
                    if (_this.variablesService.settings.appLockTime) {
                        _this.variablesService.startCountdown();
                    }
                    _this.ngZone.run(function () {
                        _this.router.navigate(['/']);
                    });
                }
                else {
                    console.log(data['error_code']);
                }
            });
        }
    };
    LoginComponent.prototype.onSkipCreatePass = function () {
        var _this = this;
        this.variablesService.appPass = '';
        this.ngZone.run(function () {
            _this.variablesService.appLogin = true;
            _this.router.navigate(['/']);
        });
    };
    LoginComponent.prototype.dropSecureAppData = function () {
        var _this = this;
        this.backend.dropSecureAppData(function () {
            _this.onSkipCreatePass();
        });
        this.closeAllWallets();
        this.variablesService.contacts = [];
    };
    LoginComponent.prototype.onSubmitAuthPass = function () {
        var _this = this;
        if (this.authForm.valid) {
            this.variablesService.appPass = this.authForm.get('password').value;
            if (this.variablesService.dataIsLoaded) {
                this.backend.checkMasterPassword({ pass: this.variablesService.appPass }, function (status) {
                    if (status) {
                        _this.variablesService.appLogin = true;
                        if (_this.variablesService.settings.appLockTime) {
                            _this.variablesService.startCountdown();
                        }
                        _this.ngZone.run(function () {
                            _this.router.navigate(['/'], { queryParams: { prevUrl: 'login' } });
                        });
                    }
                    else {
                        _this.ngZone.run(function () {
                            _this.setAuthPassError({ wrong_password: true });
                        });
                    }
                });
            }
            else {
                this.getData(this.variablesService.appPass);
            }
        }
    };
    LoginComponent.prototype.getData = function (appPass) {
        var _this = this;
        this.backend.getSecureAppData({ pass: appPass }, function (status, data) {
            if (!data.error_code) {
                _this.setAuthPassError(null);
                _this.variablesService.appLogin = true;
                _this.variablesService.dataIsLoaded = true;
                if (_this.variablesService.settings.appLockTime) {
                    _this.variablesService.startCountdown();
                }
                _this.variablesService.appPass = appPass;
                var isEmptyObject = Object.keys(data).length === 0 && data.constructor === Object;
                if (_this.variablesService.wallets.length) {
                    _this.ngZone.run(function () {
                        _this.router.navigate(['/wallet/']);
                    });
                    return;
                }
                if (data.hasOwnProperty('contacts')) {
                    if (Object.keys(data['contacts']).length !== 0) {
                        data['contacts'].map(function (contact) {
                            _this.variablesService.contacts.push(contact);
                        });
                    }
                }
                if (data.hasOwnProperty('wallets')) {
                    if (Object.keys(data['wallets']).length !== 0) {
                        _this.getWalletData(data['wallets']);
                    }
                    else {
                        _this.ngZone.run(function () {
                            _this.router.navigate(['/']);
                        });
                    }
                }
                if (!data.hasOwnProperty('wallets') && !data.hasOwnProperty('contacts')) {
                    if (data.length !== 0 && !isEmptyObject) {
                        _this.getWalletData(data);
                    }
                    else {
                        _this.ngZone.run(function () {
                            _this.router.navigate(['/']);
                        });
                    }
                }
            }
            if (data.error_code === 'WRONG_PASSWORD') {
                _this.ngZone.run(function () {
                    _this.setAuthPassError({ wrong_password: true });
                });
            }
        });
    };
    LoginComponent.prototype.setAuthPassError = function (errors) {
        this.authForm.controls['password'].setErrors(errors);
    };
    LoginComponent.prototype.getWalletData = function (walletData) {
        var _this = this;
        var openWallets = 0;
        var runWallets = 0;
        walletData.forEach(function (wallet, wallet_index) {
            _this.backend.openWallet(wallet.path, wallet.pass, _this.variablesService.count, true, function (open_status, open_data, open_error) {
                if (open_status || open_error === 'FILE_RESTORED') {
                    openWallets++;
                    _this.ngZone.run(function () {
                        var new_wallet = new _helpers_models_wallet_model__WEBPACK_IMPORTED_MODULE_7__["Wallet"](open_data.wallet_id, wallet.name, wallet.pass, open_data['wi'].path, open_data['wi'].address, open_data['wi'].balance, open_data['wi'].unlocked_balance, open_data['wi'].mined_total, open_data['wi'].tracking_hey);
                        new_wallet.alias = _this.backend.getWalletAlias(new_wallet.address);
                        if (wallet.staking) {
                            new_wallet.staking = true;
                            _this.backend.startPosMining(new_wallet.wallet_id);
                        }
                        else {
                            new_wallet.staking = false;
                        }
                        new_wallet.is_auditable = open_data['wi'].is_auditable;
                        new_wallet.is_watch_only = open_data['wi'].is_watch_only;
                        new_wallet.currentPage = 1;
                        new_wallet.exclude_mining_txs = false;
                        if (open_data.recent_history && open_data.recent_history.history) {
                            new_wallet.total_history_item = open_data.recent_history.total_history_items;
                            new_wallet.totalPages = Math.ceil(open_data.recent_history.total_history_items / _this.variablesService.count);
                            new_wallet.totalPages > _this.variablesService.maxPages
                                ? new_wallet.pages = new Array(5).fill(1).map(function (value, index) { return value + index; })
                                : new_wallet.pages = new Array(new_wallet.totalPages).fill(1).map(function (value, index) { return value + index; });
                            new_wallet.prepareHistory(open_data.recent_history.history);
                        }
                        else {
                            new_wallet.total_history_item = 0;
                            new_wallet.pages = new Array(1).fill(1);
                            new_wallet.totalPages = 1;
                        }
                        _this.backend.getContracts(open_data.wallet_id, function (contracts_status, contracts_data) {
                            if (contracts_status && contracts_data.hasOwnProperty('contracts')) {
                                _this.ngZone.run(function () {
                                    new_wallet.prepareContractsAfterOpen(contracts_data.contracts, _this.variablesService.exp_med_ts, _this.variablesService.height_app, _this.variablesService.settings.viewedContracts, _this.variablesService.settings.notViewedContracts);
                                });
                            }
                        });
                        _this.variablesService.wallets.push(new_wallet);
                        if (_this.variablesService.wallets.length === 1) {
                            _this.router.navigate(['/wallet/']);
                        }
                    });
                    _this.backend.runWallet(open_data.wallet_id, function (run_status) {
                        if (run_status) {
                            runWallets++;
                        }
                        else {
                            if (wallet_index === walletData.length - 1 && runWallets === 0) {
                                _this.ngZone.run(function () {
                                    _this.router.navigate(['/']);
                                });
                            }
                        }
                    });
                }
                else {
                    if (wallet_index === walletData.length - 1 && openWallets === 0) {
                        _this.ngZone.run(function () {
                            _this.router.navigate(['/']);
                        });
                    }
                }
            });
        });
    };
    LoginComponent.prototype.closeAllWallets = function () {
        var _this = this;
        this.variablesService.wallets.forEach(function (_a) {
            var wallet_id = _a.wallet_id;
            return _this.closeWallet(wallet_id);
        });
        if (this.variablesService.appPass) {
            this.backend.storeSecureAppData();
        }
    };
    LoginComponent.prototype.closeWallet = function (wallet_id) {
        var _this = this;
        this.backend.closeWallet(wallet_id, function () {
            for (var i = _this.variablesService.wallets.length - 1; i >= 0; i--) {
                _this.variablesService.wallets.splice(i, 1);
            }
        });
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        this.queryRouting.unsubscribe();
    };
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/login/login.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__["BackendService"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_5__["VariablesService"],
            _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_6__["ModalService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/open-wallet-modal/open-wallet-modal.component.html":
/*!********************************************************************!*\
  !*** ./src/app/open-wallet-modal/open-wallet-modal.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal p-2 border-radius-0_8-rem bg-light-blue max-w-34-rem max-h-100 w-100 scrolled-content\">\n    <div class=\"wrapper w-100\">\n        <h3 class=\"mb-2\">{{ 'OPEN_WALLET.MODAL.TITLE' | translate }}</h3>\n\n        <div class=\"word-break-break-all mb-2\">{{ wallet.name }}</div>\n        <div class=\"word-break-break-all mb-2\">{{ wallet.path }}</div>\n\n        <form fxLayout=\"column\"\n              class=\"form\"\n              (ngSubmit)=\"openWallet()\">\n\n            <div class=\"form__field\"\n                 *ngIf=\"!wallet.notFound\">\n                <label for=\"password\">{{ 'OPEN_WALLET.MODAL.LABEL' | translate }}</label>\n                <input class=\"form__field--input\"\n\t\t\t\t\t   (contextmenu)=\"variablesService.onContextMenuPasteSelect($event)\"\n\t\t\t\t\t   (input)=\"wallet.wrongPassword = false\"\n\t\t\t\t\t   [(ngModel)]=\"wallet.pass\"\n\t\t\t\t\t   id=\"password\"\n\t\t\t\t\t   name=\"password\"\n\t\t\t\t\t   type=\"password\"/>\n\t\t\t\t<div *ngIf=\"wallet.notFound\"\n\t\t\t\t\t class=\"error\">\n\t\t\t\t\t{{ 'OPEN_WALLET.MODAL.NOT_FOUND' | translate }}\n\t\t\t\t</div>\n\t\t\t\t<div *ngIf=\"wallet.wrongPassword\"\n\t\t\t\t\t class=\"error\">\n\t\t\t\t\t{{ 'ERRORS.WRONG_PASSWORD' | translate }}\n\t\t\t\t</div>\n\t\t\t</div>\n\n            <div fxLayout=\"row nowrap\" fxLayoutGap=\"1rem\">\n                <button type=\"submit\"\n                        class=\"primary big w-100\"\n                        [disabled]=\"wallet.notFound\">{{ 'OPEN_WALLET.MODAL.OPEN' | translate }}</button>\n                <button type=\"button\"\n                        class=\"outline big w-100\"\n                        (click)=\"skipWallet()\">{{ 'OPEN_WALLET.MODAL.SKIP' | translate }}</button>\n            </div>\n        </form>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/open-wallet-modal/open-wallet-modal.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/open-wallet-modal/open-wallet-modal.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL29wZW4td2FsbGV0LW1vZGFsL29wZW4td2FsbGV0LW1vZGFsLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/open-wallet-modal/open-wallet-modal.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/open-wallet-modal/open-wallet-modal.component.ts ***!
  \******************************************************************/
/*! exports provided: OpenWalletModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpenWalletModalComponent", function() { return OpenWalletModalComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _helpers_models_wallet_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_helpers/models/wallet.model */ "./src/app/_helpers/models/wallet.model.ts");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_helpers/services/modal.service */ "./src/app/_helpers/services/modal.service.ts");







var OpenWalletModalComponent = /** @class */ (function () {
    function OpenWalletModalComponent(variablesService, backend, translate, modalService, ngZone, renderer) {
        this.variablesService = variablesService;
        this.backend = backend;
        this.translate = translate;
        this.modalService = modalService;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.modalOverlay = true;
        this.wallet = {
            name: '',
            path: '',
            pass: '',
            notFound: false,
            wrongPassword: false,
            emptyPass: false
        };
    }
    OpenWalletModalComponent.prototype.ngOnInit = function () {
        this.renderer.addClass(document.body, 'no-scroll');
        if (this.wallets.length) {
            this.wallet = this.wallets[0];
            this.wallet.pass = '';
        }
    };
    OpenWalletModalComponent.prototype.ngOnDestroy = function () {
        this.renderer.removeClass(document.body, 'no-scroll');
    };
    OpenWalletModalComponent.prototype.openWallet = function () {
        var _this = this;
        if (this.wallets.length === 0) {
            return;
        }
        this.backend.openWallet(this.wallet.path, this.wallet.pass, this.variablesService.count, false, function (open_status, open_data, open_error) {
            if (open_error === 'WRONG_PASSWORD') {
                _this.ngZone.run(function () {
                    _this.wallet.wrongPassword = true;
                });
            }
            if (open_error && open_error === 'FILE_NOT_FOUND') {
                _this.ngZone.run(function () {
                    _this.wallet.notFound = true;
                });
                var error_translate = _this.translate.instant('OPEN_WALLET.FILE_NOT_FOUND1');
                error_translate += ':<br>' + _this.wallet.path;
                error_translate += _this.translate.instant('OPEN_WALLET.FILE_NOT_FOUND2');
                _this.modalService.prepareModal('error', error_translate);
            }
            else {
                if (open_status || open_error === 'FILE_RESTORED') {
                    var exists_1 = false;
                    _this.variablesService.wallets.forEach(function (wallet) {
                        if (wallet.address === open_data['wi'].address) {
                            exists_1 = true;
                        }
                    });
                    if (exists_1) {
                        _this.modalService.prepareModal('error', 'OPEN_WALLET.WITH_ADDRESS_ALREADY_OPEN');
                        _this.backend.closeWallet(open_data.wallet_id);
                    }
                    else {
                        var new_wallet_1 = new _helpers_models_wallet_model__WEBPACK_IMPORTED_MODULE_3__["Wallet"](open_data.wallet_id, _this.wallet.name, _this.wallet.pass, open_data['wi'].path, open_data['wi'].address, open_data['wi'].balance, open_data['wi'].unlocked_balance, open_data['wi'].mined_total, open_data['wi'].tracking_hey);
                        new_wallet_1.alias = _this.backend.getWalletAlias(new_wallet_1.address);
                        new_wallet_1.is_auditable = open_data['wi'].is_auditable;
                        new_wallet_1.is_watch_only = open_data['wi'].is_watch_only;
                        new_wallet_1.currentPage = 1;
                        new_wallet_1.exclude_mining_txs = false;
                        if (open_data.recent_history && open_data.recent_history.history) {
                            new_wallet_1.total_history_item = open_data.recent_history.total_history_items;
                            new_wallet_1.totalPages = Math.ceil(open_data.recent_history.total_history_items / _this.variablesService.count);
                            new_wallet_1.totalPages > _this.variablesService.maxPages
                                ? new_wallet_1.pages = new Array(5).fill(1).map(function (value, index) { return value + index; })
                                : new_wallet_1.pages = new Array(new_wallet_1.totalPages).fill(1).map(function (value, index) { return value + index; });
                            new_wallet_1.prepareHistory(open_data.recent_history.history);
                        }
                        else {
                            new_wallet_1.total_history_item = 0;
                            new_wallet_1.pages = new Array(1).fill(1);
                            new_wallet_1.totalPages = 1;
                        }
                        _this.backend.getContracts(open_data.wallet_id, function (contracts_status, contracts_data) {
                            if (contracts_status && contracts_data.hasOwnProperty('contracts')) {
                                _this.ngZone.run(function () {
                                    new_wallet_1.prepareContractsAfterOpen(contracts_data.contracts, _this.variablesService.exp_med_ts, _this.variablesService.height_app, _this.variablesService.settings.viewedContracts, _this.variablesService.settings.notViewedContracts);
                                });
                            }
                        });
                        _this.variablesService.wallets.push(new_wallet_1);
                        _this.backend.runWallet(open_data.wallet_id);
                        _this.skipWallet();
                    }
                }
            }
        });
    };
    OpenWalletModalComponent.prototype.skipWallet = function () {
        var _this = this;
        this.ngZone.run(function () {
            if (_this.wallets.length) {
                _this.wallets.splice(0, 1);
                _this.ngOnInit();
            }
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.modal-overlay'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], OpenWalletModalComponent.prototype, "modalOverlay", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], OpenWalletModalComponent.prototype, "wallets", void 0);
    OpenWalletModalComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-open-wallet-modal',
            template: __webpack_require__(/*! ./open-wallet-modal.component.html */ "./src/app/open-wallet-modal/open-wallet-modal.component.html"),
            styles: [__webpack_require__(/*! ./open-wallet-modal.component.scss */ "./src/app/open-wallet-modal/open-wallet-modal.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_2__["VariablesService"],
            _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__["BackendService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateService"],
            _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_6__["ModalService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]])
    ], OpenWalletModalComponent);
    return OpenWalletModalComponent;
}());



/***/ }),

/***/ "./src/app/open-wallet/open-wallet.component.html":
/*!********************************************************!*\
  !*** ./src/app/open-wallet/open-wallet.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"page-container\">\n\n\t<div class=\"toolbar mb-2\">\n\t\t<div class=\"left\">\n\t\t\t<button (click)=\"back()\"\n\t\t\t\t\tclass=\"btn-icon circle big mr-2\"\n\t\t\t\t\ttype=\"button\">\n\t\t\t\t<i class=\"icon dropdown-arrow-left\"></i>\n\t\t\t</button>\n\t\t\t<h1>{{ 'BREADCRUMBS.OPEN_WALLET' | translate }}</h1>\n\t\t</div>\n\t\t<div class=\"right\"></div>\n\t</div>\n\n\t<div class=\"page-content\">\n\t\t<div class=\"breadcrumbs mb-2\">\n\t\t\t<div class=\"breadcrumb\">\n\t\t\t\t<a [routerLink]=\"['/add-wallet']\">{{'BREADCRUMBS.ADD_WALLET' | translate }}</a>\n\t\t\t</div>\n\t\t\t<div class=\"breadcrumb\">\n\t\t\t\t<span>{{'BREADCRUMBS.OPEN_WALLET' | translate}}</span>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"scrolled-content\">\n\t\t\t<form [formGroup]=\"openForm\"\n\t\t\t\t  (ngSubmit)=\"openWallet()\"\n\t\t\t\t  class=\"form\">\n\n\t\t\t\t<div class=\"form__field\">\n\t\t\t\t\t<label for=\"wallet-name\">{{ 'OPEN_WALLET.NAME' | translate }}</label>\n\t\t\t\t\t<input (contextmenu)=\"variablesService.onContextMenu($event)\"\n\t\t\t\t\t\t   [maxLength]=\"variablesService.maxWalletNameLength\"\n\t\t\t\t\t\t   [placeholder]=\"'PLACEHOLDERS.WALLET_NAME_PLACEHOLDER' | translate\"\n\t\t\t\t\t\t   class=\"form__field--input\"\n\t\t\t\t\t\t   formControlName=\"name\"\n\t\t\t\t\t\t   id=\"wallet-name\"\n\t\t\t\t\t\t   type=\"text\">\n\t\t\t\t\t<div *ngIf=\"openForm.controls['name'].invalid && (openForm.controls['name'].dirty || openForm.controls['name'].touched)\"\n\t\t\t\t\t\t class=\"error\">\n\t\t\t\t\t\t<div *ngIf=\"openForm.controls['name'].errors['duplicate']\">\n\t\t\t\t\t\t\t{{ 'OPEN_WALLET.FORM_ERRORS.NAME_DUPLICATE' | translate }}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div *ngIf=\"openForm.controls['name'].errors['required']\">\n\t\t\t\t\t\t\t{{ 'OPEN_WALLET.FORM_ERRORS.NAME_REQUIRED' | translate }}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div *ngIf=\"openForm.get('name').value.length > variablesService.maxWalletNameLength\"\n\t\t\t\t\t\t class=\"error\">\n\t\t\t\t\t\t{{ 'OPEN_WALLET.FORM_ERRORS.MAX_LENGTH' | translate }}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"form__field\">\n\t\t\t\t\t<label for=\"wallet-password\">{{ 'OPEN_WALLET.PASS' | translate }}</label>\n\t\t\t\t\t<input (contextmenu)=\"variablesService.onContextMenuPasteSelect($event)\"\n\t\t\t\t\t\t   class=\"form__field--input\"\n\t\t\t\t\t\t   formControlName=\"password\"\n\t\t\t\t\t\t   id=\"wallet-password\"\n\t\t\t\t\t\t   placeholder=\"{{ 'PLACEHOLDERS.PASS_PLACEHOLDER' | translate }}\"\n\t\t\t\t\t\t   type=\"password\">\n\t\t\t\t\t<div *ngIf=\"submitted && openForm.controls['password'].hasError('wrong_password')\"\n\t\t\t\t\t\t class=\"error\">\n\t\t\t\t\t\t{{ openForm.controls['password']?.errors['wrong_password']?.text }}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\n\t\t\t\t<button [disabled]=\"!openForm.valid\"\n\t\t\t\t\t\tclass=\"primary big max-w-19-rem w-100\"\n\t\t\t\t\t\ttype=\"submit\">{{'OPEN_WALLET.BUTTON' | translate }}</button>\n\t\t\t</form>\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ "./src/app/open-wallet/open-wallet.component.scss":
/*!********************************************************!*\
  !*** ./src/app/open-wallet/open-wallet.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL29wZW4td2FsbGV0L29wZW4td2FsbGV0LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9vcGVuLXdhbGxldC9vcGVuLXdhbGxldC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL29wZW4td2FsbGV0L29wZW4td2FsbGV0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuIiwiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/open-wallet/open-wallet.component.ts":
/*!******************************************************!*\
  !*** ./src/app/open-wallet/open-wallet.component.ts ***!
  \******************************************************/
/*! exports provided: OpenWalletComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpenWalletComponent", function() { return OpenWalletComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_helpers/services/modal.service */ "./src/app/_helpers/services/modal.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _helpers_models_wallet_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_helpers/models/wallet.model */ "./src/app/_helpers/models/wallet.model.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");










var OpenWalletComponent = /** @class */ (function () {
    function OpenWalletComponent(route, router, backend, variablesService, modalService, ngZone, location, translate) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.backend = backend;
        this.variablesService = variablesService;
        this.modalService = modalService;
        this.ngZone = ngZone;
        this.location = location;
        this.translate = translate;
        this.openForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, function (g) {
                    for (var i = 0; i < _this.variablesService.wallets.length; i++) {
                        if (g.value === _this.variablesService.wallets[i].name) {
                            return { 'duplicate': true };
                        }
                    }
                    return null;
                }]),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('')
        });
        this.submitted = false;
    }
    OpenWalletComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.queryRouting = this.route.queryParams.subscribe(function (params) {
            if (params.path) {
                _this.filePath = params.path;
                var filename = '';
                if (params.path.lastIndexOf('.') === -1) {
                    filename = params.path.substr(params.path.lastIndexOf('/') + 1);
                }
                else {
                    filename = params.path.substr(params.path.lastIndexOf('/') + 1, params.path.lastIndexOf('.') - 1 - params.path.lastIndexOf('/'));
                }
                if (filename.length > 25) {
                    filename = filename.slice(0, 25);
                }
                _this.openForm.get('name').setValue(filename);
                _this.openForm.get('name').markAsTouched();
            }
        });
    };
    OpenWalletComponent.prototype.openWallet = function () {
        var _this = this;
        this.submitted = true;
        if (this.openForm.valid && this.openForm.get('name').value.length <= this.variablesService.maxWalletNameLength) {
            this.backend.openWallet(this.filePath, this.openForm.get('password').value, this.variablesService.count, false, function (open_status, open_data, open_error) {
                if (open_error === 'WRONG_PASSWORD') {
                    _this.ngZone.run(function () {
                        _this.openForm.get('password').setErrors({
                            wrong_password: {
                                text: 'Wrong password'
                            }
                        });
                    });
                }
                if (open_error && open_error === 'FILE_NOT_FOUND') {
                    var error_translate = _this.translate.instant('OPEN_WALLET.FILE_NOT_FOUND1');
                    error_translate += ':<br>' + _this.filePath;
                    error_translate += _this.translate.instant('OPEN_WALLET.FILE_NOT_FOUND2');
                    _this.modalService.prepareModal('error', error_translate);
                }
                else {
                    if (open_status || open_error === 'FILE_RESTORED') {
                        var exists_1 = false;
                        _this.variablesService.wallets.forEach(function (wallet) {
                            if (wallet.address === open_data['wi'].address) {
                                exists_1 = true;
                            }
                        });
                        if (exists_1) {
                            _this.modalService.prepareModal('error', 'OPEN_WALLET.WITH_ADDRESS_ALREADY_OPEN');
                            _this.backend.closeWallet(open_data.wallet_id, function () {
                                _this.ngZone.run(function () {
                                    _this.router.navigate(['/']);
                                });
                            });
                        }
                        else {
                            var new_wallet_1 = new _helpers_models_wallet_model__WEBPACK_IMPORTED_MODULE_7__["Wallet"](open_data.wallet_id, _this.openForm.get('name').value, _this.openForm.get('password').value, open_data['wi'].path, open_data['wi'].address, open_data['wi'].balance, open_data['wi'].unlocked_balance, open_data['wi'].mined_total, open_data['wi'].tracking_hey);
                            new_wallet_1.alias = _this.backend.getWalletAlias(new_wallet_1.address);
                            new_wallet_1.currentPage = 1;
                            new_wallet_1.open_from_exist = true;
                            new_wallet_1.exclude_mining_txs = false;
                            new_wallet_1.is_auditable = open_data['wi'].is_auditable;
                            new_wallet_1.is_watch_only = open_data['wi'].is_watch_only;
                            if (open_data.recent_history && open_data.recent_history.history) {
                                new_wallet_1.total_history_item = open_data.recent_history.total_history_items;
                                new_wallet_1.totalPages = Math.ceil(open_data.recent_history.total_history_items / _this.variablesService.count);
                                new_wallet_1.totalPages > _this.variablesService.maxPages
                                    ? new_wallet_1.pages = new Array(5).fill(1).map(function (value, index) { return value + index; })
                                    : new_wallet_1.pages = new Array(new_wallet_1.totalPages).fill(1).map(function (value, index) { return value + index; });
                                new_wallet_1.prepareHistory(open_data.recent_history.history);
                            }
                            else {
                                new_wallet_1.total_history_item = 0;
                                new_wallet_1.pages = new Array(1).fill(1);
                                new_wallet_1.totalPages = 1;
                            }
                            _this.backend.getContracts(open_data.wallet_id, function (contracts_status, contracts_data) {
                                if (contracts_status && contracts_data.hasOwnProperty('contracts')) {
                                    _this.ngZone.run(function () {
                                        new_wallet_1.prepareContractsAfterOpen(contracts_data.contracts, _this.variablesService.exp_med_ts, _this.variablesService.height_app, _this.variablesService.settings.viewedContracts, _this.variablesService.settings.notViewedContracts);
                                    });
                                }
                            });
                            _this.variablesService.wallets.push(new_wallet_1);
                            _this.backend.runWallet(open_data.wallet_id, function (run_status, run_data) {
                                if (run_status) {
                                    if (_this.variablesService.appPass) {
                                        _this.backend.storeSecureAppData();
                                    }
                                    _this.ngZone.run(function () {
                                        _this.variablesService.setCurrentWallet(open_data.wallet_id);
                                        _this.router.navigate(['/wallet/']);
                                    });
                                }
                                else {
                                    console.log(run_data['error_code']);
                                }
                            });
                        }
                    }
                }
            });
        }
    };
    OpenWalletComponent.prototype.ngOnDestroy = function () {
        this.queryRouting.unsubscribe();
    };
    OpenWalletComponent.prototype.back = function () {
        this.location.back();
    };
    OpenWalletComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-open-wallet',
            template: __webpack_require__(/*! ./open-wallet.component.html */ "./src/app/open-wallet/open-wallet.component.html"),
            styles: [__webpack_require__(/*! ./open-wallet.component.scss */ "./src/app/open-wallet/open-wallet.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_3__["BackendService"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_4__["VariablesService"],
            _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_5__["ModalService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            _angular_common__WEBPACK_IMPORTED_MODULE_9__["Location"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"]])
    ], OpenWalletComponent);
    return OpenWalletComponent;
}());



/***/ }),

/***/ "./src/app/paths.ts":
/*!**************************!*\
  !*** ./src/app/paths.ts ***!
  \**************************/
/*! exports provided: paths, pathsChildrenAuth, pathsChildrenWallet, pathsChildrenContracts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "paths", function() { return paths; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pathsChildrenAuth", function() { return pathsChildrenAuth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pathsChildrenWallet", function() { return pathsChildrenWallet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pathsChildrenContracts", function() { return pathsChildrenContracts; });
var paths;
(function (paths) {
    paths["auth"] = "auth";
    paths["addWallet"] = "add-wallet";
    paths["login"] = "login";
    paths["wallet"] = "wallet";
    paths["create"] = "create";
    paths["open"] = "open";
    paths["restore"] = "restore";
    paths["seedPhrase"] = "seed-phrase";
    paths["details"] = "details";
    paths["assignAlias"] = "assign-alias";
    paths["editAlias"] = "edit-alias";
    paths["transferAlias"] = "transfer-alias";
    paths["settings"] = "settings";
    paths["contacts"] = "contacts";
    paths["addContacts"] = "add-contacts";
    paths["editContacts"] = "edit-contacts";
    paths["contactSend"] = "contact-send";
    paths["import"] = "import";
    paths["deeplink"] = "deeplink";
    paths["uiKit"] = "ui-kit";
})(paths || (paths = {}));
var pathsChildrenAuth;
(function (pathsChildrenAuth) {
    pathsChildrenAuth["noWallet"] = "no-wallet";
})(pathsChildrenAuth || (pathsChildrenAuth = {}));
var pathsChildrenWallet;
(function (pathsChildrenWallet) {
    pathsChildrenWallet["send"] = "send";
    pathsChildrenWallet["receive"] = "receive";
    pathsChildrenWallet["history"] = "history";
    pathsChildrenWallet["contracts"] = "contracts";
    pathsChildrenWallet["staking"] = "staking";
})(pathsChildrenWallet || (pathsChildrenWallet = {}));
var pathsChildrenContracts;
(function (pathsChildrenContracts) {
    pathsChildrenContracts["purchase"] = "purchase";
})(pathsChildrenContracts || (pathsChildrenContracts = {}));


/***/ }),

/***/ "./src/app/purchase/purchase.component.html":
/*!**************************************************!*\
  !*** ./src/app/purchase/purchase.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\"\n     fxLayout=\"column\"\n     fxLayoutAlign=\"start strech\"\n     fxFlexFill>\n    <div class=\"breadcrumbs mb-2\">\n        <div class=\"breadcrumb\">\n            <a [routerLink]=\"'/wallet/contracts'\">{{ 'BREADCRUMBS.CONTRACTS' | translate }}</a>\n        </div>\n        <div class=\"breadcrumb\"\n             *ngIf=\"newPurchase\">\n            <span>{{ 'BREADCRUMBS.NEW_PURCHASE' | translate }}</span>\n        </div>\n        <div class=\"breadcrumb\"\n             *ngIf=\"!newPurchase\">\n            <span>{{ 'BREADCRUMBS.OLD_PURCHASE' | translate }}</span>\n        </div>\n    </div>\n\n    <div class=\"scrolled-content\">\n        <div class=\"form-wrap\"\n             fxLayout=\"row\"\n             fxFlex=\"1 1 auto\">\n            <form class=\"form\"\n                  [formGroup]=\"purchaseForm\">\n                <div class=\"form__field\">\n                    <label for=\"purchase-description\">{{ 'PURCHASE.DESCRIPTION' | translate }}</label>\n                    <input class=\"form__field--input\"\n                           type=\"text\"\n                           id=\"purchase-description\"\n                           formControlName=\"description\"\n                           [placeholder]=\"'PLACEHOLDERS.DESCRIPTION_PLACEHOLDER' | translate\"\n                           maxlength=\"100\"\n                           [readonly]=\"!newPurchase\"\n                           (contextmenu)=\"variablesService.onContextMenu($event)\">\n                    <div class=\"error\"\n                         *ngIf=\"purchaseForm.controls['description'].invalid && (purchaseForm.controls['description'].dirty || purchaseForm.controls['description'].touched)\">\n                        <div *ngIf=\"newPurchase && purchaseForm.controls['description'].value.length >= 100\">\n                            {{ 'PURCHASE.FORM_ERRORS.COMMENT_MAXIMUM' | translate }}\n                        </div>\n                        <div *ngIf=\"purchaseForm.controls['description'].hasError('required')\">\n                            {{ 'PURCHASE.FORM_ERRORS.DESC_REQUIRED' | translate }}\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"form__field--row\">\n                    <div class=\"form__field form__field-dropdown\">\n                        <label for=\"purchase-seller\">{{ 'PURCHASE.SELLER' | translate }}</label>\n                        <input class=\"form__field--input\"\n                               type=\"text\"\n                               id=\"purchase-seller\"\n                               [placeholder]=\"'PLACEHOLDERS.SELLER_PLACEHOLDER' | translate\"\n                               formControlName=\"seller\"\n                               [readonly]=\"!newPurchase\"\n                               (mousedown)=\"addressMouseDown($event)\"\n                               (contextmenu)=\"(!newPurchase) ? variablesService.onContextMenuOnlyCopy($event, purchaseForm.controls['seller'].value) : variablesService.onContextMenu($event)\">\n\n                        <div class=\"dropdown py-0_5 border-radius-0_8-rem bg-light-blue-details scrolled-content\"\n                             *ngIf=\"isOpen\">\n                            <div *ngFor=\"let item of localAliases\"\n                                 class=\"item p-1 text-ellipsis\"\n                                 (click)=\"setAlias(item.name)\">{{item.name}}</div>\n                        </div>\n\n                        <div class=\"error\"\n                             *ngIf=\"purchaseForm.controls['seller'].invalid && (purchaseForm.controls['seller'].dirty || purchaseForm.controls['seller'].touched)\">\n                            <div *ngIf=\"purchaseForm.controls['seller'].errors['address_not_valid']\">\n                                {{ 'PURCHASE.FORM_ERRORS.SELLER_NOT_VALID' | translate }}\n                            </div>\n                            <div *ngIf=\"purchaseForm.controls['seller'].errors['address_same']\">\n                                {{ 'PURCHASE.FORM_ERRORS.SELLER_SAME' | translate }}\n                            </div>\n                            <div *ngIf=\"purchaseForm.controls['seller'].errors['alias_not_valid']\">\n                                {{ 'PURCHASE.FORM_ERRORS.ALIAS_NOT_VALID' | translate }}\n                            </div>\n                            <div *ngIf=\"purchaseForm.controls['seller'].hasError('required')\">\n                                {{ 'PURCHASE.FORM_ERRORS.SELLER_REQUIRED' | translate }}\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"form__field\">\n                        <label for=\"purchase-amount\">{{ 'PURCHASE.AMOUNT' | translate }}</label>\n                        <input class=\"form__field--input\"\n                               type=\"text\"\n                               id=\"purchase-amount\"\n                               formControlName=\"amount\"\n                               [placeholder]=\"'PLACEHOLDERS.AMOUNT_PLACEHOLDER' | translate\"\n                               appInputValidate=\"money\"\n                               [readonly]=\"!newPurchase\"\n                               (contextmenu)=\"variablesService.onContextMenu($event)\">\n                        <div class=\"error\"\n                             *ngIf=\"purchaseForm.controls['amount'].invalid && (purchaseForm.controls['amount'].dirty || purchaseForm.controls['amount'].touched)\">\n                            <div *ngIf=\"purchaseForm.controls['amount'].errors['amount_zero']\">\n                                {{ 'PURCHASE.FORM_ERRORS.AMOUNT_ZERO' | translate }}\n                            </div>\n                            <div *ngIf=\"purchaseForm.controls['amount'].hasError('required')\">\n                                {{ 'PURCHASE.FORM_ERRORS.AMOUNT_REQUIRED' | translate }}\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"form__field--row\">\n                    <div class=\"form__field\">\n                        <label for=\"purchase-your-deposit\">{{ ((currentContract && !currentContract.is_a) ? 'PURCHASE.BUYER_DEPOSIT' :\n                              'PURCHASE.YOUR_DEPOSIT') | translate }}</label>\n                        <input class=\"form__field--input\"\n                               type=\"text\"\n                               [placeholder]=\"'PLACEHOLDERS.DEPOSIT_PLACEHOLDER' | translate\"\n                               id=\"purchase-your-deposit\"\n                               formControlName=\"yourDeposit\"\n                               appInputValidate=\"money\"\n                               [readonly]=\"!newPurchase\"\n                               (contextmenu)=\"variablesService.onContextMenu($event)\">\n                        <div class=\"error\"\n                             *ngIf=\"purchaseForm.controls['yourDeposit'].invalid && (purchaseForm.controls['yourDeposit'].dirty || purchaseForm.controls['yourDeposit'].touched)\">\n                            <div *ngIf=\"purchaseForm.controls['yourDeposit'].hasError('required')\">\n                                {{ 'PURCHASE.FORM_ERRORS.YOUR_DEPOSIT_REQUIRED' | translate }}\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"form__field\">\n                        <div>\n                            <label\n                                  for=\"purchase-seller-deposit\">{{ ((currentContract && !currentContract.is_a) ? 'PURCHASE.YOUR_DEPOSIT' :\n                                  'PURCHASE.SELLER_DEPOSIT') | translate }}\n                            </label>\n                            <app-checkbox\n                                  class=\"ml-2\"\n                                  formControlName=\"sameAmount\"\n                                  label=\"{{ 'PURCHASE.SAME_AMOUNT' | translate }}\"\n                                  (emitChange)=\"sameAmountChange()\">\n                            </app-checkbox>\n                        </div>\n                        <input class=\"form__field--input\"\n                               type=\"text\"\n                               id=\"purchase-seller-deposit\"\n                               [value]=\"sameAmountChecked ? purchaseForm.controls['amount'].value : ''\"\n                               [placeholder]=\"'PLACEHOLDERS.SELLER_DEPOSIT_PLACEHOLDER' | translate\"\n                               formControlName=\"sellerDeposit\"\n                               appInputValidate=\"money\"\n                               [readonly]=\"!newPurchase\"\n                               (contextmenu)=\"variablesService.onContextMenu($event)\">\n                        <div class=\"error\"\n                             *ngIf=\"purchaseForm.controls['sellerDeposit'].invalid && (purchaseForm.controls['sellerDeposit'].dirty || purchaseForm.controls['sellerDeposit'].touched)\">\n                            <div *ngIf=\"purchaseForm.controls['sellerDeposit'].hasError('required')\">\n                                {{ 'PURCHASE.FORM_ERRORS.SELLER_DEPOSIT_REQUIRED' | translate }}\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"form__field\">\n                    <label for=\"purchase-comment\">{{ 'PURCHASE.COMMENT' | translate }}</label>\n                    <input class=\"form__field--input\"\n                           type=\"text\"\n                           id=\"purchase-comment\"\n                           formControlName=\"comment\"\n                           placeholder=\"{{ 'PLACEHOLDERS.COMMENT_PLACEHOLDER' | translate }}\"\n                           maxlength=\"100\"\n                           [readonly]=\"!newPurchase\"\n                           (contextmenu)=\"variablesService.onContextMenu($event)\">\n                    <div class=\"error\"\n                         *ngIf=\"newPurchase && purchaseForm.controls['comment'].value.length >= 100\">\n                        <div>\n                            {{ 'PURCHASE.FORM_ERRORS.COMMENT_MAXIMUM' | translate }}\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"form__field max-w-50-rem\"\n                     *ngIf=\"variablesService.appPass\">\n                    <label for=\"password\">{{ 'LOGIN.MASTER_PASS' | translate }}</label>\n                    <input class=\"form__field--input\"\n                           type=\"password\"\n                           id=\"password\"\n                           formControlName=\"password\"\n                           [readonly]=\"!newPurchase\"\n                           [placeholder]=\"'PLACEHOLDERS.MASTER_PASS_PLACEHOLDER' | translate\"\n                           autofocus\n                           (contextmenu)=\"variablesService.onContextMenuPasteSelect($event)\"/>\n                    <div class=\"error\"\n                         *ngIf=\"purchaseForm.controls['password'].invalid && (purchaseForm.controls['password'].dirty || purchaseForm.controls['password'].touched)\">\n                        <div *ngIf=\"purchaseForm.controls['password'].hasError('required')\">\n                            {{ 'LOGIN.FORM_ERRORS.PASS_REQUIRED' | translate }}\n                        </div>\n                    </div>\n\n                    <div class=\"error\"\n                         *ngIf=\"purchaseForm.controls.password.errors && purchaseForm.controls.password.errors.password_not_match\">\n                        <div>\n                            {{ 'LOGIN.FORM_ERRORS.MISMATCH' | translate }}\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"details mb-2\">\n                    <button type=\"button\"\n                            class=\"header\"\n                            [class.border-radius-all]=\"!additionalOptions\"\n                            (click)=\"toggleOptions()\">\n                        <span>{{ 'PURCHASE.DETAILS'| translate }}</span>\n                        <i class=\"icon ml-1\"\n                           [class.dropdown-arrow-down]=\"!additionalOptions\"\n                           [class.dropdown-arrow-up]=\"additionalOptions\"></i>\n                    </button>\n\n                    <div class=\"content\"\n                         *ngIf=\"additionalOptions\">\n                        <div class=\"form__field--row\">\n                            <div class=\"form__field\">\n                                <label for=\"purchase-fee\">{{ 'PURCHASE.FEE' | translate }}</label>\n                                <input class=\"form__field--input\"\n                                       type=\"text\"\n                                       id=\"purchase-fee\"\n                                       formControlName=\"fee\"\n                                       readonly>\n                            </div>\n                            <div class=\"form__field\"\n                                 *ngIf=\"newPurchase\">\n                                <label for=\"purchase-time\">{{ 'PURCHASE.WAITING_TIME' | translate }}</label>\n                                <ng-select id=\"purchase-time\"\n                                           class=\"custom-select\"\n                                           [clearable]=\"false\"\n                                           [searchable]=\"false\"\n                                           formControlName=\"time\">\n                                    <ng-option [value]=\"1\">1 {{ 'PURCHASE.HOUR' | translate }}</ng-option>\n                                    <ng-option *ngFor=\"let title of [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]\"\n                                               [value]=\"title\">\n                                        {{title}} {{ 'PURCHASE.HOURS' | translate }}\n                                    </ng-option>\n                                </ng-select>\n                            </div>\n                            <div class=\"form__field\">\n                                <label for=\"purchase-payment\">{{ 'PURCHASE.PAYMENT' | translate }}</label>\n                                <input class=\"form__field--input\"\n                                       type=\"text\"\n                                       id=\"purchase-payment\"\n                                       placeholder=\"{{ 'PLACEHOLDERS.PURCHASE_PAYMENT_PLACEHOLDER' | translate }}\"\n                                       formControlName=\"payment\"\n                                       [readonly]=\"!newPurchase\"\n                                       (contextmenu)=\"variablesService.onContextMenu($event)\">\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <button type=\"button\"\n                        class=\"primary big max-w-19-rem w-100\"\n                        *ngIf=\"newPurchase\"\n                        [disabled]=\"!purchaseForm.valid\"\n                        (click)=\"createPurchase()\">{{ 'PURCHASE.SEND_BUTTON' | translate }}</button>\n\n                <div class=\"purchase-states mt-2 mb-2\"\n                     fxLayout=\"column\"\n                     fxLayoutAlign=\"center center\"\n                     *ngIf=\"!newPurchase\">\n                    <ng-container\n                          *ngIf=\"currentContract.state == 1 && !currentContract.is_a && currentContract.private_detailes.b_pledge.plus(variablesService.default_fee_big).plus(variablesService.default_fee_big).isGreaterThan(variablesService.currentWallet.unlocked_balance)\">\n                        <span>{{ 'PURCHASE.NEED_MONEY' | translate }}</span>\n                    </ng-container>\n                </div>\n\n                <div class=\"purchase-buttons\"\n                     fxLayout=\"row\"\n                     fxLayoutAlign=\"start center\"\n                     *ngIf=\"!newPurchase\">\n\n                    <ng-container *ngIf=\"!currentContract.is_a && currentContract.state == 1\">\n                        <button type=\"button\"\n                                class=\"primary big\"\n                                (click)=\"acceptState();\"\n                                [disabled]=\"currentContract.private_detailes.b_pledge.plus(variablesService.default_fee_big).plus(variablesService.default_fee_big).isGreaterThan(variablesService.currentWallet.unlocked_balance)\">\n                            {{'PURCHASE.BUTTON_MAKE_PLEDGE' | translate}}\n                        </button>\n                        <button type=\"button\"\n                                class=\"outline big\"\n                                (click)=\"ignoredContract();\">\n                            {{'PURCHASE.BUTTON_IGNORE' | translate}}\n                        </button>\n                    </ng-container>\n\n                    <ng-container\n                          *ngIf=\"!showNullify && !showTimeSelect && currentContract.is_a && (currentContract.state == 201 || currentContract.state == 2 || currentContract.state == 120 || currentContract.state == 130)\">\n                        <button type=\"button\"\n                                class=\"primary big\"\n                                (click)=\"dealsDetailsFinish();\"\n                                [disabled]=\"currentContract.cancel_expiration_time == 0 && (currentContract.height == 0 || (variablesService.height_app - currentContract.height) < 10)\">\n                            {{'PURCHASE.BUTTON_RECEIVED' | translate}}\n                        </button>\n                        <button type=\"button\"\n                                class=\"outline big\"\n                                (click)=\"showNullify = true;\"\n                                [disabled]=\"currentContract.cancel_expiration_time == 0 && (currentContract.height == 0 || (variablesService.height_app - currentContract.height) < 10)\">\n                            {{'PURCHASE.BUTTON_NULLIFY' | translate}}\n                        </button>\n                        <button type=\"button\"\n                                class=\"outline big\"\n                                (click)=\"showTimeSelect = true;\"\n                                [disabled]=\"currentContract.cancel_expiration_time == 0 && (currentContract.height == 0 || (variablesService.height_app - currentContract.height) < 10)\">\n                            {{'PURCHASE.BUTTON_CANCEL_BUYER' | translate}}\n                        </button>\n                    </ng-container>\n\n                    <ng-container *ngIf=\"!currentContract.is_a && currentContract.state == 5\">\n                        <button type=\"button\"\n                                class=\"outline big\"\n                                (click)=\"dealsDetailsDontCanceling();\">\n                            {{'PURCHASE.BUTTON_NOT_CANCEL' | translate}}\n                        </button>\n                        <button type=\"button\"\n                                class=\"primary big\"\n                                (click)=\"dealsDetailsSellerCancel();\">\n                            {{'PURCHASE.BUTTON_CANCEL_SELLER' | translate}}\n                        </button>\n                    </ng-container>\n                </div>\n\n                <div class=\"nullify-block-row\"\n                     fxLayout=\"column\"\n                     fxLayoutAlign=\"center center\"\n                     *ngIf=\"showNullify\">\n                    <div>{{'PURCHASE.NULLIFY_QUESTION' | translate}}</div>\n                    <div class=\"nullify-block-buttons my-1 mx-0 w-100\"\n                         fxLayout=\"row\"\n                         fxLayoutAlign=\"center center\">\n                        <button type=\"button\"\n                                class=\"primary big\"\n                                (click)=\"showNullify = false;\">{{ 'PURCHASE.CANCEL' | translate\n                            }}</button>\n                        <button type=\"button\"\n                                class=\"primary big\"\n                                (click)=\"productNotGot();\">{{ 'PURCHASE.BUTTON_NULLIFY_SHORT' |\n                              translate }}</button>\n                    </div>\n                </div>\n\n                <div class=\"time-cancel-block-row\"\n                     fxLayout=\"column\"\n                     fxLayoutAlign=\"center center\"\n                     *ngIf=\"showTimeSelect && !newPurchase && currentContract.is_a && (currentContract.state == 201 || currentContract.state == 2 || currentContract.state == 120 || currentContract.state == 130)\">\n                    <div class=\"time-cancel-block-question mb-1\">{{ 'PURCHASE.WAITING_TIME_QUESTION' | translate }}</div>\n                    <label class=\"mb-1\"\n                           for=\"purchase-timeCancel\">{{ 'PURCHASE.WAITING_TIME' | translate }}</label>\n                    <div class=\"form__field\">\n                        <ng-select id=\"purchase-timeCancel\"\n                                   [clearable]=\"false\"\n                                   [searchable]=\"false\"\n                                   formControlName=\"timeCancel\">\n                            <ng-option [value]=\"1\">1 {{ 'PURCHASE.HOUR' | translate }}</ng-option>\n                            <ng-option *ngFor=\"let title of [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]\"\n                                       [value]=\"title\">\n                                {{title}} {{ 'PURCHASE.HOURS' | translate }}\n                            </ng-option>\n                        </ng-select>\n                    </div>\n                    <div class=\"time-cancel-block-buttons  my-1 mx-0 w-100\"\n                         fxLayout=\"row\"\n                         fxLayoutAlign=\"center center\">\n                        <button type=\"button\"\n                                class=\"outline big\"\n                                (click)=\"showTimeSelect = false;\">{{ 'PURCHASE.CANCEL' | translate\n                            }}</button>\n                        <button type=\"button\"\n                                class=\"primary big\"\n                                (click)=\"dealsDetailsCancel();\">{{ 'PURCHASE.BUTTON_CANCEL_BUYER' |\n                              translate }}</button>\n                    </div>\n                </div>\n\n            </form>\n        </div>\n    </div>\n    <!-- TODO - Do not delete, may be needed later. 12.05 decided to temporarily remove.  -->\n    <!--    <div class=\"progress-bar-container\">-->\n    <!--        <div class=\"progress-bar\">-->\n    <!--            <div class=\"progress-bar-full\"-->\n    <!--                 [style.width]=\"getProgressBarWidth()\"></div>-->\n    <!--        </div>-->\n    <!--        <div class=\"progress-labels h-100\" fxLayout=\"column\" fxLayoutAlign=\"center center\">-->\n    <!--            <ng-container *ngIf=\"newPurchase\">-->\n    <!--                <span>{{ 'PURCHASE.STATUS_MESSAGES.NEW_PURCHASE' | translate }}</span>-->\n    <!--            </ng-container>-->\n\n    <!--            <ng-container *ngIf=\"!newPurchase && currentContract.is_a\">-->\n    <!--                <span *ngIf=\"currentContract.state == 1\">{{ 'PURCHASE.STATUS_MESSAGES.WAITING_SELLER' | translate }}</span>-->\n    <!--                <span *ngIf=\"currentContract.state == 110\">{{ 'PURCHASE.STATUS_MESSAGES.IGNORED_SELLER' | translate }}</span>-->\n    <!--                <span *ngIf=\"currentContract.state == 120\">{{ 'PURCHASE.STATUS_MESSAGES.WAITING_DELIVERY' | translate }}</span>-->\n    <!--                <span *ngIf=\"currentContract.state == 130\">{{ 'PURCHASE.STATUS_MESSAGES.IGNORED_CANCEL_SELLER' | translate-->\n    <!--                    }}</span>-->\n    <!--                <span *ngIf=\"currentContract.state == 140\">{{ 'PURCHASE.STATUS_MESSAGES.EXPIRED' | translate }}</span>-->\n    <!--                <span *ngIf=\"currentContract.state == 2\">{{ 'PURCHASE.STATUS_MESSAGES.WAITING_SELLER' | translate }}</span>-->\n    <!--                <span *ngIf=\"currentContract.state == 201\">{{ 'PURCHASE.STATUS_MESSAGES.WAITING_CONFIRMATION' | translate }}-->\n    <!--                    <ng-container *ngIf=\"currentContract.height === 0\">(0/10)</ng-container>-->\n    <!--        <ng-container-->\n    <!--              *ngIf=\"currentContract.height !== 0 && (variablesService.height_app - currentContract.height) < 10\">-->\n    <!--          ({{variablesService.height_app - currentContract.height}}/10)</ng-container>-->\n    <!--      </span>-->\n    <!--                <span *ngIf=\"currentContract.state == 3\">{{ 'PURCHASE.STATUS_MESSAGES.COMPLETED' | translate }}</span>-->\n    <!--                <span *ngIf=\"currentContract.state == 4\"-->\n    <!--                      class=\"color-red\">-->\n    <!--        {{ 'PURCHASE.STATUS_MESSAGES.NOT_RECEIVED' | translate }}. {{ 'PURCHASE.STATUS_MESSAGES.NULLIFIED' | translate-->\n    <!--                    }}-->\n    <!--      </span>-->\n    <!--                <span *ngIf=\"currentContract.state == 5\">{{ 'PURCHASE.STATUS_MESSAGES.PROPOSAL_CANCEL_SELLER' | translate-->\n    <!--                    }}</span>-->\n    <!--                <span *ngIf=\"currentContract.state == 6\">{{ 'PURCHASE.STATUS_MESSAGES.CANCELLED' | translate }}</span>-->\n    <!--                <span *ngIf=\"currentContract.state == 601\">-->\n    <!--        {{ 'PURCHASE.STATUS_MESSAGES.BEING_CANCELLED' | translate }}-->\n    <!--                    <ng-container *ngIf=\"currentContract.height === 0\">(0/10)</ng-container>-->\n    <!--        <ng-container-->\n    <!--              *ngIf=\"currentContract.height !== 0 && (variablesService.height_app - currentContract.height) < 10\">-->\n    <!--          ({{variablesService.height_app - currentContract.height}}/10)</ng-container>-->\n    <!--      </span>-->\n    <!--            </ng-container>-->\n\n    <!--            <ng-container *ngIf=\"!newPurchase && !currentContract.is_a\">-->\n    <!--                <span *ngIf=\"currentContract.state == 1\">{{ 'PURCHASE.STATUS_MESSAGES.WAITING_BUYER' | translate }}</span>-->\n    <!--                <span *ngIf=\"currentContract.state == 110\">{{ 'PURCHASE.STATUS_MESSAGES.IGNORED_BUYER' | translate }}</span>-->\n    <!--                <span *ngIf=\"currentContract.state == 130\">{{ 'PURCHASE.STATUS_MESSAGES.IGNORED_CANCEL_BUYER' | translate-->\n    <!--                    }}</span>-->\n    <!--                <span *ngIf=\"currentContract.state == 140\">{{ 'PURCHASE.STATUS_MESSAGES.EXPIRED' | translate }}</span>-->\n    <!--                <span *ngIf=\"currentContract.state == 2\">{{ 'PURCHASE.STATUS_MESSAGES.WAITING_DELIVERY' | translate }}</span>-->\n    <!--                <span *ngIf=\"currentContract.state == 201\">-->\n    <!--        {{ 'PURCHASE.STATUS_MESSAGES.WAITING_CONFIRMATION' | translate }}-->\n    <!--                    <ng-container *ngIf=\"currentContract.height === 0\">(0/10)</ng-container>-->\n    <!--        <ng-container-->\n    <!--              *ngIf=\"currentContract.height !== 0 && (variablesService.height_app - currentContract.height) < 10\">-->\n    <!--          ({{variablesService.height_app - currentContract.height}}/10)</ng-container>-->\n    <!--      </span>-->\n    <!--                <span *ngIf=\"currentContract.state == 3\">{{ 'PURCHASE.STATUS_MESSAGES.COMPLETED' | translate }}</span>-->\n    <!--                <span *ngIf=\"currentContract.state == 4\"-->\n    <!--                      class=\"color-red\">-->\n    <!--        {{ 'PURCHASE.STATUS_MESSAGES.NOT_RECEIVED' | translate }}. {{ 'PURCHASE.STATUS_MESSAGES.NULLIFIED' | translate}}-->\n    <!--      </span>-->\n    <!--                <span *ngIf=\"currentContract.state == 5\">{{ 'PURCHASE.STATUS_MESSAGES.PROPOSAL_CANCEL_BUYER' | translate }}</span>-->\n    <!--                <span *ngIf=\"currentContract.state == 6\">{{ 'PURCHASE.STATUS_MESSAGES.CANCELLED' | translate }}</span>-->\n    <!--                <span *ngIf=\"currentContract.state == 601\">-->\n    <!--        {{ 'PURCHASE.STATUS_MESSAGES.BEING_CANCELLED' | translate }}-->\n    <!--                    <ng-container *ngIf=\"currentContract.height === 0\">(0/10)</ng-container>-->\n    <!--        <ng-container-->\n    <!--              *ngIf=\"currentContract.height !== 0 && (variablesService.height_app - currentContract.height) < 10\">-->\n    <!--          ({{variablesService.height_app - currentContract.height}}/10)</ng-container>-->\n    <!--      </span>-->\n    <!--            </ng-container>-->\n    <!--        </div>-->\n    <!--        <div class=\"progress-time\"-->\n    <!--             *ngIf=\"!newPurchase\">-->\n    <!--            <span *ngIf=\"currentContract.is_a && currentContract.state == 1\">-->\n    <!--                {{currentContract.expiration_time | contractTimeLeft: 0}}-->\n    <!--            </span>-->\n    <!--            <span *ngIf=\"currentContract.is_a && currentContract.state == 5\">-->\n    <!--                {{currentContract.cancel_expiration_time | contractTimeLeft: 2}}-->\n    <!--            </span>-->\n    <!--            <span *ngIf=\"!currentContract.is_a && currentContract.state == 1\">-->\n    <!--                {{currentContract.expiration_time | contractTimeLeft: 1}}-->\n    <!--            </span>-->\n    <!--            <span *ngIf=\"!currentContract.is_a && currentContract.state == 5\">-->\n    <!--                {{currentContract.cancel_expiration_time | contractTimeLeft: 1}}-->\n    <!--            </span>-->\n    <!--        </div>-->\n    <!--    </div>-->\n</div>\n"

/***/ }),

/***/ "./src/app/purchase/purchase.component.scss":
/*!**************************************************!*\
  !*** ./src/app/purchase/purchase.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL3B1cmNoYXNlL3B1cmNoYXNlLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9wdXJjaGFzZS9wdXJjaGFzZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9wdXJjaGFzZS9wdXJjaGFzZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbn1cbiIsIjpob3N0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbn0iXX0= */"

/***/ }),

/***/ "./src/app/purchase/purchase.component.ts":
/*!************************************************!*\
  !*** ./src/app/purchase/purchase.component.ts ***!
  \************************************************/
/*! exports provided: PurchaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PurchaseComponent", function() { return PurchaseComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_helpers/services/modal.service */ "./src/app/_helpers/services/modal.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _helpers_pipes_int_to_money_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../_helpers/pipes/int-to-money.pipe */ "./src/app/_helpers/pipes/int-to-money.pipe.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");











var PurchaseComponent = /** @class */ (function () {
    function PurchaseComponent(_route, _backend, _modalService, _ngZone, _location, _intToMoneyPipe, variablesService) {
        var _this = this;
        this._route = _route;
        this._backend = _backend;
        this._modalService = _modalService;
        this._ngZone = _ngZone;
        this._location = _location;
        this._intToMoneyPipe = _intToMoneyPipe;
        this.variablesService = variablesService;
        this.isOpen = false;
        this.localAliases = [];
        this.newPurchase = false;
        this.actionData = null;
        this.sameAmountChecked = false;
        this.additionalOptions = false;
        this.currentContract = null;
        this.showTimeSelect = false;
        this.showNullify = false;
        this.purchaseForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
            description: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required),
            seller: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, function (g) {
                    if (g.value === _this.variablesService.currentWallet.address) {
                        return { 'address_same': true };
                    }
                    return null;
                }, function (g) {
                    _this.localAliases = [];
                    if (g.value) {
                        if (g.value.indexOf('@') !== 0) {
                            _this.isOpen = false;
                            _this._backend.validateAddress(g.value, function (valid_status) {
                                _this._ngZone.run(function () {
                                    if (valid_status === false) {
                                        g.setErrors(Object.assign({ 'address_not_valid': true }, g.errors));
                                    }
                                    else {
                                        if (g.hasError('address_not_valid')) {
                                            delete g.errors['address_not_valid'];
                                            if (Object.keys(g.errors).length === 0) {
                                                g.setErrors(null);
                                            }
                                        }
                                    }
                                });
                            });
                            return (g.hasError('address_not_valid')) ? { 'address_not_valid': true } : null;
                        }
                        else {
                            _this.isOpen = true;
                            _this.localAliases = _this.variablesService.aliases.filter(function (item) {
                                return item.name.indexOf(g.value) > -1;
                            });
                            if (!(/^@?[a-z\d\-]{6,25}$/.test(g.value))) {
                                g.setErrors(Object.assign({ 'alias_not_valid': true }, g.errors));
                            }
                            else {
                                _this._backend.getAliasByName(g.value.replace('@', ''), function (alias_status, alias_data) {
                                    _this._ngZone.run(function () {
                                        if (alias_status) {
                                            if (alias_data.address === _this.variablesService.currentWallet.address) {
                                                g.setErrors(Object.assign({ 'address_same': true }, g.errors));
                                            }
                                            if (g.hasError('alias_not_valid')) {
                                                delete g.errors['alias_not_valid'];
                                                if (Object.keys(g.errors).length === 0) {
                                                    g.setErrors(null);
                                                }
                                            }
                                        }
                                        else {
                                            g.setErrors(Object.assign({ 'alias_not_valid': true }, g.errors));
                                        }
                                    });
                                });
                            }
                            return (g.hasError('alias_not_valid')) ? { 'alias_not_valid': true } : null;
                        }
                    }
                    return null;
                }]),
            amount: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, function (g) {
                    if (parseFloat(g.value) === 0) {
                        return { 'amount_zero': true };
                    }
                    return null;
                }]),
            yourDeposit: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required),
            sellerDeposit: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required),
            sameAmount: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]({ value: false, disabled: false }),
            comment: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](''),
            fee: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](this.variablesService.default_fee),
            time: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]({ value: 12, disabled: false }),
            timeCancel: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]({ value: 12, disabled: false }),
            payment: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](''),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('')
        });
        this._destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
    }
    PurchaseComponent.prototype.onClick = function (targetElement) {
        if (targetElement.id !== 'purchase-seller' && this.isOpen) {
            this.isOpen = false;
        }
    };
    PurchaseComponent.prototype.checkAndChangeHistory = function () {
        var _this = this;
        if (this.currentContract.state === 201) {
            this.historyBlock = this.variablesService.currentWallet.history.find(function (item) { return item.tx_type === 8 && item.contract[0].contract_id === _this.currentContract.contract_id && item.contract[0].is_a === _this.currentContract.is_a; });
        }
        else if (this.currentContract.state === 601) {
            this.historyBlock = this.variablesService.currentWallet.history.find(function (item) { return item.tx_type === 12 && item.contract[0].contract_id === _this.currentContract.contract_id && item.contract[0].is_a === _this.currentContract.is_a; });
        }
    };
    PurchaseComponent.prototype.addressMouseDown = function (e) {
        if (e['button'] === 0 && this.purchaseForm.get('seller').value && this.purchaseForm.get('seller').value.indexOf('@') === 0) {
            this.isOpen = true;
        }
    };
    PurchaseComponent.prototype.setAlias = function (alias) {
        this.purchaseForm.get('seller').setValue(alias);
    };
    PurchaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeUntil"])(this._destroy$)).subscribe(function (params) {
            if (params.hasOwnProperty('id')) {
                _this.currentContract = _this.variablesService.currentWallet.getContract(params['id']);
                _this.purchaseForm.controls['seller'].setValidators([]);
                _this.purchaseForm.updateValueAndValidity();
                _this.purchaseForm.setValue({
                    description: _this.currentContract.private_detailes.t,
                    seller: _this.currentContract.private_detailes.b_addr,
                    amount: _this._intToMoneyPipe.transform(_this.currentContract.private_detailes.to_pay),
                    yourDeposit: _this._intToMoneyPipe.transform(_this.currentContract.private_detailes.a_pledge),
                    sellerDeposit: _this._intToMoneyPipe.transform(_this.currentContract.private_detailes.b_pledge),
                    sameAmount: _this.currentContract.private_detailes.to_pay.isEqualTo(_this.currentContract.private_detailes.b_pledge),
                    comment: _this.currentContract.private_detailes.c,
                    fee: _this.variablesService.default_fee,
                    time: 12,
                    timeCancel: 12,
                    payment: _this.currentContract.payment_id,
                    password: _this.variablesService.appPass
                });
                _this.purchaseForm.get('sameAmount').disable();
                _this.newPurchase = false;
                if (_this.currentContract.is_new) {
                    if (_this.currentContract.is_a && _this.currentContract.state === 2) {
                        _this.currentContract.state = 120;
                    }
                    if (_this.currentContract.state === 130 && _this.currentContract.cancel_expiration_time !== 0 && _this.currentContract.cancel_expiration_time < _this.variablesService.exp_med_ts) {
                        _this.currentContract.state = 2;
                    }
                    _this.variablesService.settings.viewedContracts = (_this.variablesService.settings.viewedContracts) ? _this.variablesService.settings.viewedContracts : [];
                    var findViewedCont = false;
                    for (var j = 0; j < _this.variablesService.settings.viewedContracts.length; j++) {
                        if (_this.variablesService.settings.viewedContracts[j].contract_id === _this.currentContract.contract_id && _this.variablesService.settings.viewedContracts[j].is_a === _this.currentContract.is_a) {
                            _this.variablesService.settings.viewedContracts[j].state = _this.currentContract.state;
                            findViewedCont = true;
                            break;
                        }
                    }
                    if (!findViewedCont) {
                        _this.variablesService.settings.viewedContracts.push({
                            contract_id: _this.currentContract.contract_id,
                            is_a: _this.currentContract.is_a,
                            state: _this.currentContract.state
                        });
                    }
                    _this.currentContract.is_new = false;
                    setTimeout(function () {
                        _this.variablesService.currentWallet.recountNewContracts();
                    }, 0);
                }
                _this.checkAndChangeHistory();
            }
            else {
                _this.newPurchase = true;
            }
        });
        this.variablesService.getHeightAppEvent.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeUntil"])(this._destroy$)).subscribe(function (newHeight) {
            if (_this.currentContract && _this.currentContract.state === 201 && _this.currentContract.height !== 0 && (newHeight - _this.currentContract.height) >= 10) {
                _this.currentContract.state = 2;
                _this.currentContract.is_new = true;
                _this.variablesService.currentWallet.recountNewContracts();
            }
            else if (_this.currentContract && _this.currentContract.state === 601 && _this.currentContract.height !== 0 && (newHeight - _this.currentContract.height) >= 10) {
                _this.currentContract.state = 6;
                _this.currentContract.is_new = true;
                _this.variablesService.currentWallet.recountNewContracts();
            }
        });
        if (this.variablesService.appPass) {
            this.purchaseForm.controls.password.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, function (g) {
                    if (g.value) {
                        _this._backend.checkMasterPassword({ pass: g.value }, function (status) {
                            _this._ngZone.run(function () {
                                if (status === false) {
                                    g.setErrors(Object.assign({ password_not_match: true }, g.errors));
                                }
                                else {
                                    if (g.hasError('password_not_match')) {
                                        delete g.errors['password_not_match'];
                                        if (Object.keys(g.errors).length === 0) {
                                            g.setErrors(null);
                                        }
                                    }
                                }
                            });
                        });
                        return g.hasError('password_not_match')
                            ? { password_not_match: true }
                            : null;
                    }
                    return null;
                }]);
        }
        this.variablesService.sendActionData$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeUntil"])(this._destroy$)).subscribe(function (res) {
            if (res.action === 'escrow') {
                _this.actionData = res;
                _this.fillDeepLinkData();
                _this.variablesService.sendActionData$.next({});
            }
        });
    };
    PurchaseComponent.prototype.fillDeepLinkData = function () {
        this.additionalOptions = true;
        this.purchaseForm.get('description').setValue(this.actionData.description || '');
        this.purchaseForm.get('seller').setValue(this.actionData.seller_address || '');
        this.purchaseForm.get('amount').setValue(this.actionData.amount || '');
        this.purchaseForm.get('yourDeposit').setValue(this.actionData.my_deposit || '');
        this.purchaseForm.get('sellerDeposit').setValue(this.actionData.seller_deposit || '');
        this.purchaseForm.get('comment').setValue(this.actionData.comment || this.actionData.comments || '');
    };
    PurchaseComponent.prototype.toggleOptions = function () {
        this.additionalOptions = !this.additionalOptions;
    };
    PurchaseComponent.prototype.getProgressBarWidth = function () {
        var progress = '0';
        if (!this.newPurchase) {
            if (this.currentContract) {
                if (this.currentContract.state === 1) {
                    progress = '10%';
                }
                if (this.currentContract.state === 201) {
                    progress = '25%';
                }
                if ([120, 2].indexOf(this.currentContract.state) !== -1) {
                    progress = '50%';
                }
                if ([5, 601].indexOf(this.currentContract.state) !== -1) {
                    progress = '75%';
                }
                if ([110, 130, 140, 3, 4, 6].indexOf(this.currentContract.state) !== -1) {
                    progress = '100%';
                }
            }
        }
        return progress;
    };
    PurchaseComponent.prototype.sameAmountChange = function () {
        if (!this.sameAmountChecked) {
            this.purchaseForm.get('sellerDeposit').clearValidators();
            this.purchaseForm.get('sellerDeposit').updateValueAndValidity();
            this.sameAmountChecked = !this.sameAmountChecked;
        }
        else {
            this.purchaseForm.get('sellerDeposit').setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
            this.purchaseForm.get('sellerDeposit').updateValueAndValidity();
            this.sameAmountChecked = !this.sameAmountChecked;
        }
    };
    PurchaseComponent.prototype.createPurchase = function () {
        var _this = this;
        if (this.purchaseForm.valid) {
            var _a = this.purchaseForm.value, amount_1 = _a.amount, comment_1 = _a.comment, description_1 = _a.description, payment_1 = _a.payment, sameAmount = _a.sameAmount, seller = _a.seller, sellerDeposit = _a.sellerDeposit, time_1 = _a.time, yourDeposit_1 = _a.yourDeposit;
            var _b = this.variablesService.currentWallet, wallet_id_1 = _b.wallet_id, address_1 = _b.address;
            var b_pledge_1 = sameAmount ? amount_1 : sellerDeposit;
            var callback_1 = function (create_status) {
                if (create_status) {
                    _this.back();
                }
            };
            if (seller.indexOf('@') !== 0) {
                this._backend.createProposal(wallet_id_1, description_1, comment_1, address_1, seller, amount_1, yourDeposit_1, b_pledge_1, time_1, payment_1, callback_1);
            }
            else {
                this._backend.getAliasByName(seller.replace('@', ''), function (alias_status, alias_data) {
                    _this._ngZone.run(function () {
                        if (!alias_status) {
                            _this._ngZone.run(function () {
                                _this.purchaseForm.get('seller').setErrors({ 'alias_not_valid': true });
                            });
                        }
                        else {
                            _this._backend.createProposal(wallet_id_1, description_1, comment_1, address_1, alias_data.address, amount_1, yourDeposit_1, b_pledge_1, time_1, payment_1, callback_1);
                        }
                    });
                });
            }
        }
    };
    PurchaseComponent.prototype.back = function () {
        this._location.back();
    };
    PurchaseComponent.prototype.acceptState = function () {
        var _this = this;
        this._backend.acceptProposal(this.variablesService.currentWallet.wallet_id, this.currentContract.contract_id, function (accept_status) {
            if (accept_status) {
                _this._modalService.prepareModal('info', 'PURCHASE.ACCEPT_STATE_WAIT_BIG');
                _this.back();
            }
        });
    };
    PurchaseComponent.prototype.ignoredContract = function () {
        this.variablesService.settings.notViewedContracts = (this.variablesService.settings.notViewedContracts) ? this.variablesService.settings.notViewedContracts : [];
        var findViewedCont = false;
        for (var j = 0; j < this.variablesService.settings.notViewedContracts.length; j++) {
            if (this.variablesService.settings.notViewedContracts[j].contract_id === this.currentContract.contract_id && this.variablesService.settings.notViewedContracts[j].is_a === this.currentContract.is_a) {
                this.variablesService.settings.notViewedContracts[j].state = 110;
                this.variablesService.settings.notViewedContracts[j].time = this.currentContract.expiration_time;
                findViewedCont = true;
                break;
            }
        }
        if (!findViewedCont) {
            this.variablesService.settings.notViewedContracts.push({
                contract_id: this.currentContract.contract_id,
                is_a: this.currentContract.is_a,
                state: 110,
                time: this.currentContract.expiration_time
            });
        }
        this.currentContract.is_new = true;
        this.currentContract.state = 110;
        this.currentContract.time = this.currentContract.expiration_time;
        this.variablesService.currentWallet.recountNewContracts();
        this._modalService.prepareModal('info', 'PURCHASE.IGNORED_ACCEPT');
        this.back();
    };
    PurchaseComponent.prototype.productNotGot = function () {
        var _this = this;
        this._backend.releaseProposal(this.variablesService.currentWallet.wallet_id, this.currentContract.contract_id, 'REL_B', function (release_status) {
            if (release_status) {
                _this._modalService.prepareModal('info', 'PURCHASE.BURN_PROPOSAL');
                _this.back();
            }
        });
    };
    PurchaseComponent.prototype.dealsDetailsFinish = function () {
        var _this = this;
        this._backend.releaseProposal(this.variablesService.currentWallet.wallet_id, this.currentContract.contract_id, 'REL_N', function (release_status) {
            if (release_status) {
                _this._modalService.prepareModal('success', 'PURCHASE.SUCCESS_FINISH_PROPOSAL');
                _this.back();
            }
        });
    };
    PurchaseComponent.prototype.dealsDetailsCancel = function () {
        var _this = this;
        this._backend.requestCancelContract(this.variablesService.currentWallet.wallet_id, this.currentContract.contract_id, this.purchaseForm.get('timeCancel').value, function (cancel_status) {
            if (cancel_status) {
                _this._modalService.prepareModal('info', 'PURCHASE.SEND_CANCEL_PROPOSAL');
                _this.back();
            }
        });
    };
    PurchaseComponent.prototype.dealsDetailsDontCanceling = function () {
        this.variablesService.settings.notViewedContracts = this.variablesService.settings.notViewedContracts ? this.variablesService.settings.notViewedContracts : [];
        var findViewedCont = false;
        for (var j = 0; j < this.variablesService.settings.notViewedContracts.length; j++) {
            if (this.variablesService.settings.notViewedContracts[j].contract_id === this.currentContract.contract_id && this.variablesService.settings.notViewedContracts[j].is_a === this.currentContract.is_a) {
                this.variablesService.settings.notViewedContracts[j].state = 130;
                this.variablesService.settings.notViewedContracts[j].time = this.currentContract.cancel_expiration_time;
                findViewedCont = true;
                break;
            }
        }
        if (!findViewedCont) {
            this.variablesService.settings.notViewedContracts.push({
                contract_id: this.currentContract.contract_id,
                is_a: this.currentContract.is_a,
                state: 130,
                time: this.currentContract.cancel_expiration_time
            });
        }
        this.currentContract.is_new = true;
        this.currentContract.state = 130;
        this.currentContract.time = this.currentContract.cancel_expiration_time;
        this.variablesService.currentWallet.recountNewContracts();
        this._modalService.prepareModal('info', 'PURCHASE.IGNORED_CANCEL');
        this.back();
    };
    PurchaseComponent.prototype.dealsDetailsSellerCancel = function () {
        var _this = this;
        this._backend.acceptCancelContract(this.variablesService.currentWallet.wallet_id, this.currentContract.contract_id, function (accept_status) {
            if (accept_status) {
                _this._modalService.prepareModal('info', 'PURCHASE.DEALS_CANCELED_WAIT');
                _this.back();
            }
        });
    };
    PurchaseComponent.prototype.ngOnDestroy = function () {
        this._destroy$.next();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('document:click', ['$event.target']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], PurchaseComponent.prototype, "onClick", null);
    PurchaseComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-purchase',
            template: __webpack_require__(/*! ./purchase.component.html */ "./src/app/purchase/purchase.component.html"),
            styles: [__webpack_require__(/*! ./purchase.component.scss */ "./src/app/purchase/purchase.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__["BackendService"],
            _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_6__["ModalService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"],
            _helpers_pipes_int_to_money_pipe__WEBPACK_IMPORTED_MODULE_8__["IntToMoneyPipe"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_5__["VariablesService"]])
    ], PurchaseComponent);
    return PurchaseComponent;
}());



/***/ }),

/***/ "./src/app/receive/receive.component.html":
/*!************************************************!*\
  !*** ./src/app/receive/receive.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container overflow-auto\"\n     fxLayout=\"column\"\n     fxLayoutAlign=\"center center\"\n     fxFlexFill>\n    <div class=\"wrap-qr overflow-hidden border-radius-0_8-rem mb-2\"\n         fxLayout=\"column\"\n         fxFlex=\"0 0 auto\"\n         fxLayoutAlign=\"center center\">\n        <img src=\"{{qrImageSrc}}\"\n             alt=\"qr-code\">\n    </div>\n\n    <div class=\"address border-radius-0_8-rem overflow-hidden pl-1 pr-0_5 pt-0_5 pb-0_5\"\n         fxLayout=\"row\"\n         fxFlex=\"0 0 auto\"\n         fxLayoutAlign=\"space-between center\">\n        <span\n          [tooltip]=\"variablesService.currentWallet.address\"\n          [placement]=\"'bottom'\"\n          [tooltipClass]=\"'table-tooltip'\"\n          [delay]=\"150\"\n          [timeout]=\"0\"\n          class=\"text-ellipsis mr-1\">{{ variablesService.currentWallet.address | slice:0:9 }}...{{ variablesService.currentWallet.address | slice:-9 }}</span>\n        <button (click)=\"copyAddress()\"\n                class=\"btn-icon circle small\">\n            <i class=\"icon small\"\n               [class.copy]=\"!copyAnimation\"\n               [class.check]=\"copyAnimation\"></i>\n        </button>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/receive/receive.component.scss":
/*!************************************************!*\
  !*** ./src/app/receive/receive.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL3JlY2VpdmUvcmVjZWl2ZS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvcmVjZWl2ZS9yZWNlaXZlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL3JlY2VpdmUvcmVjZWl2ZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbn1cbiIsIjpob3N0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbn0iXX0= */"

/***/ }),

/***/ "./src/app/receive/receive.component.ts":
/*!**********************************************!*\
  !*** ./src/app/receive/receive.component.ts ***!
  \**********************************************/
/*! exports provided: ReceiveComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReceiveComponent", function() { return ReceiveComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var qrcode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! qrcode */ "./node_modules/qrcode/lib/browser.js");
/* harmony import */ var qrcode__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(qrcode__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_shared/constants */ "./src/app/_shared/constants.ts");






var ReceiveComponent = /** @class */ (function () {
    function ReceiveComponent(backend, variablesService) {
        this.backend = backend;
        this.variablesService = variablesService;
        this.copyAnimation = false;
    }
    ReceiveComponent.prototype.ngOnInit = function () {
        var _this = this;
        qrcode__WEBPACK_IMPORTED_MODULE_2___default.a.toDataURL(this.variablesService.currentWallet.address, {
            width: 200 * _shared_constants__WEBPACK_IMPORTED_MODULE_5__["RCV_ADDR_QR_SCALE"],
            height: 200 * _shared_constants__WEBPACK_IMPORTED_MODULE_5__["RCV_ADDR_QR_SCALE"]
        }).then(function (url) {
            _this.qrImageSrc = url;
        }).catch(function (err) {
            console.error(err);
        });
    };
    ReceiveComponent.prototype.copyAddress = function () {
        var _this = this;
        this.backend.setClipboard(this.variablesService.currentWallet.address);
        this.copyAnimation = true;
        this.copyAnimationTimeout = window.setTimeout(function () {
            _this.copyAnimation = false;
        }, 2000);
    };
    ReceiveComponent.prototype.ngOnDestroy = function () {
        clearTimeout(this.copyAnimationTimeout);
    };
    ReceiveComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-receive',
            template: __webpack_require__(/*! ./receive.component.html */ "./src/app/receive/receive.component.html"),
            styles: [__webpack_require__(/*! ./receive.component.scss */ "./src/app/receive/receive.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_3__["BackendService"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_4__["VariablesService"]])
    ], ReceiveComponent);
    return ReceiveComponent;
}());



/***/ }),

/***/ "./src/app/restore-wallet/restore-wallet.component.html":
/*!**************************************************************!*\
  !*** ./src/app/restore-wallet/restore-wallet.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"page-container\">\n\n    <div class=\"toolbar mb-2\">\n        <div class=\"left\">\n            <button type=\"button\"\n                    class=\"btn-icon circle big mr-2\"\n                    (click)=\"back()\">\n                <i class=\"icon dropdown-arrow-left\"></i>\n            </button>\n            <h1>{{ 'BREADCRUMBS.ADD_WALLET' | translate }}</h1>\n        </div>\n        <div class=\"right\"></div>\n    </div>\n\n    <div class=\"page-content\">\n        <div class=\"breadcrumbs mb-2\">\n            <div class=\"breadcrumb\">\n                <a [routerLink]=\"['/add-wallet']\">{{'BREADCRUMBS.ADD_WALLET' | translate }}</a>\n            </div>\n            <div class=\"breadcrumb\">\n                <span>{{'BREADCRUMBS.RESTORE_WALLET' | translate}}</span>\n            </div>\n        </div>\n\n        <div class=\"scrolled-content\">\n            <form class=\"form\"\n                  [formGroup]=\"restoreForm\">\n\n                <div class=\"form__field\">\n                    <label for=\"wallet-name\">{{ 'RESTORE_WALLET.LABEL_NAME' | translate }}</label>\n                    <input class=\"form__field--input\"\n                           type=\"text\"\n                           id=\"wallet-name\"\n                           formControlName=\"name\"\n                           [placeholder]=\"'PLACEHOLDERS.WALLET_NAME_PLACEHOLDER' | translate\"\n                           [attr.readonly]=\"walletSaved ? '' : null\"\n                           [maxLength]=\"variablesService.maxWalletNameLength\"\n                           (contextmenu)=\"variablesService.onContextMenu($event)\">\n                    <div class=\"error\"\n                         *ngIf=\"restoreForm.controls['name'].invalid && (restoreForm.controls['name'].dirty || restoreForm.controls['name'].touched)\">\n                        <div *ngIf=\"restoreForm.controls['name'].errors['duplicate']\">\n                            {{ 'RESTORE_WALLET.FORM_ERRORS.NAME_DUPLICATE' | translate }}\n                        </div>\n                        <div *ngIf=\"restoreForm.get('name').value.length >= variablesService.maxWalletNameLength\">\n                            {{ 'RESTORE_WALLET.FORM_ERRORS.MAX_LENGTH' | translate }}\n                        </div>\n                        <div *ngIf=\"restoreForm.get('name').value.length >= variablesService.maxWalletNameLength\">\n                            {{ 'RESTORE_WALLET.FORM_ERRORS.MAX_LENGTH' | translate }}\n                        </div>\n                        <div *ngIf=\"restoreForm.controls['name'].errors['required']\">\n                            {{ 'RESTORE_WALLET.FORM_ERRORS.NAME_REQUIRED' | translate }}\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"form__field\">\n                    <label for=\"wallet-password\">{{ 'RESTORE_WALLET.PASS' | translate }}</label>\n                    <input class=\"form__field--input\"\n                           type=\"password\"\n                           id=\"wallet-password\"\n                           placeholder=\"{{ 'PLACEHOLDERS.WALET_PASSWORD_PLACEHOLDER' | translate }}\"\n                           formControlName=\"password\"\n                           [attr.readonly]=\"walletSaved ? '' : null\"\n                           (contextmenu)=\"variablesService.onContextMenuPasteSelect($event)\">\n                    <div class=\"error\"\n                         *ngIf=\"restoreForm.controls['password'].dirty && restoreForm.controls['password'].errors\">\n                        <div *ngIf=\"restoreForm.controls['password'].errors.pattern\">\n                            {{ 'ERRORS.WRONG_PASSWORD' | translate }}\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"form__field\">\n                    <label for=\"confirm-wallet-password\">{{ 'RESTORE_WALLET.CONFIRM' | translate }}</label>\n                    <input class=\"form__field--input\"\n                           type=\"password\"\n                           id=\"confirm-wallet-password\"\n                           placeholder=\"{{ 'PLACEHOLDERS.CONFIRM_WALET_PASSWORD_PLACEHOLDER' | translate }}\"\n                           formControlName=\"confirm\"\n                           [class.invalid]=\"restoreForm.controls['password'].dirty && restoreForm.controls['confirm'].dirty && restoreForm.errors && restoreForm.get('confirm').value.length > 0\"\n                           [attr.readonly]=\"walletSaved ? '' : null\"\n                           (contextmenu)=\"variablesService.onContextMenuPasteSelect($event)\">\n                    <div class=\"error\"\n                         *ngIf=\"restoreForm.controls['password'].dirty && restoreForm.controls['confirm'].dirty && restoreForm.errors && restoreForm.get('confirm').value.length > 0\">\n                        <div *ngIf=\"restoreForm.errors['confirm_mismatch']\">\n                            {{ 'RESTORE_WALLET.FORM_ERRORS.CONFIRM_NOT_MATCH' | translate }}\n                        </div>\n                    </div>\n                </div>\n                <div class=\"form__field\">\n                    <label for=\"phrase-key\">{{ 'RESTORE_WALLET.LABEL_PHRASE_KEY' | translate }}</label>\n                    <input class=\"form__field--input\"\n                           type=\"text\"\n                           id=\"phrase-key\"\n                           formControlName=\"key\"\n                           [placeholder]=\"'PLACEHOLDERS.SEED_PHRASE_PLACEHOLDER' | translate\"\n                           [attr.readonly]=\"walletSaved ? '' : null\"\n                           (contextmenu)=\"variablesService.onContextMenu($event)\">\n                    <div class=\"error\"\n                         *ngIf=\"restoreForm.controls['key'].invalid && (restoreForm.controls['key'].dirty || restoreForm.controls['key'].touched)\">\n                        <div *ngIf=\"restoreForm.controls['key'].errors['required']\">\n                            {{ 'RESTORE_WALLET.FORM_ERRORS.KEY_REQUIRED' | translate }}\n                        </div>\n                    </div>\n\t\t\t\t\t<div class=\"error\" *ngIf=\"(restoreForm.controls['key'].dirty || restoreForm.controls['key'].touched) && !this.seedPhraseInfo?.syntax_correct\">\n\t\t\t\t\t\t{{ 'Seed phrase not valid' | translate }}\n\t\t\t\t\t</div>\n                </div>\n                <div class=\"form__field\"\n                     *ngIf=\"this.seedPhraseInfo?.syntax_correct && this.seedPhraseInfo?.require_password\">\n                    <label for=\"seed-password\">{{ 'RESTORE_WALLET.SEED_PASSWORD' | translate }}</label>\n                    <input class=\"form__field--input\"\n                           type=\"password\"\n                           id=\"seed-password\"\n                           placeholder=\"{{ 'PLACEHOLDERS.SEED_PHRASE_PLACEHOLDER' | translate }}\"\n                           formControlName=\"seedPassword\">\n                    <div class=\"error\"\n                         *ngIf=\"(restoreForm.controls['seedPassword'].dirty || restoreForm.controls['seedPassword'].touched) && !this.seedPhraseInfo?.hash_sum_matched\">\n                        <span>{{ 'RESTORE_WALLET.FORM_ERRORS.INCORRECT_PASSWORD' | translate }}</span>\n                    </div>\n                    <div class=\"success\"\n                         *ngIf=\"this.seedPhraseInfo?.hash_sum_matched\">\n                        <span>{{ 'RESTORE_WALLET.OK' | translate }}</span>\n                    </div>\n                </div>\n\n\n                <button type=\"button\"\n                        class=\"outline big w-100 mb-2\"\n                        *ngIf=\"walletSaved\"\n                        disabled>\n                    <i class=\"icon\"></i>\n                    {{walletSavedName}}\n                </button>\n                <button type=\"button\"\n                        class=\"outline big w-100 mb-2\"\n                        (click)=\"saveWallet()\"\n                        [disabled]=\"(!this.seedPhraseInfo?.syntax_correct || !this.seedPhraseInfo?.require_password || !this.seedPhraseInfo?.hash_sum_matched) && (!this.seedPhraseInfo?.syntax_correct || this.seedPhraseInfo?.require_password)\"\n                        *ngIf=\"!walletSaved\">{{ 'RESTORE_WALLET.BUTTON_SELECT' | translate }}</button>\n                <button type=\"button\"\n                        class=\"primary big w-100 mb-2\"\n                        (click)=\"createWallet()\"\n                        [disabled]=\"!walletSaved\">{{'RESTORE_WALLET.BUTTON_CREATE' | translate }}</button>\n            </form>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/restore-wallet/restore-wallet.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/restore-wallet/restore-wallet.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL3Jlc3RvcmUtd2FsbGV0L3Jlc3RvcmUtd2FsbGV0LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9yZXN0b3JlLXdhbGxldC9yZXN0b3JlLXdhbGxldC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL3Jlc3RvcmUtd2FsbGV0L3Jlc3RvcmUtd2FsbGV0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuIiwiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/restore-wallet/restore-wallet.component.ts":
/*!************************************************************!*\
  !*** ./src/app/restore-wallet/restore-wallet.component.ts ***!
  \************************************************************/
/*! exports provided: RestoreWalletComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RestoreWalletComponent", function() { return RestoreWalletComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_helpers/services/modal.service */ "./src/app/_helpers/services/modal.service.ts");
/* harmony import */ var _helpers_models_wallet_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_helpers/models/wallet.model */ "./src/app/_helpers/models/wallet.model.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var rxjs_internal_Subject__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/internal/Subject */ "./node_modules/rxjs/internal/Subject.js");
/* harmony import */ var rxjs_internal_Subject__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_Subject__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");












var RestoreWalletComponent = /** @class */ (function () {
    function RestoreWalletComponent(router, backend, variablesService, modalService, ngZone, location, translate) {
        var _this = this;
        this.router = router;
        this.backend = backend;
        this.variablesService = variablesService;
        this.modalService = modalService;
        this.ngZone = ngZone;
        this.location = location;
        this.translate = translate;
        this.restoreForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                function (g) {
                    for (var i = 0; i < _this.variablesService.wallets.length; i++) {
                        if (g.value === _this.variablesService.wallets[i].name) {
                            return { duplicate: true };
                        }
                    }
                    return null;
                },
            ]),
            key: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern(this.variablesService.pattern)),
            confirm: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](''),
            seedPassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern(this.variablesService.pattern)),
        }, function (g) {
            return g.get('password').value === g.get('confirm').value
                ? null
                : { confirm_mismatch: true };
        });
        this.wallet = {
            id: '',
        };
        this.walletSaved = false;
        this.walletSavedName = '';
        this.progressWidth = '9rem';
        this.seedPhraseInfo = null;
        this.unsubscribeAll = new rxjs_internal_Subject__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
    }
    RestoreWalletComponent.prototype.ngOnInit = function () {
        this.checkValidSeedPhrasePassword();
        this.changeDetectionSeedPhrasePassword();
    };
    RestoreWalletComponent.prototype.ngOnDestroy = function () {
        this.unsubscribeAll.next(true);
        this.unsubscribeAll.complete();
    };
    RestoreWalletComponent.prototype.changeDetectionSeedPhrasePassword = function () {
        var _this = this;
        this.restoreForm.controls.seedPassword.valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["startWith"])(null), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["pairwise"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeUntil"])(this.unsubscribeAll))
            .subscribe(function () {
            _this.checkValidSeedPhrasePassword();
        });
        this.restoreForm.controls.key.valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["startWith"])(null), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["pairwise"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeUntil"])(this.unsubscribeAll))
            .subscribe(function () {
            _this.checkValidSeedPhrasePassword();
        });
    };
    RestoreWalletComponent.prototype.checkValidSeedPhrasePassword = function () {
        var _this = this;
        var seed_password = this.restoreForm.controls.seedPassword.value;
        var seed_phrase = this.restoreForm.controls.key.value;
        this.backend.getSeedPhraseInfo({ seed_phrase: seed_phrase, seed_password: seed_password }, function (status, data) {
            _this.ngZone.run(function () {
                _this.seedPhraseInfo = data;
            });
        });
    };
    RestoreWalletComponent.prototype.createWallet = function () {
        var _this = this;
        this.ngZone.run(function () {
            _this.progressWidth = '100%';
            _this.runWallet();
        });
    };
    RestoreWalletComponent.prototype.saveWallet = function () {
        var _this = this;
        if (this.restoreForm.valid &&
            this.restoreForm.get('name').value.length <=
                this.variablesService.maxWalletNameLength) {
            this.backend.isValidRestoreWalletText({
                seed_phrase: this.restoreForm.get('key').value,
                seed_password: this.restoreForm.get('seedPassword').value,
            }, function (valid_status, valid_data) {
                if (valid_data !== 'TRUE') {
                    _this.ngZone.run(function () {
                        _this.restoreForm.get('key').setErrors({ key_not_valid: true });
                    });
                }
                else {
                    _this.backend.saveFileDialog(_this.translate.instant('RESTORE_WALLET.CHOOSE_PATH'), '*', _this.variablesService.settings.default_path, function (save_status, save_data) {
                        if (save_status) {
                            _this.variablesService.settings.default_path = save_data.path.substr(0, save_data.path.lastIndexOf('/'));
                            _this.walletSavedName = save_data.path.substr(save_data.path.lastIndexOf('/') + 1, save_data.path.length - 1);
                            _this.backend.restoreWallet(save_data.path, _this.restoreForm.get('password').value, _this.restoreForm.get('key').value, _this.restoreForm.get('seedPassword').value, function (restore_status, restore_data) {
                                if (restore_status) {
                                    _this.wallet.id = restore_data.wallet_id;
                                    _this.variablesService.opening_wallet = new _helpers_models_wallet_model__WEBPACK_IMPORTED_MODULE_7__["Wallet"](restore_data.wallet_id, _this.restoreForm.get('name').value, _this.restoreForm.get('password').value, restore_data['wi'].path, restore_data['wi'].address, restore_data['wi'].balance, restore_data['wi'].unlocked_balance, restore_data['wi'].mined_total, restore_data['wi'].tracking_hey);
                                    _this.variablesService.opening_wallet.is_auditable =
                                        restore_data['wi'].is_auditable;
                                    _this.variablesService.opening_wallet.is_watch_only =
                                        restore_data['wi'].is_watch_only;
                                    _this.variablesService.opening_wallet.currentPage = 1;
                                    _this.variablesService.opening_wallet.alias = _this.backend.getWalletAlias(_this.variablesService.opening_wallet.address);
                                    _this.variablesService.opening_wallet.pages = new Array(1).fill(1);
                                    _this.variablesService.opening_wallet.totalPages = 1;
                                    _this.variablesService.opening_wallet.currentPage = 1;
                                    _this.variablesService.opening_wallet.total_history_item = 0;
                                    _this.variablesService.opening_wallet.restore = true;
                                    if (restore_data.recent_history &&
                                        restore_data.recent_history.history) {
                                        _this.variablesService.opening_wallet.totalPages = Math.ceil(restore_data.recent_history.total_history_items /
                                            _this.variablesService.count);
                                        _this.variablesService.opening_wallet.totalPages >
                                            _this.variablesService.maxPages
                                            ? (_this.variablesService.opening_wallet.pages = new Array(5)
                                                .fill(1)
                                                .map(function (value, index) { return value + index; }))
                                            : (_this.variablesService.opening_wallet.pages = new Array(_this.variablesService.opening_wallet.totalPages)
                                                .fill(1)
                                                .map(function (value, index) { return value + index; }));
                                        _this.variablesService.opening_wallet.prepareHistory(restore_data.recent_history.history);
                                    }
                                    _this.backend.getContracts(_this.variablesService.opening_wallet.wallet_id, function (contracts_status, contracts_data) {
                                        if (contracts_status &&
                                            contracts_data.hasOwnProperty('contracts')) {
                                            _this.ngZone.run(function () {
                                                _this.variablesService.opening_wallet.prepareContractsAfterOpen(contracts_data.contracts, _this.variablesService.exp_med_ts, _this.variablesService.height_app, _this.variablesService.settings
                                                    .viewedContracts, _this.variablesService.settings
                                                    .notViewedContracts);
                                            });
                                        }
                                    });
                                    _this.ngZone.run(function () {
                                        _this.walletSaved = true;
                                        _this.progressWidth = '50%';
                                    });
                                }
                                else {
                                    _this.modalService.prepareModal('error', 'RESTORE_WALLET.NOT_CORRECT_FILE_OR_PASSWORD');
                                }
                            });
                        }
                    });
                }
            });
        }
    };
    RestoreWalletComponent.prototype.runWallet = function () {
        var _this = this;
        // add flag when wallet was restored form seed
        this.variablesService.after_sync_request[this.wallet.id] = true;
        var exists = false;
        this.variablesService.wallets.forEach(function (wallet) {
            if (wallet.address === _this.variablesService.opening_wallet.address) {
                exists = true;
            }
        });
        if (!exists) {
            this.backend.runWallet(this.wallet.id, function (run_status, run_data) {
                if (run_status) {
                    _this.variablesService.wallets.push(_this.variablesService.opening_wallet);
                    if (_this.variablesService.appPass) {
                        _this.backend.storeSecureAppData();
                    }
                    _this.ngZone.run(function () {
                        _this.variablesService.setCurrentWallet(_this.wallet.id);
                        _this.router.navigate(['/wallet/']);
                    });
                }
                else {
                    console.log(run_data['error_code']);
                }
            });
        }
        else {
            this.variablesService.opening_wallet = null;
            this.modalService.prepareModal('error', 'OPEN_WALLET.WITH_ADDRESS_ALREADY_OPEN');
            this.backend.closeWallet(this.wallet.id, function () {
                _this.ngZone.run(function () {
                    _this.router.navigate(['/']);
                });
            });
        }
    };
    RestoreWalletComponent.prototype.back = function () {
        this.location.back();
    };
    RestoreWalletComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-restore-wallet',
            template: __webpack_require__(/*! ./restore-wallet.component.html */ "./src/app/restore-wallet/restore-wallet.component.html"),
            styles: [__webpack_require__(/*! ./restore-wallet.component.scss */ "./src/app/restore-wallet/restore-wallet.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__["BackendService"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_5__["VariablesService"],
            _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_6__["ModalService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            _angular_common__WEBPACK_IMPORTED_MODULE_11__["Location"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"]])
    ], RestoreWalletComponent);
    return RestoreWalletComponent;
}());



/***/ }),

/***/ "./src/app/seed-phrase/seed-phrase.component.html":
/*!********************************************************!*\
  !*** ./src/app/seed-phrase/seed-phrase.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"page-container\">\n\n    <div class=\"toolbar mb-2\">\n        <div class=\"left\">\n            <button type=\"button\"\n                    class=\"btn-icon circle big mr-2\"\n                    (click)=\"back()\">\n                <i class=\"icon dropdown-arrow-left\"></i>\n            </button>\n            <h1>{{ 'BREADCRUMBS.ADD_WALLET' | translate }}</h1>\n        </div>\n        <div class=\"right\"></div>\n    </div>\n\n    <div class=\"page-content\">\n        <div class=\"breadcrumbs mb-2\">\n            <div class=\"breadcrumb\">\n                <a [routerLink]=\"['/add-wallet']\">{{'BREADCRUMBS.ADD_WALLET' | translate }}</a>\n            </div>\n            <div class=\"breadcrumb\">\n                <span>{{'BREADCRUMBS.SAVE_PHRASE' | translate}}</span>\n            </div>\n        </div>\n\n        <div class=\"scrolled-content\">\n            <div class=\"wrap-seed-phrase\"\n                 fxFlex=\"100\"\n                 fxLayout=\"column\">\n                <form class=\"form\"\n                      [formGroup]=\"detailsForm\">\n                    <div class=\"form__field\">\n                        <label>{{ 'WALLET_DETAILS.LABEL_NAME' | translate }}</label>\n                        <input class=\"form__field--input\"\n                               type=\"text\"\n                               id=\"wallet-name\"\n                               formControlName=\"name\"\n                               [placeholder]=\"'PLACEHOLDERS.WALLET_NAME_PLACEHOLDER' | translate\"\n                               [maxLength]=\"variablesService.maxWalletNameLength\"\n                               (contextmenu)=\"variablesService.onContextMenu($event)\"\n                               readonly>\n                        <div class=\"error\"\n                             *ngIf=\"detailsForm.controls['name'].invalid && (detailsForm.controls['name'].dirty || detailsForm.controls['name'].touched)\">\n                            <div *ngIf=\"detailsForm.controls['name'].errors['duplicate']\">\n                                {{ 'WALLET_DETAILS.FORM_ERRORS.NAME_DUPLICATE' | translate }}\n                            </div>\n                            <div *ngIf=\"detailsForm.get('name').value.length >= variablesService.maxWalletNameLength\">\n                                {{ 'WALLET_DETAILS.FORM_ERRORS.MAX_LENGTH' | translate }}\n                            </div>\n                            <div *ngIf=\"detailsForm.controls['name'].errors['required']\">\n                                {{ 'WALLET_DETAILS.FORM_ERRORS.NAME_REQUIRED' | translate }}\n                            </div>\n                        </div>\n\n                    </div>\n\n                    <div class=\"form__field\">\n                        <label for=\"wallet-location\">{{ 'WALLET_DETAILS.LABEL_FILE_LOCATION' | translate }}</label>\n                        <input class=\"form__field--input\"\n                               type=\"text\"\n                               id=\"wallet-location\"\n                               formControlName=\"path\"\n                               readonly>\n                    </div>\n                </form>\n\n                <ng-container *ngIf=\"!showSeed else seedPhraseContent\">\n                    <form class=\"form bg-light-blue-details p-2\"\n                          [formGroup]=\"seedPhraseForm\"\n                          (ngSubmit)=\"onSubmitSeed()\">\n\n                        <div class=\"form__field\">\n                            <label for=\"create-password\">{{ 'WALLET_DETAILS.CREATE_PASSWORD_SECURE' | translate }}</label>\n                            <input class=\"form__field--input\"\n                                   type=\"password\"\n                                   placeholder=\"{{ 'PLACEHOLDERS.PASSWORD_PLACEHOLDER' | translate }}\"\n                                   id=\"create-password\"\n                                   formControlName=\"password\">\n                        </div>\n\n                        <div class=\"form__field\">\n                            <label for=\"confirm-password\">{{ 'WALLET_DETAILS.FORM.CONFIRM_PASSWORD' | translate }}</label>\n                            <input class=\"form__field--input\"\n                                   type=\"password\"\n                                   placeholder=\"{{'PLACEHOLDERS.PLACEHOLDER_CONFIRM' | translate}}\"\n                                   id=\"confirm-password\"\n                                   [class.invalid]=\"seedPhraseForm.invalid && seedPhraseForm.get('confirmPassword').value.length > 0\"\n                                   formControlName=\"confirmPassword\">\n                            <div class=\"error\"\n                                 *ngIf=\"seedPhraseForm.invalid && (seedPhraseForm.controls['confirmPassword'].dirty || seedPhraseForm.controls['confirmPassword'].touched)\">\n                                <div *ngIf=\"seedPhraseForm.invalid && seedPhraseForm.get('confirmPassword').value.length > 0\">\n                                    {{ 'WALLET_DETAILS.FORM_ERRORS.PASSWORDS_DONT_MATCH' | translate }}\n                                </div>\n                            </div>\n                        </div>\n\n                        <button type=\"submit\"\n                                class=\"primary w-100 big mb-2\"\n                                [disabled]=\"!seedPhraseForm.valid\">\n                            <i class=\"icon check-shield mr-1\"></i>\n                            {{ 'WALLET_DETAILS.FORM.GENERATE_SECURE_SEED' | translate }}\n                        </button>\n\n                        <p class=\"text-align-center color-primary\">\n                            <i class=\"icon info-circle mr-1\"></i>\n                            {{ 'WALLET_DETAILS.FORM.SECURED_SEED_WILL_REQUIRE' | translate }}\n                        </p>\n                    </form>\n                </ng-container>\n\n                <ng-template #seedPhraseContent>\n                    <div class=\"seed-phrase bg-light-blue-details p-2 border-radius-0_8-rem\">\n                        <div class=\"header mb-2\"\n                             fxLayout=\"row\"\n                             fxLayoutAlign=\"space-between center\">\n                            <div class=\"left\">\n                                <span>{{ 'WALLET_DETAILS.LABEL_SEED_PHRASE' | translate }}</span>\n                            </div>\n                            <div class=\"right\">\n                                <span class=\"status color-red\"\n                                      fxLayout=\"row\"\n                                      fxLayoutAlign=\"start center\"\n                                      *ngIf=\"seedPhraseForm.controls.password.value.length == 0\">\n                                    {{ 'WALLET_DETAILS.SEED_IS_UNSECURED' | translate }}\n                                    <i class=\"icon unsecured ml-1\"></i>\n                                </span>\n                                <span class=\"status color-aqua\"\n                                      fxLayout=\"row\"\n                                      fxLayoutAlign=\"start center\"\n                                      *ngIf=\"seedPhraseForm.controls.password.value.length > 0\">\n                                    {{ 'WALLET_DETAILS.SEED_IS_SECURED' | translate }}\n                                    <i class=\"icon secured ml-1\"></i>\n                                </span>\n                            </div>\n                        </div>\n                        <div class=\"content mb-1\"\n                             fxLayout=\"row wrap\"\n                             (contextmenu)=\"variablesService.onContextMenuOnlyCopy($event, seedPhrase)\">\n                            <ng-container *ngFor=\"let word of seedPhrase.split(' '); let index = index\">\n                                <div class=\"item p-1 mr-1 mb-1 border-radius-0_8-rem\"\n                                     fxLayout=\"row nowrap\"\n                                     fxLayoutAlign=\"start center\">\n                                    <div class=\"number p-1 mr-1\"\n                                         fxLayout=\"row\"\n                                         fxLayoutAlign=\"center center\">{{ index + 1 }}</div>\n                                    <span class=\"word\">{{ word }}</span>\n                                </div>\n                            </ng-container>\n                        </div>\n                        <div class=\"footer max-w-50-rem w-100\"\n                             fxLayout=\"column\"\n                             fxLayoutAlign=\"start center\">\n                            <div class=\"wrap-buttons w-100 mb-2\"\n                                 fxLayout=\"row nowrap\"\n                                 *ngIf=\"showSeed\">\n                                <button type=\"button\"\n                                        class=\"outline big w-100\"\n                                        (click)=\"copySeedPhrase()\">\n                                    <ng-container *ngIf=\"!seedPhraseCopied\">\n                                        <i class=\"icon copy mr-1\"></i>\n                                        {{ 'SEED_PHRASE.BUTTON_COPY' | translate }}\n                                    </ng-container>\n                                    <ng-container *ngIf=\"seedPhraseCopied\">\n                                        <i class=\"icon check mr-1\"></i>\n                                        {{ 'SEED_PHRASE.BUTTON_COPIED' | translate }}\n                                    </ng-container>\n                                </button>\n                            </div>\n                            <p class=\"text-align-center\"\n                               *ngIf=\"seedPhraseForm.controls.password.value.length > 0\">\n                                <i class=\"icon info-circle mr-1\"></i>\n                                <span class=\"color-primary\">{{ 'WALLET_DETAILS.REMEMBER_YOU_WILL_REQUIRE' | translate}}</span>\n                            </p>\n                        </div>\n                    </div>\n                </ng-template>\n            </div>\n        </div>\n    </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/seed-phrase/seed-phrase.component.scss":
/*!********************************************************!*\
  !*** ./src/app/seed-phrase/seed-phrase.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL3NlZWQtcGhyYXNlL3NlZWQtcGhyYXNlLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zZWVkLXBocmFzZS9zZWVkLXBocmFzZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL3NlZWQtcGhyYXNlL3NlZWQtcGhyYXNlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuIiwiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/seed-phrase/seed-phrase.component.ts":
/*!******************************************************!*\
  !*** ./src/app/seed-phrase/seed-phrase.component.ts ***!
  \******************************************************/
/*! exports provided: SeedPhraseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SeedPhraseComponent", function() { return SeedPhraseComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_helpers/services/modal.service */ "./src/app/_helpers/services/modal.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _helpers_services_wallets_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../_helpers/services/wallets.service */ "./src/app/_helpers/services/wallets.service.ts");









var SeedPhraseComponent = /** @class */ (function () {
    function SeedPhraseComponent(route, router, location, backend, variablesService, walletsService, modalService, ngZone) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.location = location;
        this.backend = backend;
        this.variablesService = variablesService;
        this.walletsService = walletsService;
        this.modalService = modalService;
        this.ngZone = ngZone;
        this.seedPhrase = '';
        this.showSeed = false;
        this.seedPhraseCopied = false;
        this.progressWidth = '66%';
        this.detailsForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormGroup"]({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required,
                function (g) {
                    for (var i = 0; i < _this.variablesService.wallets.length; i++) {
                        if (g.value === _this.variablesService.wallets[i].name) {
                            if (_this.variablesService.wallets[i].wallet_id ===
                                _this.variablesService.currentWallet.wallet_id) {
                                return { same: true };
                            }
                            else {
                                return { duplicate: true };
                            }
                        }
                    }
                    return null;
                },
            ]),
            path: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](''),
        });
        this.seedPhraseForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormGroup"]({
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].pattern(this.variablesService.pattern)),
            confirmPassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].pattern(this.variablesService.pattern)),
        }, { validators: this.checkPasswords });
    }
    SeedPhraseComponent.prototype.checkPasswords = function (group) {
        var pass = group.controls.password.value;
        var confirmPass = group.controls.confirmPassword.value;
        return pass === confirmPass ? null : { notSame: true };
    };
    SeedPhraseComponent.prototype.ngOnInit = function () {
        this.showSeed = false;
        this.getWallet();
    };
    SeedPhraseComponent.prototype.setWalletInfoNamePath = function () {
        this.detailsForm
            .get('name')
            .setValue(this.wallet.name);
        this.detailsForm
            .get('path')
            .setValue(this.wallet.path);
    };
    SeedPhraseComponent.prototype.getWallet = function () {
        var _this = this;
        this.queryRouting = this.route.queryParams.subscribe(function (params) {
            if (params.wallet_id) {
                _this.wallet_id = +params.wallet_id;
                _this.wallet = _this.walletsService.getWalletById(_this.wallet_id);
                if (_this.wallet) {
                    _this.setWalletInfoNamePath();
                }
            }
        });
    };
    SeedPhraseComponent.prototype.copySeedPhrase = function () {
        var _this = this;
        this.backend.setClipboard(this.seedPhrase, function () {
            _this.ngZone.run(function () {
                setTimeout(function () {
                    _this.seedPhraseCopied = false;
                }, 4000);
                _this.seedPhraseCopied = true;
            });
        });
    };
    SeedPhraseComponent.prototype.back = function () {
        this.location.back();
    };
    SeedPhraseComponent.prototype.showSeedPhrase = function () {
        this.showSeed = true;
        this.progressWidth = '100%';
    };
    SeedPhraseComponent.prototype.onSubmitSeed = function () {
        var _this = this;
        if (this.seedPhraseForm.valid) {
            this.showSeedPhrase();
            var wallet_id = this.wallet_id;
            var seed_password = this.seedPhraseForm.controls.password.value;
            this.backend.getSmartWalletInfo({ wallet_id: wallet_id, seed_password: seed_password }, function (status, data) {
                if (data.hasOwnProperty('seed_phrase')) {
                    _this.ngZone.run(function () {
                        _this.seedPhrase = data['seed_phrase'].trim();
                    });
                }
            });
        }
    };
    SeedPhraseComponent.prototype.ngOnDestroy = function () {
        this.queryRouting.unsubscribe();
    };
    SeedPhraseComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-seed-phrase',
            template: __webpack_require__(/*! ./seed-phrase.component.html */ "./src/app/seed-phrase/seed-phrase.component.html"),
            styles: [__webpack_require__(/*! ./seed-phrase.component.scss */ "./src/app/seed-phrase/seed-phrase.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"],
            _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_3__["BackendService"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_5__["VariablesService"],
            _helpers_services_wallets_service__WEBPACK_IMPORTED_MODULE_8__["WalletsService"],
            _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_6__["ModalService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], SeedPhraseComponent);
    return SeedPhraseComponent;
}());



/***/ }),

/***/ "./src/app/send-details-modal/send-details-modal.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/send-details-modal/send-details-modal.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal p-2 border-radius-0_8-rem bg-light-blue w-100 max-h-100\"\n\t fxFlex=\"0 1 54rem\">\n\t<div class=\"wrapper w-100\"\n\t\t fxFlex\n\t\t fxLayout=\"column\">\n\t\t<h3 class=\"title mb-2\"\n\t\t\tfxFlex=\"0 0 auto\">{{ 'SEND_DETAILS_MODAL.TITLE1' | translate }}</h3>\n\n\t\t<div class=\"content mb-2 overflow-x-hidden overflow-y-auto\"\n\t\t\t fxFlex=\"1 1 auto\"\n\t\t\t fxLayout=\"column\">\n\t\t\t<div class=\"status mb-2\"\n\t\t\t\t fxFlex=\"0 0 auto\"\n\t\t\t\t fxLayout=\"column\"\n\t\t\t\t fxLayoutAlign=\" center\">\n\n\t\t\t\t<div *ngIf=\"isSentSuccess\"\n\t\t\t\t\t class=\"image\">\n\t\t\t\t\t<img alt=\"success\"\n\t\t\t\t\t\t src=\"assets/icons/aqua/transaction_success.svg\">\n\t\t\t\t</div>\n\n\t\t\t\t<div *ngIf=\"isSentFailed\"\n\t\t\t\t\t class=\"image\">\n\t\t\t\t\t<img alt=\"failed\"\n\t\t\t\t\t\t class=\"image\"\n\t\t\t\t\t\t src=\"assets/icons/red/transaction_failed.svg\">\n\t\t\t\t</div>\n\n\t\t\t\t<div *ngIf=\"!isSentSuccess && !isSentFailed\"\n\t\t\t\t\t class=\"loader\"></div>\n\n\t\t\t\t<p class=\"color-primary mt-2\">\n\t\t\t\t\t{{ ((currentActionState$ | async) ? 'TOR_LIB_STATE' + '.' + (currentActionState$ | async)?.status : 'TOR_LIB_STATE.STATE_INITIALIZING') | translate }}\n\t\t\t\t\t{{!isSentSuccess && !isSentFailed ? '...' : ''}}\n\t\t\t\t</p>\n\n\t\t\t\t<ng-container *ngIf=\"(responseData$ | async) as responseData\">\n\t\t\t\t\t<p *ngIf=\"responseData.error_code !== 'OK'\" class=\"color-red text-align-center\">\n\t\t\t\t\t\t{{ ('ERRORS' + '.' + responseData.error_code) | translate }}\n\t\t\t\t\t</p>\n\t\t\t\t</ng-container>\n\n\t\t\t</div>\n\n\t\t\t<div class=\"details border-radius-0_8-rem overflow-hidden\"\n\t\t\t\t fxFlex=\"0 0 auto\"\n\t\t\t\t fxLayout=\"column\">\n\t\t\t\t<div (click)=\"isDetailsNotEmpty && toggleDetails()\"\n\t\t\t\t\t class=\"header overflow-hidden py-1 px-2 w-100 cursor-pointer\"\n\t\t\t\t\t fxLayout=\"row\"\n\t\t\t\t\t fxLayoutAlign=\"space-between center\">\n\t\t\t\t\t<p class=\"title text-ellipsis mr-2\">{{ 'SEND_DETAILS_MODAL.TITLE2' | translate }}</p>\n\t\t\t\t\t<button *ngIf=\"isDetailsNotEmpty\"\n\t\t\t\t\t\t\tfxLayout=\"row\"\n\t\t\t\t\t\t\tfxLayoutAlign=\"center center\">\n\t\t\t\t\t\t<img *ngIf=\"!(stateDetails$ | async)\"\n\t\t\t\t\t\t\t alt=\"dropdown-arrow-down\"\n\t\t\t\t\t\t\t src=\"assets/icons/white/dropdown-arrow-down.svg\">\n\t\t\t\t\t\t<img *ngIf=\"(stateDetails$ | async)\"\n\t\t\t\t\t\t\t alt=\"dropdown-arrow-up\"\n\t\t\t\t\t\t\t src=\"assets/icons/white/dropdown-arrow-up.svg\">\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t<div [class.px-2]=\"(stateDetails$ | async)\"\n\t\t\t\t\t [class.py-1]=\"(stateDetails$ | async)\"\n\t\t\t\t\t [fxHide]=\"!(stateDetails$ | async)\"\n\t\t\t\t\t class=\"details-wrapper\"\n\t\t\t\t\t fxFlex=\"1 1 auto\"\n\t\t\t\t\t fxLayout=\"row\">\n\t\t\t\t\t<ul #elDetailsList\n\t\t\t\t\t\tclass=\"details-list scrolled-content\">\n\t\t\t\t\t\t<li *ngFor=\"let action of (currentActionStates$ | async); let last = last; trackBy: trackBy\"\n\t\t\t\t\t\t\tclass=\"item mb-1 color-primary\"\n\t\t\t\t\t\t\tfxLayout=\"row nowrap\"\n\t\t\t\t\t\t\tfxLayoutAlign=\" center\">\n              <span\n\t\t\t\t  class=\"text text-ellipsis mr-1\">{{ 'TOR_LIB_STATE' + '.' + action?.status | translate }}{{ last && !isSentSuccess && !isSentFailed ? '...' : '' }}</span>\n\t\t\t\t\t\t\t<ng-container *ngIf=\"!last\">\n\t\t\t\t\t\t\t\t<img *ngIf=\"isSuccess(action)\"\n\t\t\t\t\t\t\t\t\t alt=\"success\"\n\t\t\t\t\t\t\t\t\t class=\"image\"\n\t\t\t\t\t\t\t\t\t src=\"assets/icons/blue/check_with_blue_bg.svg\">\n\n\t\t\t\t\t\t\t\t<img *ngIf=\"isFailed(action)\"\n\t\t\t\t\t\t\t\t\t alt=\"failed\"\n\t\t\t\t\t\t\t\t\t class=\"image\"\n\t\t\t\t\t\t\t\t\t src=\"assets/icons/red/transaction_failed.svg\">\n\t\t\t\t\t\t\t</ng-container>\n\n\t\t\t\t\t\t\t<ng-container *ngIf=\"last\">\n\t\t\t\t\t\t\t\t<img *ngIf=\"last && isSentSuccess\"\n\t\t\t\t\t\t\t\t\t alt=\"success\"\n\t\t\t\t\t\t\t\t\t class=\"image\"\n\t\t\t\t\t\t\t\t\t src=\"assets/icons/blue/check_with_blue_bg.svg\">\n\n\t\t\t\t\t\t\t\t<img *ngIf=\"last && isSentFailed\"\n\t\t\t\t\t\t\t\t\t alt=\"failed\"\n\t\t\t\t\t\t\t\t\t class=\"image\"\n\t\t\t\t\t\t\t\t\t src=\"assets/icons/red/transaction_failed.svg\">\n\t\t\t\t\t\t\t</ng-container>\n\t\t\t\t\t\t</li>\n\n\t\t\t\t\t\t<ng-container *ngIf=\"(responseData$ | async)\">\n\t\t\t\t\t\t\t<li class=\"item mb-1 color-primary\"\n\t\t\t\t\t\t\t\tfxLayout=\"row nowrap\"\n\t\t\t\t\t\t\t\tfxLayoutAlign=\" center\">\n\t\t\t\t\t\t\t\t<span\n\t\t\t\t\t\t\t\t\tclass=\"word-break-break-all\">tx id: {{ (responseData$ | async).response_data.tx_hash }}</span>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li class=\"item mb-1 color-primary\"\n\t\t\t\t\t\t\t\tfxLayout=\"row nowrap\"\n\t\t\t\t\t\t\t\tfxLayoutAlign=\" center\">\n\t\t\t\t\t\t\t\t<div class=\"word-break-break-all\">tx\n\t\t\t\t\t\t\t\t\tsize: {{ (responseData$ | async).response_data.tx_blob_size }}\n\t\t\t\t\t\t\t\t\tbytes\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ng-container>\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"controls\"\n\t\t\t fxFlex=\"0 0 auto\">\n\t\t\t<button (click)=\"close.emit()\"\n\t\t\t\t\t[disabled]=\"!isSentSuccess && !isSentFailed\"\n\t\t\t\t\tclass=\"primary big w-100\">{{ 'Ok' | translate }}</button>\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ "./src/app/send-details-modal/send-details-modal.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/send-details-modal/send-details-modal.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NlbmQtZGV0YWlscy1tb2RhbC9zZW5kLWRldGFpbHMtbW9kYWwuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/send-details-modal/send-details-modal.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/send-details-modal/send-details-modal.component.ts ***!
  \********************************************************************/
/*! exports provided: SendDetailsModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendDetailsModalComponent", function() { return SendDetailsModalComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");






var successfulStatuses = [
    _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_2__["StatusCurrentActionState"].STATE_SENDING,
    _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_2__["StatusCurrentActionState"].STATE_SENT_SUCCESS,
    _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_2__["StatusCurrentActionState"].STATE_INITIALIZING,
    _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_2__["StatusCurrentActionState"].STATE_DOWNLOADING_CONSENSUS,
    _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_2__["StatusCurrentActionState"].STATE_MAKING_TUNNEL_A,
    _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_2__["StatusCurrentActionState"].STATE_MAKING_TUNNEL_B,
    _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_2__["StatusCurrentActionState"].STATE_CREATING_STREAM,
    _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_2__["StatusCurrentActionState"].STATE_SUCCESS
];
var failedStatuses = [_helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_2__["StatusCurrentActionState"].STATE_SEND_FAILED, _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_2__["StatusCurrentActionState"].STATE_FAILED];
var SendDetailsModalComponent = /** @class */ (function () {
    function SendDetailsModalComponent(_backendService, _variablesService, _renderer) {
        this._backendService = _backendService;
        this._variablesService = _variablesService;
        this._renderer = _renderer;
        this.modalOverlay = true;
        this.close = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        /** BehaviorSubject with ResponseAsyncTransfer */
        this.responseData$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](null);
        /** BehaviorSubject flag for stateDetails */
        this.stateDetails$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](false);
        /** BehaviorSubject with CurrentActionState */
        this.currentActionState$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](null);
        /** BehaviorSubject with CurrentActionState[] */
        this.currentActionStates$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"]([]);
        this._destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
    }
    Object.defineProperty(SendDetailsModalComponent.prototype, "currentActionState", {
        get: function () {
            return this.currentActionState$.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendDetailsModalComponent.prototype, "currentActionStates", {
        get: function () {
            return this.currentActionStates$.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendDetailsModalComponent.prototype, "isSentSuccess", {
        /** True, if currentActionState.status = success */
        get: function () {
            return this.currentActionState && this.currentActionState.status === _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_2__["StatusCurrentActionState"].STATE_SENT_SUCCESS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendDetailsModalComponent.prototype, "isSentFailed", {
        /** True, if currentActionState.status = failed */
        get: function () {
            return this.currentActionState && this.currentActionState.status === _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_2__["StatusCurrentActionState"].STATE_SEND_FAILED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendDetailsModalComponent.prototype, "isDetailsNotEmpty", {
        /** True, responseData$ or currentActionStates$ not empty */
        get: function () {
            return !!(this.responseData$.value || this.currentActionStates$.value.length);
        },
        enumerable: true,
        configurable: true
    });
    SendDetailsModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._renderer.addClass(document.body, 'no-scroll');
        var _a = this._variablesService, wallet_id = _a.currentWallet.wallet_id, appUseTor = _a.settings.appUseTor;
        if (appUseTor) {
            /** Listening handleCurrentActionState */
            this._backendService.handleCurrentActionState$
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this._destroy$))
                .subscribe(function (currentActionState) {
                _this.currentActionState$.next(currentActionState);
                _this.currentActionStates$.next(_this.currentActionStates.concat([currentActionState]));
            });
        }
        else {
            var actionState = {
                status: _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_2__["StatusCurrentActionState"].STATE_INITIALIZING,
                wallet_id: wallet_id
            };
            this.currentActionState$.next(actionState);
            this.currentActionStates$.next(this.currentActionStates.concat([actionState]));
        }
        /** Listening dispatchAsyncCallResult */
        this._backendService.dispatchAsyncCallResult$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["filter"])(function (_a) {
            var job_id = _a.job_id, response = _a.response;
            return _this.job_id === job_id && !!response;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this._destroy$)).subscribe(function (_a) {
            var response = _a.response;
            var success = response.response_data.success;
            if (!appUseTor || !success) {
                var actionState = {
                    status: success ? _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_2__["StatusCurrentActionState"].STATE_SENT_SUCCESS : _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_2__["StatusCurrentActionState"].STATE_SEND_FAILED,
                    wallet_id: wallet_id
                };
                _this.currentActionState$.next(actionState);
                _this.currentActionStates$.next(_this.currentActionStates.concat([actionState]));
            }
            _this.responseData$.next(response);
        });
    };
    SendDetailsModalComponent.prototype.ngOnDestroy = function () {
        this._renderer.removeClass(document.body, 'no-scroll');
        this._destroy$.next();
    };
    /** Show/Hide details transaction */
    SendDetailsModalComponent.prototype.toggleDetails = function () {
        var _this = this;
        this.stateDetails$.next(!this.stateDetails$.value);
        setTimeout(function () { return _this._scrollToBottomDetailsList(); }, 100);
    };
    /** identification item by *ngFor */
    SendDetailsModalComponent.prototype.trackBy = function (index) {
        return index;
    };
    /** True, if status success */
    SendDetailsModalComponent.prototype.isSuccess = function (action) {
        return successfulStatuses.includes(action && action.status);
    };
    /** True, if status failed */
    SendDetailsModalComponent.prototype.isFailed = function (action) {
        return failedStatuses.includes(action && action.status);
    };
    /** Scroll elDetailsWrapper to bottom */
    SendDetailsModalComponent.prototype._scrollToBottomDetailsList = function () {
        if (this.elDetailsList) {
            var nativeElement = this.elDetailsList.nativeElement;
            nativeElement.scrollTop = nativeElement.scrollHeight;
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.modal-overlay'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SendDetailsModalComponent.prototype, "modalOverlay", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], SendDetailsModalComponent.prototype, "job_id", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], SendDetailsModalComponent.prototype, "close", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('elDetailsList'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], SendDetailsModalComponent.prototype, "elDetailsList", void 0);
    SendDetailsModalComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-send-details-modal',
            template: __webpack_require__(/*! ./send-details-modal.component.html */ "./src/app/send-details-modal/send-details-modal.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./send-details-modal.component.scss */ "./src/app/send-details-modal/send-details-modal.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_2__["BackendService"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_4__["VariablesService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]])
    ], SendDetailsModalComponent);
    return SendDetailsModalComponent;
}());



/***/ }),

/***/ "./src/app/send-modal/send-modal.component.html":
/*!******************************************************!*\
  !*** ./src/app/send-modal/send-modal.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal p-2 border-radius-0_8-rem bg-light-blue max-w-54-rem w-100 max-h-100\"\n     fxLayout=\"row\">\n    <div class=\"wrapper\">\n        <form class=\"overflow-hidden\"\n              fxLayout=\"column\"\n              fxFlexFill\n              [formGroup]=\"confirmForm\"\n              (ngSubmit)=\"submit()\">\n            <h3 class=\"title mb-2\"\n                fxFlex=\"0 0 auto\">{{ 'CONFIRM.TITLE' | translate }}</h3>\n\n            <div class=\"content mb-2 w-100 overflow-x-hidden overflow-y-auto\"\n                 fxFlex=\"1 1 auto\">\n                <div class=\"table-info mb-2\">\n                    <div class=\"row\">\n                        <div class=\"label max-w-19-rem w-100\">{{ 'CONFIRM.MESSAGE.SEND' | translate }}</div>\n                        <div class=\"text\">{{ form.get('amount').value }} {{variablesService.defaultCurrency}}</div>\n                    </div>\n\n                    <hr class=\"separator\"/>\n\n                    <div class=\"row\">\n                        <div class=\"label max-w-19-rem w-100\">{{ 'CONFIRM.MESSAGE.FROM' | translate }}</div>\n                        <div class=\"text\">{{ variablesService.currentWallet.address }}</div>\n                    </div>\n\n                    <hr class=\"separator\"/>\n\n                    <div class=\"row\">\n                        <div class=\"label max-w-19-rem w-100\">{{ 'CONFIRM.MESSAGE.TO' | translate }}</div>\n                        <div class=\"text\">{{ form.get('address').value }}</div>\n                    </div>\n\n                    <ng-container *ngIf=\"!!form.get('comment').value\">\n                        <hr class=\"separator\"/>\n\n                        <div class=\"row\">\n                            <div class=\"label max-w-19-rem w-100\">{{ 'CONFIRM.MESSAGE.COMMENT' | translate }}</div>\n                            <div class=\"text\">{{ form.get('comment').value }}</div>\n                        </div>\n                    </ng-container>\n                </div>\n\n                <div class=\"form__field mb-0\"\n                     *ngIf=\"variablesService.appPass\">\n                    <label for=\"password\">{{ 'LOGIN.MASTER_PASS' | translate }}</label>\n                    <input type=\"password\"\n                           id=\"password\"\n                           name=\"password\"\n                           formControlName=\"password\"\n                           class=\"form__field--input\"\n                           [placeholder]=\"'PLACEHOLDERS.MASTER_PASS_PLACEHOLDER' | translate\"\n                           autofocus\n                           (contextmenu)=\"variablesService.onContextMenuPasteSelect($event)\"/>\n                    <div class=\"error\"\n\t\t\t\t\t\t *ngIf=\"confirmForm.controls['password'].invalid && (confirmForm.controls['password'].dirty || confirmForm.controls['password'].touched) || submitted\">\n\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t*ngIf=\"confirmForm.controls['password'].hasError('passwordNotMatch')\">\n\t\t\t\t\t\t\t{{ 'LOGIN.FORM_ERRORS.WRONG_PASSWORD' | translate }}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div *ngIf=\"confirmForm.controls['password'].hasError('requiredPass')\">\n\t\t\t\t\t\t\t{{ 'LOGIN.FORM_ERRORS.PASS_REQUIRED' | translate }}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n                </div>\n            </div>\n\n            <div class=\"controls w-100\"\n                 fxLayout=\"row nowrap\"\n                 fxLayoutGap=\"1rem\"\n                 fxFlex=\"0 0 auto\">\n                <button type=\"button\"\n                        class=\"outline big w-100\"\n                        (click)=\"onClose()\">{{ 'CONFIRM.BUTTON_CANCEL' | translate }}</button>\n                <button type=\"submit\"\n                        class=\"primary big w-100\">{{ 'CONFIRM.BUTTON_CONFIRM' | translate }}</button>\n            </div>\n        </form>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/send-modal/send-modal.component.scss":
/*!******************************************************!*\
  !*** ./src/app/send-modal/send-modal.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NlbmQtbW9kYWwvc2VuZC1tb2RhbC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/send-modal/send-modal.component.ts":
/*!****************************************************!*\
  !*** ./src/app/send-modal/send-modal.component.ts ***!
  \****************************************************/
/*! exports provided: SendModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendModalComponent", function() { return SendModalComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");




var SendModalComponent = /** @class */ (function () {
    function SendModalComponent(variablesService, renderer) {
        this.variablesService = variablesService;
        this.renderer = renderer;
        this.modalOverlay = true;
        this.confirmed = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.confirmForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('')
        });
        this.submitted = false;
    }
    SendModalComponent.prototype.ngOnInit = function () {
        this.renderer.addClass(document.body, 'no-scroll');
        if (this.variablesService.appPass) {
            this.confirmForm.controls['password'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
            this.confirmForm.updateValueAndValidity();
        }
    };
    SendModalComponent.prototype.ngOnDestroy = function () {
        this.renderer.removeClass(document.body, 'no-scroll');
    };
    SendModalComponent.prototype.submit = function () {
        this.submitted = true;
        if (this.variablesService.appPass) {
            if (this.confirmForm.controls['password'].value === '') {
                this.confirmForm.controls['password'].setErrors({ requiredPass: true });
                return;
            }
            this.confirmForm.controls['password'].setErrors({ requiredPass: false });
            if (this.variablesService.appPass === this.confirmForm.controls['password'].value) {
                this.confirmed.emit(true);
            }
            else {
                this.confirmForm.controls['password'].setErrors({ passwordNotMatch: true });
            }
        }
        else {
            this.confirmed.emit(true);
        }
    };
    SendModalComponent.prototype.onClose = function () {
        this.confirmed.emit(false);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.modal-overlay'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SendModalComponent.prototype, "modalOverlay", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"])
    ], SendModalComponent.prototype, "form", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], SendModalComponent.prototype, "confirmed", void 0);
    SendModalComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-send-modal',
            template: __webpack_require__(/*! ./send-modal.component.html */ "./src/app/send-modal/send-modal.component.html"),
            styles: [__webpack_require__(/*! ./send-modal.component.scss */ "./src/app/send-modal/send-modal.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_3__["VariablesService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]])
    ], SendModalComponent);
    return SendModalComponent;
}());



/***/ }),

/***/ "./src/app/send/send.component.html":
/*!******************************************!*\
  !*** ./src/app/send/send.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container scrolled-content\"\r\n     fxFlex=\"1 1 auto\">\r\n    <form *ngIf=\"!isLoading\"\r\n          class=\"form\"\r\n          fxFlex=\"0 1 50rem\"\r\n          fxLayout=\"column\"\r\n          fxLayoutAlign=\"start stretch\"\r\n          [formGroup]=\"sendForm\"\r\n          (ngSubmit)=\"showDialog()\">\r\n\r\n        <div class=\"form__field--row\">\r\n            <div class=\"form__field form__field-dropdown\">\r\n                <label for=\"send-address\">{{ 'SEND.ADDRESS' | translate }}</label>\r\n                <input type=\"text\"\r\n                       class=\"form__field--input\"\r\n                       id=\"send-address\"\r\n                       formControlName=\"address\"\r\n                       [placeholder]=\"'PLACEHOLDERS.ADRESS_PLACEHOLDER' | translate\"\r\n                       (mousedown)=\"addressMouseDown($event)\"\r\n                       (contextmenu)=\"variablesService.onContextMenu($event)\"\r\n                       (input)=\"addressToLowerCase()\">\r\n\r\n                <div\r\n                      class=\"dropdown py-0_5 border-radius-0_8-rem bg-light-blue-details\"\r\n                      *ngIf=\"isOpen && !!localAliases.length\">\r\n                    <div class=\"item\"\r\n                         *ngFor=\"let item of localAliases\"\r\n                         (click)=\"setAlias(item.name)\">\r\n\t\t\t\t\t\t<div class=\"alias\" [class.pl-1]=\"item.name.length > 6\" [class.available]=\"item.name.length >= 2 && item.name.length <= 6\">\r\n\t\t\t\t\t\t\t<div class=\"text-ellipsis\">{{item.name}}</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n                </div>\r\n\r\n                <div class=\"error\"\r\n                     *ngIf=\"sendForm.controls['address'].invalid && (sendForm.controls['address'].dirty || sendForm.controls['address'].touched)\">\r\n                    <div *ngIf=\"sendForm.controls['address'].errors['address_not_valid']\">\r\n                        {{ 'SEND.FORM_ERRORS.ADDRESS_NOT_VALID' | translate }}\r\n                    </div>\r\n                    <div *ngIf=\"sendForm.controls['address'].errors['alias_not_valid']\">\r\n                        {{ 'SEND.FORM_ERRORS.ALIAS_NOT_VALID' | translate }}\r\n                    </div>\r\n\t\t\t\t\t<div *ngIf=\"sendForm.controls['address'].errors['alias_not_found']\">\r\n\t\t\t\t\t\t{{ 'SEND.FORM_ERRORS.ALIAS_NOT_FOUND' | translate }}\r\n\t\t\t\t\t</div>\r\n                    <div *ngIf=\"sendForm.controls['address'].hasError('required')\">\r\n                        {{ 'SEND.FORM_ERRORS.ADDRESS_REQUIRED' | translate }}\r\n                    </div>\r\n                </div>\r\n                <div *ngIf=\"currentAliasAddress\"\r\n                     class=\"info text-ellipsis\">\r\n                    <span>{{getShorterAdress()}}</span>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"form__field\">\r\n                <label for=\"send-amount\">{{ 'SEND.AMOUNT' | translate }}</label>\r\n                <input type=\"text\"\r\n                       class=\"form__field--input\"\r\n                       id=\"send-amount\"\r\n                       formControlName=\"amount\"\r\n                       [placeholder]=\"'PLACEHOLDERS.AMOUNT_PLACEHOLDER' | translate\"\r\n                       appInputValidate=\"money\"\r\n                       (contextmenu)=\"variablesService.onContextMenu($event)\">\r\n                <div class=\"error\"\r\n                     *ngIf=\"sendForm.controls['amount'].invalid && (sendForm.controls['amount'].dirty || sendForm.controls['amount'].touched)\">\r\n                    <div *ngIf=\"sendForm.controls['amount'].errors['zero']\">\r\n                        {{ 'SEND.FORM_ERRORS.AMOUNT_ZERO' | translate }}\r\n                    </div>\r\n                    <div *ngIf=\"sendForm.controls['amount'].errors['great_than_unwraped_coins']\">\r\n                        {{ 'SEND.FORM_ERRORS.GREAT_THAN_UNWRAPPED_COINS' | translate }}\r\n                    </div>\r\n                    <div *ngIf=\"sendForm.controls['amount'].errors['less_than_infinium_needed']\">\r\n                        {{ 'SEND.FORM_ERRORS.LESS_THAN_INF_NEEDED' | translate }}\r\n                    </div>\r\n                    <div *ngIf=\"sendForm.controls['amount'].errors['wrap_info_null']\">\r\n                        {{ 'SEND.FORM_ERRORS.WRAP_INFO_NULL' | translate }}\r\n                    </div>\r\n                    <div *ngIf=\"sendForm.controls['amount'].hasError('required')\">\r\n                        {{ 'SEND.FORM_ERRORS.AMOUNT_REQUIRED' | translate }}\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"form__field\">\r\n            <label for=\"send-comment\">{{ 'SEND.COMMENT' | translate }}</label>\r\n            <input type=\"text\"\r\n                   class=\"form__field--input\"\r\n                   id=\"send-comment\"\r\n                   formControlName=\"comment\"\r\n                   placeholder=\"{{ 'PLACEHOLDERS.COMMENT_PLACEHOLDER' | translate }}\"\r\n                   [maxLength]=\"variablesService.maxCommentLength\"\r\n                   (contextmenu)=\"variablesService.onContextMenu($event)\">\r\n            <div class=\"error\"\r\n                 *ngIf=\"sendForm.get('comment').value && sendForm.get('comment').value.length >= variablesService.maxCommentLength\">\r\n                {{ 'SEND.FORM_ERRORS.MAX_LENGTH' | translate }}\r\n            </div>\r\n        </div>\r\n\r\n        <div *ngIf=\"isWrapShown && wrapInfo && !isLoading\"\r\n             class=\"wrap mt-2 mb-2 p-2\">\r\n            <div class=\"title\">\r\n                {{ 'SEND.WRAP.TITLE' | translate }}\r\n                <i class=\"icon info-circle\"></i>\r\n            </div>\r\n            <div class=\"text-wrap\">\r\n                {{ 'SEND.WRAP.MAIN_TEXT' | translate }}\r\n            </div>\r\n            <div class=\"title\">{{ 'SEND.WRAP.ESTIMATE' | translate }}</div>\r\n            <table class=\"text-wrap\">\r\n                <tr>\r\n                    <td>{{ 'SEND.WRAP.WILL_RECEIVE' | translate }}</td>\r\n                    <td *ngIf=\"!sendForm.controls['amount'].errors\">{{getReceivedValue() | intToMoney}} {{ 'SEND.WRAP.wINF' |\r\n                          translate }}</td>\r\n                    <td *ngIf=\"sendForm.controls['amount'].errors\">-</td>\r\n                </tr>\r\n                <tr>\r\n                    <td>{{ 'SEND.WRAP.FEE' | translate }}</td>\r\n                    <td>\r\n                        {{wrapInfo?.tx_cost?.infinium_needed_for_erc20 | intToMoney: 3 }}\r\n                        {{ 'SEND.WRAP.INF' | translate }}(${{wrapInfo?.tx_cost?.usd_needed_for_erc20}})\r\n                    </td>\r\n                </tr>\r\n            </table>\r\n        </div>\r\n\r\n        <div class=\"details mb-2\">\r\n            <button type=\"button\"\r\n                    class=\"header\"\r\n                    [class.border-radius-all]=\"!additionalOptions\"\r\n                    (click)=\"toggleOptions()\">\r\n                <span>{{ 'SEND.DETAILS' | translate }}</span>\r\n                <i class=\"icon ml-1\"\r\n                   [class.dropdown-arrow-down]=\"!additionalOptions\"\r\n                   [class.dropdown-arrow-up]=\"additionalOptions\"></i>\r\n            </button>\r\n\r\n            <div class=\"content\"\r\n                 *ngIf=\"additionalOptions\">\r\n                <div class=\"form__field--row\">\r\n                    <div class=\"form__field\">\r\n                        <label for=\"send-mixin\">{{ 'SEND.MIXIN' | translate }}</label>\r\n                        <input type=\"text\"\r\n                               class=\"form__field--input\"\r\n                               id=\"send-mixin\"\r\n                               formControlName=\"mixin\"\r\n                               [placeholder]=\"'PLACEHOLDERS.AMOUNT_PLACEHOLDER' | translate\"\r\n                               appInputValidate=\"integer\"\r\n                               (contextmenu)=\"variablesService.onContextMenu($event)\">\r\n                        <div class=\"error\"\r\n                             *ngIf=\"sendForm.controls['mixin'].invalid && (sendForm.controls['mixin'].dirty || sendForm.controls['mixin'].touched)\">\r\n                            <div *ngIf=\"sendForm.controls['mixin'].hasError('required')\">\r\n                                {{ 'SEND.FORM_ERRORS.AMOUNT_REQUIRED' | translate }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form__field\">\r\n                        <label for=\"send-fee\">{{ 'SEND.FEE' | translate }}</label>\r\n                        <input type=\"text\"\r\n                               class=\"form__field--input\"\r\n                               id=\"send-fee\"\r\n                               formControlName=\"fee\"\r\n                               [placeholder]=\"'PLACEHOLDERS.FEE_PLACEHOLDER' | translate\"\r\n                               appInputValidate=\"money\"\r\n                               (contextmenu)=\"variablesService.onContextMenu($event)\">\r\n                        <div class=\"error\"\r\n                             *ngIf=\"sendForm.controls['fee'].invalid && (sendForm.controls['fee'].dirty || sendForm.controls['fee'].touched)\">\r\n                            <div *ngIf=\"sendForm.controls['fee'].errors['less_min']\">\r\n                                {{ 'SEND.FORM_ERRORS.FEE_MINIMUM' | translate : { fee: variablesService.default_fee } }}\r\n                            </div>\r\n                            <div *ngIf=\"sendForm.controls['fee'].hasError('required')\">\r\n                                {{ 'SEND.FORM_ERRORS.FEE_REQUIRED' | translate }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <app-checkbox class=\"mt-1\"\r\n                              [value]=\"hideWalletAddress || sendForm.controls['hide'].value\"\r\n                              formControlName=\"hide\"\r\n                              [label]=\"'SEND.HIDE' | translate\"></app-checkbox>\r\n            </div>\r\n        </div>\r\n\r\n        <button type=\"submit\"\r\n                class=\"primary big max-w-19-rem w-100\"\r\n                [disabled]=\"!sendForm.valid || !variablesService.currentWallet.loaded\">\r\n            {{'SEND.BUTTON' | translate }}\r\n        </button>\r\n    </form>\r\n</div>\r\n\r\n<app-send-modal *ngIf=\"isModalDialogVisible\"\r\n                [form]=\"sendForm\"\r\n                (confirmed)=\"confirmed($event)\"></app-send-modal>\r\n\r\n<app-send-details-modal [job_id]=\"job_id\"\r\n                        *ngIf=\"isModalDetailsDialogVisible\"\r\n                        (close)=\"handeCloseDetailsModal()\"></app-send-details-modal>\r\n"

/***/ }),

/***/ "./src/app/send/send.component.scss":
/*!******************************************!*\
  !*** ./src/app/send/send.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: auto;\n  display: flex;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL3NlbmQvc2VuZC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvc2VuZC9zZW5kLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9zZW5kL3NlbmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IGF1dG87XG4gIGRpc3BsYXk6IGZsZXg7XG59XG4iLCI6aG9zdCB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IGF1dG87XG4gIGRpc3BsYXk6IGZsZXg7XG59Il19 */"

/***/ }),

/***/ "./src/app/send/send.component.ts":
/*!****************************************!*\
  !*** ./src/app/send/send.component.ts ***!
  \****************************************/
/*! exports provided: SendComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendComponent", function() { return SendComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_helpers/services/modal.service */ "./src/app/_helpers/services/modal.service.ts");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bignumber.js */ "./node_modules/bignumber.js/bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_shared/constants */ "./src/app/_shared/constants.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _helpers_pipes_money_to_int_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../_helpers/pipes/money-to-int.pipe */ "./src/app/_helpers/pipes/money-to-int.pipe.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");











var SendComponent = /** @class */ (function () {
    function SendComponent(backend, variablesService, modalService, ngZone, http, moneyToInt) {
        var _this = this;
        this.backend = backend;
        this.variablesService = variablesService;
        this.modalService = modalService;
        this.ngZone = ngZone;
        this.http = http;
        this.moneyToInt = moneyToInt;
        this.isOpen = false;
        this.localAliases = [];
        this.isModalDialogVisible = false;
        this.isModalDetailsDialogVisible = false;
        this.hideWalletAddress = false;
        this.isLoading = true;
        this.isWrapShown = false;
        this.additionalOptions = false;
        this.sendForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            address: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, function (g) {
                    _this.localAliases = [];
                    if (g.value) {
                        _this.currentAliasAddress = '';
                        if (g.value.indexOf('@') !== 0) {
                            _this.isOpen = false;
                            _this.backend.validateAddress(g.value, function (valid_status, data) {
                                _this.ngZone.run(function () {
                                    _this.isWrapShown = (data.error_code === 'WRAP');
                                    _this.sendForm.get('amount').setValue(_this.sendForm.get('amount').value);
                                    if (valid_status === false && !_this.isWrapShown) {
                                        g.setErrors(Object.assign({ 'address_not_valid': true }, g.errors));
                                    }
                                    else {
                                        if (g.hasError('address_not_valid')) {
                                            delete g.errors['address_not_valid'];
                                            if (Object.keys(g.errors).length === 0) {
                                                g.setErrors(null);
                                            }
                                        }
                                    }
                                });
                            });
                            return (g.hasError('address_not_valid')) ? { 'address_not_valid': true } : null;
                        }
                        else {
                            _this.isOpen = true;
                            _this.localAliases = _this.variablesService.aliases.filter(function (item) {
                                return item.name.indexOf(g.value) > -1;
                            });
                            if (!(/^@?[a-z\d\-.]{0,25}$/.test(g.value))) {
                                return { 'alias_not_valid': true };
                            }
                            else {
                                _this.backend.getAliasByName(g.value.replace('@', ''), function (alias_status, alias_data) {
                                    _this.ngZone.run(function () {
                                        _this.currentAliasAddress = alias_data.address;
                                        _this.lenghtOfAdress = g.value.length;
                                        if (alias_status) {
                                            if (g.hasError('alias_not_found')) {
                                                delete g.errors['alias_not_found'];
                                                if (Object.keys(g.errors).length === 0) {
                                                    g.setErrors(null);
                                                }
                                            }
                                        }
                                        else {
                                            g.setErrors(Object.assign({ 'alias_not_found': true }, g.errors));
                                        }
                                    });
                                });
                            }
                            return (g.hasError('alias_not_found')) ? { 'alias_not_found': true } : null;
                        }
                    }
                    return null;
                }]),
            amount: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](undefined, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, function (g) {
                    if (!g.value) {
                        return null;
                    }
                    if (g.value == 0) {
                        return { 'zero': true };
                    }
                    var bigAmount = _this.moneyToInt.transform(g.value);
                    if (_this.isWrapShown) {
                        if (!_this.wrapInfo) {
                            return { wrap_info_null: true };
                        }
                        if (bigAmount.isGreaterThan(new bignumber_js__WEBPACK_IMPORTED_MODULE_6__["BigNumber"](_this.wrapInfo.unwraped_coins_left))) {
                            return { great_than_unwraped_coins: true };
                        }
                        if (bigAmount.isLessThan(new bignumber_js__WEBPACK_IMPORTED_MODULE_6__["BigNumber"](_this.wrapInfo.tx_cost.infinium_needed_for_erc20))) {
                            return { less_than_infinium_needed: true };
                        }
                    }
                    return null;
                }]),
            comment: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](''),
            mixin: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](_shared_constants__WEBPACK_IMPORTED_MODULE_7__["MIXIN"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            fee: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.variablesService.default_fee, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, function (g) {
                    if ((new bignumber_js__WEBPACK_IMPORTED_MODULE_6__["BigNumber"](g.value)).isLessThan(_this.variablesService.default_fee)) {
                        return { 'less_min': true };
                    }
                    return null;
                }]),
            hide: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](false)
        });
    }
    SendComponent.prototype.onClick = function (targetElement) {
        if (targetElement.id !== 'send-address' && this.isOpen) {
            this.isOpen = false;
        }
    };
    SendComponent.prototype.getShorterAdress = function () {
        var tempArr = this.currentAliasAddress.split('');
        return this.currentAliasAddress.split('', 13).join('') + '...' + tempArr.splice((tempArr.length - 4), 4).join('');
    };
    SendComponent.prototype.addressMouseDown = function (e) {
        if (e['button'] === 0 && this.sendForm.get('address').value && this.sendForm.get('address').value.indexOf('@') === 0) {
            this.isOpen = true;
        }
    };
    SendComponent.prototype.setAlias = function (alias) {
        this.sendForm.get('address').setValue(alias);
    };
    SendComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mixin = this.variablesService.currentWallet.send_data['mixin'] || _shared_constants__WEBPACK_IMPORTED_MODULE_7__["MIXIN"];
        if (this.variablesService.currentWallet.is_auditable) {
            this.mixin = 0;
            this.sendForm.controls['mixin'].disable();
        }
        this.hideWalletAddress = this.variablesService.currentWallet.is_auditable && !this.variablesService.currentWallet.is_watch_only;
        if (this.hideWalletAddress) {
            this.sendForm.controls['hide'].disable();
        }
        this.sendForm.reset({
            address: this.variablesService.currentWallet.send_data['address'],
            amount: this.variablesService.currentWallet.send_data['amount'],
            comment: this.variablesService.currentWallet.send_data['comment'],
            mixin: this.mixin,
            fee: this.variablesService.currentWallet.send_data['fee'] || this.variablesService.default_fee,
            hide: this.variablesService.currentWallet.send_data['hide'] || false
        });
        this.getWrapInfo();
        this.dLActionSubscribe = this.variablesService.sendActionData$.subscribe(function (res) {
            if (res.action === 'send') {
                _this.actionData = res;
                setTimeout(function () {
                    _this.fillDeepLinkData();
                }, 100);
                _this.variablesService.sendActionData$.next({});
            }
        });
    };
    SendComponent.prototype.getWrapInfo = function () {
        var _this = this;
        this.http.get('https://wrapped.infinium.org/api2/get_wrap_info')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["finalize"])(function () {
            _this.isLoading = false;
        }))
            .subscribe(function (info) {
            _this.wrapInfo = info;
        });
    };
    SendComponent.prototype.showDialog = function () {
        this.isModalDialogVisible = true;
    };
    SendComponent.prototype.confirmed = function (confirmed) {
        this.isModalDialogVisible = false;
        if (confirmed) {
            this.onSend();
        }
    };
    SendComponent.prototype.fillDeepLinkData = function () {
        this.additionalOptions = true;
        this.sendForm.reset({
            address: this.actionData.address,
            amount: this.actionData.amount || null,
            comment: this.actionData.comment || this.actionData.comments || '',
            mixin: this.actionData.mixins || this.mixin,
            fee: this.actionData.fee || this.variablesService.default_fee,
            hide: this.actionData.hide_sender === 'true'
        });
    };
    SendComponent.prototype.addressToLowerCase = function () {
        var control = this.sendForm.get('address');
        var value = control.value;
        var condition = value.indexOf('@') === 0;
        return condition ? control.patchValue(value.toLowerCase()) : null;
    };
    SendComponent.prototype.onSend = function () {
        var _this = this;
        if (this.sendForm.valid) {
            if (this.sendForm.get('address').value.indexOf('@') !== 0) {
                this.backend.validateAddress(this.sendForm.get('address').value, function (valid_status, data) {
                    if (valid_status === false && !(data.error_code === 'WRAP')) {
                        _this.ngZone.run(function () {
                            _this.sendForm.get('address').setErrors({ 'address_not_valid': true });
                        });
                    }
                    else {
                        _this.backend.sendMoney(_this.variablesService.currentWallet.wallet_id, _this.sendForm.get('address').value, _this.sendForm.get('amount').value, _this.sendForm.get('fee').value, _this.sendForm.get('mixin').value, _this.sendForm.get('comment').value, _this.sendForm.get('hide').value, function (job_id) {
                            _this.ngZone.run(function () {
                                _this.job_id = job_id;
                                _this.isModalDetailsDialogVisible = true;
                                _this.variablesService.currentWallet.send_data = {
                                    address: null,
                                    amount: null,
                                    comment: null,
                                    mixin: null,
                                    fee: null,
                                    hide: null
                                };
                                _this.sendForm.reset({
                                    address: null,
                                    amount: null,
                                    comment: null,
                                    mixin: _this.mixin,
                                    fee: _this.variablesService.default_fee,
                                    hide: false
                                });
                                _this.sendForm.markAsUntouched();
                            });
                        });
                    }
                });
            }
            else {
                this.backend.getAliasByName(this.sendForm.get('address').value.replace('@', ''), function (alias_status, alias_data) {
                    _this.ngZone.run(function () {
                        if (alias_status === false) {
                            _this.ngZone.run(function () {
                                _this.sendForm.get('address').setErrors({ 'alias_not_found': true });
                            });
                        }
                        else {
                            _this.backend.sendMoney(_this.variablesService.currentWallet.wallet_id, alias_data.address, // this.sendForm.get('address').value,
                            _this.sendForm.get('amount').value, _this.sendForm.get('fee').value, _this.sendForm.get('mixin').value, _this.sendForm.get('comment').value, _this.sendForm.get('hide').value, function (job_id) {
                                _this.ngZone.run(function () {
                                    _this.job_id = job_id;
                                    _this.isModalDetailsDialogVisible = true;
                                    _this.variablesService.currentWallet.send_data = {
                                        address: null,
                                        amount: null,
                                        comment: null,
                                        mixin: null,
                                        fee: null,
                                        hide: null
                                    };
                                    _this.sendForm.reset({
                                        address: null,
                                        amount: null,
                                        comment: null,
                                        mixin: _this.mixin,
                                        fee: _this.variablesService.default_fee,
                                        hide: false
                                    });
                                    _this.sendForm.markAsUntouched();
                                });
                            });
                        }
                    });
                });
            }
        }
    };
    SendComponent.prototype.toggleOptions = function () {
        this.additionalOptions = !this.additionalOptions;
    };
    SendComponent.prototype.ngOnDestroy = function () {
        this.dLActionSubscribe.unsubscribe();
        this.variablesService.currentWallet.send_data = {
            address: this.sendForm.get('address').value,
            amount: this.sendForm.get('amount').value,
            comment: this.sendForm.get('comment').value,
            mixin: this.sendForm.get('mixin').value,
            fee: this.sendForm.get('fee').value,
            hide: this.sendForm.get('hide').value
        };
        this.actionData = {};
    };
    SendComponent.prototype.getReceivedValue = function () {
        var amount = this.moneyToInt.transform(this.sendForm.value.amount);
        var needed = new bignumber_js__WEBPACK_IMPORTED_MODULE_6__["BigNumber"](this.wrapInfo.tx_cost.infinium_needed_for_erc20);
        if (amount && needed) {
            return amount.minus(needed);
        }
        return 0;
    };
    SendComponent.prototype.handeCloseDetailsModal = function () {
        this.isModalDetailsDialogVisible = false;
        this.job_id = null;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('document:click', ['$event.target']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], SendComponent.prototype, "onClick", null);
    SendComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-send',
            template: __webpack_require__(/*! ./send.component.html */ "./src/app/send/send.component.html"),
            styles: [__webpack_require__(/*! ./send.component.scss */ "./src/app/send/send.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_3__["BackendService"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_4__["VariablesService"],
            _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_5__["ModalService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"],
            _helpers_pipes_money_to_int_pipe__WEBPACK_IMPORTED_MODULE_9__["MoneyToIntPipe"]])
    ], SendComponent);
    return SendComponent;
}());



/***/ }),

/***/ "./src/app/settings/settings.component.html":
/*!**************************************************!*\
  !*** ./src/app/settings/settings.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"page-container\">\n\n    <div class=\"toolbar mb-2\">\n        <div class=\"left\">\n            <button type=\"button\"\n                    class=\"btn-icon circle big mr-2\"\n                    (click)=\"back()\">\n                <i class=\"icon dropdown-arrow-left\"></i>\n            </button>\n            <h1>{{ 'SETTINGS.TITLE' | translate }}</h1>\n        </div>\n        <div class=\"right\"></div>\n    </div>\n\n    <div class=\"page-content\">\n        <div class=\"scrolled-content\">\n            <div class=\"settings\"\n                 fxFlex=\"0 1 50rem\"\n                 fxLayoutGap=\"2rem\"\n                 fxLayout=\"column\"\n                 fxLayoutAlign=\"start stretch\"\n                 fxFlexFill>\n                <div class=\"form__field\">\n                    <label>{{ 'SETTINGS.LANGUAGE.TITLE' | translate }}</label>\n                    <ng-select class=\"with-circle\"\n                               [items]=\"languagesOptions\"\n                               bindValue=\"name\"\n                               bindLabel=\"language\"\n                               [(ngModel)]=\"variablesService.settings.language\"\n                               [clearable]=\"false\"\n                               [searchable]=\"false\"\n                               (change)=\"onLanguageChange()\">\n                        <ng-template ng-label-tmp\n                                     let-item=\"item\">\n                            {{item.language | translate}}\n                        </ng-template>\n                        <ng-template ng-option-tmp\n                                     let-item=\"item\"\n                                     let-index=\"index\">\n                            {{item.language | translate}}\n                        </ng-template>\n                    </ng-select>\n                </div>\n\n                <div class=\"form__field\">\n                    <label>{{ 'SETTINGS.APP_LOCK.TITLE' | translate }}</label>\n                    <ng-select class=\"with-circle\"\n                               [items]=\"appLockOptions\"\n                               bindValue=\"id\"\n                               bindLabel=\"name\"\n                               [(ngModel)]=\"variablesService.settings.appLockTime\"\n                               [clearable]=\"false\"\n                               [searchable]=\"false\"\n                               (change)=\"onLockChange()\">\n                        <ng-template ng-label-tmp\n                                     let-item=\"item\">\n                            {{item.name | translate}}\n                        </ng-template>\n                        <ng-template ng-option-tmp\n                                     let-item=\"item\"\n                                     let-index=\"index\">\n                            {{item.name | translate}}\n                        </ng-template>\n                    </ng-select>\n                </div>\n\n                <div class=\"form__field\">\n                    <label>{{ 'SETTINGS.SCALE.TITLE' | translate }}</label>\n                    <ng-select class=\"with-circle\"\n                               [items]=\"appScaleOptions\"\n                               bindValue=\"value\"\n                               bindLabel=\"name\"\n                               [(ngModel)]=\"variablesService.settings.scale\"\n                               [clearable]=\"false\"\n                               [searchable]=\"false\"\n                               (change)=\"setScale()\">\n                        <ng-template ng-label-tmp\n                                     let-item=\"item\">\n                            {{item.name | translate}}\n                        </ng-template>\n                        <ng-template ng-option-tmp\n                                     let-item=\"item\"\n                                     let-index=\"index\">\n                            {{item.name | translate}}\n                        </ng-template>\n                    </ng-select>\n                </div>\n\n                <div class=\"form__field\">\n                    <label>{{ 'SETTINGS.APP_LOG_TITLE' | translate }}</label>\n                    <ng-select class=\"with-circle\"\n                               [items]=\"appLogOptions\"\n                               bindValue=\"id\"\n                               bindLabel=\"id\"\n                               [(ngModel)]=\"variablesService.settings.appLog\"\n                               [clearable]=\"false\"\n                               [searchable]=\"false\"\n                               (change)=\"onLogChange()\">\n                    </ng-select>\n                </div>\n\n                <div class=\"form__field\">\n                    <label>{{ 'SETTINGS.NOTIFICATIONS' | translate }}</label>\n                    <app-switch\n                          [value]=\"currentNotificationsState\"\n                          (emitChange)=\"toggleNotifications()\"></app-switch>\n                </div>\n\n                <div class=\"form__field\">\n                    <label>{{ 'SETTINGS.USE_TOR_TO_RELAY_TRANSACTIONS' | translate }} (Temporarily disabled)</label>\n\t\t\t\t\t<app-switch\n\t\t\t\t\t\t(emitChange)=\"toggleUseTor()\"\n\t\t\t\t\t\t[disabled]=\"true\"\n\t\t\t\t\t\t[value]=\"false && appUseTor\"></app-switch>\n                </div>\n\n                <form class=\"form\"\n                      [formGroup]=\"changeForm\"\n                      (ngSubmit)=\"onSubmitChangePass()\">\n\n                    <h4 class=\"master-password-title mb-2\">{{ 'SETTINGS.MASTER_PASSWORD.TITLE' | translate }}</h4>\n\n                    <div class=\"form__field\"\n                         *ngIf=\"variablesService.appPass\">\n                        <label for=\"old-password\">{{ 'SETTINGS.MASTER_PASSWORD.OLD' | translate }}</label>\n                        <input class=\"form__field--input\"\n                               type=\"password\"\n                               id=\"old-password\"\n                               [class.invalid]=\"changeForm.invalid && changeForm.controls['password'].valid && (changeForm.controls['password'].dirty || changeForm.controls['password'].touched) && changeForm.errors && changeForm.errors['pass_mismatch'] && changeForm.get('password').value.length > 0\"\n                               formControlName=\"password\"\n                               placeholder=\"{{ 'PLACEHOLDERS.PLACEHOLDER_OLD' | translate }}\"\n                               (contextmenu)=\"variablesService.onContextMenuPasteSelect($event)\"/>\n                        <div class=\"error\"\n                             *ngIf=\"changeForm.invalid && changeForm.controls['password'].valid && (changeForm.controls['password'].dirty || changeForm.controls['password'].touched) && changeForm.errors && changeForm.errors['pass_mismatch'] && changeForm.get('password').value.length > 0\">\n                            {{ 'SETTINGS.FORM_ERRORS.PASS_NOT_MATCH' | translate }}\n                        </div>\n                    </div>\n\n                    <div class=\"form__field\">\n                        <label for=\"new-password\">{{ 'SETTINGS.MASTER_PASSWORD.NEW' | translate }}</label>\n                        <input class=\"form__field--input\"\n\t\t\t\t\t\t\t   (contextmenu)=\"variablesService.onContextMenuPasteSelect($event)\"\n\t\t\t\t\t\t\t   [class.invalid]=\"changeForm.controls['new_password'].errors && changeForm.controls['new_password'].touched\"\n\t\t\t\t\t\t\t   formControlName=\"new_password\"\n\t\t\t\t\t\t\t   id=\"new-password\"\n\t\t\t\t\t\t\t   placeholder=\"{{ 'PLACEHOLDERS.PLACEHOLDER_NEW' | translate }}\"\n\t\t\t\t\t\t\t   type=\"password\"/>\n\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t*ngIf=\"changeForm.controls['new_password'].touched && changeForm.controls['new_password'].errors\"\n\t\t\t\t\t\t\tclass=\"error\">\n\t\t\t\t\t\t\t<div *ngIf=\"changeForm.controls['new_password'].errors.pattern\">\n\t\t\t\t\t\t\t\t{{ 'ERRORS.WRONG_PASSWORD' | translate }}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div *ngIf=\"changeForm.get('new_password').hasError('required')\">\n\t\t\t\t\t\t\t\t{{ 'LOGIN.FORM_ERRORS.PASS_REQUIRED' | translate }}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n                    </div>\n\n                    <div class=\"form__field\">\n                        <label for=\"confirm-password\">{{ 'SETTINGS.MASTER_PASSWORD.CONFIRM' | translate }}</label>\n                        <input class=\"form__field--input\"\n\t\t\t\t\t\t\t   (contextmenu)=\"variablesService.onContextMenuPasteSelect($event)\"\n\t\t\t\t\t\t\t   [class.invalid]=\"changeForm.invalid && (changeForm.controls['new_confirmation'].dirty || changeForm.controls['new_confirmation'].touched) && changeForm.errors && changeForm.errors['confirm_mismatch'] && changeForm.get('new_confirmation').value?.length > 0\"\n\t\t\t\t\t\t\t   formControlName=\"new_confirmation\"\n\t\t\t\t\t\t\t   id=\"confirm-password\"\n\t\t\t\t\t\t\t   placeholder=\"{{ 'PLACEHOLDERS.PLACEHOLDER_CONFIRM' | translate }}\"\n\t\t\t\t\t\t\t   type=\"password\"/>\n\t\t\t\t\t\t<div *ngIf=\"changeForm.invalid && (changeForm.controls['new_confirmation'].dirty || changeForm.controls['new_confirmation'].touched) && changeForm.errors && changeForm.errors['confirm_mismatch'] && changeForm.get('new_confirmation').value?.length > 0\"\n\t\t\t\t\t\t\t class=\"error\">\n\t\t\t\t\t\t\t{{ 'SETTINGS.FORM_ERRORS.CONFIRM_NOT_MATCH' | translate }}\n\t\t\t\t\t\t</div>\n                    </div>\n\n                    <div class=\"submit-button-container\">\n                        <button type=\"submit\"\n                                class=\"primary big max-w-19-rem w-100\"\n                                [disabled]=\"!changeForm.valid\">{{ 'SETTINGS.MASTER_PASSWORD.BUTTON' | translate }}</button>\n                        <span class=\"ml-1 color-aqua\"\n                              *ngIf=\"ifSaved\"\n                              [class.active]=\"ifSaved\">{{ 'SETTINGS.SETTINGS_SAVED' | translate }}</span>\n                    </div>\n                </form>\n                <p>Build version: {{ currentBuild }}</p>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/settings/settings.component.scss":
/*!**************************************************!*\
  !*** ./src/app/settings/settings.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL3NldHRpbmdzL3NldHRpbmdzLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zZXR0aW5ncy9zZXR0aW5ncy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL3NldHRpbmdzL3NldHRpbmdzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuIiwiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/settings/settings.component.ts":
/*!************************************************!*\
  !*** ./src/app/settings/settings.component.ts ***!
  \************************************************/
/*! exports provided: SettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsComponent", function() { return SettingsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _helpers_data_scale_items__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_helpers/data/scale-items */ "./src/app/_helpers/data/scale-items.ts");








var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(renderer, variablesService, backend, location, translate, ngZone) {
        var _this = this;
        this.renderer = renderer;
        this.variablesService = variablesService;
        this.backend = backend;
        this.location = location;
        this.translate = translate;
        this.ngZone = ngZone;
        this.ifSaved = false;
        this.languagesOptions = [
            {
                name: 'en',
                language: 'SETTINGS.LANGUAGE.EN'
            },
            {
                name: 'fr',
                language: 'SETTINGS.LANGUAGE.FR'
            },
            {
                name: 'de',
                language: 'SETTINGS.LANGUAGE.DE'
            },
            {
                name: 'id',
                language: 'SETTINGS.LANGUAGE.ID'
            },
            {
                name: 'it',
                language: 'SETTINGS.LANGUAGE.IT'
            },
            {
                name: 'pt',
                language: 'SETTINGS.LANGUAGE.PT'
            }
        ];
        this.appLockOptions = [
            {
                id: 5,
                name: 'SETTINGS.APP_LOCK.TIME1'
            },
            {
                id: 15,
                name: 'SETTINGS.APP_LOCK.TIME2'
            },
            {
                id: 60,
                name: 'SETTINGS.APP_LOCK.TIME3'
            },
            {
                id: 0,
                name: 'SETTINGS.APP_LOCK.TIME4'
            }
        ];
        this.appScaleOptions = _helpers_data_scale_items__WEBPACK_IMPORTED_MODULE_7__["scaleItems"];
        this.appLogOptions = [
            {
                id: -1
            },
            {
                id: 0
            },
            {
                id: 1
            },
            {
                id: 2
            },
            {
                id: 3
            },
            {
                id: 4
            }
        ];
        this.currentBuild = '';
        this.scale = this.variablesService.settings.scale;
        this.appUseTor = this.variablesService.settings.appUseTor;
        this.changeForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroup"]({
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            new_password: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(this.variablesService.pattern)]),
            new_confirmation: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('')
        }, [function (g) {
                return g.get('new_password').value === g.get('new_confirmation').value ? null : { 'confirm_mismatch': true };
            }, function (g) {
                if (_this.variablesService.appPass) {
                    return g.get('password').value === _this.variablesService.appPass ? null : { 'pass_mismatch': true };
                }
                return null;
            }]);
    }
    SettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.backend.getVersion(function (version, type, error) {
            _this.ngZone.run(function () {
                if (!error) {
                    _this.currentBuild = version;
                    _this.variablesService.testnet = false;
                    if (type === 'testnet') {
                        _this.currentBuild += ' TESTNET';
                        _this.variablesService.testnet = true;
                    }
                    _this.variablesService.networkType = type;
                }
                else {
                    _this.currentBuild = 'There was an error getting the build version';
                }
            });
        });
        this.backend.getIsDisabledNotifications(function (res) {
            _this.currentNotificationsState = res;
        });
    };
    SettingsComponent.prototype.setScale = function () {
        this.scale = this.variablesService.settings.scale;
        this.renderer.setStyle(document.documentElement, 'font-size', this.scale);
        this.backend.storeAppData();
    };
    SettingsComponent.prototype.onSubmitChangePass = function () {
        var _this = this;
        if (this.changeForm.valid) {
            this.onSave();
            this.variablesService.appPass = this.changeForm.get('new_password').value;
            // if (this.variablesService.appPass) {
            this.backend.setMasterPassword({ pass: this.variablesService.appPass }, function (status, data) {
                if (status) {
                    _this.backend.storeSecureAppData({ pass: _this.variablesService.appPass });
                    _this.variablesService.appLogin = true;
                    _this.variablesService.dataIsLoaded = true;
                    if (_this.variablesService.settings.appLockTime) {
                        _this.variablesService.startCountdown();
                    }
                }
                else {
                    console.log(data['error_code']);
                }
            });
            // } else {
            // this.backend.dropSecureAppData((status, data) => {
            // });
            // }
            this.changeForm.reset();
        }
    };
    SettingsComponent.prototype.toggleNotifications = function () {
        if (!this.currentNotificationsState) {
            this.backend.setIsDisabledNotifications('true');
            this.currentNotificationsState = true;
        }
        else {
            this.backend.setIsDisabledNotifications('false');
            this.currentNotificationsState = false;
        }
    };
    SettingsComponent.prototype.toggleUseTor = function () {
        this.appUseTor = !this.appUseTor;
        this.variablesService.settings.appUseTor = this.appUseTor;
        this.backend.setEnableTor(this.appUseTor);
        this.backend.storeAppData();
    };
    SettingsComponent.prototype.onSave = function () {
        var _this = this;
        this.ifSaved = true;
        setTimeout(function () {
            _this.ifSaved = false;
        }, 3000);
    };
    SettingsComponent.prototype.onLockChange = function () {
        if (this.variablesService.appLogin && this.variablesService.settings.appLockTime) {
            this.variablesService.restartCountdown();
        }
    };
    SettingsComponent.prototype.onLogChange = function () {
        this.backend.setLogLevel(this.variablesService.settings.appLog);
        this.backend.storeAppData();
    };
    SettingsComponent.prototype.onLanguageChange = function () {
        this.translate.use(this.variablesService.settings.language);
        this.backend.storeAppData();
    };
    SettingsComponent.prototype.back = function () {
        this.location.back();
    };
    SettingsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-settings',
            template: __webpack_require__(/*! ./settings.component.html */ "./src/app/settings/settings.component.html"),
            styles: [__webpack_require__(/*! ./settings.component.scss */ "./src/app/settings/settings.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_2__["VariablesService"],
            _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_3__["BackendService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_5__["Location"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], SettingsComponent);
    return SettingsComponent;
}());



/***/ }),

/***/ "./src/app/sidebar/sidebar.component.html":
/*!************************************************!*\
  !*** ./src/app/sidebar/sidebar.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar-header mb-2\">\n\t<div class=\"logo\">\n\t\t<img src=\"assets/icons/blue/infinium-logo.svg\"\n\t\t\t alt=\"infinium-logo\">\n\t</div>\n</div>\n\n<div class=\"sidebar-content\">\n\t<div class=\"sidebar-content-list scrolled-content mb-1\"\n\t\t cdkDropList\n\t\t cdkDropListLockAxis=\"y\"\n\t\t #scrollContainer\n\t\t (cdkDropListDropped)=\"drop($event)\">\n\t\t<ng-container *ngFor=\"let wallet of variablesService.wallets\">\n\t\t\t<div class=\"wallet\"\n\t\t\t\t cdkDrag\n\t\t\t\t vsDragScroll\n\t\t\t\t [class.active]=\"wallet?.wallet_id === variablesService?.currentWallet?.wallet_id\"\n\t\t\t\t [class.auditable]=\"wallet.is_auditable && !wallet.is_watch_only\"\n\t\t\t\t [class.watch-only]=\"wallet.is_watch_only\"\n\t\t\t\t [vsDragScrollContainer]=\"scrollContainer\"\n\t\t\t\t [cdkDragData]=\"wallet\"\n\t\t\t\t (click)=\"selectWallet(wallet.wallet_id)\">\n\t\t\t\t<div class=\"content\">\n\t\t\t\t\t<div class=\"header\">\n\t\t\t\t\t\t<div class=\"left\">\n\t\t\t\t\t\t\t<div class=\"name text-ellipsis\">\n                            <span class=\"indicator\"\n\t\t\t\t\t\t\t\t  *ngIf=\"wallet.new_contracts\">\n                                {{ wallet.new_contracts }}\n                            </span>\n\n\t\t\t\t\t\t\t\t<span class=\"name\"\n\t\t\t\t\t\t\t\t\t  tooltip=\"{{ wallet.name }}\"\n\t\t\t\t\t\t\t\t\t  placement=\"top-left\"\n\t\t\t\t\t\t\t\t\t  tooltipClass=\"table-tooltip account-tooltip\"\n\t\t\t\t\t\t\t\t\t  [delay]=\"500\"\n\t\t\t\t\t\t\t\t\t  [showWhenNoOverflow]=\"false\">\n                              {{!wallet.alias['name'] ? wallet.name : wallet.alias['name']}}\n                          </span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"right\">\n\t\t\t\t\t\t\t<button type=\"button\"\n\t\t\t\t\t\t\t\t\ttooltip=\"{{ 'WALLET.TOOLTIPS.CLOSE' | translate }}\"\n\t\t\t\t\t\t\t\t\tplacement=\"top\"\n\t\t\t\t\t\t\t\t\ttooltipClass=\"table-tooltip account-tooltip\"\n\t\t\t\t\t\t\t\t\t[delay]=\"500\"\n\t\t\t\t\t\t\t\t\t[timeDelay]=\"500\"\n\t\t\t\t\t\t\t\t\t(click)=\"showDialog(wallet.wallet_id)\">\n\t\t\t\t\t\t\t\t<i class=\"icon close\"></i>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"balance\">\n\t\t\t\t\t\t<span class=\"text-ellipsis mr-1\">{{wallet.balance | intToMoney : '3' }}</span>\n\t\t\t\t\t\t<span>{{variablesService.defaultCurrency}}</span>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<h4 class=\"price\"\n\t\t\t\t\t\t*appDisablePriceFetch>\n\t\t\t\t\t\t${{wallet.getMoneyEquivalent(variablesService.moneyEquivalent) | intToMoney | number :'1.2-2'}}\n\n\t\t\t\t\t\t<span class=\"percent\"\n\t\t\t\t\t\t\t  [class.red]=\"variablesService.moneyEquivalentPercent < 0\">\n                            {{ variablesService.moneyEquivalentPercent | number : '1.1-2' }}%\n                    </span>\n\t\t\t\t\t</h4>\n\n\t\t\t\t\t<ng-container\n\t\t\t\t\t\t*ngIf=\"(!wallet.is_auditable && !wallet.is_watch_only) || (wallet.is_auditable && !wallet.is_watch_only)\">\n\t\t\t\t\t\t<div class=\"staking\"\n\t\t\t\t\t\t\t *ngIf=\"!(!wallet.loaded && variablesService.daemon_state === 2)\">\n\t\t\t\t\t\t\t<span class=\"text\">{{ 'SIDEBAR.ACCOUNT.STAKING' | translate }}</span>\n\t\t\t\t\t\t\t<app-staking-switch [wallet_id]=\"wallet.wallet_id\"\n\t\t\t\t\t\t\t\t\t\t\t\t[(staking)]=\"wallet.staking\"></app-staking-switch>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</ng-container>\n\n\t\t\t\t\t<div class=\"account-synchronization\"\n\t\t\t\t\t\t *ngIf=\"!wallet.loaded && variablesService.daemon_state === 2\">\n\t\t\t\t\t\t<div class=\"progress-bar\">\n\t\t\t\t\t\t\t<div class=\"fill\"\n\t\t\t\t\t\t\t\t [style.width]=\"wallet.progress + '%'\"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"progress-percent\">{{ wallet.progress }}%</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</ng-container>\n\t</div>\n\n\t<div class=\"sidebar-nav scrolled-content\">\n\t\t<!-- ui-kit -->\n\t\t<ng-container *ngIf=\"false\">\n\t\t\t<button class=\"outline small w-100 mb-1 px-2\"\n\t\t\t\t\tfxLayout=\"row inline wrap\"\n\t\t\t\t\tfxLayoutAlign=\"start center\"\n\t\t\t\t\trouterLinkActive=\"active\"\n\t\t\t\t\t[routerLink]=\"['/ui-kit']\">\n\t\t\t\t<span>ui-kit</span>\n\t\t\t</button>\n\t\t</ng-container>\n\n\t\t<!-- add wallet -->\n\t\t<button class=\"outline small w-100 mb-1 px-2\"\n\t\t\t\tfxLayout=\"row inline wrap\"\n\t\t\t\tfxLayoutAlign=\"start center\"\n\t\t\t\t(click)=\"goMainPage()\">\n\t\t\t<i class=\"icon plus mr-1\"></i>\n\t\t\t<span>{{ 'SIDEBAR.ADD_NEW' | translate }}</span>\n\t\t</button>\n\n\t\t<!-- contact -->\n\t\t<!-- TODO: Uncomment if needed page contact. If you want deleted, please ask Ravaga -->\n\n\t\t<!--        <ng-container *ngIf=\"variablesService.appPass === ''; else contactsShow\">-->\n\t\t<!--            <button class=\"outline small w-100 mb-1 px-2\"-->\n\t\t<!--                    fxLayout=\"row inline wrap\"-->\n\t\t<!--                    fxLayoutAlign=\"start center\"-->\n\t\t<!--                    routerLinkActive=\"active\"-->\n\t\t<!--                    tooltip=\"{{ 'SIDEBAR.CONTACTS_TOOLTIP' | translate }}\"-->\n\t\t<!--                    placement=\"top\"-->\n\t\t<!--                    tooltipClass=\"table-tooltip account-tooltip\"-->\n\t\t<!--                    [delay]=\"500\"-->\n\t\t<!--                    [timeDelay]=\"500\"-->\n\t\t<!--                    [disabled]=\"variablesService.daemon_state !== 2 || variablesService.appPass === ''\"-->\n\t\t<!--                    (click)=\"contactsRoute()\">-->\n\t\t<!--                <i class=\"icon contacts mr-1\"></i>-->\n\t\t<!--                <span>{{ 'SIDEBAR.CONTACTS' | translate }}</span>-->\n\t\t<!--            </button>-->\n\t\t<!--        </ng-container>-->\n\n\t\t<!--        <ng-template #contactsShow>-->\n\t\t<!--            <button class=\"outline small w-100 mb-1 px-2\"-->\n\t\t<!--                    fxLayout=\"row inline wrap\"-->\n\t\t<!--                    fxLayoutAlign=\"start center\"-->\n\t\t<!--                    routerLinkActive=\"active\"-->\n\t\t<!--                    (click)=\"contactsRoute()\"-->\n\t\t<!--                    [disabled]=\"variablesService.daemon_state !== 2\">-->\n\t\t<!--                <i class=\"icon contacts mr-1\"></i>-->\n\t\t<!--                <span>{{ 'SIDEBAR.CONTACTS' | translate }}</span>-->\n\t\t<!--            </button>-->\n\t\t<!--        </ng-template>-->\n\n\t\t<!-- settings -->\n\t\t<button class=\"outline small w-100 mb-1 px-2\"\n\t\t\t\tfxLayout=\"row inline wrap\"\n\t\t\t\tfxLayoutAlign=\"start center\"\n\t\t\t\trouterLinkActive=\"active\"\n\t\t\t\t[routerLink]=\"['/settings']\">\n\t\t\t<i class=\"icon settings mr-1\"></i>\n\t\t\t<span> {{ 'SIDEBAR.SETTINGS' | translate }}</span>\n\t\t</button>\n\n\t\t<!-- Log out -->\n\t\t<ng-container *ngIf=\"variablesService.appPass === ''; else masterPass\">\n\t\t\t<button class=\"outline small w-100 px-2\"\n\t\t\t\t\tfxLayout=\"row inline wrap\"\n\t\t\t\t\tfxLayoutAlign=\"start center\"\n\t\t\t\t\ttooltip=\"{{ 'SIDEBAR.LOG_OUT_TOOLTIP' | translate }}\"\n\t\t\t\t\tplacement=\"bottom\"\n\t\t\t\t\ttooltipClass=\"table-tooltip account-tooltip\"\n\t\t\t\t\t[delay]=\"500\"\n\t\t\t\t\t[timeDelay]=\"500\"\n\t\t\t\t\t[disabled]=\"variablesService.appPass === ''\"\n\t\t\t\t\t(click)=\"logOut()\">\n\t\t\t\t<i class=\"icon logout mr-1\"></i>\n\t\t\t\t<span> {{ 'SIDEBAR.LOG_OUT' | translate }}</span>\n\t\t\t</button>\n\t\t</ng-container>\n\n\t\t<ng-template #masterPass>\n\t\t\t<button class=\"outline small w-100 px-2\"\n\t\t\t\t\tfxLayout=\"row inline wrap\"\n\t\t\t\t\tfxLayoutAlign=\"start center\"\n\t\t\t\t\t(click)=\"logOut()\">\n\t\t\t\t<i class=\"icon logout mr-1\"></i>\n\t\t\t\t<span> {{ 'SIDEBAR.LOG_OUT' | translate }}</span>\n\t\t\t</button>\n\t\t</ng-template>\n\t</div>\n</div>\n\n<div class=\"sidebar-footer\">\n\t<app-synchronization-status></app-synchronization-status>\n</div>\n\n<app-confirm-modal *ngIf=\"isModalDialogVisible\"\n\t\t\t\t   [title]=\" 'WALLET.CONFIRM.TITLE' | translate \"\n\t\t\t\t   [message]=\" 'WALLET.CONFIRM.MESSAGE' | translate \"\n\t\t\t\t   (confirmed)=\"confirmed($event)\"></app-confirm-modal>\n\n<app-deeplink></app-deeplink>\n"

/***/ }),

/***/ "./src/app/sidebar/sidebar.component.scss":
/*!************************************************!*\
  !*** ./src/app/sidebar/sidebar.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NpZGViYXIvc2lkZWJhci5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/sidebar/sidebar.component.ts":
/*!**********************************************!*\
  !*** ./src/app/sidebar/sidebar.component.ts ***!
  \**********************************************/
/*! exports provided: SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_helpers/services/modal.service */ "./src/app/_helpers/services/modal.service.ts");
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_shared/constants */ "./src/app/_shared/constants.ts");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "./node_modules/@angular/cdk/esm5/drag-drop.es5.js");








var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(route, router, variablesService, backend, modal, ngZone) {
        this.route = route;
        this.router = router;
        this.variablesService = variablesService;
        this.backend = backend;
        this.modal = modal;
        this.ngZone = ngZone;
        this.isModalDialogVisible = false;
    }
    SidebarComponent.prototype.goMainPage = function () {
        var _this = this;
        if (this.route.snapshot.queryParams && this.route.snapshot.queryParams.prevUrl === 'login') {
            this.ngZone.run(function () {
                _this.router.navigate(['/'], { queryParams: { prevUrl: 'login' } });
            });
        }
        else {
            this.ngZone.run(function () {
                _this.router.navigate(['/']);
            });
        }
    };
    SidebarComponent.prototype.selectWallet = function (id) {
        var _this = this;
        this.ngZone.run(function () {
            _this.variablesService.setCurrentWallet(id);
            _this.router.navigate(['/wallet/history']);
        });
    };
    SidebarComponent.prototype.contactsRoute = function () {
        var _this = this;
        if (this.variablesService.appPass) {
            this.ngZone.run(function () {
                _this.router.navigate(['/contacts']);
            });
        }
        else {
            this.modal.prepareModal('error', 'CONTACTS.FORM_ERRORS.SET_MASTER_PASSWORD');
        }
    };
    SidebarComponent.prototype.drop = function (event) {
        Object(_angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_7__["moveItemInArray"])(this.variablesService.wallets, event.previousIndex, event.currentIndex);
    };
    SidebarComponent.prototype.showDialog = function (wallet_id) {
        this.isModalDialogVisible = true;
        this.closeWalletId = wallet_id;
    };
    SidebarComponent.prototype.confirmed = function (confirmed) {
        if (confirmed) {
            this.closeWallet(this.closeWalletId);
        }
        this.isModalDialogVisible = false;
    };
    SidebarComponent.prototype.closeWallet = function (wallet_id) {
        var _this = this;
        this.backend.closeWallet(wallet_id, function () {
            for (var i = _this.variablesService.wallets.length - 1; i >= 0; i--) {
                if (_this.variablesService.wallets[i].wallet_id === _this.variablesService.currentWallet.wallet_id) {
                    _this.variablesService.wallets.splice(i, 1);
                }
            }
            _this.ngZone.run(function () {
                if (_this.variablesService.wallets.length) {
                    _this.variablesService.currentWallet = _this.variablesService.wallets[0];
                    _this.router.navigate(['/wallet/']);
                }
                else {
                    _this.router.navigate(['/']);
                }
            });
            if (_this.variablesService.appPass) {
                _this.backend.storeSecureAppData();
            }
        });
    };
    SidebarComponent.prototype.getUpdate = function () {
        this.backend.openUrlInBrowser(_shared_constants__WEBPACK_IMPORTED_MODULE_6__["DOWNLOADS_PAGE_URL"]);
    };
    SidebarComponent.prototype.logOut = function () {
        var _this = this;
        this.variablesService.stopCountdown();
        this.variablesService.appLogin = false;
        this.variablesService.appPass = '';
        this.ngZone.run(function () {
            _this.router.navigate(['/login'], { queryParams: { type: 'auth' } });
        });
    };
    SidebarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-sidebar',
            template: __webpack_require__(/*! ./sidebar.component.html */ "./src/app/sidebar/sidebar.component.html"),
            styles: [__webpack_require__(/*! ./sidebar.component.scss */ "./src/app/sidebar/sidebar.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_3__["VariablesService"],
            _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__["BackendService"],
            _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_5__["ModalService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], SidebarComponent);
    return SidebarComponent;
}());



/***/ }),

/***/ "./src/app/sidebar/sidebar.module.ts":
/*!*******************************************!*\
  !*** ./src/app/sidebar/sidebar.module.ts ***!
  \*******************************************/
/*! exports provided: SidebarModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarModule", function() { return SidebarModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _sidebar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sidebar.component */ "./src/app/sidebar/sidebar.component.ts");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "./node_modules/@angular/cdk/esm5/drag-drop.es5.js");
/* harmony import */ var cdk_drag_scroll__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cdk-drag-scroll */ "./node_modules/cdk-drag-scroll/fesm5/cdk-drag-scroll.js");
/* harmony import */ var _helpers_directives_tooltip_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_helpers/directives/tooltip.module */ "./src/app/_helpers/directives/tooltip.module.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _synchronization_status_synchronization_status_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../synchronization-status/synchronization-status.module */ "./src/app/synchronization-status/synchronization-status.module.ts");
/* harmony import */ var _helpers_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../_helpers/pipes/pipes.module */ "./src/app/_helpers/pipes/pipes.module.ts");
/* harmony import */ var _shared_directives_disable_price_fetch_disable_price_fetch_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../_shared/directives/disable-price-fetch/disable-price-fetch.module */ "./src/app/_shared/directives/disable-price-fetch/disable-price-fetch.module.ts");
/* harmony import */ var _helpers_modals_confirm_modal_confirm_modal_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../_helpers/modals/confirm-modal/confirm-modal.module */ "./src/app/_helpers/modals/confirm-modal/confirm-modal.module.ts");
/* harmony import */ var _deeplink_deeplink_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../deeplink/deeplink.module */ "./src/app/deeplink/deeplink.module.ts");
/* harmony import */ var _helpers_directives_staking_switch_staking_switch_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../_helpers/directives/staking-switch/staking-switch.module */ "./src/app/_helpers/directives/staking-switch/staking-switch.module.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
















var SidebarModule = /** @class */ (function () {
    function SidebarModule() {
    }
    SidebarModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_sidebar_component__WEBPACK_IMPORTED_MODULE_3__["SidebarComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"],
                _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_4__["DragDropModule"],
                cdk_drag_scroll__WEBPACK_IMPORTED_MODULE_5__["DragScrollModule"],
                _helpers_directives_tooltip_module__WEBPACK_IMPORTED_MODULE_6__["TooltipModule"],
                _helpers_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_10__["PipesModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateModule"],
                _shared_directives_disable_price_fetch_disable_price_fetch_module__WEBPACK_IMPORTED_MODULE_11__["DisablePriceFetchModule"],
                _helpers_modals_confirm_modal_confirm_modal_module__WEBPACK_IMPORTED_MODULE_12__["ConfirmModalModule"],
                _synchronization_status_synchronization_status_module__WEBPACK_IMPORTED_MODULE_9__["SynchronizationStatusModule"],
                _deeplink_deeplink_module__WEBPACK_IMPORTED_MODULE_13__["DeeplinkModule"],
                _helpers_directives_staking_switch_staking_switch_module__WEBPACK_IMPORTED_MODULE_14__["StakingSwitchModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_15__["FlexLayoutModule"]
            ],
            exports: [_sidebar_component__WEBPACK_IMPORTED_MODULE_3__["SidebarComponent"]]
        })
    ], SidebarModule);
    return SidebarModule;
}());



/***/ }),

/***/ "./src/app/staking/staking.component.html":
/*!************************************************!*\
  !*** ./src/app/staking/staking.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"chart-wrap\"\n     fxLayout=\"column\"\n     fxFlexFill>\n    <div class=\"scrolled-content h-100\"\n         fxLayout=\"column\"\n         fxFlex=\"1 1 auto\">\n        <div class=\"chart-header mb-1\"\n             fxFlex=\"0 0 auto\"\n             fxLayout=\"column\">\n            <div class=\"row\"\n                 fxFlex=\"0 0 auto\"\n                 fxLayoutGap=\"1rem\"\n                 fxLayout=\"row nowrap\"\n                 fxLayoutAlign=\"space-between start\">\n                <div class=\"left\"\n                     fxFlex=\"1 1 calc(50% - 0.5rem)\"\n                     fxLayout=\"row wrap\"\n                     fxLayoutAlign=\"start center\"\n                     fxLayoutGap=\"1rem\">\n\n                    <div class=\"items\"\n                         fxLayout=\"row wrap\"\n                         fxLayoutGap=\"1rem\">\n                        <div\n                              class=\"item overflow-hidden p-1 border-radius-0_8-rem mb-1\"\n                              fxLayout=\"row nowrap\"\n                              fxLayoutAlign=\"space-between center\"\n                              *ngIf=\"(!variablesService.currentWallet.is_auditable && !variablesService.currentWallet.is_watch_only)\n                  || (variablesService.currentWallet.is_auditable && !variablesService.currentWallet.is_watch_only)\">\n                            <div\n                                  class=\"left overflow-hidden mr-1\"\n                                  fxLayout=\"row\"\n                                  fxLayoutAlign=\"start center\">{{ 'STAKING.TITLE' | translate }}</div>\n\n                            <div class=\"right overflow-hidden w-100\"\n                                 fxLayout=\"row\"\n                                 fxLayoutAlign=\"end center\">\n                                <app-staking-switch\n                                      [wallet_id]=\"variablesService.currentWallet.wallet_id\"\n                                      [(staking)]=\"variablesService.currentWallet.staking\">\n                                </app-staking-switch>\n                            </div>\n                        </div>\n                        <div\n                              class=\"item overflow-hidden p-1 border-radius-0_8-rem mb-1\"\n                              fxLayout=\"row nowrap\"\n                              fxLayoutAlign=\"space-between center\">\n                            <div\n                                  class=\"left overflow-hidden mr-1\"\n                                  fxLayout=\"row\"\n                                  fxLayoutAlign=\"start center\">{{ 'STAKING.TITLE_PENDING' | translate }}\n                                :\n                            </div>\n                            <div class=\"right overflow-hidden w-100\"\n                                 fxLayout=\"row\"\n                                 fxLayoutAlign=\"end center\">\n                                <div class=\"text-ellipsis mr-1\">{{pending.total | intToMoney}}</div>\n                                {{variablesService.defaultCurrency}}</div>\n                        </div>\n                        <div\n                              class=\"item overflow-hidden p-1 border-radius-0_8-rem mb-1\"\n                              fxLayout=\"row nowrap\"\n                              fxLayoutAlign=\"space-between center\">\n                            <div\n                                  class=\"left overflow-hidden mr-1\"\n                                  fxLayout=\"row\"\n                                  fxLayoutAlign=\"start center\">{{ 'STAKING.TITLE_TOTAL' | translate }}\n                                :\n                            </div>\n                            <div class=\"right overflow-hidden w-100\"\n                                 fxLayout=\"row\"\n                                 fxLayoutAlign=\"end center\">\n                                <div class=\"text-ellipsis mr-1\">{{total | intToMoney}}</div>\n                                {{variablesService.defaultCurrency}}</div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"right\"\n                     fxFlex=\"1 1 calc(50% - 0.5rem)\"\n                     fxLayout=\"row\"\n                     fxLayoutAlign=\"end center\"\n                     fxLayoutGap=\"1rem\">\n                    <div class=\"selected overflow-hidden\"\n                         fxHide\n                         fxShow.xl\n                         fxShow.lg\n                         *ngIf=\"selectedDate && selectedDate.date\">\n                        <div fxLayout=\"row\" class=\"overflow-hidden\">\n                            <div class=\"text-ellipsis\">{{selectedDate.date | date : 'EEEE, MMMM d, y'}}\n                            {{selectedDate.amount}}</div>\n                            <div class=\"ml-0_5\">{{variablesService.defaultCurrency}}</div>\n                        </div>\n                    </div>\n\n                    <ng-select class=\"selected-group max-w-19-rem w-100\"\n                               [items]=\"groups\"\n                               bindValue=\"key\"\n                               bindLabel=\"title\"\n                               [(ngModel)]=\"selectedGroup\"\n                               [clearable]=\"false\"\n                               [searchable]=\"false\"\n                               (change)=\"changeGroup($event)\">\n                        <ng-template ng-label-tmp\n                                     let-item=\"item\">\n                            Sort by {{(item.title | translate | lowercase) + 's'}}\n                        </ng-template>\n                        <ng-template ng-option-tmp\n                                     let-item=\"item\"\n                                     let-index=\"index\">\n                            {{item.title | translate}}\n                        </ng-template>\n                    </ng-select>\n                </div>\n            </div>\n            <div class=\"row\"\n                 fxShow\n                 fxHide.xl\n                 fxHide.lg\n                 fxFlex=\"0 0 2rem\"\n                 fxLayoutGap=\"1rem\"\n                 fxLayout=\"row nowrap\"\n                 fxLayoutAlign=\"space-between center\">\n                <div class=\"left\"></div>\n                <div class=\"right\"\n                     fxLayoutAlign=\"end center\">\n                    <div class=\"selected overflow-hidden\"\n                         *ngIf=\"selectedDate && selectedDate.date\">\n                        <div fxLayout=\"row\" class=\"overflow-hidden\">\n                            <div class=\"text-ellipsis\">{{selectedDate.date | date : 'EEEE, MMMM d, y'}}\n                                {{selectedDate.amount}}</div>\n                            <div class=\"ml-0_5\">{{variablesService.defaultCurrency}}</div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"chart border-radius-0_8-rem\"\n             fxFlex=\"1 1 auto\"\n             fxLayoutAlign=\" center\">\n            <div [chart]=\"chart\"></div>\n        </div>\n\n        <div class=\"chart-options mt-2\"\n             fxFlex=\"0 0 auto\"\n             fxLayoutAlign=\" center\">\n            <ng-container *ngFor=\"let period of periods; let last = last\">\n                <button type=\"button\"\n                        class=\"big w-100\"\n                        [class.outline]=\"!last\"\n                        [class.primary]=\"last\"\n                        [class.mr-1]=\"!last\"\n                        [class.active]=\"period.active\"\n                        (click)=\"changePeriod(period)\">{{period.title}}</button>\n            </ng-container>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/staking/staking.component.scss":
/*!************************************************!*\
  !*** ./src/app/staking/staking.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL3N0YWtpbmcvc3Rha2luZy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvc3Rha2luZy9zdGFraW5nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL3N0YWtpbmcvc3Rha2luZy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbn1cbiIsIjpob3N0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbn0iXX0= */"

/***/ }),

/***/ "./src/app/staking/staking.component.ts":
/*!**********************************************!*\
  !*** ./src/app/staking/staking.component.ts ***!
  \**********************************************/
/*! exports provided: StakingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StakingComponent", function() { return StakingComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var angular_highcharts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-highcharts */ "./node_modules/angular-highcharts/fesm5/angular-highcharts.js");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _helpers_pipes_int_to_money_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_helpers/pipes/int-to-money.pipe */ "./src/app/_helpers/pipes/int-to-money.pipe.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! bignumber.js */ "./node_modules/bignumber.js/bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_8__);









var StakingComponent = /** @class */ (function () {
    function StakingComponent(route, variablesService, backend, ngZone, intToMoneyPipe, translate) {
        this.route = route;
        this.variablesService = variablesService;
        this.backend = backend;
        this.ngZone = ngZone;
        this.intToMoneyPipe = intToMoneyPipe;
        this.translate = translate;
        this.periods = [
            {
                title: this.translate.instant('STAKING.PERIOD.WEEK1'),
                key: '1 week',
                active: false
            },
            {
                title: this.translate.instant('STAKING.PERIOD.WEEK2'),
                key: '2 week',
                active: false
            },
            {
                title: this.translate.instant('STAKING.PERIOD.MONTH1'),
                key: '1 month',
                active: false
            },
            {
                title: this.translate.instant('STAKING.PERIOD.MONTH3'),
                key: '3 month',
                active: false
            },
            {
                title: this.translate.instant('STAKING.PERIOD.MONTH6'),
                key: '6 month',
                active: false
            },
            {
                title: this.translate.instant('STAKING.PERIOD.YEAR'),
                key: '1 year',
                active: false
            },
            {
                title: this.translate.instant('STAKING.PERIOD.ALL'),
                key: 'All',
                active: true
            }
        ];
        this.groups = [
            {
                title: this.translate.instant('STAKING.GROUP.DAY'),
                key: 'day',
                active: true
            },
            {
                title: this.translate.instant('STAKING.GROUP.WEEK'),
                key: 'week',
                active: false
            },
            {
                title: this.translate.instant('STAKING.GROUP.MONTH'),
                key: 'month',
                active: false
            }
        ];
        this.selectedGroup = this.groups[0].key;
        this.selectedDate = {
            date: null,
            amount: null
        };
        this.originalData = [];
        this.total = new bignumber_js__WEBPACK_IMPORTED_MODULE_8__["BigNumber"](0);
        this.pending = {
            list: [],
            total: new bignumber_js__WEBPACK_IMPORTED_MODULE_8__["BigNumber"](0)
        };
    }
    StakingComponent_1 = StakingComponent;
    StakingComponent.makeGroupTime = function (key, date) {
        if (key === 'day') {
            return date.setHours(0, 0, 0, 0);
        }
        else if (key === 'week') {
            return new Date(date.setDate(date.getDate() - date.getDay())).setHours(0, 0, 0, 0);
        }
        else {
            return new Date(date.setDate(1)).setHours(0, 0, 0, 0);
        }
    };
    StakingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parentRouting = this.route.parent.params.subscribe(function () {
            _this.getMiningHistory();
        });
        this.heightAppEvent = this.variablesService.getHeightAppEvent.subscribe(function (newHeight) {
            if (!_this.pending.total.isZero()) {
                var pendingCount = _this.pending.list.length;
                for (var i = pendingCount - 1; i >= 0; i--) {
                    if (newHeight - _this.pending.list[i].h >= 10) {
                        _this.pending.list.splice(i, 1);
                    }
                }
                if (pendingCount !== _this.pending.list.length) {
                    _this.pending.total = new bignumber_js__WEBPACK_IMPORTED_MODULE_8__["BigNumber"](0);
                    for (var i = 0; i < _this.pending.list.length; i++) {
                        _this.pending.total = _this.pending.total.plus(_this.pending.list[i].a);
                    }
                }
            }
        });
        this.refreshStackingEvent = this.variablesService.getRefreshStackingEvent.subscribe(function (wallet_id) {
            if (_this.variablesService.currentWallet.wallet_id === wallet_id) {
                _this.getMiningHistory();
            }
        });
    };
    StakingComponent.prototype.drawChart = function (data) {
        var _this = this;
        this.chart = new angular_highcharts__WEBPACK_IMPORTED_MODULE_3__["Chart"]({
            title: { text: '' },
            credits: { enabled: false },
            exporting: { enabled: false },
            legend: { enabled: false },
            chart: {
                type: 'line',
                backgroundColor: 'transparent',
                height: null,
                zoomType: null,
                events: {
                    load: function () {
                        _this.changePeriod();
                    }
                }
            },
            yAxis: {
                min: 0,
                tickAmount: 5,
                title: {
                    text: ''
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
                        'color': '#e0e0e0',
                        'fontSize': '13px'
                    },
                    format: '{value} ' + this.variablesService.defaultCurrency
                },
                showLastLabel: false,
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
                        'color': '#e0e0e0',
                        'fontSize': '13px'
                    }
                },
                minPadding: 0,
                maxPadding: 0,
                minRange: 86400000,
                // tickInterval: 86400000,
                minTickInterval: 3600000,
            },
            tooltip: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, 'rgba(124,181,236,0.2)'],
                            [1, 'rgba(124,181,236,0)']
                        ]
                    },
                    marker: {
                        enabled: false,
                        radius: 2
                    },
                    lineWidth: 2,
                    threshold: null
                },
                series: {
                    point: {
                        events: {
                            mouseOver: function (obj) {
                                _this.selectedDate.date = obj.target['x'];
                                _this.selectedDate.amount = obj.target['y'];
                            }
                        }
                    },
                    events: {
                        mouseOut: function () {
                            _this.selectedDate.date = null;
                            _this.selectedDate.amount = null;
                        }
                    }
                }
            },
            series: [
                {
                    type: 'area',
                    data: data
                }
            ]
        });
    };
    StakingComponent.prototype.getMiningHistory = function () {
        var _this = this;
        if (this.variablesService.currentWallet.loaded) {
            this.backend.getMiningHistory(this.variablesService.currentWallet.wallet_id, function (status, data) {
                _this.total = new bignumber_js__WEBPACK_IMPORTED_MODULE_8__["BigNumber"](0);
                _this.pending.list = [];
                _this.pending.total = new bignumber_js__WEBPACK_IMPORTED_MODULE_8__["BigNumber"](0);
                _this.originalData = [];
                if (data.mined_entries) {
                    data.mined_entries.forEach(function (item, key) {
                        if (item.t.toString().length === 10) {
                            data.mined_entries[key].t = (new Date(item.t * 1000)).setUTCMilliseconds(0);
                        }
                    });
                    data.mined_entries.forEach(function (item) {
                        _this.total = _this.total.plus(item.a);
                        if (_this.variablesService.height_app - item.h < 10) {
                            _this.pending.list.push(item);
                            _this.pending.total = _this.pending.total.plus(item.a);
                        }
                        _this.originalData.push([parseInt(item.t, 10), parseFloat(_this.intToMoneyPipe.transform(item.a))]);
                    });
                    _this.originalData = _this.originalData.sort(function (a, b) {
                        return a[0] - b[0];
                    });
                }
                _this.ngZone.run(function () {
                    _this.drawChart([]);
                });
            });
        }
    };
    StakingComponent.prototype.changePeriod = function (period) {
        if (period) {
            this.periods.forEach(function (p) {
                p.active = false;
            });
            period.active = true;
        }
        else {
            period = this.periods.find(function (p) { return p.active; });
        }
        var d = new Date();
        var min = null;
        var newData = [];
        var group = this.groups.find(function (g) { return g.active; });
        if (period.key === '1 week') {
            this.originalData.forEach(function (item) {
                var time = StakingComponent_1.makeGroupTime(group.key, new Date(item[0]));
                var find = newData.find(function (itemNew) { return itemNew[0] === time; });
                if (find) {
                    find[1] = new bignumber_js__WEBPACK_IMPORTED_MODULE_8__["BigNumber"](find[1]).plus(item[1]).toNumber();
                }
                else {
                    newData.push([time, item[1]]);
                }
            });
            this.chart.ref.series[0].setData(newData, true);
            min = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate() - 7, 0, 0, 0, 0);
        }
        else if (period.key === '2 week') {
            this.originalData.forEach(function (item) {
                var time = StakingComponent_1.makeGroupTime(group.key, new Date(item[0]));
                var find = newData.find(function (itemNew) { return itemNew[0] === time; });
                if (find) {
                    find[1] = new bignumber_js__WEBPACK_IMPORTED_MODULE_8__["BigNumber"](find[1]).plus(item[1]).toNumber();
                }
                else {
                    newData.push([time, item[1]]);
                }
            });
            this.chart.ref.series[0].setData(newData, true);
            min = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate() - 14, 0, 0, 0, 0);
        }
        else if (period.key === '1 month') {
            this.originalData.forEach(function (item) {
                var time = StakingComponent_1.makeGroupTime(group.key, new Date(item[0]));
                var find = newData.find(function (itemNew) { return itemNew[0] === time; });
                if (find) {
                    find[1] = new bignumber_js__WEBPACK_IMPORTED_MODULE_8__["BigNumber"](find[1]).plus(item[1]).toNumber();
                }
                else {
                    newData.push([time, item[1]]);
                }
            });
            this.chart.ref.series[0].setData(newData, true);
            min = Date.UTC(d.getFullYear(), d.getMonth() - 1, d.getDate(), 0, 0, 0, 0);
        }
        else if (period.key === '3 month') {
            this.originalData.forEach(function (item) {
                var time = StakingComponent_1.makeGroupTime(group.key, new Date(item[0]));
                var find = newData.find(function (itemNew) { return itemNew[0] === time; });
                if (find) {
                    find[1] = new bignumber_js__WEBPACK_IMPORTED_MODULE_8__["BigNumber"](find[1]).plus(item[1]).toNumber();
                }
                else {
                    newData.push([time, item[1]]);
                }
            });
            this.chart.ref.series[0].setData(newData, true);
            min = Date.UTC(d.getFullYear(), d.getMonth() - 3, d.getDate(), 0, 0, 0, 0);
        }
        else if (period.key === '6 month') {
            this.originalData.forEach(function (item) {
                var time = StakingComponent_1.makeGroupTime(group.key, new Date(item[0]));
                var find = newData.find(function (itemNew) { return itemNew[0] === time; });
                if (find) {
                    find[1] = new bignumber_js__WEBPACK_IMPORTED_MODULE_8__["BigNumber"](find[1]).plus(item[1]).toNumber();
                }
                else {
                    newData.push([time, item[1]]);
                }
            });
            this.chart.ref.series[0].setData(newData, true);
            min = Date.UTC(d.getFullYear(), d.getMonth() - 6, d.getDate(), 0, 0, 0, 0);
        }
        else if (period.key === '1 year') {
            this.originalData.forEach(function (item) {
                var time = StakingComponent_1.makeGroupTime(group.key, new Date(item[0]));
                var find = newData.find(function (itemNew) { return itemNew[0] === time; });
                if (find) {
                    find[1] = new bignumber_js__WEBPACK_IMPORTED_MODULE_8__["BigNumber"](find[1]).plus(item[1]).toNumber();
                }
                else {
                    newData.push([time, item[1]]);
                }
            });
            this.chart.ref.series[0].setData(newData, true);
            min = Date.UTC(d.getFullYear() - 1, d.getMonth(), d.getDate(), 0, 0, 0, 0);
        }
        else {
            this.originalData.forEach(function (item) {
                var time = StakingComponent_1.makeGroupTime(group.key, new Date(item[0]));
                var find = newData.find(function (itemNew) { return itemNew[0] === time; });
                if (find) {
                    find[1] = new bignumber_js__WEBPACK_IMPORTED_MODULE_8__["BigNumber"](find[1]).plus(item[1]).toNumber();
                }
                else {
                    newData.push([time, item[1]]);
                }
            });
            this.chart.ref.series[0].setData(newData, true);
        }
        this.chart.ref.xAxis[0].setExtremes(min, null);
    };
    StakingComponent.prototype.changeGroup = function (group) {
        this.groups.forEach(function (g) {
            g.active = false;
        });
        group.active = true;
        this.changePeriod();
    };
    StakingComponent.prototype.ngOnDestroy = function () {
        this.parentRouting.unsubscribe();
        this.heightAppEvent.unsubscribe();
        this.refreshStackingEvent.unsubscribe();
    };
    var StakingComponent_1;
    StakingComponent = StakingComponent_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-staking',
            template: __webpack_require__(/*! ./staking.component.html */ "./src/app/staking/staking.component.html"),
            styles: [__webpack_require__(/*! ./staking.component.scss */ "./src/app/staking/staking.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_2__["VariablesService"],
            _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__["BackendService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            _helpers_pipes_int_to_money_pipe__WEBPACK_IMPORTED_MODULE_6__["IntToMoneyPipe"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"]])
    ], StakingComponent);
    return StakingComponent;
}());



/***/ }),

/***/ "./src/app/synchronization-status/synchronization-status.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/synchronization-status/synchronization-status.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"synchronization-status overflow-hidden\"\n     [ngStyle]=\"{'align-items': variablesService.daemon_state === 1 || variablesService.daemon_state === 6 ? 'flex-start' : 'center'}\">\n    <div class=\"status-container\">\n        <div class=\"offline\"\n             *ngIf=\"variablesService.daemon_state === 0\">\n            <span>{{ 'SIDEBAR.SYNCHRONIZATION.OFFLINE' | translate }}</span>\n        </div>\n        <div class=\"syncing text-ellipsis\"\n             *ngIf=\"variablesService.daemon_state === 1\">\n            {{ 'SIDEBAR.SYNCHRONIZATION.SYNCING' | translate }}\n            {{ variablesService.sync.progress_value_text }}%\n        </div>\n        <div class=\"online\"\n             *ngIf=\"variablesService.daemon_state === 2\">\n            <span>{{ 'SIDEBAR.SYNCHRONIZATION.ONLINE' | translate }}</span>\n        </div>\n        <div class=\"loading\"\n             *ngIf=\"variablesService.daemon_state === 3\">\n            {{ 'SIDEBAR.SYNCHRONIZATION.LOADING' | translate }}\n        </div>\n        <div class=\"offline\"\n             *ngIf=\"variablesService.daemon_state === 4\">\n            {{ 'SIDEBAR.SYNCHRONIZATION.ERROR' | translate }}\n        </div>\n        <div class=\"online\"\n             *ngIf=\"variablesService.daemon_state === 5\">\n            {{ 'SIDEBAR.SYNCHRONIZATION.COMPLETE' | translate }}\n        </div>\n        <div class=\"syncing text-ellipsis\"\n             *ngIf=\"variablesService.daemon_state === 6\">\n            {{ 'SIDEBAR.SYNCHRONIZATION.DOWNLOADING' | translate }}\n            {{ variablesService.download.progress_value_text }}%\n        </div>\n\n        <div class=\"progress-bar-container\"\n             *ngIf=\"variablesService.daemon_state === 1 || variablesService.daemon_state === 3\">\n            <div class=\"syncing\"\n                 *ngIf=\"variablesService.daemon_state === 1\">\n                <div class=\"progress-bar\">\n                    <div class=\"fill\"\n                         [style.width]=\"variablesService.sync.progress_value + '%'\"></div>\n                </div>\n            </div>\n            <div class=\"loading\"\n                 *ngIf=\"variablesService.daemon_state === 3\"></div>\n        </div>\n\n        <div class=\"progress-bar-container\"\n             *ngIf=\"variablesService.daemon_state === 6\">\n            <div class=\"syncing downloading\"\n                 *ngIf=\"variablesService.daemon_state === 6\">\n                <div class=\"progress-bar\">\n                    <div class=\"fill\"\n                         [style.width]=\"variablesService.download.progress_value + '%'\"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"update-container\"\n         *ngIf=\"(variablesService.daemon_state === 0 || variablesService.daemon_state === 2) && [2, 3, 4].indexOf(variablesService.last_build_displaymode) !== -1\">\n        <ng-container *ngIf=\"variablesService.last_build_displaymode === 2\">\n            <div class=\"update-text standard\">\n                <span [style.cursor]=\"'pointer'\"\n                      (click)=\"getUpdate()\">{{ 'SIDEBAR.UPDATE.STANDARD' | translate }}</span>\n            </div>\n            <i class=\"icon update standard\"\n               tooltip=\"{{ 'SIDEBAR.UPDATE.STANDARD_TOOLTIP' | translate }}\"\n               placement=\"right-bottom\"\n               tooltipClass=\"update-tooltip\"\n               [delay]=\"500\"></i>\n        </ng-container>\n\n        <ng-container *ngIf=\"variablesService.last_build_displaymode === 3\">\n            <div class=\"update-text important\">\n                <span [style.cursor]=\"'pointer'\"\n                      (click)=\"getUpdate()\">{{ 'SIDEBAR.UPDATE.IMPORTANT' | translate }}</span>\n                <span style=\"font-size: 1rem\">{{ 'SIDEBAR.UPDATE.IMPORTANT_HINT' | translate }}</span>\n            </div>\n            <i class=\"icon update important\"\n               tooltip=\"{{ 'SIDEBAR.UPDATE.IMPORTANT_TOOLTIP' | translate }}\"\n               placement=\"right-bottom\"\n               tooltipClass=\"update-tooltip important\"\n               [delay]=\"500\"></i>\n        </ng-container>\n\n        <ng-container *ngIf=\"variablesService.last_build_displaymode === 4\">\n            <div class=\"update-text critical\">\n                <span [style.cursor]=\"'pointer'\"\n                      (click)=\"getUpdate()\">{{ 'SIDEBAR.UPDATE.CRITICAL' | translate }}</span>\n                <span style=\"font-size: 1rem\">{{ 'SIDEBAR.UPDATE.IMPORTANT_HINT' | translate }}</span>\n            </div>\n            <i class=\"icon update critical\"\n               tooltip=\"{{ 'SIDEBAR.UPDATE.CRITICAL_TOOLTIP' | translate }}\"\n               placement=\"right-bottom\"\n               tooltipClass=\"update-tooltip critical\"\n               [delay]=\"500\"></i>\n        </ng-container>\n    </div>\n\n    <div class=\"update-container\"\n         *ngIf=\"variablesService.daemon_state === 2 && variablesService.net_time_delta_median !== 0\">\n        <div class=\"update-text time-orange\">\n            <span>{{ 'SIDEBAR.UPDATE.TIME' | translate }}</span>\n        </div>\n        <i class=\"icon time-orange\"\n           tooltip=\"{{ 'SIDEBAR.UPDATE.TIME_TOOLTIP' | translate }}\"\n           placement=\"right-bottom\"\n           tooltipClass=\"update-tooltip important\"\n           [delay]=\"500\"></i>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/synchronization-status/synchronization-status.component.scss":
/*!******************************************************************************!*\
  !*** ./src/app/synchronization-status/synchronization-status.component.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3N5bmNocm9uaXphdGlvbi1zdGF0dXMvc3luY2hyb25pemF0aW9uLXN0YXR1cy5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/synchronization-status/synchronization-status.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/synchronization-status/synchronization-status.component.ts ***!
  \****************************************************************************/
/*! exports provided: SynchronizationStatusComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SynchronizationStatusComponent", function() { return SynchronizationStatusComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_shared/constants */ "./src/app/_shared/constants.ts");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");





var SynchronizationStatusComponent = /** @class */ (function () {
    function SynchronizationStatusComponent(variablesService, backend) {
        this.variablesService = variablesService;
        this.backend = backend;
    }
    SynchronizationStatusComponent.prototype.getUpdate = function () {
        this.backend.openUrlInBrowser(_shared_constants__WEBPACK_IMPORTED_MODULE_3__["DOWNLOADS_PAGE_URL"]);
    };
    SynchronizationStatusComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-synchronization-status',
            template: __webpack_require__(/*! ./synchronization-status.component.html */ "./src/app/synchronization-status/synchronization-status.component.html"),
            styles: [__webpack_require__(/*! ./synchronization-status.component.scss */ "./src/app/synchronization-status/synchronization-status.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_2__["VariablesService"],
            _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__["BackendService"]])
    ], SynchronizationStatusComponent);
    return SynchronizationStatusComponent;
}());



/***/ }),

/***/ "./src/app/synchronization-status/synchronization-status.module.ts":
/*!*************************************************************************!*\
  !*** ./src/app/synchronization-status/synchronization-status.module.ts ***!
  \*************************************************************************/
/*! exports provided: SynchronizationStatusModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SynchronizationStatusModule", function() { return SynchronizationStatusModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _synchronization_status_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./synchronization-status.component */ "./src/app/synchronization-status/synchronization-status.component.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _helpers_directives_tooltip_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_helpers/directives/tooltip.module */ "./src/app/_helpers/directives/tooltip.module.ts");






var SynchronizationStatusModule = /** @class */ (function () {
    function SynchronizationStatusModule() {
    }
    SynchronizationStatusModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_synchronization_status_component__WEBPACK_IMPORTED_MODULE_3__["SynchronizationStatusComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateModule"],
                _helpers_directives_tooltip_module__WEBPACK_IMPORTED_MODULE_5__["TooltipModule"]
            ],
            exports: [_synchronization_status_component__WEBPACK_IMPORTED_MODULE_3__["SynchronizationStatusComponent"]]
        })
    ], SynchronizationStatusModule);
    return SynchronizationStatusModule;
}());



/***/ }),

/***/ "./src/app/transfer-alias/transfer-alias.component.html":
/*!**************************************************************!*\
  !*** ./src/app/transfer-alias/transfer-alias.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"page-container\">\n\n    <div class=\"toolbar mb-2\">\n        <div class=\"left\">\n            <button type=\"button\"\n                    class=\"btn-icon circle big mr-2\"\n                    (click)=\"back()\">\n                <i class=\"icon dropdown-arrow-left\"></i>\n            </button>\n            <h1>{{ 'BREADCRUMBS.TRANSFER_ALIAS' | translate }}</h1>\n        </div>\n        <div class=\"right\"></div>\n    </div>\n\n    <div class=\"page-content\">\n        <div class=\"breadcrumbs mb-2\">\n            <div class=\"breadcrumb\">\n                <a [routerLink]=\"['/wallet/history']\">{{ wallet.name }}</a>\n            </div>\n            <div class=\"breadcrumb\">\n                <span>{{ 'BREADCRUMBS.TRANSFER_ALIAS' | translate }}</span>\n            </div>\n        </div>\n\n        <div class=\"scrolled-content\">\n            <form class=\"form\">\n\n                <div class=\"form__field\">\n                    <label for=\"alias-name\">\n                        {{ 'TRANSFER_ALIAS.NAME.LABEL' | translate }}\n                    </label>\n                    <input class=\"form__field--input\"\n                           type=\"text\"\n                           name=\"alias-name\"\n                           id=\"alias-name\"\n                           [value]=\"alias.name\"\n                           placeholder=\"{{ 'EDIT_ALIAS.NAME.PLACEHOLDER' | translate }}\"\n                           readonly>\n                </div>\n\n                <div class=\"form__field textarea\">\n                    <label for=\"alias-comment\">\n                        {{ 'TRANSFER_ALIAS.COMMENT.LABEL' | translate }}\n                    </label>\n                    <textarea id=\"alias-comment\"\n                              name=\"alias-comment\"\n                              [(ngModel)]=\"alias.comment\"\n                              placeholder=\"{{ 'EDIT_ALIAS.COMMENT.PLACEHOLDER' | translate }}\"></textarea>\n                </div>\n\n                <div class=\"form__field\">\n                    <label for=\"alias-transfer\">\n                        {{ 'TRANSFER_ALIAS.ADDRESS.LABEL' | translate }}\n                    </label>\n                    <input class=\"form__field--input\"\n                           type=\"text\"\n                           name=\"alias-transfer\"\n                           id=\"alias-transfer\"\n                           [class.invalid]=\"transferAddress.length > 0 && (transferAddressAlias || !transferAddressValid || (transferAddressValid && !permissionSend) || notEnoughMoney)\"\n                           [(ngModel)]=\"transferAddress\"\n                           [ngModelOptions]=\"{standalone: true}\"\n                           (ngModelChange)=\"changeAddress()\"\n                           placeholder=\"{{ 'TRANSFER_ALIAS.ADDRESS.PLACEHOLDER' | translate }}\"\n                           (contextmenu)=\"variablesService.onContextMenu($event)\">\n                    <div class=\"error\"\n                         *ngIf=\"transferAddress.length > 0 && (transferAddressAlias || !transferAddressValid || (transferAddressValid && !permissionSend) || notEnoughMoney)\">\n                        <div *ngIf=\"!transferAddressValid\">\n                            {{ 'TRANSFER_ALIAS.FORM_ERRORS.WRONG_ADDRESS' | translate }}\n                        </div>\n                        <div *ngIf=\"transferAddressAlias || (transferAddressValid && !permissionSend)\">\n                            {{ 'TRANSFER_ALIAS.FORM_ERRORS.ALIAS_EXISTS' | translate }}\n                        </div>\n                        <div *ngIf=\"notEnoughMoney\">\n                            {{ 'TRANSFER_ALIAS.FORM_ERRORS.NO_MONEY' | translate }}\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"alias-cost mb-2\">{{ \"TRANSFER_ALIAS.COST\" | translate : {\n                    value: variablesService.default_fee, currency:\n                    variablesService.defaultCurrency\n                } }}</div>\n\n                <button type=\"button\"\n                        class=\"primary big w-100\"\n                        (click)=\"transferAlias()\"\n                        [disabled]=\"transferAddressAlias || !transferAddressValid || notEnoughMoney\">\n                    {{ 'TRANSFER_ALIAS.BUTTON_TRANSFER' | translate }}</button>\n            </form>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/transfer-alias/transfer-alias.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/transfer-alias/transfer-alias.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL3RyYW5zZmVyLWFsaWFzL3RyYW5zZmVyLWFsaWFzLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC90cmFuc2Zlci1hbGlhcy90cmFuc2Zlci1hbGlhcy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL3RyYW5zZmVyLWFsaWFzL3RyYW5zZmVyLWFsaWFzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuIiwiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/transfer-alias/transfer-alias.component.ts":
/*!************************************************************!*\
  !*** ./src/app/transfer-alias/transfer-alias.component.ts ***!
  \************************************************************/
/*! exports provided: TransferAliasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransferAliasComponent", function() { return TransferAliasComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_helpers/services/modal.service */ "./src/app/_helpers/services/modal.service.ts");







var TransferAliasComponent = /** @class */ (function () {
    function TransferAliasComponent(location, router, backend, variablesService, modalService, ngZone) {
        this.location = location;
        this.router = router;
        this.backend = backend;
        this.variablesService = variablesService;
        this.modalService = modalService;
        this.ngZone = ngZone;
        this.transferAddress = '';
        this.requestProcessing = false;
    }
    TransferAliasComponent.prototype.ngOnInit = function () {
        this.wallet = this.variablesService.currentWallet;
        var alias = this.backend.getWalletAlias(this.wallet.address);
        this.alias = {
            name: alias.name,
            address: alias.address,
            comment: alias.comment,
            tracking_key: alias.tracking_key
        };
        this.notEnoughMoney = this.wallet.unlocked_balance.isLessThan(this.variablesService.default_fee_big);
    };
    TransferAliasComponent.prototype.changeAddress = function () {
        var _this = this;
        this.backend.validateAddress(this.transferAddress, function (status) {
            _this.transferAddressValid = status;
            if (status) {
                _this.backend.getPoolInfo(function (statusPool, dataPool) {
                    if (dataPool.hasOwnProperty('aliases_que') && dataPool.aliases_que.length) {
                        _this.setStatus(!dataPool.aliases_que.some(function (el) { return el.address === _this.transferAddress; }));
                    }
                    else {
                        _this.setStatus(status);
                    }
                });
            }
            else {
                _this.setStatus(false);
            }
        });
    };
    TransferAliasComponent.prototype.setStatus = function (statusSet) {
        var _this = this;
        this.permissionSend = statusSet;
        if (statusSet) {
            this.backend.getAliasByAddress(this.transferAddress, function (status) {
                _this.ngZone.run(function () {
                    if (status) {
                        _this.transferAddressAlias = true;
                        _this.permissionSend = false;
                    }
                    else {
                        _this.transferAddressAlias = false;
                    }
                });
            });
        }
        else {
            this.ngZone.run(function () {
                _this.transferAddressAlias = false;
            });
        }
    };
    TransferAliasComponent.prototype.transferAlias = function () {
        var _this = this;
        if (this.requestProcessing || !this.permissionSend || !this.transferAddressValid || this.notEnoughMoney) {
            return;
        }
        this.requestProcessing = true;
        var newAlias = {
            name: this.alias.name,
            address: this.transferAddress,
            comment: this.alias.comment,
            tracking_key: this.alias.tracking_key
        };
        this.backend.updateAlias(this.wallet.wallet_id, newAlias, this.variablesService.default_fee, function (status, data) {
            if (status && data.hasOwnProperty('success') && data.success) {
                _this.modalService.prepareModal('info', 'TRANSFER_ALIAS.REQUEST_SEND_REG');
                _this.ngZone.run(function () {
                    _this.router.navigate(['/wallet/']);
                });
            }
            _this.requestProcessing = false;
        });
    };
    TransferAliasComponent.prototype.back = function () {
        this.location.back();
    };
    TransferAliasComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-transfer-alias',
            template: __webpack_require__(/*! ./transfer-alias.component.html */ "./src/app/transfer-alias/transfer-alias.component.html"),
            styles: [__webpack_require__(/*! ./transfer-alias.component.scss */ "./src/app/transfer-alias/transfer-alias.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__["BackendService"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_5__["VariablesService"],
            _helpers_services_modal_service__WEBPACK_IMPORTED_MODULE_6__["ModalService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], TransferAliasComponent);
    return TransferAliasComponent;
}());



/***/ }),

/***/ "./src/app/wallet-details/wallet-details.component.html":
/*!**************************************************************!*\
  !*** ./src/app/wallet-details/wallet-details.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"page-container\">\n\n    <div class=\"toolbar mb-2\">\n        <div class=\"left\">\n            <button type=\"button\"\n                    class=\"btn-icon circle big mr-2\"\n                    (click)=\"back()\">\n                <i class=\"icon dropdown-arrow-left\"></i>\n            </button>\n            <h1>{{ 'BREADCRUMBS.WALLET_DETAILS' | translate }}</h1>\n        </div>\n        <div class=\"right\"></div>\n    </div>\n\n    <div class=\"page-content\">\n        <div class=\"breadcrumbs mb-2\">\n            <div class=\"breadcrumb\">\n                <a [routerLink]=\"['/wallet/history']\">{{ variablesService.currentWallet.name }}</a>\n            </div>\n            <div class=\"breadcrumb\">\n                <span>{{ 'BREADCRUMBS.WALLET_DETAILS' | translate }}</span>\n            </div>\n        </div>\n\n        <div class=\"scrolled-content\">\n            <div fxLayout=\"column\"\n                 fxLayoutAlign=\"start stretch\"\n                 fxFlexFill>\n                <form class=\"form\"\n                      [formGroup]=\"detailsForm\"\n                      (ngSubmit)=\"onSubmitEdit()\">\n                    <div class=\"form__field\">\n                        <label for=\"wallet-name\">{{ 'WALLET_DETAILS.LABEL_NAME' | translate }}</label>\n                        <input class=\"form__field--input\"\n                               type=\"text\"\n                               id=\"wallet-name\"\n                               [placeholder]=\"'PLACEHOLDERS.WALLET_NAME_PLACEHOLDER' | translate\"\n                               formControlName=\"name\"\n                               [maxLength]=\"variablesService.maxWalletNameLength\"\n                               (contextmenu)=\"variablesService.onContextMenu($event)\">\n                        <div class=\"error\"\n                             *ngIf=\"detailsForm.controls['name'].invalid && (detailsForm.controls['name'].dirty || detailsForm.controls['name'].touched)\">\n                            <div *ngIf=\"detailsForm.controls['name'].errors['same']\">\n                                {{ 'WALLET_DETAILS.FORM_ERRORS.NAME_DUPLICATE' | translate }}\n                            </div>\n                            <div *ngIf=\"detailsForm.controls['name'].errors['duplicate']\">\n                                {{ 'WALLET_DETAILS.FORM_ERRORS.NAME_DUPLICATE' | translate }}\n                            </div>\n                            <div *ngIf=\"detailsForm.get('name').value.length >= variablesService.maxWalletNameLength\">\n                                {{ 'WALLET_DETAILS.FORM_ERRORS.MAX_LENGTH' | translate }}\n                            </div>\n                            <div *ngIf=\"detailsForm.controls['name'].hasError('required')\">\n                                {{ 'WALLET_DETAILS.FORM_ERRORS.NAME_REQUIRED' | translate }}\n                            </div>\n                        </div>\n                    </div>\n\n                    <button type=\"submit\"\n                            class=\"primary big max-w-19-rem w-100 mb-1\"\n                            [disabled]=\"detailsForm.invalid && !detailsForm.controls['name'].dirty\">\n                        {{'SETTINGS.MASTER_PASSWORD.BUTTON' | translate }}\n                    </button>\n                    <p *ngIf=\"ifSaved\"\n                       class=\"saved-message\"\n                       [class.active]=\"ifSaved\">Saved!</p>\n\n                    <div class=\"form__field\">\n                        <label for=\"wallet-location\">{{ 'WALLET_DETAILS.LABEL_FILE_LOCATION' | translate }}</label>\n                        <input class=\"form__field--input cursor-default\"\n                               type=\"text\"\n                               id=\"wallet-location\"\n                               formControlName=\"path\"\n                               (contextmenu)=\"variablesService.onContextMenuOnlyCopy($event, detailsForm.get('path')?.value)\"\n                               readonly>\n                    </div>\n                </form>\n\n\t\t\t\t<ng-container\n\t\t\t\t\t*ngIf=\"\n\t\t\t\t\t\t!variablesService.currentWallet?.is_auditable &&\n\t\t\t\t\t\t!variablesService.currentWallet?.is_watch_only\n\t\t\t\t\t\"\n\t\t\t\t>\n\t\t\t\t\t<ng-container *ngIf=\"!showSeed else seedPhraseContent\">\n\t\t\t\t\t\t<form class=\"form bg-light-blue-details p-2\"\n\t\t\t\t\t\t\t  fxLayout=\"column\"\n\t\t\t\t\t\t\t  fxLayoutAlign=\"start center\"\n\t\t\t\t\t\t\t  fxFlex=\"0 0 auto\"\n\t\t\t\t\t\t\t  [formGroup]=\"seedPhraseForm\"\n\t\t\t\t\t\t\t  (ngSubmit)=\"onSubmitSeed()\">\n\t\t\t\t\t\t\t<div class=\"form__field\">\n\t\t\t\t\t\t\t\t<label for=\"create-password\">{{ 'WALLET_DETAILS.CREATE_PASSWORD_SECURE' | translate }}</label>\n\t\t\t\t\t\t\t\t<input class=\"form__field--input\"\n\t\t\t\t\t\t\t\t\t   type=\"password\"\n\t\t\t\t\t\t\t\t\t   placeholder=\"{{ 'PLACEHOLDERS.PASSWORD_PLACEHOLDER' | translate }}\"\n\t\t\t\t\t\t\t\t\t   id=\"create-password\"\n\t\t\t\t\t\t\t\t\t   formControlName=\"password\">\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class=\"form__field\">\n\t\t\t\t\t\t\t\t<label for=\"confirm-password\">{{ 'WALLET_DETAILS.FORM.CONFIRM_PASSWORD' | translate }}</label>\n\t\t\t\t\t\t\t\t<input class=\"form__field--input\"\n\t\t\t\t\t\t\t\t\t   type=\"password\"\n\t\t\t\t\t\t\t\t\t   [class.invalid]=\"seedPhraseForm.invalid && seedPhraseForm.get('confirmPassword').value.length > 0\"\n\t\t\t\t\t\t\t\t\t   placeholder=\"{{'PLACEHOLDERS.PLACEHOLDER_CONFIRM' | translate}}\"\n\t\t\t\t\t\t\t\t\t   id=\"confirm-password\"\n\t\t\t\t\t\t\t\t\t   formControlName=\"confirmPassword\">\n\t\t\t\t\t\t\t\t<div class=\"error\"\n\t\t\t\t\t\t\t\t\t *ngIf=\"seedPhraseForm.invalid && (seedPhraseForm.controls['confirmPassword'].dirty || seedPhraseForm.controls['confirmPassword'].touched)\">\n\t\t\t\t\t\t\t\t\t<div *ngIf=\"seedPhraseForm.invalid && seedPhraseForm.get('confirmPassword').value.length > 0\">\n\t\t\t\t\t\t\t\t\t\t{{ 'WALLET_DETAILS.FORM_ERRORS.PASSWORDS_DONT_MATCH' | translate }}\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<button type=\"submit\"\n\t\t\t\t\t\t\t\t\tclass=\"primary big w-100 mb-2\"\n\t\t\t\t\t\t\t\t\t[disabled]=\"!seedPhraseForm.valid\"><i class=\"icon check-shield mr-1\"></i>\n\t\t\t\t\t\t\t\t{{ 'WALLET_DETAILS.FORM.GENERATE_SECURE_SEED' | translate }}</button>\n\n\t\t\t\t\t\t\t<p class=\"color-primary\"\n\t\t\t\t\t\t\t   fxLayout=\"row\"\n\t\t\t\t\t\t\t   fxLayoutAlign=\"center center\">\n\t\t\t\t\t\t\t\t<i class=\"icon info-circle mr-1\"></i>\n\t\t\t\t\t\t\t\t{{ 'WALLET_DETAILS.FORM.SECURED_SEED_WILL_REQUIRE' | translate }}\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t</ng-container>\n\n\t\t\t\t\t<ng-template #seedPhraseContent>\n\t\t\t\t\t\t<div class=\"seed-phrase bg-light-blue-details p-2 border-radius-0_8-rem\"\n\t\t\t\t\t\t\t fxLayout=\"column\"\n\t\t\t\t\t\t\t fxFlex=\"0 0 auto\">\n\t\t\t\t\t\t\t<div class=\"header mb-2\"\n\t\t\t\t\t\t\t\t fxLayout=\"row\"\n\t\t\t\t\t\t\t\t fxFlex=\"0 0 auto\"\n\t\t\t\t\t\t\t\t fxLayoutAlign=\"space-between center\">\n\t\t\t\t\t\t\t\t<div class=\"left\">\n\t\t\t\t\t\t\t\t\t<span>{{ 'WALLET_DETAILS.LABEL_SEED_PHRASE' | translate }}</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"right\">\n\t\t\t\t\t\t\t\t\t<span class=\"status color-red\"\n\t\t\t\t\t\t\t\t\t\t  fxLayout=\"row\"\n\t\t\t\t\t\t\t\t\t\t  fxLayoutAlign=\"start center\"\n\t\t\t\t\t\t\t\t\t\t  *ngIf=\"seedPhraseForm.controls.password.value.length == 0\">\n\t\t\t\t\t\t\t\t\t\t{{ 'WALLET_DETAILS.SEED_IS_UNSECURED' | translate }}\n\t\t\t\t\t\t\t\t\t\t<i class=\"icon unsecured ml-1\"></i>\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t<span class=\"status color-aqua\"\n\t\t\t\t\t\t\t\t\t\t  fxLayout=\"row\"\n\t\t\t\t\t\t\t\t\t\t  fxLayoutAlign=\"start center\"\n\t\t\t\t\t\t\t\t\t\t  *ngIf=\"seedPhraseForm.controls.password.value.length > 0\">\n\t\t\t\t\t\t\t\t\t\t{{ 'WALLET_DETAILS.SEED_IS_SECURED' | translate }}\n\t\t\t\t\t\t\t\t\t\t<i class=\"icon secured ml-1\"></i>\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"content mb-1\"\n\t\t\t\t\t\t\t\t fxLayout=\"row wrap\"\n\t\t\t\t\t\t\t\t (contextmenu)=\"variablesService.onContextMenuOnlyCopy($event, seedPhrase)\">\n\t\t\t\t\t\t\t\t<ng-container *ngFor=\"let word of seedPhrase.split(' '); let index = index\">\n\t\t\t\t\t\t\t\t\t<div class=\"item p-1 mr-1 mb-1 border-radius-0_8-rem\"\n\t\t\t\t\t\t\t\t\t\t fxLayout=\"row nowrap\"\n\t\t\t\t\t\t\t\t\t\t fxLayoutAlign=\"start center\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"number p-1 mr-1\"\n\t\t\t\t\t\t\t\t\t\t\t fxLayout=\"row\"\n\t\t\t\t\t\t\t\t\t\t\t fxLayoutAlign=\"center center\">{{ index + 1 }}</div>\n\t\t\t\t\t\t\t\t\t\t<span class=\"word\"\n\t\t\t\t\t\t\t\t\t\t\t  fxLayout=\"row\">{{ word }}</span>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</ng-container>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"footer max-w-50-rem w-100\"\n\t\t\t\t\t\t\t\t fxLayout=\"column\">\n\t\t\t\t\t\t\t\t<button type=\"button\"\n\t\t\t\t\t\t\t\t\t\tclass=\"outline big w-100 mb-2\"\n\t\t\t\t\t\t\t\t\t\t(click)=\"copySeedPhrase()\">\n\t\t\t\t\t\t\t\t\t<ng-container *ngIf=\"!seedPhraseCopied\">\n\t\t\t\t\t\t\t\t\t\t<i class=\"icon copy mr-1\"></i>\n\t\t\t\t\t\t\t\t\t\t{{ 'SEED_PHRASE.BUTTON_COPY' | translate }}\n\t\t\t\t\t\t\t\t\t</ng-container>\n\t\t\t\t\t\t\t\t\t<ng-container *ngIf=\"seedPhraseCopied\">\n\t\t\t\t\t\t\t\t\t\t<i class=\"icon check mr-1\"></i>\n\t\t\t\t\t\t\t\t\t\t{{ 'SEED_PHRASE.BUTTON_COPIED' | translate }}\n\t\t\t\t\t\t\t\t\t</ng-container>\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t<p class=\"text-align-center\"\n\t\t\t\t\t\t\t\t   *ngIf=\"seedPhraseForm.controls.password.value.length > 0\">\n\t\t\t\t\t\t\t\t\t<i class=\"icon info-circle mr-1\"></i>\n\t\t\t\t\t\t\t\t\t<span class=\"color-primary\">{{ 'WALLET_DETAILS.REMEMBER_YOU_WILL_REQUIRE' | translate}}</span>\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</ng-template>\n\t\t\t\t</ng-container>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/wallet-details/wallet-details.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/wallet-details/wallet-details.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL3dhbGxldC1kZXRhaWxzL3dhbGxldC1kZXRhaWxzLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC93YWxsZXQtZGV0YWlscy93YWxsZXQtZGV0YWlscy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL3dhbGxldC1kZXRhaWxzL3dhbGxldC1kZXRhaWxzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuIiwiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/wallet-details/wallet-details.component.ts":
/*!************************************************************!*\
  !*** ./src/app/wallet-details/wallet-details.component.ts ***!
  \************************************************************/
/*! exports provided: WalletDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletDetailsComponent", function() { return WalletDetailsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");







var WalletDetailsComponent = /** @class */ (function () {
    function WalletDetailsComponent(router, backend, variablesService, ngZone, location) {
        var _this = this;
        this.router = router;
        this.backend = backend;
        this.variablesService = variablesService;
        this.ngZone = ngZone;
        this.location = location;
        this.seedPhrase = '';
        this.showSeed = false;
        this.copyAnimation = false;
        this.seedPhraseCopied = false;
        this.ifSaved = false;
        this.detailsForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                function (g) {
                    for (var i = 0; i < _this.variablesService.wallets.length; i++) {
                        if (g.value === _this.variablesService.wallets[i].name) {
                            if (_this.variablesService.wallets[i].wallet_id ===
                                _this.variablesService.currentWallet.wallet_id) {
                                return { same: true };
                            }
                            else {
                                return { duplicate: true };
                            }
                        }
                    }
                    return null;
                },
            ]),
            path: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](''),
        });
        this.seedPhraseForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern(this.variablesService.pattern)),
            confirmPassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern(this.variablesService.pattern)),
        }, { validators: this.checkPasswords });
    }
    WalletDetailsComponent.prototype.checkPasswords = function (group) {
        var pass = group.controls.password.value;
        var confirmPass = group.controls.confirmPassword.value;
        return pass === confirmPass ? null : { notSame: true };
    };
    WalletDetailsComponent.prototype.ngOnInit = function () {
        this.showSeed = false;
        this.detailsForm
            .get('name')
            .setValue(this.variablesService.currentWallet.name);
        this.detailsForm
            .get('path')
            .setValue(this.variablesService.currentWallet.path);
    };
    WalletDetailsComponent.prototype.showSeedPhrase = function () {
        this.showSeed = true;
    };
    WalletDetailsComponent.prototype.onSubmitSeed = function () {
        var _this = this;
        if (this.seedPhraseForm.valid) {
            this.showSeedPhrase();
            var wallet_id = this.variablesService.currentWallet.wallet_id;
            var seed_password = this.seedPhraseForm.controls.password.value;
            this.backend.getSmartWalletInfo({ wallet_id: wallet_id, seed_password: seed_password }, function (status, data) {
                if (data.hasOwnProperty('seed_phrase')) {
                    _this.ngZone.run(function () {
                        _this.seedPhrase = data['seed_phrase'].trim();
                    });
                }
            });
        }
    };
    WalletDetailsComponent.prototype.onSave = function () {
        var _this = this;
        this.ifSaved = true;
        setTimeout(function () {
            _this.ifSaved = false;
        }, 3000);
    };
    WalletDetailsComponent.prototype.onSubmitEdit = function () {
        if (this.detailsForm.value) {
            this.onSave();
            this.variablesService.currentWallet.name = this.detailsForm.get('name').value;
            this.detailsForm.reset({ name: this.variablesService.currentWallet.name, path: this.variablesService.currentWallet.path });
        }
    };
    WalletDetailsComponent.prototype.closeWallet = function () {
        var _this = this;
        this.backend.closeWallet(this.variablesService.currentWallet.wallet_id, function () {
            for (var i = _this.variablesService.wallets.length - 1; i >= 0; i--) {
                if (_this.variablesService.wallets[i].wallet_id ===
                    _this.variablesService.currentWallet.wallet_id) {
                    _this.variablesService.wallets.splice(i, 1);
                }
            }
            _this.ngZone.run(function () {
                if (_this.variablesService.wallets.length) {
                    _this.variablesService.currentWallet = _this.variablesService.wallets[0];
                    _this.router.navigate(['/wallet/']);
                }
                else {
                    _this.router.navigate(['/']);
                }
            });
            if (_this.variablesService.appPass) {
                _this.backend.storeSecureAppData();
            }
        });
    };
    WalletDetailsComponent.prototype.copySeedPhrase = function () {
        var _this = this;
        this.backend.setClipboard(this.seedPhrase, function () {
            _this.ngZone.run(function () {
                setTimeout(function () {
                    _this.seedPhraseCopied = false;
                }, 4000);
                _this.seedPhraseCopied = true;
            });
        });
    };
    WalletDetailsComponent.prototype.back = function () {
        this.location.back();
    };
    WalletDetailsComponent.prototype.ngOnDestroy = function () {
    };
    WalletDetailsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-wallet-details',
            template: __webpack_require__(/*! ./wallet-details.component.html */ "./src/app/wallet-details/wallet-details.component.html"),
            styles: [__webpack_require__(/*! ./wallet-details.component.scss */ "./src/app/wallet-details/wallet-details.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_3__["BackendService"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_4__["VariablesService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            _angular_common__WEBPACK_IMPORTED_MODULE_6__["Location"]])
    ], WalletDetailsComponent);
    return WalletDetailsComponent;
}());



/***/ }),

/***/ "./src/app/wallet/wallet.component.html":
/*!**********************************************!*\
  !*** ./src/app/wallet/wallet.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header mb-2\"\r\n\t fxFlex=\"0 0 auto\"\r\n\t fxLayout=\"row nowrap\"\r\n\t fxLayoutGap=\"1rem\"\r\n\t fxLayoutAlign=\"space-between start\">\r\n\t<div class=\"left overflow-hidden\">\r\n\t\t<div class=\"wallet-wrapper\"\r\n\t\t\t fxLayout=\"column\"\r\n\t\t\t fxLayoutAlign=\"start start\">\r\n\t\t\t<div class=\"title mb-2\"\r\n\t\t\t\t fxLayout=\"row nowrap\"\r\n\t\t\t\t fxLayoutAlign=\"start center\">\r\n\t\t\t\t<h1 class=\"text-ellipsis mr-2\"\r\n\t\t\t\t\ttooltip=\"{{ variablesService.currentWallet.name }}\"\r\n\t\t\t\t\tplacement=\"bottom-left\"\r\n\t\t\t\t\ttooltipClass=\"table-tooltip\"\r\n\t\t\t\t\t[delay]=\"500\"\r\n\t\t\t\t\t[showWhenNoOverflow]=\"false\">\r\n\t\t\t\t\t{{variablesService.currentWallet.name}}\r\n\t\t\t\t</h1>\r\n\r\n\t\t\t\t<div fxFlex=\"0 0 auto\" class=\"controls\"\r\n\t\t\t\t\t fxLayout=\"row\"\r\n\t\t\t\t\t fxLayoutAlign=\"start center\"\r\n\t\t\t\t\t *ngIf=\"!variablesService.currentWallet.is_auditable\">\r\n\r\n\t\t\t\t\t<ng-container\r\n\t\t\t\t\t\t*ngIf=\"!variablesService.currentWallet.alias.hasOwnProperty('name') && variablesService.currentWallet.loaded && variablesService.daemon_state === 2 && variablesService.currentWallet.alias_available\">\r\n\t\t\t\t\t\t<button class=\"px-1 py-0_5 bg-light-gray\"\r\n\t\t\t\t\t\t\t\t[routerLink]=\"['/assign-alias']\">\r\n\t\t\t\t\t\t\t{{ 'WALLET.REGISTER_ALIAS' | translate }}\r\n\t\t\t\t\t\t</button>\r\n\t\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t\t<ng-container\r\n\t\t\t\t\t\t*ngIf=\"variablesService.currentWallet.alias.hasOwnProperty('name') && variablesService.currentWallet.loaded && variablesService.daemon_state === 2\">\r\n\r\n\t\t\t\t\t\t<div class=\"alias mr-1\" [class.available]=\"variablesService.currentWallet.alias['name'].length >= 2 && variablesService.currentWallet.alias['name'].length <= 6\">\r\n\t\t\t\t\t\t\t{{variablesService.currentWallet.alias['name']}}\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<ng-container *ngIf=\"variablesService.currentWallet.alias_available\">\r\n\t\t\t\t\t\t\t<button class=\"btn-icon circle small mr-1\"\r\n\t\t\t\t\t\t\t\t\t[routerLink]=\"['/edit-alias']\"\r\n\t\t\t\t\t\t\t\t\ttooltip=\"{{ 'WALLET.TOOLTIPS.EDIT_ALIAS' | translate }}\"\r\n\t\t\t\t\t\t\t\t\tplacement=\"bottom-right\"\r\n\t\t\t\t\t\t\t\t\ttooltipClass=\"table-tooltip account-tooltip\"\r\n\t\t\t\t\t\t\t\t\t[delay]=\"500\"\r\n\t\t\t\t\t\t\t\t\t[timeDelay]=\"500\">\r\n\r\n\t\t\t\t\t\t\t\t<i class=\"icon edit-square\"></i>\r\n\t\t\t\t\t\t\t</button>\r\n\r\n\t\t\t\t\t\t\t<button class=\"btn-icon circle small\"\r\n\t\t\t\t\t\t\t\t\t[routerLink]=\"['/transfer-alias']\"\r\n\t\t\t\t\t\t\t\t\ttooltip=\"{{ 'WALLET.TOOLTIPS.TRANSFER_ALIAS' | translate }}\"\r\n\t\t\t\t\t\t\t\t\tplacement=\"right\"\r\n\t\t\t\t\t\t\t\t\ttooltipClass=\"table-tooltip account-tooltip\"\r\n\t\t\t\t\t\t\t\t\t[delay]=\"500\"\r\n\t\t\t\t\t\t\t\t\t[timeDelay]=\"500\">\r\n\t\t\t\t\t\t\t\t<i class=\"icon arrow-up-square\"></i>\r\n\t\t\t\t\t\t\t</button>\r\n\t\t\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t\t</ng-container>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class=\"card border-radius-0_8-rem overflow-hidden p-2 max-w-100\"\r\n\t\t\t\t fxLayout=\"row nowrap\"\r\n\t\t\t\t fxLayoutAlign=\"space-between start\"\r\n\t\t\t\t fxLayoutGap=\"2rem\">\r\n\t\t\t\t<div class=\"left overflow-hidden\">\r\n\t\t\t\t\t<div class=\"balance-wrapper overflow-hidden\"\r\n\t\t\t\t\t\t fxLayout=\"column\"\r\n\t\t\t\t\t\t fxLayoutAlign=\"start none\">\r\n\t\t\t\t\t\t<div class=\"currency\"\r\n\t\t\t\t\t\t\t fxLayout=\"row\">\r\n\t\t\t\t\t\t\t<h1 class=\"amount text-ellipsis mr-0_5\"\r\n\t\t\t\t\t\t\t\t[tooltip]=\"getTooltip()\"\r\n\t\t\t\t\t\t\t\t[placement]=\"'bottom'\"\r\n\t\t\t\t\t\t\t\t[tooltipClass]=\"'balance-tooltip'\"\r\n\t\t\t\t\t\t\t\t[delay]=\"150\"\r\n\t\t\t\t\t\t\t\t[timeout]=\"0\"\r\n\t\t\t\t\t\t\t\t(onHide)=\"onHideTooltip()\">\r\n\t\t\t\t\t\t\t\t{{variablesService.currentWallet.balance | intToMoney : '3'}}\r\n\t\t\t\t\t\t\t</h1>\r\n\t\t\t\t\t\t\t<h1>{{variablesService.defaultCurrency}}</h1>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div class=\"price mt-1\"\r\n\t\t\t\t\t\t\t *appDisablePriceFetch>\r\n                            <span class=\"amount text-ellipsis\">\r\n                                ${{variablesService.currentWallet.getMoneyEquivalent(variablesService.moneyEquivalent) | intToMoney | number :'1.2-2'}}\r\n                            </span>\r\n\r\n\t\t\t\t\t\t\t<span class=\"percent ml-0_5\"\r\n\t\t\t\t\t\t\t\t  [class.red]=\"variablesService.moneyEquivalentPercent < 0\">\r\n                              {{ variablesService.moneyEquivalentPercent | number : '1.1-2' }}%\r\n                            </span>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"right\">\r\n\t\t\t\t\t<div class=\"address border-radius-0_8-rem overflow-hidden pl-1 pr-0_5 pt-0_5 pb-0_5\"\r\n\t\t\t\t\t\t fxLayout=\"row\"\r\n\t\t\t\t\t\t fxLayoutAlign=\"space-between center\">\r\n                        <span\r\n\t\t\t\t\t\t\t[tooltip]=\"variablesService.currentWallet.address\"\r\n\t\t\t\t\t\t\t[placement]=\"'bottom'\"\r\n\t\t\t\t\t\t\t[tooltipClass]=\"'table-tooltip'\"\r\n\t\t\t\t\t\t\t[delay]=\"150\"\r\n\t\t\t\t\t\t\t[timeout]=\"0\"\r\n\t\t\t\t\t\t\tclass=\"text-ellipsis mr-1\">{{ variablesService.currentWallet.address | slice:0:6 }}\r\n\t\t\t\t\t\t\t...{{ variablesService.currentWallet.address | slice:-6 }}</span>\r\n\t\t\t\t\t\t<button (click)=\"copyAddress()\"\r\n\t\t\t\t\t\t\t\tclass=\"btn-icon circle small\">\r\n\t\t\t\t\t\t\t<i class=\"icon small\"\r\n\t\t\t\t\t\t\t   [class.copy]=\"!copyAnimation\"\r\n\t\t\t\t\t\t\t   [class.check]=\"copyAnimation\"></i>\r\n\t\t\t\t\t\t</button>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"right\">\r\n\t\t<div class=\"dropdown\">\r\n\t\t\t<button class=\"btn-icon circle big\"\r\n\t\t\t\t\t[disabled]=\"settingsButtonDisabled && !variablesService.currentWallet.loaded\"\r\n\t\t\t\t\t(click)=\"$event.stopPropagation(); toggleMenuDropdown()\"\r\n\t\t\t\t\tdata-target=\"wallet-dropdown-button\">\r\n\t\t\t\t<i class=\"icon dots\"></i>\r\n\t\t\t</button>\r\n\t\t\t<div *ngIf=\"openDropdown\"\r\n\t\t\t\t class=\"content-bottom-right py-0_5\">\r\n\t\t\t\t<ul class=\"list\">\r\n\t\t\t\t\t<li class=\"item\">\r\n\t\t\t\t\t\t<button class=\"w-100 px-2 py-1\"\r\n\t\t\t\t\t\t\t\ttype=\"button\"\r\n\t\t\t\t\t\t\t\t[routerLink]=\"['/details']\"\r\n\t\t\t\t\t\t\t\trouterLinkActive=\"active\"\r\n\t\t\t\t\t\t\t\ttooltip=\"{{ 'WALLET.TOOLTIPS.SETTINGS' | translate }}\"\r\n\t\t\t\t\t\t\t\tplacement=\"left\"\r\n\t\t\t\t\t\t\t\ttooltipClass=\"table-tooltip account-tooltip\"\r\n\t\t\t\t\t\t\t\t[delay]=\"500\"\r\n\t\t\t\t\t\t\t\t[timeDelay]=\"500\"\r\n\t\t\t\t\t\t\t\t[disabled]=\"!variablesService.currentWallet.loaded\">\r\n\t\t\t\t\t\t\t<i class=\"icon settings mr-1\"></i>\r\n\t\t\t\t\t\t\t<span>{{ 'WALLET_DETAILS.WALLET_OPTIONS' | translate }}</span>\r\n\t\t\t\t\t\t</button>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t\t<li class=\"item\">\r\n\t\t\t\t\t\t<button class=\"w-100 px-2 py-1\"\r\n\t\t\t\t\t\t\t\ttype=\"button\"\r\n\t\t\t\t\t\t\t\ttooltip=\"{{ 'EXPORT_HISTORY.TOOLTIP' | translate }}\"\r\n\t\t\t\t\t\t\t\tplacement=\"left\"\r\n\t\t\t\t\t\t\t\ttooltipClass=\"table-tooltip account-tooltip\"\r\n\t\t\t\t\t\t\t\t[delay]=\"500\"\r\n\t\t\t\t\t\t\t\t[timeDelay]=\"500\"\r\n\t\t\t\t\t\t\t\t(click)=\"exportHistoryDialogVisible = !exportHistoryDialogVisible\"\r\n\t\t\t\t\t\t\t\t[disabled]=\"variablesService.currentWallet.history.length <= 0\">\r\n\t\t\t\t\t\t\t<i class=\"icon export mr-1\"></i>\r\n\t\t\t\t\t\t\t<span>{{ 'EXPORT_HISTORY.EXPORT_BUTTON' | translate }}</span>\r\n\t\t\t\t\t\t</button>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t\t<ng-container *ngIf=\"walletSyncVisible\">\r\n\t\t\t\t\t\t<li class=\"item\">\r\n\t\t\t\t\t\t\t<button class=\"w-100 px-2 py-1\"\r\n\t\t\t\t\t\t\t\t\ttype=\"button\"\r\n\t\t\t\t\t\t\t\t\ttooltip=\"{{ 'WALLET_DETAILS.RESYNC_WALLET' | translate }}\"\r\n\t\t\t\t\t\t\t\t\tplacement=\"left\"\r\n\t\t\t\t\t\t\t\t\ttooltipClass=\"table-tooltip account-tooltip\"\r\n\t\t\t\t\t\t\t\t\t[disabled]=\"!variablesService.currentWallet.loaded\"\r\n\t\t\t\t\t\t\t\t\t[delay]=\"500\"\r\n\t\t\t\t\t\t\t\t\t[timeDelay]=\"500\"\r\n\t\t\t\t\t\t\t\t\t(click)=\"resyncCurrentWallet(variablesService.currentWallet.wallet_id)\">\r\n\t\t\t\t\t\t\t\t<i class=\"icon update mr-1\"></i><span>{{ 'WALLET_DETAILS.RESYNC_WALLET_BUTTON' | translate }}</span>\r\n\t\t\t\t\t\t\t</button>\r\n\t\t\t\t\t\t</li>\r\n\t\t\t\t\t</ng-container>\r\n\t\t\t\t\t<li class=\"item\">\r\n\t\t\t\t\t\t<button class=\"w-100 px-2 py-1\"\r\n\t\t\t\t\t\t\t\ttype=\"button\"\r\n\t\t\t\t\t\t\t\t(click)=\"showConfirmDialog(variablesService.currentWallet.wallet_id)\"\r\n\t\t\t\t\t\t\t\ttooltip=\"{{ 'WALLET.TOOLTIPS.CLOSE' | translate }}\"\r\n\t\t\t\t\t\t\t\tplacement=\"left\"\r\n\t\t\t\t\t\t\t\ttooltipClass=\"table-tooltip account-tooltip\"\r\n\t\t\t\t\t\t\t\t[delay]=\"500\"\r\n\t\t\t\t\t\t\t\t[timeDelay]=\"500\">\r\n\t\t\t\t\t\t\t<i class=\"icon close-square mr-1\"></i><span>{{ 'WALLET_DETAILS.BUTTON_REMOVE' | translate }}</span>\r\n\t\t\t\t\t\t</button>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t</ul>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n\r\n<div class=\"tabs\">\r\n\t<div class=\"tabs-header\">\r\n\t\t<ng-container *ngFor=\"let tab of tabs; let index = index\">\r\n\t\t\t<button class=\"tab-header\"\r\n\t\t\t\t\t[routerLink]=\"['/wallet' + tab.link]\"\r\n\t\t\t\t\trouterLinkActive=\"active\"\r\n\t\t\t\t\t[ngClass]=\"{ 'hide': ((tab.link === '/send' || tab.link === '/contracts') && variablesService.currentWallet.is_watch_only && variablesService.currentWallet.is_auditable) }\"\r\n\t\t\t\t\t[disabled]=\"tab.disabled\">\r\n\t\t\t\t<i class=\"icon mr-1\"\r\n\t\t\t\t   [ngClass]=\"tab.icon\"></i>\r\n\t\t\t\t<span>{{ tab.title | translate }}</span>\r\n\t\t\t\t<span class=\"indicator\"\r\n\t\t\t\t\t  *ngIf=\"tab.indicator\">{{variablesService.currentWallet.new_contracts}}</span>\r\n\t\t\t</button>\r\n\t\t</ng-container>\r\n\t</div>\r\n\t<div #scrolledContent\r\n\t\t class=\"tabs-content\">\r\n\t\t<router-outlet></router-outlet>\r\n\t</div>\r\n</div>\r\n\r\n<app-confirm-modal *ngIf=\"delWalletDialogVisible\"\r\n\t\t\t\t   [title]=\" 'WALLET.CONFIRM.TITLE' | translate \"\r\n\t\t\t\t   [message]=\" 'WALLET.CONFIRM.MESSAGE' | translate \"\r\n\t\t\t\t   (confirmed)=\"confirmed($event)\"></app-confirm-modal>\r\n\r\n<app-export-history-modal [currentWalletId]=\"variablesService.currentWallet.wallet_id\"\r\n\t\t\t\t\t\t  *ngIf=\"exportHistoryDialogVisible\"\r\n\t\t\t\t\t\t  (closeExportModal)=\"closeExportModal($event)\"></app-export-history-modal>\r\n"

/***/ }),

/***/ "./src/app/wallet/wallet.component.scss":
/*!**********************************************!*\
  !*** ./src/app/wallet/wallet.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3dhbGxldC93YWxsZXQuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/wallet/wallet.component.ts":
/*!********************************************!*\
  !*** ./src/app/wallet/wallet.component.ts ***!
  \********************************************/
/*! exports provided: WalletComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletComponent", function() { return WalletComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _helpers_pipes_int_to_money_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_helpers/pipes/int-to-money.pipe */ "./src/app/_helpers/pipes/int-to-money.pipe.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../_shared/constants */ "./src/app/_shared/constants.ts");
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! store */ "./src/store.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");











var WalletComponent = /** @class */ (function () {
    function WalletComponent(route, router, backend, variablesService, ngZone, translate, intToMoneyPipe, store) {
        this.route = route;
        this.router = router;
        this.backend = backend;
        this.variablesService = variablesService;
        this.ngZone = ngZone;
        this.translate = translate;
        this.intToMoneyPipe = intToMoneyPipe;
        this.store = store;
        this.settingsButtonDisabled = true;
        this.copyAnimation = false;
        this.walletLoaded = false;
        this.delWalletDialogVisible = false;
        this.exportHistoryDialogVisible = false;
        this.walletSyncVisible = false;
        this.tabs = [
            {
                title: 'WALLET.TABS.HISTORY',
                icon: 'time-circle',
                link: '/history',
                disabled: false
            },
            {
                title: 'WALLET.TABS.SEND',
                icon: 'arrow-up-square',
                link: '/send',
                disabled: true
            },
            {
                title: 'WALLET.TABS.RECEIVE',
                icon: 'arrow-down-square',
                link: '/receive',
                disabled: false
            },
            {
                title: 'WALLET.TABS.CONTRACTS',
                icon: 'document',
                link: '/contracts',
                disabled: true
            },
            {
                title: 'WALLET.TABS.STAKING',
                icon: 'staking',
                link: '/staking',
                indicator: false,
                disabled: true
            },
        ];
        this._destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
        if (!this.variablesService.currentWallet && this.variablesService.wallets.length > 0) {
            this.variablesService.setCurrentWallet(0);
        }
        this.walletLoaded = this.variablesService.currentWallet.loaded;
    }
    WalletComponent.prototype.onKeyPresed = function () {
        if (!this.openDropdown) {
            this.walletSyncVisible = true;
        }
    };
    WalletComponent.prototype.onKeyUpPresed = function () {
        if (!this.openDropdown) {
            this.walletSyncVisible = false;
        }
    };
    WalletComponent.prototype.onClick = function (targetElement) {
        if (targetElement.dataset.target !== 'wallet-dropdown-button' && this.openDropdown) {
            this.openDropdown = false;
            this.walletSyncVisible = false;
        }
    };
    WalletComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.settingsButtonInterval = setInterval(function () {
            if (_this.variablesService.daemon_state == 2 || _this.walletLoaded) {
                _this.settingsButtonDisabled = false;
                clearInterval(_this.settingsButtonInterval);
            }
        }, 1000);
        this.store
            .select('sync')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])(Boolean), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeUntil"])(this._destroy$))
            .subscribe(function (value) {
            var data = value.filter(function (item) { return item.wallet_id === _this.variablesService.currentWallet.wallet_id; })[0];
            if (data && !data.sync) {
                var in_progress = void 0;
                var values = _this.store.value.sync;
                if (values && values.length) {
                    in_progress = values.filter(function (item) { return item.sync; });
                    _this.variablesService.sync_started = !!(in_progress && in_progress.length);
                    if (!in_progress) {
                        _this.variablesService.sync_started = false;
                        _this.variablesService.sync_wallets[data.wallet_id] = false;
                    }
                }
                else {
                    _this.variablesService.sync_started = false;
                    _this.variablesService.sync_wallets[data.wallet_id] = false;
                }
            }
        });
        this.copyAnimation = false;
        if (this.variablesService.currentWallet.alias.hasOwnProperty('name')) {
            this.variablesService.currentWallet.wakeAlias = false;
        }
        this.variablesService.getAliasChangedEvent.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeUntil"])(this._destroy$)).subscribe(function () {
            if (_this.variablesService.currentWallet.alias.hasOwnProperty('name')) {
                _this.variablesService.currentWallet.wakeAlias = false;
            }
        });
        this.updateWalletStatus();
        this.variablesService.getWalletChangedEvent.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeUntil"])(this._destroy$)).subscribe(function () {
            _this.setTabsDisabled(_this.variablesService.currentWallet.balance.eq(0));
        });
    };
    WalletComponent.prototype.copyAddress = function () {
        var _this = this;
        this.backend.setClipboard(this.variablesService.currentWallet.address);
        this.copyAnimation = true;
        this.copyAnimationTimeout = window.setTimeout(function () {
            _this.copyAnimation = false;
        }, 2000);
    };
    WalletComponent.prototype.getTooltip = function () {
        var _this = this;
        this.balanceTooltip = document.createElement('div');
        var available = document.createElement('span');
        available.setAttribute('class', 'available');
        available.innerHTML = this.translate.instant('WALLET.AVAILABLE_BALANCE', {
            available: this.intToMoneyPipe.transform(this.variablesService.currentWallet.unlocked_balance),
            currency: this.variablesService.defaultCurrency,
        });
        this.balanceTooltip.appendChild(available);
        var locked = document.createElement('span');
        locked.setAttribute('class', 'locked');
        locked.innerHTML = this.translate.instant('WALLET.LOCKED_BALANCE', {
            locked: this.intToMoneyPipe.transform(this.variablesService.currentWallet.balance.minus(this.variablesService.currentWallet.unlocked_balance)),
            currency: this.variablesService.defaultCurrency,
        });
        this.balanceTooltip.appendChild(locked);
        var link = document.createElement('span');
        link.setAttribute('class', 'link');
        link.innerHTML = this.translate.instant('WALLET.LOCKED_BALANCE_LINK');
        link.addEventListener('click', function () {
            _this.openInBrowser(_shared_constants__WEBPACK_IMPORTED_MODULE_8__["LOCKED_BALANCE_HELP_PAGE"]);
        });
        this.balanceTooltip.appendChild(link);
        return this.balanceTooltip;
    };
    WalletComponent.prototype.onHideTooltip = function () {
        this.balanceTooltip = null;
    };
    WalletComponent.prototype.openInBrowser = function (link) {
        this.backend.openUrlInBrowser(link);
    };
    WalletComponent.prototype.toggleMenuDropdown = function () {
        if (!this.openDropdown) {
            this.openDropdown = true;
        }
        else {
            this.openDropdown = false;
            this.walletSyncVisible = false;
        }
    };
    WalletComponent.prototype.resyncCurrentWallet = function (id) {
        this.backend.resyncWallet(id);
    };
    WalletComponent.prototype.showConfirmDialog = function (wallet_id) {
        this.delWalletDialogVisible = true;
        this.closeWalletId = wallet_id;
    };
    WalletComponent.prototype.closeExportModal = function (confirmed) {
        if (confirmed) {
            this.exportHistoryDialogVisible = false;
        }
    };
    WalletComponent.prototype.confirmed = function (confirmed) {
        if (confirmed) {
            this.closeWallet(this.closeWalletId);
        }
        this.delWalletDialogVisible = false;
    };
    WalletComponent.prototype.closeWallet = function (wallet_id) {
        var _this = this;
        this.backend.closeWallet(wallet_id, function () {
            for (var i = _this.variablesService.wallets.length - 1; i >= 0; i--) {
                if (_this.variablesService.wallets[i].wallet_id === _this.variablesService.currentWallet.wallet_id) {
                    _this.variablesService.wallets.splice(i, 1);
                }
            }
            _this.ngZone.run(function () {
                if (_this.variablesService.wallets.length) {
                    _this.variablesService.currentWallet = _this.variablesService.wallets[0];
                    _this.router.navigate(['/wallet/']);
                }
                else {
                    _this.router.navigate(['/']);
                }
            });
            if (_this.variablesService.appPass) {
                _this.backend.storeSecureAppData();
            }
        });
    };
    WalletComponent.prototype.ngOnDestroy = function () {
        this._destroy$.next();
        clearTimeout(this.copyAnimationTimeout);
    };
    WalletComponent.prototype.updateWalletStatus = function () {
        var _this = this;
        this.backend.eventSubscribe('wallet_sync_progress', function (data) {
            var wallet_id = data.wallet_id;
            if (wallet_id === _this.variablesService.currentWallet.wallet_id) {
                _this.ngZone.run(function () {
                    _this.walletLoaded = false;
                });
            }
        });
        this.backend.eventSubscribe('update_wallet_status', function (data) {
            var wallet_state = data.wallet_state;
            var wallet_id = data.wallet_id;
            _this.ngZone.run(function () {
                if (wallet_state === 2 && wallet_id === _this.variablesService.currentWallet.wallet_id) {
                    _this.walletLoaded =
                        (_this.variablesService.getWallet(_this.variablesService.currentWallet.wallet_id) !== null &&
                            _this.variablesService.getWallet(_this.variablesService.currentWallet.wallet_id).loaded);
                    if (_this.walletLoaded) {
                        _this.setTabsDisabled(_this.variablesService.currentWallet.balance.eq(0));
                    }
                }
                else {
                    _this.walletLoaded = false;
                }
            });
        });
    };
    WalletComponent.prototype.setTabsDisabled = function (disabled) {
        this.tabs[1].disabled = disabled;
        this.tabs[3].disabled = disabled;
        this.tabs[4].disabled = disabled;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('document:keydown.shift', ['$event.key']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", []),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], WalletComponent.prototype, "onKeyPresed", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('document:keyup.shift', ['$event.key']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", []),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], WalletComponent.prototype, "onKeyUpPresed", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('document:click', ['$event.target']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], WalletComponent.prototype, "onClick", null);
    WalletComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-wallet',
            template: __webpack_require__(/*! ./wallet.component.html */ "./src/app/wallet/wallet.component.html"),
            styles: [__webpack_require__(/*! ./wallet.component.scss */ "./src/app/wallet/wallet.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__["BackendService"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_3__["VariablesService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateService"],
            _helpers_pipes_int_to_money_pipe__WEBPACK_IMPORTED_MODULE_6__["IntToMoneyPipe"],
            store__WEBPACK_IMPORTED_MODULE_9__["Store"]])
    ], WalletComponent);
    return WalletComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! exports provided: buildTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildTime", function() { return buildTime; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);





var buildTime = '2023-06-21T07:58:17.379Z';
if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ "./src/store.ts":
/*!**********************!*\
  !*** ./src/store.ts ***!
  \**********************/
/*! exports provided: Store */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");



var state = {
    wallets: undefined,
    sync: undefined,
};
var Store = /** @class */ (function () {
    function Store() {
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](state);
        this.store = this.subject.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])());
    }
    Object.defineProperty(Store.prototype, "value", {
        get: function () {
            return this.subject.value;
        },
        enumerable: true,
        configurable: true
    });
    Store.prototype.select = function (name) {
        return this.store.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["pluck"])(name));
    };
    // tslint:disable-next-line:no-shadowed-variable
    Store.prototype.set = function (name, state) {
        var _a;
        this.subject.next(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.value, (_a = {}, _a[name] = state, _a)));
    };
    return Store;
}());



/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/pool/infinium_ui-047a4602748e0d3e40456f9d2fc2eeef1bc89b06/html_source/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map