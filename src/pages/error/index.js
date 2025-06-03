"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_1 = require("react-router");
var ErrorPage = function () {
    return (<div className="flex w-full min-h-screen justify-center items-center flex-col text-white">
      <h1 className='font-bold text-6xl mb-2'>404</h1>
      <h1 className='font-bold text-4xl mb-4'>Page not found</h1>
      <p className='italic text-1xl mb-4'>You have landed on a page that does not exist</p>

      <react_router_1.Link to="/" className='bg-gray-50/20 py-1 px-4 rounded-md'>Back to Home</react_router_1.Link>
    </div>);
};
exports.default = ErrorPage;
