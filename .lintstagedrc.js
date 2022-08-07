module.exports = {
  '*.{js,vue}': 'eslint --cache',
  '*.{scss,vue}': 'stylelint',
  '*.**': 'prettier --check --ignore-unknown',
}
