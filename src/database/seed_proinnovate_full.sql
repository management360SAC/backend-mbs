SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ============================================================
-- SEED FULL PROINNOVATE 2024 — 347 empresas
-- Generated from: MALEJANDRA Formato Matriz de Contactos Servicios PROINNOVATE 2024.xlsm - DATA PROINNOVATE.csv
-- ============================================================

-- empresa 1: THE PET BRAND S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'THE PET BRAND S.A.C.', NULL, '20608628313', 'CAL.DIEGO FERRE NRO. 218 DPTO. 301 URB. REDUCTO LIMA - LIMA - MIRAFLORES', '991 084 831', 'contacto.thepetbrand@gmail.com', 'activo', 'ThePetBrand es una marca hecha por doglovers para doglovers. Buscamos brindarte los mejores producto | Contactado e Info enviada por WS', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20608628313');

SET @eid_20608628313 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20608628313' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20608628313, 'DIEGO CIRO JESUS', 'DELZO LAZO', 'Representante Legal', 'contacto.thepetbrand@gmail.com', '991 084 831', 'activo', 1, NOW()
WHERE @eid_20608628313 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20608628313 AND correo='contacto.thepetbrand@gmail.com');

-- empresa 2: ASOCIACION VINA DE LOS ALPES
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ASOCIACION VINA DE LOS ALPES', NULL, '20605016236', 'NRO. S/N CAS. VIÑA LOS ALPES SAN MARTIN - MOYOBAMBA - MOYOBAMBA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605016236');

SET @eid_20605016236 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605016236' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605016236, 'LEONARDO SANTOS', 'LOPEZ', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20605016236 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605016236 AND nombres='LEONARDO SANTOS');

-- empresa 3: ASOCIACION DE PRODUCTORES AGROPERU MANDOVA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ASOCIACION DE PRODUCTORES AGROPERU MANDOVA', NULL, '20609025353', 'MZA. C LOTE. 3 URB. LAS CUCARDAS CAJAMARCA - JAEN - JAEN', NULL, 'produccion@mandova.org', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20609025353');

SET @eid_20609025353 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20609025353' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20609025353, 'ROXENY IMAR', 'AMARI CORDOVA', 'Representante Legal', 'produccion@mandova.org', NULL, 'activo', 1, NOW()
WHERE @eid_20609025353 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20609025353 AND correo='produccion@mandova.org');

-- empresa 4: COMMON PERU ASOCIACION DE USUARIOS DE TECNOLOGIAS DE INFORMACION IBM Y COMPATIBLES
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'COMMON PERU ASOCIACION DE USUARIOS DE TECNOLOGIAS DE INFORMACION IBM Y COMPATIBLES', NULL, '20125389369', 'JR. CHICLAYO NRO. 452 INT. H (PARALELA CUADRA 4 DE AV. ANGAMOS) LIMA - LIMA - MIRAFLORES', '908897908', 'commonperu@commonperu.pe', 'activo', 'COMMON PERÚ es la asociación de Usuarios de Tecnologías de Información más importante del Perú y de L | Contactado e Info enviada por WS', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20125389369');

SET @eid_20125389369 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20125389369' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20125389369, 'MANUEL RUBEN', 'DUEÑAS SAONA', 'Representante Legal', 'commonperu@commonperu.pe', '908897908', 'activo', 1, NOW()
WHERE @eid_20125389369 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20125389369 AND correo='commonperu@commonperu.pe');

-- empresa 5: ASOCIACION DE PRODUCTORES AGROPECUARIOS PERFILES COFFEE PERU
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ASOCIACION DE PRODUCTORES AGROPECUARIOS PERFILES COFFEE PERU', NULL, '20609025353', 'MZA. C LOTE. 3 URB. LAS CUCARDAS CAJAMARCA - JAEN -', '943178325', 'gerencia@perfilescoffee.com', 'activo', '¡Productores de calidad! | Contactado e Info enviada por WS', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20609025353');

SET @eid_20609025353 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20609025353' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20609025353, 'ROXENY IMAR', 'AMARI CORDOVA', 'Representante Legal', 'gerencia@perfilescoffee.com', '943178325', 'activo', 1, NOW()
WHERE @eid_20609025353 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20609025353 AND correo='gerencia@perfilescoffee.com');

-- empresa 6: ASOCIACION DE PRODUCTORES BLUE COFFEE DE UBIRIKI
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ASOCIACION DE PRODUCTORES BLUE COFFEE DE UBIRIKI', NULL, '20605668501', 'JR. 7 DE JUNIO NRO. 525 URB. PICHANAQUI (FRENTE DE LA LOZA KENJI) JUNIN - CHANCHAMAYO - PICHANAQUI', '993 803 692', 'bluecoffeedeubiriki@gmail.com', 'activo', 'Somos una ASOCIACIÓN que trabajamos bajo el principio del bienestar social y empresarial de nuestro | Contactado e Info enviada por WS', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605668501');

SET @eid_20605668501 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605668501' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605668501, 'JEAN PIERT', 'SUAREZ FLORES', 'Representante Legal', 'bluecoffeedeubiriki@gmail.com', '993 803 692', 'activo', 1, NOW()
WHERE @eid_20605668501 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605668501 AND correo='bluecoffeedeubiriki@gmail.com');

-- empresa 7: ASOCIACIÓN DE PRODUCTORES AGROPECUARIOS VALLE VERDE CALLAYUC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ASOCIACIÓN DE PRODUCTORES AGROPECUARIOS VALLE VERDE CALLAYUC', NULL, '20606356359', 'CAL.SAENZ PEÑA NRO. 104 CAJAMARCA - CUTERVO - CALLAYUC', '980 846 324', 'valleverdecallayuc@gmail.com', 'activo', 'Agricultura sostenible | Contactado e Info por WS', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606356359');

SET @eid_20606356359 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606356359' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606356359, 'SANCHEZ WUILMER', 'CORONEL', 'Representante Legal', 'valleverdecallayuc@gmail.com', '980 846 324', 'activo', 1, NOW()
WHERE @eid_20606356359 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606356359 AND correo='valleverdecallayuc@gmail.com');

-- empresa 8: ASOCIACION AGROPECUARIA SOLANDINO
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ASOCIACION AGROPECUARIA SOLANDINO', NULL, '20603262671', 'CAL.LOS JARDINES NRO. 499 URB. LOS ALCANFORES CAJAMARCA - JAEN', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20603262671');

SET @eid_20603262671 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20603262671' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20603262671, 'FLOR LIZETH', 'CUBAS RIMARACHIN', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20603262671 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20603262671 AND nombres='FLOR LIZETH');

-- empresa 9: ASOCIACION DE PRODUCTORES AGROPECUARIOS MUJERES EMPRENDEDORAS DE TABLONCILLO LA COIPA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ASOCIACION DE PRODUCTORES AGROPECUARIOS MUJERES EMPRENDEDORAS DE TABLONCILLO LA COIPA', NULL, '20610052054', 'CAL.MARISCAL CATILLA NRO. 1609 OTR. MARISCAL CATILLA CAJAMARCA - JAEN - JAEN', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610052054');

SET @eid_20610052054 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610052054' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610052054, 'DIANITA KARINA', 'HUAMAN JIMENEZ', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20610052054 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610052054 AND nombres='DIANITA KARINA');

-- empresa 10: ASOCIACION DE PRODUCTORES AGROPECUARIOS VALLE EL MIRAFLORES
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ASOCIACION DE PRODUCTORES AGROPECUARIOS VALLE EL MIRAFLORES', NULL, '20606043466', 'CAL.ALFONSO ARANA VIDAL NRO. SN SEC. EL HUITO (LA COLINA - A 1 CDR TERMINAL NAMBIJA) CAJAMARCA - JAEN - JAEN', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606043466');

SET @eid_20606043466 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606043466' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606043466, 'ARY YHOEL', 'AGREDA FLORES', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20606043466 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606043466 AND nombres='ARY YHOEL');

-- empresa 11: ASOCIACIÓN DE PRODUCTORES AGROPECUARIOS SOLIDARIOS NUEVO HORIZONTE DEL PERÚ
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ASOCIACIÓN DE PRODUCTORES AGROPECUARIOS SOLIDARIOS NUEVO HORIZONTE DEL PERÚ', NULL, '20610029354', 'CAL.JOSE OLAYA NRO. S/N (ENTRADA DE CHIRINOS) CAJAMARCA - SAN IGNACIO - CHIRINOS', '937', 'gerencia@nuevohorizontedelperu.com', 'activo', 'Somos una organización responsable y comprometida que busca el bien común.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610029354');

SET @eid_20610029354 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610029354' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610029354, 'GIME JAYNOR', 'ROMAN HUAMAN', 'Representante Legal', 'gerencia@nuevohorizontedelperu.com', '937', 'activo', 1, NOW()
WHERE @eid_20610029354 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610029354 AND correo='gerencia@nuevohorizontedelperu.com');

-- empresa 12: ASOCIACION AGROPECUARIA Y TURISTICA COPAPOR
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ASOCIACION AGROPECUARIA Y TURISTICA COPAPOR', NULL, '20602926100', 'AV. PRINCIPAL NRO. S/N C.P. EL PORVENIR DE ARAMANGO (ENTRADA PRINCIPAL AL C.P EL PORVENIR DE) AMAZONAS - BAGUA - ARAMANGO', '(041) 480222', 'contacto@coopnororiente.com', 'activo', 'Somos (COPAPOR) un emprendimiento asociativo de familias productoras de Café y Piña del hermoso Porvenir, Aramango, Bagua, Amazonas | Contactado e Info enviado por WS', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20602926100');

SET @eid_20602926100 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20602926100' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20602926100, 'GONZALES ELISEO', 'VEGA', 'Representante Legal', 'contacto@coopnororiente.com', '(041) 480222', 'activo', 1, NOW()
WHERE @eid_20602926100 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20602926100 AND correo='contacto@coopnororiente.com');

-- empresa 13: ASOCIACION DE PRODUCTORES DE CAFE PAKAMUROS
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ASOCIACION DE PRODUCTORES DE CAFE PAKAMUROS', NULL, '20603063679', 'PJ. JOSE OLAYA NRO. 151 SEC. PUEBLO LIBRE CAJAMARCA - JAEN - JAEN', '(+51) 3212140', 'info@veritrade-ltd.com', 'activo', 'Plataforma web de inteligencia de negocios con información actualizada de importaciones y exportaciones.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20603063679');

SET @eid_20603063679 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20603063679' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20603063679, 'SILVA DAMIAN', 'PEREZ', 'Representante Legal', 'info@veritrade-ltd.com', '(+51) 3212140', 'activo', 1, NOW()
WHERE @eid_20603063679 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20603063679 AND correo='info@veritrade-ltd.com');

-- empresa 14: ASOCIACION DE PRODUCTORES AGROPECUARIOS CAFE DE ALTA MONTAÑA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ASOCIACION DE PRODUCTORES AGROPECUARIOS CAFE DE ALTA MONTAÑA', NULL, '20611294051', 'CAR.SAN IGNACIO - NAMBALLE MZA. C LOTE. 02 SEC. ALTO LOYOLA - SAN JUAN CAJAMARCA - SAN IGNACIO - SAN IGNACIO', '949 791 984', 'gerencia@coopaltamontana.pe', 'activo', 'Nuestra sofisticada planta de beneficio en húmedo de capacidad de 5 MIL KG DE CAFÉ PERGAMINO SECO, única en nuestra región.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20611294051');

SET @eid_20611294051 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20611294051' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20611294051, 'VICTOR RAUL', 'VELASQUEZ ALDAZ', 'Representante Legal', 'gerencia@coopaltamontana.pe', '949 791 984', 'activo', 1, NOW()
WHERE @eid_20611294051 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20611294051 AND correo='gerencia@coopaltamontana.pe');

-- empresa 15: ASOCIACION DE JOVENES EMPRENDEDORES DEL TURISMO SANTA FE
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ASOCIACION DE JOVENES EMPRENDEDORES DEL TURISMO SANTA FE', NULL, '20602798250', 'AV. LA COLINA NRO. 177 URB. FLOR DE CAFE CAJAMARCA - JAEN - JAENAV. LA COLINA NRO. 177 URB. FLOR DE CAFE CAJAMARCA - JAEN - JAEN', '979995599', NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20602798250');

SET @eid_20602798250 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20602798250' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20602798250, 'WILSER NILTON', 'ESTELA LLANOS', 'Representante Legal', NULL, '979995599', 'activo', 1, NOW()
WHERE @eid_20602798250 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20602798250 AND nombres='WILSER NILTON');

-- empresa 16: LIBRERIA E IMPRENTA EL PARQUE SRLTDA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'LIBRERIA E IMPRENTA EL PARQUE SRLTDA', NULL, '20131685638', 'AV. PABLO CASAIS NRO. LL INT. 44 URB. LOS CEDROS LA LIBERTAD - TRUJILLO - TRUJILLO', '969 192 023', 'web@productoselparque.com', 'activo', 'Somos una marca de productos escolares visionaria e innovadora con más de 33 años en el mercado, t', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20131685638');

SET @eid_20131685638 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20131685638' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20131685638, 'FERNANDO EDUARDO', 'KCOMT CHE', 'Representante Legal', 'web@productoselparque.com', '969 192 023', 'activo', 1, NOW()
WHERE @eid_20131685638 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20131685638 AND correo='web@productoselparque.com');

-- empresa 17: COOPERATIVA DE SERVICIOS MULTIPLES GRUPO DE INVERSIONES CAPITAL COOPSERMUL CAPITAL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'COOPERATIVA DE SERVICIOS MULTIPLES GRUPO DE INVERSIONES CAPITAL COOPSERMUL CAPITAL', NULL, '20608049984', 'OTR.MACHUPICCHU MZA. M LOTE. 6 DPTO. 3 URB. MANUEL PRADO CUSCO - CUSCO - CUSCO', '947766083', 'contacto@grupoinversionescapital.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20608049984');

SET @eid_20608049984 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20608049984' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20608049984, 'ESTRADA RUBEN', 'CHOQUE', 'Representante Legal', 'contacto@grupoinversionescapital.com', '947766083', 'activo', 1, NOW()
WHERE @eid_20608049984 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20608049984 AND correo='contacto@grupoinversionescapital.com');

-- empresa 18: EMPRESA DE SERVICIOS TURISTICOS CONDE DE LEMOS E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'EMPRESA DE SERVICIOS TURISTICOS CONDE DE LEMOS E.I.R.L.', NULL, '20364062916', 'CAL.PUNO NRO. 681 PUNO PUNO - PUNO - PUNO', '913937504', 'reservasaqp@condelemosinn.com', 'activo', 'Explora el encanto de Arequipa en el Hotel Conde de Lemos, nosotros nos ocupamos de tu descanso', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20364062916');

SET @eid_20364062916 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20364062916' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20364062916, 'LOURDES JOVA', 'ABARCA FERNANDEZ', 'Representante Legal', 'reservasaqp@condelemosinn.com', '913937504', 'activo', 1, NOW()
WHERE @eid_20364062916 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20364062916 AND correo='reservasaqp@condelemosinn.com');

-- empresa 19: APU SAMAY E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'APU SAMAY E.I.R.L.', NULL, '20608500678', 'JR. LA UNION NRO. S/N- C.P. LAS PALMAS SAN MARTIN - SAN MARTIN - LA BANDA DE SHILCAYO', '(+51) 970 982 099', 'apusamay.hospedaje@gmail.com', 'activo', 'Vive la experiencia de conocer la selva peruana. Viaja, conecta y disfruta de la mejor vista a la ciudad', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20608500678');

SET @eid_20608500678 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20608500678' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20608500678, 'KIARA LUANA', 'MUHAY IZQUIERDO', 'Representante Legal', 'apusamay.hospedaje@gmail.com', '(+51) 970 982 099', 'activo', 1, NOW()
WHERE @eid_20608500678 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20608500678 AND correo='apusamay.hospedaje@gmail.com');

-- empresa 20: LA CASONA AMAZONICA SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'LA CASONA AMAZONICA SAC', NULL, '20608439405', 'JR. MANCO CAPAC NRO. 230 SAN MARTIN - SAN MARTIN - TARAPOTO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20608439405');

SET @eid_20608439405 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20608439405' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20608439405, 'SANTILLAN ROSA MARTINA DIOMAR', 'AREVALO DE', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20608439405 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20608439405 AND nombres='SANTILLAN ROSA MARTINA DIOMAR');

-- empresa 21: GRUPO IDRATO S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'GRUPO IDRATO S.A.C.', NULL, '20602224491', 'MZA. S LOTE. 14 C.P. VILLA RICA 1ET LIMA - LIMA - CHACLACAYO', '922 427 959', 'pedidos@idrato.pe', 'activo', 'Agua Activada Con Oxígeno', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20602224491');

SET @eid_20602224491 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20602224491' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20602224491, 'LA TORRE RAFAEL ROLANDO', 'ANTEZANA DE', 'Representante Legal', 'pedidos@idrato.pe', '922 427 959', 'activo', 1, NOW()
WHERE @eid_20602224491 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20602224491 AND correo='pedidos@idrato.pe');

-- empresa 23: PUSKI S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'PUSKI S.A.C.', NULL, '20602052606', 'AV. ARANCOTA NRO. 153 AREQUIPA - AREQUIPA - SACHACA', '949294091', 'info@puski.pe', 'activo', 'Porque creemos en el poder del color para generar energía positiva. 🧶Teñido de fibras naturales 🧵 🧣Accesorios tejidos a mano🧤 👐🏼Teñido artesanal', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20602052606');

SET @eid_20602052606 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20602052606' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20602052606, 'IRMA VERONICA', 'VALDIVIA PAREDES', 'Representante Legal', 'info@puski.pe', '949294091', 'activo', 1, NOW()
WHERE @eid_20602052606 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20602052606 AND correo='info@puski.pe');

-- empresa 24: ESCUELA DE ADUANAS PERU S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ESCUELA DE ADUANAS PERU S.A.C.', NULL, '20601735912', 'AV. ELMER FAUCETT NRO. 255 INT. 1 URB. MARANGA ET. CUATRO LIMA - LIMA - SAN MIGUEL', '923 528 878', 'aduanas@erca.edu.pe', 'activo', 'Escuela Nacional de Aduanas ENA es una institución de capacitación y consultoría especializada en', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601735912');

SET @eid_20601735912 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601735912' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20601735912, 'HORNA ASHLEY', 'CESPEDES', 'Representante Legal', 'aduanas@erca.edu.pe', '923 528 878', 'activo', 1, NOW()
WHERE @eid_20601735912 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20601735912 AND correo='aduanas@erca.edu.pe');

-- empresa 25: INDIGO COMUNICACIONES SRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'INDIGO COMUNICACIONES SRL', NULL, '20600921402', 'CAL.TEODOSIO PARREÑO NRO. 429 URB. SAN LUIS LIMA - LIMA - BARRANCO', '960 903 286', 'hola@indigocomunicaciones.com', 'activo', 'Somos una Agencia especializada en Branding y Comunicación, con más de 5 años en el mercado, gran', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20600921402');

SET @eid_20600921402 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20600921402' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20600921402, 'ROMY RUTH', 'STUCCHI CHIRINOS', 'Representante Legal', 'hola@indigocomunicaciones.com', '960 903 286', 'activo', 1, NOW()
WHERE @eid_20600921402 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20600921402 AND correo='hola@indigocomunicaciones.com');

-- empresa 26: LEONARI EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'LEONARI EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA', NULL, '20561114090', 'CAL.LOS OLIVOS NRO. 03 ANX. LA GRANJA LAMBAYEQUE - CHICLAYO - TUMAN', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20561114090');

SET @eid_20561114090 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20561114090' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20561114090, 'FREDY WILLIAMS', 'CARRASCO YOVERA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20561114090 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20561114090 AND nombres='FREDY WILLIAMS');

-- empresa 28: JOBULANI MEDIA MARKETING EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'JOBULANI MEDIA MARKETING EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA', NULL, '20600706480', 'MZA. A LOTE. 30 SERUR FILOQUE CHICO (CERCA AL COLEGIO PRIMARIO FILOQUE CHICO) LAMBAYEQUE - LAMBAYEQUE - OLMOS', '964 578 256', 'contacto@jobulani.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20600706480');

SET @eid_20600706480 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20600706480' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20600706480, 'LILIANA NATALY', 'MIO ROQUE', 'Representante Legal', 'contacto@jobulani.com', '964 578 256', 'activo', 1, NOW()
WHERE @eid_20600706480 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20600706480 AND correo='contacto@jobulani.com');

-- empresa 29: AJAD E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AJAD E.I.R.L.', NULL, '20601560845', 'CAL.GERMAN SCHEREIBER NRO. 276 URB. SANTA ANA LIMA - LIMA - SAN ISIDRO', '(+51) 922 472 132', 'comercial@ajad.pe', 'activo', 'Servicio de Consultoría en Sistemas de Gestión', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601560845');

SET @eid_20601560845 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601560845' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20601560845, 'GINA YHAKELINE', 'DOMINGUEZ GASPAR', 'Representante Legal', 'comercial@ajad.pe', '(+51) 922 472 132', 'activo', 1, NOW()
WHERE @eid_20601560845 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20601560845 AND correo='comercial@ajad.pe');

-- empresa 30: INVERSION & PRODUCCION PJD S.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'INVERSION & PRODUCCION PJD S.R.L.', NULL, '20603704372', 'SECTOR PERU II MZA. B3 LOTE. 1 A.V. PERUARBO AREQUIPA - AREQUIPA - CERRO COLORADO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20603704372');

SET @eid_20603704372 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20603704372' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20603704372, 'DEYBI KENYI', 'CHUCTAYA PACHECO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20603704372 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20603704372 AND nombres='DEYBI KENYI');

-- empresa 31: AGROINDUSTRIAS CAMPOS DEL VALLE S.R.L
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AGROINDUSTRIAS CAMPOS DEL VALLE S.R.L', NULL, '20603653328', 'NRO. 73 BQ. OTARI SAN MARTIN (FRENTE A CENTRO EDUCATIVO) CUSCO - LA CONVENCION - PICHARI', '980857044', 'agroindustriascamposdelvalle@gmail.com', 'activo', 'En Agroindustrias Campos del Valle, cultivamos con pasión el cacao utilizando la técnica tree to bar, donde controlamos todo el proceso, desde la siembra hasta la transformación en exquisitos chocolates artesanales.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20603653328');

SET @eid_20603653328 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20603653328' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20603653328, 'BARBOZA DINA', 'TORRES', 'Representante Legal', 'agroindustriascamposdelvalle@gmail.com', '980857044', 'activo', 1, NOW()
WHERE @eid_20603653328 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20603653328 AND correo='agroindustriascamposdelvalle@gmail.com');

-- empresa 32: SALUD OFTALMOLOGICA DE LA SELVA SOCIEDAD ANONIMA CERRADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SALUD OFTALMOLOGICA DE LA SELVA SOCIEDAD ANONIMA CERRADA', NULL, '20604022054', 'PJ. LAS TUNAS NRO. 270 (AL COSTADO DE RESTAURANTE LA TANGUITA RO) SAN MARTIN - SAN MARTIN - LA BANDA DE SHILCAYO', '973 833 952', 'contacto@clinicacos.com', 'activo', 'Oftalmología general y subespecialidades, exámenes, procedimientos y cirugías, refracción, lentes y más.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20604022054');

SET @eid_20604022054 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20604022054' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20604022054, 'PAMELA FLOR', 'PINEDO RODRIGUEZ', 'Representante Legal', 'contacto@clinicacos.com', '973 833 952', 'activo', 1, NOW()
WHERE @eid_20604022054 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20604022054 AND correo='contacto@clinicacos.com');

-- empresa 34: SERVICIOS GENERALES LUI KEM E.I.R.L
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SERVICIOS GENERALES LUI KEM E.I.R.L', NULL, '20533033157', 'MZA. D LOTE. 1 URB. VIÑA DEL MAR AREQUIPA - AREQUIPA - PAUCARPATA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20533033157');

SET @eid_20533033157 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20533033157' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20533033157, 'LUISA KATERIN', 'EYZAGUIRRE MONTEDORO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20533033157 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20533033157 AND nombres='LUISA KATERIN');

-- empresa 35: METROBIZ SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'METROBIZ SAC', NULL, '20601388384', 'CAL.LAS GAVIOTAS NRO. 122 INT. 204 LIMA - LIMA - SURQUILLO', NULL, 'hello@lima.estate', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601388384');

SET @eid_20601388384 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601388384' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20601388384, 'JUANA VICTORIA', 'VELA MALHEIRO', 'Representante Legal', 'hello@lima.estate', NULL, 'activo', 1, NOW()
WHERE @eid_20601388384 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20601388384 AND correo='hello@lima.estate');

-- empresa 36: PURIY DEL PERU S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'PURIY DEL PERU S.A.C.', NULL, '20600054440', 'CAL.LOS ALCANFORES NRO. 1108 DPTO. 202 URB. ARMENDARIZ LIMA - LIMA - MIRAFLORES', '931 083 875', 'info@puriyperuexpeditions.com', 'activo', 'Más que un viaje ofrecemos experiencias auténticas, creando momentos inolvidables .Siendo la prioridad la calidad de servicio que brindamos a nuestros viajeros. Viaja más, vive más!', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20600054440');

SET @eid_20600054440 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20600054440' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20600054440, 'ROJAS ELIZABETH', 'ROSAS', 'Representante Legal', 'info@puriyperuexpeditions.com', '931 083 875', 'activo', 1, NOW()
WHERE @eid_20600054440 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20600054440 AND correo='info@puriyperuexpeditions.com');

-- empresa 37: ADDVIS TECH SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ADDVIS TECH SAC', NULL, '20606373636', 'JR. BELEN NRO. 190 U.V. LOS OLIVOS SAN MARTIN - RIOJA - NUEVA CAJAMARCA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606373636');

SET @eid_20606373636 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606373636' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606373636, 'ANABELEN NAOMI', 'REATEGUI CHUJUTALLI', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20606373636 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606373636 AND nombres='ANABELEN NAOMI');

-- empresa 38: MULTISERVICIOS EXAR E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'MULTISERVICIOS EXAR E.I.R.L.', NULL, '20530344208', 'OTR.AA HH VILLA SOL MZ B LOTE 03 Y 04 MZA. B LOTE. 3-4 A.H. VILLA SOL PIURA - PIURA - CASTILLA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20530344208');

SET @eid_20530344208 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20530344208' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20530344208, 'EXAR ESMINDOR', 'CARRANZA OJEDA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20530344208 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20530344208 AND nombres='EXAR ESMINDOR');

-- empresa 40: RECICLADORA ORTIZ EIRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'RECICLADORA ORTIZ EIRL', NULL, '20607131059', 'AV. CAJAMARCA NRO. S/N OTR. LA MOLINA SAN MARTIN - RIOJA - NUEVA CAJAMARCA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20607131059');

SET @eid_20607131059 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20607131059' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20607131059, 'PERALTA WALTER', 'ORTIZ', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20607131059 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20607131059 AND nombres='PERALTA WALTER');

-- empresa 41: FORMAS CONECTADAS SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'FORMAS CONECTADAS SAC', NULL, '20600545133', 'CAL.BALTAZAR LA TORRE NRO. 140 DPTO. 401 URB. SAN FELIPE LIMA - LIMA - SAN ISIDRO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20600545133');

SET @eid_20600545133 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20600545133' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20600545133, 'CAROLL PATRICIA', 'GUSINSKY CORDOVI', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20600545133 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20600545133 AND nombres='CAROLL PATRICIA');

-- empresa 42: BIODIVERSIDAD DEL PERU-BERU S.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'BIODIVERSIDAD DEL PERU-BERU S.R.L.', NULL, '20610608427', 'AV. GENERAL CORDOVA NRO. 185 DPTO. 101 URB. SANTA CRUZ LIMA - LIMA - MIRAFLORES', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610608427');

SET @eid_20610608427 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610608427' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610608427, 'TUESTA MIGUEL', 'TANG', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20610608427 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610608427 AND nombres='TUESTA MIGUEL');

-- empresa 43: DC TECH SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'DC TECH SAC', NULL, '20472619374', 'AV. AREQUIPA NRO. 2465 DPTO. 302 (FRENTE HOTEL EL DORADO) LIMA - LIMA - LINCE', '987 593 230', 'ventas@dctechperu.com', 'activo', 'Somos una empresa especializada en Servicios Gerenciados & Outsourcing .', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20472619374');

SET @eid_20472619374 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20472619374' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20472619374, 'MORENO WILLIAMS', 'MINAYA', 'Representante Legal', 'ventas@dctechperu.com', '987 593 230', 'activo', 1, NOW()
WHERE @eid_20472619374 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20472619374 AND correo='ventas@dctechperu.com');

-- empresa 44: TRANSILVER TOURS S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'TRANSILVER TOURS S.A.C.', NULL, '20492293301', 'JR. HUASCAR NRO. 1730 INT. 107 LIMA - LIMA - JESUS MARIA', '968 537 099', 'ventas@beru.pe', 'activo', 'Ofrecemos productos e insumos de la biodiversidad de las 4 regiones del Perú; mar, costa, sierra y selva.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20492293301');

