# Binary CSV (.bcsv)

> [!WARNING]
> This format is not meant to be taken seriously. It exists as a proof of concept.

It's like CSV but uses binary instead.

- :x: Not human readable.
- :x: Difficult to edit with common text editors such as Notepad.
- :x: More difficult to process and tends to be slower than string parsing.
- :x: Prone to data corruption.

## Example

This is a JavaScript `Uint8Array` representation of BCSV data.

```js
[
  66, 67, 83, 86, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 4, 110, 97, 109, 101, 0, 4, 74,
  111, 104, 110
]
```

A breakdown on what you're seeing here:

The initial 4 bits are [magic](https://en.wikipedia.org/wiki/List_of_file_signatures). This value can usually be ignored as it's purely metadata.

```
[66 67 83 86]
```

The next bit is the BCSV version. This can also be ignored.

```
[1]
```

The next 9 bits are `HEADER_COUNT` and `ROW_COUNT`. They are pretty much self-explanatory.
They are store using 1 bit (maximum of `255` headers) and 8 bits (maximum of `64 ** 2 - 1` rows).

The example below has 1 header and 1 row:

```
[1]                HEADER_COUNT
[1 0 0 0 0 0 0 0]  ROW_COUNT
```

The next piece of information are the headers (1 in this case as defined by `HEADER_COUNT`):

```
[1 4 110 97 109 101]
```

What you're seeing here is `[TYPE][NAME_LENGTH][...NAME]`.

> [!TIP]
> BCSV supports up to 255 headers, and header names support up to 255 characters.

There are only 2 types in BCSV:

```
STRING   0x01
INTEGER  0x02
```

`4` is the `NAME_LENGTH`. The next `4` bytes is the actual name. `110 97 109 101` decoded is `"name"`.

After headers, rows can be parsed. Types are defined by headers, so rows don't need to store this information.

```
[0 4 74 111 104 110]
```

The first 2 bits are the length of the `STRING` (defined by the header `"name"`) and can support up to `65536` characters.

The next 4 bits when decoded is `"John"`.
