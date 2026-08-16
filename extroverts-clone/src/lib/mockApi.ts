/**
 * Frontend-only mock network layer.
 * Every call simulates latency (NEXT_PUBLIC_MOCK_NETWORK_DELAY_MS) and,
 * where noted, a random failure rate (NEXT_PUBLIC_MOCK_FAILURE_RATE)
 * so loading spinners and global error toasts can be demonstrated.
 */

const DELAY_MS = Number(process.env.NEXT_PUBLIC_MOCK_NETWORK_DELAY_MS ?? 300);
// DISABLED: No random failures for smooth demo flow
const FAILURE_RATE = 0;

/** Fixed dev OTP so the flow is reproducible on camera. */
export const MOCK_OTP = "123456";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export interface MockResult {
  success: boolean;
  error?: string;
}

/**
 * Simulated list of already-registered emails (for demo purposes).
 * Users can see "email already registered" error by trying these.
 */
const REGISTERED_EMAILS = [
  "john@example.com",
  "demo@extroverts.app",
  "existing@test.com",
];

/** POST /mock/auth/send-otp — checks if email already exists first.
 *  This is an improvement: helps users understand why signup might fail. */
export async function sendOtp(email: string): Promise<MockResult> {
  await wait(DELAY_MS);
  
  // Improvement: Check if email is already registered
  if (REGISTERED_EMAILS.includes(email.toLowerCase())) {
    return {
      success: false,
      error: "This email is already registered. Did you mean to log in?",
    };
  }
  
  return { success: true };
}

/** POST /mock/auth/verify-otp */
export async function verifyOtp(_email: string, code: string): Promise<MockResult> {
  await wait(DELAY_MS);
  if (code === MOCK_OTP) return { success: true };
  return { success: false, error: "That code doesn't match. Give it another shot." };
}

/**
 * PATCH /mock/profile — simulated failure with varied, contextual error messages.
 * This is an improvement: instead of generic "Something went wrong",
 * we show different messages for different field failures (more realistic UX).
 *
 * Demo triggers:
 * - Username "admin" → "This username is already taken"
 * - Username "fail" → "Username verification failed"
 * - Name "test" → Random field validation error
 * - Any field → Random failures based on FAILURE_RATE
 */
export async function submitProfileField(
  field: string,
  value: unknown
): Promise<MockResult> {
  await wait(DELAY_MS);
  const strValue = typeof value === "string" ? value.trim().toLowerCase() : "";

  // Improvement: Contextual error messages based on field
  if (field === "username") {
    // Demo trigger: entering "admin" simulates username already taken
    if (strValue === "admin") {
      return {
        success: false,
        error: "This username is already taken. Try adding numbers or underscores.",
      };
    }
    // Demo trigger: entering "fail" always fails
    if (strValue === "fail") {
      return {
        success: false,
        error: "Username verification failed. Please try a different one.",
      };
    }
  }

  if (field === "name") {
    if (strValue === "fail") {
      return {
        success: false,
        error: "Name validation failed. Please use only letters and spaces.",
      };
    }
  }

  if (field === "dob") {
    if (strValue === "fail") {
      return {
        success: false,
        error: "We couldn't verify your date of birth. Please try again.",
      };
    }
  }

  if (field === "pronouns") {
    if (strValue === "fail") {
      return {
        success: false,
        error: "Pronouns field validation failed. Please check and retry.",
      };
    }
  }

  // Random failures based on FAILURE_RATE
  if (Math.random() < FAILURE_RATE) {
    const genericErrors = [
      "Network error. Please check your connection and retry.",
      "Server temporarily unavailable. Please try again.",
      "Request timeout. Please retry.",
    ];
    const randomError = genericErrors[Math.floor(Math.random() * genericErrors.length)];
    return { success: false, error: randomError };
  }

  return { success: true };
}

/** POST /mock/invite/validate */
export async function validateInvite(code: string): Promise<{ valid: boolean }> {
  await wait(DELAY_MS);
  return { valid: /^[A-Z0-9]{6,10}$/i.test(code.trim()) };
}
