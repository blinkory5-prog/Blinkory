/**
 * Validation utilities for Animator Recruitment applications
 */

export interface ApplicationFormData {
  fullName: string;
  phone: string;
  email: string;
  portfolioUrl?: string;
  agreedToTerms: boolean;
}

export interface ValidationErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  portfolioUrl?: string;
  agreedToTerms?: string;
}

/**
 * Validates a person's full name (at least 2 letters, non-trivial)
 */
export function validateFullName(name: string): string | null {
  const trimmed = (name || '').trim();
  if (!trimmed) {
    return 'Full name is required.';
  }
  if (trimmed.length < 2) {
    return 'Please enter your full name (minimum 2 characters).';
  }
  if (trimmed.length > 80) {
    return 'Name cannot exceed 80 characters.';
  }
  return null;
}

/**
 * Validates email format
 */
export function validateEmail(email: string): string | null {
  const trimmed = (email || '').trim();
  if (!trimmed) {
    return 'Email address is required.';
  }
  // Standard RFC-compliant pragmatic email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(trimmed)) {
    return 'Please enter a valid email address (e.g., name@example.com).';
  }
  return null;
}

/**
 * Validates phone number with country code.
 * Must include country code (e.g. starting with + or at least 10 digits with country prefix).
 */
export function validatePhone(phone: string): string | null {
  const trimmed = (phone || '').trim();
  if (!trimmed) {
    return 'Phone number with country code is required.';
  }

  // Count raw digits
  const digitsOnly = trimmed.replace(/\D/g, '');
  if (digitsOnly.length < 8) {
    return 'Phone number is too short. Please include your country code.';
  }
  if (digitsOnly.length > 16) {
    return 'Phone number is too long. Please verify your entry.';
  }

  // Check valid phone format with optional leading '+'
  const phonePattern = /^(\+?\d{1,4})?[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{2,9}$/;
  if (!phonePattern.test(trimmed)) {
    return 'Please enter a valid phone number with country code (e.g., +91 98765 43210 or +1 234 567 8900).';
  }

  // Recommend or require country code indicator
  if (!trimmed.startsWith('+') && digitsOnly.length < 10) {
    return 'Please include your country code prefix (e.g., +91, +1, +44).';
  }

  return null;
}

/**
 * Validates portfolio or social profile URL (optional field)
 */
export function validatePortfolioUrl(url?: string): string | null {
  if (!url || url.trim() === '') {
    return null; // optional
  }
  const trimmed = url.trim();

  // Allow standard URLs or social handles/links
  try {
    const candidate = trimmed.startsWith('http://') || trimmed.startsWith('https://') 
      ? trimmed 
      : `https://${trimmed}`;
    const parsed = new URL(candidate);
    if (!parsed.hostname || !parsed.hostname.includes('.')) {
      return 'Please provide a valid website or social link (e.g. https://instagram.com/yourhandle or behance.net/portfolio).';
    }
    return null;
  } catch {
    return 'Please enter a valid URL format for your portfolio or social profile.';
  }
}

/**
 * Validates agreement checkbox
 */
export function validateConsent(agreed: boolean): string | null {
  if (!agreed) {
    return 'You must agree to be contacted regarding this opportunity.';
  }
  return null;
}

/**
 * Validates complete form data and returns errors object
 */
export function validateApplication(data: ApplicationFormData): { isValid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {};

  const nameErr = validateFullName(data.fullName);
  if (nameErr) errors.fullName = nameErr;

  const emailErr = validateEmail(data.email);
  if (emailErr) errors.email = emailErr;

  const phoneErr = validatePhone(data.phone);
  if (phoneErr) errors.phone = phoneErr;

  const portfolioErr = validatePortfolioUrl(data.portfolioUrl);
  if (portfolioErr) errors.portfolioUrl = portfolioErr;

  const consentErr = validateConsent(data.agreedToTerms);
  if (consentErr) errors.agreedToTerms = consentErr;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Normalizes URL ensuring https prefix
 */
export function normalizeUrl(url?: string): string {
  if (!url || !url.trim()) return '';
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
}
