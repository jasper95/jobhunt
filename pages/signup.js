import Head from 'next/head';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { SignUp } from 'redux/auth/actions'
import { connect } from 'react-redux'
import { styleLoginButton } from 'lib/SharedStyles';
import useForm from 'lib/hooks/useForm'

function Login(props){
  const { dispatch } = props
  const initialFields = {
    first_name: '',
    last_name: '',
    password: '',
    email: '',
    isShowPassword: false
  }
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
          id='first_name'
          label='First Name'
          type='first_name'
          margin='normal'
          variant='outlined'
          onChange={onElementChange}
          value={fields.first_name}
        />
        <TextField
          id='last_name'
          label='Last Name'
          type='last_name'
          margin='normal'
          variant='outlined'
          onChange={onElementChange}
          value={fields.last_name}
        />
        <br/>
        <TextField
          id='email'
          label='Email'
          type='email'
          margin='normal'
          variant='outlined'
          onChange={onElementChange}
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
            dispatch(SignUp(fields))
          }}
          children='Signup'
        />
        <span>Already have an account?</span>
        <Link href="/login">
          <a>Login Now</a>
        </Link>
      </form>
      {/* <br />
      <p style={{ margin: '45px auto', fontSize: '44px', fontWeight: '400' }}>Log in</p>
      <p>You’ll be logged in for 14 days unless you log out manually.</p>
      <br /> */}
      {/* <Button variant='contained' style={styleLoginButton} href='/auth/google'>
        <img
          src='https://storage.googleapis.com/builderbook/G.svg'
          alt='Log in with Google'
          style={{ marginRight: '10px' }}
        />
        Log in with Google
      </Button> */}
    </div>
  )
}

export default connect()(Login)