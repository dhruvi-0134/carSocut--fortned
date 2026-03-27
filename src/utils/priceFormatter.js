export const formatIndianPrice = (price) => {
    return price?.toLocaleString("en-IN");
};

export const formatCompactPrice = (price) => {
    if (!price) return "";

    if (price >= 10000000) {
        return "₹ " + Math.round(price / 10000000) + " Cr";
    } else if (price >= 100000) {
        return "₹ " + Math.round(price / 100000) + " Lakh";
    } else {
        return "₹ " + price.toLocaleString("en-IN");
    }
};