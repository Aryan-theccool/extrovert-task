/** Lightweight per-step validators (schema-style, one function per field). */

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/** Letters (any script), spaces, and basic punctuation only — rejects emoji/symbol-only strings. */
const NAME_RE = new RegExp("^[\\p{L}][\\p{L}\\p{M}' .-]*$", "u");

const USERNAME_RE = /^[a-zA-Z0-9._]+$/;

export const LIMITS = {
  username: 20,
  name: 40,
  pronouns: 30,
  invite: 10,
};

export function validateEmail(raw: string): string | null {
  const value = raw.trim();
  if (!value) return "Email is required.";
  if (!EMAIL_RE.test(value)) return "That doesn't look like a valid email address.";
  return null;
}

export function validateUsername(raw: string): string | null {
  const value = raw.trim();
  if (!value) return "Username is required.";
  if (value.length < 3) return "Username needs at least 3 characters.";
  if (value.length > LIMITS.username)
    return `Keep it under ${LIMITS.username} characters.`;
  if (!USERNAME_RE.test(value))
    return "Only letters, numbers, dots and underscores allowed.";
  return null;
}

export function validateName(raw: string): string | null {
  const value = raw.trim();
  if (!value) return "Name is required.";
  if (value.length > LIMITS.name) return `Keep it under ${LIMITS.name} characters.`;
  if (!NAME_RE.test(value))
    return "Use letters, spaces and basic punctuation only.";
  return null;
}

export function validatePronouns(raw: string): string | null {
  const value = raw.trim();
  if (!value) return "Pronouns are required.";
  if (value.length > LIMITS.pronouns)
    return `Keep it under ${LIMITS.pronouns} characters.`;
  return null;
}

export const PRONOUN_SUGGESTIONS = [
  "he/him/his",
  "she/her/hers",
  "they/them/theirs",
  "he/they",
  "she/they",
  "ze/zir/zirs",
];
