# Phase 10: Dashboard & Analytics / Monetization

## Objective
Build user dashboard with personalized analytics, subscription tiers with Stripe integration, usage tracking with quota system, and admin analytics panel.

## Context
- **Stack:** Next.js 16, TypeScript, Tailwind CSS v4, Supabase, Zustand, Arabic-first
- **Auth:** Supabase Auth implemented (Phase 9)
- **Current Dashboard:** Basic page at `/dashboard` with placeholder content
- **Monetization:** Not yet implemented
- **Analytics:** Basic metrics endpoint exists (`/api/metrics`), no user-level tracking

## Constraints
- Arabic-first UI with RTL layout
- Subscription data stored in Supabase
- Stripe for payment processing
- Usage limits enforced per tier
- Admin panel restricted to admin role

## Invariants
- All API routes must validate auth session before accessing user data
- Usage tracking must be atomic (no race conditions on quota)
- Stripe webhooks must be verified with signing secret
- Admin routes must check user role
- All UI must support bilingual (ar/en)

---

## Step 1: Supabase Schema for Subscriptions & Usage

**Context Brief:**
Add database tables for subscription tiers, user subscriptions, usage tracking, and admin roles.

**Tasks:**
1. Create `subscription_tiers` table (id, name, price, currency, features, limits)
2. Create `user_subscriptions` table (id, user_id, tier_id, status, stripe_customer_id, stripe_subscription_id, current_period_start, current_period_end)
3. Create `usage_logs` table (id, user_id, service, tokens_used, timestamp)
4. Create `user_roles` table (id, user_id, role) with admin/user roles
5. Add RLS policies for all tables
6. Create Supabase migration file

**Verification:**
```bash
# Verify migration runs without errors
npx supabase db push --local
```

**Exit Criteria:**
- All tables created with proper constraints
- RLS policies enforced
- Migration file committed

**Dependencies:** None

**Model Tier:** Default

---

## Step 2: Usage Tracking Middleware & API

**Context Brief:**
Implement usage tracking that logs API calls per user and enforces quota limits based on subscription tier.

**Tasks:**
1. Create `src/lib/usage-tracker.ts` with `logUsage()` and `checkQuota()` functions
2. Create `src/lib/quota-middleware.ts` to wrap API routes
3. Update existing API routes (`/api/generate`, `/api/cv/*`, etc.) to use quota middleware
4. Create `GET /api/usage` endpoint to return current usage stats
5. Add in-memory cache for quota checks (5min TTL)

**Verification:**
```bash
npm run build
npm run lint
# Test: Make requests to API routes, verify usage_logs table populated
```

**Exit Criteria:**
- All API calls logged to `usage_logs`
- Quota exceeded returns 429 with clear message
- `/api/usage` returns accurate stats

**Dependencies:** Step 1 (database schema)

**Model Tier:** Default

---

## Step 3: Stripe Integration

**Context Brief:**
Integrate Stripe for subscription management, payment processing, and webhook handling.

**Tasks:**
1. Add `stripe` package to `package.json`
2. Create `src/lib/stripe/client.ts` with Stripe initialization
3. Create `POST /api/stripe/create-checkout-session` endpoint
4. Create `POST /api/stripe/create-portal-session` endpoint
5. Create `POST /api/stripe/webhook` endpoint with signature verification
6. Handle webhook events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
7. Add Stripe env vars to `.env.local` template

