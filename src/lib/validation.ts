import { ApiError } from "./errors";

export interface ValidationRule {
  field: string;
  validate: (value: unknown) => boolean;
  message: string;
}

export function validateBody(body: unknown, rules: ValidationRule[]): Record<string, unknown> {
  if (!body || typeof body !== "object") {
    throw new ApiError(400, "Request body must be a JSON object");
  }

  const errors: string[] = [];

  for (const rule of rules) {
    const value = (body as Record<string, unknown>)[rule.field];
    if (!rule.validate(value)) {
      errors.push(rule.message);
    }
  }

  if (errors.length > 0) {
    throw new ApiError(400, `Validation failed: ${errors.join(", ")}`);
  }

  return body as Record<string, unknown>;
}

export function required(field: string): ValidationRule {
  return {
    field,
    validate: (v) => v !== undefined && v !== null && v !== "",
    message: `${field} is required`,
  };
}

export function isString(field: string, opts?: { min?: number; max?: number }): ValidationRule {
  return {
    field,
    validate: (v) => {
      if (typeof v !== "string") return false;
      if (opts?.min && v.length < opts.min) return false;
      if (opts?.max && v.length > opts.max) return false;
      return true;
    },
    message: opts?.min && opts?.max
      ? `${field} must be a string between ${opts.min} and ${opts.max} characters`
      : `${field} must be a string`,
  };
}

export function isOneOf(field: string, values: string[]): ValidationRule {
  return {
    field,
    validate: (v) => typeof v === "string" && values.includes(v),
    message: `${field} must be one of: ${values.join(", ")}`,
  };
}

export function optional(rule: ValidationRule | string): ValidationRule {
  if (typeof rule === "string") {
    return {
      field: rule,
      validate: () => true,
      message: `${rule} is optional`,
    };
  }
  return {
    ...rule,
    validate: (v) => v === undefined || v === null || v === "" || rule.validate(v),
  };
}

export async function parseJsonBody(req: Request): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    throw new ApiError(400, "Invalid JSON in request body");
  }
}
