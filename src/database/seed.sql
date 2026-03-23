-- ============================================================
-- SEED PROINNOVATE 2024 — CRM MBS
-- Empresas ganadoras de concursos PROINNOVATE 2024
--
-- IDEMPOTENTE: se puede ejecutar múltiples veces sin duplicar.
-- Ejecutar con:
--   docker exec -i crm-db mysql -u root -p<PASS> crm_mbs < seed.sql
-- o desde MySQL Workbench / DBeaver.
-- ============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ============================================================
-- 1. CATÁLOGOS BASE
-- ============================================================

-- ── Lead Stages (etapas del pipeline de leads) ──────────────
-- mk_lead_stages tiene UNIQUE en name → INSERT IGNORE funciona
INSERT IGNORE INTO mk_lead_stages (name, `order`, is_active, is_final, is_won, is_lost, created_at, updated_at)
VALUES
  ('Nuevo',             1, 1, 0, 0, 0, NOW(), NOW()),
  ('Contactado',        2, 1, 0, 0, 0, NOW(), NOW()),
  ('Calificado',        3, 1, 0, 0, 0, NOW(), NOW()),
  ('Propuesta enviada', 4, 1, 0, 0, 0, NOW(), NOW()),
  ('Negociación',       5, 1, 0, 0, 0, NOW(), NOW()),
  ('Ganado',            6, 1, 1, 1, 0, NOW(), NOW()),
  ('Perdido',           7, 1, 1, 0, 1, NOW(), NOW());

-- ── Funnel Stages (etapas del embudo de ventas para deals) ──
INSERT INTO mk_funnel_stages (name, position, is_won, is_lost, created_at)
SELECT 'Primer Contacto', 1, 0, 0, NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_funnel_stages WHERE name = 'Primer Contacto');

INSERT INTO mk_funnel_stages (name, position, is_won, is_lost, created_at)
SELECT 'Calificación', 2, 0, 0, NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_funnel_stages WHERE name = 'Calificación');

INSERT INTO mk_funnel_stages (name, position, is_won, is_lost, created_at)
SELECT 'Propuesta Enviada', 3, 0, 0, NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_funnel_stages WHERE name = 'Propuesta Enviada');

INSERT INTO mk_funnel_stages (name, position, is_won, is_lost, created_at)
SELECT 'Negociación', 4, 0, 0, NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_funnel_stages WHERE name = 'Negociación');

INSERT INTO mk_funnel_stages (name, position, is_won, is_lost, created_at)
SELECT 'Cerrado Ganado', 5, 1, 0, NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_funnel_stages WHERE name = 'Cerrado Ganado');

INSERT INTO mk_funnel_stages (name, position, is_won, is_lost, created_at)
SELECT 'Cerrado Perdido', 6, 0, 1, NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_funnel_stages WHERE name = 'Cerrado Perdido');

-- ── Lead Sources ─────────────────────────────────────────────
INSERT INTO mk_lead_sources (name, channel, created_at)
SELECT 'PROINNOVATE 2024', 'event', NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_lead_sources WHERE name = 'PROINNOVATE 2024');

INSERT INTO mk_lead_sources (name, channel, created_at)
SELECT 'Web', 'organic', NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_lead_sources WHERE name = 'Web');

INSERT INTO mk_lead_sources (name, channel, created_at)
SELECT 'Referido', 'referral', NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_lead_sources WHERE name = 'Referido');

INSERT INTO mk_lead_sources (name, channel, created_at)
SELECT 'Redes Sociales', 'organic', NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_lead_sources WHERE name = 'Redes Sociales');

-- ── Sellers ──────────────────────────────────────────────────
INSERT INTO mk_sellers (name, email, phone, is_active, created_at, updated_at)
SELECT 'María Alejandra Quispe', 'malejandra@mbs.pe', '999000001', 1, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_sellers WHERE email = 'malejandra@mbs.pe');

INSERT INTO mk_sellers (name, email, phone, is_active, created_at, updated_at)
SELECT 'Carlos Mendoza Rivas', 'cmendoza@mbs.pe', '999000002', 1, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_sellers WHERE email = 'cmendoza@mbs.pe');

-- ============================================================
-- 2. EMPRESAS CLIENTES (del CSV PROINNOVATE 2024)
-- ============================================================

-- 1. THE PET BRAND S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa','THE PET BRAND S.A.C.','The Pet Brand','20608628313','Cal. Diego Ferré 218 Dpto. 301, Miraflores, Lima','991084831','contacto.thepetbrand@gmail.com','activo','Empresa de productos para mascotas. Ganadora PROINNOVATE 2024. Proyecto: transformación digital marketing. Sector: Comercio retail.', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20608628313');

-- 2. COMMON PERU
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa','COMMON PERU ASOCIACION DE USUARIOS DE TECNOLOGIAS DE INFORMACION IBM Y COMPATIBLES','COMMON PERU','20125389369','Jr. Chiclayo 452 Int. H, Miraflores, Lima','908897908','commonperu@commonperu.pe','activo','Asociación de Usuarios TI más importante del Perú y Latinoamérica. Proyecto: canales digitales. Sector: TI.', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20125389369');

-- 3. ASOCIACION MANDOVA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa','ASOCIACION DE PRODUCTORES AGROPERU MANDOVA','Mandova','20609025353','Mza. C Lote 3, Urb. Las Cucardas, Jaén, Cajamarca',NULL,'produccion@mandova.org','activo','Productores de café pergamino seco. Proyecto: ERP trazabilidad. Sector: Agroexportación.', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20609025353');

-- 4. BLUE COFFEE DE UBIRIKI
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa','ASOCIACION DE PRODUCTORES BLUE COFFEE DE UBIRIKI','Blue Coffee Ubiriki','20605668501','Jr. 7 de Junio 525, Pichanaqui, Junín','993803692','bluecoffeedeubiriki@gmail.com','activo','Asociación productores café exportador. Proyecto: trazabilidad y valorización residuos. Sector: Agroexportación.', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605668501');

-- 5. NUEVO HORIZONTE DEL PERU
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa','ASOCIACION DE PRODUCTORES AGROPECUARIOS SOLIDARIOS NUEVO HORIZONTE DEL PERU','Nuevo Horizonte Perú','20610029354','Calle Jose Olaya S/N, Chirinos, San Ignacio, Cajamarca','937594263','gerencia@nuevohorizontedelperu.com','activo','Organización agropecuaria exportadora. Proyecto: software gestión productiva. Sector: Agroexportación.', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610029354');

-- 6. COPAPOR
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa','ASOCIACION AGROPECUARIA Y TURISTICA COPAPOR','COPAPOR','20602926100','Av. Principal S/N, El Porvenir de Aramango, Bagua, Amazonas','041480222','contacto@coopnororiente.com','activo','Productores de café y piña. Proyecto: software trazabilidad de cultivos. Sector: Agricultura.', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20602926100');

-- 7. CAFE DE ALTA MONTANA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa','ASOCIACION DE PRODUCTORES AGROPECUARIOS CAFE DE ALTA MONTANA','Café Alta Montaña','20611294051','Carretera San Ignacio–Namballe, Alto Loyola, San Ignacio, Cajamarca','949791984','gerencia@coopaltamontana.pe','activo','Cooperativa cafetalera con planta de beneficio. Proyecto: sistema de calidad + branding. Sector: Agroexportación.', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20611294051');

