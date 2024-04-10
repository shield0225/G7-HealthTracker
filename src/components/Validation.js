const validateStats = (formData) => {
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

  if (!formData.systolicBloodPressure) {
    newErrors.systolicBloodPressure = "Systolic blood pressure is required.";
  } else if (Number(formData.systolicBloodPressure) <= 0) {
    newErrors.systolicBloodPressure =
      "Systolic blood pressure must be greater than 0.";
  } else {
    delete newErrors.systolicBloodPressure;
  }

  if (!formData.diastolicBloodPressure) {
    newErrors.diastolicBloodPressure = "Diastolic blood pressure is required.";
  } else if (Number(formData.diastolicBloodPressure) <= 0) {
    newErrors.diastolicBloodPressure =
      "Diastolic blood pressure must be greater than 0.";
  } else {
    delete newErrors.diastolicBloodPressure;
  }

  if (
    Number(formData.systolicBloodPressure) <=
    Number(formData.diastolicBloodPressure)
  ) {
    newErrors.bloodPressure =
      "Systolic pressure must be greater than diastolic pressure.";
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

export default validateStats;
