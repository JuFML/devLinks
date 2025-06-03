"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_1 = require("react-router");
var router_1 = require("./routes/router");
require("react-toastify/dist/ReactToastify.css");
var react_toastify_1 = require("react-toastify");
function App() {
    return (<>
      <react_router_1.RouterProvider router={router_1.router}/>
      <react_toastify_1.ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable/>
    </>);
}
exports.default = App;