SET @eid_20492293301 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20492293301' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20492293301, 'YAMUNAQUE MAYRA', 'GUTIERREZ', 'Representante Legal', 'ventas@beru.pe', '968 537 099', 'activo', 1, NOW()
WHERE @eid_20492293301 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20492293301 AND correo='ventas@beru.pe');

-- empresa 45: GENERAL CONSULTING PERU S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'GENERAL CONSULTING PERU S.A.C.', NULL, '20602604757', 'JR. URSULA PEREDA NRO. 122 OTR. JR URSULA (CERCA AL COLEGIO MONSERRAT) LIMA - LIMA - LIMA', '908 890 270', 'info@consultingperu.com.pe', 'activo', 'Somos solucionadores de alto nivel, entendemos las necesidades del mercado y buscamos cubrirlas toda', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20602604757');

SET @eid_20602604757 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20602604757' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20602604757, 'PEREZ SALIS', 'LIVON', 'Representante Legal', 'info@consultingperu.com.pe', '908 890 270', 'activo', 1, NOW()
WHERE @eid_20602604757 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20602604757 AND correo='info@consultingperu.com.pe');

-- empresa 46: AGROINDUSTRIAS AGRITEX S.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AGROINDUSTRIAS AGRITEX S.R.L.', NULL, '20603280050', 'JR. LOS ARENALES NRO. 220 (CUADRA 2) AMAZONAS - CHACHAPOYAS - CHACHAPOYAS', '946 922 261', 'aagritex@gmail.com', 'activo', 'Servicios y ventas de equipos e insumos para la agricultura y ganadería.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20603280050');

SET @eid_20603280050 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20603280050' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20603280050, 'INGA ELDIN', 'LOPEZ', 'Representante Legal', 'aagritex@gmail.com', '946 922 261', 'activo', 1, NOW()
WHERE @eid_20603280050 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20603280050 AND correo='aagritex@gmail.com');

-- empresa 47: A Y E GROUP CONSULTANT S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'A Y E GROUP CONSULTANT S.A.C.', NULL, '20605314644', 'MZA. I LOTE. 07 A.H. LAS LOMAS DE LA PRADERA LAMBAYEQUE - CHICLAYO - CHICLAYO', NULL, 'info@distribuidoresgarcia.com', 'activo', '¡Bienvenidos a V&G Distribuidores, tu aliado en instalaciones para tu hogar! 🤝🏽✨ En nuestra ferretería, nos enorgullece ofrecer productos de CALIDAD que transforman tus proyectos en REALIDAD. Únete a nuestra comunidad, y descubre lo que tenemos para ti.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605314644');

SET @eid_20605314644 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605314644' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605314644, 'JOSE ENRIQUE', 'FERNANDEZ RAZURI', 'Representante Legal', 'info@distribuidoresgarcia.com', NULL, 'activo', 1, NOW()
WHERE @eid_20605314644 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605314644 AND correo='info@distribuidoresgarcia.com');

-- empresa 48: TACTICAL SERVICES GROUP CONSULTING SOCIEDAD ANONIMA CERRADA TSG CONSULTING SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'TACTICAL SERVICES GROUP CONSULTING SOCIEDAD ANONIMA CERRADA TSG CONSULTING SAC', NULL, '20600685211', 'PJ. SANTA ROSA, 2DO PISO MZA. -- LOTE. A-4 RES. QUINTA CLAUDIA (2 CDRAS DE COLEG. LORD BYRON) AREQUIPA - AREQUIPA - YANAHUARA', '955 102 013', 'hola@tsgconsulting.com.pe', 'activo', 'Servicios de consultoría, capacitación y auditoría de las normas nacionales e internacionales ISO.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20600685211');

SET @eid_20600685211 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20600685211' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20600685211, 'AMERICA YELINA', 'CARDENAS ONTON', 'Representante Legal', 'hola@tsgconsulting.com.pe', '955 102 013', 'activo', 1, NOW()
WHERE @eid_20600685211 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20600685211 AND correo='hola@tsgconsulting.com.pe');

-- empresa 49: VYG DISTRIBUIDORES & IMPORTADORES GARCIA S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'VYG DISTRIBUIDORES & IMPORTADORES GARCIA S.A.C.', NULL, '20610645381', 'AV. PROCERES NRO. 8120 INT. 205 URB. INDUSTRIAÑ UNICACHI (CENTRO FERRETERO UNICACHI) LIMA - LIMA - SAN MARTIN DE PORRES', NULL, 'info@distribuidoresgarcia.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610645381');

SET @eid_20610645381 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610645381' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610645381, 'GARCIA EDWIN', 'VEGA', 'Representante Legal', 'info@distribuidoresgarcia.com', NULL, 'activo', 1, NOW()
WHERE @eid_20610645381 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610645381 AND correo='info@distribuidoresgarcia.com');

-- empresa 50: NATURA INN E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'NATURA INN E.I.R.L.', NULL, '20454088094', 'MZA. B LOTE. 5 URB. IBARGUEN AREQUIPA - AREQUIPA - YANAHUARA', '(054) 251253', 'reservas@hotelnaturainn.com', 'activo', 'Hotel Natura Inn 3 estrellas combina la belleza escénica de los volcanes con la experiencia única', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20454088094');

SET @eid_20454088094 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20454088094' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20454088094, 'GINA MARISOL', 'GOMEZ ZEGARRA', 'Representante Legal', 'reservas@hotelnaturainn.com', '(054) 251253', 'activo', 1, NOW()
WHERE @eid_20454088094 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20454088094 AND correo='reservas@hotelnaturainn.com');

-- empresa 51: MACHUPICCHU VIPTOURS SOCIEDAD COMERCIAL DE RESPONSABILIDAD LIMITADA - MAVIPTOURS S.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'MACHUPICCHU VIPTOURS SOCIEDAD COMERCIAL DE RESPONSABILIDAD LIMITADA - MAVIPTOURS S.R.L.', NULL, '20601093813', 'AV. TUPAC AMARU NRO. O-12 URB. PROGRESO CUSCO - CUSCO - CUSCO', '962 230 162', 'ventas@machupicchuperutours.com-', 'activo', '🇵🇪 Experiencias personalizadas e inolvidables Comprometidos con el turismo sostenible 🌄', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601093813');

SET @eid_20601093813 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601093813' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20601093813, 'CASTILLO LUIS ALBERTO', 'MAMANI DEL', 'Representante Legal', 'ventas@machupicchuperutours.com-', '962 230 162', 'activo', 1, NOW()
WHERE @eid_20601093813 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20601093813 AND correo='ventas@machupicchuperutours.com-');

-- empresa 52: ARQ DESIGN E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ARQ DESIGN E.I.R.L.', NULL, '20605082824', 'CAL.BACILIO PACHECO NRO. 531 DPTO. 401 URB. EL BOSQUE LA LIBERTAD - TRUJILLO - TRUJILLO', '958 136 822', 'richarq28@gmail.com', 'activo', 'Arquitecto diseñador', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605082824');

SET @eid_20605082824 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605082824' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605082824, 'RICHARD MANUEL', 'PAREDES MORAN', 'Representante Legal', 'richarq28@gmail.com', '958 136 822', 'activo', 1, NOW()
WHERE @eid_20605082824 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605082824 AND correo='richarq28@gmail.com');

-- empresa 53: CORPORACIÓN INTERNACIONAL HEMINGWAY S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'CORPORACIÓN INTERNACIONAL HEMINGWAY S.A.C.', NULL, '20601052521', 'JR. HUANCAS NRO. 280 URB. SAN CARLOS JUNIN - HUANCAYO - HUANCAYO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601052521');

SET @eid_20601052521 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601052521' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20601052521, 'PATRICIA JANET', 'CUEVA QUINTANILLA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20601052521 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20601052521 AND nombres='PATRICIA JANET');

-- empresa 54: FABRICA DE CONFECCIONES TEXTILES Y COMERCIALIZACION EN GENERAL MARCO MARIA POLOS S.A.C
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'FABRICA DE CONFECCIONES TEXTILES Y COMERCIALIZACION EN GENERAL MARCO MARIA POLOS S.A.C', NULL, '20600924681', 'CAL.SANTA MARTHA NRO. 755 P.J. URRUNAGA I SECTOR LAMBAYEQUE - CHICLAYO - JOSE LEONARDO ORTIZ', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20600924681');

SET @eid_20600924681 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20600924681' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20600924681, 'MARIA OLGA', 'MEGO HERNANDEZ', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20600924681 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20600924681 AND nombres='MARIA OLGA');

-- empresa 55: REPUESTOS ORIGINALES DEL NORTE S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'REPUESTOS ORIGINALES DEL NORTE S.A.C.', NULL, '20607359246', 'AV. TUPAC AMARU NRO. 1396 URB. ALTO MOCHICA SECTOR 1 (ESQUINA CON AV. FEDERICO VILLAREAL) LA LIBERTAD - TRUJILLO - TRUJILLO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20607359246');

SET @eid_20607359246 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20607359246' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20607359246, 'JHONATAN STEBEN', 'AVILA CUADRA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20607359246 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20607359246 AND nombres='JHONATAN STEBEN');

-- empresa 56: SHAKIRA MIA EIRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SHAKIRA MIA EIRL', NULL, '20602714951', 'CAL.GABRIEL AGUILAR NRO. 1265 P.J. EL PORVENIR LA LIBERTAD - TRUJILLO - EL PORVENIR', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20602714951');

SET @eid_20602714951 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20602714951' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20602714951, 'RODRIGUEZ RICARDO', 'SOSA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20602714951 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20602714951 AND nombres='RODRIGUEZ RICARDO');

-- empresa 57: DECHINAAPERUCOM EIRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'DECHINAAPERUCOM EIRL', NULL, '20604387397', 'CAL.2 NRO. 284 LOS CISNES LIMA - LIMA - SANTIAGO DE SURCO', '976 616 514', 'admin@dechinaaperu.com-', 'activo', 'Realizamos servicios completos de importación al mínimo precio. Si no ahorras dinero, no nos pagas', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20604387397');

SET @eid_20604387397 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20604387397' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20604387397, 'LEZAMA MARKYÑO DA\'SA', 'LA TORRE', 'Representante Legal', 'admin@dechinaaperu.com-', '976 616 514', 'activo', 1, NOW()
WHERE @eid_20604387397 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20604387397 AND correo='admin@dechinaaperu.com-');

-- empresa 58: SBN STORE E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SBN STORE E.I.R.L.', NULL, '20607966614', 'MZA. I LOTE. 12 INT. 4 P. URB. LAS PALMERAS DE SAN ANDRES LA LIBERTAD - TRUJILLO - VICTOR LARCO HERRERA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20607966614');

SET @eid_20607966614 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20607966614' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20607966614, 'STEPHANY BRIZET NATALY', 'ALAYO AVILA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20607966614 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20607966614 AND nombres='STEPHANY BRIZET NATALY');

-- empresa 59: INVERSIONES MICADE SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'INVERSIONES MICADE SAC', NULL, '20603005687', 'MZA. F LOTE. 06 URB. LA ESPERANCITA LA LIBERTAD - TRUJILLO - TRUJILLO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20603005687');

SET @eid_20603005687 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20603005687' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20603005687, 'MARIA CAROLINA', 'AMARU CORONEL', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20603005687 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20603005687 AND nombres='MARIA CAROLINA');

-- empresa 61: COLONIA - HERRERA & ASOCIADOS S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'COLONIA - HERRERA & ASOCIADOS S.A.C.', NULL, '20480547901', 'PJ. LOS CLAVELES NRO. 120 URB. URB. CERRADA CAJAMARCA - JAEN - JAEN', '976 877 453', 'lenincolonia@colonia-herrera.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20480547901');

SET @eid_20480547901 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20480547901' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20480547901, 'LENIN ENRIQUE', 'COLONIA CORDOVA', 'Representante Legal', 'lenincolonia@colonia-herrera.com', '976 877 453', 'activo', 1, NOW()
WHERE @eid_20480547901 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20480547901 AND correo='lenincolonia@colonia-herrera.com');

-- empresa 62: T & S REPRESENTACIONES S.A. C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'T & S REPRESENTACIONES S.A. C.', NULL, '20605524665', 'AV. ARICA NRO. 736 CERCADO DE CHICLAYO LAMBAYEQUE - CHICLAYO - CHICLAYO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605524665');

SET @eid_20605524665 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605524665' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605524665, 'IZELA MEDALI', 'TERRONES LIMA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20605524665 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605524665 AND nombres='IZELA MEDALI');

-- empresa 63: DIESELMOTOREN PERU EIRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'DIESELMOTOREN PERU EIRL', NULL, '20602451705', 'CAL.CALLE 31 NRO. 288 DPTO. 301 URB. MARISCAL CASTILLA LIMA - LIMA - SAN BORJA', '993 114 138', 'contacto@dieselmotorenperu.com', 'activo', 'Bombas y Flujómetros (Caudalímetros) de alta precisión 0.1%. Hechas en Austria, compactas de alta duración y poco mantenimiento. Se trabaja con motores, calderos, turbinas, generadores para combustibles, fluidos hidráulicos, gas licuado.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20602451705');

SET @eid_20602451705 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20602451705' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20602451705, 'VERONICA NOEMI', 'LIBERT DIAZ', 'Representante Legal', 'contacto@dieselmotorenperu.com', '993 114 138', 'activo', 1, NOW()
WHERE @eid_20602451705 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20602451705 AND correo='contacto@dieselmotorenperu.com');

-- empresa 64: CCARPA E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'CCARPA E.I.R.L.', NULL, '20601236151', 'JR. CUZCO NRO. 349A BAR. HUAYCO SAN MARTIN - SAN MARTIN - TARAPOTO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601236151');

SET @eid_20601236151 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601236151' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20601236151, 'CARLOS HITLER', 'CARDENAS PAREDES', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20601236151 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20601236151 AND nombres='CARLOS HITLER');

-- empresa 65: AGUA DE MESA CONSUELO E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AGUA DE MESA CONSUELO E.I.R.L.', NULL, '20572128611', 'JR. JOSE ISUIZA NRO. SN (FRENTE A LAVADERO DE VEHICULOS - CONSUEL) SAN MARTIN - BELLAVISTA - SAN PABLO', '941 799 637', NULL, 'activo', 'AGUA TRATADA FILTRADA,OZONIZADA Y ESTERILIZADA CON RAYOS UV. CONSUME LO NUESTRO - PRODUCIDO PO', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20572128611');

SET @eid_20572128611 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20572128611' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20572128611, 'MARIA ELIZABETH', 'COTRINA PEREZ', 'Representante Legal', NULL, '941 799 637', 'activo', 1, NOW()
WHERE @eid_20572128611 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20572128611 AND nombres='MARIA ELIZABETH');

-- empresa 66: CMORALESC CONTRATISTAS GENERALES E.I.RL.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'CMORALESC CONTRATISTAS GENERALES E.I.RL.', NULL, '20533649182', 'CAR.HUARAZ-CASMA MZA. 0950 LOTE. 233 CAS. PICUP ANCASH - HUARAZ - INDEPENDENCIA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20533649182');

SET @eid_20533649182 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20533649182' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20533649182, 'CESAR AUGUSTO', 'MORALES CASTRO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20533649182 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20533649182 AND nombres='CESAR AUGUSTO');

-- empresa 67: NB MODA SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'NB MODA SAC', NULL, '20607472018', 'AV. MARISCAL JOSE DE LA MAR NRO. 333 INT. 305 URB. SANTA CRUZ LIMA - LIMA - MIRAFLORES', '952 751 310', 'hola@nathaliebird.pe', 'activo', 'Queremos inspirarte y acompañarte en todos los caminos que quieras recorrer. ¡Ven y comparte tu magia! Joyas y accesorios de tendencia.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20607472018');

SET @eid_20607472018 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20607472018' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20607472018, 'PALOMA NATALIA MARLENE', 'CASTRO VALDIVIA', 'Representante Legal', 'hola@nathaliebird.pe', '952 751 310', 'activo', 1, NOW()
WHERE @eid_20607472018 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20607472018 AND correo='hola@nathaliebird.pe');

-- empresa 68: PUKUPUKU TRAVEL SOCIEDAD COMERCIAL DE RESPONSABILIDAD LIMITADA-PUKUPUKU TRAVEL S.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'PUKUPUKU TRAVEL SOCIEDAD COMERCIAL DE RESPONSABILIDAD LIMITADA-PUKUPUKU TRAVEL S.R.L.', NULL, '20563830264', 'JR. 18 DE MAYO MZA. G-1 LOTE. 4 URB. TTIO NORTE CUSCO - CUSCO - WANCHAQ', '986 857 505', 'info@pukupukutravel.com', 'activo', 'PUKUPUKU TRAVEL, Aventuras inolvidables desde antes que salga el sol.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20563830264');

SET @eid_20563830264 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20563830264' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20563830264, 'IBETH LUCRECIA', 'BOCANGEL MADERA', 'Representante Legal', 'info@pukupukutravel.com', '986 857 505', 'activo', 1, NOW()
WHERE @eid_20563830264 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20563830264 AND correo='info@pukupukutravel.com');

-- empresa 69: NATIVO'GRILL E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'NATIVO\'GRILL E.I.R.L.', NULL, '20494133785', 'PROL. AV PERU NRO. 232 (A 100 METROS DEL OVALO DEL SOLDADO) SAN MARTIN - SAN MARTIN - MORALES', '945 541 621', NULL, 'activo', NULL, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20494133785');

SET @eid_20494133785 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20494133785' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20494133785, 'JHONATAN KELVIN', 'CASTILLO CAHUAZA', 'Representante Legal', NULL, '945 541 621', 'activo', 1, NOW()
WHERE @eid_20494133785 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20494133785 AND nombres='JHONATAN KELVIN');

-- empresa 70: QHALI KAY DEL PERU COMPANY SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'QHALI KAY DEL PERU COMPANY SAC', NULL, '20606294558', 'JR. AYACUCHO NRO. 216 (2DO PISO INTERIOR 01) SAN MARTIN - SAN MARTIN - MORALES', '980 401 962', 'info@qhalikaygroup.com', 'activo', 'Qhali Kay Group es una empresa peruana que produce y comercializa productos naturales orgánicos cer', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606294558');

SET @eid_20606294558 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606294558' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606294558, 'VILLACORTA KATHERINE', 'VERA', 'Representante Legal', 'info@qhalikaygroup.com', '980 401 962', 'activo', 1, NOW()
WHERE @eid_20606294558 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606294558 AND correo='info@qhalikaygroup.com');

-- empresa 71: CLINICA SANTA ROSA DE MANCHAY SOCIEDAD ANONIMA CERRADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'CLINICA SANTA ROSA DE MANCHAY SOCIEDAD ANONIMA CERRADA', NULL, '20602758959', 'CAL.36 MZA. B LOTE. 19 A CPR LOS HUERTOS DE MANCHAY - SECTOR CENTRAL LIMA - LIMA - PACHACAMAC', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20602758959');

SET @eid_20602758959 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20602758959' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20602758959, 'LUIS ALBERTO', 'HUAROTO CASQUILLAS', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20602758959 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20602758959 AND nombres='LUIS ALBERTO');

-- empresa 72: ISUIZA LOGISTICA EIRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ISUIZA LOGISTICA EIRL', NULL, '20609072629', 'CAL.01 MZA. A LOTE. 08 URB. VILLA ZARAHEMIA LIMA - LIMA - CARABAYLLO', '995 950 456', 'cristiancj2427@gmail.com', 'activo', 'FABRICACION DE ARTICULOS DE PAPEL Y CARTON', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20609072629');

SET @eid_20609072629 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20609072629' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20609072629, 'CRISTIAN JUNIOR', 'APAGÜEÑO ISHUIZA', 'Representante Legal', 'cristiancj2427@gmail.com', '995 950 456', 'activo', 1, NOW()
WHERE @eid_20609072629 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20609072629 AND correo='cristiancj2427@gmail.com');

-- empresa 73: INGENIERIA, CONSTRUCCION, ARQUITECTURA Y SERVICIOS SOCIEDAD ANONIMA CERRADA - INCONARQS S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'INGENIERIA, CONSTRUCCION, ARQUITECTURA Y SERVICIOS SOCIEDAD ANONIMA CERRADA - INCONARQS S.A.C.', NULL, '20533235299', 'MZA. G LOTE. 15 A.V. LOS GRANADOS (LEGUIA, ALTURA DE LA COMISARIA) TACNA - TACNA - TACNA', '988 893 165', 'consultas@inconarqs.com', 'activo', '✔ Ingeniería, Construcción, Arquitectura y Servicios', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20533235299');

SET @eid_20533235299 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20533235299' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20533235299, 'TRELLES ISMAEL', 'IPANAQUE', 'Representante Legal', 'consultas@inconarqs.com', '988 893 165', 'activo', 1, NOW()
WHERE @eid_20533235299 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20533235299 AND correo='consultas@inconarqs.com');

-- empresa 74: L105 E.I.R.L
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'L105 E.I.R.L', NULL, '20537005433', 'CAL.RAVEL NRO. 168 DPTO. 402 URB. SAN BORJA SUR (ESP.HOTEL BRITANNIA) LIMA - LIMA - SAN BORJA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20537005433');

SET @eid_20537005433 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20537005433' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20537005433, 'MIGUEL ANGEL', 'ACUÑA MORENO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20537005433 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20537005433 AND nombres='MIGUEL ANGEL');

-- empresa 75: REMANSO DEL COLCA SRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'REMANSO DEL COLCA SRL', NULL, '20601122597', 'CAL.JOSE ANTONIO DE SUCRE MZA. S LOTE. 1A C.P. CHIVAY AREQUIPA - CAYLLOMA - CHIVAY', NULL, 'elremansodelcolca@hotmail.com', 'activo', 'RESTAURANT CAMPESTRE-BUFFET AV. SAN ANDRES S/N- CHIVAY (CARRETERA CHIVAY.YANQUE KM 1) RESERVACIONES:', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601122597');

SET @eid_20601122597 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601122597' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20601122597, 'HERBER ROLANDO', 'TACO ROJAS', 'Representante Legal', 'elremansodelcolca@hotmail.com', NULL, 'activo', 1, NOW()
WHERE @eid_20601122597 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20601122597 AND correo='elremansodelcolca@hotmail.com');

-- empresa 76: SERVICIO GASTRONOMICO VAZSO SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SERVICIO GASTRONOMICO VAZSO SAC', NULL, '20524558638', 'CAL.FEDERICO UGARTE NRO. 296 PAMPLONA BAJA (PARAD EL POZO) LIMA - LIMA - SAN JUAN DE MIRAFLORES', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20524558638');

SET @eid_20524558638 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20524558638' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20524558638, 'JORGE ALFREDO', 'VASQUEZ SORIA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20524558638 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20524558638 AND nombres='JORGE ALFREDO');

-- empresa 77: CAFETERIA LA GELA EIRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'CAFETERIA LA GELA EIRL', NULL, '20608253786', 'JR. SAN MARTIN NRO. 212 PUEBLO NUEVO (FRENTE AL PARQUE 07 DE JUNIO) AMAZONAS - UTCUBAMBA - BAGUA GRANDE', '977 631 749', 'nmolocho@gmail.com', 'activo', 'La Gela: Café, Bar & Grill', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20608253786');

SET @eid_20608253786 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20608253786' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20608253786, 'ESTELA NILSON', 'MOLOCHO', 'Representante Legal', 'nmolocho@gmail.com', '977 631 749', 'activo', 1, NOW()
WHERE @eid_20608253786 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20608253786 AND correo='nmolocho@gmail.com');

-- empresa 78: GRUPO DE MERCADEO 360 SA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'GRUPO DE MERCADEO 360 SA', NULL, '20610003096', 'CAL.OCHARAN NRO. 760 DPTO. 101 URB. REVETT LIMA - LIMA - MIRAFLORES', '920 085 275', 'capacitacion@grupomercadeo360.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610003096');

SET @eid_20610003096 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610003096' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610003096, 'JOSUE WASHINGTON', 'CARRILLO ANDREWS', 'Representante Legal', 'capacitacion@grupomercadeo360.com', '920 085 275', 'activo', 1, NOW()
WHERE @eid_20610003096 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610003096 AND correo='capacitacion@grupomercadeo360.com');

-- empresa 79: GAME CLUB EIRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'GAME CLUB EIRL', NULL, '20606636131', 'JR. JOSE NICOLAS DE RODRIGO NRO. 365 DPTO. 102 URB. LIMA POLO HUNT LIMA - LIMA - SANTIAGO DE SURCO', '966 603 224', 'hola@gametimeperu.com', 'activo', 'Juegos de mesa y rompecabezas para toda la familia Benavides 5061 RUC 20606636131 GAME CLUB EIRL', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606636131');

SET @eid_20606636131 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606636131' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606636131, 'JONATHAN DAVID', 'RAYGADA BALLON', 'Representante Legal', 'hola@gametimeperu.com', '966 603 224', 'activo', 1, NOW()
WHERE @eid_20606636131 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606636131 AND correo='hola@gametimeperu.com');

-- empresa 80: CONSTRUCCIONES Y ACUICULTURA SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'CONSTRUCCIONES Y ACUICULTURA SAC', NULL, '20603504730', 'JR. JR SANTA ROSA, ESQUINA CON JR. JORGE CHAVEZ NRO. S/N SEC. SECTOR LOS TRIUNFADORES (AMPLIACION LOS INCAS, SECTOR LOS TRIUNFA) SAN MARTIN - RIOJA - NUEVA CAJAMARCA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20603504730');

SET @eid_20603504730 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20603504730' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20603504730, 'ERICK EXANDER', 'CHILCON TAPIA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20603504730 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20603504730 AND nombres='ERICK EXANDER');

-- empresa 81: INNOVA DESTINO PERU SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'INNOVA DESTINO PERU SAC', NULL, '20609240912', 'JR. SAN LUIS NRO. 630 URB. SAN LUIS (ATRAS DE LA COMISARÍA) SAN MARTIN - RIOJA - NUEVA CAJAMARCA', NULL, NULL, 'activo', 'Agencias de Viajes especializada en viajes nacionales, internacionales, viajes en grupos y corporativo. Ofrecemos reservas de vuelos, hotel, auto, cruceros y seguros de asistencia.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20609240912');

SET @eid_20609240912 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20609240912' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20609240912, 'JACKELINE HAYDEE', 'CORREA MOZO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20609240912 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20609240912 AND nombres='JACKELINE HAYDEE');

-- empresa 82: DYT INTEGRA S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'DYT INTEGRA S.A.C.', NULL, '20608187465', 'MZA. 13 LOTE. A DPTO. 102 URB. LA ARBOLEDA AREQUIPA - AREQUIPA - AREQUIPA', '981602310', 'info@dtintegra.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20608187465');

SET @eid_20608187465 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20608187465' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20608187465, 'JUAN CARLOS', 'VILCA QUISPE', 'Representante Legal', 'info@dtintegra.com', '981602310', 'activo', 1, NOW()
WHERE @eid_20608187465 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20608187465 AND correo='info@dtintegra.com');

-- empresa 83: M & R ASESORES SOLUCIONES SOSTENIBLES E.I.R.L
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'M & R ASESORES SOLUCIONES SOSTENIBLES E.I.R.L', NULL, '20604771031', 'JR. PAJATEN NRO. 876 (A UNA CUADRA DEL HOSPITAL) SAN MARTIN - MARISCAL CACERES - JUANJUI', '949 146 923', 'asesoresmr4@gmail.com', 'activo', 'M&R Asesores - Soluciones Sostenibles E.I.R.L RUC: 20604771031 Dirección: Jr. Pajatén N°876 - San', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20604771031');

SET @eid_20604771031 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20604771031' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20604771031, 'CHAVEZ MILAGRITOS', 'RIOS', 'Representante Legal', 'asesoresmr4@gmail.com', '949 146 923', 'activo', 1, NOW()
WHERE @eid_20604771031 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20604771031 AND correo='asesoresmr4@gmail.com');

-- empresa 84: PERU INKAS ADVENTURES SOCIEDAD ANONIMA CERRADA PERU INKAS ADVENTURES S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'PERU INKAS ADVENTURES SOCIEDAD ANONIMA CERRADA PERU INKAS ADVENTURES S.A.C.', NULL, '20515294997', 'CAL.VILLA ANDINA SECTOR YANACONA NRO. C-7 CND. ANDINA CUSCO - URUBAMBA - URUBAMBA', '940 703 338', 'info@inkasadventures.com', 'activo', 'he best MTB Tours in Peru, owned by Wayo Stein, 13 times National Champion of Peru. Since 2006 offering amazing adventures on two wheels.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20515294997');

SET @eid_20515294997 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20515294997' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20515294997, 'FEDERICO EDUARDO', 'STEIN MONTAGNE', 'Representante Legal', 'info@inkasadventures.com', '940 703 338', 'activo', 1, NOW()
WHERE @eid_20515294997 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20515294997 AND correo='info@inkasadventures.com');

-- empresa 85: BIOINGEMED S.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'BIOINGEMED S.R.L.', NULL, '20557351583', 'CAL.VASCO DE GAMA NRO. 275 DPTO. 201 ST PATRICIA (ALT CDRA 10 DE CONSTRUCTORES) LIMA - LIMA - LA MOLINA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20557351583');

SET @eid_20557351583 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20557351583' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20557351583, 'AMARO ALEJANDRO', 'PALOMINO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20557351583 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20557351583 AND nombres='AMARO ALEJANDRO');

