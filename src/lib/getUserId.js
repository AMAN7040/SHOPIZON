import jwt from 'jsonwebtoken'; // Import jwt for token decoding
const getUserIdFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId; // Ensure this matches the userId field in your token payload
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error("Invalid token");
  }
};

export default getUserIdFromToken;