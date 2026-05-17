#!/usr/bin/env node

/**
 * Data Migration Script
 * Migrates data from old structure to new Baseera schema
 *
 * Usage: node scripts/migrate-data.mjs
 *
 * Requires environment variables:
 * - OLD_DATABASE_URL (if migrating from previous database)
 * - NEXT_PUBLIC_SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables");
  console.error("Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateData() {
  console.log("Starting Baseera data migration...");

  try {
    // Check if tables exist
    const { data: tables, error: tablesError } = await supabase
      .from("users")
      .select("count")
      .limit(1);

    if (tablesError) {
      console.log("Tables not found. Please run schema.sql first.");
      console.log("Visit: Supabase Dashboard > SQL Editor > Run schema.sql");
      return;
    }

    console.log("✓ Database connection successful");

    // Migration steps
    await migrateUsers();
    await migratePrompts();
    await migrateCVs();

    console.log("\n✓ Migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error.message);
    process.exit(1);
  }
}

async function migrateUsers() {
  console.log("\nMigrating users...");

  // Create default user if none exist
  const { count: userCount } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  if (userCount === 0) {
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          email: "user@baseera.app",
          name: "Baseera User",
          language: "ar",
        },
      ])
      .select();

    if (error) {
      console.error("Failed to create default user:", error.message);
    } else {
      console.log(`✓ Created default user: ${data[0].id}`);
    }
  } else {
    console.log(`✓ Users table already has ${userCount} users`);
  }
}

async function migratePrompts() {
  console.log("\nMigrating prompts...");

  // Check if there are any prompts to migrate
  const { count: promptCount } = await supabase
    .from("prompts")
    .select("*", { count: "exact", head: true });

  console.log(`✓ Prompts table has ${promptCount} prompts`);

  // If migrating from old database, add logic here
  // Example:
  // const oldPrompts = await fetchOldPrompts();
  // for (const prompt of oldPrompts) {
  //   await supabase.from("prompts").insert({
  //     service: mapOldServiceToNew(prompt.type),
  //     input: prompt.input,
  //     output: prompt.output,
  //     model: prompt.model,
  //     level: prompt.level,
  //     category: prompt.category,
  //   });
  // }
}

async function migrateCVs() {
  console.log("\nMigrating CVs...");

  const { count: cvCount } = await supabase
    .from("cvs")
    .select("*", { count: "exact", head: true });

  console.log(`✓ CVs table has ${cvCount} CVs`);

  // If migrating from old database, add logic here
}

// Service mapping from old to new
function mapOldServiceToNew(oldType) {
  const mapping = {
    "ai-prompt": "text",
    "image-prompt": "image",
    "video-prompt": "video",
    "humanize": "text",
    "cv-analyze": "cv",
    "cv-enhance": "cv",
  };
  return mapping[oldType] || "text";
}

// Run migration
migrateData();
