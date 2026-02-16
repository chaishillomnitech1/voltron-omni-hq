import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { userVaults, vaultAssets, InsertUserVault, InsertVaultAsset } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export const vaultRouter = router({
  /**
   * Create a new user vault
   */
  createVault: protectedProcedure
    .input(
      z.object({
        vaultName: z.string().min(1).max(255),
        bio: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const vault: InsertUserVault = {
        userId: ctx.user.id,
        vaultName: input.vaultName,
        bio: input.bio,
        totalAssetsCount: 0,
        estimatedAnnualValue: 0,
      };

      await db.insert(userVaults).values(vault);
      const created = await db
        .select()
        .from(userVaults)
        .where(eq(userVaults.userId, ctx.user.id))
        .limit(1);
      return created[0] || vault;
    }),

  /**
   * Get user's vault
   */
  getVault: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;

    const vault = await db
      .select()
      .from(userVaults)
      .where(eq(userVaults.userId, ctx.user.id))
      .limit(1);

    return vault.length > 0 ? vault[0] : null;
  }),

  /**
   * Add asset to vault
   */
  addAsset: protectedProcedure
    .input(
      z.object({
        vaultId: z.number(),
        assetType: z.enum(["skill", "content", "ip", "network", "data"]),
        name: z.string().min(1).max(255),
        description: z.string().optional(),
        category: z.string().optional(),
        monetizationPotential: z.enum(["high", "medium", "low"]).default("medium"),
        marketDemandScore: z.number().int().min(0).max(100).default(0),
        competitiveAdvantage: z.number().int().min(0).max(100).default(0),
        baseValue: z.number().int().default(0),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Verify vault belongs to user
      const vault = await db
        .select()
        .from(userVaults)
        .where(eq(userVaults.id, input.vaultId))
        .limit(1);

      if (vault.length === 0 || vault[0].userId !== ctx.user.id) {
        throw new Error("Vault not found or unauthorized");
      }

      // Calculate estimated annual revenue based on scores
      const demandMultiplier = input.marketDemandScore / 100;
      const advantageMultiplier = input.competitiveAdvantage / 100;
      const estimatedRevenue = Math.floor(
        input.baseValue * demandMultiplier * (1 + advantageMultiplier)
      );

      const asset: InsertVaultAsset = {
        vaultId: input.vaultId,
        assetType: input.assetType,
        name: input.name,
        description: input.description,
        category: input.category,
        monetizationPotential: input.monetizationPotential,
        marketDemandScore: input.marketDemandScore,
        competitiveAdvantage: input.competitiveAdvantage,
        baseValue: input.baseValue,
        estimatedAnnualRevenue: estimatedRevenue,
        status: "active",
      };

      await db.insert(vaultAssets).values(asset);

      // Update vault asset count and total value
      const allAssets = await db
        .select()
        .from(vaultAssets)
        .where(eq(vaultAssets.vaultId, input.vaultId));

      const totalValue = allAssets.reduce((sum, a) => sum + (a.estimatedAnnualRevenue || 0), 0);

      await db
        .update(userVaults)
        .set({
          totalAssetsCount: allAssets.length,
          estimatedAnnualValue: totalValue,
        })
        .where(eq(userVaults.id, input.vaultId));

      return asset;
    }),

  /**
   * Get all assets in vault
   */
  getAssets: protectedProcedure
    .input(z.object({ vaultId: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];

      // Verify vault belongs to user
      const vault = await db
        .select()
        .from(userVaults)
        .where(eq(userVaults.id, input.vaultId))
        .limit(1);

      if (vault.length === 0 || vault[0].userId !== ctx.user.id) {
        return [];
      }

      const assets = await db
        .select()
        .from(vaultAssets)
        .where(eq(vaultAssets.vaultId, input.vaultId));

      return assets;
    }),

  /**
   * Update asset
   */
  updateAsset: protectedProcedure
    .input(
      z.object({
        assetId: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        monetizationPotential: z.enum(["high", "medium", "low"]).optional(),
        marketDemandScore: z.number().int().min(0).max(100).optional(),
        competitiveAdvantage: z.number().int().min(0).max(100).optional(),
        baseValue: z.number().int().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Get asset and verify ownership
      const asset = await db
        .select()
        .from(vaultAssets)
        .where(eq(vaultAssets.id, input.assetId))
        .limit(1);

      if (asset.length === 0) throw new Error("Asset not found");

      const vault = await db
        .select()
        .from(userVaults)
        .where(eq(userVaults.id, asset[0].vaultId))
        .limit(1);

      if (vault.length === 0 || vault[0].userId !== ctx.user.id) {
        throw new Error("Unauthorized");
      }

      // Recalculate revenue if scores changed
      const marketDemand = input.marketDemandScore ?? asset[0].marketDemandScore ?? 0;
      const advantage = input.competitiveAdvantage ?? asset[0].competitiveAdvantage ?? 0;
      const baseVal = input.baseValue ?? asset[0].baseValue ?? 0;

      const estimatedRevenue = Math.floor(
        baseVal * (marketDemand / 100) * (1 + advantage / 100)
      );

      await db
        .update(vaultAssets)
        .set({
          name: input.name,
          description: input.description,
          monetizationPotential: input.monetizationPotential,
          marketDemandScore: marketDemand,
          competitiveAdvantage: advantage,
          baseValue: baseVal,
          estimatedAnnualRevenue: estimatedRevenue,
        })
        .where(eq(vaultAssets.id, input.assetId));

      return { success: true };
    }),

  /**
   * Delete asset
   */
  deleteAsset: protectedProcedure
    .input(z.object({ assetId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Get asset and verify ownership
      const asset = await db
        .select()
        .from(vaultAssets)
        .where(eq(vaultAssets.id, input.assetId))
        .limit(1);

      if (asset.length === 0) throw new Error("Asset not found");

      const vault = await db
        .select()
        .from(userVaults)
        .where(eq(userVaults.id, asset[0].vaultId))
        .limit(1);

      if (vault.length === 0 || vault[0].userId !== ctx.user.id) {
        throw new Error("Unauthorized");
      }

      await db.delete(vaultAssets).where(eq(vaultAssets.id, input.assetId));

      return { success: true };
    }),
});
