"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Header_1 = __importDefault(require("../../components/Header"));
var Input_1 = __importDefault(require("../../components/Input"));
var firebaseConnection_1 = require("../../services/firebaseConnection");
var firestore_1 = require("firebase/firestore");
var react_toastify_1 = require("react-toastify");
var Network = function () {
    var _a = (0, react_1.useState)(""), github = _a[0], setGithub = _a[1];
    var _b = (0, react_1.useState)(""), instagram = _b[0], setInstagram = _b[1];
    var _c = (0, react_1.useState)(""), linkedin = _c[0], setLinkedin = _c[1];
    var handleRegister = function (e) {
        e.preventDefault();
        var docRef = (0, firestore_1.doc)(firebaseConnection_1.db, "network", "link");
        (0, firestore_1.setDoc)(docRef, {
            github: github,
            instagram: instagram,
            linkedin: linkedin
        })
            .then(function () { return react_toastify_1.toast.success("Network links registered successfully!"); })
            .catch(function (error) {
            console.log("SOMETHING WENT WRONG WHILE REGISTERING THE NETWORKS LINK!", error);
            react_toastify_1.toast.success("SOMETHING WENT WRONG WHILE REGISTERING THE NETWORKS LINK!");
        });
    };
    var loadLinks = function () {
        var docRef = (0, firestore_1.doc)(firebaseConnection_1.db, "network", "link");
        (0, firestore_1.getDoc)(docRef)
            .then(function (snapshot) {
            var _a, _b, _c;
            if (snapshot.data() !== undefined) {
                setGithub((_a = snapshot.data()) === null || _a === void 0 ? void 0 : _a.github);
                setInstagram((_b = snapshot.data()) === null || _b === void 0 ? void 0 : _b.instagram);
                setLinkedin((_c = snapshot.data()) === null || _c === void 0 ? void 0 : _c.linkedin);
            }
        })
            .catch(function (error) {
            react_toastify_1.toast.error("Unable to fetch Social Media link!");
            console.log("Unable to fetch Social Media link!:", error);
        });
    };
    (0, react_1.useEffect)(function () {
        loadLinks();
    }, []);
    return (<div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header_1.default />

      <h1 className="text-white text-2xl font-medium mt-8 mb-4">My Social Networks</h1>

      <form onSubmit={handleRegister} className="flex flex-col mt-8 mb-3 w-full max-w-xl">
        <label className="text-white font-medium mt-2 mb-2">Github Link</label>
        <Input_1.default type="url" placeholder="Enter the github url..." value={github} onChange={function (e) { return setGithub(e.target.value); }}/>

        <label className="text-white font-medium mt-2 mb-2">Instagram link</label>
        <Input_1.default type="url" placeholder="Enter the instagram url..." value={instagram} onChange={function (e) { return setInstagram(e.target.value); }}/>

        <label className="text-white font-medium mt-2 mb-2">Linkedin link</label>
        <Input_1.default type="url" placeholder="Enter the linkedin url..." value={linkedin} onChange={function (e) { return setLinkedin(e.target.value); }}/>

        <button type="submit" className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center">
          Save Links
        </button>
      </form>

    </div>);
};
exports.default = Network;
