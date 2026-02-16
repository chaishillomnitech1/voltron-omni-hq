CREATE TABLE `chat_messages` (
	`id` varchar(64) NOT NULL,
	`user_id` int NOT NULL,
	`author` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`type` enum('user','bot','system') DEFAULT 'user',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chat_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `github_events` (
	`id` varchar(64) NOT NULL,
	`repository` varchar(255) NOT NULL,
	`event_type` enum('push','pull_request','issue','release') NOT NULL,
	`author` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`url` varchar(500),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `github_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` varchar(64) NOT NULL,
	`user_id` int,
	`type` enum('chat','github','system','success','error') NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`read` boolean DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
