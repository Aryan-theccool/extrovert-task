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

/** POST /mock/auth/send-otp */
export async function sendOtp(_email: string): Promise<MockResult> {
  await wait(DELAY_MS);
  if (Math.random() < FAILURE_RATE) {
    return { success: false, error: "Couldn't send the code. Please try again." };
  }
  return { success: true };
}

/** POST /mock/auth/verify-otp */
export async function verifyOtp(_email: string, code: string): Promise<MockResult> {
  await wait(DELAY_MS);
  if (code === MOCK_OTP) return { success: true };
  return { success: false, error: "That code doesn't match. Give it another shot." };
}

/** PATCH /mock/profile — random failure to demo the global error toast */
export async function submitProfileField(
  _field: string,
  _value: unknown
): Promise<MockResult> {
  await wait(DELAY_MS);
  if (Math.random() < FAILURE_RATE) {
    return { success: false, error: "Something went wrong. Please try again." };
  }
  return { success: true };
}

/** POST /mock/invite/validate */
export async function validateInvite(code: string): Promise<{ valid: boolean }> {
  await wait(DELAY_MS);
  return { valid: /^[A-Z0-9]{6,10}$/i.test(code.trim()) };
}