-- empresa 86: COMERCIAL FLOR & LF S. A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'COMERCIAL FLOR & LF S. A.C.', NULL, '20610564519', 'CAL.CORREDOR COMERCIAL MOD. NRO. 14 (PAMPA INALAMBRICA) MOQUEGUA - ILO - ILO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610564519');

SET @eid_20610564519 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610564519' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610564519, 'HUANCA FLORA', 'SONCCO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20610564519 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610564519 AND nombres='HUANCA FLORA');

-- empresa 87: AMAZONIA ORGANIC PRODUCTS S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AMAZONIA ORGANIC PRODUCTS S.A.C.', NULL, '20552349149', 'JR. BOLOGNESI NRO. 315 COM. SAN ANTONIO DE CUMBAZA SAN MARTIN - SAN MARTIN - TARAPOTO', '931 846 313', 'info@amazoniaorganic.com', 'activo', 'Chocolate Orgánico Peruano / Peruvian Organic Chocolate Cacao Orgánico / Organic Cocoa', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20552349149');

SET @eid_20552349149 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20552349149' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20552349149, 'VITOMIR ALBERTO', 'KISIC LUNA', 'Representante Legal', 'info@amazoniaorganic.com', '931 846 313', 'activo', 1, NOW()
WHERE @eid_20552349149 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20552349149 AND correo='info@amazoniaorganic.com');

-- empresa 88: KAY PACHA CORPORATION SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'KAY PACHA CORPORATION SAC', NULL, '20607340332', 'PJ. SAN AGUSTIN NRO. 331 SEC. LOS INCAS SAN MARTIN - RIOJA - NUEVA CAJAMARCA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20607340332');

SET @eid_20607340332 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20607340332' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20607340332, 'DAVILA NILSAN', 'BUSTAMANTE', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20607340332 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20607340332 AND nombres='DAVILA NILSAN');

-- empresa 89: VIVE PERU ESCUELA DE SALUD NATURAL Y TROFOLOGIA S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'VIVE PERU ESCUELA DE SALUD NATURAL Y TROFOLOGIA S.A.C.', NULL, '20611037946', 'JR. ROSAS NRO. 162 DPTO. 303 CND. JR LAS ROSAS 162 (AV TOMAS VALLE 1250 BLOCK 5) LIMA - LIMA - LOS OLIVOS', '982 718 257', 'viveperutrofologia@gmail.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20611037946');

SET @eid_20611037946 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20611037946' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20611037946, 'SHATMI MIGUEL', 'ANDIA CRUZ', 'Representante Legal', 'viveperutrofologia@gmail.com', '982 718 257', 'activo', 1, NOW()
WHERE @eid_20611037946 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20611037946 AND correo='viveperutrofologia@gmail.com');

-- empresa 90: N & A AGROEXPORT E.I. R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'N & A AGROEXPORT E.I. R.L.', NULL, '20610626379', 'CAL.RIO CUNIA NRO. 305 URB. EL PARAISO CAJAMARCA - JAEN - JAEN', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610626379');

SET @eid_20610626379 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610626379' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610626379, 'OMAR ANTHONY', 'AREVALO MEGO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20610626379 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610626379 AND nombres='OMAR ANTHONY');

-- empresa 91: LABORATORIO CLINICO ROKA S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'LABORATORIO CLINICO ROKA S.A.C.', NULL, '20607593265', 'AV. AV LIMA NRO. 1031 URB. TARAPOTO (ALTURA DEL MERCADO HUEQUITO) SAN MARTIN - SAN MARTIN - TARAPOTO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20607593265');

SET @eid_20607593265 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20607593265' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20607593265, 'PEZO KAREN', 'RIOS', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20607593265 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20607593265 AND nombres='PEZO KAREN');

-- empresa 92: POLICLINICO OCUPACIONAL CHALLHUAHUACHO SOCIEDAD ANONIMA CERRADA - POLICLINICO OCUPACIONAL CHALLHUAHU
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'POLICLINICO OCUPACIONAL CHALLHUAHUACHO SOCIEDAD ANONIMA CERRADA - POLICLINICO OCUPACIONAL CHALLHUAHU', NULL, '20491118432', 'AV. SULFUBAMBA NRO. SN APURIMAC - COTABAMBAS - CHALLHUAHUACHO', '966 741 959', 'administracion@dsilvapoliclinico.com', 'activo', 'En el Policlinico Challhuahuacho, somos un equipo multidisciplinario de profesionales altamente cali', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20491118432');

SET @eid_20491118432 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20491118432' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20491118432, 'MENDOZA EVERT', 'SILVA', 'Representante Legal', 'administracion@dsilvapoliclinico.com', '966 741 959', 'activo', 1, NOW()
WHERE @eid_20491118432 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20491118432 AND correo='administracion@dsilvapoliclinico.com');

-- empresa 93: A & R ASESORES S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'A & R ASESORES S.A.C.', NULL, '20535720739', 'AV. VIA LACTEA NRO. 255 DPTO. 203 (CONDOMINIO LOS GRANADOS) LIMA - LIMA - SANTIAGO DE SURCO', '966 193 153', 'comercial@cec.com.pe', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20535720739');

SET @eid_20535720739 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20535720739' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20535720739, 'ADRIANA EUGENIA', 'REYES RAMIREZ', 'Representante Legal', 'comercial@cec.com.pe', '966 193 153', 'activo', 1, NOW()
WHERE @eid_20535720739 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20535720739 AND correo='comercial@cec.com.pe');

-- empresa 94: ADYSA NUTRICION E.I.R. L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ADYSA NUTRICION E.I.R. L.', NULL, '20608768174', 'AV. VENEZUELA NRO. 3472 P.J. CASA BLANCA LAMBAYEQUE - CHICLAYO - JOSE LEONARDO ORTIZ', '945 448 024', 'adysanutricion@gmail.com', 'activo', 'Somos una empresa dedicada a la producción y venta de alimentos balanceados para aves, cerdos, vacunos y cuyes. Ubícanos en Av. Venezuela 3472 - José Leonardo Ortiz - Chiclayo - Perú', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20608768174');

SET @eid_20608768174 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20608768174' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20608768174, 'VERONICA LISSETH', 'REYES ODAR', 'Representante Legal', 'adysanutricion@gmail.com', '945 448 024', 'activo', 1, NOW()
WHERE @eid_20608768174 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20608768174 AND correo='adysanutricion@gmail.com');

-- empresa 95: AS SUPPORT S.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AS SUPPORT S.R.L.', NULL, '20515002619', 'CAL.JOSE MANUEL UGARTECHE NRO. 2831 (BRASIL Y PTE EL EJERCITO) LIMA - LIMA - PUEBLO LIBRE (MAGDALENA VIEJA)', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20515002619');

SET @eid_20515002619 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20515002619' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20515002619, 'GINO DAVID', 'SAAVEDRA GRILLO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20515002619 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20515002619 AND nombres='GINO DAVID');

-- empresa 96: OMEGALIFE EIRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'OMEGALIFE EIRL', NULL, '20607317322', 'AV. GENERAL JOSE DE SAN MARTIN NRO. 810 URB. EL CARMEN LIMA - LIMA - PUEBLO LIBRE (MAGDALENA VIEJA)', '942 710 005', NULL, 'activo', 'Nutrición inteligente con alimentos funcionales, nutren y previenen enfermedades ¡Exquisitamente Saludable!', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20607317322');

SET @eid_20607317322 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20607317322' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20607317322, 'TAYPE YOLANDA', 'ANCCASI', 'Representante Legal', NULL, '942 710 005', 'activo', 1, NOW()
WHERE @eid_20607317322 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20607317322 AND nombres='TAYPE YOLANDA');

-- empresa 97: SIGNATURE PERU SOCIEDAD ANONIMA CERRADA - SIGNATURE PERU S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SIGNATURE PERU SOCIEDAD ANONIMA CERRADA - SIGNATURE PERU S.A.C.', NULL, '20606296739', 'AV. GREGORIO ESCOBEDO NRO. 426 DPTO. 1207 LIMA - LIMA - JESUS MARIA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606296739');

SET @eid_20606296739 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606296739' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606296739, 'MARIELLA VANESSA', 'MEDINA LLAMOSA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20606296739 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606296739 AND nombres='MARIELLA VANESSA');

-- empresa 98: AGROINDUSTRIAS SYPZEMID E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AGROINDUSTRIAS SYPZEMID E.I.R.L.', NULL, '20604123756', 'NRO. 2 OTR. LATERAL VIÑA LUZMILA AREQUIPA - AREQUIPA - SANTA RITA DE SIGUAS', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20604123756');

SET @eid_20604123756 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20604123756' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20604123756, 'VICTOR HUGO', 'ZEGARRA ZEGARRA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20604123756 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20604123756 AND nombres='VICTOR HUGO');

-- empresa 99: FUTUREMIN S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'FUTUREMIN S.A.C.', NULL, '20565443721', 'AV. PASEO DE LA REPUBLICA NRO. 795 (SEGUNDO PISO) LIMA - LIMA - LA VICTORIA', NULL, NULL, 'activo', 'Futuremin is a Lab for innovation in extractive industries. We provide mentoring, meetups space to entrepreneurs w/ great ideas and execution capabilities', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20565443721');

SET @eid_20565443721 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20565443721' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20565443721, 'JAIME ARTURO', 'CORAL ALAMO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20565443721 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20565443721 AND nombres='JAIME ARTURO');

-- empresa 100: LOLI CO. S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'LOLI CO. S.A.C.', NULL, '20605691341', 'CAL.TULIPANES NRO. 150 INT. 9 URB. POLO HUNT (FRENTE A LA EMBAJADA DE EEUU) LIMA - LIMA - SANTIAGO DE SURCO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605691341');

SET @eid_20605691341 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605691341' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605691341, 'TANNY MARIBEL', 'LOLI AVALOS', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20605691341 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605691341 AND nombres='TANNY MARIBEL');

-- empresa 101: FABRICACIONES METALICAS L. MENDOZA EIRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'FABRICACIONES METALICAS L. MENDOZA EIRL', NULL, '20121656419', 'CAL.MALECON PROGRESISTA MZA. Q LOTE. 11 URB. PROGRESISTA AREQUIPA - AREQUIPA - PAUCARPATA', '959402126', 'gerencia@famelm.com.pe-', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20121656419');

SET @eid_20121656419 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20121656419' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20121656419, 'LUIS ALBERTO', 'MENDOZA MORON', 'Representante Legal', 'gerencia@famelm.com.pe-', '959402126', 'activo', 1, NOW()
WHERE @eid_20121656419 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20121656419 AND correo='gerencia@famelm.com.pe-');

-- empresa 102: KAFI WASI S.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'KAFI WASI S.R.L.', NULL, '20604056005', 'CAL.PUENTE BOLOGNESI NRO. 216 (MEDIA CUADRA DE LA PLAZA DE ARMAS) AREQUIPA - AREQUIPA - AREQUIPA', '973 619 428', 'kafiwasi@hotmail.com', 'activo', 'Kafi Wasi, casa del café en quechua, es una cafetería de especialidad, ubicada en Arequipa. Nuestra misión es ofrecer productos de calidad en base a café y nuestra visión es apostar por el crecimiento de la cultura cafetera en la región.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20604056005');

SET @eid_20604056005 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20604056005' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20604056005, 'PINTO DIEGO', 'CISNEROS', 'Representante Legal', 'kafiwasi@hotmail.com', '973 619 428', 'activo', 1, NOW()
WHERE @eid_20604056005 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20604056005 AND correo='kafiwasi@hotmail.com');

-- empresa 103: TCONCRETO S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'TCONCRETO S.A.C.', NULL, '20610644491', 'CAL.AUGUSTO TAMAYO NRO. 154 INT. 401 (AL COSTADO DE CONFIEP) LIMA - LIMA - SAN ISIDRO', '979 701 543', NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610644491');

SET @eid_20610644491 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610644491' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610644491, 'NICOLAS RICARDO', 'SEVIL CAPURRO', 'Representante Legal', NULL, '979 701 543', 'activo', 1, NOW()
WHERE @eid_20610644491 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610644491 AND nombres='NICOLAS RICARDO');

-- empresa 104: TINKU NATURAL S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'TINKU NATURAL S.A.C.', NULL, '20603343019', 'JOSE DE LA TORRE UGARTE NRO. 155 DPTO. 101 LIMA - LIMA - MIRAFLORES', '977 891 671', 'ventas@productostinku.com', 'activo', 'Somos una empresa Desarrolladora de Suplementos Naturales. Toda nuestra linea es de la más alta calidad. Certificado BPM, FDA.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20603343019');

SET @eid_20603343019 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20603343019' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20603343019, 'MAZZA HARRY', 'ODAR', 'Representante Legal', 'ventas@productostinku.com', '977 891 671', 'activo', 1, NOW()
WHERE @eid_20603343019 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20603343019 AND correo='ventas@productostinku.com');

-- empresa 105: OMIA COFFEE E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'OMIA COFFEE E.I.R.L.', NULL, '20603661533', 'AV. 05 DE FEBRERO NRO. 635 (A 1 CDRA DE LA PLAZA DE ARMAS) AMAZONAS - RODRIGUEZ DE MENDOZA - OMIA', '900 592 630', 'omiacoffee20@gmail.com', 'activo', 'Empresa dedicada a la compra y venta de café en grano de oro, tostado y molido con agricultores capacitados para una buena producción de café', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20603661533');

SET @eid_20603661533 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20603661533' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20603661533, 'AGUILA ADELMO', 'BECERRIL DEL', 'Representante Legal', 'omiacoffee20@gmail.com', '900 592 630', 'activo', 1, NOW()
WHERE @eid_20603661533 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20603661533 AND correo='omiacoffee20@gmail.com');

-- empresa 106: URBANAS GESCON S.A. C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'URBANAS GESCON S.A. C.', NULL, '20600738632', 'JR. ALDEBARAN NRO. 320 URB. LOS CISNES LIMA - LIMA - SANTIAGO DE SURCO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20600738632');

SET @eid_20600738632 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20600738632' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20600738632, 'ALDO RAFAEL', 'CHU WAN', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20600738632 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20600738632 AND nombres='ALDO RAFAEL');

-- empresa 107108: CORPORACION ZOETEX E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'CORPORACION ZOETEX E.I.R.L.', NULL, '20566423406', 'AV. NICOLAS ARRIOLA NRO. 2079 DPTO. 2DO URB. FORTIS LIMA - LIMA - LA VICTORIA', '938 853 831', 'l.alexito15@gmail.com', 'activo', 'VENTA DE TELAS DEPORTIVAS AL X MAYOR Y MENOR #DRY FIT #WIN FRESH #POLYADIDAS #POLYCUADROS #INTERFIL #WIN JASPEADO #WIN JASPEADO PERCHADO #POLYESTRESH #MALLAS DEPORTIVAS #RIB 2X1 2X2', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20566423406');

SET @eid_20566423406 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20566423406' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20566423406, 'DINA JESUS', 'VISAGEL MONZON', 'Representante Legal', 'l.alexito15@gmail.com', '938 853 831', 'activo', 1, NOW()
WHERE @eid_20566423406 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20566423406 AND correo='l.alexito15@gmail.com');

-- empresa 109: PARQUE ECOTURISTICO ARENAL EXTREMO SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'PARQUE ECOTURISTICO ARENAL EXTREMO SAC', NULL, '20610941916', 'JR. CHACHAPOYAS NRO. 411 AMAZONAS - BAGUA - LA PECA', '914', 'info@peaextremo.pe', 'activo', '¡Bienvenido a nuestro parque turístico, un oasis de vida en medio de la naturaleza! Explora senderos vibrantes, sumérgete en la biodiversidad y disfruta de un restaurante con sabores auténticos. Con camping y aventuras inolvidables. ¡Vive la aventura!', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610941916');

SET @eid_20610941916 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610941916' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610941916, 'DELGADO ORLANDO', 'BURGA', 'Representante Legal', 'info@peaextremo.pe', '914', 'activo', 1, NOW()
WHERE @eid_20610941916 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610941916 AND correo='info@peaextremo.pe');

-- empresa 110: ITTACCA EXPERIENCE S. A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ITTACCA EXPERIENCE S. A.C.', NULL, '20602857612', 'CAL.TARATA NRO. 220 URB. LEURO LIMA - LIMA - MIRAFLORES', '980 907 207', 'info@ittaccaexperience.com-', 'activo', 'Somos diseñadores de experiencias. Creamos programas exclusivos para que cada turista viva al máxi', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20602857612');

SET @eid_20602857612 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20602857612' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20602857612, 'CARMEN PATRICIA', 'MOLINA VIVANCO', 'Representante Legal', 'info@ittaccaexperience.com-', '980 907 207', 'activo', 1, NOW()
WHERE @eid_20602857612 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20602857612 AND correo='info@ittaccaexperience.com-');

-- empresa 111: ESTUDIO CONTABLE LORENZO RAMIREZ QUINTEROS S.A.C
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ESTUDIO CONTABLE LORENZO RAMIREZ QUINTEROS S.A.C', NULL, '20544573595', 'AV. SANTA ANITA NRO. 103 URB. VILLA MARINA (MERCADO SARITA COLONIA) LIMA - LIMA - CHORRILLOS', '987 756 571', 'ec_lramirezq@hotmail.com', 'activo', 'Paga los impuestos necesarios, no más. Evita problemas. Vive tranquilo.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20544573595');

SET @eid_20544573595 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20544573595' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20544573595, 'JESUS JAVIER', 'RAMIREZ LUDEÑA', 'Representante Legal', 'ec_lramirezq@hotmail.com', '987 756 571', 'activo', 1, NOW()
WHERE @eid_20544573595 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20544573595 AND correo='ec_lramirezq@hotmail.com');

-- empresa 112: J M ASESORES EMPRESARIALES SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'J M ASESORES EMPRESARIALES SAC', NULL, '20601319366', 'AV. FRANCISCO LAZO NRO. 1777 DPTO. 201 LIMA - LIMA - LINCE', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601319366');

SET @eid_20601319366 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601319366' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20601319366, 'ATOCHE JADDY', 'MERINO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20601319366 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20601319366 AND nombres='ATOCHE JADDY');

-- empresa 113: TRANSPORTE & LOGISTICA CABA E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'TRANSPORTE & LOGISTICA CABA E.I.R.L.', NULL, '20606037202', 'CAL.ELVIRA GARCIA Y GARCIA NRO. 262 C.H. CARLOS CUETO FERNANDINI 2DA ET. (ALT CDRA 46 DE AV LAS PALMERAS) LIMA - LIMA - LOS OLIVOS', NULL, NULL, 'activo', 'Transporte CABA es una empresa que se constituye en el servicios de transporte logístico por carretera. Contamos con personal capacitado y especializado para brindar un eficiente servicio con calidad y seguridad.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606037202');

SET @eid_20606037202 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606037202' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606037202, 'SHARON YANETH', 'CASTRO AGUIRRE', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20606037202 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606037202 AND nombres='SHARON YANETH');

-- empresa 114: CORPORACIÓN IGG S.A. C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'CORPORACIÓN IGG S.A. C.', NULL, '20611448083', 'JR. CIRCUNVALACION CUMBAZA NRO. 331 URB. PJ. 9 DE ABRIL SAN MARTIN - SAN MARTIN - TARAPOTO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20611448083');

SET @eid_20611448083 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20611448083' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20611448083, 'GOMEZ ISRAEL', 'GARCIA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20611448083 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20611448083 AND nombres='GOMEZ ISRAEL');

-- empresa 115: ADHITIVOS E INDUSTRIAS SAN MARTIN S.A.C
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ADHITIVOS E INDUSTRIAS SAN MARTIN S.A.C', NULL, '20609176351', 'AV. VIA DE EVITAMIENTO 1 NRO. SN (ESQUINA CON AV. CUMBAZA CUADRA 1) SAN MARTIN - SAN MARTIN - TARAPOTO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20609176351');

SET @eid_20609176351 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20609176351' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20609176351, 'BANDA MIGUEL', 'RUBIO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20609176351 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20609176351 AND nombres='BANDA MIGUEL');

-- empresa 116: ASTETE CORREDORES DE SEGUROS SOCIEDAD ANONIMA CERRADA ASTETE CORREDORES DE SEGUROS SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ASTETE CORREDORES DE SEGUROS SOCIEDAD ANONIMA CERRADA ASTETE CORREDORES DE SEGUROS SAC', NULL, '20566203031', 'JR. CORONEL INCLAN NRO. 174 LIMA - LIMA - SAN MIGUEL', '998 343 893', 'aldo@astete.pe', 'activo', 'Somos especialistas en seguros personales (médicos, vehiculares, de vida, hogar) y de empresa (SCTR', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20566203031');

SET @eid_20566203031 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20566203031' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20566203031, 'ALDO ARMANDO', 'ASTETE VASQUEZ', 'Representante Legal', 'aldo@astete.pe', '998 343 893', 'activo', 1, NOW()
WHERE @eid_20566203031 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20566203031 AND correo='aldo@astete.pe');

-- empresa 117: FLOWERCORP SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'FLOWERCORP SAC', NULL, '20605004645', 'CAL.FRAY ANGELICO NRO. 429 DPTO. 301 LIMA - LIMA - SAN BORJA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605004645');

SET @eid_20605004645 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605004645' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605004645, 'MONICA JIMENA', 'ROUILLON PAREDES', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20605004645 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605004645 AND nombres='MONICA JIMENA');

-- empresa 118: GRUPO FSR PERU S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'GRUPO FSR PERU S.A.C.', NULL, '20610082743', 'CAL.LUIS NATALIO SAENZ NRO. 348 DPTO. 101 FND. OYAGUE LIMA - LIMA - JESUS MARIA', '9924 | 917 430 006', 'asesoria@fsr.com.pe-', 'activo', 'Asesoramiento en la tramitación municipal, registral y mejora de la rentabilidad de sus proyectos de desarrollo inmobiliario y saneamiento de inmuebles.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610082743');

SET @eid_20610082743 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610082743' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610082743, 'MANUEL MARTIN', 'FASABI ESPINAR', 'Representante Legal', 'asesoria@fsr.com.pe-', '9924 | 917 430 006', 'activo', 1, NOW()
WHERE @eid_20610082743 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610082743 AND correo='asesoria@fsr.com.pe-');

-- empresa 119: OPERADOR LOGISTICO J & L S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'OPERADOR LOGISTICO J & L S.A.C.', NULL, '20610325557', 'MZA. 5 LOTE. 18 A.H. PACHACUTEC PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - VENTANILLA', '914 907 555', 'comercial@operadorlogisticojv.pe-', 'activo', 'Empresa que brinda servicios de personal que se encarga de estibar o clasificar carga en importaciones exportaciones o trasegar mercadería de contenedores o carga suelta.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610325557');

SET @eid_20610325557 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610325557' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610325557, 'VILLA JUANA', 'LOPEZ DE', 'Representante Legal', 'comercial@operadorlogisticojv.pe-', '914 907 555', 'activo', 1, NOW()
WHERE @eid_20610325557 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610325557 AND correo='comercial@operadorlogisticojv.pe-');

-- empresa 120: AMAZON ANDEAN TRAVEL AGENCY SOCIEDAD ANONIMA CERRADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AMAZON ANDEAN TRAVEL AGENCY SOCIEDAD ANONIMA CERRADA', NULL, '20509727555', 'CAL.GENERAL FRANCISCO VALLE RIESTRA NRO. 915 URB. COLMENARES LIMA - LIMA - PUEBLO LIBRE (MAGDALENA VIEJA)', '947 117 318', 'reservas1@andeantravel.net-', 'activo', 'Ofrecemos personalizables viajes de alta calidad. --------------------------------------- We provid', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20509727555');

SET @eid_20509727555 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20509727555' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20509727555, 'GOMEZ ROGERS', 'ALVAREZ', 'Representante Legal', 'reservas1@andeantravel.net-', '947 117 318', 'activo', 1, NOW()
WHERE @eid_20509727555 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20509727555 AND correo='reservas1@andeantravel.net-');

-- empresa 121: MVS INFRAESTRUCTURA Y SISTEMAS EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'MVS INFRAESTRUCTURA Y SISTEMAS EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA', NULL, '20494109647', 'CAL.LOS PRECURSORES NRO. 384 URB. BANCARIOS LAMBAYEQUE - CHICLAYO - CHICLAYO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20494109647');

SET @eid_20494109647 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20494109647' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20494109647, 'CHAMACHE MARLLURY', 'PILCO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20494109647 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20494109647 AND nombres='CHAMACHE MARLLURY');

-- empresa 122: COFFEE FRIENDS S.A.C
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'COFFEE FRIENDS S.A.C', NULL, '20604498091', 'AV. CHACHAPOYAS NRO. 3509 SEC. SAN LUIS (FRENTE A ESTACION SERV UTCUBAMBA EIRL) AMAZONAS - UTCUBAMBA - BAGUA GRANDE', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20604498091');

SET @eid_20604498091 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20604498091' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20604498091, 'HECTOR ANTONIO', 'OBLITAS FRIAS', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20604498091 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20604498091 AND nombres='HECTOR ANTONIO');

-- empresa 123: SOFTHY SOLUCIONES EN SOFTWARE S.A.C. - SOFTHY S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SOFTHY SOLUCIONES EN SOFTWARE S.A.C. - SOFTHY S.A.C.', NULL, '20600317807', 'AV. ROOSEVELT NRO. 6519 URB. SANTA RITA LIMA - LIMA - SANTIAGO DE SURCO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20600317807');

SET @eid_20600317807 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20600317807' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20600317807, 'MARCO ANTONIO', 'FLORES GONZALES', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20600317807 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20600317807 AND nombres='MARCO ANTONIO');

-- empresa 124: DERMOFARMACIA BELLA CURET S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'DERMOFARMACIA BELLA CURET S.A.C.', NULL, '20602592457', 'AV. ABEL B DU PETIT THOUARS NRO. 4373 INT. A URB. BARBONCITO LIMA - LIMA - MIRAFLORES', '923 088 747', 'litabenavidez@bella-curet.com', 'activo', 'Bella Curet es una empresa adventista cuyos valores y principios se basan en la palabra de Dios. Somos una Dermofarmacia especializada en preparados magistrales, brindando productos de alta efectividad y compartiendo un mensaje de esperanza.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20602592457');

SET @eid_20602592457 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20602592457' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20602592457, 'LITA ELENA', 'BENAVIDEZ TERAN', 'Representante Legal', 'litabenavidez@bella-curet.com', '923 088 747', 'activo', 1, NOW()
WHERE @eid_20602592457 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20602592457 AND correo='litabenavidez@bella-curet.com');

-- empresa 125: MULTISERVICIOS CONSTRUCCIONES Y NEGOCIOS R & G EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'MULTISERVICIOS CONSTRUCCIONES Y NEGOCIOS R & G EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA', NULL, '20611160004', 'CAL.UNION NRO. 604 (COSTADO DE PARADERO SONDOR) PIURA - HUANCABAMBA - HUANCABAMBA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20611160004');

SET @eid_20611160004 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20611160004' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20611160004, 'CARRANZA ROSA', 'MELENDRES', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20611160004 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20611160004 AND nombres='CARRANZA ROSA');

-- empresa 126: CAF PERU SERVICIOS GENERALES E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'CAF PERU SERVICIOS GENERALES E.I.R.L.', NULL, '20609391414', 'CAL.DOÑA NELLY NRO. 520 DPTO. 201 URB. SANTA ROSA DE SURCO LIMA - LIMA - SANTIAGO DE SURCO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20609391414');

SET @eid_20609391414 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20609391414' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20609391414, 'CHRISTA INES', 'ANTUÑANO FIGUEROA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20609391414 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20609391414 AND nombres='CHRISTA INES');

-- empresa 127: AYAHUASCA COMPANY SOCIEDAD ANONIMA CERRADA - AYACOM S.A. C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AYAHUASCA COMPANY SOCIEDAD ANONIMA CERRADA - AYACOM S.A. C.', NULL, '20602778879', 'CAL.CAHUIDE NRO. 25 A.H. JUAN CARLOS DEL AGULA (ENTRE SAN ANTONIO Y AREQUIPA) LORETO - MAYNAS - IQUITOS', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20602778879');

SET @eid_20602778879 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20602778879' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20602778879, 'JAMES HARRINSON', 'VASQUEZ PAPA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20602778879 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20602778879 AND nombres='JAMES HARRINSON');

-- empresa 128: QUAMA GROUP LATAM S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'QUAMA GROUP LATAM S.A.C.', NULL, '20604424128', 'AV. FRANCISCO MARIATEGUI NRO. 1732 DPTO. 201 (CUADRA 18 DE LA BRASIL) LIMA - LIMA - JESUS MARIA', '924 178 960', 'hola@quama.pe', 'activo', 'Somos una consultora peruana orientada a ofrecer servicios y soluciones en Sistemas de Gestión ISO,', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20604424128');

SET @eid_20604424128 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20604424128' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20604424128, 'WILMER JHUNIOR', 'ZUTA SOPLIN', 'Representante Legal', 'hola@quama.pe', '924 178 960', 'activo', 1, NOW()
WHERE @eid_20604424128 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20604424128 AND correo='hola@quama.pe');

-- empresa 129: VALDIVAL CORP E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'VALDIVAL CORP E.I.R.L.', NULL, '20609350947', 'CAL.SAN JOSE NRO. 631 CERCADO DE CHICLAYO LAMBAYEQUE - CHICLAYO - CHICLAYO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20609350947');

