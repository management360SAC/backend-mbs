-- CreateTable
CREATE TABLE `tenants` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `db_name` VARCHAR(100) NOT NULL,
    `db_host` VARCHAR(255) NOT NULL DEFAULT 'db',
    `db_port` INTEGER NOT NULL DEFAULT 3306,
    `db_user` VARCHAR(100) NOT NULL DEFAULT 'crm',
    `db_pass` VARCHAR(255) NOT NULL DEFAULT 'crm',
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tenants_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
