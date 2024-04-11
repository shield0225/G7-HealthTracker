export const validateStats = (formData) => {
  let newErrors = {};

  if (
    Number(formData.bodyTemperature) < 30 ||
    Number(formData.bodyTemperature) > 50
  ) {
    newErrors.bodyTemperature =
      "Body temperature must be between 30°C and 50°C.";
  } else {
    delete newErrors.bodyTemperature;
  }

  if (Number(formData.heartRate) < 50 || Number(formData.heartRate) > 250) {
    newErrors.heartRate = "Heart rate must be between 50 bpm and 250 bpm.";
  } else {
    delete newErrors.heartRate;
  }

  if (Number(formData.weight) < 10) {
    newErrors.weight = "Weight must be at least 10 lbs.";
  } else {
    delete newErrors.weight;
  }

  if (
    Number(formData.systolicBloodPressure) < 50 ||
    Number(formData.systolicBloodPressure) > 250
  ) {
    newErrors.systolicBloodPressure =
      "Systolic blood pressure must be between 50 and 250.";
  } else if (
    Number(formData.systolicBloodPressure) <=
    Number(formData.diastolicBloodPressure)
  ) {
    newErrors.systolicBloodPressure =
      "Systolic pressure must be greater than diastolic pressure.";
  } else {
    delete newErrors.systolicBloodPressure;
  }

  if (!formData.diastolicBloodPressure) {
    newErrors.diastolicBloodPressure = "Diastolic blood pressure is required.";
  } else if (Number(formData.diastolicBloodPressure) <= 0) {
    newErrors.diastolicBloodPressure =
      "Diastolic blood pressure must be greater than 0.";
  } else if (
    Number(formData.diastolicBloodPressure) < 50 ||
    Number(formData.diastolicBloodPressure) > 250
  ) {
    newErrors.diastolicBloodPressure =
      "Diastolic blood pressure must be between 50 and 250.";
  } else {
    delete newErrors.diastolicBloodPressure;
  }

  if (
    Number(formData.systolicBloodPressure) <=
    Number(formData.diastolicBloodPressure)
  ) {
    newErrors.systolicBloodPressure =
      "Systolic pressure must be greater than diastolic pressure.";
  } else {
    delete newErrors.systolicBloodPressure;
  }

  if (
    Number(formData.respirationRate) < 10 ||
    Number(formData.respirationRate) > 30
  ) {
    newErrors.respirationRate = "Respiratory rate must be between 10 to 30.";
  } else {
    delete newErrors.respirationRate;
  }

  return newErrors;
};

export const validateRegistration = (formData) => {
  let newErrors = {};

  // Check if email is already in the system
  if (isEmailAlreadyRegistered(formData.email)) {
    newErrors.email = "Email address is already registered.";
  } else {
    delete newErrors.email;
  }

  // Check password length
  if (formData.password.length < 6) {
    newErrors.password = "Must be at least 6 characters.";
  } else {
    delete newErrors.password;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    newErrors.email = "Invalid email address.";
  } else {
    delete newErrors.email;
  }

  return newErrors;
};

const isEmailAlreadyRegistered = (email) => {
  // TBD
};

export const validateLogin = (formData) => {
  let newErrors = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    newErrors.email = "Invalid email address.";
  } else {
    delete newErrors.email;
  }

  if (formData.password.length < 6) {
    newErrors.password = "Must be at least 6 characters";
  } else {
    delete newErrors.password;
  }

  return newErrors;
};