-- 8. LIBRERIA E IMPRENTA EL PARQUE
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa','LIBRERIA E IMPRENTA EL PARQUE SRLTDA','Productos El Parque','20131685638','Av. Pablo Casals 45, Urb. Los Cedros, Trujillo, La Libertad','044258584','web@productoselparque.com','activo','Marca de productos escolares con 33+ años. Proyecto: ERP Odoo. Sector: Imprenta/Comercio.', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20131685638');

-- 9. COOPSERMUL CAPITAL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa','COOPERATIVA DE SERVICIOS MULTIPLES GRUPO DE INVERSIONES CAPITAL COOPSERMUL CAPITAL','Coopsermul Capital','20608049984','Calle Machupicchu M-5 Ofic. 301, Urb. Manuel Prado, Wanchaq, Cusco','947766083','contacto@grupoinversionescapital.com','activo','Cooperativa de servicios financieros. Proyecto: CRM y marketing digital. Sector: Finanzas/Cooperativas.', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20608049984');

-- 10. CONDE DE LEMOS E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa','EMPRESA DE SERVICIOS TURISTICOS CONDE DE LEMOS E.I.R.L.','Hotel Conde de Lemos','20364062916','Calle Bolívar 201, Arequipa','913937504','reservasaqp@condelemosinn.com','activo','Hotel boutique en Arequipa. Proyecto: CRM + sistema logístico integrado. Sector: Turismo/Hotelería.', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20364062916');

-- 11. APU SAMAY E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa','APU SAMAY E.I.R.L.','Apu Samay Hospedaje','20608500678','Jr. La Unión S/N, Las Palmas, La Banda de Shilcayo, San Martín','970982099','apusamay.hospedaje@gmail.com','activo','Hospedaje turístico en selva peruana. Proyecto: soluciones digitales turismo. Sector: Turismo.', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20608500678');

-- 12. GRUPO IDRATO S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa','GRUPO IDRATO S.A.C.','Idrato Agua Activada','20602224491','Calle Las Palmeras Mz.S Lt.14, Villa Rica, Chaclacayo, Lima','922427959','pedidos@idrato.pe','activo','Empresa de agua activada con oxígeno. Proyecto: ERP gestión financiera. Sector: Alimentos/Bebidas.', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20602224491');

-- 13. PUSKI S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa','PUSKI S.A.C.','Puski Arequipa','20602052606','Av. Arancota 153, Sachaca, Arequipa','949294091','info@puski.pe','activo','Textiles artesanales eco-amigables. Proyecto: almacén + e-commerce. Sector: Textil/Artesanía.', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20602052606');

-- 14. ESCUELA DE ADUANAS PERU S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa','ESCUELA DE ADUANAS PERU S.A.C.','Escuela de Aduanas ENA','20601735912','Calle Fulgencio Valdez 660, Lima','923528878','aduanas@erca.edu.pe','activo','Institución de capacitación en aduanas y comercio exterior. Proyecto: plataforma educativa. Sector: Educación.', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601735912');

-- 15. INDIGO COMUNICACIONES SRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa','INDIGO COMUNICACIONES SRL','Indigo / Escuela BEC','20600921402','Av. Alameda del Corregidor 463, La Molina, Lima','960903286','hola@indigocomunicaciones.com','activo','Agencia de branding y comunicación. Proyecto: plataforma educativa Escuela BEC + marketing digital. Sector: Comunicación/Educación.', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20600921402');

-- 16. AJAD E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa','AJAD E.I.R.L.','AJAD Consultoría','20601560845','Calle Germán Schreiber 276, Urb. Santa Ana, San Isidro, Lima','922472132','comercial@ajad.pe','activo','Consultoría en Sistemas de Gestión ISO. Proyecto: e-learning B2B para Mypes. Sector: Consultoría/Educación.', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601560845');

-- 17. JOBULANI MEDIA MARKETING
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa','JOBULANI MEDIA MARKETING E.I.R.L.','Jobulani','20600706480','Mza. A Lote 30, Serur Filoque Chico, Olmos, Lambayeque','964578256','contacto@jobulani.com','activo','Agencia de publicidad digital. Proyecto: ERP para escalamiento por franquicias. Sector: Marketing/Publicidad.', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20600706480');

-- 18. AGROINDUSTRIAS CAMPOS DEL VALLE
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa','AGROINDUSTRIAS CAMPOS DEL VALLE S.R.L.','Campos del Valle','20603653328','Comunidad Nativa Otari San Martín S/N, Pichari, Cusco','980857044','agroindustriascamposdelvalle@gmail.com','activo','Productores de cacao y chocolate artesanal tree-to-bar. Proyecto: e-commerce + marketing digital. Sector: Agroalimentario.', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20603653328');

-- 19. SALUD OFTALMOLOGICA DE LA SELVA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa','SALUD OFTALMOLOGICA DE LA SELVA S.A.C.','Clínica COS','20604022054','Pasaje Las Tunas 270, La Banda de Shilcayo, Tarapoto, San Martín','973833952','contacto@clinicacos.com','activo','Clínica oftalmológica. Proyecto: digitalización atención al paciente. Sector: Salud.', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20604022054');

-- 20. METROBIZ SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa','METROBIZ SAC','MetroBiz','20601388384','Cal. Las Gaviotas 122 Int. 204, Surquillo, Lima',NULL,'hello@lima.estate','activo','Empresa inmobiliaria. Proyecto: CRM + funnel de conversión optimizado. Sector: Inmobiliaria.', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601388384');

-- ============================================================
-- 3. CONTACTOS POR EMPRESA (mk_empresa_contacto)
-- ============================================================
-- Variables con IDs de empresas para los inserts
SET @e_thepetbrand   = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20608628313' LIMIT 1);
SET @e_commonperu    = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20125389369' LIMIT 1);
SET @e_mandova       = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20609025353' LIMIT 1);
SET @e_bluecoffee    = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605668501' LIMIT 1);
SET @e_nuevohorizonte= (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610029354' LIMIT 1);
SET @e_copapor       = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20602926100' LIMIT 1);
SET @e_altamontana   = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20611294051' LIMIT 1);
SET @e_elparque      = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20131685638' LIMIT 1);
SET @e_coopsermul    = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20608049984' LIMIT 1);
SET @e_condelemos    = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20364062916' LIMIT 1);
SET @e_apusamay      = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20608500678' LIMIT 1);
SET @e_idrato        = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20602224491' LIMIT 1);
SET @e_puski         = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20602052606' LIMIT 1);
SET @e_aduanas       = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601735912' LIMIT 1);
SET @e_indigo        = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20600921402' LIMIT 1);
SET @e_ajad          = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601560845' LIMIT 1);
SET @e_jobulani      = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20600706480' LIMIT 1);
SET @e_campos        = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20603653328' LIMIT 1);
SET @e_clinicacos    = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20604022054' LIMIT 1);
SET @e_metrobiz      = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601388384' LIMIT 1);

-- THE PET BRAND
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_thepetbrand,'Diego Ciro Jesus','Delzo Lazo','Representante Legal / CEO','contacto.thepetbrand@gmail.com','991084831','activo',1, NOW()
WHERE @e_thepetbrand IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_thepetbrand AND correo='contacto.thepetbrand@gmail.com');

INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_thepetbrand,'Valeria','Delzo','Gerente de Marketing','marketing@thepetbrand.pe','991084832','activo',0, NOW()
WHERE @e_thepetbrand IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_thepetbrand AND correo='marketing@thepetbrand.pe');

INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_thepetbrand,'Roberto','Castillo','Responsable Tecnología','tech@thepetbrand.pe','991084833','activo',0, NOW()
WHERE @e_thepetbrand IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_thepetbrand AND correo='tech@thepetbrand.pe');

-- COMMON PERU
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_commonperu,'Manuel Rubén','Dueñas Saona','Presidente','commonperu@commonperu.pe','908897908','activo',1, NOW()
WHERE @e_commonperu IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_commonperu AND correo='commonperu@commonperu.pe');

INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_commonperu,'Ana','Vargas Lino','Directora Ejecutiva','avargas@commonperu.pe','999576265','activo',0, NOW()
WHERE @e_commonperu IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_commonperu AND correo='avargas@commonperu.pe');

-- MANDOVA
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_mandova,'Roxeny Imar','Amari Córdova','Presidenta / Representante Legal','produccion@mandova.org',NULL,'activo',1, NOW()
WHERE @e_mandova IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_mandova AND correo='produccion@mandova.org');

INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_mandova,'Jorge','Huamán Quispe','Gerente Comercial','ventas@mandova.org','976543210','activo',0, NOW()
WHERE @e_mandova IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_mandova AND correo='ventas@mandova.org');

-- BLUE COFFEE
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_bluecoffee,'Jean Piert','Suárez Flores','Gerente General','bluecoffeedeubiriki@gmail.com','993803692','activo',1, NOW()
WHERE @e_bluecoffee IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_bluecoffee AND correo='bluecoffeedeubiriki@gmail.com');

INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_bluecoffee,'Lucía','Torres Quispe','Coordinadora de Calidad','calidad@bluecoffee.pe','993803693','activo',0, NOW()
WHERE @e_bluecoffee IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_bluecoffee AND correo='calidad@bluecoffee.pe');

-- NUEVO HORIZONTE
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_nuevohorizonte,'Gime Jaynor','Román Huamán','Gerente General','gerencia@nuevohorizontedelperu.com','937594263','activo',1, NOW()
WHERE @e_nuevohorizonte IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_nuevohorizonte AND correo='gerencia@nuevohorizontedelperu.com');

INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_nuevohorizonte,'Pedro','Cotrina Pérez','Gerente Comercialización','comercializacion@nuevohorizontedelperu.com','951607845','activo',0, NOW()
WHERE @e_nuevohorizonte IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_nuevohorizonte AND correo='comercializacion@nuevohorizontedelperu.com');

INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_nuevohorizonte,'Sandra','Chávez Ramos','Administradora','administracion@nuevohorizontedelperu.com','912345678','activo',0, NOW()
WHERE @e_nuevohorizonte IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_nuevohorizonte AND correo='administracion@nuevohorizontedelperu.com');

-- COPAPOR
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_copapor,'Eliseo','Vega Gonzales','Presidente','contacto@coopnororiente.com','041480222','activo',1, NOW()
WHERE @e_copapor IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_copapor AND correo='contacto@coopnororiente.com');

INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_copapor,'María Elena','Guevara Vásquez','Coordinadora Proyectos','proyectos@copapor.pe','941234567','activo',0, NOW()
WHERE @e_copapor IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_copapor AND correo='proyectos@copapor.pe');

-- CAFE ALTA MONTANA
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_altamontana,'Víctor Raúl','Velásquez Aldaz','Gerente General','gerencia@coopaltamontana.pe','949791984','activo',1, NOW()
WHERE @e_altamontana IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_altamontana AND correo='gerencia@coopaltamontana.pe');

INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_altamontana,'Pedro','Córdova Concha','Sub-Gerente / Co-fundador','subdirector@coopaltamontana.pe','949791985','activo',0, NOW()
WHERE @e_altamontana IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_altamontana AND correo='subdirector@coopaltamontana.pe');

-- LIBRERIA EL PARQUE
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_elparque,'Fernando Eduardo','Kcomt Che','Gerente General / Fundador','web@productoselparque.com','044258584','activo',1, NOW()
WHERE @e_elparque IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_elparque AND correo='web@productoselparque.com');

INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_elparque,'Patricia','Uceda Morales','Jefa de Sistemas','sistemas@productoselparque.com','969192023','activo',0, NOW()
WHERE @e_elparque IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_elparque AND correo='sistemas@productoselparque.com');

INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_elparque,'Carlos','Rodríguez Soto','Gerente Comercial','comercial@productoselparque.com','969192024','activo',0, NOW()
WHERE @e_elparque IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_elparque AND correo='comercial@productoselparque.com');

-- COOPSERMUL
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_coopsermul,'Rubén','Choque Estrada','Gerente General','contacto@grupoinversionescapital.com','947766083','activo',1, NOW()
WHERE @e_coopsermul IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_coopsermul AND correo='contacto@grupoinversionescapital.com');

INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_coopsermul,'Milagros','Quispe Puma','Jefa de Marketing','marketing@grupoinversionescapital.com','980718472','activo',0, NOW()
WHERE @e_coopsermul IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_coopsermul AND correo='marketing@grupoinversionescapital.com');

-- CONDE DE LEMOS
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_condelemos,'Lourdes Jova','Abarca Fernández','Gerente General / Propietaria','reservasaqp@condelemosinn.com','913937504','activo',1, NOW()
WHERE @e_condelemos IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_condelemos AND correo='reservasaqp@condelemosinn.com');

INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_condelemos,'Alfredo Augusto','Aparicio Busso','Director Operativo','operaciones@condelemosinn.com','054231337','activo',0, NOW()
WHERE @e_condelemos IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_condelemos AND correo='operaciones@condelemosinn.com');

-- APU SAMAY
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_apusamay,'Kiara Luana','Muhay Izquierdo','Gerente General','apusamay.hospedaje@gmail.com','970982099','activo',1, NOW()
WHERE @e_apusamay IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_apusamay AND correo='apusamay.hospedaje@gmail.com');

INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_apusamay,'José','Paredes Cárdenas','Jefe de Reservas','reservas@apusamay.com','982037900','activo',0, NOW()
WHERE @e_apusamay IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_apusamay AND correo='reservas@apusamay.com');

-- GRUPO IDRATO
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_idrato,'Rafael Rolando','Antezana de la Torre','Gerente General / Fundador','pedidos@idrato.pe','922427959','activo',1, NOW()
WHERE @e_idrato IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_idrato AND correo='pedidos@idrato.pe');

INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_idrato,'Sandra','Mejía Torres','Gerente Administración y Finanzas','finanzas@idrato.pe','922427960','activo',0, NOW()
WHERE @e_idrato IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_idrato AND correo='finanzas@idrato.pe');

-- PUSKI
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_puski,'Irma Verónica','Valdivia Paredes','Gerente General / Diseñadora','info@puski.pe','949294091','activo',1, NOW()
WHERE @e_puski IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_puski AND correo='info@puski.pe');

INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_puski,'Sergio','Paredes Chávez','Responsable Exportaciones','exportaciones@puski.pe','949294092','activo',0, NOW()
WHERE @e_puski IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_puski AND correo='exportaciones@puski.pe');

-- ESCUELA DE ADUANAS
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_aduanas,'Ashley','Céspedes Horna','Directora Académica','aduanas@erca.edu.pe','923528878','activo',1, NOW()
WHERE @e_aduanas IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_aduanas AND correo='aduanas@erca.edu.pe');

INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_aduanas,'Marco','Villanueva Ríos','Coordinador Comercial','comercial@erca.edu.pe','923528879','activo',0, NOW()
WHERE @e_aduanas IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_aduanas AND correo='comercial@erca.edu.pe');

INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_aduanas,'Giovanna','Torres Heredia','Jefa de Marketing','marketing@erca.edu.pe','923528880','activo',0, NOW()
WHERE @e_aduanas IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_aduanas AND correo='marketing@erca.edu.pe');

-- INDIGO COMUNICACIONES
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_indigo,'Romy Ruth','Stucchi Chirinos','Gerente General / Fundadora','hola@indigocomunicaciones.com','960903286','activo',1, NOW()
WHERE @e_indigo IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_indigo AND correo='hola@indigocomunicaciones.com');

INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_indigo,'Diego','Paredes Ugarte','Director Creativo','dcreativo@indigocomunicaciones.com','960903287','activo',0, NOW()
WHERE @e_indigo IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_indigo AND correo='dcreativo@indigocomunicaciones.com');

-- AJAD
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_ajad,'Gina Yhakeline','Domínguez Gaspar','Gerente General / Fundadora','comercial@ajad.pe','922472132','activo',1, NOW()
WHERE @e_ajad IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_ajad AND correo='comercial@ajad.pe');

INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_ajad,'Luis','Fernández Bocanegra','Consultor Senior ISO','lfernan@ajad.pe','922472133','activo',0, NOW()
WHERE @e_ajad IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_ajad AND correo='lfernan@ajad.pe');

-- JOBULANI
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_jobulani,'Liliana Nataly','Mío Roque','Gerente General / Fundadora','contacto@jobulani.com','964578256','activo',1, NOW()
WHERE @e_jobulani IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_jobulani AND correo='contacto@jobulani.com');

-- AGROINDUSTRIAS CAMPOS DEL VALLE
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_campos,'Dina','Torres Barboza','Gerente General / Fundadora','agroindustriascamposdelvalle@gmail.com','980857044','activo',1, NOW()
WHERE @e_campos IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_campos AND correo='agroindustriascamposdelvalle@gmail.com');

INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_campos,'Raúl','Barboza Llanos','Jefe de Producción','produccion@camposdelvalle.pe','980857045','activo',0, NOW()
WHERE @e_campos IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_campos AND correo='produccion@camposdelvalle.pe');

-- SALUD OFTALMOLOGICA
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_clinicacos,'Pamela Flor','Pinedo Rodríguez','Directora Médica / Gerente','contacto@clinicacos.com','973833952','activo',1, NOW()
WHERE @e_clinicacos IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_clinicacos AND correo='contacto@clinicacos.com');

INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_clinicacos,'Miguel','Saldaña Lozano','Administrador General','admin@clinicacos.com','973833953','activo',0, NOW()
WHERE @e_clinicacos IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_clinicacos AND correo='admin@clinicacos.com');

-- METROBIZ
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @e_metrobiz,'Juana Victoria','Vela Malheiro','Gerente General / Fundadora','hello@lima.estate',NULL,'activo',1, NOW()
WHERE @e_metrobiz IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@e_metrobiz AND correo='hello@lima.estate');

-- ============================================================
-- 4. LEADS EN EL PIPELINE CRM (mk_contacts)
-- Distribuidos por etapas del flujo comercial
-- source_id = PROINNOVATE 2024
-- ============================================================

SET @source_proinnovate = (SELECT id FROM mk_lead_sources WHERE name = 'PROINNOVATE 2024' LIMIT 1);

-- ── ESTADO: new (5 empresas) ──────────────────────────────────
INSERT INTO mk_contacts (type, full_name, email, phone, company, city, source_id, status, score, created_at, updated_at)
SELECT 'lead','Eliseo Vega Gonzales','contacto@coopnororiente.com','041480222','COPAPOR','Bagua',@source_proinnovate,'new',20, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_contacts WHERE email='contacto@coopnororiente.com');

INSERT INTO mk_contacts (type, full_name, email, phone, company, city, source_id, status, score, created_at, updated_at)
SELECT 'lead','Liliana Nataly Mío Roque','contacto@jobulani.com','964578256','Jobulani Media Marketing','Olmos',@source_proinnovate,'new',15, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_contacts WHERE email='contacto@jobulani.com');

INSERT INTO mk_contacts (type, full_name, email, phone, company, city, source_id, status, score, created_at, updated_at)
SELECT 'lead','Pamela Flor Pinedo Rodríguez','contacto@clinicacos.com','973833952','Salud Oftalmológica de la Selva SAC','Tarapoto',@source_proinnovate,'new',25, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_contacts WHERE email='contacto@clinicacos.com');

INSERT INTO mk_contacts (type, full_name, email, phone, company, city, source_id, status, score, created_at, updated_at)
SELECT 'lead','Juana Victoria Vela Malheiro','hello@lima.estate',NULL,'MetroBiz SAC','Lima',@source_proinnovate,'new',20, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_contacts WHERE email='hello@lima.estate');

INSERT INTO mk_contacts (type, full_name, email, phone, company, city, source_id, status, score, created_at, updated_at)
SELECT 'lead','Dina Torres Barboza','agroindustriascamposdelvalle@gmail.com','980857044','Agroindustrias Campos del Valle','Pichari',@source_proinnovate,'new',30, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_contacts WHERE email='agroindustriascamposdelvalle@gmail.com');

-- ── ESTADO: contacted (4 empresas) ───────────────────────────
INSERT INTO mk_contacts (type, full_name, email, phone, company, city, source_id, status, score, created_at, updated_at)
SELECT 'lead','Jean Piert Suárez Flores','bluecoffeedeubiriki@gmail.com','993803692','Blue Coffee de Ubiriki','Pichanaqui',@source_proinnovate,'contacted',35, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_contacts WHERE email='bluecoffeedeubiriki@gmail.com');

INSERT INTO mk_contacts (type, full_name, email, phone, company, city, source_id, status, score, created_at, updated_at)
SELECT 'lead','Rubén Choque Estrada','contacto@grupoinversionescapital.com','947766083','Coopsermul Capital','Cusco',@source_proinnovate,'contacted',40, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_contacts WHERE email='contacto@grupoinversionescapital.com');

INSERT INTO mk_contacts (type, full_name, email, phone, company, city, source_id, status, score, created_at, updated_at)
SELECT 'lead','Kiara Luana Muhay Izquierdo','apusamay.hospedaje@gmail.com','970982099','Apu Samay E.I.R.L.','Tarapoto',@source_proinnovate,'contacted',35, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_contacts WHERE email='apusamay.hospedaje@gmail.com');

INSERT INTO mk_contacts (type, full_name, email, phone, company, city, source_id, status, score, created_at, updated_at)
SELECT 'lead','Roxeny Imar Amari Córdova','produccion@mandova.org',NULL,'Asociación Mandova','Jaén',@source_proinnovate,'contacted',30, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_contacts WHERE email='produccion@mandova.org');

-- ── ESTADO: qualified (3 empresas) ───────────────────────────
INSERT INTO mk_contacts (type, full_name, email, phone, company, city, source_id, status, score, created_at, updated_at)
SELECT 'lead','Manuel Rubén Dueñas Saona','commonperu@commonperu.pe','908897908','COMMON PERU','Lima',@source_proinnovate,'qualified',60, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_contacts WHERE email='commonperu@commonperu.pe');

INSERT INTO mk_contacts (type, full_name, email, phone, company, city, source_id, status, score, created_at, updated_at)
SELECT 'lead','Fernando Eduardo Kcomt Che','web@productoselparque.com','044258584','Librería e Imprenta El Parque','Trujillo',@source_proinnovate,'qualified',65, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_contacts WHERE email='web@productoselparque.com');

