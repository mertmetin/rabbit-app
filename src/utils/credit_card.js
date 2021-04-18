export const getFormattedCreditCardNumber = (val) => val.replace(/[^\dA-Z]/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();