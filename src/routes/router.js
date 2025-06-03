"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var react_router_1 = require("react-router");
var Private_1 = __importDefault(require("./Private"));
var Layout_1 = __importDefault(require("../components/Layout"));
var home_1 = __importDefault(require("../pages/home"));
var login_1 = __importDefault(require("../pages/login"));
var admin_1 = __importDefault(require("../pages/admin"));
var network_1 = __importDefault(require("../pages/network"));
var error_1 = __importDefault(require("../pages/error"));
var router = (0, react_router_1.createBrowserRouter)([
    {
        element: <Layout_1.default />,
        children: [
            {
                path: "/",
                element: <home_1.default />
            },
            {
                path: "/login",
                element: <login_1.default />
            },
            {
                path: "/admin",
                element: <Private_1.default><admin_1.default /></Private_1.default>
            },
            {
                path: "/admin/network",
                element: <Private_1.default><network_1.default /></Private_1.default>
            },
            {
                path: "*",
                element: <error_1.default />
            }
        ]
    }
]);
exports.router = router;