INSERT INTO mk_contacts (type, full_name, email, phone, company, city, source_id, status, score, created_at, updated_at)
SELECT 'lead','Romy Ruth Stucchi Chirinos','hola@indigocomunicaciones.com','960903286','Indigo Comunicaciones SRL','Lima',@source_proinnovate,'qualified',70, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_contacts WHERE email='hola@indigocomunicaciones.com');

-- ── ESTADO: nurturing (2 empresas) ───────────────────────────
INSERT INTO mk_contacts (type, full_name, email, phone, company, city, source_id, status, score, created_at, updated_at)
SELECT 'lead','Gime Jaynor Román Huamán','gerencia@nuevohorizontedelperu.com','937594263','Nuevo Horizonte del Perú','Chirinos',@source_proinnovate,'nurturing',55, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_contacts WHERE email='gerencia@nuevohorizontedelperu.com');

INSERT INTO mk_contacts (type, full_name, email, phone, company, city, source_id, status, score, created_at, updated_at)
SELECT 'lead','Gina Yhakeline Domínguez Gaspar','comercial@ajad.pe','922472132','AJAD E.I.R.L.','San Isidro',@source_proinnovate,'nurturing',50, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_contacts WHERE email='comercial@ajad.pe');

-- ── ESTADO: proposal_sent (3 empresas) ───────────────────────
INSERT INTO mk_contacts (type, full_name, email, phone, company, city, source_id, status, score, created_at, updated_at)
SELECT 'lead','Víctor Raúl Velásquez Aldaz','gerencia@coopaltamontana.pe','949791984','Café de Alta Montaña','San Ignacio',@source_proinnovate,'proposal_sent',75, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_contacts WHERE email='gerencia@coopaltamontana.pe');

INSERT INTO mk_contacts (type, full_name, email, phone, company, city, source_id, status, score, created_at, updated_at)
SELECT 'lead','Lourdes Jova Abarca Fernández','reservasaqp@condelemosinn.com','913937504','Hotel Conde de Lemos','Arequipa',@source_proinnovate,'proposal_sent',80, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_contacts WHERE email='reservasaqp@condelemosinn.com');

INSERT INTO mk_contacts (type, full_name, email, phone, company, city, source_id, status, score, created_at, updated_at)
SELECT 'lead','Ashley Céspedes Horna','aduanas@erca.edu.pe','923528878','Escuela de Aduanas Perú','Lima',@source_proinnovate,'proposal_sent',85, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_contacts WHERE email='aduanas@erca.edu.pe');

-- ── ESTADO: won (2 empresas) ──────────────────────────────────
INSERT INTO mk_contacts (type, full_name, email, phone, company, city, source_id, status, score, created_at, updated_at)
SELECT 'lead','Diego Ciro Jesus Delzo Lazo','contacto.thepetbrand@gmail.com','991084831','The Pet Brand SAC','Lima',@source_proinnovate,'won',95, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_contacts WHERE email='contacto.thepetbrand@gmail.com');

INSERT INTO mk_contacts (type, full_name, email, phone, company, city, source_id, status, score, created_at, updated_at)
SELECT 'lead','Rafael Rolando Antezana de la Torre','pedidos@idrato.pe','922427959','Grupo Idrato SAC','Lima',@source_proinnovate,'won',90, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_contacts WHERE email='pedidos@idrato.pe');

-- ── ESTADO: lost (1 empresa) ──────────────────────────────────
INSERT INTO mk_contacts (type, full_name, email, phone, company, city, source_id, status, score, lost_reason, created_at, updated_at)
SELECT 'lead','Irma Verónica Valdivia Paredes','info@puski.pe','949294091','Puski SAC','Arequipa',@source_proinnovate,'lost',40,'Presupuesto insuficiente para el servicio cotizado. Reevaluar en 6 meses.',NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_contacts WHERE email='info@puski.pe');

-- ============================================================
-- 5. PERSONAS NATURALES (type='persona' en mk_empresa_cliente)
-- ============================================================

INSERT INTO mk_empresa_cliente (type, nombre_completo, documento_id, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'persona','Carlos Enrique Huanca Quispe','45123678','987654321','c.huanca@outlook.com','activo','Emprendedor independiente en sector tecnología. Interesado en certificaciones de gestión.', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE nombre_completo='Carlos Enrique Huanca Quispe' AND type='persona');

INSERT INTO mk_empresa_cliente (type, nombre_completo, documento_id, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'persona','Patricia Soledad Ríos Mendoza','41987654','976543210','prios.mendoza@gmail.com','activo','Consultora freelance en proyectos agrícolas. Contacto del programa de innovación regional.', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE nombre_completo='Patricia Soledad Ríos Mendoza' AND type='persona');

INSERT INTO mk_empresa_cliente (type, nombre_completo, documento_id, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'persona','Jorge Alberto Montoya Paredes','43765432','965432109','jmontoya.negocios@gmail.com','activo','Asesor comercial independiente. Interesado en programa de ventas y negociación.', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE nombre_completo='Jorge Alberto Montoya Paredes' AND type='persona');

INSERT INTO mk_empresa_cliente (type, nombre_completo, documento_id, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'persona','Lucía Fernanda Castillo Torres','47234567','954321098','lucia.castillo.t@hotmail.com','activo','Empresaria textil. Evalúa capacitación en transformación digital para su negocio familiar.', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE nombre_completo='Lucía Fernanda Castillo Torres' AND type='persona');

INSERT INTO mk_empresa_cliente (type, nombre_completo, documento_id, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'persona','Andrés Felipe Soto Vargas','48901234','943210987','asoto.vargas@gmail.com','activo','Profesional en logística. Referido por empresa Blue Coffee. Interés en diplomado gestión empresarial.', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE nombre_completo='Andrés Felipe Soto Vargas' AND type='persona');

-- También como contactos CRM independientes
SET @source_referido = (SELECT id FROM mk_lead_sources WHERE name = 'Referido' LIMIT 1);

INSERT INTO mk_contacts (type, full_name, email, phone, city, source_id, status, score, created_at, updated_at)
SELECT 'lead','Carlos Enrique Huanca Quispe','c.huanca@outlook.com','987654321','Lima',@source_referido,'new',20, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_contacts WHERE email='c.huanca@outlook.com');

INSERT INTO mk_contacts (type, full_name, email, phone, city, source_id, status, score, created_at, updated_at)
SELECT 'lead','Patricia Soledad Ríos Mendoza','prios.mendoza@gmail.com','976543210','Arequipa',@source_referido,'contacted',30, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_contacts WHERE email='prios.mendoza@gmail.com');

INSERT INTO mk_contacts (type, full_name, email, phone, city, source_id, status, score, created_at, updated_at)
SELECT 'lead','Jorge Alberto Montoya Paredes','jmontoya.negocios@gmail.com','965432109','Lima',@source_referido,'qualified',45, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_contacts WHERE email='jmontoya.negocios@gmail.com');

INSERT INTO mk_contacts (type, full_name, email, phone, city, source_id, status, score, created_at, updated_at)
SELECT 'lead','Lucía Fernanda Castillo Torres','lucia.castillo.t@hotmail.com','954321098','Cusco',@source_referido,'proposal_sent',60, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_contacts WHERE email='lucia.castillo.t@hotmail.com');

