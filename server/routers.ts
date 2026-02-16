import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { chatRouter } from "./routers/chat";
import { notificationsRouter } from "./routers/notifications";
import { githubRouter } from "./routers/github";
import { adminRouter } from "./routers/admin";
import { profilesRouter } from "./routers/profiles";
import { analyticsRouter } from "./routers/analytics";
import { paymentsRouter } from "./routers/payments";
import { collaborationRouter } from "./routers/collaboration";
import { vaultRouter } from "./routers/vault";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  chat: chatRouter,
  notifications: notificationsRouter,
  github: githubRouter,
  admin: adminRouter,
  profiles: profilesRouter,
  analytics: analyticsRouter,
  payments: paymentsRouter,
  collaboration: collaborationRouter,
  vault: vaultRouter,
});

export type AppRouter = typeof appRouter;