SET @eid_20609350947 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20609350947' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20609350947, 'JUAN ARTURO', 'VALDIVIESO VALDIVIESO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20609350947 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20609350947 AND nombres='JUAN ARTURO');

-- empresa 130: SERVICIOS GENERALES CRISTHIAN JOEL SOCIEDAD ANONIMA CERRADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SERVICIOS GENERALES CRISTHIAN JOEL SOCIEDAD ANONIMA CERRADA', NULL, '20607700991', 'MZA. A LOTE. 0029 CAS. NUEVO PORVENIR (CERCA AL ESTADIO DEPORTIVO) PIURA - HUANCABAMBA - SONDORILLO', NULL, 'santosmijahuancasegundo@gmail.com', 'activo', 'Venta de toda clase de ferretería, fierro, cemento, agregados al por mayor y menor.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20607700991');

SET @eid_20607700991 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20607700991' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20607700991, 'MIJAHUANCA SEGUNDO', 'SANTOS', 'Representante Legal', 'santosmijahuancasegundo@gmail.com', NULL, 'activo', 1, NOW()
WHERE @eid_20607700991 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20607700991 AND correo='santosmijahuancasegundo@gmail.com');

-- empresa 131: TOTEM MULTIMEDIA E.I. R.L
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'TOTEM MULTIMEDIA E.I. R.L', NULL, '20601809541', 'JR. LOS BRILLANTES NRO. 621 INT. F503 URB. SANTA INES 2 ETAPA LA LIBERTAD - TRUJILLO - TRUJILLO', '950 740 569', 'cuentas@totemultimedia.com-', 'activo', 'Agencia de comunicaciones. Soluciones en marketing, publicidad, videos corporativos y RR.PP.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601809541');

SET @eid_20601809541 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601809541' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20601809541, 'ANTONIO JUAN HUMBERTO', 'MUÑOZ VASQUEZ', 'Representante Legal', 'cuentas@totemultimedia.com-', '950 740 569', 'activo', 1, NOW()
WHERE @eid_20601809541 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20601809541 AND correo='cuentas@totemultimedia.com-');

-- empresa 132: PASION Y CHOCOLATE PUCALLPA S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'PASION Y CHOCOLATE PUCALLPA S.A.C.', NULL, '20609646340', 'JR. TARAPACA NRO. 621 URB. CERCADO DE PUCALLPA (AL FRENTE DE LA PLAZA DE ARMAS) UCAYALI - CORONEL PORTILLO - CALLERIA', '961 572 520', 'pasionychocolate.ventas@gmail.com', 'activo', 'PASION & CHOCOLATE Chocolateria fina artesanal', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20609646340');

SET @eid_20609646340 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20609646340' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20609646340, 'LOPEZ GUILLERMO', 'HERRERA', 'Representante Legal', 'pasionychocolate.ventas@gmail.com', '961 572 520', 'activo', 1, NOW()
WHERE @eid_20609646340 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20609646340 AND correo='pasionychocolate.ventas@gmail.com');

-- empresa 133: GRUPO MERAK S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'GRUPO MERAK S.A.C.', NULL, '20610761641', 'AV. SAN MARTIN NRO. 213 LIMA - LIMA - BARRANCO', '(01) 2846645', 'informes@grupomerack.com', 'activo', 'Laboratorio certificado con BPM, brinda los servicios de Almacenamiento, reacondicionado y transporte de productos farmaceuticos y sanitarios', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610761641');

SET @eid_20610761641 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610761641' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610761641, 'MIGUEL ENRIQUE', 'MEJIA AGURTO', 'Representante Legal', 'informes@grupomerack.com', '(01) 2846645', 'activo', 1, NOW()
WHERE @eid_20610761641 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610761641 AND correo='informes@grupomerack.com');

-- empresa 134: STEACKHOUSE S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'STEACKHOUSE S.A.C.', NULL, '20607906638', 'JR. JOSÉ SANTOS CHOCANO NRO. S/N SEC. PAMPA DEL CARMEN (C/C AV. CIRCUNVALACIÓN FRENTE A LOZA DEP) JUNIN - CHANCHAMAYO - CHANCHAMAYO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20607906638');

SET @eid_20607906638 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20607906638' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20607906638, 'SHALLEY CONNIE MARJJORETT', 'ESPINOZA YANCE', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20607906638 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20607906638 AND nombres='SHALLEY CONNIE MARJJORETT');

-- empresa 135: ARFISH S.A.C
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ARFISH S.A.C', NULL, '20606941511', 'JR. 28 DE JULIO NRO. 266 (A 2CDRAS DE LA PLAZA DE ARMAS) HUANUCO - AMBO - AMBO', NULL, NULL, 'activo', 'Somos una compañía dedicada a la venta de filete de trucha, trucha entera y eviscerada cumpliendo', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606941511');

SET @eid_20606941511 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606941511' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606941511, 'GONZALES EDUARDO', 'ALARCON', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20606941511 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606941511 AND nombres='GONZALES EDUARDO');

-- empresa 136: GRUPO 27 S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'GRUPO 27 S.A.C.', NULL, '20521413035', 'AV. PRINCIPAL NRO. 925 DPTO. 903 URB. LOS SAUCES ETAPA 2 LIMA - LIMA - SURQUILLO', '967 674 849', 'franzua202109@gmail.com', 'activo', 'Servicio de transporte personal turistico y otros', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20521413035');

SET @eid_20521413035 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20521413035' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20521413035, 'LUIS RICARDO', 'YULI LANDA', 'Representante Legal', 'franzua202109@gmail.com', '967 674 849', 'activo', 1, NOW()
WHERE @eid_20521413035 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20521413035 AND correo='franzua202109@gmail.com');

-- empresa 137: GSYSTEMLA S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'GSYSTEMLA S.A.C.', NULL, '20605498061', 'AV. ABANCAY NRO. 210 URB. BARRIOS ALTOS (PISO 7 - OFICINA 701) LIMA - LIMA - LIMA', '959355747', 'contacto@gsystemperu.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605498061');

SET @eid_20605498061 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605498061' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605498061, 'RUEDA DANIEL', 'GARIBAY', 'Representante Legal', 'contacto@gsystemperu.com', '959355747', 'activo', 1, NOW()
WHERE @eid_20605498061 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605498061 AND correo='contacto@gsystemperu.com');

-- empresa 138: AMELDATANET S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AMELDATANET S.A.C.', NULL, '20524975581', 'AV. TUPAC AMARU NRO. 305 URB. CARABAYLLO (ALT DE BANCO DE LA NACION) LIMA - LIMA - COMAS', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20524975581');

SET @eid_20524975581 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20524975581' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20524975581, 'MEDINA DAVID', 'BALCAZAR', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20524975581 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20524975581 AND nombres='MEDINA DAVID');

-- empresa 139: VALER CONTRATISTAS GENERALES S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'VALER CONTRATISTAS GENERALES S.A.C.', NULL, '20537610469', 'JR. IQUITOS NRO. 149 URB. JOSE GALVEZ (PARADERO 7) LIMA - LIMA - VILLA MARIA DEL TRIUNFO', NULL, NULL, 'activo', 'SOMOS UNA EMPRESA QUE HACE TODO TIPO DE TRABAJOS DE DRYWALL, MELAMINA Y MADERA', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20537610469');

SET @eid_20537610469 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20537610469' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20537610469, 'VALER YNES', 'VALVERDE', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20537610469 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20537610469 AND nombres='VALER YNES');

-- empresa 140: G & A LASER Y CNC S.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'G & A LASER Y CNC S.R.L.', NULL, '20604840351', 'AV. GOYENECHE NRO. 808 AREQUIPA - AREQUIPA - MIRAFLORES', '(054) 610655', 'gya.laserycnc@gmail.com', 'activo', 'Laser y CNC ROUTER - Corte y Grabado', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20604840351');

SET @eid_20604840351 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20604840351' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20604840351, 'JORGE LUIS', 'LUQUE CANAZA', 'Representante Legal', 'gya.laserycnc@gmail.com', '(054) 610655', 'activo', 1, NOW()
WHERE @eid_20604840351 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20604840351 AND correo='gya.laserycnc@gmail.com');

-- empresa 141: LORATECH S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'LORATECH S.A.C.', NULL, '20605949054', 'CAL.MARIA PARADO DE BELLIDO NRO. 165 LIMA - LIMA - MAGDALENA DEL MAR', '913 703 436', 'gerencia@loratech.pe', 'activo', 'Soluciones Tecnológicas de IoT Inteligente para una vida conectada.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605949054');

SET @eid_20605949054 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605949054' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605949054, 'FRYDLEWSKI MANUEL', 'BEHAR', 'Representante Legal', 'gerencia@loratech.pe', '913 703 436', 'activo', 1, NOW()
WHERE @eid_20605949054 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605949054 AND correo='gerencia@loratech.pe');

-- empresa 142: MATIGLAS EIRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'MATIGLAS EIRL', NULL, '20565641795', 'MZA. Q LOTE. 13 URB. LOS JAZMINES ETP.4 (ALTURA PARADERO LADA) PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - CALLAO', '932 410 297', 'matiglas.2014@gmail.com', 'activo', 'Brindar servicios que excedan las expectativas de nuestros clientes ,garantizando calidad', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20565641795');

SET @eid_20565641795 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20565641795' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20565641795, 'JORGE LUIS', 'GARCIA CORONADO', 'Representante Legal', 'matiglas.2014@gmail.com', '932 410 297', 'activo', 1, NOW()
WHERE @eid_20565641795 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20565641795 AND correo='matiglas.2014@gmail.com');

-- empresa 143: IMPULSA INVERSIONES Y SOLUCIONES E.I.R.L. - IMVERSO E.I.R.L
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'IMPULSA INVERSIONES Y SOLUCIONES E.I.R.L. - IMVERSO E.I.R.L', NULL, '20455339210', 'OTR.--------- MZA. B LOTE. 11 URB. LA ESPERANZA - ADEPA AREQUIPA - AREQUIPA - JOSE LUIS BUSTAMANTE Y RIVERO', '923 469 723', 'info@imverso.info', 'activo', '“Somos una empresa competitiva dedicada a brindar soluciones acorde a las necesidades tecnológicas, desarrollado por equipo de trabajo comprometido y direccionado al servicio; trabajando bajo el enfoque de mejora continua”.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20455339210');

SET @eid_20455339210 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20455339210' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20455339210, 'ARIAS JESSICA', 'HUAMAN', 'Representante Legal', 'info@imverso.info', '923 469 723', 'activo', 1, NOW()
WHERE @eid_20455339210 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20455339210 AND correo='info@imverso.info');

-- empresa 144: VITE OPERATIONS SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'VITE OPERATIONS SAC', NULL, '20604044899', 'AV. DE LA AVIACION NRO. 480 URB. SURQUILLO LIMA - LIMA - MIRAFLORES', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20604044899');

SET @eid_20604044899 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20604044899' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20604044899, 'KAN JAVIER ELIAS', 'MURIANO LON', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20604044899 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20604044899 AND nombres='KAN JAVIER ELIAS');

-- empresa 145: FUNGI TERRAE S.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'FUNGI TERRAE S.R.L.', NULL, '20603740522', 'CAL.DOS DE MAYO NRO. 543 URB. SURQUILLO LIMA - LIMA - MIRAFLORES', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20603740522');

SET @eid_20603740522 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20603740522' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20603740522, 'EDDY FERNANDO', 'ELESPURO SOTO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20603740522 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20603740522 AND nombres='EDDY FERNANDO');

-- empresa 146: ANGELITOS PET´S E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ANGELITOS PET´S E.I.R.L.', NULL, '20511024103', 'AV. SAN LUIS NRO. 2245 URB. SAN BORJA SUR (CRUZE DE SAN LUIS Y SAN BORJA NORTE) LIMA - LIMA - SAN BORJA', '996 137 783', NULL, 'activo', 'En Veterinaria Angelitos cuidamos de tus mascotas como si fueran nuestros. Ofrecemos servicios de baño, corte, consultas y mucho más.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20511024103');

SET @eid_20511024103 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20511024103' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20511024103, '', '', 'Representante Legal', NULL, '996 137 783', 'activo', 1, NOW()
WHERE @eid_20511024103 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20511024103 AND nombres='');

-- empresa 147: SOLAR AUTOMOTRIZ EIRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SOLAR AUTOMOTRIZ EIRL', NULL, '20492363368', 'AV. ALFREDO FRANCO NRO. 120 URB. CHAMA (A 1 CDRA.DE OVALO HIGUERETA-GRIFO PRIMAX) LIMA - LIMA - SANTIAGO DE SURCO', '998 317 898', 'solarautomotriz@hotmail.com', 'activo', 'Taller multimarca sirviendo desde hace 24 años a nuestros clientes con transparencia y confianza', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20492363368');

SET @eid_20492363368 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20492363368' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20492363368, 'LUIS CARLOS', 'CERRON MARQUEZ', 'Representante Legal', 'solarautomotriz@hotmail.com', '998 317 898', 'activo', 1, NOW()
WHERE @eid_20492363368 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20492363368 AND correo='solarautomotriz@hotmail.com');

-- empresa 148: TEAM INNOVATION SYCT SOCIEDAD ANONIMA CERRADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'TEAM INNOVATION SYCT SOCIEDAD ANONIMA CERRADA', NULL, '20610173978', 'AV. INTEROSEANICA NRO. SN FND. FND. SEC SANTA ROSA FUNDO YARAVICO MOQUEGUA - MARISCAL NIETO - SAN ANTONIO', '999 007 199', 'informes@tisyct.com', 'activo', 'Equipo especializado en construcción y servicios de alta calidad Destacamos en mantenimiento mecánico, diseño y fabricación de estructuras metálicas y suministro de repuestos Garantizamos éxito en cada proyecto con asesoría integral y ejecución meticulosa', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610173978');

SET @eid_20610173978 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610173978' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610173978, 'MIRIAN NOELIA', 'CHIPANA TOLEDO', 'Representante Legal', 'informes@tisyct.com', '999 007 199', 'activo', 1, NOW()
WHERE @eid_20610173978 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610173978 AND correo='informes@tisyct.com');

-- empresa 149: PERUCONTROLCOM EIRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'PERUCONTROLCOM EIRL', NULL, '20539641922', 'MZA. A LOTE. 16 URB. VILLA MANUELITO (CERRO JULY) AREQUIPA - AREQUIPA - JOSE LUIS BUSTAMANTE Y RIVERO', '941 593 166', NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20539641922');

SET @eid_20539641922 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20539641922' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20539641922, 'WILLIAM OMAR', 'MOREYRA AURIS', 'Representante Legal', NULL, '941 593 166', 'activo', 1, NOW()
WHERE @eid_20539641922 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20539641922 AND nombres='WILLIAM OMAR');

-- empresa 150: ECOTEXTIL MODA SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ECOTEXTIL MODA SAC', NULL, '20607598224', 'JR. LOS DIAMANTES NRO. 128 URB. BALCONCILLO LIMA - LIMA - LA VICTORIA', NULL, 'ecotextilmoda20@gmail.com', 'activo', 'Empresa socialmente responsable especializada en el diseño y confección de merchandising textil.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20607598224');

SET @eid_20607598224 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20607598224' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20607598224, 'CHONG JONATHAN', 'VASQUEZ SUI', 'Representante Legal', 'ecotextilmoda20@gmail.com', NULL, 'activo', 1, NOW()
WHERE @eid_20607598224 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20607598224 AND correo='ecotextilmoda20@gmail.com');

-- empresa 151: EDUCANDO FUTURO AMANECER EIRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'EDUCANDO FUTURO AMANECER EIRL', NULL, '20606823429', 'CAL.GARCILAZO DE LA VEGA - PAIS PERU NRO. 618 (PAIS DE PERU) CAJAMARCA - JAEN - JAEN', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606823429');

SET @eid_20606823429 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606823429' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606823429, 'CINTHYA FABIOLA', 'CASTILLO CAMACHO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20606823429 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606823429 AND nombres='CINTHYA FABIOLA');

-- empresa 152: ELEMENTO CHOCOLATES S.A.C
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ELEMENTO CHOCOLATES S.A.C', NULL, '20602462022', 'JR. SINCHI ROCA NRO. 2372 URB. RISSO LIMA - LIMA - LINCE', '920 102 729', 'miguel@elementochocolates.com', 'activo', '🤲🏻| #ChocolateMakers 🍫| #ChocolateDeOrigen 🤝| Directly Traded #ChocolateConPropósito', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20602462022');

SET @eid_20602462022 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20602462022' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20602462022, 'MIGUEL ALONSO', 'MARROU OSORES', 'Representante Legal', 'miguel@elementochocolates.com', '920 102 729', 'activo', 1, NOW()
WHERE @eid_20602462022 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20602462022 AND correo='miguel@elementochocolates.com');

-- empresa 153: ABA PERU S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ABA PERU S.A.C.', NULL, '20609944359', 'CAL.LUIS PIRANDELLO NRO. 248 URB. SAN BORJA SUR LIMA - LIMA - SAN BORJA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20609944359');

SET @eid_20609944359 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20609944359' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20609944359, 'DIEGO CESAR/ FERNANDEZ CISNEROS JOSELYN CAROLINA', 'VIDALON CASTRO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20609944359 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20609944359 AND nombres='DIEGO CESAR/ FERNANDEZ CISNEROS JOSELYN CAROLINA');

-- empresa 154: AUTOMATIZACION INDUSTRIAL PERU E.I.R.L
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AUTOMATIZACION INDUSTRIAL PERU E.I.R.L', NULL, '20608484176', 'CAL.EL TRIUNFO MZA. B LOTE. 14 INT. A A.H. NESTOR BATANEROS (PISO 1) LIMA - LIMA - SAN JUAN DE MIRAFLORES', '990 660 044', 'sistemasperu2510@gmail.com', 'activo', 'Empresa especializada en comercialización e instalación de PUERTAS DE GARAJE AUTOMÁTICAS a control :', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20608484176');

SET @eid_20608484176 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20608484176' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20608484176, 'PEDREGAL ALCIDES', 'SALAS', 'Representante Legal', 'sistemasperu2510@gmail.com', '990 660 044', 'activo', 1, NOW()
WHERE @eid_20608484176 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20608484176 AND correo='sistemasperu2510@gmail.com');

-- empresa 155: MERCANORTE S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'MERCANORTE S.A.C.', NULL, '20606758431', 'AV. ERNESTO DIEZ CANSECO NRO. 236 INT. 304 URB. TELLO (AL COSTADO DE RENIEC MIRAFLORES) LIMA - LIMA - MIRAFLORES', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606758431');

SET @eid_20606758431 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606758431' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606758431, 'CHAVEZ DORIS', 'DIAZ', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20606758431 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606758431 AND nombres='CHAVEZ DORIS');

-- empresa 156: KEPLER INNOVATION SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'KEPLER INNOVATION SAC', NULL, '20608262157', 'AV. MARGINAL NRO. 700 C.P. AGUAS CLARAS SAN MARTIN - RIOJA - PARDO MIGUEL', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20608262157');

SET @eid_20608262157 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20608262157' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20608262157, 'RODRIGUEZ LUCAS', 'BECERRA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20608262157 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20608262157 AND nombres='RODRIGUEZ LUCAS');

-- empresa 157: FULL BUSINESS GLOBAL EIRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'FULL BUSINESS GLOBAL EIRL', NULL, '20601146950', 'AV. DEL EJERCITO - TORRE B NRO. 1062 DPTO. 402 LIMA - LIMA - MIRAFLORES', '966 814 745', 'info@fullbusinessglobal.com', 'activo', 'Consultora dedicada a fortalecer la internacionalización de las empresas', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601146950');

SET @eid_20601146950 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601146950' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20601146950, 'CESAR DARKWING', 'GUEVARA LINARES', 'Representante Legal', 'info@fullbusinessglobal.com', '966 814 745', 'activo', 1, NOW()
WHERE @eid_20601146950 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20601146950 AND correo='info@fullbusinessglobal.com');

-- empresa 158: KAY PACCHA SOCIEDAD ANONIMA CERRADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'KAY PACCHA SOCIEDAD ANONIMA CERRADA', NULL, '20544976878', 'AV. EMILIO CAVENECIA NRO. 225 DPTO. 307 URB. SANTA CRUZ LIMA - LIMA - SAN ISIDRO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20544976878');

SET @eid_20544976878 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20544976878' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20544976878, 'JUAN ANTONIO', 'PRUDENCIO MORI', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20544976878 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20544976878 AND nombres='JUAN ANTONIO');

-- empresa 159: ALARMAS & TELECOMUNICACIONES S.A.C
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ALARMAS & TELECOMUNICACIONES S.A.C', NULL, '20556691984', 'MZA. 24 LOTE. 3 SEC. NUEVO HORIZONTE LIMA - LIMA - SAN JUAN DE MIRAFLORES', '941 768 643', 'ventas@alarmasseguras.pe/', 'activo', 'Especialistas en seguridad con amplia experiencia en la seguridad tecnológica de hogares y negocios.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20556691984');

SET @eid_20556691984 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20556691984' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20556691984, 'RAFAEL STELIO/ MEDINA MAMANI BRIAN CESAR', 'GONZALES ESCOBAR', 'Representante Legal', 'ventas@alarmasseguras.pe/', '941 768 643', 'activo', 1, NOW()
WHERE @eid_20556691984 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20556691984 AND correo='ventas@alarmasseguras.pe/');

-- empresa 160: CORPORACION DE ALIMENTOS VAPA S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'CORPORACION DE ALIMENTOS VAPA S.A.C.', NULL, '20609792591', 'PRO.RECREO NRO. 2 SEC. VISTA HERMOSA SAN MARTIN - SAN MARTIN - LA BANDA DE SHILCAYO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20609792591');

SET @eid_20609792591 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20609792591' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20609792591, 'JUAN CARLOS', 'VALLES ISLA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20609792591 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20609792591 AND nombres='JUAN CARLOS');

-- empresa 161: ANDINA GARDEN PERU EIRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ANDINA GARDEN PERU EIRL', NULL, '20606035676', 'PJ. LAS DALIAS NRO. 192 URB. SANTA VICTORIA LAMBAYEQUE - CHICLAYO - CHICLAYO', '946 675 269', 'gerencia@andinagardenperu.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606035676');

SET @eid_20606035676 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606035676' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606035676, 'KATHERINE DEL MILAGRO', 'SANTAMARIA BECERRA', 'Representante Legal', 'gerencia@andinagardenperu.com', '946 675 269', 'activo', 1, NOW()
WHERE @eid_20606035676 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606035676 AND correo='gerencia@andinagardenperu.com');

-- empresa 162: AXES PART S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AXES PART S.A.C.', NULL, '20603712341', 'CAL.Z MZA. E LOTE. 20 URB. SANTA ROSA SEGUNDA ETAPA (FRENTE AL REAL PLAZA DE GUARDIA CIVIL) LIMA - LIMA - SANTIAGO DE SURCO', '908 804 674', 'axespart.redes@gmail.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20603712341');

SET @eid_20603712341 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20603712341' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20603712341, 'JOEL ALEX', 'VIGILIO FERRO', 'Representante Legal', 'axespart.redes@gmail.com', '908 804 674', 'activo', 1, NOW()
WHERE @eid_20603712341 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20603712341 AND correo='axespart.redes@gmail.com');

-- empresa 163: SUMA CONTADORES E.I. R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SUMA CONTADORES E.I. R.L.', NULL, '20606159359', 'CAL.PABLO USANDIZAGA NRO. 165 URB. LAS MAGNOLIAS LIMA - LIMA - SAN BORJA', '999 999 999', 'cgaldos@suma-contadores.com', 'activo', 'SUMA CONTADORES ES UNA CONSULTORA CUYA FILOSOFÍA ES EL SERVICIO PERSONALIZADO Y COMPROMISO TOTAL CON EL CRECIMIENTO DEL CLIENTE', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606159359');

SET @eid_20606159359 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606159359' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606159359, 'CATHERINE VEROUSHKA', 'GALDOS CORDOVA', 'Representante Legal', 'cgaldos@suma-contadores.com', '999 999 999', 'activo', 1, NOW()
WHERE @eid_20606159359 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606159359 AND correo='cgaldos@suma-contadores.com');

-- empresa 164: M Y R CONSULTORIA EN SISTEMAS S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'M Y R CONSULTORIA EN SISTEMAS S.A.C.', NULL, '20566473926', 'CAL.33 MZA. G11 LOTE. 26 URB. LOS CEDROS DE VILLA (AL FINAL DE ALAMEDA LOS HORIZONTES) LIMA - LIMA - CHORRILLOS', '51 1 2542335', 'website-sales@myrconsulting.net', 'activo', 'Desarrollo y Mantenimiento de Sistemas, Aplicaciones Web y Apps; Consultoría adaptada a tus necesidades y enfocada a resultados. Transformación Digital.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20566473926');

SET @eid_20566473926 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20566473926' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20566473926, 'RICARDO CESAR', 'LIVELLI SALAZAR', 'Representante Legal', 'website-sales@myrconsulting.net', '51 1 2542335', 'activo', 1, NOW()
WHERE @eid_20566473926 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20566473926 AND correo='website-sales@myrconsulting.net');

-- empresa 165: SERVICIOS INTEGRALES PARA EL AGRO S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SERVICIOS INTEGRALES PARA EL AGRO S.A.C.', NULL, '20603237189', 'AV. VIA DE EVITAMIENTO NRO. 838 SAN MARTIN - SAN MARTIN - TARAPOTO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20603237189');

SET @eid_20603237189 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20603237189' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20603237189, 'WILSON JHONNY', 'VILCAMIZA PEVE', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20603237189 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20603237189 AND nombres='WILSON JHONNY');

-- empresa 166: SIX SIGMA CONSULTORES SRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SIX SIGMA CONSULTORES SRL', NULL, '20486193710', 'BL. 01 NRO. 404 DPTO. 404 C.H. VILLA MERCEDES (ANTES DEL HOSPITAL CARRION) JUNIN - HUANCAYO - HUANCAYO', '918 516 872', 'administracion@csixsigma.com', 'activo', 'Empresa consultora con sólida experiencia en la prestación de servicios de Consultoría, Asesoría, Asistencias Técnicas y Capacitación.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20486193710');

SET @eid_20486193710 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20486193710' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20486193710, 'FEDERICO/ PEREZ SOLIS LUIS MIGUEL', 'ARIAS RAFAEL', 'Representante Legal', 'administracion@csixsigma.com', '918 516 872', 'activo', 1, NOW()
WHERE @eid_20486193710 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20486193710 AND correo='administracion@csixsigma.com');

-- empresa 167: INVERSIONES ROSARIO E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'INVERSIONES ROSARIO E.I.R.L.', NULL, '20452720362', 'PORTAL CONSTITUCION NRO. 11 (CERCADO) AYACUCHO - HUAMANGA - AYACUCHO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20452720362');

SET @eid_20452720362 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20452720362' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20452720362, 'PALOMINO JORGE', 'POZO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20452720362 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20452720362 AND nombres='PALOMINO JORGE');

-- empresa 168: GARCIA-GESTION Y CONSTRUCCION E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'GARCIA-GESTION Y CONSTRUCCION E.I.R.L.', NULL, '20604896909', 'CAL.ALFA AGUILA NRO. 109 URB. LA CALERA DE MONTERRICO LIMA - LIMA - SURQUILLO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20604896909');

SET @eid_20604896909 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20604896909' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20604896909, 'ANA KATIUSKA', 'VILA ABAD', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20604896909 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20604896909 AND nombres='ANA KATIUSKA');

-- empresa 169: DILE CHAO SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'DILE CHAO SAC', NULL, '20605476440', 'JR. SAN MARTIN NRO. 685 LA LIBERTAD - TRUJILLO - TRUJILLO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605476440');

SET @eid_20605476440 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605476440' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605476440, 'JUAN CARLOS', 'MARIÑOS MARROQUIN', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20605476440 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605476440 AND nombres='JUAN CARLOS');

-- empresa 170: ALRA SOLUTIONS S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ALRA SOLUTIONS S.A.C.', NULL, '20552051751', 'AV. FLORA TRISTAN NRO. 810 URB. COVIMA LIMA - LIMA - LA MOLINA', '(01) 5961659', 'ventas@alra-solutions.com', 'activo', 'Servicios de Tecnologia de la Informacion', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20552051751');

SET @eid_20552051751 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20552051751' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20552051751, 'DAMIAN HERIBERTO', 'ALFARO COTRINA', 'Representante Legal', 'ventas@alra-solutions.com', '(01) 5961659', 'activo', 1, NOW()
WHERE @eid_20552051751 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20552051751 AND correo='ventas@alra-solutions.com');

-- empresa 171: K & K AUTOMOTRIZ S.A. C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'K & K AUTOMOTRIZ S.A. C.', NULL, '20609265885', 'CAL.PEDRO GAREZON 2DO PISO NRO. 2062 DPTO. 2 URB. ANTARES (A UNA CUADRA DE PARQUE ZONAL MAYTA CAPAC) LIMA - LIMA - SAN MARTIN DE PORRES', '950 468 534', NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20609265885');

SET @eid_20609265885 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20609265885' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20609265885, 'JULIO CESAR MARTIN', 'REATEGUI CHERO', 'Representante Legal', NULL, '950 468 534', 'activo', 1, NOW()
WHERE @eid_20609265885 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20609265885 AND nombres='JULIO CESAR MARTIN');

