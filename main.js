const encoder = new TextEncoder();

const setUint64 = (int, array = [], index = array.length) => {
  for (let i = 7; i >= 0; i--) {
    array[index + i] = Number(int & 255n);
    int >>= 8n;
  }
  return array;
};

const setUint16 = (int, array = [], index = array.length) => {
  for (let i = 1; i >= 0; i--) {
    array[index + i] = int & 255;
    int >>= 8;
  }
  return array;
};

const TYPES = {
  STRING: 0x01,
  INTEGER: 0x02,
};

class BCSVEditor {
  headers = [];
  rows = [];

  addHeader(name, type) {
    this.headers.push({ name, type });
  }

  addRow(...values) {
    this.rows.push({ values });
  }

  serialize() {
    const array = [
      66, 67, 83, 86,
      1,
      this.headers.length,
      0, 0, 0, 0, 0, 0, 0, 0,
    ];
    setUint64(BigInt(this.rows.length), array, 6);

    for (let i = 0, j = this.headers.length; i < j; i++) {
      const header = this.headers[i];

      const name = encoder.encode(header.name);
      const len = name.byteLength;
  
      const o = array.length;
      array.length += 1 + len;
  
      array[o] = header.type;
      array[o + 1] = len;

      for (let n = 0; n < len; n++) {
        array[o + 2 + n] = name[n];
      }
    }

    for (const row of this.rows) {
      for (let i = 0; i < this.headers.length; i++) {
        const header = this.headers[i];
        const value = row.values[i];

        switch (header.type) {
          case TYPES.STRING: {
            const e = encoder.encode(value);
            setUint16(e.byteLength, array);
            array.push(...e);
            break;
          }

          case TYPES.INTEGER: {
            setUint64(value, array);
            break;
          }
        }
      }
    }

    return array;
  }
}

export {
  BCSVEditor,
  TYPES,
};
