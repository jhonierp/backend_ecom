const commitTypes = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'build',
  'ci',
  'chore',
  'revert',
  'add',
  'remove',
  'update',
  'merge',
  'improve',
  'hotfix',
];

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-pattern': [
      2,
      'always',
      new RegExp(`^(${commitTypes.join('|')}):\\s.+$`),
    ],
  },
};
