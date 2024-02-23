module.exports.extractObjectFromString = (inputString) => {
  try {
    const obj = JSON.parse(inputString);

    if (typeof obj === "object" && obj !== null) {
      return obj;
    } else {
      throw new Error("The input is not a valid JSON object.");
    }
  } catch (error) {
    console.error("Error extracting object:", error.message);
    return null;
  }
};
