ALTER TABLE `asset_opportunity_matches` DROP FOREIGN KEY `asset_opportunity_matches_asset_id_vault_assets_id_fk`;
--> statement-breakpoint
ALTER TABLE `asset_opportunity_matches` DROP FOREIGN KEY `asset_opportunity_matches_opportunity_id_marketplace_opportunities_id_fk`;
--> statement-breakpoint
ALTER TABLE `wealth_agreements` DROP FOREIGN KEY `wealth_agreements_party_a_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `wealth_agreements` DROP FOREIGN KEY `wealth_agreements_party_b_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `wealth_agreements` DROP FOREIGN KEY `wealth_agreements_asset_id_vault_assets_id_fk`;
--> statement-breakpoint
ALTER TABLE `wealth_agreements` DROP FOREIGN KEY `wealth_agreements_opportunity_id_marketplace_opportunities_id_fk`;
--> statement-breakpoint
ALTER TABLE `wealth_transactions` DROP FOREIGN KEY `wealth_transactions_agreement_id_wealth_agreements_id_fk`;
--> statement-breakpoint
ALTER TABLE `wealth_transactions` DROP FOREIGN KEY `wealth_transactions_from_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `wealth_transactions` DROP FOREIGN KEY `wealth_transactions_to_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `wealth_transactions` DROP FOREIGN KEY `wealth_transactions_asset_id_vault_assets_id_fk`;
