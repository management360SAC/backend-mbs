"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactTagsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ContactTag_1 = require("../ContactTag");
const contact_tags_service_1 = require("./contact-tags.service");
const contact_tags_controller_1 = require("./contact-tags.controller");
let ContactTagsModule = class ContactTagsModule {
};
exports.ContactTagsModule = ContactTagsModule;
exports.ContactTagsModule = ContactTagsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([ContactTag_1.ContactTag])],
        providers: [contact_tags_service_1.ContactTagsService],
        controllers: [contact_tags_controller_1.ContactTagsController],
    })
], ContactTagsModule);
//# sourceMappingURL=contact-tags.module.js.map