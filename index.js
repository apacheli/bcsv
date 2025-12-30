import { BCSVEditor, TYPES } from "./main.js";

const bcsv = new BCSVEditor();
bcsv.addHeader("name", TYPES.STRING);
bcsv.addRow("John");

console.log(bcsv.serialize());
