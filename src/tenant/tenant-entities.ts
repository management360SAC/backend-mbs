import { User } from "../users/user.entity";
import { UserRole } from "../users/user-role.entity";
import { Role } from "../roles/role.entity";
import { RolePermission } from "../roles/role-permission.entity";
import { Permission } from "../permissions/permission.entity";
import { Contact } from "../marketing/contacts/Contact";
import { Lead } from "../marketing/leads/Lead";
import { LeadStage } from "../marketing/lead-stages/LeadStages";
import { LeadSource } from "../marketing/lead-sources/LeadSource";
import { Deal } from "../marketing/deals/Deal";
import { FunnelStage } from "../marketing/funnel-stages/FunnelStage";
import { Activity } from "../marketing/activities/Activity";
import { Campaign } from "../marketing/campaigns/Campaign";
import { CampaignFunnel } from "../marketing/campaigns/CampaignFunnel";
import { CampaignSend } from "../marketing/campaigns/CampaignSend";
import { ContactTag } from "../marketing/contact-tags/ContactTag";
import { Note } from "../marketing/notes/Note";
import { Tag } from "../marketing/tags/Tag";
import { Segment } from "../marketing/segments/Segment";
import { Seller } from "../marketing/sellers/Seller";
import { Touchpoint } from "../marketing/touchpoints/Touchpoint";
import { Consent } from "../marketing/notes/consents/Consent";
import { Course } from "../education/courses/Course";
import { Enrollment } from "../education/enrollments/Enrollment";
import { MoodleUserMap } from "../education/moodle-users-map/MoodleUserMap";
import { Cotizacion } from "../cotizaciones/Cotizacion";
import { CotizacionDetalle } from "../cotizaciones/CotizacionDetalle";
import { CotizacionEnvio } from "../cotizaciones/CotizacionEnvio";
import { EmpresaConfig } from "../empresa-config/EmpresaConfig";
import { EmpresaCliente } from "../empresa-cliente/EmpresaCliente";
import { EmpresaContacto } from "../empresa-cliente/EmpresaContacto";
import { EduPayment } from "../payments/EduPayment";
import { AuditLog } from "../audit/audit-log.entity";

export const TENANT_ENTITIES = [
  User,
  UserRole,
  Role,
  RolePermission,
  Permission,
  Contact,
  Lead,
  LeadStage,
  LeadSource,
  Deal,
  FunnelStage,
  Activity,
  Campaign,
  CampaignFunnel,
  CampaignSend,
  ContactTag,
  Note,
  Tag,
  Segment,
  Seller,
  Touchpoint,
  Consent,
  Course,
  Enrollment,
  MoodleUserMap,
  Cotizacion,
  CotizacionDetalle,
  CotizacionEnvio,
  EmpresaConfig,
  EmpresaCliente,
  EmpresaContacto,
  EduPayment,
  AuditLog,
];
