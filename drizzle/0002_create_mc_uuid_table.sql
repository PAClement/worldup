CREATE TABLE `web_mc_account_link` (
	`id` varchar(36) NOT NULL,
	`userId` varchar(36) NOT NULL,
	`mc_uuid` text NOT NULL,
	CONSTRAINT `web_mc_account_link_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `web_mc_account_link` ADD CONSTRAINT `web_mc_account_link_userId_web_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `web_user`(`id`) ON DELETE cascade ON UPDATE no action;