-- empresa 172: CLOUDTIC S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'CLOUDTIC S.A.C.', NULL, '20572201041', 'JR. ULISES REATEGUI NRO. 597 (ESPALDAS DE FONAVI) SAN MARTIN - SAN MARTIN - MORALES', '930 222 901', 'jvelasquez@cloudticperu.com', 'activo', 'CloudTicPeru es una empresa peruana consultora de sistemas, orientada a brindar servicios en Software Libre, enfocados en las nuevas tecnologías de la información y comunicaciones ejecutando proyectos de infraestructura y desarrollos webs.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20572201041');

SET @eid_20572201041 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20572201041' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20572201041, 'PARDO LENIN', 'CABANILLAS', 'Representante Legal', 'jvelasquez@cloudticperu.com', '930 222 901', 'activo', 1, NOW()
WHERE @eid_20572201041 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20572201041 AND correo='jvelasquez@cloudticperu.com');

-- empresa 173: AGROINDUSTRIAL LUPITA SRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AGROINDUSTRIAL LUPITA SRL', NULL, '20606405171', 'KM. 2 FND. PANCCA PUNO - MELGAR - SANTA ROSA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606405171');

SET @eid_20606405171 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606405171' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606405171, 'LUZ MERCEDES', 'RAMOS ZUÑIGA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20606405171 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606405171 AND nombres='LUZ MERCEDES');

-- empresa 174: TIKAY ORGANICO S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'TIKAY ORGANICO S.A.C.', NULL, '20606104490', 'PJ. 4 ZONA C MZA. N LOTE. 12 URB. SAN MARTIN DE SOCABAYA AREQUIPA - AREQUIPA - SOCABAYA', '974 209 497', NULL, 'activo', 'Productos antibacterianos elaborados con microfibra de cobre + algodón orgánico, para personas que cuidan de sí mismas y del medio ambiente.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606104490');

SET @eid_20606104490 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606104490' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606104490, 'DE LLAMOSAS JULIA PETRONILA', 'BERNAL RAMOS', 'Representante Legal', NULL, '974 209 497', 'activo', 1, NOW()
WHERE @eid_20606104490 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606104490 AND nombres='DE LLAMOSAS JULIA PETRONILA');

-- empresa 175: CREACIONES LAGUNA E I R L
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'CREACIONES LAGUNA E I R L', NULL, '20250114657', 'AV. LOS NARANJOS NRO. 123 CANTO GRANDE LIMA - LIMA - SAN JUAN DE LURIGANCHO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20250114657');

SET @eid_20250114657 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20250114657' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20250114657, 'MIRTHA NILDA', 'GARCIA CHUMBIMUNI', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20250114657 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20250114657 AND nombres='MIRTHA NILDA');

-- empresa 176: SERVICIOS DELIVERY E.I. R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SERVICIOS DELIVERY E.I. R.L.', NULL, '20603892128', 'CAL.LAS BEGONIAS NRO. 359 URB. CALIFORNIA LA LIBERTAD - TRUJILLO - VICTOR LARCO HERRERA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20603892128');

SET @eid_20603892128 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20603892128' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20603892128, 'VICTOR HUGO', 'FLORIAN PAREDES', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20603892128 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20603892128 AND nombres='VICTOR HUGO');

-- empresa 177: AGO TECNOVA E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AGO TECNOVA E.I.R.L.', NULL, '20607546364', 'PRO.LA MERCED NRO. 445 BAR. LA MERCED SAN MARTIN - MARISCAL CACERES - JUANJUI', '5142546235', NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20607546364');

SET @eid_20607546364 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20607546364' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20607546364, 'ORDOÑEZ ALEX', 'GARCIA', 'Representante Legal', NULL, '5142546235', 'activo', 1, NOW()
WHERE @eid_20607546364 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20607546364 AND nombres='ORDOÑEZ ALEX');

-- empresa 178: SCORPIO INVERSIONES SRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SCORPIO INVERSIONES SRL', NULL, '20480928611', 'CAL.CAQUETÁ NRO. 108 BARR. EL MOLINO LA LIBERTAD - TRUJILLO - TRUJILLO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20480928611');

SET @eid_20480928611 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20480928611' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20480928611, 'PAVEL DIOMEDES', 'CUENCA GOICOCHEA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20480928611 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20480928611 AND nombres='PAVEL DIOMEDES');

-- empresa 179: INSTITUTO LATINOAMERICANO DE CIENCIAS SOCIALES SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'INSTITUTO LATINOAMERICANO DE CIENCIAS SOCIALES SAC', NULL, '20606176245', 'MANUEL SEGURA NRO. 142 DPTO. 704 LIMA - LIMA - LINCE', '+51925433591', 'informes@institutoilcs.info', 'activo', 'El Instituto Latinoamericano de Ciencias Sociales es una centro especializado de capacitaciones', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606176245');

SET @eid_20606176245 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606176245' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606176245, 'ACHULLI BRAYAN', 'CARDENAS', 'Representante Legal', 'informes@institutoilcs.info', '+51925433591', 'activo', 1, NOW()
WHERE @eid_20606176245 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606176245 AND correo='informes@institutoilcs.info');

-- empresa 180: SINCHI ALIMENTOS S.A. C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SINCHI ALIMENTOS S.A. C.', NULL, '20600315146', 'AV. TOMAS VALLE NRO. 1530 INT. 401 CND. TOMAS VALLE BL. 6 (4TO PISO- UNIVERSITARIA CON AV.T.VALLE) LIMA - LIMA - LOS OLIVOS', '940', 'info@sinchi.com.pe', 'activo', 'Somos fabricantes de cereales,snacks,confitados brindamos servicios. Seremos tu socio estratégico.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20600315146');

SET @eid_20600315146 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20600315146' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20600315146, 'KATIA CRISTINA', 'CUETO VARGAS', 'Representante Legal', 'info@sinchi.com.pe', '940', 'activo', 1, NOW()
WHERE @eid_20600315146 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20600315146 AND correo='info@sinchi.com.pe');

-- empresa 181: COMPRESORES DE TORNILLO S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'COMPRESORES DE TORNILLO S.A.C.', NULL, '20609525861', 'AV. JUAN VELASCO ALVARADO MZA. B LOTE. 3 LIMA - HUAROCHIRI - RICARDO PALMA', '981 094 777', 'servicios@compresoresdetornillo.com.pe', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20609525861');

SET @eid_20609525861 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20609525861' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20609525861, 'JUAN CARLOS', 'PATIÑO TACSA', 'Representante Legal', 'servicios@compresoresdetornillo.com.pe', '981 094 777', 'activo', 1, NOW()
WHERE @eid_20609525861 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20609525861 AND correo='servicios@compresoresdetornillo.com.pe');

-- empresa 182: AQUAMET SOLUCIONES INTEGRALES SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AQUAMET SOLUCIONES INTEGRALES SAC', NULL, '20605939199', 'AV. VICENTE MORALES DUAREZ NRO. 1424 URB. CARMEN DE LA LEGUA PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - CARMEN DE LA LEGUA REYNOSO', '981 094 890', 'ventas2@aquamet.com.pe', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605939199');

SET @eid_20605939199 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605939199' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605939199, 'LINARES GERARDO JAVIER ARTURO / ESPANTOZO LUNA BRYAN GUSTAVO', 'DEL CARPIO', 'Representante Legal', 'ventas2@aquamet.com.pe', '981 094 890', 'activo', 1, NOW()
WHERE @eid_20605939199 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605939199 AND correo='ventas2@aquamet.com.pe');

-- empresa 183: MED ELITE S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'MED ELITE S.A.C.', NULL, '20608385887', 'AV. GRAL. ANTONIO ALVAREZ DE ARENALES NRO. 1912 DPTO. 403 LIMA - LIMA - LINCE', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20608385887');

SET @eid_20608385887 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20608385887' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20608385887, 'ROBERTO ALEXANDER', 'RODRIGUEZ ZUÑIGA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20608385887 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20608385887 AND nombres='ROBERTO ALEXANDER');

-- empresa 184: FREEMIUM PERU S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'FREEMIUM PERU S.A.C.', NULL, '20609526875', 'MZA. 62 LOTE. 14 ASC. LOMAS DE ANCON LIMA - LIMA - ANCON', '934 399 221', 'info@groupperu.com', 'activo', 'Somos una empresa formado por profesionales capacitados y con la experiencia necesaria', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20609526875');

SET @eid_20609526875 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20609526875' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20609526875, 'ERIC AVILIO', 'CORPUS MENDEZ', 'Representante Legal', 'info@groupperu.com', '934 399 221', 'activo', 1, NOW()
WHERE @eid_20609526875 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20609526875 AND correo='info@groupperu.com');

-- empresa 185: HEALTH SMILING SOCIEDAD ANONIMA CERRADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'HEALTH SMILING SOCIEDAD ANONIMA CERRADA', NULL, '20606543833', 'CAL.CORONEL MANUEL INCLAN NRO. 235 INT. 612 LIMA - LIMA - MIRAFLORES', '920 290 923', 'healthsmilingperu@gmail.com', 'activo', 'Health Smiling brinda a sus pacientes el mejor servicio en odontología, cuenta con equipos de primera gama, una gran trayectoria profesional y con un adecuado control sanitario.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606543833');

SET @eid_20606543833 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606543833' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606543833, 'JEFFERSON RAMON', 'HUAMAN YOPLAC', 'Representante Legal', 'healthsmilingperu@gmail.com', '920 290 923', 'activo', 1, NOW()
WHERE @eid_20606543833 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606543833 AND correo='healthsmilingperu@gmail.com');

-- empresa 186: TREMOLADAS E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'TREMOLADAS E.I.R.L.', NULL, '20607117544', 'CAL.GRIMALDO DEL SOLAR NRO. 162 INT. 405 LIMA - LIMA - MIRAFLORES', '953 974 458', 'citas@drtremolada.com', 'activo', 'Deja que nuestro equipo cuide de tu salud bucal mientras tú disfrutas de una experiencia sin preocupaciones ¡Transforma tu sonrisa con nosotros!', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20607117544');

SET @eid_20607117544 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20607117544' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20607117544, 'STEPHANIE AYUMI', 'SANCHEZ TANAKA', 'Representante Legal', 'citas@drtremolada.com', '953 974 458', 'activo', 1, NOW()
WHERE @eid_20607117544 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20607117544 AND correo='citas@drtremolada.com');

-- empresa 187: COMPIPRO SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'COMPIPRO SAC', NULL, '20608400941', 'AV. LAS FLORES DE PRIMAVERA NRO. 182 URB. CHACARILLA DE OTERO LIMA - LIMA - SAN JUAN DE LURIGANCHO', '973 644 878', 'info@compipro.net/', 'activo', 'COMPIPRO SAC es tu mejor opción. Somos una de articulos promocionales con N°RUC 20608400941 que ofrecemos regalos corporativos, para eventos, ferias y para la industria en general.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20608400941');

SET @eid_20608400941 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20608400941' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20608400941, 'DOMINGA DOMITILA', 'MAGUIÑA MEJIA', 'Representante Legal', 'info@compipro.net/', '973 644 878', 'activo', 1, NOW()
WHERE @eid_20608400941 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20608400941 AND correo='info@compipro.net/');

-- empresa 188: NEXSATEL SOCIEDAD ANONIMA CERRADA - NEXSATEL S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'NEXSATEL SOCIEDAD ANONIMA CERRADA - NEXSATEL S.A.C.', NULL, '20600815360', 'MZA. K LOTE. 08 A.H. VILLA ALEJANDRO ET. DOS LIMA - LIMA - LURIN', '965 780 922', 'nexsatel@gmail.com', 'activo', 'Brindamos servicios de Internet banda ancha, prevención y mantenimiento de Pc', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20600815360');

SET @eid_20600815360 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20600815360' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20600815360, 'SAUL HENRY', 'VELASQUEZ ASTO', 'Representante Legal', 'nexsatel@gmail.com', '965 780 922', 'activo', 1, NOW()
WHERE @eid_20600815360 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20600815360 AND correo='nexsatel@gmail.com');

-- empresa 189: INVERSIONES ESTELAR S. A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'INVERSIONES ESTELAR S. A.C.', NULL, '20605298631', 'AV. JOSE LEAL NRO. 1276 INT. REF (PISO 1-ALT. PARQUE LOS BOMBEROS) LIMA - LIMA - LINCE', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605298631');

SET @eid_20605298631 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605298631' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605298631, 'VERA LUCIA', 'CARACCIOLO QUINTANA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20605298631 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605298631 AND nombres='VERA LUCIA');

-- empresa 190: PREVIMED & PERU S.A. C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'PREVIMED & PERU S.A. C.', NULL, '20553566020', 'AV. MILITAR NRO. 1721 LIMA - LIMA - LINCE', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20553566020');

SET @eid_20553566020 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20553566020' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20553566020, 'MARITZA ESTHER', 'PALOMINO CUSI', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20553566020 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20553566020 AND nombres='MARITZA ESTHER');

-- empresa 191: INTELIGENCIA, INNOVACION, GEOGRAFIA Y SOFTWARE S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'INTELIGENCIA, INNOVACION, GEOGRAFIA Y SOFTWARE S.A.C.', NULL, '20606713054', 'AV. PANAMA NRO. 2815 A.H. SAN LORENZO LAMBAYEQUE - CHICLAYO - JOSE LEONARDO ORTIZ', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606713054');

SET @eid_20606713054 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606713054' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606713054, 'DIAZ ELVIS', 'VERA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20606713054 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606713054 AND nombres='DIAZ ELVIS');

-- empresa 192: MANUFACTURAS PANDA DEL PERU S.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'MANUFACTURAS PANDA DEL PERU S.R.L.', NULL, '20601116651', 'CAL.SN MZA. C LOTE. 3 ASC. CANADA LIMA - LIMA - SAN JUAN DE LURIGANCHO', '973 696 990', 'ventas@pandadistribuidora.com', 'activo', 'Empresa que ofrece implemento de seguridad industrial "No eres a prueba de todo, utiliza tu EPP."', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601116651');

SET @eid_20601116651 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601116651' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20601116651, 'ANGELA NAYELY', 'ANO UMAN', 'Representante Legal', 'ventas@pandadistribuidora.com', '973 696 990', 'activo', 1, NOW()
WHERE @eid_20601116651 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20601116651 AND correo='ventas@pandadistribuidora.com');

-- empresa 194: FLEXXOONE SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'FLEXXOONE SAC', NULL, '20600995805', 'JR. CESAR VALLEJO NRO. 441 DPTO. 301 URB. PROLONGACION BENAVIDES LIMA - LIMA - SANTIAGO DE SURCO', '955479055', 'admin@nanotec.com.pe', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20600995805');

SET @eid_20600995805 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20600995805' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20600995805, 'ENRIQUE/ FARFAN RODAS SIXTO', 'RODRIGUEZ PARODI', 'Representante Legal', 'admin@nanotec.com.pe', '955479055', 'activo', 1, NOW()
WHERE @eid_20600995805 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20600995805 AND correo='admin@nanotec.com.pe');

-- empresa 195: INVERSIONES YAJER E.I. R.L
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'INVERSIONES YAJER E.I. R.L', NULL, '20609699303', 'CAL.AMERICA NRO. 785 P.J. GARCES LAMBAYEQUE - CHICLAYO - JOSE LEONARDO ORTIZ', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20609699303');

SET @eid_20609699303 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20609699303' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20609699303, 'BECERRA JESSICA', 'OCMIN', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20609699303 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20609699303 AND nombres='BECERRA JESSICA');

-- empresa 196: LACTEOS NIQUEN E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'LACTEOS NIQUEN E.I.R.L.', NULL, '20538943640', 'CAL.PIURA NRO. 949 P.J. SAN MARTIN LAMBAYEQUE - LAMBAYEQUE - LAMBAYEQUE', '978 920 244', NULL, 'activo', 'Productos lácteos del campo especialmente para ti.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20538943640');

SET @eid_20538943640 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20538943640' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20538943640, 'CARLOS ALBERTO', 'NIQUEN CHAPILLIQUEN', 'Representante Legal', NULL, '978 920 244', 'activo', 1, NOW()
WHERE @eid_20538943640 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20538943640 AND nombres='CARLOS ALBERTO');

-- empresa 197: DISTRIBUIDORA JUAN JOSE EIRLTDA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'DISTRIBUIDORA JUAN JOSE EIRLTDA', NULL, '20398672144', 'CAL.5 NRO. 288 URB. SAN JOSE (PASANDO LA PRIMERA CANCHA) PIURA - PIURA - PIURA', '023792940 023792988', NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20398672144');

SET @eid_20398672144 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20398672144' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20398672144, 'JUAN JOSE', 'CORREA LOPEZ', 'Representante Legal', NULL, '023792940 023792988', 'activo', 1, NOW()
WHERE @eid_20398672144 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20398672144 AND nombres='JUAN JOSE');

-- empresa 198: CLARNOVA SOCIEDAD ANONIMA CERRADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'CLARNOVA SOCIEDAD ANONIMA CERRADA', NULL, '20607393321', 'JR. CAJAMARCA NRO. 383 HUANCAYO CERCADO JUNIN - HUANCAYO - HUANCAYO', '966 261 279', 'clarnovaoficial@gmail.com', 'activo', 'SOMOS UNA EMPRESA IMPLEMENTADA EN SERVICIOS DE VIGILANCIA PRIVADA Y SERVICIOS DE LIMPIEZA INTEGRAL.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20607393321');

SET @eid_20607393321 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20607393321' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20607393321, 'CHECAN CATALINO', 'HUAMAN', 'Representante Legal', 'clarnovaoficial@gmail.com', '966 261 279', 'activo', 1, NOW()
WHERE @eid_20607393321 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20607393321 AND correo='clarnovaoficial@gmail.com');

-- empresa 199: ACON SOFT S.A.C
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ACON SOFT S.A.C', NULL, '20492352161', 'PJ. LOS FLAMENCOS NRO. 145 INT. 101 URB. LIMATAMBO LIMA - LIMA - SAN ISIDRO', '989005397', 'ventas@aconsoft.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20492352161');

SET @eid_20492352161 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20492352161' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20492352161, 'TRUJILLO RONALD', 'SARCO', 'Representante Legal', 'ventas@aconsoft.com', '989005397', 'activo', 1, NOW()
WHERE @eid_20492352161 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20492352161 AND correo='ventas@aconsoft.com');

-- empresa 200: AGROINDUSTRIAS CHAPICA S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AGROINDUSTRIAS CHAPICA S.A.C.', NULL, '20611280719', 'MZA. D LOTE. 9 URB. LAS BANCARIAS II ETAPA PIURA - PIURA - PIURA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20611280719');

SET @eid_20611280719 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20611280719' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20611280719, 'JORGE ARMANDO II', 'CRUZ ZEVALLOS', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20611280719 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20611280719 AND nombres='JORGE ARMANDO II');

-- empresa 201: HORNA & ASOCIADOS CONSULTORES SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'HORNA & ASOCIADOS CONSULTORES SAC', NULL, '20531275684', 'JR. LEONCIO PRADO NRO. 283 SAN MARTIN - SAN MARTIN - TARAPOTO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20531275684');

SET @eid_20531275684 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20531275684' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20531275684, 'LUIS JOSE', 'HORNA ALFARO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20531275684 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20531275684 AND nombres='LUIS JOSE');

-- empresa 202: DG SOLUCIONES EMPRESARIALES S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'DG SOLUCIONES EMPRESARIALES S.A.C.', NULL, '20601626129', 'JR. SIMON BOLIVAR NRO. 360 URB. SAN MIGUEL LIMA - LIMA - SAN MIGUEL', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601626129');

SET @eid_20601626129 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601626129' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20601626129, 'SARA CECILIA', 'GUTIERREZ VILLANUEVA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20601626129 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20601626129 AND nombres='SARA CECILIA');

-- empresa 203: YATIRI BUSINESS SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'YATIRI BUSINESS SAC', NULL, '20606956704', 'JR. SANTA ANA NRO. 1041 (A MEDIA CDRA DEL MUSEO SANTA ANA) AMAZONAS - CHACHAPOYAS - CHACHAPOYAS', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606956704');

SET @eid_20606956704 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606956704' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606956704, 'RAMOS KIZZY', 'HOYOS', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20606956704 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606956704 AND nombres='RAMOS KIZZY');

-- empresa 204: R2J ZOLUCIONES S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'R2J ZOLUCIONES S.A.C.', NULL, '20603044861', 'JR. TOMAS VIDAL MZA. B LOTE. 15 LIMA - LIMA - RIMAC', '951 726 877', 'contacto@zoluciones.com', 'activo', 'Somos una empresa que brinda soluciones en tecnología a todos nuestros clientes, brindándoles la oportunidad de aprovechar y optimizar al máximo el uso de sus dispositivos electrónicos.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20603044861');

SET @eid_20603044861 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20603044861' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20603044861, 'JOSE MARIA/ AYERVE SIGUAS ROBERTO CARLOS/ VILLENA FLORES JAVIER JESUS ERNESTO', 'ALFARO GIRALDO', 'Representante Legal', 'contacto@zoluciones.com', '951 726 877', 'activo', 1, NOW()
WHERE @eid_20603044861 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20603044861 AND correo='contacto@zoluciones.com');

-- empresa 205: HELADOS PERUANOS SOCIEDAD ANONIMA CERRADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'HELADOS PERUANOS SOCIEDAD ANONIMA CERRADA', NULL, '20600715861', 'AV. ALFONSO UGARTE NRO. CD22 (VILLA) SAN MARTIN - SAN MARTIN - TARAPOTO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20600715861');

SET @eid_20600715861 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20600715861' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20600715861, 'LUIS FERNANDO', 'VILLAIZAN PESANTES', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20600715861 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20600715861 AND nombres='LUIS FERNANDO');

-- empresa 206: LCP LIDERES EN COMPETENCIA PERSONAL E.I.R.L. - LCP E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'LCP LIDERES EN COMPETENCIA PERSONAL E.I.R.L. - LCP E.I.R.L.', NULL, '20517769178', 'JR. HUASCAR NRO. 1263 DPTO. A LIMA - LIMA - JESUS MARIA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20517769178');

SET @eid_20517769178 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20517769178' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20517769178, 'OSCAR ULISES/ MATA VASQUEZ JANNET', 'REATEGUI RODRIGUEZ', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20517769178 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20517769178 AND nombres='OSCAR ULISES/ MATA VASQUEZ JANNET');

-- empresa 207: CREACIONES ALIZ E.I.R.L
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'CREACIONES ALIZ E.I.R.L', NULL, '20538837297', 'MZA. P1 LOTE. 3 URB. ASOC. PROV. LOS INCAS (ALT. CDRA. 10 DE ALAMEDA SUR) LIMA - LIMA - CHORRILLOS', '997 645 584', 'crealizperu@gmail.com/', 'activo', 'Somos una marca de moda ecológica y sostenible. Diseñamos prendas originales; hechos de hilado de fibra de alpaca y algodón orgánico, producto bandera del Perú.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20538837297');

SET @eid_20538837297 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20538837297' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20538837297, 'DE RAMOS CHELA ALIZON', 'ALIAGA HUAYTAN', 'Representante Legal', 'crealizperu@gmail.com/', '997 645 584', 'activo', 1, NOW()
WHERE @eid_20538837297 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20538837297 AND correo='crealizperu@gmail.com/');

-- empresa 208: CJAVA PERU EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA - CJAVA PERU E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'CJAVA PERU EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA - CJAVA PERU E.I.R.L.', NULL, '20600614861', 'CAL.CARLOS GONZALES NRO. 251 URB. MARANGA ET. SIETE LIMA - LIMA - SAN MIGUEL', '(+51) 932656459', 'info@cjavaperu.com', 'activo', 'Capacitamos, Investigamos y Desarrollamos Software basado en tecnología Java.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20600614861');

SET @eid_20600614861 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20600614861' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20600614861, 'EDWIN ANGEL', 'MARAVI PEREZ', 'Representante Legal', 'info@cjavaperu.com', '(+51) 932656459', 'activo', 1, NOW()
WHERE @eid_20600614861 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20600614861 AND correo='info@cjavaperu.com');

-- empresa 209: FENIX CONSULTORIA INTEGRAL DE NEGOCIOS E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'FENIX CONSULTORIA INTEGRAL DE NEGOCIOS E.I.R.L.', NULL, '20555210931', 'AV. SAN FELIPE NRO. 1035 DPTO. 304 LIMA - LIMA - JESUS MARIA', '992 046 387', 'jadrianzen@fenixconsultoria.com.pe', 'activo', 'Mejoramos la rentabilidad de tu empresa mediante asesoría y/o proyectos de consultoría organizacional.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20555210931');

SET @eid_20555210931 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20555210931' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20555210931, 'KATIA DEL PILAR', 'ADRIANZEN ZUÑIGA', 'Representante Legal', 'jadrianzen@fenixconsultoria.com.pe', '992 046 387', 'activo', 1, NOW()
WHERE @eid_20555210931 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20555210931 AND correo='jadrianzen@fenixconsultoria.com.pe');

-- empresa 210: UNUWASI E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'UNUWASI E.I.R.L.', NULL, '20609980801', 'OTR.CHAUPISOLAR SECTOR MAMAC ARIN CALCA NRO. S/N C.C. ARIN (TERCER PARAD.ARIN CARRETERA CALCA URUBAM) CUSCO - CALCA - CALCA', '979 759 593', 'unuwasi.arin@gmail.com', 'activo', 'Espacio de bienestar, un oasis de belleza natural en pleno del Valle Sagrado. Potencia tu salud, traquilidad y desconexión.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20609980801');

SET @eid_20609980801 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20609980801' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20609980801, 'MUÑOZ ERIKA', 'CUEVAS', 'Representante Legal', 'unuwasi.arin@gmail.com', '979 759 593', 'activo', 1, NOW()
WHERE @eid_20609980801 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20609980801 AND correo='unuwasi.arin@gmail.com');

-- empresa 211: INFRAESTRUCTURAS URBANAS S.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'INFRAESTRUCTURAS URBANAS S.R.L.', NULL, '20610660925', 'CAL.VIÑA DEL MAR NRO. 175 URB. EL SOL DE LA MOLINA ET. UNO LIMA - LIMA - LA MOLINA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610660925');

SET @eid_20610660925 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610660925' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610660925, 'DENNIS KARIM', 'ANGELES RIVAS', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20610660925 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610660925 AND nombres='DENNIS KARIM');

-- empresa 212: ECODELI S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ECODELI S.A.C.', NULL, '20601258863', 'AV. COMANDANTE ESPINAR NRO. 435 INT. 501 LIMA - LIMA - MIRAFLORES', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601258863');

SET @eid_20601258863 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601258863' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20601258863, 'ANDREA XIMENA', 'GOMEZ LAVI', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20601258863 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20601258863 AND nombres='ANDREA XIMENA');

-- empresa 213: NUESTRA MONTANA S. A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'NUESTRA MONTANA S. A.C.', NULL, '20533920595', 'JR. ENRIQUE RAMIREZ LUNA NRO. 609 BAR. HUARUPAMPA (PARQUE SIMON BOLIVAR) ANCASH - HUARAZ - HUARAZ', '992777742', 'administracion@nuestramontana.com', 'activo', 'Organizamos Experiencias We organize experiences', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20533920595');

SET @eid_20533920595 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20533920595' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20533920595, 'GUIDO SERGIO', 'RAMIREZ CARRASCAL', 'Representante Legal', 'administracion@nuestramontana.com', '992777742', 'activo', 1, NOW()
WHERE @eid_20533920595 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20533920595 AND correo='administracion@nuestramontana.com');

-- empresa 214: C C AUDITORES Y CONTADORES ASOCIADOS SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'C C AUDITORES Y CONTADORES ASOCIADOS SAC', NULL, '20605465375', 'JR. JOSE OLAYA NRO. 510 DPTO. 402 SAN MARTIN - SAN MARTIN - TARAPOTO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605465375');

SET @eid_20605465375 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605465375' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605465375, 'DE CARDENAS GLADYS ELIZABETH/ CARDENAS GONZALES FREDY', 'CARRANZA BRICEÑO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20605465375 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605465375 AND nombres='DE CARDENAS GLADYS ELIZABETH/ CARDENAS GONZALES FREDY');

-- empresa 215: ESTRATEGIAS & NEGOCIOS EMMANUEL S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ESTRATEGIAS & NEGOCIOS EMMANUEL S.A.C.', NULL, '20556775738', 'JR. MARISCAL AGUSTIN GAMARRA NRO. 764 INT. E-2 URB. EL PORVENIR LIMA - LIMA - LA VICTORIA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20556775738');

SET @eid_20556775738 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20556775738' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20556775738, 'UNOCC EUDALIO', 'SUARNABAR', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20556775738 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20556775738 AND nombres='UNOCC EUDALIO');

-- empresa 216: CHOCOPRO S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'CHOCOPRO S.A.C.', NULL, '20610325123', 'CAL.LOS ALAMOS NRO. 547 LIMA - LIMA - SAN ISIDRO', '908 893 335', 'chocoproperu@gmail.com/', 'activo', 'Tienda online especializada en productos para chocolateria', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610325123');

