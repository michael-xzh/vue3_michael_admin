module.exports = {
  extends: ['@commitlint/config-conventional'],
  // 校验规则
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', //新特性
        'fix', //修改bug
        'docs', //文档修改
        'style', //代码格式修改
        'refactor', // 代码重构
        'perf', //提升性能
        'test', //
        'chore', // 增加依赖工具等
        'revert', // 回滚到上一版本
        'build', //编译相关修改
      ],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
}
