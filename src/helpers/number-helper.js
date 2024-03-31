function calculatePercentageHigher(num1, num2) {
    if (typeof num1 !== 'number' || typeof num2 !== 'number' || num2 === 0) {
        return NaN; // Returning NaN for invalid input
    }

    const percentageHigher = ((num1 - num2) / num2) * 100;

    if (num1 > num2) {
        return Math.round(percentageHigher); // Return a positive number
    } else if (num1 < num2) {
        return -Math.round(percentageHigher); // Return a negative number
    } else {
        return 0; // Return 0 if both numbers are equal
    }
}

export { calculatePercentageHigher }