"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useTranslate } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Users, CreditCard, Activity, Shield, AlertTriangle, TrendingUp } from "lucide-react";

interface AdminStats {
  totalUsers: number;
  activeSubscriptions: number;
  totalRevenue: number;
  apiCallsToday: number;
  failedApiCalls: number;
  providerMetrics: {
    provider: string;
    calls: number;
    avgLatency: number;
    errorRate: number;
  }[];
  recentUsers: {
    id: string;
    email: string;
    created_at: string;
    tier: string;
  }[];
}

export default function AdminPage() {
  const t = useTranslate();
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuthStore();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!user) return;

    async function checkAdmin() {
      const supabase = createClient();
      if (!supabase) return;

      const { data: role } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user!.id)
        .single();

      if (role?.role !== "admin") {
        router.push("/dashboard");
        return;
      }

      setIsAdmin(true);
    }

    checkAdmin();
  }, [authLoading, isAuthenticated, user, router]);

  useEffect(() => {
    if (!isAdmin || !user) return;

    async function fetchStats() {
      const supabase = createClient();
      if (!supabase) return;

      const [{ count: totalUsers }, { count: activeSubscriptions }, { data: usageToday }] =
        await Promise.all([
          supabase.from("users").select("*", { count: "exact", head: true }),
          supabase
            .from("user_subscriptions")
            .select("*", { count: "exact", head: true })
            .in("status", ["active", "trialing"]),
          supabase
            .from("usage_logs")
            .select("status")
            .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()),
        ]);

      const apiCallsToday = usageToday?.length || 0;
      const failedApiCalls = usageToday?.filter((u) => u.status === "error").length || 0;

      const { data: recentUsers } = await supabase
        .from("users")
        .select("id, email, created_at")
        .order("created_at", { ascending: false })
        .limit(10);

      const { data: userTiers } = await supabase
        .from("user_subscriptions")
        .select("user_id, tier_id")
        .in("status", ["active", "trialing"]);

      const tierMap = new Map<string, string>();
      if (userTiers) {
        for (const ut of userTiers) {
          tierMap.set(ut.user_id, ut.tier_id);
        }
      }

      setStats({
        totalUsers: totalUsers || 0,
        activeSubscriptions: activeSubscriptions || 0,
        totalRevenue: 0,
        apiCallsToday,
        failedApiCalls,
        providerMetrics: [],
        recentUsers:
          recentUsers?.map((u) => ({
            ...u,
            tier: tierMap.get(u.id) ? "pro" : "free",
          })) || [],
      });

      setLoading(false);
    }

    fetchStats();
  }, [isAdmin, user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen px-4 py-12 max-w-6xl mx-auto">
        <Skeleton className="h-10 w-48 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen px-4 py-12 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Admin Panel
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            System overview and user management
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Admin
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.totalUsers || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Active Subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.activeSubscriptions || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Activity className="h-4 w-4" />
              API Calls Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.apiCallsToday || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Failed Calls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-destructive">
              {stats?.failedApiCalls || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Users */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats?.recentUsers.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50"
              >
                <div>
                  <p className="text-sm font-medium">{u.email}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(u.created_at).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant={u.tier === "free" ? "secondary" : "default"}>
                  {u.tier}
                </Badge>
              </div>
            ))}
            {(!stats?.recentUsers || stats.recentUsers.length === 0) && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No users yet
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Database</span>
                <Badge variant="default" className="bg-green-500">Healthy</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">API Routes</span>
                <Badge variant="default" className="bg-green-500">Operational</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Stripe Webhooks</span>
                <Badge variant="secondary">Not Configured</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard")}>
              View Dashboard
            </Button>
            <Button variant="outline" className="w-full" onClick={() => router.push("/pricing")}>
              View Pricing Page
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.open("https://dashboard.stripe.com", "_blank")}
            >
              Stripe Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
