"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_1 = require("react-router");
var Input_1 = __importDefault(require("../../components/Input"));
var firebaseConnection_1 = require("../../services/firebaseConnection");
var auth_1 = require("firebase/auth");
var react_toastify_1 = require("react-toastify");
var Login = function () {
    var _a = (0, react_1.useState)(""), email = _a[0], setEmail = _a[1];
    var _b = (0, react_1.useState)(""), password = _b[0], setPassword = _b[1];
    var navigate = (0, react_router_1.useNavigate)();
    var handleSubmit = function (e) {
        e.preventDefault();
        if (email === "" || password === "") {
            react_toastify_1.toast.warning("Fill in all fields!");
            return;
        }
        (0, auth_1.signInWithEmailAndPassword)(firebaseConnection_1.auth, email, password)
            .then(function () { return navigate("/admin", { replace: true }); })
            .catch(function (error) { return console.log("it went wrong", error); });
    };
    return (<div className="flex w-full h-screen items-center flex-col">
      <react_router_1.Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">Dev
          <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span>
        </h1>
      </react_router_1.Link>

      <form className="flex flex-col px-2 w-full max-w-xl" onSubmit={handleSubmit}>
        <Input_1.default placeholder="Enter your email..." type="email" value={email} onChange={function (e) { return setEmail(e.target.value); }}/>
        <Input_1.default placeholder="*******" type="password" value={password} onChange={function (e) { return setPassword(e.target.value); }}/>
        <button type="submit" className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white cursor-pointer">Acessar</button>
      </form>
    </div>);
};
exports.default = Login;
