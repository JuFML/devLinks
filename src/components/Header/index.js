"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bi_1 = require("react-icons/bi");
var react_router_1 = require("react-router");
var firebaseConnection_1 = require("../../services/firebaseConnection");
var auth_1 = require("firebase/auth");
var auth_2 = require("firebase/auth");
var react_1 = require("react");
var Header = function () {
    var _a = (0, react_1.useState)(false), signed = _a[0], setSigned = _a[1];
    var handleLogout = function () {
        (0, auth_1.signOut)(firebaseConnection_1.auth);
    };
    (0, react_1.useEffect)(function () {
        var unsub = (0, auth_2.onAuthStateChanged)(firebaseConnection_1.auth, function (user) {
            if (!user) {
                setSigned(false);
            }
            else {
                setSigned(true);
            }
        });
        return (function () { return unsub(); });
    }, []);
    return (<header className="w-full max-w-2xl mt-4 px-1">
      <nav className="w-full bg-white h-12 flex items-center justify-between rounded-md px-3">
        <div className="flex gap-4 font-medium">
          <react_router_1.Link to="/">Home</react_router_1.Link>
          {signed && (<>
              <react_router_1.Link to="/admin">Links</react_router_1.Link>
              <react_router_1.Link to="/admin/network">Networks</react_router_1.Link>
            </>)}
        </div>
        {signed ?
            <button onClick={handleLogout} className='cursor-pointer'>
            <bi_1.BiLogOut size={28} color="#db2629"/>
          </button> :
            <react_router_1.Link to="/login" className='cursor-pointer'>
            <bi_1.BiLogIn size={28} color="#00ff00"/>
          </react_router_1.Link>}
      </nav>
    </header>);
};
exports.default = Header;
