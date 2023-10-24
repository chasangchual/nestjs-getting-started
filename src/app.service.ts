import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    this.logger.error('logging level: error');
    this.logger.warn('logging level: warn');
    this.logger.log('logging level: log');
    this.logger.verbose('logging level: verbose');
    this.logger.debug('logging level: debug');
    return 'Hello World!';
  }
}
