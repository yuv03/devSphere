const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a Strong password");
  }
};

const validateEditProfiledata = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "skills",
    "password",
    "age",
    "gender",
    "photoUrl",
    "about",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field),
  );
  return isEditAllowed;
};

module.exports = {
  validateSignUpData,
  validateEditProfiledata,
};
