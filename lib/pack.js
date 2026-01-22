const encoder = new TextEncoder();

export const BcsvType = {
    STR_8: 0x10,
    STR_16: 0x11,
    STR_32: 0x12,
    STR_64: 0x13,

    UINT_8: 0x20,
    UINT_16: 0x21,
    UINT_32: 0x22,
    UINT_64: 0x23,

    INT_8: 0x30,
    INT_16: 0x31,
    INT_32: 0x32,
    INT_64: 0x33,

    BOOL: 0x40,
};

/**
 * 
 * @param {[type: number, name: string][]} headers 
 * @param {any[][]} rows 
 */
export function pack(stream) {
    const chunks = [
        new Uint8Array([0x42, 0x43, 0x53, 0x56, 0x01, headers.length]),
        new Uint8Array(new BigUint64Array([BigInt(rows.length)]).buffer),
    ];

    return chunks;
}

const c = pack(
    [
        [BcsvType.STR_8, "name"],
        [BcsvType.STR_8, "bio"],
    ],
    [
        ["Johnny", "hi i am johnny i am a software developer"],
    ],
);

console.log(c);
