export default function ValidateSignUp(values) {
  let errors = {};
  if (!values.name) {
    errors.name = "Name is required";
  } else if (values.name.length < 4) {
    errors.password = "Name must be at least 4 characters";
  }
  if (!values.company) {
    errors.company = "Company is required";
  } else if (values.company.length < 4) {
    errors.company = "Company name must be at least 4 characters";
  }

  if (!values.url) {
    errors.url = "Url is required";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errors.url = "Url isn't valid";
  }

  if (!values.description) {
    errors.description = "Description is required";
  } else if (values.description.length < 4) {
    errors.description = "Description must be at least 4 characters";
  }

  return errors;
}
