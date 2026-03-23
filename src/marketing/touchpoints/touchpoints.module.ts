import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Touchpoint } from "./Touchpoint";
import { TouchpointsService } from "./touchpoints.service";
import { TouchpointsController } from "./touchpoints.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Touchpoint])],
  controllers: [TouchpointsController],
  providers: [TouchpointsService],
  exports: [TouchpointsService],
})
export class TouchpointsModule {}
