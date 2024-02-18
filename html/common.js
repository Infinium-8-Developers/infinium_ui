(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/pages/auth/no-wallet/no-wallet-routing.module.ts":
/*!******************************************************************!*\
  !*** ./src/app/pages/auth/no-wallet/no-wallet-routing.module.ts ***!
  \******************************************************************/
/*! exports provided: NoWalletRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoWalletRoutingModule", function() { return NoWalletRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _no_wallet_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./no-wallet.component */ "./src/app/pages/auth/no-wallet/no-wallet.component.ts");




var routes = [
    { path: '', component: _no_wallet_component__WEBPACK_IMPORTED_MODULE_3__["NoWalletComponent"] },
];
var NoWalletRoutingModule = /** @class */ (function () {
    function NoWalletRoutingModule() {
    }
    NoWalletRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], NoWalletRoutingModule);
    return NoWalletRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/auth/no-wallet/no-wallet.component.html":
/*!***************************************************************!*\
  !*** ./src/app/pages/auth/no-wallet/no-wallet.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"no-wallet-wrapper\"\n     fxLayout=\"row\"\n     fxLayoutAlign=\"center center\"\n     fxFlexFill>\n    <div class=\"card max-w-42-rem max-h-100 w-100 p-2 border-radius-0_8-rem bg-light-blue scrolled-content\">\n\n        <div class=\"logo mb-3\"\n             fxLayout=\"row\"\n             fxLayoutAlign=\"center center\">\n            <img src=\"assets/icons/blue/infinium-logo.svg\"\n                 alt=\"infinium-logo\">\n        </div>\n\n        <h4 class=\"mb-2 text-align-center\">{{ 'MAIN.TITLE' | translate }}</h4>\n\n        <button type=\"button\"\n                class=\"primary big w-100 mb-1\"\n                [routerLink]=\"['/' + paths.create]\">\n            {{ 'MAIN.BUTTON_NEW_WALLET' | translate}}\n        </button>\n\n        <button type=\"button\"\n                class=\"primary big w-100 mb-1\"\n                (click)=\"openWallet()\">{{ 'MAIN.BUTTON_OPEN_WALLET' | translate\n            }}</button>\n\n        <button type=\"button\"\n                class=\"outline big w-100 mb-2\"\n                [routerLink]=\"['/' + paths.restore]\">{{ 'MAIN.BUTTON_RESTORE_BACKUP' |\n              translate\n            }}</button>\n\n        <p class=\"text-align-center cursor-pointer\"\n           fxLayout=\"row\"\n           fxLayoutAlign=\"center center\"\n           (click)=\"openInBrowser()\">\n            <i class=\"icon question-circle mr-1\"></i>\n            <span class=\"color-primary\">{{ 'MAIN.HELP' | translate }}</span>\n        </p>\n    </div>\n\n    <app-synchronization-status class=\"max-w-19-rem\"></app-synchronization-status>\n</div>\n"

/***/ }),

/***/ "./src/app/pages/auth/no-wallet/no-wallet.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/pages/auth/no-wallet/no-wallet.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Bvb2wvaW5maW5pdW1fdWktMDQ3YTQ2MDI3NDhlMGQzZTQwNDU2ZjlkMmZjMmVlZWYxYmM4OWIwNi9odG1sX3NvdXJjZS9zcmMvYXBwL3BhZ2VzL2F1dGgvbm8td2FsbGV0L25vLXdhbGxldC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvcGFnZXMvYXV0aC9uby13YWxsZXQvbm8td2FsbGV0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQ0NGIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvYXV0aC9uby13YWxsZXQvbm8td2FsbGV0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuIiwiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/pages/auth/no-wallet/no-wallet.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/pages/auth/no-wallet/no-wallet.component.ts ***!
  \*************************************************************/
/*! exports provided: NoWalletComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoWalletComponent", function() { return NoWalletComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/constants */ "./src/app/_shared/constants.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_helpers/services/backend.service */ "./src/app/_helpers/services/backend.service.ts");
/* harmony import */ var _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_helpers/services/variables.service */ "./src/app/_helpers/services/variables.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _paths__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../paths */ "./src/app/paths.ts");








var NoWalletComponent = /** @class */ (function () {
    function NoWalletComponent(_router, _backend, _ngZone, _translate, variablesService) {
        this._router = _router;
        this._backend = _backend;
        this._ngZone = _ngZone;
        this._translate = _translate;
        this.variablesService = variablesService;
        /** app paths */
        this.paths = _paths__WEBPACK_IMPORTED_MODULE_7__["paths"];
    }
    NoWalletComponent.prototype.ngOnInit = function () {
    };
    NoWalletComponent.prototype.openWallet = function () {
        var _this = this;
        this._backend.openFileDialog(this._translate.instant('MAIN.CHOOSE_PATH'), '*', this.variablesService.settings.default_path, function (file_status, file_data) {
            if (file_status) {
                _this.variablesService.settings.default_path = file_data.path.substr(0, file_data.path.lastIndexOf('/'));
                _this._ngZone.run(function () {
                    _this._router.navigate(['/' + _paths__WEBPACK_IMPORTED_MODULE_7__["paths"].open], { queryParams: { path: file_data.path } }).then();
                });
            }
            else {
                console.log(file_data['error_code']);
            }
        });
    };
    NoWalletComponent.prototype.openInBrowser = function () {
        this._backend.openUrlInBrowser(_shared_constants__WEBPACK_IMPORTED_MODULE_2__["CREATE_NEW_WALLET_HELP_PAGE"]);
    };
    NoWalletComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-no-wallet',
            template: __webpack_require__(/*! ./no-wallet.component.html */ "./src/app/pages/auth/no-wallet/no-wallet.component.html"),
            styles: [__webpack_require__(/*! ./no-wallet.component.scss */ "./src/app/pages/auth/no-wallet/no-wallet.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _helpers_services_backend_service__WEBPACK_IMPORTED_MODULE_4__["BackendService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"],
            _helpers_services_variables_service__WEBPACK_IMPORTED_MODULE_5__["VariablesService"]])
    ], NoWalletComponent);
    return NoWalletComponent;
}());



/***/ }),

/***/ "./src/app/pages/auth/no-wallet/no-wallet.module.ts":
/*!**********************************************************!*\
  !*** ./src/app/pages/auth/no-wallet/no-wallet.module.ts ***!
  \**********************************************************/
/*! exports provided: NoWalletModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoWalletModule", function() { return NoWalletModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _no_wallet_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./no-wallet.component */ "./src/app/pages/auth/no-wallet/no-wallet.component.ts");
/* harmony import */ var _no_wallet_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./no-wallet-routing.module */ "./src/app/pages/auth/no-wallet/no-wallet-routing.module.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _synchronization_status_synchronization_status_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../synchronization-status/synchronization-status.module */ "./src/app/synchronization-status/synchronization-status.module.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");








var NoWalletModule = /** @class */ (function () {
    function NoWalletModule() {
    }
    NoWalletModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_no_wallet_component__WEBPACK_IMPORTED_MODULE_3__["NoWalletComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _no_wallet_routing_module__WEBPACK_IMPORTED_MODULE_4__["NoWalletRoutingModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_7__["FlexLayoutModule"],
                _synchronization_status_synchronization_status_module__WEBPACK_IMPORTED_MODULE_6__["SynchronizationStatusModule"]
            ]
        })
    ], NoWalletModule);
    return NoWalletModule;
}());



/***/ })

}]);
//# sourceMappingURL=common.js.map