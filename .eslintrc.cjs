module.exports = {
  ignorePatterns: ["*.d.ts"],
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:unicorn/recommended",
    "plugin:astro/recommended",
  ],
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
    {
      // Define the configuration for `.astro` file.
      files: ["*.astro"],
      // Allows Astro components to be parsed.
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        // .astro ファイル名はアッパーキャメルケースとする
        "unicorn/filename-case": ["error", { case: "pascalCase" }],
        // テキストエンコーディング識別子の大文字小文字の一貫性を強制ルールを無視する <meta charset="UTF-8" />でエラーが出てしまうので
        "unicorn/text-encoding-identifier-case": "off",
      },
    },
    {
      // /pages/ ディレクトリ配下の .astro ファイルに適用
      files: ["src/pages/**/*.astro"],
      rules: {
        // /pages/ ディレクトリ配下の .astro ファイルでのファイル名はケバブケース（kebab-case）を要求
        "unicorn/filename-case": ["error", { case: "kebabCase" }],
      },
    },
    {
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": 0,
    // 関数の引数でアンダースコア(_)から始まる引数はno-unused-varsエラーが出ないようにする(型定義のためなどで宣言したあと直接使わなくても良い)
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    // warnとerrorをワーニング対象から外す
    "no-console": ["error", { allow: ["warn", "error"] }],
    // @ aliasを使わないimportを禁止する
    "no-restricted-imports": [
      "error",
      {
        patterns: ["./**", "../**"],
      },
    ],
    // asを使用した型アサーションを許可する
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      {
        assertionStyle: "as",
        objectLiteralTypeAssertions: "never",
      },
    ],
    // コーポネント名が複数語でなくてもOKにする
    "vue/multi-word-component-names": "off",
    // importの自動ソート
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        pathGroups: [
          {
            pattern: "@/**",
            group: "parent",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "never",
      },
    ],
    // Array.prototype.forEach() を使うのは理にかなっているので無効化
    "unicorn/no-array-for-each": "off",
    // Array.from() を使うのは理にかなっているので無効化
    "unicorn/prefer-spread": "off",
    // allowList オプションを使用して Props という略語は許可
    "unicorn/prevent-abbreviations": [
      "error",
      {
        allowList: {
          // 'Props' という名前を許可
          Props: true,
        },
      },
    ],
  },
};
