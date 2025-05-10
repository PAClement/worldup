CREATE TABLE `web_account` (
	`id` varchar(36) NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`userId` varchar(36) NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` timestamp,
	`refresh_token_expires_at` timestamp,
	`scope` text,
	`password` text,
	`created_at` timestamp NOT NULL,
	`updated_at` timestamp NOT NULL,
	CONSTRAINT `web_account_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `web_session` (
	`id` varchar(36) NOT NULL,
	`expires_at` timestamp NOT NULL,
	`token` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL,
	`updated_at` timestamp NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`userId` varchar(36) NOT NULL,
	CONSTRAINT `web_session_id` PRIMARY KEY(`id`),
	CONSTRAINT `web_session_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `web_user` (
	`id` varchar(36) NOT NULL,
	`name` text NOT NULL,
	`email` varchar(255) NOT NULL,
	`email_verified` boolean NOT NULL,
	`image` text,
	`created_at` timestamp NOT NULL,
	`updated_at` timestamp NOT NULL,
	CONSTRAINT `web_user_id` PRIMARY KEY(`id`),
	CONSTRAINT `web_user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `web_verification` (
	`id` varchar(36) NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` timestamp NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `web_verification_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `web_account` ADD CONSTRAINT `web_account_userId_web_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `web_user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `web_session` ADD CONSTRAINT `web_session_userId_web_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `web_user`(`id`) ON DELETE cascade ON UPDATE no action;