SET @eid_20610325123 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610325123' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610325123, 'GIACOMO AARON/ PELLNY VALDEZ STEPHANIE MICHELLE', 'ALVAREZ GARCIA', 'Representante Legal', 'chocoproperu@gmail.com/', '908 893 335', 'activo', 1, NOW()
WHERE @eid_20610325123 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610325123 AND correo='chocoproperu@gmail.com/');

-- empresa 217: AGRICULTURAL SOLUTIONS SOCIEDAD COMERCIAL DE RESPONSABILIDAD LIMITADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AGRICULTURAL SOLUTIONS SOCIEDAD COMERCIAL DE RESPONSABILIDAD LIMITADA', NULL, '20604860343', 'MZA. J LOTE. 18 URB. EL BOSQUE (CERCA A CANCHA DE GRASS EL BERNABEO) PIURA - PIURA - CASTILLA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20604860343');

SET @eid_20604860343 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20604860343' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20604860343, 'SHELENE ROBERSY/ RAMIREZ GARCIA GUSTAVO ALFREDO', 'ADRIANZEN YARLEQUE', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20604860343 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20604860343 AND nombres='SHELENE ROBERSY/ RAMIREZ GARCIA GUSTAVO ALFREDO');

-- empresa 218: HERCONSA CONTRATISTAS GENERALES S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'HERCONSA CONTRATISTAS GENERALES S.A.C.', NULL, '20605665757', 'CAL.ANDRES BERNAL NRO. 381 LAMBAYEQUE - CHICLAYO - PICSI', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605665757');

SET @eid_20605665757 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605665757' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605665757, 'YADHIRA LORENA', 'SAMAME JIMENEZ', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20605665757 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605665757 AND nombres='YADHIRA LORENA');

-- empresa 219: ULIKE S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ULIKE S.A.C.', NULL, '20606641592', 'JR. ITALIA NRO. 1558 INT. 202 URB. SAN PABLO LIMA - LIMA - LA VICTORIA', '951 140 717', 'uliketelas@gmail.com', 'activo', 'Venta de Telas de alta calidad, con extensa variedad y un excelente servicio personalizado.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606641592');

SET @eid_20606641592 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606641592' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606641592, 'VICTOR EDUARDO', 'YAULE ROJAS', 'Representante Legal', 'uliketelas@gmail.com', '951 140 717', 'activo', 1, NOW()
WHERE @eid_20606641592 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606641592 AND correo='uliketelas@gmail.com');

-- empresa 220: CUMPA PERU S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'CUMPA PERU S.A.C.', NULL, '20602585507', 'AV. JOSE GALVEZ BARRENECHEA NRO. 927 DPTO. 801 URB. CORPAC LIMA - LIMA - SAN BORJA', '984 485 795', NULL, 'activo', '🍷 Vive la experiencia que ofrece un buen vino ¡De la bodega a tu casa! 🥂 🍇', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20602585507');

SET @eid_20602585507 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20602585507' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20602585507, 'CARLOS LEONIDAS', 'AGUILAR OJEDA', 'Representante Legal', NULL, '984 485 795', 'activo', 1, NOW()
WHERE @eid_20602585507 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20602585507 AND nombres='CARLOS LEONIDAS');

-- empresa 221: PRENDEX SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'PRENDEX SAC', NULL, '20557984781', 'JR. SANTIAGO ANTUNEZ DE MAYOLO NRO. 1027 URB. VISTA ALEGRE LIMA - LIMA - SANTIAGO DE SURCO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20557984781');

SET @eid_20557984781 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20557984781' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20557984781, 'WILDER ALFREDO/ AQUIJE AVILA ANDRES NICOLAS', 'PEREYRA ACUÑA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20557984781 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20557984781 AND nombres='WILDER ALFREDO/ AQUIJE AVILA ANDRES NICOLAS');

-- empresa 222: IMAC CONSULTORES E INGENIERIA S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'IMAC CONSULTORES E INGENIERIA S.A.C.', NULL, '20554090134', 'JR. HUAURA NRO. 315 (SEGUNDO PISO OFICINA ADMINISTRATIVA) LIMA - LIMA - PUEBLO LIBRE (MAGDALENA VIEJA)', '976', 'contactos@imacconsultores.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20554090134');

SET @eid_20554090134 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20554090134' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20554090134, 'MARIA ESTHER', 'MORALES MENDEZ', 'Representante Legal', 'contactos@imacconsultores.com', '976', 'activo', 1, NOW()
WHERE @eid_20554090134 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20554090134 AND correo='contactos@imacconsultores.com');

-- empresa 223: VISION ESTRATEGICA GLOBAL SOCIEDAD ANONIMA CERRADA - VIESGLO S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'VISION ESTRATEGICA GLOBAL SOCIEDAD ANONIMA CERRADA - VIESGLO S.A.C.', NULL, '20601350948', 'MZA. F LOTE. 3 ASC. LAS GARDENIAS AREQUIPA - AREQUIPA - CERRO COLORADO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601350948');

SET @eid_20601350948 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601350948' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20601350948, 'OLGA BEATRIZ', 'TENORIO DURAN', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20601350948 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20601350948 AND nombres='OLGA BEATRIZ');

-- empresa 224: SK LAURENTE E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SK LAURENTE E.I.R.L.', NULL, '20604593744', 'PJ. DE LA CIENCIA NRO. 273 URB. CARLOS CUETO FERNANDINI LIMA - LIMA - LOS OLIVOS', '978104356', 'serviciotecnico@sklaurente.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20604593744');

SET @eid_20604593744 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20604593744' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20604593744, 'MARCO ANTONIO', 'LAURENTE MELGAREJO', 'Representante Legal', 'serviciotecnico@sklaurente.com', '978104356', 'activo', 1, NOW()
WHERE @eid_20604593744 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20604593744 AND correo='serviciotecnico@sklaurente.com');

-- empresa 225: YAQHA S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'YAQHA S.A.C.', NULL, '20606475455', 'CAL.NANAY NRO. 161 P.J. SERAFIN FILOMENO LORETO - MAYNAS - IQUITOS', '942951486', 'info@yaqha.com', 'activo', 'Somos la mejor opción para tu empresa, te brindamos desde asesoramiento gratuito hasta implementación', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606475455');

SET @eid_20606475455 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606475455' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606475455, 'ALEXANDER GABRIEL', 'DIAZ CABRERA', 'Representante Legal', 'info@yaqha.com', '942951486', 'activo', 1, NOW()
WHERE @eid_20606475455 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606475455 AND correo='info@yaqha.com');

-- empresa 227: VITIVINICOLA LA PAMPA S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'VITIVINICOLA LA PAMPA S.A.C.', NULL, '20494543762', 'OTR.ROSARIO DE YAUCA - LOS AQUIJES NRO. SN C.P. ROSARIO DE YAUCA (CP ROSARIO LA PAMPA S/N) ICA - ICA - LOS AQUIJES', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20494543762');

SET @eid_20494543762 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20494543762' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20494543762, 'ISMAEL FRANCISCO', 'CARPIO SOLIS', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20494543762 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20494543762 AND nombres='ISMAEL FRANCISCO');

-- empresa 228: SOLUCIONES IQ SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SOLUCIONES IQ SAC', NULL, '20604127972', 'AV. PASEO DE LA REPÚBLICA NRO. 4095 DPTO. 609 LIMA - LIMA - SURQUILLO', '470', 'ventas@iqsac.com.pe', 'activo', 'IQSAC, Empresa con Amplia experiencia en el mercado nacional e internacional. Comercializamos equipos para control de procesos. Brindamos Soluciones industriales como logísticas.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20604127972');

SET @eid_20604127972 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20604127972' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20604127972, 'NANCY LOURDES', 'SANCHEZ LEVEAU', 'Representante Legal', 'ventas@iqsac.com.pe', '470', 'activo', 1, NOW()
WHERE @eid_20604127972 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20604127972 AND correo='ventas@iqsac.com.pe');

-- empresa 229: SOLUCIONES INTEGRALES EN INGENIER?A E.I.R.L
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SOLUCIONES INTEGRALES EN INGENIER?A E.I.R.L', NULL, '20600563956', 'JR. HUIRACOCHA NRO. 1291 DPTO. 302 URB. FUNDO OYAGUE (IGLESIA SAN JOSE) LIMA - LIMA - JESUS MARIA', NULL, NULL, 'activo', 'Desarrolla servicios de Elaboración de Estudios y Proyectos de Ingeniería en diferentes especialidades a nivel nacional en proyectos privados y público', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20600563956');

SET @eid_20600563956 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20600563956' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20600563956, 'MANUEL ANTONIO', 'TEVES BARRENECHEA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20600563956 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20600563956 AND nombres='MANUEL ANTONIO');

-- empresa 230: SERVICIOS GENERALES AGROINDUSTRIALES JINKAI ENENTAI EIRL JINKAI ENENTAI EIRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SERVICIOS GENERALES AGROINDUSTRIALES JINKAI ENENTAI EIRL JINKAI ENENTAI EIRL', NULL, '20603028733', 'JR. TUPAC AMARU NRO. 393 OTR. OTROS (AL FRENTE DE COLEGIO SAN LUIS) AMAZONAS - UTCUBAMBA - BAGUA GRANDE', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20603028733');

SET @eid_20603028733 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20603028733' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20603028733, 'BECERRA ZOILA', 'BARBOZA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20603028733 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20603028733 AND nombres='BECERRA ZOILA');

-- empresa 231: PK AGROINDUSTRIA EIRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'PK AGROINDUSTRIA EIRL', NULL, '20610583718', 'CAR.CARRETERA MULLUCASHE - SECTOR MULLUCASHE - LA PECA NRO. 0.8 SEC. MULLUCASHE AMAZONAS - BAGUA - LA PECA', '932 101 629', 'pkagroindustria@gmail.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610583718');

SET @eid_20610583718 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610583718' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610583718, 'KARIN ALICIA', 'ZELADA SANCHEZ', 'Representante Legal', 'pkagroindustria@gmail.com', '932 101 629', 'activo', 1, NOW()
WHERE @eid_20610583718 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610583718 AND correo='pkagroindustria@gmail.com');

-- empresa 232: VIYAMAR S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'VIYAMAR S.A.C.', NULL, '20607847046', 'AV. AV. GUARDIA CIVIL MZA. R LOTE. 18 A.H. VALLE LA ESPERANZA PIURA - PIURA - CASTILLA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20607847046');

SET @eid_20607847046 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20607847046' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20607847046, 'VICTORIA LISETH', 'DIAZ CHIROQUE', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20607847046 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20607847046 AND nombres='VICTORIA LISETH');

-- empresa 233: GESTION HOGAR E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'GESTION HOGAR E.I.R.L.', NULL, '20602969836', 'MZA. D LOTE. 3 COO. LA ALBORADA AREQUIPA - AREQUIPA - CERRO COLORADO', '977 759 910', 'informes@gestionhogarinmobiliaria.com', 'activo', 'Somos una Empresa Arequipeña encargada de Promocionar y Vender terrenos en Ciudad, Campo y Playa.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20602969836');

SET @eid_20602969836 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20602969836' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20602969836, 'CARLOS ANDRES', 'MERMA SUCLLE', 'Representante Legal', 'informes@gestionhogarinmobiliaria.com', '977 759 910', 'activo', 1, NOW()
WHERE @eid_20602969836 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20602969836 AND correo='informes@gestionhogarinmobiliaria.com');

-- empresa 234: ANRUDI S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ANRUDI S.A.C.', NULL, '20607823040', 'JR. TRIUNFO NRO. 935 URB. CHACHAPOYAS AMAZONAS - CHACHAPOYAS - CHACHAPOYAS', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20607823040');

SET @eid_20607823040 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20607823040' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20607823040, 'RUBIO JIMENA', 'ANGULO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20607823040 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20607823040 AND nombres='RUBIO JIMENA');

-- empresa 235: SMART DISEÑO S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SMART DISEÑO S.A.C.', NULL, '20455550891', 'CAL.JOSE SANTOS CHOCANO NRO. 249 URB. UMACOLLO AREQUIPA - AREQUIPA - YANAHUARA', '958 954 743', NULL, 'activo', 'Constructora y estudio de diseño y arquitectura. Vanguardia, status y confort son nuestros derroter', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20455550891');

SET @eid_20455550891 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20455550891' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20455550891, 'CESAR AUGUSTO', 'ALATRISTA CORRALES', 'Representante Legal', NULL, '958 954 743', 'activo', 1, NOW()
WHERE @eid_20455550891 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20455550891 AND nombres='CESAR AUGUSTO');

-- empresa 236: INVERSIONES CUSCO NAVEL SOCIEDAD COMERCIAL DE RESPONSABILIDAD LIMITADA-INVERSIONES CUSCO NAVEL S.R.L
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'INVERSIONES CUSCO NAVEL SOCIEDAD COMERCIAL DE RESPONSABILIDAD LIMITADA-INVERSIONES CUSCO NAVEL S.R.L', NULL, '20491120682', 'CAL.PRIMAVERA MZA. A LOTE. 2 APV. JAVIER HERAUD PEREZ (VIA DE EVITAMIENTO PARADERO VILLA A 2 CU) CUSCO - CUSCO - SAN SEBASTIAN', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20491120682');

SET @eid_20491120682 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20491120682' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20491120682, 'HUILLCA ROSMERY', 'ZUNIGA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20491120682 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20491120682 AND nombres='HUILLCA ROSMERY');

-- empresa 237: GRUPO INMOBILIARIO C.H. S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'GRUPO INMOBILIARIO C.H. S.A.C.', NULL, '20606982667', 'PARQUE ALTO NRO. 542 DPTO. 406 (TORRE 2) LIMA - LIMA - SANTIAGO DE SURCO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606982667');

SET @eid_20606982667 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606982667' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606982667, 'JULIO ANGEL', 'URBANO HERBOZO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20606982667 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606982667 AND nombres='JULIO ANGEL');

-- empresa 238: OPALO ESPIRAL S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'OPALO ESPIRAL S.A.C.', NULL, '20609492598', 'BRONSINO NRO. 119 DPTO. 302 LIMA - LIMA - SAN BORJA', '988', 'contacto@opaloespiral.com/', 'activo', 'Profesionales especializados en la consultoría de gestión del talento y recursos humanos', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20609492598');

SET @eid_20609492598 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20609492598' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20609492598, 'JESUS HERNAN', 'TORRES LUDEÑA', 'Representante Legal', 'contacto@opaloespiral.com/', '988', 'activo', 1, NOW()
WHERE @eid_20609492598 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20609492598 AND correo='contacto@opaloespiral.com/');

-- empresa 239: TALENT CONSULTING ASOCIADOS SAC ASOCIADOS TC SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'TALENT CONSULTING ASOCIADOS SAC ASOCIADOS TC SAC', NULL, '20601810230', 'JR. CADIZ NRO. 129 DPTO. 301 URB. HIGUERETA LIMA - LIMA - SANTIAGO DE SURCO', NULL, 'contactenos@talentconsulting.com.pe', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601810230');

SET @eid_20601810230 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601810230' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20601810230, 'CLAUDIA CECILIA', 'GONZALES VELASCO', 'Representante Legal', 'contactenos@talentconsulting.com.pe', NULL, 'activo', 1, NOW()
WHERE @eid_20601810230 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20601810230 AND correo='contactenos@talentconsulting.com.pe');

-- empresa 240: RUSSINKA TOURS SOCIEDAD ANONIMA CERRADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'RUSSINKA TOURS SOCIEDAD ANONIMA CERRADA', NULL, '20490329944', 'JR. POLICARPO CABALLERO MZA. Ñ LOTE. 7 URB. ROSASPATA (DETRAS I.E INCA GARCILASO DE LA VEGA) CUSCO - CUSCO - CUSCO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20490329944');

SET @eid_20490329944 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20490329944' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20490329944, '', '', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20490329944 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20490329944 AND nombres='');

-- empresa 241: NEROGA DISEÑO & ARQUITECTURA E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'NEROGA DISEÑO & ARQUITECTURA E.I.R.L.', NULL, '20605677402', 'JR. ZEPITA NRO. 227 CERCADO DE PAITA (FRENTE AL CREDISCOTIABANK) PIURA - PAITA - PAITA', '922 397 179', NULL, 'activo', 'Neroga Diseño y Construcción es una constructora polivalente y multidisciplinaria, formada por t', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605677402');

SET @eid_20605677402 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605677402' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605677402, 'NELSON AUGUSTO', 'RODRIGUEZ GARCIA', 'Representante Legal', NULL, '922 397 179', 'activo', 1, NOW()
WHERE @eid_20605677402 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605677402 AND nombres='NELSON AUGUSTO');

-- empresa 242: M & Q SERVICIOS TURISTICOS S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'M & Q SERVICIOS TURISTICOS S.A.C.', NULL, '20456142983', 'CAL.MOLLENDO NRO. 37 URB. MUNICIPAL AREQUIPA - AREQUIPA - AREQUIPA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20456142983');

SET @eid_20456142983 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20456142983' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20456142983, 'CARMEN CECILIA', 'QUIROZ OVIEDO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20456142983 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20456142983 AND nombres='CARMEN CECILIA');

-- empresa 243: AGROINDUSTRIAS COMERCIO & CIA EL GRAN PARATON S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AGROINDUSTRIAS COMERCIO & CIA EL GRAN PARATON S.A.C.', NULL, '20606444886', 'CAL.FELIX CORREA NRO. C-04 URB. MIRASOL II RUTA 14 (FERCON EL CONEJO) CAJAMARCA - JAEN - JAEN', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606444886');

SET @eid_20606444886 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606444886' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606444886, 'JOSÉ YONY', 'CORONEL SÁNCHEZ', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20606444886 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606444886 AND nombres='JOSÉ YONY');

-- empresa 244: MULTINEGOCIOS EL SOCOTINO S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'MULTINEGOCIOS EL SOCOTINO S.A.C.', NULL, '20539061331', 'JR. CARLOS FISHER NRO. 9999 PUEBLO SOCOTA CAJAMARCA - CUTERVO - SOCOTA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20539061331');

SET @eid_20539061331 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20539061331' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20539061331, 'VASQUEZ MILLAN', 'CASTILLO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20539061331 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20539061331 AND nombres='VASQUEZ MILLAN');

-- empresa 245: ASESORES EMPRESARIALES ITACA SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ASESORES EMPRESARIALES ITACA SAC', NULL, '20607919152', 'MZA. L LOTE. 24 A.H. LAS MERCEDES (A ESPALDAS DEL LOCAL COMUNAL) PIURA - PIURA - CASTILLA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20607919152');

SET @eid_20607919152 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20607919152' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20607919152, 'JORGE AUGUSTO', 'LAZARTE ROMERO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20607919152 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20607919152 AND nombres='JORGE AUGUSTO');

-- empresa 246: RVM SUMINISTROS Y FABRICACIONES EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'RVM SUMINISTROS Y FABRICACIONES EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA', NULL, '20605597140', 'MZA. B LOTE. 20 URB. SAN JOSE (FRENTE A LA PUERTA DEL CUARTEL) PIURA - PIURA - PIURA', '937 070 048', 'r.veramatus@outlook.es', 'activo', 'Distribuidor Autorizado KÄRCHER lider en equipamiento de limpieza Zona Norte!!', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605597140');

SET @eid_20605597140 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605597140' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605597140, 'RUBEN RAMON EDUARDO', 'VERAMATUS MUÑOZ', 'Representante Legal', 'r.veramatus@outlook.es', '937 070 048', 'activo', 1, NOW()
WHERE @eid_20605597140 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605597140 AND correo='r.veramatus@outlook.es');

-- empresa 247: ISIS SEG E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ISIS SEG E.I.R.L.', NULL, '20509329665', 'CAL.PEDRO SALAZAR NRO. 152 URB. SAN IGNACIO LIMA - LIMA - BARRANCO', '987946600', 'ventas@isissecurity.com.pe/', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20509329665');

SET @eid_20509329665 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20509329665' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20509329665, 'GERARDO ARTURO', 'MONTENEGRO SECLEN', 'Representante Legal', 'ventas@isissecurity.com.pe/', '987946600', 'activo', 1, NOW()
WHERE @eid_20509329665 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20509329665 AND correo='ventas@isissecurity.com.pe/');

-- empresa 248: OYAS PISFIL DIEZ CREATIVOS E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'OYAS PISFIL DIEZ CREATIVOS E.I.R.L.', NULL, '20602408311', 'AV. ANDRES AVELINO CACERES NRO. 147 INT. M-30 URB. MIRAFLORES (C.C OPEN PLAZA) PIURA - PIURA - CASTILLA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20602408311');

SET @eid_20602408311 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20602408311' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20602408311, 'JUAN DE DIOS', 'PISFIL OSORES', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20602408311 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20602408311 AND nombres='JUAN DE DIOS');

-- empresa 249: AMYRA PERU E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AMYRA PERU E.I.R.L.', NULL, '20603442475', 'AV. CANADA NRO. 3378 URB. JAVIER PRADO ET. CUATRO LIMA - LIMA - SAN BORJA', '930 472 520', 'contacto@amyra.pe', 'activo', '¡El mejor Tour del Chocolate en Perú!', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20603442475');

SET @eid_20603442475 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20603442475' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20603442475, 'MACHUCA AIDA YUZZELLY', 'MINO VARGAS', 'Representante Legal', 'contacto@amyra.pe', '930 472 520', 'activo', 1, NOW()
WHERE @eid_20603442475 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20603442475 AND correo='contacto@amyra.pe');

-- empresa 250: ZETA TRANSPORT E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ZETA TRANSPORT E.I.R.L.', NULL, '20557341944', 'AV. 28 DE JULIO NRO. 1519 LIMA - LIMA - LA VICTORIA', '998890984', NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20557341944');

SET @eid_20557341944 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20557341944' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20557341944, '', '', 'Representante Legal', NULL, '998890984', 'activo', 1, NOW()
WHERE @eid_20557341944 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20557341944 AND nombres='');

-- empresa 251: FINCA VILLA VERDE S.R. L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'FINCA VILLA VERDE S.R. L.', NULL, '20609155737', 'AV. CIRCUNVALACIÓN NRO. S/N SEC. ALTO LOYOLA (SALIDA A NAMBALLE) CAJAMARCA - SAN IGNACIO - SAN IGNACIO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20609155737');

SET @eid_20609155737 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20609155737' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20609155737, 'PEÑA CARLOS', 'HUAMAN', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20609155737 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20609155737 AND nombres='PEÑA CARLOS');

-- empresa 252: AGRONEGOCIOS KM ACOSTA E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AGRONEGOCIOS KM ACOSTA E.I.R.L.', NULL, '20606840234', 'MZA. E LOTE. 13 CAS. LOS ACOSTA LAMBAYEQUE - LAMBAYEQUE - SAN JOSE - CHICLAYO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606840234');

SET @eid_20606840234 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606840234' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606840234, 'JOSE DE LA ROSA', 'ACOSTA LLONTOP', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20606840234 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606840234 AND nombres='JOSE DE LA ROSA');

-- empresa 253: AGRONEGOCIOS AGRICOLA E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AGRONEGOCIOS AGRICOLA E.I.R.L.', NULL, '20610945784', 'CAL.1 DE MAYO NRO. 0125 URB. URRUNAGA SC. TRES LAMBAYEQUE - CHICLAYO - JOSE LEONARDO ORTIZ', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610945784');

SET @eid_20610945784 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610945784' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610945784, 'CHRISTIAN ANDRES', 'ESTELA ARRUE', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20610945784 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610945784 AND nombres='CHRISTIAN ANDRES');

-- empresa 254: ALWA TALENTO MY S.A. C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ALWA TALENTO MY S.A. C.', NULL, '20603578407', 'CAL.SATURNO NRO. 132 URB. OLIMPO ET. DOS LIMA - LIMA - ATE', '949 777 888', 'm.yallico@grupoalwa.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20603578407');

SET @eid_20603578407 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20603578407' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20603578407, 'MILAGROS ROCIO', 'YALLICO HERRERA', 'Representante Legal', 'm.yallico@grupoalwa.com', '949 777 888', 'activo', 1, NOW()
WHERE @eid_20603578407 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20603578407 AND correo='m.yallico@grupoalwa.com');

-- empresa 255: JAGUAR SOFT S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'JAGUAR SOFT S.A.C.', NULL, '20600178971', 'CAL.ALAMEDA VIDAURRE MZA. R1 LOTE. 10 (2DO PISO / BLANCO) LIMA - LIMA - SANTIAGO DE SURCO', NULL, 'info@jaguarsoft.pe', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20600178971');

SET @eid_20600178971 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20600178971' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20600178971, 'ROBIN ALEX', 'CASAS JAVIER', 'Representante Legal', 'info@jaguarsoft.pe', NULL, 'activo', 1, NOW()
WHERE @eid_20600178971 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20600178971 AND correo='info@jaguarsoft.pe');

-- empresa 256: "MULTIVENTAS EL MILAGRITO CAMINANTE S.A.C"
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', '"MULTIVENTAS EL MILAGRITO CAMINANTE S.A.C"', NULL, '20600926145', 'PJ. ROBERTO SEGURA NRO. 414 SEC. MORRO SOLAR BAJO CAJAMARCA - JAEN - JAEN', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20600926145');

SET @eid_20600926145 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20600926145' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20600926145, 'SANDRA ADALITH', 'VASQUEZ HEREDIA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20600926145 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20600926145 AND nombres='SANDRA ADALITH');

-- empresa 257: GRUPO RODRIGUEZ CARRASCO SOCIEDAD ANONIMA CERRADA - GRUPO RODRIGUEZ CARRASCO S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'GRUPO RODRIGUEZ CARRASCO SOCIEDAD ANONIMA CERRADA - GRUPO RODRIGUEZ CARRASCO S.A.C.', NULL, '20538136663', 'CAL.2 MZA. A LOTE. 24 APV. VISTA ALEGRE DE MANCHAY (ALT KM 2 AV VICTOR MALASQUEZ) LIMA - LIMA - PACHACAMAC', '3623318', NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20538136663');

SET @eid_20538136663 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20538136663' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20538136663, 'CARRASCO FELICIANO', 'RODRIGUEZ', 'Representante Legal', NULL, '3623318', 'activo', 1, NOW()
WHERE @eid_20538136663 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20538136663 AND nombres='CARRASCO FELICIANO');

-- empresa 258: PERALTA-PEREZ CONTADORES Y AUDITORES S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'PERALTA-PEREZ CONTADORES Y AUDITORES S.A.C.', NULL, '20610422536', 'Cal. San Andres Nro. 987 P.J. San Lorenzo (Espaldas Colegio San Lorenzo) - CHICLAYO', '978 039 127', 'peraltacontadores@gmail.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610422536');

SET @eid_20610422536 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610422536' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610422536, '', '', 'Representante Legal', 'peraltacontadores@gmail.com', '978 039 127', 'activo', 1, NOW()
WHERE @eid_20610422536 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610422536 AND correo='peraltacontadores@gmail.com');

-- empresa 259: EMPRESA DE SERVICIOS NINAWAYRA SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'EMPRESA DE SERVICIOS NINAWAYRA SAC', NULL, '20601524881', 'JR. GRAU NRO. 521 BAR. SANTO DOMINGO AMAZONAS - CHACHAPOYAS - CHACHAPOYAS - CHACHAPOLLAS', '978048656', 'karinburga@gmail.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601524881');

SET @eid_20601524881 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601524881' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20601524881, 'KARIN DEL ROSARIO', 'BURGA MUÑOZ', 'Representante Legal', 'karinburga@gmail.com', '978048656', 'activo', 1, NOW()
WHERE @eid_20601524881 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20601524881 AND correo='karinburga@gmail.com');

-- empresa 260: CORPORACION MEDICA SAN MARTIN SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'CORPORACION MEDICA SAN MARTIN SAC', NULL, '20531457529', 'JR. NICOLAS DE PIEROLA NRO. 162 SAN MARTIN - SAN MARTIN - TARAPOTO', '(042) 525959', 'corpomedic.adm@gmail.com', 'activo', 'Empresa sanmartinense prestadora de servicios de salud, con más de 20 años de experiencia en la re', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20531457529');

SET @eid_20531457529 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20531457529' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20531457529, 'AUGUSTO RICARDO', 'LLONTOP REATEGUI', 'Representante Legal', 'corpomedic.adm@gmail.com', '(042) 525959', 'activo', 1, NOW()
WHERE @eid_20531457529 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20531457529 AND correo='corpomedic.adm@gmail.com');

-- empresa 261: PROFIT SOLUTIONS SOCIEDAD ANONIMA CERRADA-PROFIT SOLUTIONS S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'PROFIT SOLUTIONS SOCIEDAD ANONIMA CERRADA-PROFIT SOLUTIONS S.A.C.', NULL, '20600509781', 'CAL.OBREGON NRO. 297 DPTO. 202 URB. HIGUERETA LIMA - LIMA - SANTIAGO DE SURCO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20600509781');

SET @eid_20600509781 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20600509781' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20600509781, 'KARINA CRISTABEL', 'MORENO RODRIGUEZ', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20600509781 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20600509781 AND nombres='KARINA CRISTABEL');

-- empresa 262: A1 ESTRUCTURAS MARINA S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'A1 ESTRUCTURAS MARINA S.A.C.', NULL, '20610247793', 'AV. MIGUEL GRAU MZA. BD LOTE. 02A SEC. EL VALLE ANEXO 22 JICAMARCA LIMA - HUAROCHIRI - SAN ANTONIO', '969 864 985', 'ventas@a1estructuras.com', 'activo', 'Somos Fabricantes de estructuras metálicas para tu negocio, contamos con planta principal.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610247793');

