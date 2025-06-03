"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_1 = require("react-router");
var firebaseConnection_1 = require("../services/firebaseConnection");
var auth_1 = require("firebase/auth");
var Private = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(false), signed = _c[0], setSigned = _c[1];
    (0, react_1.useEffect)(function () {
        var unsub = (0, auth_1.onAuthStateChanged)(firebaseConnection_1.auth, function (user) {
            if (!user) {
                setLoading(false);
                setSigned(false);
            }
            else {
                setLoading(false);
                setSigned(true);
            }
        });
        return (function () { return unsub(); });
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!signed) {
        return <react_router_1.Navigate to="/login"/>;
    }
    return <>{children}</>;
};
exports.default = Private;
