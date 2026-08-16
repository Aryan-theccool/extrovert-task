/**
 * Frontend-only mock network layer.
 * Every call simulates latency (NEXT_PUBLIC_MOCK_NETWORK_DELAY_MS) and,
 * where noted, a random failure rate (NEXT_PUBLIC_MOCK_FAILURE_RATE)
 * so loading spinners and global error toasts can be demonstrated.
 */

const DELAY_MS = Number(process.env.NEXT_PUBLIC_MOCK_NETWORK_DELAY_MS ?? 1200);
const FAILURE_RATE = Number(process.env.NEXT_PUBLIC_MOCK_FAILURE_RATE ?? 0.15);

/** Fixed dev OTP so the flow is reproducible on camera. */
export const MOCK_OTP = "123456";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export interface MockResult {
  success: boolean;
  error?: string;
}

/** POST /mock/auth/send-otp — always succeeds so the demo flow is never
 *  blocked at the email step; error handling is demoed elsewhere. */
export async function sendOtp(_email: string): Promise<MockResult> {
  await wait(DELAY_MS);
  return { success: true };
}

/** POST /mock/auth/verify-otp */
export async function verifyOtp(_email: string, code: string): Promise<MockResult> {
  await wait(DELAY_MS);
  if (code === MOCK_OTP) return { success: true };
  return { success: false, error: "That code doesn't match. Give it another shot." };
}

/**
 * PATCH /mock/profile — simulated failure to demo the global error toast.
 * Deterministic for demos: entering the value "fail" (any field) always
 * fails, and random failures (FAILURE_RATE) only apply on top of that,
 * so the wizard never blocks a live walkthrough unpredictably... but
 * still shows resilience when you want it to.
 */
export async function submitProfileField(
  _field: string,
  value: unknown
): Promise<MockResult> {
  await wait(DELAY_MS);
  const demoFail =
    typeof value === "string" && value.trim().toLowerCase() === "fail";
  if (demoFail || Math.random() < FAILURE_RATE) {
    return { success: false, error: "Something went wrong. Please try again." };
  }
  return { success: true };
}

/** POST /mock/invite/validate */
export async function validateInvite(code: string): Promise<{ valid: boolean }> {
  await wait(DELAY_MS);
  return { valid: /^[A-Z0-9]{6,10}$/i.test(code.trim()) };
}
