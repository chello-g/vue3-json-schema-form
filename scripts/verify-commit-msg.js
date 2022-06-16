const chalk = require('chalk')
chalk.enabled = true
chalk.level = 1 // 修改chalk颜色设置
// const msgPath = process.env.HUSKY_GIT_PARAMS
const msgPath = '.git/COMMIT_EDITMSG'
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim()
const commitRE =
  /^(Merge.*|(feat\:|fix\:|docs\:|style\:|refactor\:|perf\:|test\:|chore\:|revert\:|build\:)\s?.{1,50})$/i
if (!commitRE.test(msg)) {
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
      `invalid commit message format.`
    )}\n\n` +
      chalk.red(`  Proper commit message format is required. Examples:\n\n`) +
      `    ${chalk.red(
        `You can also use commit message: feat:/fix:/docs:/style:/refactor:/perf:/test:/chore:/revert:/build:xxxx`
      )}\n`
  )
  process.exit(1)
}
