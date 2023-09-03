import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform<string, string> {
  transform(value: string) {
    const parsedDate = new Date(value);

    if (!value) return;
    if (isNaN(parsedDate.getTime())) {
      throw new HttpException('Invalid date format', HttpStatus.BAD_REQUEST);
    }

    return parsedDate.toISOString();
  }
}
