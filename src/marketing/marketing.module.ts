import { Module } from "@nestjs/common";
import { CampaignsModule } from "./campaigns/campaigns.module";
import { ContactsModule } from "./contacts/contacts.module";
import { LeadStagesModule } from "./leads/lead-stages.module";
import { LeadSourcesModule } from "./lead-sources/lead-sources.module";
import { SegmentsModule } from "./segments/segments.module";
import { SellersModule } from "./sellers/sellers.module";
import { LeadsModule } from "./leads/leads.module";
import { DealsModule } from "./deals/deals.module";
import { FunnelStagesModule } from "./funnel-stages/funnel-stages.module";
import { DealStageHistoryModule } from "./deal-stage-history/deal-stage-history.module";
import { ActivitiesModule } from "./activities/activities.module";
import { TouchpointsModule } from "./touchpoints/touchpoints.module";
import { NotesModule } from "./notes/notes.module";
import { TagsModule } from "./tags/tags.module";
import { ContactTagsModule } from "./contact-tags/dto/contact-tags.module";
import { ConsentsModule } from "./notes/consents/consents.module";


@Module({
  imports: [
    CampaignsModule,
    ContactsModule,
    LeadStagesModule,
    LeadSourcesModule,
    SegmentsModule,
    SellersModule,
    LeadsModule,
    DealsModule,
    FunnelStagesModule,
    DealStageHistoryModule,
    ActivitiesModule,
    TouchpointsModule,
    NotesModule,
    TagsModule,
    ContactTagsModule,
    ConsentsModule,
  ],
})
export class MarketingModule {}
