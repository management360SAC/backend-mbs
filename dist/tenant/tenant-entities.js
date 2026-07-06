"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TENANT_ENTITIES = void 0;
const user_entity_1 = require("../users/user.entity");
const user_role_entity_1 = require("../users/user-role.entity");
const role_entity_1 = require("../roles/role.entity");
const role_permission_entity_1 = require("../roles/role-permission.entity");
const permission_entity_1 = require("../permissions/permission.entity");
const Contact_1 = require("../marketing/contacts/Contact");
const Lead_1 = require("../marketing/leads/Lead");
const LeadStages_1 = require("../marketing/lead-stages/LeadStages");
const LeadSource_1 = require("../marketing/lead-sources/LeadSource");
const Deal_1 = require("../marketing/deals/Deal");
const FunnelStage_1 = require("../marketing/funnel-stages/FunnelStage");
const Activity_1 = require("../marketing/activities/Activity");
const Campaign_1 = require("../marketing/campaigns/Campaign");
const CampaignFunnel_1 = require("../marketing/campaigns/CampaignFunnel");
const CampaignSend_1 = require("../marketing/campaigns/CampaignSend");
const ContactTag_1 = require("../marketing/contact-tags/ContactTag");
const Note_1 = require("../marketing/notes/Note");
const Tag_1 = require("../marketing/tags/Tag");
const Segment_1 = require("../marketing/segments/Segment");
const Seller_1 = require("../marketing/sellers/Seller");
const Touchpoint_1 = require("../marketing/touchpoints/Touchpoint");
const Consent_1 = require("../marketing/notes/consents/Consent");
const Course_1 = require("../education/courses/Course");
const Enrollment_1 = require("../education/enrollments/Enrollment");
const MoodleUserMap_1 = require("../education/moodle-users-map/MoodleUserMap");
const Cotizacion_1 = require("../cotizaciones/Cotizacion");
const CotizacionDetalle_1 = require("../cotizaciones/CotizacionDetalle");
const CotizacionEnvio_1 = require("../cotizaciones/CotizacionEnvio");
const EmpresaConfig_1 = require("../empresa-config/EmpresaConfig");
const EmpresaCliente_1 = require("../empresa-cliente/EmpresaCliente");
const EmpresaContacto_1 = require("../empresa-cliente/EmpresaContacto");
const EduPayment_1 = require("../payments/EduPayment");
const audit_log_entity_1 = require("../audit/audit-log.entity");
exports.TENANT_ENTITIES = [
    user_entity_1.User,
    user_role_entity_1.UserRole,
    role_entity_1.Role,
    role_permission_entity_1.RolePermission,
    permission_entity_1.Permission,
    Contact_1.Contact,
    Lead_1.Lead,
    LeadStages_1.LeadStage,
    LeadSource_1.LeadSource,
    Deal_1.Deal,
    FunnelStage_1.FunnelStage,
    Activity_1.Activity,
    Campaign_1.Campaign,
    CampaignFunnel_1.CampaignFunnel,
    CampaignSend_1.CampaignSend,
    ContactTag_1.ContactTag,
    Note_1.Note,
    Tag_1.Tag,
    Segment_1.Segment,
    Seller_1.Seller,
    Touchpoint_1.Touchpoint,
    Consent_1.Consent,
    Course_1.Course,
    Enrollment_1.Enrollment,
    MoodleUserMap_1.MoodleUserMap,
    Cotizacion_1.Cotizacion,
    CotizacionDetalle_1.CotizacionDetalle,
    CotizacionEnvio_1.CotizacionEnvio,
    EmpresaConfig_1.EmpresaConfig,
    EmpresaCliente_1.EmpresaCliente,
    EmpresaContacto_1.EmpresaContacto,
    EduPayment_1.EduPayment,
    audit_log_entity_1.AuditLog,
];
//# sourceMappingURL=tenant-entities.js.map