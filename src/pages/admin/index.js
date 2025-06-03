"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Header_1 = __importDefault(require("../../components/Header"));
var Input_1 = __importDefault(require("../../components/Input"));
var fi_1 = require("react-icons/fi");
var firebaseConnection_1 = require("../../services/firebaseConnection");
var firestore_1 = require("firebase/firestore");
var react_toastify_1 = require("react-toastify");
var Admin = function () {
    var _a = (0, react_1.useState)(""), nameInput = _a[0], setNameInput = _a[1];
    var _b = (0, react_1.useState)(""), urlInput = _b[0], setUrlInput = _b[1];
    var _c = (0, react_1.useState)("#f1f1f1"), textColorInput = _c[0], setTextColorInput = _c[1];
    var _d = (0, react_1.useState)("#121212"), backgroundColorInput = _d[0], setBackgroundColorInput = _d[1];
    var _e = (0, react_1.useState)([]), links = _e[0], setLinks = _e[1];
    var handleRegister = function (e) {
        e.preventDefault();
        if (nameInput === "" || urlInput === "") {
            react_toastify_1.toast.warning("Fill in all fields!");
            return;
        }
        (0, firestore_1.addDoc)((0, firestore_1.collection)(firebaseConnection_1.db, "links"), {
            name: nameInput,
            url: urlInput,
            textColor: textColorInput,
            backgroundColor: backgroundColorInput
        }).then(function () {
            getLinks();
            setNameInput("");
            setUrlInput("");
            console.log("LINK REGISTERED SUCCESSFULLY");
        }).catch(function (error) {
            react_toastify_1.toast.error("ERROR REGISTERING LINK");
            console.log("ERROR REGISTERING LINK: ", error);
        });
    };
    var getLinks = function () {
        (0, firestore_1.getDocs)((0, firestore_1.collection)(firebaseConnection_1.db, "links"))
            .then(function (snapshot) {
            var links = [];
            snapshot === null || snapshot === void 0 ? void 0 : snapshot.forEach(function (doc) {
                links.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    textColor: doc.data().textColor,
                    bgColor: doc.data().backgroundColor,
                });
            });
            setLinks(links);
        })
            .catch(function (error) {
            react_toastify_1.toast.error("SOMETHING WENT WRONG WHILE SEARCHING FOR LINKS");
            console.log("SOMETHING WENT WRONG WHILE SEARCHING FOR LINKS:", error);
        });
    };
    var handleDeleteLink = function (id) {
        var docRef = (0, firestore_1.doc)(firebaseConnection_1.db, "links", id);
        (0, firestore_1.deleteDoc)(docRef)
            .then(function () {
            react_toastify_1.toast.success('Link deleted successfully!');
            getLinks();
        })
            .catch(function (error) {
            react_toastify_1.toast.error('Something went wrong while deleting the Link!');
            console.log("Something went wrong while deleting the Link:", error);
            getLinks();
        });
    };
    (0, react_1.useEffect)(function () {
        getLinks();
    }, []);
    return (<div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header_1.default />
      <form onSubmit={handleRegister} className="flex flex-col mt-8 mb-3 w-full max-w-xl">
        <label className="text-white font-medium mt-2 mb-2">Link name</label>
        <Input_1.default placeholder="Enter link name..." value={nameInput} onChange={function (e) { return setNameInput(e.target.value); }}/>
        <label className="text-white font-medium mt-2 mb-2">Link url</label>
        <Input_1.default type="url" placeholder="Enter the link url..." value={urlInput} onChange={function (e) { return setUrlInput(e.target.value); }}/>

        <section className="flex my-4 gap-5">
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">Link color</label>
            <Input_1.default type="color" value={textColorInput} onChange={function (e) { return setTextColorInput(e.target.value); }}/>
          </div>
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">Link background</label>
            <Input_1.default type="color" value={backgroundColorInput} onChange={function (e) { return setBackgroundColorInput(e.target.value); }}/>
          </div>
        </section>

        {nameInput !== "" &&
            <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium mt-2 mb-3">Veja como está ficando:</label>
            <article className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3 mb-8 mt-8" style={{ backgroundColor: backgroundColorInput }}>
              <p className="font-medium" style={{ color: textColorInput }}>{nameInput}</p>
            </article>
          </div>}

        <button type="submit" className="cursor-pointer mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center">
          Register
        </button>
      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">
        My Links
      </h2>

      {links.map(function (link) { return (<article key={link.id} className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none" style={{ backgroundColor: link.bgColor, color: link.textColor }}>
          <p>{link.name}</p>
          <div>
            <button className="border border-dashed p-1 rounded bg-neutral-900">
              <fi_1.FiTrash onClick={function () { return handleDeleteLink(link.id); }} size={18} color="#fff"/>
            </button>
          </div>
        </article>); })}


    </div>);
};
exports.default = Admin;