INSERT INTO mk_contacts (type, full_name, email, phone, city, source_id, status, score, created_at, updated_at)
SELECT 'lead','Andrés Felipe Soto Vargas','asoto.vargas@gmail.com','943210987','Lima',@source_referido,'nurturing',35, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_contacts WHERE email='asoto.vargas@gmail.com');

-- ============================================================
-- 6. DEALS / OPORTUNIDADES EN EL EMBUDO DE VENTAS
-- Para contactos en etapas: qualified, proposal_sent, won, lost
-- ============================================================

SET @stage_calificacion = (SELECT id FROM mk_funnel_stages WHERE name = 'Calificación' LIMIT 1);
SET @stage_propuesta     = (SELECT id FROM mk_funnel_stages WHERE name = 'Propuesta Enviada' LIMIT 1);
SET @stage_negociacion   = (SELECT id FROM mk_funnel_stages WHERE name = 'Negociación' LIMIT 1);
SET @stage_ganado        = (SELECT id FROM mk_funnel_stages WHERE name = 'Cerrado Ganado' LIMIT 1);
SET @stage_perdido       = (SELECT id FROM mk_funnel_stages WHERE name = 'Cerrado Perdido' LIMIT 1);

-- Obtener IDs de contactos
SET @c_commonperu   = (SELECT id FROM mk_contacts WHERE email='commonperu@commonperu.pe' LIMIT 1);
SET @c_elparque     = (SELECT id FROM mk_contacts WHERE email='web@productoselparque.com' LIMIT 1);
SET @c_indigo       = (SELECT id FROM mk_contacts WHERE email='hola@indigocomunicaciones.com' LIMIT 1);
SET @c_altamontana  = (SELECT id FROM mk_contacts WHERE email='gerencia@coopaltamontana.pe' LIMIT 1);
SET @c_condelemos   = (SELECT id FROM mk_contacts WHERE email='reservasaqp@condelemosinn.com' LIMIT 1);
SET @c_aduanas      = (SELECT id FROM mk_contacts WHERE email='aduanas@erca.edu.pe' LIMIT 1);
SET @c_thepetbrand  = (SELECT id FROM mk_contacts WHERE email='contacto.thepetbrand@gmail.com' LIMIT 1);
SET @c_idrato       = (SELECT id FROM mk_contacts WHERE email='pedidos@idrato.pe' LIMIT 1);
SET @c_puski        = (SELECT id FROM mk_contacts WHERE email='info@puski.pe' LIMIT 1);
SET @c_lucia        = (SELECT id FROM mk_contacts WHERE email='lucia.castillo.t@hotmail.com' LIMIT 1);

-- Deals en CALIFICACIÓN
INSERT INTO mk_deals (contact_id, stage_id, title, amount, currency, probability, status, created_by, created_at, updated_at)
SELECT @c_commonperu, @stage_calificacion,'Programa Digitalización COMMON PERU',18500.00,'PEN',30,'open',1, NOW(), NOW()
WHERE @c_commonperu IS NOT NULL AND @stage_calificacion IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM mk_deals WHERE contact_id=@c_commonperu AND title='Programa Digitalización COMMON PERU');

INSERT INTO mk_deals (contact_id, stage_id, title, amount, currency, probability, status, created_by, created_at, updated_at)
SELECT @c_elparque, @stage_calificacion,'ERP + Consultoría Librería El Parque',22000.00,'PEN',35,'open',1, NOW(), NOW()
WHERE @c_elparque IS NOT NULL AND @stage_calificacion IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM mk_deals WHERE contact_id=@c_elparque AND title='ERP + Consultoría Librería El Parque');

INSERT INTO mk_deals (contact_id, stage_id, title, amount, currency, probability, status, created_by, created_at, updated_at)
SELECT @c_indigo, @stage_calificacion,'Plataforma Educativa + Marketing Digital Indigo',28000.00,'PEN',40,'open',1, NOW(), NOW()
WHERE @c_indigo IS NOT NULL AND @stage_calificacion IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM mk_deals WHERE contact_id=@c_indigo AND title='Plataforma Educativa + Marketing Digital Indigo');

-- Deals en PROPUESTA ENVIADA
INSERT INTO mk_deals (contact_id, stage_id, title, amount, currency, probability, status, created_by, created_at, updated_at)
SELECT @c_altamontana, @stage_propuesta,'Sistema de Calidad + Branding Café Alta Montaña',35000.00,'PEN',60,'open',1, NOW(), NOW()
WHERE @c_altamontana IS NOT NULL AND @stage_propuesta IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM mk_deals WHERE contact_id=@c_altamontana AND title='Sistema de Calidad + Branding Café Alta Montaña');

INSERT INTO mk_deals (contact_id, stage_id, title, amount, currency, probability, status, created_by, created_at, updated_at)
SELECT @c_condelemos, @stage_propuesta,'CRM + Sistema Logístico Hotel Conde de Lemos',45000.00,'PEN',65,'open',1, NOW(), NOW()
WHERE @c_condelemos IS NOT NULL AND @stage_propuesta IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM mk_deals WHERE contact_id=@c_condelemos AND title='CRM + Sistema Logístico Hotel Conde de Lemos');

INSERT INTO mk_deals (contact_id, stage_id, title, amount, currency, probability, status, created_by, created_at, updated_at)
SELECT @c_aduanas, @stage_negociacion,'Plataforma E-Learning Escuela de Aduanas',52000.00,'PEN',75,'open',1, NOW(), NOW()
WHERE @c_aduanas IS NOT NULL AND @stage_negociacion IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM mk_deals WHERE contact_id=@c_aduanas AND title='Plataforma E-Learning Escuela de Aduanas');

INSERT INTO mk_deals (contact_id, stage_id, title, amount, currency, probability, status, created_by, created_at, updated_at)
SELECT @c_lucia, @stage_propuesta,'Diplomado Gestión Empresarial - Lucía Castillo',3800.00,'PEN',55,'open',1, NOW(), NOW()
WHERE @c_lucia IS NOT NULL AND @stage_propuesta IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM mk_deals WHERE contact_id=@c_lucia AND title='Diplomado Gestión Empresarial - Lucía Castillo');

-- Deals CERRADO GANADO
INSERT INTO mk_deals (contact_id, stage_id, title, amount, currency, probability, status, expected_close_date, created_by, created_at, updated_at)
SELECT @c_thepetbrand, @stage_ganado,'Transformación Digital Marketing The Pet Brand',38500.00,'PEN',100,'won','2024-11-30',1, NOW(), NOW()
WHERE @c_thepetbrand IS NOT NULL AND @stage_ganado IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM mk_deals WHERE contact_id=@c_thepetbrand AND title='Transformación Digital Marketing The Pet Brand');

INSERT INTO mk_deals (contact_id, stage_id, title, amount, currency, probability, status, expected_close_date, created_by, created_at, updated_at)
SELECT @c_idrato, @stage_ganado,'ERP Gestión Financiera Grupo Idrato',42000.00,'PEN',100,'won','2024-12-15',1, NOW(), NOW()
WHERE @c_idrato IS NOT NULL AND @stage_ganado IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM mk_deals WHERE contact_id=@c_idrato AND title='ERP Gestión Financiera Grupo Idrato');

-- Deal CERRADO PERDIDO
INSERT INTO mk_deals (contact_id, stage_id, title, amount, currency, probability, status, lost_reason, created_by, created_at, updated_at)
SELECT @c_puski, @stage_perdido,'E-Commerce + Almacén Puski SAC',24000.00,'PEN',0,'lost','Presupuesto insuficiente. Cliente no cuenta con financiamiento disponible en este ciclo.',1, NOW(), NOW()
WHERE @c_puski IS NOT NULL AND @stage_perdido IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM mk_deals WHERE contact_id=@c_puski AND title='E-Commerce + Almacén Puski SAC');

