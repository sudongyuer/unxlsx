import { cwd } from 'process'
import fs from 'fs'
import path from 'path'
import xlsx from 'xlsx'
import chalk from 'chalk'
import { program } from 'commander'
// examples/basic-usage.js
program
  .option('-t, --target <path>', '指定错误文档的路径')
  .option('-o, --output <path>', '指定生成ErrorMessage的存储路径')
program.parse()
const options = program.opts()
const target = options.target
const output = options.output
const workbook = xlsx.readFile(path.resolve(cwd(), target))
const sheetNames = workbook.SheetNames
const sheet = workbook.Sheets[sheetNames[0]]
const data = xlsx.utils.sheet_to_json(sheet)
const EnErrorMessage = {}
const InErrorMessage = {}
data.forEach((item) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (item['后端接口错误码']) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    EnErrorMessage[item['后端接口错误码']] = item['英文文案']
  }
})
data.forEach((item) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (item['后端接口错误码']) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    InErrorMessage[item['后端接口错误码']] = item['印尼语文案']
  }
})
const EnErrorMessageStr = `
export default ${JSON.stringify(EnErrorMessage, null, 2)}
`
const InErrorMessageStr = `
export default ${JSON.stringify(InErrorMessage, null, 2)}
`
fs.writeFileSync(path.resolve(cwd(), `${output}/EnErrorMessage.ts`), EnErrorMessageStr)
fs.writeFileSync(path.resolve(cwd(), `${output}/InErrorMessage.ts`), InErrorMessageStr)
console.warn(chalk.bgCyan('🦥 大哥消息生成完毕，小弟撤退了🚗~'))
