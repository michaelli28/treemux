/**
 * Mocked input layer for Treemux black box.
 * In production this would come from API/UI.
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import type { TaskInput } from "./types.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const apiRoot = resolve(__dirname, "..");

const defaultPrompt = readFileSync(resolve(apiRoot, "assets", "tasks", "treehacks.md"), "utf-8").trim();
const defaultWorkerDesc = readFileSync(resolve(apiRoot, "assets", "personas", "sam.md"), "utf-8").trim();

export const MOCK_INPUT: TaskInput = {
  taskDescription: defaultPrompt,
  workers: 1,
  workerDescriptions: [
    defaultWorkerDesc,
  ],
  evaluator: {
    count: 1,
    role: "judge",
    criteria: "clarity, sellability, conciseness",
  },
  model: process.env.MODEL || "sonnet", // valid model slug for Claude Code
};

/** Base URL for implementation callbacks (steps/done). Must be reachable from Modal (e.g. ngrok in dev). */
export const CALLBACK_BASE_URL = process.env.CALLBACK_BASE_URL ?? `http://localhost:${process.env.PORT ?? "3000"}`;

/** Webhook URL to POST final [{ url, pitch }] when all deployments are done (legacy) */
export const WEBHOOK_URL = process.env.WEBHOOK_URL ?? "";

/** Evaluator webhook: POST [{ url, pitch }, ...] when all jobs complete */
export const EVALUATOR_WEBHOOK_URL = process.env.EVALUATOR_WEBHOOK_URL ?? process.env.WEBHOOK_URL ?? "";
