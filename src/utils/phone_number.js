export const getFormattedPhoneNumber = (val) => val.replace(/\D+/g, '')
    .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');