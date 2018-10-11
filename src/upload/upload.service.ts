import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { join } from 'path';
import * as fs from 'fs';
import { mkdirsSync, emptyDir, rmEmptyDir } from '../utils/mkdir';

@Injectable()
export class UploadService {
  async saveFile(file): Promise<any> {
    try {
      const dateNow = moment().format('YYYY/MM/DD');
      const mkdirDirectory = join(__dirname, `/../public/temp/${dateNow}`);
      await mkdirsSync(mkdirDirectory);
      const timestamp = Date.now();
      fs.writeFile(
        `${mkdirDirectory}/${timestamp}.jpg`,
        file.buffer,
        { flag: 'a' },
        err => {
          if (err) {
            throw new Error('文件异常');
            // return false;
          }
        },
      );
      return {
        filename: `${timestamp}.jpg`,
        url: `/temp/${dateNow}/${timestamp}.jpg`,
      };
    } catch (error) {
      throw error;
    }
  }
}
