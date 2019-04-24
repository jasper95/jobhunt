import Button from 'react-md/lib/Buttons/Button'
import TextField from 'react-md/lib/TextFields/TextField'
import Link from 'next/link';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Login } from 'redux/auth/actions'
import useForm from 'lib/hooks/useForm'
import withAuth from 'lib/hocs/auth';
import api, { redirectToPath } from 'lib/api'
import { getValidationResult } from 'lib/tools'
import Page from 'components/Layout/Page'
import joi from 'joi'
import 'sass/pages/login.scss'


const initialFields = {
  password: '',
  email: '',
  isShowPassword: false
}

function LoginPage(props){
  const { dispatch, verified } = props
  const [formState, formHandlers] = useForm({ initialFields, validator, onValid })
  const {
    onElementChange,
    onChange,
    onValidate
  } = formHandlers
  const { fields, errors } = formState

  return (
    <Page 
      pageId='login'
      hasNavigation={false}
      hasFooter={false}>

      <div className='authContainer'>
        <div className='authContainer_content'>
          <div className='authContainer_contentHeader'>
            <Link href="/">
              <img 
                src='/static/img/logo.png' 
                alt=''
                className='authContainer_contentHeader_logo'
              />
            </Link>

            <h1 className='authContainer_contentHeader_title'>
              Login
            </h1>

            <p className='authContainer_contentHeader_msg'>
              Welcome back , Please login <br/> 
              to your account
            </p>
          </div>
          <form
            className='authContainer_form' 
            noValidate 
            autoComplete='off'>

            { verified && (
              <div className='authContainer_form_msg 
                authContainer_form_msg-success'>
                <p>Account successfully verified</p>
              </div>
            )}

            <TextField
              className='iField'
              id='email'
              label='Email'
              type='email'
              variant='outlined'
              onChange={onElementChange}
              errorText={errors.email}
              error={!!errors.email}
              value={fields.email || ''}
            />
            <TextField
              // className='iField'
              id='password'
              // variant='outlined'
              type='password'
              label='Password'
              value={fields.password || ''}
              error={!!errors.password}
              errorText={errors.password}
              onChange={onElementChange}
            />
            <div className='authContainer_form_action'>
              <Button
                className='iBttn iBttn-primary'
                onClick={onValidate}
                children='Login'
                flat
              />
              <Button
                className='iBttn iBttn-second-prio'
                href='/signup'
                children='Sign Up'
                flat
              />
            </div>
          </form>
        </div>
        <div className='authContainer_bg' />
      </div>
    </Page>
  )

  function onValid(data) {
    dispatch(Login(data))
  }
}

LoginPage.getInitialProps = async(ctx) => {
  const { query, isServer } = ctx
  const props = {}
  if (query.user_id && isServer) {
    const { user_id } = query
    await api({
      url: '/user',
      method: 'PUT',
      data: {
        id: user_id,
        verified: true
      }
    }, ctx)
    redirectToPath(ctx, '/login?verified=true')
  } else if(query.verified) {
    props.verified = true
  }
  return props
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
