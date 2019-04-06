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
import withAuth from 'lib/auth';

const initialFields = {
  password: '',
  email: '',
  isShowPassword: false
}
function LoginPage(props){
  const { dispatch } = props
  const [formState, formHandlers] = useForm({ initialFields })
  const {
    onElementChange,
    onChange
  } = formHandlers
  const { fields, errors } = formState
  return (
    <div style={{ textAlign: 'center', margin: '0 20px' }}>
      <Head>
        <title>Log in to Builder Book</title>
        <meta name='description' content='Login page for builderbook.org' />
      </Head>
      <form noValidate autoComplete='off'>
        <TextField
          id='email'
          label='Email'
          type='email'
          margin='normal'
          variant='outlined'
          onChange={onElementChange}
          helperText={errors.email}
          value={fields.email}
        />
        <br/>
        <TextField
          id='password'
          variant='outlined'
          type={fields.isShowPassword ? 'text': 'password' }
          label='Password'
          value={fields.password}
          error={errors.password}
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
          onClick={() => {
            dispatch(Login(fields))
          }}
          children='Login'
        />
        <span>No Existing Account?</span>
        <Link href="/signup">
          <a>Signup Now</a>
        </Link>
      </form>
    </div>
  )
}

export default compose(
  withAuth(false),
  connect()
)(LoginPage)