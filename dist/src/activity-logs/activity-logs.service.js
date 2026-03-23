"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityLogsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let ActivityLogsService = class ActivityLogsService {
    dataSource;
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async getRecentActivity(params) {
        const page = params.page ?? 1;
        const limit = params.limit ?? 10;
        const offset = (page - 1) * limit;
        const et = params.entity_type;
        const subqueries = [];
        if (!et || et === "contact") {
            subqueries.push(`SELECT id AS entity_id, 'contact' AS entity_type,
                full_name AS entity_name,
                'created' AS action,
                CONCAT('Contacto registrado: ', full_name) AS description,
                NULL AS actor_name, created_at
         FROM mk_contacts`);
        }
        if (!et || et === "payment") {
            subqueries.push(`SELECT id AS entity_id, 'payment' AS entity_type,
                CONCAT(currency, ' ', FORMAT(amount,2)) AS entity_name,
                'payment_received' AS action,
                CONCAT('Pago recibido: ', currency, ' ', FORMAT(amount,2), ' (', payment_method, ')') AS description,
                NULL AS actor_name, created_at
         FROM edu_payments`);
        }
        if (!et || et === "quotation") {
            subqueries.push(`SELECT id AS entity_id, 'quotation' AS entity_type,
                numero AS entity_name,
                'proposal_sent' AS action,
                CONCAT('Cotización ', numero, ': ', titulo, ' — ', estado) AS description,
                NULL AS actor_name, created_at
         FROM cotizaciones`);
        }
        if (!et || et === "enrollment") {
            subqueries.push(`SELECT e.id AS entity_id, 'enrollment' AS entity_type,
                CONCAT('Matrícula #', e.id) AS entity_name,
                'enrolled' AS action,
                CONCAT('Alumno matriculado en curso #', e.course_id, ' — ', e.status) AS description,
                NULL AS actor_name, e.created_at
         FROM edu_enrollments e`);
        }
        if (subqueries.length === 0) {
            return { data: [], total: 0, page, totalPages: 0 };
        }
        const union = subqueries.map(q => `(${q})`).join("\nUNION ALL\n");
        let total = 0;
        try {
            const countRows = await this.dataSource.query(`SELECT COUNT(*) AS cnt FROM (${union}) AS _all`);
            total = Number(countRows[0]?.cnt ?? 0);
        }
        catch {
            total = 0;
        }
        let rows = [];
        try {
            rows = await this.dataSource.query(`SELECT * FROM (${union}) AS _all ORDER BY created_at DESC LIMIT ? OFFSET ?`, [limit, offset]);
        }
        catch {
            rows = [];
        }
        const data = rows.map((r, idx) => ({
            id: offset + idx + 1,
            entity_type: r.entity_type,
            entity_id: r.entity_id,
            action: r.action,
            description: r.description,
            actor_name: r.actor_name ?? null,
            metadata: { entity_name: r.entity_name },
            created_at: r.created_at,
        }));
        return { data, total, page, totalPages: Math.ceil(total / limit) };
    }
};
exports.ActivityLogsService = ActivityLogsService;
exports.ActivityLogsService = ActivityLogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ActivityLogsService);
//# sourceMappingURL=activity-logs.service.js.map