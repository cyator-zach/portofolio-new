export function validateRequired(data, fields) {
    for (const field of fields) {
        if (!data || data[field] === undefined || data[field] === null || data[field] === "") {
            return `${field} is required element`;
        }
    }
    return null;
}
