let querystring = require('querystring');

http = require("http"),
   	fs = require("fs"),
   	a = require("./libs/functions");

let authentification = require('devis');
let options, buffer;

authentification.add({ role: "auth", action: "login" }, (args, done) => {
    options = args.options;
    authentification.act({ role: "model", action: "POST"}, {link: a.Link(options, options.loginLink), opt: "login", Add: args.Data }, function (pro) {
        //console.log(pro);
        done(pro);
    });
});

authentification.add({ role: "auth", action: "currentUser" }, (args, done) => {
    let transmission = { Response: "" };
    a.GET(a.Link(options, options.currentUser), "undefined", done, transmission);
});

authentification.add({ role: "auth", action: "currentUserBelongsTo" }, (args, done) => {
    authentification.act({ role: "model", action: "POST"}, {link: a.Link(options, options.belongsTo), opt: "group", Add: args.ID },(pro)=>{
        done(pro);
    });
});

authentification.add({ role: "auth", action: "logout" }, (args, done) => {
    let transmission = { Response: "" };
    a.GET(a.Link(options, options.logout), "undefined", done, transmission);
});

module.exports = authentification;
