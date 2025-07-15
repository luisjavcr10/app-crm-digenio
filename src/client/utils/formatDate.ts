export const getFormattedDate = (val: string | number | null) => {
    if (val === null || val === undefined || val === "") return "";
    const timestamp = typeof val === "string" && !isNaN(Number(val)) ? Number(val) : val;
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
  };