// Contact Configuration
// Update these values with your actual contact information

export const contactConfig = {
  // WhatsApp Configuration
  whatsapp: {
    // Phone number format: country code + number (e.g., 919876543210 for India +91-9876543210)
    // NO +, spaces, or hyphens - just the country code followed by the number
    phoneNumber: '919392423955', // CHANGE THIS TO YOUR WHATSAPP NUMBER
    defaultMessage: 'Hi TechMatch! I would like to inquire about your services.',
  },

  // Email Configuration
  email: 'contact@techmatch.com', // CHANGE THIS TO YOUR EMAIL

  // Phone Configuration
  phone: '+91-9876543210', // CHANGE THIS TO YOUR PHONE NUMBER

  // Address Configuration
  address: 'Your Address Here',
};

/**
 * Helper function to generate WhatsApp URL
 * @param {string} message - Custom message (optional)
 * @returns {string} - WhatsApp Web URL
 */
export const getWhatsAppURL = (message = null) => {
  const msg = message || contactConfig.whatsapp.defaultMessage;
  return `https://wa.me/${contactConfig.whatsapp.phoneNumber}?text=${encodeURIComponent(msg)}`;
};

/**
 * Helper function to open WhatsApp in new window
 * @param {string} message - Custom message (optional)
 */
export const openWhatsApp = (message = null) => {
  const url = getWhatsAppURL(message);
  window.open(url, '_blank', 'width=800,height=600');
};
