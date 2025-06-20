import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CategoryPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const knownCategories = ['groceries', 'fun', 'technics'];
    if (
      typeof value === 'object' &&
      value !== null &&
      'category' in value &&
      !knownCategories.includes(value.category)
    ) {
      throw new BadRequestException('Unknown category');
    }

    return value;
  }
}