SET @eid_20610247793 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610247793' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610247793, 'PEREZ MARINA', 'ASTO', 'Representante Legal', 'ventas@a1estructuras.com', '969 864 985', 'activo', 1, NOW()
WHERE @eid_20610247793 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610247793 AND correo='ventas@a1estructuras.com');

-- empresa 263: CONSULTORA CONSTRUCTORA NEUROSYSTEM PERU SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'CONSULTORA CONSTRUCTORA NEUROSYSTEM PERU SAC', NULL, '20573027125', 'JR. 28 DE JULIO NRO. 313 CENT C.U HUANUCO (FRENTE AL GRIFO TORRES) HUANUCO - HUANUCO - HUANUCO', '(062) 511550', 'ventas@neurosystemperu.com', 'activo', 'CONSULTORIA Estado de la Tecnología de Información en su Negocio Dirección del Dpto. de Tecnolog?', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20573027125');

SET @eid_20573027125 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20573027125' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20573027125, 'BRAVO BLANCA', 'MARTINEZ', 'Representante Legal', 'ventas@neurosystemperu.com', '(062) 511550', 'activo', 1, NOW()
WHERE @eid_20573027125 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20573027125 AND correo='ventas@neurosystemperu.com');

-- empresa 264: AMFLEX SOLUCIONES VIALES S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AMFLEX SOLUCIONES VIALES S.A.C.', NULL, '20610184449', 'MZA. I2 LOTE. 15 C.P. SANTA MARIA DE HUACHIPA LIMA - LIMA - LURIGANCHO', '956 400 288', 'ventas@amflexsoluciones.com', 'activo', 'Somos especialistas en la fabricación de productos de Caucho NEOPRENO para Puentes, Pontones, Estructuras, Construcción y la Industria en General.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610184449');

SET @eid_20610184449 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610184449' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610184449, 'ARLI BERLINER/ ANGULO VIVAS MANUEL ALEJANDRO', 'DELGADO RIVERA', 'Representante Legal', 'ventas@amflexsoluciones.com', '956 400 288', 'activo', 1, NOW()
WHERE @eid_20610184449 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610184449 AND correo='ventas@amflexsoluciones.com');

-- empresa 265: FW LOGISTICS S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'FW LOGISTICS S.A.C.', NULL, '20600298004', 'JR. STA CRUZ DE TENERIFE MZA. K LOTE. 7 URB. VALLE DE LA MOLINA (ALT OV LOS CONDORES) LIMA - LIMA - LA MOLINA', '956 286 104', 'contacto@fwlogistics.com.pe', 'activo', 'Somos una empresa especialista en Gestión de inventarios de Activos Fijos y Existencias, Tasaciones', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20600298004');

SET @eid_20600298004 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20600298004' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20600298004, 'WILDER MANUEL', 'FREYRE ALTAMIRANO', 'Representante Legal', 'contacto@fwlogistics.com.pe', '956 286 104', 'activo', 1, NOW()
WHERE @eid_20600298004 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20600298004 AND correo='contacto@fwlogistics.com.pe');

-- empresa 266: AGROINDUSTRIAS ECOVALLE S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AGROINDUSTRIAS ECOVALLE S.A.C.', NULL, '20532875731', 'AV. COLLPA MZA. L LOTE. 05 URB. LOS PINOS (OVALO TARAPACA) TACNA - TACNA - TACNA', '(+51) 957 819 664 (044) 238060', 'ventas@ecovalle.pe', 'activo', 'Somos la marca líder de productos naturales en el norte del Perú.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20532875731');

SET @eid_20532875731 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20532875731' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20532875731, 'VIZCARDO ELSA', 'VALDERRAMA', 'Representante Legal', 'ventas@ecovalle.pe', '(+51) 957 819 664 (044) 238060', 'activo', 1, NOW()
WHERE @eid_20532875731 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20532875731 AND correo='ventas@ecovalle.pe');

-- empresa 267: ARINSA DRONES Y SERVICIO DE INGENIERIA S.A.C
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ARINSA DRONES Y SERVICIO DE INGENIERIA S.A.C', NULL, '20610175181', 'AV. TUPAC AMARU MZA. V LOTE. 1 (3 CUADRAS ANTES DEL BY PASS) CUSCO - CUSCO - CUSCO', '941 971 973', 'contacto@arinsa.pe', 'activo', 'Empresa especializada en soluciones integrales y profesionales con drones.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610175181');

SET @eid_20610175181 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610175181' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610175181, 'XANY DANIEL', 'PAQUILLO LLAS', 'Representante Legal', 'contacto@arinsa.pe', '941 971 973', 'activo', 1, NOW()
WHERE @eid_20610175181 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610175181 AND correo='contacto@arinsa.pe');

-- empresa 268: ENTRE CANASTA Y DESPENSA S.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ENTRE CANASTA Y DESPENSA S.R.L.', NULL, '20608413040', 'JR. FRANCISCO TUPAC AMARU NRO. 319 URB. TUNGASUCA LIMA - LIMA - CARABAYLLO', '957 785 807', 'ventas@entrecanastaydespensa.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20608413040');

SET @eid_20608413040 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20608413040' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20608413040, 'SOFIA DE MILAGROS', 'CASTILLO RODAS', 'Representante Legal', 'ventas@entrecanastaydespensa.com', '957 785 807', 'activo', 1, NOW()
WHERE @eid_20608413040 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20608413040 AND correo='ventas@entrecanastaydespensa.com');

-- empresa 269: FINCA ARTEMIRA S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'FINCA ARTEMIRA S.A.C.', NULL, '20607893595', 'NRO. S/N CAS. SAN JUAN SALINAS CAJAMARCA - SAN IGNACIO - SAN JOSE DE LOURDES', '938 147 206', 'finca.artemira@gmail.com', 'activo', 'Produciendo cafés especiales con agricultura responsable. ☕️ Producing specialty coffees with responsible agriculture. ☕️', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20607893595');

SET @eid_20607893595 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20607893595' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20607893595, 'DIANA AMALIS', 'DELGADO CRUZ', 'Representante Legal', 'finca.artemira@gmail.com', '938 147 206', 'activo', 1, NOW()
WHERE @eid_20607893595 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20607893595 AND correo='finca.artemira@gmail.com');

-- empresa 270: JISA COMPANY SOCIEDAD ANONIMA CERRADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'JISA COMPANY SOCIEDAD ANONIMA CERRADA', NULL, '20610647783', 'CAL.14 MZA. B10 LOTE. 7 URB. SOL DE PIURA (FRENTE AL PARQUE PRINCIPAL) PIURA - PIURA - PIURA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610647783');

SET @eid_20610647783 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610647783' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610647783, 'IRANIE ALEXANDRA', 'FLORES MECHATO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20610647783 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610647783 AND nombres='IRANIE ALEXANDRA');

-- empresa 271: FORWARD GROUP S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'FORWARD GROUP S.A.C.', NULL, '20606896981', 'JR. STA CRUZ DE TENERIFE MZA. K LOTE. 7 URB. VALLE DE LA MOLINA LIMA - LIMA - LA MOLINA', 'Teléfono: +34 697 49 45 53', 'administracion@forwardgroup.es', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606896981');

SET @eid_20606896981 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606896981' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606896981, 'ROSARIO MELISSA', 'FREYRE MORENO', 'Representante Legal', 'administracion@forwardgroup.es', 'Teléfono: +34 697 49 45 53', 'activo', 1, NOW()
WHERE @eid_20606896981 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606896981 AND correo='administracion@forwardgroup.es');

-- empresa 272: ALMA INDUSTRIA CREATIVA EIRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ALMA INDUSTRIA CREATIVA EIRL', NULL, '20605526633', 'CAL.VICTOR MORALES NRO. 107 URB. VICTORIA (FRENTE A LA IGLESIA DE LOS MORMONES) AREQUIPA - AREQUIPA - AREQUIPA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605526633');

SET @eid_20605526633 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605526633' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605526633, 'JOSE CARLOS ANDRES', 'TAMAYO OPORTO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20605526633 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605526633 AND nombres='JOSE CARLOS ANDRES');

-- empresa 273: ATAO GROUP SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ATAO GROUP SAC', NULL, '20601212740', 'PAS.DE LOS EUCALIPTOS NRO. 826 URB. LOS CACTUS LIMA - LIMA - LA MOLINA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601212740');

SET @eid_20601212740 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601212740' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20601212740, 'ANICETA/ ATAO CCORISAPRA RICHAR/ ATAO CCORISAPRA DELFINO EDGAR/ PALOMINO ATAO GABRIELA', 'ATAO CCORISAPRA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20601212740 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20601212740 AND nombres='ANICETA/ ATAO CCORISAPRA RICHAR/ ATAO CCORISAPRA DELFINO EDGAR/ PALOMINO ATAO GABRIELA');

-- empresa 274: WORLD SOFTWARE PERU E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'WORLD SOFTWARE PERU E.I.R.L.', NULL, '20606141867', 'MZA. B LOTE. 08 URB. SANTA ANGELA LAMBAYEQUE - CHICLAYO - CHICLAYO', '970 940 548', 'informes@worldsoftperu.com/', 'activo', 'WORLD SOFTWARE, empresa peruana dedicada a brindar soluciones tecnológicas de primer nivel.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606141867');

SET @eid_20606141867 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606141867' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606141867, 'WILTHON GUSTAVO', 'ESPINOZA TARRILLO', 'Representante Legal', 'informes@worldsoftperu.com/', '970 940 548', 'activo', 1, NOW()
WHERE @eid_20606141867 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606141867 AND correo='informes@worldsoftperu.com/');

-- empresa 275: EXPERIMENTAL SEED E.I. R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'EXPERIMENTAL SEED E.I. R.L.', NULL, '20609209187', 'CAL.LAS VIOLETAS NRO. 822 URB. SAN BELISARIO CAJAMARCA - JAEN - JAEN', '941 461 710', 'info@experimentalseed.pe', 'activo', 'We unite coffee farmers to technically support their strive to providing their best seeds to the world', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20609209187');

SET @eid_20609209187 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20609209187' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20609209187, 'PAOLO JOSYMAR', 'BLAS AGUILAR', 'Representante Legal', 'info@experimentalseed.pe', '941 461 710', 'activo', 1, NOW()
WHERE @eid_20609209187 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20609209187 AND correo='info@experimentalseed.pe');

-- empresa 276: SILVANA PACHECO CONTADORA EIRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SILVANA PACHECO CONTADORA EIRL', NULL, '20607854832', 'MZA. D LOTE. 06 URB. SANTA LUCIA (POR LA URBANIZACION 3 DE DICIEMBRE) TACNA - TACNA - CRL. GREG. ALBARRACIN LANCHIPA', '952 914 624', 'spacheco241986@gmail.com', 'activo', 'Contadora, docente, empresaria y emprendedora. Especialista en Riesgos Laborales, en Fiscalización Tributaria Preventiva. Auditora e implentadora de ISO 9001', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20607854832');

SET @eid_20607854832 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20607854832' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20607854832, 'FERNANDEZ SILVANA', 'PACHECO', 'Representante Legal', 'spacheco241986@gmail.com', '952 914 624', 'activo', 1, NOW()
WHERE @eid_20607854832 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20607854832 AND correo='spacheco241986@gmail.com');

-- empresa 277: GRUPO HOTELERO DORDEAN S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'GRUPO HOTELERO DORDEAN S.A.C.', NULL, '20609843277', 'JR. AMAZONAS NRO. 840 URB. CHACHAPOYAS AMAZONAS - CHACHAPOYAS - CHACHAPOYAS', '936 002 539', 'reservas@hoteldordeancasonaboutique.com', 'activo', 'Dordéan Casona Colonial del siglo XIX, restaurada con estilo elegante, intimo y acogedor.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20609843277');

SET @eid_20609843277 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20609843277' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20609843277, 'CASTAÑEDA FERNANDO', 'MOROCHO', 'Representante Legal', 'reservas@hoteldordeancasonaboutique.com', '936 002 539', 'activo', 1, NOW()
WHERE @eid_20609843277 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20609843277 AND correo='reservas@hoteldordeancasonaboutique.com');

-- empresa 278: SERFINTEL SOCIEDAD ANONIMA CERRADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SERFINTEL SOCIEDAD ANONIMA CERRADA', NULL, '20517675866', 'CAL.PARQUE BLUME NRO. 130 DPTO. 501 URB. SANTA CRUZ (ENTRE CUADRA 1 Y 2 DE CALLE QUIÑONES) LIMA - LIMA - MIRAFLORES', '(+51)(01)2320229', 'contacto@serfintel.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20517675866');

SET @eid_20517675866 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20517675866' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20517675866, 'JOSE ANTONIO/ AMEZAGA MENENDEZ GONZALO EMILIO', 'AMEZAGA MENENDEZ', 'Representante Legal', 'contacto@serfintel.com', '(+51)(01)2320229', 'activo', 1, NOW()
WHERE @eid_20517675866 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20517675866 AND correo='contacto@serfintel.com');

-- empresa 279: FULL MECANICA EIRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'FULL MECANICA EIRL', NULL, '20394804411', 'CAR.PANAMERICANA NORTE KM. 774 (COSTADO FABRICA ALTOMAYO) LAMBAYEQUE - CHICLAYO - CHICLAYO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20394804411');

SET @eid_20394804411 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20394804411' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20394804411, 'OSCAR ALBERTO', 'ARRUNATEGUI SIFUENTES', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20394804411 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20394804411 AND nombres='OSCAR ALBERTO');

-- empresa 280: VEOX S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'VEOX S.A.C.', NULL, '20602091946', 'MZA. B2 LOTE. 3 URB. LUZ Y ALEGRIA (DETRAS DE COLEGIO DE CIEGOS) AREQUIPA - AREQUIPA - PAUCARPATA', '944 180 998', 'contact@veox.tech', 'activo', 'Consultora de tecnologías 4.0 para la pesca, acuicultura y medio ambiente.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20602091946');

SET @eid_20602091946 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20602091946' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20602091946, 'CHOQUEHUAYTA WILDER', 'NINA', 'Representante Legal', 'contact@veox.tech', '944 180 998', 'activo', 1, NOW()
WHERE @eid_20602091946 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20602091946 AND correo='contact@veox.tech');

-- empresa 281: COMPAÑIA CULINARIA ORION S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'COMPAÑIA CULINARIA ORION S.A.C.', NULL, '20609831830', NULL, NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20609831830');

SET @eid_20609831830 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20609831830' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20609831830, '', '', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20609831830 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20609831830 AND nombres='');

-- empresa 282: PIEDRITA GOURMET S.A. C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'PIEDRITA GOURMET S.A. C.', NULL, '20608205544', 'JR. LEONARDO BARBIERI NRO. 1255 (A 1/2 CUADRA DE AV. REPUBLICA DE PANAMA) LIMA - LIMA - SURQUILLO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20608205544');

SET @eid_20608205544 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20608205544' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20608205544, 'SEBASTIAN ALONSO', 'VEGA VATTUONE', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20608205544 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20608205544 AND nombres='SEBASTIAN ALONSO');

-- empresa 283: ARKO PRINT SOLUTIONS E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ARKO PRINT SOLUTIONS E.I.R.L.', NULL, '20610448799', 'CAL.GRANADA NRO. 145 INT. 403 URB. SAN MARTIN LIMA - LIMA - PUEBLO LIBRE (MAGDALENA VIEJA)', '992 803 311', NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610448799');

SET @eid_20610448799 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610448799' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610448799, 'KARIN STHEPFANY', 'POSTIGO LIVELLI', 'Representante Legal', NULL, '992 803 311', 'activo', 1, NOW()
WHERE @eid_20610448799 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610448799 AND nombres='KARIN STHEPFANY');

-- empresa 284: AMIGOS WASI SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AMIGOS WASI SAC', NULL, '20602643604', 'JR. SAN PABLO DE LA CRUZ NRO. 362 (FRENTE A UGEL) SAN MARTIN - SAN MARTIN - TARAPOTO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20602643604');

SET @eid_20602643604 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20602643604' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20602643604, 'CUBA CARRERA HERNANDO MANUEL/ REATEGUI GARCIA EMIL FRANK/ LETTIERI GENNARO', 'DE LA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20602643604 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20602643604 AND nombres='CUBA CARRERA HERNANDO MANUEL/ REATEGUI GARCIA EMIL FRANK/ LETTIERI GENNARO');

-- empresa 285: CERVECERIA COSTERA S. A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'CERVECERIA COSTERA S. A.C.', NULL, '20601143039', 'CAR.PANAMERICANA NORTE KM. 558 URB. MOCHE (CERCA AL OVALO DE LA MARINA) LA LIBERTAD - TRUJILLO - MOCHE', '920 089 349', 'info@costera.pe', 'activo', '#MásQueCerveza', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601143039');

SET @eid_20601143039 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601143039' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20601143039, 'RONALD MIGUEL', 'CALLACNA CHAVEZ', 'Representante Legal', 'info@costera.pe', '920 089 349', 'activo', 1, NOW()
WHERE @eid_20601143039 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20601143039 AND correo='info@costera.pe');

-- empresa 286: MISKYFROOZ COMPANY SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'MISKYFROOZ COMPANY SAC', NULL, '20604286744', 'AV. A. A. CACERES NRO. 1070 URB. CERCADO AYACUCHO - HUAMANGA - AYACUCHO', '935 400 702', 'miskyfroozayacucho@gmail.com', 'activo', 'Disfruta del yogurt helado MISKYFROOZ y vive la experiencia más natural con los toppings más deliciosos, todas las salsas que puedas imaginar, las frutas más frescas y por supuesto el frozen yogurt más nutritivo y refrescante.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20604286744');

SET @eid_20604286744 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20604286744' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20604286744, 'HUACCACHI JHONY', 'GARCIA', 'Representante Legal', 'miskyfroozayacucho@gmail.com', '935 400 702', 'activo', 1, NOW()
WHERE @eid_20604286744 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20604286744 AND correo='miskyfroozayacucho@gmail.com');

-- empresa 287: REVISIONES TECNICAS MOQUEGUA SOCIEDAD ANONIMA CERRADA REVIMOQ SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'REVISIONES TECNICAS MOQUEGUA SOCIEDAD ANONIMA CERRADA REVIMOQ SAC', NULL, '20605951164', 'LA PERLITA LOTE. 05 APV. SAN ANTONIO MOQUEGUA - MARISCAL NIETO - MOQUEGUA', '960 744 967', 'admin@revimoq.com.pe', 'activo', 'Empresa 100% Moqueguana!! Autorizada por el MTC, con excelentes profesionales capacitados.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605951164');

SET @eid_20605951164 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605951164' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605951164, 'FRANCISCA ELIZABETH/ SOTA FALCON YESSENIA', 'ARAOZ SALAS', 'Representante Legal', 'admin@revimoq.com.pe', '960 744 967', 'activo', 1, NOW()
WHERE @eid_20605951164 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605951164 AND correo='admin@revimoq.com.pe');

-- empresa 288: COMPANIA FRANCO PERUANA OPERADORA DE VIAJES Y SERVICIOS INTEGRALES DE TURISMO LAFAYETTE S. A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'COMPANIA FRANCO PERUANA OPERADORA DE VIAJES Y SERVICIOS INTEGRALES DE TURISMO LAFAYETTE S. A.C.', NULL, '20519976545', 'CAL.APURIMAC NRO. 107 (FRENTE A LA BIBLIOTECA INC) TACNA - TACNA - TACNA', '992 761 717', 'ventas@viajeslafayette.com/', 'activo', 'Especialistas en brindar las mejores Vacaciones. Atención presencial en Calle Apurímac #107 esquina con Calle Bolivar en el centro de la ciudad. Atención Virtual', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20519976545');

SET @eid_20519976545 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20519976545' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20519976545, 'JUAN DAVID/ POLO MENDOZA DAYSI MATILDE', 'ALCANTARA MARTINEZ', 'Representante Legal', 'ventas@viajeslafayette.com/', '992 761 717', 'activo', 1, NOW()
WHERE @eid_20519976545 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20519976545 AND correo='ventas@viajeslafayette.com/');

-- empresa 289: MANAGEMENT STRATEGIC GROUP 360? S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'MANAGEMENT STRATEGIC GROUP 360? S.A.C.', NULL, '20601490073', 'CAL.FRANCISCO CUNEO NRO. 340 URB. CHICLAYO LAMBAYEQUE - CHICLAYO - CHICLAYO', '969 629 589', 'informes@management360.pe', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601490073');

SET @eid_20601490073 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601490073' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20601490073, 'JANNET DEL ROCIO', 'SIALER RIVERA', 'Representante Legal', 'informes@management360.pe', '969 629 589', 'activo', 1, NOW()
WHERE @eid_20601490073 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20601490073 AND correo='informes@management360.pe');

-- empresa 290: PUNTO APARTE PRODUCC.Y SERV.GRLS. E.I.R.L
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'PUNTO APARTE PRODUCC.Y SERV.GRLS. E.I.R.L', NULL, '20532267529', 'AV. CORONEL MENDOZA NRO. SN INT. K430 C.C. MERCADILLO BOLOGNESI TACNA - TACNA - TACNA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20532267529');

SET @eid_20532267529 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20532267529' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20532267529, 'PRODUCC.Y SERV.GRLS.E.I.R.L', 'PUNTO APARTE', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20532267529 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20532267529 AND nombres='PRODUCC.Y SERV.GRLS.E.I.R.L');

-- empresa 291: E QUELLE E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'E QUELLE E.I.R.L.', NULL, '20498380931', 'AV. LIMA NRO. 309 AREQUIPA - AREQUIPA - YANAHUARA', '959 376 040', 'info@e-quelle.net', 'activo', 'Equelle es una organización internacional con base en Perú y operaciones en México; dedicada a br', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20498380931');

SET @eid_20498380931 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20498380931' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20498380931, 'ALVARO FREDDY', 'FUENTES HUANQUI', 'Representante Legal', 'info@e-quelle.net', '959 376 040', 'activo', 1, NOW()
WHERE @eid_20498380931 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20498380931 AND correo='info@e-quelle.net');

-- empresa 292: PREVISUR SAFETY & TRAINING SOCIEDAD COMERCIAL DE RESP. LIMITADA - PREVISUR SAFETY & TRAINING S.R. L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'PREVISUR SAFETY & TRAINING SOCIEDAD COMERCIAL DE RESP. LIMITADA - PREVISUR SAFETY & TRAINING S.R. L.', NULL, '20455767360', 'NRO. E-6 URB. EL DORADO AREQUIPA - AREQUIPA - SACHACA', '959309581', 'comercial@previsur.com.pe', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20455767360');

SET @eid_20455767360 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20455767360' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20455767360, 'GUSTAVO URIEL', 'CARRASCO VALDIVIA', 'Representante Legal', 'comercial@previsur.com.pe', '959309581', 'activo', 1, NOW()
WHERE @eid_20455767360 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20455767360 AND correo='comercial@previsur.com.pe');

-- empresa 293: AGRICULTURA TECNOLOGICA Y SERVICIOS SOCIEDAD ANONIMA CERRADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AGRICULTURA TECNOLOGICA Y SERVICIOS SOCIEDAD ANONIMA CERRADA', NULL, '20605136444', 'MZA. D LOTE. 11 URB. LOURDES PIURA - PIURA - PIURA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605136444');

SET @eid_20605136444 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605136444' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605136444, 'RONALD ALEJANDRO/ ADRIANZEN YARLEQUE SHELENE ROBERSY', 'RUIZ ROBLES', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20605136444 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605136444 AND nombres='RONALD ALEJANDRO/ ADRIANZEN YARLEQUE SHELENE ROBERSY');

-- empresa 294: ASESORES DE SEGURIDAD Y SALUD OCUPACIONAL ASOCIADOS SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ASESORES DE SEGURIDAD Y SALUD OCUPACIONAL ASOCIADOS SAC', NULL, '20605704213', 'CAL.ALFREDO MALDONADO NRO. 654 LIMA - LIMA - PUEBLO LIBRE (MAGDALENA VIEJA)', '960 382 196', 'servicios@assoa.com.pe/', 'activo', '¡Bienvenidos a ASSOA! Somos un equipo de asesores especialistas en materia de Seguridad y Salud', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605704213');

SET @eid_20605704213 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605704213' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605704213, 'BRYAN GUSTAVO', 'CARHUALLANQUI TAMAYO', 'Representante Legal', 'servicios@assoa.com.pe/', '960 382 196', 'activo', 1, NOW()
WHERE @eid_20605704213 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605704213 AND correo='servicios@assoa.com.pe/');

-- empresa 295: REYCAL COMPANY S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'REYCAL COMPANY S.A.C.', NULL, '20601551951', 'JR. JOSE OLAYA NRO. 250 (A UNA CUADRA DEL SEGURO ESSALUD) AMAZONAS - UTCUBAMBA - BAGUA GRANDE', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601551951');

SET @eid_20601551951 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601551951' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20601551951, 'CAROLINA ESTHER', 'LEON SEMINARIO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20601551951 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20601551951 AND nombres='CAROLINA ESTHER');

-- empresa 296: FERRETERIA TRILUX E.I. R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'FERRETERIA TRILUX E.I. R.L.', NULL, '20610042636', 'AV. CHICLAYO NRO. 1895 URB. VILLA EL SOL (ENTRE CULPON Y PARAGUAY) LAMBAYEQUE - CHICLAYO - JOSE LEONARDO ORTIZ', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610042636');

SET @eid_20610042636 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610042636' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610042636, 'DIALENY ELIZABETH', 'FERNANDEZ VASQUEZ', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20610042636 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610042636 AND nombres='DIALENY ELIZABETH');

-- empresa 297: MD TECH SOLUTIONS S. R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'MD TECH SOLUTIONS S. R.L.', NULL, '20607572497', 'CAL.LA QUEBRADA NRO. 319 URB. 3 DE OCTUBRE LAMBAYEQUE - CHICLAYO - CHICLAYO', '957 607 464', 'dcampos@mdtecperu.com', 'activo', 'Somos una empresa dedicada a la venta, instalación y mantenimiento de sistemas de seguridad, sistemas de información, redes inalámbricas y alámbricas, cableado estructurado, instalación y mantenimiento de redes de datos.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20607572497');

SET @eid_20607572497 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20607572497' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20607572497, 'MILENKA IVETTE', 'CALLIRGOS FARROÑAN', 'Representante Legal', 'dcampos@mdtecperu.com', '957 607 464', 'activo', 1, NOW()
WHERE @eid_20607572497 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20607572497 AND correo='dcampos@mdtecperu.com');

-- empresa 298: UMANA ARCHITECTURE SOCIEDAD ANONIMA CERRADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'UMANA ARCHITECTURE SOCIEDAD ANONIMA CERRADA', NULL, '20610443576', 'CAL.LOS ROBLES NRO. 395 LIMA - LIMA - SAN ISIDRO', '971260474', NULL, 'activo', 'Somos un Estudio de Arquitectura, Diseño, Gerencia y Supervisión de Proyectos con experiencia internacional basados en Lima, Perú.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610443576');

SET @eid_20610443576 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610443576' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610443576, 'PERON NICOLAS ANTONIO', 'LA ROSA', 'Representante Legal', NULL, '971260474', 'activo', 1, NOW()
WHERE @eid_20610443576 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610443576 AND nombres='PERON NICOLAS ANTONIO');

-- empresa 299: LA ENSENADA HOTEL CHACHAPOYAS E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'LA ENSENADA HOTEL CHACHAPOYAS E.I.R.L.', NULL, '20603152299', 'RM. SANTA ISABEL NRO. CD01 FND. SANTA ISABEL (PASANDO PORTICO ROJO) AMAZONAS - CHACHAPOYAS - CHACHAPOYAS', '960654387', 'informescajamarca@ensenadahotelycampo.com.pe/', 'activo', 'Un refugio encantador Al nivel que tu y tu familia merecen Hotel | Restaurante | Eventos', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20603152299');

SET @eid_20603152299 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20603152299' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20603152299, 'NOELIA SOFIA', 'RAZURI VERGARA', 'Representante Legal', 'informescajamarca@ensenadahotelycampo.com.pe/', '960654387', 'activo', 1, NOW()
WHERE @eid_20603152299 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20603152299 AND correo='informescajamarca@ensenadahotelycampo.com.pe/');

-- empresa 300: 6:30 COFFEE COMPANY S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', '6:30 COFFEE COMPANY S.A.C.', NULL, '20607246328', 'AV. MARISCAL URETA NRO. 1002 SEC. JAEN CAJAMARCA - JAEN - JAEN', '(076) 785207', 'ventas@630.cafe', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20607246328');

SET @eid_20607246328 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20607246328' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20607246328, 'ANITA / JULCA RANGEL ELVIS', 'LLANOS ARCE', 'Representante Legal', 'ventas@630.cafe', '(076) 785207', 'activo', 1, NOW()
WHERE @eid_20607246328 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20607246328 AND correo='ventas@630.cafe');

-- empresa 301: CONSORCIO AYLLU S.A. C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'CONSORCIO AYLLU S.A. C.', NULL, '20608103253', 'CLUB DE LA UNION NRO. 364 CLUB DE LA UNION (CLUB DE LA UNION 364, 2DO PISO) LIMA - LIMA - LIMA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20608103253');

