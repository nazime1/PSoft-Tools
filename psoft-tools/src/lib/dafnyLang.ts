export default function lang() {
  return {
    keywords: [
      "class",
      "datatype",
      "codatatype",
      "type",
      "function",
      "ghost",
      "var",
      "method",
      "constructor",
      "module",
      "import",
      "default",
      "as",
      "opened",
      "static",
      "refines",
      "returns",
      "break",
      "then",
      "else",
      "if",
      "label",
      "return",
      "while",
      "print",
      "where",
      "new",
      "parallel",
      "in",
      "this",
      "fresh",
      "choose",
      "match",
      "case",
      "assert",
      "assume",
      "predicate",
      "copredicate",
      "forall",
      "exists",
      "false",
      "true",
      "null",
      "old",
      "calc",
      "iterator",
      "yields",
      "yield",
    ],

    verifyKeywords: [
      "requires",
      "ensures",
      "modifies",
      "reads",
      "free",
      "invariant",
      "decreases",
    ],

    types: [
      "bool",
      "multiset",
      "map",
      "nat",
      "int",
      "object",
      "set",
      "seq",
      "array",
    ],

    brackets: [
      { open: "{", close: "}", token: "delimiter.curly" },
      { open: "[", close: "]", token: "delimiter.square" },
      { open: "(", close: ")", token: "delimiter.parenthesis" },
    ],

    // Dafny uses C# style strings
    escapes:
      /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

    tokenizer: {
      root: [
        // identifiers
        [/array([2-9]\d*|1\d+)/, "type.keyword"],
        [
          /[a-zA-Z'_?\\][\w'?\\]*/,
          {
            cases: {
              "@keywords": "keyword",
              "@verifyKeywords": "constructor.identifier",
              "@types": "type.keyword",
              "@default": "identifier",
            },
          },
        ],
        [":=", "keyword"],

        // whitespace
        { include: "@whitespace" },

        [/[{}()[\]]/, "@brackets"],
        [/[;,]/, "delimiter"],

        // literals
        [/[0-9]+/, "number"],

        // strings
        [/"([^"\\]|\\.)*$/, "string.invalid"], // non-teminated string
        [/"/, "string", "@string"],
      ],

      whitespace: [
        [/[ \t\r\n]+/, "white"],
        [/\/\*/, "comment", "@comment"],
        [/\/\/.*$/, "comment"],
      ],

      comment: [
        [/[^/*]+/, "comment"],
        [/\/\*/, "comment", "@push"], // nested comment
        ["\\*/", "comment", "@pop"],
        [/[/*]/, "comment"],
      ],

      string: [
        [/[^\\"]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],
    },
  };
}
