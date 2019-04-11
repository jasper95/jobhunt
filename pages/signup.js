import Button from '@material-ui/core/Button';
import Link from 'next/link';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { SignUp } from 'redux/auth/actions'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { styleLoginButton } from 'lib/SharedStyles';
import withAuth from 'lib/hocs/auth';
import useForm from 'lib/hooks/useForm'
import { getValidationResult } from 'lib/tools'
import joi from 'joi'

const initialFields = {
  first_name: '',
  last_name: '',
  password: '',
  email: '',
  isShowPassword: false,
  role: 'USER',
  company_name: ''
}
function SignupPage(props){
  const { dispatch } = props
  const [formState, formHandlers] = useForm({ initialFields, validator, onValid })
  const {
    onElementChange,
    onChange,
    onValidate
  } = formHandlers
  const { fields, errors } = formState
  return (
    <div style={{ textAlign: 'center', margin: '0 20px' }}>
      <Button onClick={() => onChange('role', 'USER')} children='Candidate' />
      <Button onClick={() => onChange('role', 'ADMIN')} children='Employer' />
      <form noValidate autoComplete='off'>
        {fields.role === 'ADMIN' ? (
          <>
            <TextField
              id='company_name'
              label='Company Name'
              type='company_name'
              margin='normal'
              variant='outlined'
              onChange={onElementChange}
              value={fields.company_name}
              error={!!errors.company_name}
              helperText={errors.company_name}
            />
          </>
        ) : (
          <>
            <TextField
              id='first_name'
              label='First Name'
              type='first_name'
              margin='normal'
              variant='outlined'
              onChange={onElementChange}
              value={fields.first_name}
              error={!!errors.first_name}
              helperText={errors.first_name}
            />
            <TextField
              id='last_name'
              label='Last Name'
              type='last_name'
              margin='normal'
              variant='outlined'
              onChange={onElementChange}
              value={fields.last_name}
              error={!!errors.last_name}
              helperText={errors.last_name}
            />
          </>
        )}
        <br/>
        <TextField
          id='email'
          label='Email'
          type='email'
          margin='normal'
          variant='outlined'
          onChange={onElementChange}
          value={fields.email}
          error={!!errors.email}
          helperText={errors.email}
        />
        <br/>
        <TextField
          id='password'
          variant='outlined'
          type={fields.isShowPassword ? 'text': 'password' }
          label='Password'
          value={fields.password}
          error={!!errors.password}
          helperText={errors.password}
          onChange={onElementChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='Toggle password visibility'
                  onClick={() => onChange('isShowPassword', !fields.isShowPassword)}
                >
                  {fields.isShowPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <br/>
        <Button
          variant='contained'
          color='primary'
          style={styleLoginButton}
          onClick={onValidate}
          children='Signup'
        />
        <span>Already have an account?</span>
        <Link href="/login">
          <a>Login Now</a>
        </Link>
      </form>
    </div>
  )

  function onValid(data) {
    dispatch(SignUp(data))
  }
}

function validator(data) {
  const schema = joi.object().keys({
    company_name: joi
      .alternatives()
      .when('role', { is: 'ADMIN', then: joi.string().required(), otherwise: joi.optional() })
      .error(() => 'Company Name is required'),
    first_name: joi
      .alternatives()
      .when('role', { is: 'USER', then: joi.string().required(), otherwise: joi.optional() })
      .error(() => 'First Name is required') ,
    last_name: joi
      .alternatives()
      .when('role', { is: 'USER', then: joi.string().required(), otherwise: joi.optional() })
      .error(() => 'Last Name is required'),
    email: joi.string().email().required()
      .error(() => 'Invalid Email'),
    password: joi.string().required()
      .error(() => 'Password is required')
  })
  return getValidationResult(data, schema)
}

export default compose(
  withAuth(false),
  connect()
)(SignupPage)