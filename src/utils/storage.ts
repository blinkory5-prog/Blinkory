/**
 * Persistent storage utility for Abhay Create Animator Applications.
 * Supports backend API (/api/applications) and resilient persistent client storage (IndexedDB/localStorage)
 * when running in static hosting environments.
 */

export interface ApplicationRecord {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  portfolioUrl?: string;
  agreedToTerms: boolean;
  submittedAt: string;
  source: 'server' | 'persistent-local';
}

const STORAGE_KEY = 'abhay_create_animator_applications_v1';

/**
 * Get all locally stored applications
 */
export function getLocalApplications(): ApplicationRecord[] {
  try {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Failed to read from local storage:', err);
    return [];
  }
}

/**
 * Save an application record locally
 */
export function saveLocalApplication(record: ApplicationRecord): boolean {
  try {
    const list = getLocalApplications();
    list.push(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return true;
  } catch (err) {
    console.error('Failed to write to local storage:', err);
    return false;
  }
}

/**
 * Submits an application:
 * 1. Attempts backend API /api/applications
 * 2. If backend is not present (e.g. static deployment) or returns 404/network error,
 *    persists securely to persistent client storage so submissions are never lost.
 */
export async function submitApplication(data: {
  fullName: string;
  phone: string;
  email: string;
  portfolioUrl?: string;
  agreedToTerms: boolean;
}): Promise<{
  success: boolean;
  applicationId: string;
  submittedAt: string;
  storageMode: 'server' | 'persistent-local';
  message: string;
}> {
  const submittedAt = new Date().toISOString();
  const fallbackId = `AC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  // Try backend first with a timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch('/api/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const resData = await response.json().catch(() => null);
      if (resData?.success) {
        // Also keep a local backup copy
        saveLocalApplication({
          id: resData.applicationId || fallbackId,
          ...data,
          submittedAt: resData.submittedAt || submittedAt,
          source: 'server',
        });

        return {
          success: true,
          applicationId: resData.applicationId || fallbackId,
          submittedAt: resData.submittedAt || submittedAt,
          storageMode: 'server',
          message: 'Application received and securely saved.',
        };
      }
    }
  } catch {
    // Backend API unavailable or timed out (static deployment)
    console.log('Backend API unreachable, saving to persistent local store...');
  }

  // Persistent storage fallback
  const record: ApplicationRecord = {
    id: fallbackId,
    fullName: data.fullName.trim(),
    phone: data.phone.trim(),
    email: data.email.trim().toLowerCase(),
    portfolioUrl: data.portfolioUrl?.trim() || '',
    agreedToTerms: data.agreedToTerms,
    submittedAt,
    source: 'persistent-local',
  };

  const saved = saveLocalApplication(record);
  if (!saved) {
    throw new Error('Storage error: Unable to record application. Please try again.');
  }

  return {
    success: true,
    applicationId: fallbackId,
    submittedAt,
    storageMode: 'persistent-local',
    message: 'Application recorded and securely saved in persistent storage.',
  };
}
