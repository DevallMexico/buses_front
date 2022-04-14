export const formatQueryParams = (data) => {
  const entries = Object.entries(data);
  let filters = "";
  if (entries.length > 0) {
    for (const [key, value] of entries) {
      if (value) filters += `${filters ? "&" : ""}${key}=${value}`
    }
  }
  return filters;
}