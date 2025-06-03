"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Social_1 = __importDefault(require("../../components/Social"));
var fa_1 = require("react-icons/fa");
var firebaseConnection_1 = require("../../services/firebaseConnection");
var firestore_1 = require("firebase/firestore");
var react_1 = require("react");
var react_toastify_1 = require("react-toastify");
var Header_1 = __importDefault(require("../../components/Header"));
var Home = function () {
    var _a = (0, react_1.useState)([]), links = _a[0], setLinks = _a[1];
    var _b = (0, react_1.useState)(), network = _b[0], setNetwork = _b[1];
    var getLinks = function () {
        (0, firestore_1.getDocs)((0, firestore_1.collection)(firebaseConnection_1.db, "links"))
            .then(function (snapshot) {
            var lista = [];
            snapshot.forEach(function (doc) {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    textColor: doc.data().textColor,
                    bgColor: doc.data().backgroundColor
                });
            });
            setLinks(lista);
        })
            .catch(function (error) {
            react_toastify_1.toast.error("Something went wrong while fetching the links!");
            console.log("Something went wrong while fetching the links:", error);
        });
    };
    var getNetwork = function () {
        (0, firestore_1.getDoc)((0, firestore_1.doc)(firebaseConnection_1.db, "network", "link"))
            .then(function (snapshot) {
            var _a, _b, _c;
            if (snapshot.data() !== undefined) {
                setNetwork({
                    github: (_a = snapshot.data()) === null || _a === void 0 ? void 0 : _a.github,
                    instagram: (_b = snapshot.data()) === null || _b === void 0 ? void 0 : _b.instagram,
                    linkedin: (_c = snapshot.data()) === null || _c === void 0 ? void 0 : _c.linkedin
                });
            }
        })
            .catch(function (error) {
            react_toastify_1.toast.error("Something went wrong while fetching social media links!");
            console.log("Something went wrong while fetching social media links:", error);
        });
    };
    (0, react_1.useEffect)(function () {
        getLinks();
    }, []);
    (0, react_1.useEffect)(function () {
        getNetwork();
    }, []);
    return (<div className="flex flex-col w-full py-4 items-center justify-center">
      <Header_1.default />
      <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">Hi, Welcome to the devLink page!</h1>
      <span className="text-gray-50 mb-5 mt-3">Check your links👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map(function (link) { return (<section style={{ backgroundColor: link.bgColor }} key={link.id} className="mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
            <a href={link.url} target="_blank">
              <p style={{ color: link.textColor }} className="text-base md:text-lg">
                {link.name}
              </p>
            </a>
          </section>); })}

        {network && Object.keys(network).length > 0 && (<footer className="flex justify-center gap-3 my-4">
            <Social_1.default url={network === null || network === void 0 ? void 0 : network.github}>
              <fa_1.FaGithub size={36} color="fff"/>
            </Social_1.default>
            <Social_1.default url={network === null || network === void 0 ? void 0 : network.linkedin}>
              <fa_1.FaLinkedin size={36} color="fff"/>
            </Social_1.default>
            <Social_1.default url={network === null || network === void 0 ? void 0 : network.instagram}>
              <fa_1.FaInstagram size={36} color="fff"/>
            </Social_1.default>
          </footer>)}

      </main>
    </div>);
};
exports.default = Home;
