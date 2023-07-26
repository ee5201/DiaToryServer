import { Module } from '@nestjs/common';
import { FilesResolver } from './files.resolver';
import { FilesService } from './files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesImages } from './entities/files.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FilesImages])],
  providers: [
    FilesResolver, //
    FilesService,
  ],
})
export class FilesModule {}
