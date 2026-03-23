"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketingModule = void 0;
const common_1 = require("@nestjs/common");
const campaigns_module_1 = require("./campaigns/campaigns.module");
const contacts_module_1 = require("./contacts/contacts.module");
const lead_stages_module_1 = require("./leads/lead-stages.module");
const lead_sources_module_1 = require("./lead-sources/lead-sources.module");
const segments_module_1 = require("./segments/segments.module");
const sellers_module_1 = require("./sellers/sellers.module");
const leads_module_1 = require("./leads/leads.module");
const deals_module_1 = require("./deals/deals.module");
const funnel_stages_module_1 = require("./funnel-stages/funnel-stages.module");
const deal_stage_history_module_1 = require("./deal-stage-history/deal-stage-history.module");
const activities_module_1 = require("./activities/activities.module");
const touchpoints_module_1 = require("./touchpoints/touchpoints.module");
const notes_module_1 = require("./notes/notes.module");
const tags_module_1 = require("./tags/tags.module");
const contact_tags_module_1 = require("./contact-tags/dto/contact-tags.module");
const consents_module_1 = require("./notes/consents/consents.module");
let MarketingModule = class MarketingModule {
};
exports.MarketingModule = MarketingModule;
exports.MarketingModule = MarketingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            campaigns_module_1.CampaignsModule,
            contacts_module_1.ContactsModule,
            lead_stages_module_1.LeadStagesModule,
            lead_sources_module_1.LeadSourcesModule,
            segments_module_1.SegmentsModule,
            sellers_module_1.SellersModule,
            leads_module_1.LeadsModule,
            deals_module_1.DealsModule,
            funnel_stages_module_1.FunnelStagesModule,
            deal_stage_history_module_1.DealStageHistoryModule,
            activities_module_1.ActivitiesModule,
            touchpoints_module_1.TouchpointsModule,
            notes_module_1.NotesModule,
            tags_module_1.TagsModule,
            contact_tags_module_1.ContactTagsModule,
            consents_module_1.ConsentsModule,
        ],
    })
], MarketingModule);
//# sourceMappingURL=marketing.module.js.map