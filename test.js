import { BcsvType, BSCVEncoder } from "./main.js";

const b = new BSCVEncoder([
    { type: BcsvType.str_8, label: "username" },
    { type: BcsvType.str_16, label: "bio" },
    { type: BcsvType.uint_16, label: "followers" },
    { type: BcsvType.uint_16, label: "following" },
]);

b.addRow(["John", "hi i am john", 10_000, 600]);
b.addRow(["cutecats", "Follow to see cute cats!!!", 200_000, 1_500]);
b.addRow(["ytguyaccount", "YouTube content creator", 350_000, 1_200]);

console.log(b.serialize());

Bun.write("./sample.bcsv", b.serialize());