-- ============================================================
-- 7. COTIZACIONES
-- ============================================================

-- COT ganada: The Pet Brand
INSERT INTO cotizaciones (numero, contact_id, empresa_id, titulo, observaciones, moneda, subtotal, descuento_pct, descuento_monto, impuesto_pct, impuesto_monto, total, estado, fecha_vigencia, created_by, created_at, updated_at)
SELECT
  CONCAT('COT-2024-', LPAD((SELECT COUNT(*)+1 FROM cotizaciones), 4, '0')),
  (SELECT id FROM mk_contacts WHERE email='contacto.thepetbrand@gmail.com' LIMIT 1),
  (SELECT id FROM mk_empresa_cliente WHERE ruc='20608628313' LIMIT 1),
  'Transformación Digital: Marketing, Diseño y Fidelización de Clientes',
  'Incluye implementación de CRM, automatización de marketing y rediseño de identidad digital.',
  'PEN', 32627.12, 0.00, 0.00, 18.00, 5872.88, 38500.00, 'ACEPTADA',
  '2025-01-31', 1, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM cotizaciones WHERE empresa_id=(SELECT id FROM mk_empresa_cliente WHERE ruc='20608628313' LIMIT 1) AND estado='ACEPTADA');

-- Detalles cotización The Pet Brand
INSERT INTO cotizacion_detalle (cotizacion_id, descripcion, cantidad, precio_unitario, descuento_pct, subtotal, orden)
SELECT c.id, 'Consultoría en Estrategia de Marketing Digital', 1, 8500.00, 0, 8500.00, 1
FROM cotizaciones c
WHERE c.empresa_id=(SELECT id FROM mk_empresa_cliente WHERE ruc='20608628313' LIMIT 1) AND c.estado='ACEPTADA'
  AND NOT EXISTS (SELECT 1 FROM cotizacion_detalle cd WHERE cd.cotizacion_id=c.id AND cd.descripcion='Consultoría en Estrategia de Marketing Digital');

INSERT INTO cotizacion_detalle (cotizacion_id, descripcion, cantidad, precio_unitario, descuento_pct, subtotal, orden)
SELECT c.id, 'Implementación CRM + Automatización', 1, 12000.00, 0, 12000.00, 2
FROM cotizaciones c
WHERE c.empresa_id=(SELECT id FROM mk_empresa_cliente WHERE ruc='20608628313' LIMIT 1) AND c.estado='ACEPTADA'
  AND NOT EXISTS (SELECT 1 FROM cotizacion_detalle cd WHERE cd.cotizacion_id=c.id AND cd.descripcion='Implementación CRM + Automatización');

INSERT INTO cotizacion_detalle (cotizacion_id, descripcion, cantidad, precio_unitario, descuento_pct, subtotal, orden)
SELECT c.id, 'Rediseño Identidad Visual y Web', 1, 7200.00, 0, 7200.00, 3
FROM cotizaciones c
WHERE c.empresa_id=(SELECT id FROM mk_empresa_cliente WHERE ruc='20608628313' LIMIT 1) AND c.estado='ACEPTADA'
  AND NOT EXISTS (SELECT 1 FROM cotizacion_detalle cd WHERE cd.cotizacion_id=c.id AND cd.descripcion='Rediseño Identidad Visual y Web');

INSERT INTO cotizacion_detalle (cotizacion_id, descripcion, cantidad, precio_unitario, descuento_pct, subtotal, orden)
SELECT c.id, 'Capacitación Equipo (8 sesiones)', 8, 615.89, 0, 4927.12, 4
FROM cotizaciones c
WHERE c.empresa_id=(SELECT id FROM mk_empresa_cliente WHERE ruc='20608628313' LIMIT 1) AND c.estado='ACEPTADA'
  AND NOT EXISTS (SELECT 1 FROM cotizacion_detalle cd WHERE cd.cotizacion_id=c.id AND cd.descripcion='Capacitación Equipo (8 sesiones)');

-- COT ganada: Grupo Idrato
INSERT INTO cotizaciones (numero, contact_id, empresa_id, titulo, observaciones, moneda, subtotal, descuento_pct, descuento_monto, impuesto_pct, impuesto_monto, total, estado, fecha_vigencia, created_by, created_at, updated_at)
SELECT
  CONCAT('COT-2024-', LPAD((SELECT COUNT(*)+2 FROM cotizaciones), 4, '0')),
  (SELECT id FROM mk_contacts WHERE email='pedidos@idrato.pe' LIMIT 1),
  (SELECT id FROM mk_empresa_cliente WHERE ruc='20602224491' LIMIT 1),
  'ERP Integral para Gestión Financiera y Operativa',
  'Sistema ERP con módulos de contabilidad, inventario, producción y ventas.',
  'PEN', 35593.22, 0.00, 0.00, 18.00, 6406.78, 42000.00, 'ACEPTADA',
  '2025-01-15', 1, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM cotizaciones WHERE empresa_id=(SELECT id FROM mk_empresa_cliente WHERE ruc='20602224491' LIMIT 1) AND estado='ACEPTADA');

INSERT INTO cotizacion_detalle (cotizacion_id, descripcion, cantidad, precio_unitario, descuento_pct, subtotal, orden)
SELECT c.id, 'Licencia ERP Anual (módulos base)', 1, 18000.00, 0, 18000.00, 1
FROM cotizaciones c WHERE c.empresa_id=(SELECT id FROM mk_empresa_cliente WHERE ruc='20602224491' LIMIT 1) AND c.estado='ACEPTADA'
AND NOT EXISTS (SELECT 1 FROM cotizacion_detalle cd WHERE cd.cotizacion_id=c.id AND cd.descripcion='Licencia ERP Anual (módulos base)');

INSERT INTO cotizacion_detalle (cotizacion_id, descripcion, cantidad, precio_unitario, descuento_pct, subtotal, orden)
SELECT c.id, 'Implementación y Migración de Datos', 1, 10000.00, 0, 10000.00, 2
FROM cotizaciones c WHERE c.empresa_id=(SELECT id FROM mk_empresa_cliente WHERE ruc='20602224491' LIMIT 1) AND c.estado='ACEPTADA'
AND NOT EXISTS (SELECT 1 FROM cotizacion_detalle cd WHERE cd.cotizacion_id=c.id AND cd.descripcion='Implementación y Migración de Datos');

INSERT INTO cotizacion_detalle (cotizacion_id, descripcion, cantidad, precio_unitario, descuento_pct, subtotal, orden)
SELECT c.id, 'Capacitación y Soporte 3 meses', 1, 7593.22, 0, 7593.22, 3
FROM cotizaciones c WHERE c.empresa_id=(SELECT id FROM mk_empresa_cliente WHERE ruc='20602224491' LIMIT 1) AND c.estado='ACEPTADA'
AND NOT EXISTS (SELECT 1 FROM cotizacion_detalle cd WHERE cd.cotizacion_id=c.id AND cd.descripcion='Capacitación y Soporte 3 meses');

