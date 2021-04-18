export const getFormattedDate = (val) => {
    const len = val.length;

    if (len == 3 && !val.includes('/'))
        val = val.substring(0, len - 1) + '/' + val.substring(len - 1, len);

    return val;
}