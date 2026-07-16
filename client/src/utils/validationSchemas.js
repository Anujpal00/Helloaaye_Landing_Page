import * as yup from 'yup';

export const inquirySchema = yup.object().shape({
  fullName: yup
    .string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces')
    .trim(),
  companyName: yup
    .string()
    .required('Company name is required')
    .min(2, 'Company name must be at least 2 characters')
    .trim(),
  email: yup
    .string()
    .required('Email address is required')
    .email('Please enter a valid email address')
    .trim()
    .lowercase(),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(
      /^[\d+\-\s()]{7,20}$/,
      'Phone number must be between 7 and 20 characters (digits, spaces, dashes, or parentheses only)'
    )
    .trim(),
  country: yup
    .string()
    .required('Country selection is required')
    .trim(),
  industry: yup
    .string()
    .required('Industry selection is required')
    .oneOf(
      ['Technology', 'Healthcare', 'Finance', 'Retail', 'Education', 'Manufacturing', 'Other'],
      'Please select a valid industry'
    ),
  companySize: yup
    .string()
    .required('Company size selection is required')
    .oneOf(['1-10', '11-50', '51-200', '201-500', '500+'], 'Please select a valid company size'),
  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message cannot exceed 500 characters')
    .trim(),
});
