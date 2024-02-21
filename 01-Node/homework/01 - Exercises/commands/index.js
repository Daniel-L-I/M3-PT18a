const fs = require("fs");
const utils = require("../utils/request");
const process = require("process");
const { print } = require("../bash");
const { error } = require("console");
const { request } = require("https");

function pwd(print) {
    print(process.cwd())
}

function date(print) {
    print(Date())
}

function echo(print, args) {
    print(args)
}

function reusable(type, print, err, data) {
    if (err) throw new Error(err)
    else {
        switch (type) {
            case "ls":
                return print(data.join(" "))
            case "cat":
                return print(data)
            case "head":
                return print(data.split("\n")[0])
            case "tail":
                return print(data.split("\n").at(-1).trim())
        }
    }
}

function ls(print) {
    fs.readdir(".", (err, data) => reusable("ls", print, err, data))
}

function cat(print, path) {
    fs.readFile(path, "utf-8", (err, data) => reusable("cat", print, err, data))
}

function head(print, path) {
    fs.readFile(path, "utf-8", (err, data) => reusable("head", print, err, data))
}

function tail(print, path) {
    fs.readFile(path, "utf-8", (err, data) => reusable("tail", print, err, data))
}

function curl(print, path) {
    utils.request(path, (err, data) => {
        if (err) throw new Error(err)
        else {
            print(data)
        }
    })
}

module.exports = {
    pwd,
    date,
    echo,
    ls,
    cat,
    head,
    tail,
    curl
};
