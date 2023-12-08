module.exports = {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-recess-order",
  ],
  overrides: [
    {
      files: ['**/*.astro'],
      customSyntax: 'postcss-html',
      rules: {
        // 次の擬似クラスの使用を許可
        // :global()
        'selector-pseudo-class-no-unknown': [
          true,
          {
            ignorePseudoClasses: ['global'],
          },
        ],
      },
    }
  ],
  plugins: [
    // 他のプロパティ、値の組み合わせで反映されないプロパティをエラーとして検出する
    "stylelint-declaration-block-no-ignored-properties"
  ],
  rules: {
    "plugin/declaration-block-no-ignored-properties": true,
    // クラスの命名パターンに関するチェックを無視する
    "selector-class-pattern": null,
    // font-family nameに対してのvalue-keyword-caseチェックを無視する
    "value-keyword-case": [
      "lower", { "ignoreProperties": [
        "/^--font-/"
      ] }
    ]
  }
}
