module.exports = function parseJsonField(field) {
  try {
    if (typeof field === "string") {
      return JSON.parse(field);
    } else if (Array.isArray(field)) {
      return field;
    } else {
      return [];
    }
  } catch (err) {
    return [];
  }
};