import Head from 'next/head';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Link from 'next/link';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Login } from 'redux/auth/actions'
import { styleLoginButton } from 'lib/SharedStyles';
import useForm from 'lib/hooks/useForm'
import withAuth from 'lib/hocs/auth';
import { getValidationResult } from 'lib/tools'
import joi from 'joi'

const initialFields = {
  password: '',
  email: '',
  isShowPassword: false
}

function LoginPage(props){
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
      <form noValidate autoComplete='off'>
        <TextField
          id='email'
          label='Email'
          type='email'
          margin='normal'
          variant='outlined'
          onChange={onElementChange}
          helperText={errors.email}
          error={!!errors.email}
          value={fields.email || ''}
        />
        <br/>
        <TextField
          id='password'
          variant='outlined'
          type={fields.isShowPassword ? 'text': 'password' }
          label='Password'
          value={fields.password || ''}
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
          children='Login'
        />
        <span>No Existing Account?</span>
        <Link href="/signup">
          <a>Signup Now</a>
        </Link>
      </form>
    </div>
  )

  function onValid(data) {
    dispatch(Login(data))
  }
}

function validator(data) {
  const schema = joi.object().keys({
    email: joi.string().email().required().error(() => 'Invalid Email'),
    password: joi.string().required().error(() => 'Password is required')
  })
  return getValidationResult(data, schema)
}

export default compose(
  withAuth(false),
  connect()
)(LoginPage)