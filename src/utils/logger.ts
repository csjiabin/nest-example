import * as log4js from 'log4js';
const now = new Date();
log4js.configure({
  appenders: {
    file: {
      type: 'file',
      filename: __dirname + '/../../logs/log.log', // 文件目录，当目录文件或文件夹不存在时，会自动创建
      maxLogSize: 1000, // 文件最大存储空间，当文件内容超过文件存储空间会自动生成一个文件test.log.1的序列自增长的文件
      backups: 1, // 当文件内容超过文件存储空间时，备份文件的数量
      compress: true, // 是否以压缩的形式保存新文件,默认false。如果true，则新增的日志文件会保存在gz的压缩文件内，并且生成后将不被替换，false会被替换掉
      encoding: 'utf-8', // default "utf-8"，文件的编码
      category: 'log_file',
      numBackups: 5, // keep five backup files
    },
    dateFile: {
      type: 'dateFile',
      filename:
        __dirname +
        `/../../logs/${now.getFullYear()}-${now.getMonth() +
          1}-${now.getDate()}.log`,
      pattern: 'yyyy-MM-dd-hh',
      compress: true,
    },
    out: {
      type: 'stdout',
    },
  },
  categories: {
    default: { appenders: ['file', 'dateFile', 'out'], level: 'trace' },
  },
  // replaceConsole: true,
});
export default log4js.getLogger('log_file');
