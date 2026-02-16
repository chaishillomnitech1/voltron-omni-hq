CREATE TABLE `admin_logs` (
	`id` varchar(64) NOT NULL,
	`admin_id` int NOT NULL,
	`action` varchar(100) NOT NULL,
	`target_id` varchar(64),
	`details` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `admin_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `flagged_messages` (
	`id` varchar(64) NOT NULL,
	`message_id` varchar(64) NOT NULL,
	`flagged_by` int NOT NULL,
	`reason` varchar(255) NOT NULL,
	`status` enum('pending','reviewed','resolved') DEFAULT 'pending',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `flagged_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`display_name` varchar(255),
	`bio` text,
	`avatar_url` varchar(500),
	`notification_email_enabled` boolean DEFAULT true,
	`notification_chat_enabled` boolean DEFAULT true,
	`notification_github_enabled` boolean DEFAULT true,
	`theme_preference` varchar(50) DEFAULT 'rose-gold',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_profiles_user_id_unique` UNIQUE(`user_id`)
);
