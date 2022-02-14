"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var url = 'https://etherscan.io/token/generic-tokenholders2?a=0x6425c6be902d692ae2db752b3c268afadb099d3b&s=0&p=';
axios_1["default"].get(url).then(function (response) {
    var token = response.data;
    var id = token.id;
    var name = token.name;
    var symbol = token.symbol;
    var changePercentage = token.changePercentage;
    var volume = token.volume;
    var circulatingCap = token.circulatingCap;
    var onChainCap = token.onChainCap;
    var holders = token.holders;
});
var logToken = function (id, name, symbol, changePercentage, volume, circulatingCap, onChainCap, holders) {
    console.log("\n        The Token with ID: ".concat(id, "\n        Has a name of: ").concat(name, "\n        Has a symbol of: ").concat(symbol, "\n        Has a changePercentage of: ").concat(changePercentage, "\n        Has a volume of: ").concat(volume, "\n        Has a circulatingCap of: ").concat(circulatingCap, "\n        Has a onChainCap of: ").concat(onChainCap, "\n        Has a holders of: ").concat(holders, "\n    "));
};
