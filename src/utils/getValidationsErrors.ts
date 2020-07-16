import { ValidationError } from 'yup'

interface Errors {
  [key: string]: string
}

<<<<<<< HEAD:src/utils/getValidationErrors.ts
export default function getValidationErrors(err: ValidationError): Errors {
  return err.inner.reduce(
    (acc, { path, message }) => ({
      ...acc,
      [path]: message,
    }),
    {} as Errors,
  )
=======
export default function getValidationsErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {}

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message
  })

  return validationErrors
>>>>>>> 3128c513ee5eda53f19ebcf3f09189881253ef7d:src/utils/getValidationsErrors.ts
}
