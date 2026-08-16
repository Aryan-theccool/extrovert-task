import type { DobValue } from "@/types/wizard";

/**
 * Compute exact age from a DOB, accounting for whether the birthday
 * has occurred yet this year (someone turning 18 today is 18).
 */
export function computeAge(dob: DobValue): number | null {
  const day = parseInt(dob.day, 10);
  const month = parseInt(dob.month, 10);
  const year = parseInt(dob.year, 10);
  if (!day || !month || !year) return null;

  const birth = new Date(year, month - 1, day);
  // Reject impossible dates like 31/02 (Date rolls them over)
  if (
    birth.getFullYear() !== year ||
    birth.getMonth() !== month - 1 ||
    birth.getDate() !== day
  ) {
    return null;
  }

  const today = new Date();
  if (birth > today) return null;

  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export function validateDob(dob: DobValue): string | null {
  const day = parseInt(dob.day, 10);
  const month = parseInt(dob.month, 10);
  const year = parseInt(dob.year, 10);
  const currentYear = new Date().getFullYear();

  if (!dob.day || !dob.month || !dob.year) return "Please fill in your full date of birth.";
  if (isNaN(day) || day < 1 || day > 31) return "Day must be between 1 and 31.";
  if (isNaN(month) || month < 1 || month > 12) return "Month must be between 1 and 12.";
  if (isNaN(year) || year < 1900 || year > currentYear)
    return `Year must be between 1900 and ${currentYear}.`;

  const age = computeAge(dob);
  if (age === null) return "That date doesn't exist — double-check it.";
  return null;
}
