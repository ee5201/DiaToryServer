import { Injectable } from '@nestjs/common';
import { FilesImages } from './entities/files.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { IFilesServiceUpload } from './interface/files-service';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FilesImages)
    private readonly fileImageRepository: Repository<FilesImages>,
  ) {}
  async upload({ file }: IFilesServiceUpload): Promise<FilesImages> {
    const bucket = 'diatoryprojects';

    const storage = new Storage({
      projectId: 'nifty-gasket-394013',
      keyFilename: 'nifty-gasket-394013-f41186e90c80.json',
    });
    const newFile = new FilesImages();
    newFile.id = uuid();
    newFile.url = `${bucket}/${file.filename}`;

    const result = await new Promise<string | unknown>((resolve, reject) => {
      file.createReadStream().pipe(
        storage
          .bucket(bucket)
          .file(file.filename)
          .createWriteStream()
          .on('finish', async () => {
            console.log('성공');

            try {
              await this.fileImageRepository.save(newFile); // 엔티티 저장
              resolve('성공');
            } catch (error) {
              console.error('DB 저장 실패:', error);
              reject('DB 저장 실패');
            }
          })
          .on('error', (error) => {
            console.log('실패');
            console.error('파일 업로드 실패:', error);
            reject('파일 업로드 실패');
          }),
      );
    });
    return newFile;
  }
}
