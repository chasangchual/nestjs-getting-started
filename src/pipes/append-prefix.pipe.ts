import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class AppendPrefixPipe implements PipeTransform<string> {
  constructor(private readonly prefix) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata || !(typeof typeof metadata.metatype === 'string')) {
      return value;
    }

    const transformed: string = this.prefix + value;
    return transformed;
  }
}
