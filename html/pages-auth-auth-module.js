(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-auth-auth-module"],{

/***/ "./src/app/pages/auth/auth-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/auth/auth-routing.module.ts ***!
  \***************************************************/
/*! exports provided: AuthRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthRoutingModule", function() { return AuthRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _paths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../paths */ "./src/app/paths.ts");




var routes = [
    {
        path: _paths__WEBPACK_IMPORTED_MODULE_3__["pathsChildrenAuth"].noWallet,
        loadChildren: './no-wallet/no-wallet.module#NoWalletModule',
    }
];
var AuthRoutingModule = /** @class */ (function () {
    function AuthRoutingModule() {
    }
    AuthRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AuthRoutingModule);
    return AuthRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/auth/auth.module.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/auth/auth.module.ts ***!
  \*******************************************/
/*! exports provided: AuthModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return AuthModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _no_wallet_no_wallet_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./no-wallet/no-wallet.module */ "./src/app/pages/auth/no-wallet/no-wallet.module.ts");
/* harmony import */ var _auth_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth-routing.module */ "./src/app/pages/auth/auth-routing.module.ts");





var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _auth_routing_module__WEBPACK_IMPORTED_MODULE_4__["AuthRoutingModule"],
                _no_wallet_no_wallet_module__WEBPACK_IMPORTED_MODULE_3__["NoWalletModule"]
            ]
        })
    ], AuthModule);
    return AuthModule;
}());



/***/ })

}]);
//# sourceMappingURL=pages-auth-auth-module.js.map