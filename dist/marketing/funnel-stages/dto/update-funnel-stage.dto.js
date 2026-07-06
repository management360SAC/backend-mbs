"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFunnelStageDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_funnel_stage_dto_1 = require("./create-funnel-stage.dto");
class UpdateFunnelStageDto extends (0, mapped_types_1.PartialType)(create_funnel_stage_dto_1.CreateFunnelStageDto) {
}
exports.UpdateFunnelStageDto = UpdateFunnelStageDto;
//# sourceMappingURL=update-funnel-stage.dto.js.map