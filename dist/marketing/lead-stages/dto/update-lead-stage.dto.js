"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLeadStageDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_lead_stage_dto_1 = require("./create-lead-stage.dto");
class UpdateLeadStageDto extends (0, mapped_types_1.PartialType)(create_lead_stage_dto_1.CreateLeadStageDto) {
}
exports.UpdateLeadStageDto = UpdateLeadStageDto;
//# sourceMappingURL=update-lead-stage.dto.js.map