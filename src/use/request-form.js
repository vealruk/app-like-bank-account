import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'

export default function useRequestForm (fn) {
  const MIN_LENGTH_PHONE = 10

  const { handleSubmit, isSubmitting } = useForm({
    initialValues: {
      status: 'active'
    }
  })

  const { value: fullName, errorMessage: fError, handleBlur: fBlur } = useField(
    'fullName',
    yup
      .string()
      .trim()
      .required('Введите ФИО')
  )

  const { value: phone, errorMessage: pError, handleBlur: pBlur } = useField(
    'phone',
    yup
      .string()
      .trim()
      .required('Введите номер телефона')
      .min(MIN_LENGTH_PHONE, 'Введите корректный телефон')
  )

  const { value: amount, errorMessage: aError, handleBlur: aBlur } = useField(
    'amount',
    yup
      .number()
      .required('Введите сумму заявки')
      .min(100, 'Сумма не может быть меньше 100 рублей')
  )

  const { value: status } = useField('status')

  const onSubmit = handleSubmit(fn)

  return {
    fullName,
    fError,
    fBlur,
    phone,
    pError,
    pBlur,
    amount,
    aError,
    aBlur,
    status,
    isSubmitting,
    onSubmit
  }
}
