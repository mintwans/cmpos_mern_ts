"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.Routes = void 0;
var UserController_1 = require("./controller/UserController");
var ProductController_1 = require("./controller/ProductController");
var TransactionController_1 = require("./controller/TransactionController");
var authRoutes = [
    {
        method: 'post',
        route: '/register',
        controller: UserController_1.UserController,
        action: 'register'
    },
    {
        method: 'post',
        route: '/login',
        controller: UserController_1.UserController,
        action: 'login'
    },
    {
        method: 'get',
        route: '/users/:id',
        controller: UserController_1.UserController,
        action: 'one'
    },
    {
        method: 'get',
        route: '/users/remove/:username',
        controller: UserController_1.UserController,
        action: 'remove'
    },
];
var productRoutes = [
    {
        method: 'get',
        route: '/product',
        controller: ProductController_1.ProductController,
        action: 'all'
    },
    {
        method: 'get',
        route: '/product/id/:product_id',
        controller: ProductController_1.ProductController,
        action: 'one'
    },
    {
        method: 'post',
        route: '/product',
        controller: ProductController_1.ProductController,
        action: 'add'
    },
    {
        method: 'put',
        route: '/product',
        controller: ProductController_1.ProductController,
        action: 'update'
    },
    {
        method: 'delete',
        route: '/product/id/:product_id',
        controller: ProductController_1.ProductController,
        action: 'remove'
    },
    {
        method: 'get',
        route: '/product/name/:name',
        controller: ProductController_1.ProductController,
        action: 'allLike'
    },
];
var transactionRoutes = [
    {
        method: 'get',
        route: '/transaction',
        controller: TransactionController_1.TransactionController,
        action: 'all'
    },
    {
        method: 'get',
        route: '/transaction/between/:startDate/:endDate',
        controller: TransactionController_1.TransactionController,
        action: 'between'
    },
    {
        method: 'post',
        route: '/transaction',
        controller: TransactionController_1.TransactionController,
        action: 'add'
    },
    {
        method: 'get',
        route: '/transaction/id/:transaction_id',
        controller: TransactionController_1.TransactionController,
        action: 'one'
    },
];
exports.Routes = __spreadArray(__spreadArray(__spreadArray([], authRoutes, true), productRoutes, true), transactionRoutes, true);
