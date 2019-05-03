import React, { useEffect } from 'react'
import TextField from 'react-md/lib/TextFields/TextField'
import Link from 'next/link';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Update, HideNotification } from 'redux/app/actions'
import useForm from 'lib/hooks/useForm'
import withAuth from 'lib/hocs/auth';
import Error from 'next/error'
import { getValidationResult } from 'lib/tools'
import Page from 'components/Layout/Page'
import Router from 'next/router'
import joi from 'joi'
import SubmitButton from 'components/SubmitButton'
import 'sass/pages/login.scss'


const initialFields = {
  password: '',
}

function ResetPassword(props){
  const { dispatch, user_id } = props
  const [formState, formHandlers] = useForm({ initialFields, validator, onValid })
  const {
    onElementChange,
    onValidate
  } = formHandlers
  const { fields, errors } = formState
  useEffect(() => {
    if(user_id) {
      Router.push('/reset-password', '/reset-password', { shallow: true })
    }
  }, [1])
  if (!user_id) {
    return <Error statusCode={404} />
  }
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
              Please Enter your new password
            </p>
          </div>
          <form
            className='authContainer_form' 
            noValidate 
            autoComplete='off'
            onSubmit={(e) => {
              e.preventDefault()
              onValidate()
            }}
          >
            <input type='Submit' hidden />
            <TextField
              className='iField'
              id='password'
              type='password'
              label='Password'
              value={fields.password || ''}
              error={!!errors.password}
              errorText={errors.password}
              onChange={onElementChange}
            />
            <div className='authContainer_form_action'>
              <SubmitButton
                className='iBttn iBttn-primary'
                onClick={onValidate}
                children='Reset Password'
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
    dispatch(Update({
      data: {
        ...data,
        user_id
      },
      node: 'reset-password',
      successMessage: 'Password successfully updated',
      formType: 'default',
      callbackDelay: 2000,
      callback: () => {
        dispatch(HideNotification())
        Router.push('/login')
      }
    }))
  }
}

ResetPassword.getInitialProps = async(ctx) => {
  const { query: { user_id } } = ctx
  return { user_id }
}

function validator(data) {
  const schema = joi.object().keys({
    password: joi.string().required().error(() => 'Password is required')
  })
  return getValidationResult(data, schema)
}

export default compose(
  withAuth(false),
  connect()
)(ResetPassword)
