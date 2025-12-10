// API Configuration
// Use env var if provided; otherwise fall back to current origin (useful on Render)
const API_URL = process.env.REACT_APP_API_URL || window.location.origin;

export default API_URL;