**Verification:**
```bash
npm run build
npm run lint
# Test: Use Stripe CLI to simulate webhook events
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

**Exit Criteria:**
- Checkout session creates successfully
- Webhook events update subscription status in database
- Portal session redirects to Stripe billing portal

**Dependencies:** Step 1 (database schema)

**Model Tier:** Strongest (payment security critical)

---

## Step 4: Subscription UI Components

**Context Brief:**
Build pricing page, subscription cards, and upgrade/downgrade flow.

**Tasks:**
1. Create `src/components/pricing/PricingCard.tsx` with tier comparison
2. Create `src/components/pricing/FeatureList.tsx` with feature checklist
3. Create `/pricing` page with bilingual support
4. Create `src/components/billing/SubscriptionStatus.tsx` showing current plan
5. Create `src/components/billing/UsageMeter.tsx` with progress bars
6. Add locale keys to `ar.json` and `en.json`

**Verification:**
```bash
npm run dev
# Visit /pricing, verify RTL layout, bilingual toggle works
# Verify subscription status shows correct tier
```

**Exit Criteria:**
- Pricing page displays 3 tiers (Free, Pro, Enterprise)
- Upgrade button creates Stripe checkout session
- Usage meter shows accurate quota usage

**Dependencies:** Step 3 (Stripe integration)

**Model Tier:** Default

---

## Step 5: User Dashboard - Analytics & History

**Context Brief:**
Build personalized dashboard showing usage analytics, saved prompts, CV history, and subscription status.

**Tasks:**
1. Update `/dashboard` page with real data from Supabase
2. Create `src/components/dashboard/UsageChart.tsx` with weekly usage graph
3. Create `src/components/dashboard/RecentActivity.tsx` showing last 10 actions
4. Create `src/components/dashboard/SavedPrompts.tsx` with prompt library
5. Create `src/components/dashboard/CVHistory.tsx` with CV analysis history
6. Create `src/components/dashboard/QuickActions.tsx` for common tasks
7. Add dashboard data fetching to `src/store/dashboard-store.ts`

**Verification:**
```bash
npm run build
npm run lint
npm run dev
# Visit /dashboard, verify all sections load with real data
```

**Exit Criteria:**
- Dashboard shows accurate usage stats
- Recent activity lists last 10 actions
- Saved prompts and CV history load from database
- Quick actions navigate correctly

**Dependencies:** Step 2 (usage tracking), Step 1 (database schema)

**Model Tier:** Default

---

## Step 6: Admin Analytics Panel

**Context Brief:**
Build admin-only panel showing system-wide metrics, user management, and billing overview.

**Tasks:**
1. Create `/admin` page with role-based access control
2. Create `src/components/admin/UserTable.tsx` with user list and search
3. Create `src/components/admin/SystemMetrics.tsx` showing provider performance
4. Create `src/components/admin/RevenueChart.tsx` with MRR/ARR tracking
5. Create `src/components/admin/QuotaOverview.tsx` showing quota usage by tier
6. Update `auth-middleware.ts` to check admin role
7. Add admin navigation to navbar (visible only to admins)

**Verification:**
```bash
npm run build
npm run lint
# Test: Non-admin user redirected from /admin
# Test: Admin user sees all panels
```

**Exit Criteria:**
- `/admin` restricted to admin role
- User table searchable and filterable
- System metrics show real-time provider stats
- Revenue chart displays MRR/ARR

**Dependencies:** Step 1 (database schema), Step 5 (dashboard components)

**Model Tier:** Default

---

## Step 7: Protected Routes & Auth Guards

**Context Brief:**
Ensure dashboard, profile, and admin routes require authentication with proper redirects.

**Tasks:**
1. Create `src/lib/auth-guards.tsx` with `RequireAuth` and `RequireAdmin` components
2. Wrap `/dashboard`, `/profile`, `/admin` with auth guards
3. Add loading states while checking auth
4. Redirect unauthenticated users to `/login` with return URL
5. Update `auth-store.ts` to expose `isLoading` state
6. Add toast notifications for auth failures

**Verification:**
```bash
npm run dev
# Test: Visit /dashboard while logged out -> redirects to /login
# Test: Login -> redirects back to /dashboard
# Test: Visit /admin as non-admin -> redirects to /dashboard
```

**Exit Criteria:**
- All protected routes require auth
- Return URL preserved after login
- Admin routes check role
- Loading states shown during auth check

**Dependencies:** Step 5 (dashboard), Step 6 (admin panel)

**Model Tier:** Default

---

## Step 8: Subscription Lifecycle & Edge Cases

**Context Brief:**
Handle subscription edge cases: trial periods, failed payments, cancellations, downgrades, and grace periods.

**Tasks:**
1. Implement trial period logic (14 days free on signup)
2. Handle failed payment webhook events
3. Implement grace period (3 days after failed payment)
4. Handle subscription cancellation (access until period end)
5. Handle plan downgrades (effective next billing cycle)
6. Add email notifications for subscription events
7. Create `src/lib/subscription-helpers.ts` with utility functions

**Verification:**
```bash
npm run build
npm run lint
# Test: Stripe CLI to simulate failed payments
# Test: Verify grace period logic
# Test: Verify cancellation access until period end
```

**Exit Criteria:**
- Trial period activates on signup
- Failed payments trigger grace period
- Cancellations maintain access until period end
- Downgrades scheduled for next cycle
- Email notifications sent for key events

**Dependencies:** Step 3 (Stripe integration), Step 2 (usage tracking)

**Model Tier:** Strongest (business logic complexity)

---

## Step 9: Testing & Verification

**Context Brief:**
Comprehensive testing of all Phase 10 features with manual test scenarios.

**Tasks:**
1. Create `TESTING.md` with test scenarios
2. Test subscription signup flow end-to-end
3. Test quota enforcement (make requests until limit hit)
4. Test webhook event handling (simulate Stripe events)
5. Test admin panel access control
6. Test bilingual UI on all new pages
7. Test mobile responsiveness on dashboard and pricing
8. Run `npm run build` and `npm run lint`

**Verification:**
```bash
npm run build
npm run lint
npm run dev
# Execute all test scenarios in TESTING.md
```

**Exit Criteria:**
- All test scenarios pass
- Build succeeds with no errors
- Lint passes (no new errors introduced)
- Mobile responsive on all new pages

**Dependencies:** Steps 1-8 complete

**Model Tier:** Default

---

## Dependency Graph

```
Step 1 (Schema)
  ├── Step 2 (Usage Tracking)
  │     └── Step 5 (Dashboard)
  │           └── Step 6 (Admin Panel)
  │                 └── Step 7 (Auth Guards)
  ├── Step 3 (Stripe)
  │     ├── Step 4 (Pricing UI)
  │     └── Step 8 (Subscription Lifecycle)
  └── Step 9 (Testing) [all steps]
```

## Parallel Opportunities
- Steps 2 and 3 can run in parallel (both depend only on Step 1)
- Steps 4 and 5 can run in parallel (Step 4 depends on Step 3, Step 5 depends on Step 2)

## Rollback Strategy
- Each step has independent database migration that can be reverted
- Stripe webhooks can be disabled temporarily without affecting existing functionality
- Feature flags can disable new UI components if issues arise

## Anti-Patterns to Avoid
- ❌ Storing Stripe keys in client-side code
- ❌ Bypassing quota checks for performance
- ❌ Hardcoding subscription tier prices in frontend
- ❌ Missing RLS policies on new tables
- ❌ Not verifying webhook signatures
- ❌ Exposing admin routes without role check
- ❌ Race conditions on quota updates (use atomic operations)
