// Utility to validate registration input
export const validateRegisterInput = ({ username, email, password }) => {
    if (!username) return "Username is required";
    if (!email) return "Email is required";
    if (!password) return "Password is required";
    return null;
  };
  
  // Utility to validate password strength
  export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  // Utility to validate login input
  export const validateLoginInput = ({ identifier, password }) => {
    if (!identifier) return "Username or Email is required";
    if (!password) return "Password is required";
    return null;
  };