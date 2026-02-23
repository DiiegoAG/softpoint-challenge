/**
 * Formats a number as a currency string.
 * @param amount - The number to format
 * @param currency - Currency code (default: USD)
 * @param locale - Locale code (default: en-US)
 * @returns Formatted currency string
 */
export const formatCurrency = (
    amount: number | string,
    currency = 'USD',
    locale = 'en-US'
): string => {
    const value = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (isNaN(value)) return '$0.00';

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(value) + ' ' + currency;
};
