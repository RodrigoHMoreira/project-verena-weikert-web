interface UserBody {
  [key: string]: string;
}
export const formatTelephone = (value: string) => {
  value = value.replace(/\D/g, "");
  if (value.length > 11) {
    value = value.substring(0, 11);
  }
  if (value.length > 7) {
    value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (value.length > 2) {
    value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
  } else {
    value = value.replace(/(\d{0,2})/, "($1");
  }
  return value;
};

export const validateUserBody = (
  body: UserBody,
  requiredFields: string[] = []
): string[] => {
  const errors: string[] = [];

  requiredFields.forEach((field) => {
    if (!body[field] || body[field].trim() === "") {
      errors.push(field);
    }
  });

  return errors;
};
