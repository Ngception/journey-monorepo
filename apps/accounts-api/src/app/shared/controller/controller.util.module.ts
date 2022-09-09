import { Module } from '@nestjs/common';
import { ControllerUtilService } from './controller.util.service';

@Module({
  providers: [ControllerUtilService],
  exports: [ControllerUtilService],
})
export class ControllerUtilModule {}