-- COT enviada: Escuela de Aduanas
INSERT INTO cotizaciones (numero, contact_id, empresa_id, titulo, observaciones, moneda, subtotal, descuento_pct, descuento_monto, impuesto_pct, impuesto_monto, total, estado, fecha_vigencia, created_by, created_at, updated_at)
SELECT
  CONCAT('COT-2024-', LPAD((SELECT COUNT(*)+3 FROM cotizaciones), 4, '0')),
  (SELECT id FROM mk_contacts WHERE email='aduanas@erca.edu.pe' LIMIT 1),
  (SELECT id FROM mk_empresa_cliente WHERE ruc='20601735912' LIMIT 1),
  'Plataforma de Gestión Educativa y Administrativa ENA',
  'Sistema integral de matrícula, notas, asistencia y pagos. Incluye app móvil para alumnos.',
  'PEN', 44067.80, 5.00, 2203.39, 18.00, 7534.59, 52000.00, 'ENVIADA',
  '2025-02-28', 1, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM cotizaciones WHERE empresa_id=(SELECT id FROM mk_empresa_cliente WHERE ruc='20601735912' LIMIT 1));

INSERT INTO cotizacion_detalle (cotizacion_id, descripcion, cantidad, precio_unitario, descuento_pct, subtotal, orden)
SELECT c.id, 'Desarrollo Plataforma LMS Personalizada', 1, 28000.00, 5, 26600.00, 1
FROM cotizaciones c WHERE c.empresa_id=(SELECT id FROM mk_empresa_cliente WHERE ruc='20601735912' LIMIT 1)
AND NOT EXISTS (SELECT 1 FROM cotizacion_detalle cd WHERE cd.cotizacion_id=c.id AND cd.descripcion='Desarrollo Plataforma LMS Personalizada');

INSERT INTO cotizacion_detalle (cotizacion_id, descripcion, cantidad, precio_unitario, descuento_pct, subtotal, orden)
SELECT c.id, 'Módulo de Pagos y Reportes Financieros', 1, 8000.00, 5, 7600.00, 2
FROM cotizaciones c WHERE c.empresa_id=(SELECT id FROM mk_empresa_cliente WHERE ruc='20601735912' LIMIT 1)
AND NOT EXISTS (SELECT 1 FROM cotizacion_detalle cd WHERE cd.cotizacion_id=c.id AND cd.descripcion='Módulo de Pagos y Reportes Financieros');

INSERT INTO cotizacion_detalle (cotizacion_id, descripcion, cantidad, precio_unitario, descuento_pct, subtotal, orden)
SELECT c.id, 'App Móvil (iOS + Android)', 1, 8000.00, 5, 7600.00, 3
FROM cotizaciones c WHERE c.empresa_id=(SELECT id FROM mk_empresa_cliente WHERE ruc='20601735912' LIMIT 1)
AND NOT EXISTS (SELECT 1 FROM cotizacion_detalle cd WHERE cd.cotizacion_id=c.id AND cd.descripcion='App Móvil (iOS + Android)');

INSERT INTO cotizacion_detalle (cotizacion_id, descripcion, cantidad, precio_unitario, descuento_pct, subtotal, orden)
SELECT c.id, 'Soporte Técnico Anual', 12, 217.31, 0, 2607.72, 4
FROM cotizaciones c WHERE c.empresa_id=(SELECT id FROM mk_empresa_cliente WHERE ruc='20601735912' LIMIT 1)
AND NOT EXISTS (SELECT 1 FROM cotizacion_detalle cd WHERE cd.cotizacion_id=c.id AND cd.descripcion='Soporte Técnico Anual');

-- COT enviada: Hotel Conde de Lemos
INSERT INTO cotizaciones (numero, contact_id, empresa_id, titulo, observaciones, moneda, subtotal, descuento_pct, descuento_monto, impuesto_pct, impuesto_monto, total, estado, fecha_vigencia, created_by, created_at, updated_at)
SELECT
  CONCAT('COT-2024-', LPAD((SELECT COUNT(*)+4 FROM cotizaciones), 4, '0')),
  (SELECT id FROM mk_contacts WHERE email='reservasaqp@condelemosinn.com' LIMIT 1),
  (SELECT id FROM mk_empresa_cliente WHERE ruc='20364062916' LIMIT 1),
  'CRM + Sistema Logístico Integral para Hotel Conde de Lemos',
  'Incluye CRM para gestión de clientes, sistema de inventario y módulo de reportes.',
  'PEN', 38135.59, 0.00, 0.00, 18.00, 6864.41, 45000.00, 'ENVIADA',
  '2025-02-15', 1, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM cotizaciones WHERE empresa_id=(SELECT id FROM mk_empresa_cliente WHERE ruc='20364062916' LIMIT 1));

INSERT INTO cotizacion_detalle (cotizacion_id, descripcion, cantidad, precio_unitario, descuento_pct, subtotal, orden)
SELECT c.id, 'CRM para Gestión de Clientes y Reservas', 1, 22000.00, 0, 22000.00, 1
FROM cotizaciones c WHERE c.empresa_id=(SELECT id FROM mk_empresa_cliente WHERE ruc='20364062916' LIMIT 1)
AND NOT EXISTS (SELECT 1 FROM cotizacion_detalle cd WHERE cd.cotizacion_id=c.id AND cd.descripcion='CRM para Gestión de Clientes y Reservas');

INSERT INTO cotizacion_detalle (cotizacion_id, descripcion, cantidad, precio_unitario, descuento_pct, subtotal, orden)
SELECT c.id, 'Sistema de Inventario y Logística', 1, 12000.00, 0, 12000.00, 2
FROM cotizaciones c WHERE c.empresa_id=(SELECT id FROM mk_empresa_cliente WHERE ruc='20364062916' LIMIT 1)
AND NOT EXISTS (SELECT 1 FROM cotizacion_detalle cd WHERE cd.cotizacion_id=c.id AND cd.descripcion='Sistema de Inventario y Logística');

INSERT INTO cotizacion_detalle (cotizacion_id, descripcion, cantidad, precio_unitario, descuento_pct, subtotal, orden)
SELECT c.id, 'Integración con canales de reservas online', 1, 4135.59, 0, 4135.59, 3
FROM cotizaciones c WHERE c.empresa_id=(SELECT id FROM mk_empresa_cliente WHERE ruc='20364062916' LIMIT 1)
AND NOT EXISTS (SELECT 1 FROM cotizacion_detalle cd WHERE cd.cotizacion_id=c.id AND cd.descripcion='Integración con canales de reservas online');

-- ============================================================
-- 8. RESUMEN DE VERIFICACIÓN
-- ============================================================
SELECT 'mk_empresa_cliente' AS tabla, COUNT(*) AS total FROM mk_empresa_cliente
UNION ALL SELECT 'mk_empresa_contacto', COUNT(*) FROM mk_empresa_contacto
UNION ALL SELECT 'mk_contacts (leads)', COUNT(*) FROM mk_contacts WHERE type='lead'
UNION ALL SELECT 'mk_lead_stages', COUNT(*) FROM mk_lead_stages
UNION ALL SELECT 'mk_funnel_stages', COUNT(*) FROM mk_funnel_stages
UNION ALL SELECT 'mk_lead_sources', COUNT(*) FROM mk_lead_sources
UNION ALL SELECT 'mk_sellers', COUNT(*) FROM mk_sellers
UNION ALL SELECT 'mk_deals', COUNT(*) FROM mk_deals
UNION ALL SELECT 'cotizaciones', COUNT(*) FROM cotizaciones
UNION ALL SELECT 'cotizacion_detalle', COUNT(*) FROM cotizacion_detalle;

SET FOREIGN_KEY_CHECKS = 1;
