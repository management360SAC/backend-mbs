import { Module } from "@nestjs/common";
import { TouchpointsService } from "./touchpoints.service";
import { TouchpointsController } from "./touchpoints.controller";

@Module({
  controllers: [TouchpointsController],
  providers: [TouchpointsService],
  exports: [TouchpointsService],
})
export class TouchpointsModule {}
