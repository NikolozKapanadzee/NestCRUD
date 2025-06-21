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
      value &&
      'category' in value &&
      !knownCategories.includes(value.category)
    ) {
      throw new BadRequestException('Unknown Category');
    }
    if (value && 'priceFrom' in value && isNaN(value.price)) {
      throw new BadRequestException('something went wrong');
    }
    if (value && 'priceFrom' in value && !isNaN(value.price)) {
      value.priceFrom = Number(value.priceFrom);
    }
    return value;
  }
}
