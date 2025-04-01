const jwt = require("jsonwebtoken");

// Secret key for signing the token
const SECRET_KEY = "your_secret_key";

// Function to generate a JWT with an expiration time
const generateToken = (payload, expiresIn) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

// Function to verify a JWT and handle expired tokens
const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return { error: "Token has expired" };
    }
    return { error: "Invalid token" };
  }
};

// Test the implementation
const payload = { id: 1, name: "John Doe" };

// Generate a token that expires in 5 seconds
const token = generateToken(payload, "5s");
console.log("Generated Token:", token);

// Wait for 6 seconds to test token expiry
setTimeout(() => {
  const result = verifyToken(token);
  console.log("Verification Result:", result);
}, 6000);
