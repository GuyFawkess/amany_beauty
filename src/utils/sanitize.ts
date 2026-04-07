/**
 * Sanitizes a WhatsApp number for use in URLs.
 * Removes all non-digit characters and validates the length.
 *
 * @param input - The raw WhatsApp number string
 * @returns A sanitized string containing only digits, or empty string if invalid
 */
export function sanitizeWhatsAppNumber(input: string | undefined): string {
  if (!input) return '';

  // Remove all non-digit characters
  const digits = input.replace(/\D/g, '');

  // Validate length (typical phone numbers: 10-15 digits)
  if (digits.length < 10 || digits.length > 15) {
    console.warn(`Invalid WhatsApp number length: ${digits.length} digits`);
    return '';
  }

  return digits;
}

/**
 * Creates a safe WhatsApp link with optional pre-filled message.
 *
 * @param phoneNumber - The raw phone number
 * @param message - Optional pre-filled message (will be URL encoded)
 * @returns A complete wa.me URL or '#' if invalid
 */
export function createWhatsAppLink(
  phoneNumber: string | undefined,
  message?: string
): string {
  const sanitized = sanitizeWhatsAppNumber(phoneNumber);

  if (!sanitized) {
    return '#';
  }

  const baseUrl = `https://wa.me/${sanitized}`;

  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }

  return baseUrl;
}
