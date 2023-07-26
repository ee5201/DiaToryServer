import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FilesService } from './files.service';
import { FilesImages } from './entities/files.entity';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver()
export class FilesResolver {
  constructor(private readonly filesserivce: FilesService) {}

  @Mutation(() => FilesImages)
  uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<FilesImages> {
    return this.filesserivce.upload({ file });
  }
}
