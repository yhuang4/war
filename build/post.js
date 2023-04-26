"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xmlhttprequest_ts_1 = require("xmlhttprequest-ts");
const xhr = new xmlhttprequest_ts_1.XMLHttpRequest();
xhr.open('POST', 'http://localhost:3000/game');
xhr.onload = () => {
    if (xhr.status === 200) {
        console.log(xhr.responseText);
    }
    else {
        console.log(xhr.statusText);
    }
};
xhr.send();