SET @eid_20608103253 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20608103253' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20608103253, 'NATALI PAOLA', 'SILVA TAFUR', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20608103253 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20608103253 AND nombres='NATALI PAOLA');

-- empresa 303: SAEB REPRESENTACIONES COMERCIALES S.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SAEB REPRESENTACIONES COMERCIALES S.R.L.', NULL, '20606895128', 'AV. CAHUIDE NRO. 504 URB. ALTO SELVA ALEGRE AREQUIPA - AREQUIPA - ALTO SELVA ALEGRE', '958', 'gerenciacomercial@saeb.pe', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606895128');

SET @eid_20606895128 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606895128' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606895128, 'LUIS MANUEL', 'TEJADA TORRES', 'Representante Legal', 'gerenciacomercial@saeb.pe', '958', 'activo', 1, NOW()
WHERE @eid_20606895128 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606895128 AND correo='gerenciacomercial@saeb.pe');

-- empresa 304: RADICAL CORP SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'RADICAL CORP SAC', NULL, '20545146895', 'JR. REY DE BAHAMONDE NRO. 111 LIMA - LIMA - SANTIAGO DE SURCO', '(01) 6404440', 'administracion@radicalcorp.pe', 'activo', 'Somos una agencia de Publicidad, Promoción y Marketing que tiene como objetivo el desarrollo de ide', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20545146895');

SET @eid_20545146895 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20545146895' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20545146895, 'GISELA PATRICIA', 'ROSALES CARDENAS', 'Representante Legal', 'administracion@radicalcorp.pe', '(01) 6404440', 'activo', 1, NOW()
WHERE @eid_20545146895 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20545146895 AND correo='administracion@radicalcorp.pe');

-- empresa 305: SERVICIOS GENERALES VEGA COMPANY EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SERVICIOS GENERALES VEGA COMPANY EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA', NULL, '20606085231', 'JR. ALMAGRO NRO. 313 BAR. CERRO COLORADO (MERCADO CERRO COLORADO) PUNO - SAN ROMAN - JULIACA', '935 461 113', 'vegacompany.ventas@gmail.com', 'activo', '*Venta y alquiler de equipos industriales de pintura. *Alquiler de equipos de construcción en general. *Servicios de construccion, estructuras metalicas. *Mantenimiento en general. *Servicios de fumigacion y desinfectacion.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606085231');

SET @eid_20606085231 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606085231' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606085231, 'ELVIS ALEJANDRO', 'VEGA ALMANZA', 'Representante Legal', 'vegacompany.ventas@gmail.com', '935 461 113', 'activo', 1, NOW()
WHERE @eid_20606085231 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606085231 AND correo='vegacompany.ventas@gmail.com');

-- empresa 306: INTI SNACKS SOCIEDAD COMERCIAL DE RESPONSABILIDAD LIMITADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'INTI SNACKS SOCIEDAD COMERCIAL DE RESPONSABILIDAD LIMITADA', NULL, '20606011319', 'JR. LOS PINOS MZA. A LOTE. 17 (PARALELO A LAWN TENNIS) HUANUCO - HUANUCO - AMARILIS', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606011319');

SET @eid_20606011319 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606011319' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606011319, 'CARLOS ALBERTO BALTAZAR', 'ROJAS RIVAS', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20606011319 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606011319 AND nombres='CARLOS ALBERTO BALTAZAR');

-- empresa 307: SMILE J & F S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SMILE J & F S.A.C.', NULL, '20606425075', 'AV. FAUCETT 1775-1779 NRO. 1775 URB. JARDINES DE VIRÚ (SEGUNDO PISO) PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - BELLAVISTA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606425075');

SET @eid_20606425075 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606425075' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606425075, 'VILMA JHOSELYN', 'LINARES LINARES', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20606425075 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606425075 AND nombres='VILMA JHOSELYN');

-- empresa 309: NAVIERA JULY DORIS E.I. R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'NAVIERA JULY DORIS E.I. R.L.', NULL, '20605057862', 'VIA DE EVITAMIENTO NRO. S/N (AL COSTADO DEL COMERCIAL JYK) LORETO - ALTO AMAZONAS - YURIMAGUAS', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605057862');

SET @eid_20605057862 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605057862' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605057862, 'JULY DORIS', 'GARCIA BARTRA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20605057862 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605057862 AND nombres='JULY DORIS');

-- empresa 310: INVERSIONES & SERVICIOS J.C. LLANTAS S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'INVERSIONES & SERVICIOS J.C. LLANTAS S.A.C.', NULL, '20605389636', 'PRO.VALLEJO MZA. 24 LOTE. 6 URB. LA RINCONADA LA LIBERTAD - TRUJILLO - TRUJILLO', '921 446 697', NULL, 'activo', 'VENTA E INSTALACIÓN DE NEUMATICOS PARA MOTO', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605389636');

SET @eid_20605389636 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605389636' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605389636, 'ROCIO DEL PILAR', 'MORALES CASTAÑEDA', 'Representante Legal', NULL, '921 446 697', 'activo', 1, NOW()
WHERE @eid_20605389636 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605389636 AND nombres='ROCIO DEL PILAR');

-- empresa 311: COMERCIAL WALTER Y FABIANI KID'S E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'COMERCIAL WALTER Y FABIANI KID\'S E.I.R.L.', NULL, '20487750809', 'JR. MATIAZA RIMACHI NRO. 515 (FRENTE A LA MUNICIPALIDAD) AMAZONAS - RODRIGUEZ DE MENDOZA - SAN NICOLAS', NULL, NULL, 'activo', 'Ropa, calzado y accesorios para damas, caballeros y niños', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20487750809');

SET @eid_20487750809 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20487750809' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20487750809, 'TAFUR MANUEL', 'GUEVARA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20487750809 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20487750809 AND nombres='TAFUR MANUEL');

-- empresa 312: T4B GROUP S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'T4B GROUP S.A.C.', NULL, '20603222491', 'CAL.ALFREDO MALDONADO NRO. 654 LIMA - LIMA - PUEBLO LIBRE (MAGDALENA VIEJA)', '981 255 540', 'info@t4b.pe', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20603222491');

SET @eid_20603222491 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20603222491' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20603222491, 'GIOVANNA PATRICIA', 'MORENO BENAVENTE', 'Representante Legal', 'info@t4b.pe', '981 255 540', 'activo', 1, NOW()
WHERE @eid_20603222491 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20603222491 AND correo='info@t4b.pe');

-- empresa 313: RDSP EIRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'RDSP EIRL', NULL, '20478010282', 'AV. SAN BORJA SUR NRO. 233 (ALT. CDRA 30 AV. AVIACION) LIMA - LIMA - SAN BORJA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20478010282');

SET @eid_20478010282 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20478010282' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20478010282, 'PEIXOTO LUNA RONNY ORLANDO', 'DE SOUZA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20478010282 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20478010282 AND nombres='PEIXOTO LUNA RONNY ORLANDO');

-- empresa 314: NEGOCIOS Y MECANICA VIAL EIRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'NEGOCIOS Y MECANICA VIAL EIRL', NULL, '20606550589', 'JR. SINCHI ROCA NRO. 698 (A UNA CUADRA DEL MERCADO DE SAN LUIS) AMAZONAS - UTCUBAMBA - BAGUA GRANDE', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20606550589');

SET @eid_20606550589 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20606550589' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20606550589, 'DANY LILIANA', 'MENDOZA RIMAPA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20606550589 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20606550589 AND nombres='DANY LILIANA');

-- empresa 315: MERCURY FACILITIES MANAGEMENT SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'MERCURY FACILITIES MANAGEMENT SAC', NULL, '20607816213', 'CAL.CORONEL INCLAN NRO. 235 INT. 705 LIMA - LIMA - MIRAFLORES', '949 731 383', 'ventas@mercuryfmperu.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20607816213');

SET @eid_20607816213 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20607816213' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20607816213, 'JOSE ENRIQUE', 'LARRIVIERE GARCIA', 'Representante Legal', 'ventas@mercuryfmperu.com', '949 731 383', 'activo', 1, NOW()
WHERE @eid_20607816213 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20607816213 AND correo='ventas@mercuryfmperu.com');

-- empresa 316: MODULARE S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'MODULARE S.A.C.', NULL, '20605251065', 'AV. DEFENSORES DEL MORRO NRO. 759 (A 1/2 DEL PARQUE FATIMA) LIMA - LIMA - CHORRILLOS', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605251065');

SET @eid_20605251065 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605251065' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605251065, 'LUQUE DANILO', 'MOLDAUER', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20605251065 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605251065 AND nombres='LUQUE DANILO');

-- empresa 317: SALUD OFTALMOLOGICA COMUNITARIO E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SALUD OFTALMOLOGICA COMUNITARIO E.I.R.L.', NULL, '20605460764', 'PJ. LAS TUNAS NRO. 270 SAN MARTIN - SAN MARTIN - LA BANDA DE SHILCAYO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605460764');

SET @eid_20605460764 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605460764' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605460764, 'LUIS FELIPE', 'AREVALO AREVALO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20605460764 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605460764 AND nombres='LUIS FELIPE');

-- empresa 318: NAVARRETE COMPANY EIRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'NAVARRETE COMPANY EIRL', NULL, '20604332622', 'MZA. F LOTE. 14 URB. LOS MEDANOS (ENTRADA DEL AEROPUERTO) ICA - ICA - SUBTANJALLA', '985 531 289', 'admin@navarretecompany.com/', 'activo', 'Alquiler de camionetas con conductor para servicios corporativos, particulares, minería, transporte de personal, turismo y excursión.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20604332622');

SET @eid_20604332622 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20604332622' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20604332622, 'ERIK SANTIAGO', 'LLAMOCA NAVARRETE', 'Representante Legal', 'admin@navarretecompany.com/', '985 531 289', 'activo', 1, NOW()
WHERE @eid_20604332622 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20604332622 AND correo='admin@navarretecompany.com/');

-- empresa 319: UNION DE EMPRESAS CONTRATISTAS E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'UNION DE EMPRESAS CONTRATISTAS E.I.R.L.', NULL, '20608942409', 'AV. GENERAL EUGENIO GARZON NRO. 1472 DPTO. 302 FND. OYAGUE LIMA - LIMA - JESUS MARIA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20608942409');

SET @eid_20608942409 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20608942409' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20608942409, 'JULIO CESAR', 'ARANA VIZCARDO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20608942409 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20608942409 AND nombres='JULIO CESAR');

-- empresa 320: RODELAB SOCIEDAD ANONIMA CERRADA RODELAB SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'RODELAB SOCIEDAD ANONIMA CERRADA RODELAB SAC', NULL, '20549512217', 'AV. MANUEL VICENTE VILLARAN NRO. 891 URB. LOS SAUCES (ALT. DE LA CDRA 8 DE VILLARAN) LIMA - LIMA - SURQUILLO', '991 997 669', 'informes@rodelab.com.pe', 'activo', 'Somos tu laboratorio clínico de confianza. 👩‍🔬 🩺', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20549512217');

SET @eid_20549512217 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20549512217' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20549512217, 'VERONICA CECILIA', 'ROCERO PALOMINO', 'Representante Legal', 'informes@rodelab.com.pe', '991 997 669', 'activo', 1, NOW()
WHERE @eid_20549512217 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20549512217 AND correo='informes@rodelab.com.pe');

-- empresa 321: PEQUES MODA EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA - PEQUES MODA E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'PEQUES MODA EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA - PEQUES MODA E.I.R.L.', NULL, '20454718535', 'CAL.VILLAFUERTE NRO. 329A AREQUIPA - AREQUIPA - MIRAFLORES', '972 427 179', NULL, 'activo', 'Ropa infantil moderna, de alta calidad para tu Peque 👶💖 Diseños exclusivos hechos con amor❤️ en Arequipa ¡Ideales para acompañar cada etapa de tus pequeños! 🌟', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20454718535');

SET @eid_20454718535 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20454718535' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20454718535, 'VICENTE FIDEL', 'CARDEÑA QUISPE', 'Representante Legal', NULL, '972 427 179', 'activo', 1, NOW()
WHERE @eid_20454718535 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20454718535 AND nombres='VICENTE FIDEL');

-- empresa 322: CHIRAPA MANTA S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'CHIRAPA MANTA S.A.C.', NULL, '20600065115', 'JR. BANDA DE SAN ROQUE NRO. S/N SAN MARTIN - LAMAS - SAN ROQUE DE CUMBAZA', '936 117 004', 'chirapamanta@gmail.com', 'activo', 'INSPIRED BY NATURE! Hemos creado un espacio integrado al bosque tropical y al pie del Río Cumbaza, para que tu estancia sea inspiradora y transformadora. Promovemos el encuentro de uno mismo en conexión con la naturaleza. Hospedamos grupos y retiros.', NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20600065115');

SET @eid_20600065115 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20600065115' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20600065115, 'FERNANDO MARTIN/ GOMEZ MORA FERNANDO MARTIN', 'GOMEZ MORA', 'Representante Legal', 'chirapamanta@gmail.com', '936 117 004', 'activo', 1, NOW()
WHERE @eid_20600065115 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20600065115 AND correo='chirapamanta@gmail.com');

-- empresa 323: CONTADORES ADMINISTRADORES ABOGADOS Y ECONOMISTAS SOCIEDAD ANONIMA CERRADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'CONTADORES ADMINISTRADORES ABOGADOS Y ECONOMISTAS SOCIEDAD ANONIMA CERRADA', NULL, '20603525974', 'MZA. R1 LOTE. 33 URB. MIRAFLORES 2 ETAPA (ESPALDAS DE COLEGIO SANTA MONICA) PIURA - PIURA - CASTILLA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20603525974');

SET @eid_20603525974 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20603525974' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20603525974, 'OJEDA MARISOL', 'TINEO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20603525974 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20603525974 AND nombres='OJEDA MARISOL');

-- empresa 324: PACIFIC ALLIANCE TRADING COMPANY SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'PACIFIC ALLIANCE TRADING COMPANY SAC', NULL, '20556838675', 'CAR.PIURA CURUMUY KM. 12 MZA. R LOTE. 12 INT. 3 CAS. SANTA SARA PIURA - PIURA - PIURA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20556838675');

SET @eid_20556838675 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20556838675' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20556838675, 'JORGE KILDER', 'AVILA OLIVARES', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20556838675 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20556838675 AND nombres='JORGE KILDER');

-- empresa 325: SUMAQ LICORERIA S.A. C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SUMAQ LICORERIA S.A. C.', NULL, '20609712229', 'AV. LA LIBERTAD NRO. 566 URB. SANTA VICTORIA 2 PISO LAMBAYEQUE - CHICLAYO - CHICLAYO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20609712229');

SET @eid_20609712229 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20609712229' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20609712229, 'ELSA MARIA FERNANDA', 'FLORES BALAREZO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20609712229 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20609712229 AND nombres='ELSA MARIA FERNANDA');

-- empresa 326: AUTOMOTRIZ VICTOR MANUEL S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'AUTOMOTRIZ VICTOR MANUEL S.A.C.', NULL, '20511983798', 'AV. MICAELA BASTIDAS NRO. 1651 SECTOR 02 GRUPO 18 (MZ. J LT. 17) LIMA - LIMA - VILLA EL SALVADOR', '998 232 786', 'automotrizvm@gmail.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20511983798');

SET @eid_20511983798 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20511983798' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20511983798, 'VICTOR MANUEL', 'LOZADA PALOMINO', 'Representante Legal', 'automotrizvm@gmail.com', '998 232 786', 'activo', 1, NOW()
WHERE @eid_20511983798 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20511983798 AND correo='automotrizvm@gmail.com');

-- empresa 327: EMPRESA DE SERVICIOS DE HOSPEDAJE TERESA DE JESUS EIRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'EMPRESA DE SERVICIOS DE HOSPEDAJE TERESA DE JESUS EIRL', NULL, '20480278900', 'CAL.DIEGO PALOMINO NRO. 1413 CENT JAEN (2DO. PISO CASINO LAS VEGAS) CAJAMARCA - JAEN - JAEN', '(076) 431152', 'gerencia@cancunhoteljaen.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20480278900');

SET @eid_20480278900 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20480278900' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20480278900, 'ABANTO AMANDA JUANA', 'CAMPOS DE', 'Representante Legal', 'gerencia@cancunhoteljaen.com', '(076) 431152', 'activo', 1, NOW()
WHERE @eid_20480278900 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20480278900 AND correo='gerencia@cancunhoteljaen.com');

-- empresa 328: GESTREM IDI CONSULTING S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'GESTREM IDI CONSULTING S.A.C.', NULL, '20604400890', 'MZA. D LOTE. 2 URB. LA MARINA AREQUIPA - AREQUIPA - CAYMA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20604400890');

SET @eid_20604400890 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20604400890' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20604400890, 'GAUDY NOELIA', 'HUARANGA BEGAZO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20604400890 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20604400890 AND nombres='GAUDY NOELIA');

-- empresa 329: INNGRESA S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'INNGRESA S.A.C.', NULL, '20601459966', 'AV. TOMAS VALLE NRO. 1250 DPTO. 201 INT. 12 RES. PASEO TOMAS VALLE LIMA - LIMA - LOS OLIVOS', '(1) 4136166', 'info@inngresa.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601459966');

SET @eid_20601459966 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601459966' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20601459966, 'GROVER MANUEL', 'CAMPOS ANCAJIMA', 'Representante Legal', 'info@inngresa.com', '(1) 4136166', 'activo', 1, NOW()
WHERE @eid_20601459966 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20601459966 AND correo='info@inngresa.com');

-- empresa 330: COMERCIOS RUSTIKA E. I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'COMERCIOS RUSTIKA E. I.R.L.', NULL, '20604824797', 'CAL.SAN MATIN NRO. 596 PIURA - SECHURA - SECHURA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20604824797');

SET @eid_20604824797 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20604824797' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20604824797, 'PETRONILA ARACELI', 'PERICHE AMAYA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20604824797 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20604824797 AND nombres='PETRONILA ARACELI');

-- empresa 331: ALMAREST S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ALMAREST S.A.C.', NULL, '20610269754', 'CAL.ARRIGO VANNINI NRO. 186 DPTO. 401 URB. VISTA ALEGRE LIMA - LIMA - SANTIAGO DE SURCO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610269754');

SET @eid_20610269754 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610269754' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610269754, 'SANTISTEBAN HERBERT', 'ROJAS SILVA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20610269754 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610269754 AND nombres='SANTISTEBAN HERBERT');

-- empresa 332: IMPULSA STARTUP STUDIO S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'IMPULSA STARTUP STUDIO S.A.C.', NULL, '20609352192', 'JR. EL CORTIJO NRO. 442 DPTO. 604 LIMA - LIMA - SANTIAGO DE SURCO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20609352192');

SET @eid_20609352192 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20609352192' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20609352192, 'JORGE MARCELINO', 'CHANG VELASQUEZ', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20609352192 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20609352192 AND nombres='JORGE MARCELINO');

-- empresa 333: CB ENERGIAS RENOVABLES E.I.R.L
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'CB ENERGIAS RENOVABLES E.I.R.L', NULL, '20605340220', 'MZA. B LOTE. 30 URB. LOS PINOS (ESPALDAS DEL INSTITUTO CIRO ALEGRIA) LA LIBERTAD - CHEPEN - CHEPEN', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605340220');

SET @eid_20605340220 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605340220' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605340220, 'ROBERT FRANKLIN', 'COTRINA LEZAMA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20605340220 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605340220 AND nombres='ROBERT FRANKLIN');

-- empresa 334: GRUPO SOTO CONTADORES E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'GRUPO SOTO CONTADORES E.I.R.L.', NULL, '20607697168', 'AV. AVIACION NRO. 2905 INT. 403 URB. SAN BORJA SUR LIMA - LIMA - SAN BORJA', '965499069', 'gruposotocontadores@gmail.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20607697168');

SET @eid_20607697168 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20607697168' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20607697168, 'ANTHONY NIXON', 'SOTO ESPINOZA', 'Representante Legal', 'gruposotocontadores@gmail.com', '965499069', 'activo', 1, NOW()
WHERE @eid_20607697168 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20607697168 AND correo='gruposotocontadores@gmail.com');

-- empresa 335: SOLUCIONES EN PROYECTOS INTEGRALES S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SOLUCIONES EN PROYECTOS INTEGRALES S.A.C.', NULL, '20554228691', 'CAL.LAS ENCINAS NRO. 396 INT. 205 URB. LOS JARDINES LIMA - LIMA - SAN MARTIN DE PORRES', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20554228691');

SET @eid_20554228691 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20554228691' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20554228691, 'MARCO ANTONIO', 'MARIÑOS ESPINO', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20554228691 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20554228691 AND nombres='MARCO ANTONIO');

-- empresa 336: GRUPO R&D CONSTRUCCION E INGENIERIA SOCIEDAD ANINIMA CERRADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'GRUPO R&D CONSTRUCCION E INGENIERIA SOCIEDAD ANINIMA CERRADA', NULL, '20605220755', 'AV. AGUSTIN VALLEJOS ZAVALA NRO. 649 URB. LAS BRISAS (FRENTE A LA PLANTA ELÉCTRICA) LAMBAYEQUE - CHICLAYO - CHICLAYO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605220755');

SET @eid_20605220755 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605220755' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605220755, 'DIEGO ARMANDO MARTIN', 'UGAZ IÑAPE', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20605220755 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605220755 AND nombres='DIEGO ARMANDO MARTIN');

-- empresa 337: ZENTRA HOTEL EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ZENTRA HOTEL EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA', NULL, '20604615331', 'CAL.LEONCIO PRADO NRO. 919 LAMBAYEQUE - CHICLAYO - CHICLAYO', '979904370', 'acuarioreal@hotmail.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20604615331');

SET @eid_20604615331 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20604615331' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20604615331, 'RICARDO ROBERTO', 'CASTREJON ESPINO', 'Representante Legal', 'acuarioreal@hotmail.com', '979904370', 'activo', 1, NOW()
WHERE @eid_20604615331 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20604615331 AND correo='acuarioreal@hotmail.com');

-- empresa 338: MAQUINAS DE FRIO WIN E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'MAQUINAS DE FRIO WIN E.I.R.L.', NULL, '20601242151', 'CAL.AZTECA MZA. M LOTE. 10 A.H. LOS PORTALES DE PURUCHUCO LIMA - LIMA - ATE', '987 497 199', 'edwinroberestebanchuco@gmail.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601242151');

SET @eid_20601242151 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601242151' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20601242151, 'EDWIN ROBER', 'ESTEBAN CHUCO', 'Representante Legal', 'edwinroberestebanchuco@gmail.com', '987 497 199', 'activo', 1, NOW()
WHERE @eid_20601242151 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20601242151 AND correo='edwinroberestebanchuco@gmail.com');

-- empresa 339: ABACONT ASESORES Y CONSULTORES EMPRESARIALES SAC
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ABACONT ASESORES Y CONSULTORES EMPRESARIALES SAC', NULL, '20494080720', 'JR. MAXIMILIANO MURRIETA NRO. 434 INT. 201 SAN MARTIN - SAN MARTIN - LA BANDA DE SHILCAYO', '51942014417', 'info@abacontsac.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20494080720');

SET @eid_20494080720 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20494080720' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20494080720, 'RUIZ HEIDY', 'GARCIA', 'Representante Legal', 'info@abacontsac.com', '51942014417', 'activo', 1, NOW()
WHERE @eid_20494080720 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20494080720 AND correo='info@abacontsac.com');

-- empresa 340: MULTISERVICIOS VACOMAQ E.I.R.L.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'MULTISERVICIOS VACOMAQ E.I.R.L.', NULL, '20605585303', 'MZA. C LOTE. 12 SEC. CUMBASILLO (AL COSTADO DE MERCADO SANTA ANITA) SAN MARTIN - SAN MARTIN - MORALES', '955352670', 'mirianlopez22.07@gmail.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20605585303');

SET @eid_20605585303 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20605585303' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20605585303, 'CORONEL JAIME', 'VARGAS', 'Representante Legal', 'mirianlopez22.07@gmail.com', '955352670', 'activo', 1, NOW()
WHERE @eid_20605585303 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20605585303 AND correo='mirianlopez22.07@gmail.com');

-- empresa 341: INDIGO PARTNERS S.A.C. - INDPART S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'INDIGO PARTNERS S.A.C. - INDPART S.A.C.', NULL, '20604110697', 'ANDRES DE SANTA CRUZ NRO. 367 DPTO. 804 URB. DEL FUNDO LIMA - LIMA - JESUS MARIA', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20604110697');

SET @eid_20604110697 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20604110697' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20604110697, 'JULIO CESAR', 'TORRES VALENCIA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20604110697 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20604110697 AND nombres='JULIO CESAR');

-- empresa 342: SCE CONSULTING & BUSINESS SOCIEDAD ANONIMA CERRADA
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'SCE CONSULTING & BUSINESS SOCIEDAD ANONIMA CERRADA', NULL, '20610416650', 'CAL.PORTA NRO. 170 DPTO. 809 (ALT PARQUE KENNEDY) LIMA - LIMA - MIRAFLORES', '(+511) 409', 'jsalinas@sce.pe', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20610416650');

SET @eid_20610416650 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20610416650' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20610416650, 'JUAN CARLOS', 'SALINAS CUMARI', 'Representante Legal', 'jsalinas@sce.pe', '(+511) 409', 'activo', 1, NOW()
WHERE @eid_20610416650 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20610416650 AND correo='jsalinas@sce.pe');

-- empresa 343: CAP TRANSPORTES Y SERVICIOS SRL
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'CAP TRANSPORTES Y SERVICIOS SRL', NULL, '20539035925', 'MZA. P LOTE. 19 URB. PUERTA DEL SOL. (RES. GALILEA.) LAMBAYEQUE - CHICLAYO - CHICLAYO', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20539035925');

SET @eid_20539035925 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20539035925' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20539035925, 'CESAR AUGUSTO', 'PERALTA LALOPU', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20539035925 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20539035925 AND nombres='CESAR AUGUSTO');

-- empresa 344: FUSION BIJOU COMPANY S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'FUSION BIJOU COMPANY S.A.C.', NULL, '20604686475', 'AV. PRECURSORES NRO. 1192 LIMA - LIMA - SAN MIGUEL', '1', NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20604686475');

SET @eid_20604686475 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20604686475' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20604686475, 'WILFREDO ROLANDO', 'SOSA ASUAJE', 'Representante Legal', NULL, '1', 'activo', 1, NOW()
WHERE @eid_20604686475 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20604686475 AND nombres='WILFREDO ROLANDO');

-- empresa 345: FARIA NATURALS S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'FARIA NATURALS S.A.C.', NULL, '20604244863', 'AV. MARISCAL ELOY URETA NRO. 429 URB. EL PINO LIMA - LIMA - SAN LUIS', NULL, NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20604244863');

SET @eid_20604244863 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20604244863' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20604244863, 'ANDREA ALESSANDRA', 'RUSCA MONTOYA', 'Representante Legal', NULL, NULL, 'activo', 1, NOW()
WHERE @eid_20604244863 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20604244863 AND nombres='ANDREA ALESSANDRA');

-- empresa 346: BLUE MOUNTAIN COFFEE PROCESSES AND TRADING S.A.C.
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'BLUE MOUNTAIN COFFEE PROCESSES AND TRADING S.A.C.', NULL, '20611336684', 'AV. MARAÑON NRO. SN CAJAMARCA - CUTERVO - SANTO TOMAS', '935172687', 'bluemountaincoffeesac@gmail.com', 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20611336684');

SET @eid_20611336684 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20611336684' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20611336684, 'BAUTISTA LUCY', 'CRUZ', 'Representante Legal', 'bluemountaincoffeesac@gmail.com', '935172687', 'activo', 1, NOW()
WHERE @eid_20611336684 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20611336684 AND correo='bluemountaincoffeesac@gmail.com');

-- empresa 347: ADN BIOLOGICAL NUTRITION E.I.R.L
INSERT INTO mk_empresa_cliente (type, razon_social, nombre_comercial, ruc, direccion, telefono, email, estado, observaciones, created_at, updated_at)
SELECT 'empresa', 'ADN BIOLOGICAL NUTRITION E.I.R.L', NULL, '20601756618', 'CAL.MIGUEL ALJOVIN NRO. 209 DPTO. 301 URB. EL ROSEDAL LIMA - LIMA - MIRAFLORES', '992250646', NULL, 'activo', NULL, NOW(), NOW()

WHERE NOT EXISTS (SELECT 1 FROM mk_empresa_cliente WHERE ruc = '20601756618');

SET @eid_20601756618 = (SELECT id FROM mk_empresa_cliente WHERE ruc = '20601756618' LIMIT 1);
INSERT INTO mk_empresa_contacto (empresa_id, nombres, apellidos, cargo, correo, telefono, estado, is_principal, created_at)
SELECT @eid_20601756618, 'ANKA WENDY', 'SOKCEVIC SILVERA', 'Representante Legal', NULL, '992250646', 'activo', 1, NOW()
WHERE @eid_20601756618 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM mk_empresa_contacto WHERE empresa_id=@eid_20601756618 AND nombres='ANKA WENDY');


-- Total insertados: 337, skipped (sin RUC válido): 10

SET FOREIGN_KEY_CHECKS = 1;