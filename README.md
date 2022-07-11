# unxlsx

A cli can automatically generate files from Excel files.

[![NPM version](https://img.shields.io/github/package-json/v/sudongyuer/unxlsx)](https://www.npmjs.com/package/unxlsx)


<p align='center'>
<img src='https://git.poker/sudongyuer/image-bed/blob/master/20220712/unxlsx.2tc3vjrbqla0.png?raw=true' width='200'/>
</p>

## Why

We often need to export some information from `XLSX` to generate our files, such as `multi-language`, such as `error message copywriting`, such as project `translation copywriting`, when we need `unxlsx` to help us automatically generate

## Usage

### Install

```bash
pnpm add -D unxlsx
```

### Config `generate.config.ts`

- xlsxDir (require) : xlsx file directory base on `process.cwd()`

- files (require) : all the files you want to generate
  - key (require) : the key in the xlsx file
  - value (require) : the value in the xlsx file
  - outPutFileDir (require) : the file you want to generate to

```js
import { defineGenerateConfig } from '@imf/generate-error-message/utils'
export default defineGenerateConfig({
  xlsxDirs: [
    {
      xlsxDir: './xxx1.xlsx',
      files: [
        {
          key: 'key1',
          value: 'value1',
          outPutFileDir: './src/generate/file1.ts',
        },
        {
          key: 'key2',
          value: 'value2',
          outPutFileDir: './src/generate/file2.ts',
        },
      ],
    },
    {
      xlsxDir: './xxx2.xlsx',
      files: [
        {
          key: '后端接口错误码',
          value: '中文文案对照',
          outPutFileDir: './src/generate/file3.ts',
        },
        {
          key: '后端接口错误码',
          value: '英文文案',
          outPutFileDir: './src/generate/file4.ts',
        },
      ],
    },
  ],
})
```

### Generate `<fileName>.ts`

```bash
pnpm run unxlsx
```

## Author

sudongyuer email:976499226@qq.com

## License

[MIT](./LICENSE) License © 2021 [SuDongYu](https://github.com/sudongyuer)
