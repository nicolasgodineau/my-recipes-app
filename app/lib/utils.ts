export const convertCodeToStars = (code: string): string => {
    const starRatings = ["⭐️", "⭐️⭐️", "⭐️⭐️⭐️"];
    return starRatings[parseInt(code, 10) - 1] || "";
};
