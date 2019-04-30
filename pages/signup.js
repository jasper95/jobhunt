import React from 'react'
import Page from 'components/Layout/Page'
import Button from 'react-md/lib/Buttons/Button'
import SubmitButton from 'components/SubmitButton'
import TextField from 'react-md/lib/TextFields/TextField'
import Link from 'next/link';
import { SignUp } from 'redux/auth/actions'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withAuth from 'lib/hocs/auth';
import useForm from 'lib/hooks/useForm'
import { getValidationResult } from 'lib/tools'
import joi from 'joi'

import cn from 'classnames'

const initialFields = {
  first_name: '',
  last_name: '',
  password: '',
  email: '',
  isShowPassword: false,
  role: 'USER',
  company_name: ''
}

import 'sass/pages/signup.scss'


function SignupPage(props){
  const { dispatch } = props
  const [formState, formHandlers] = useForm({ initialFields, validator, onValid })
  const {
    onElementChange,
    onChange,
    onValidate
  } = formHandlers
  const { fields, errors } = formState

  const isEmployer = fields.role === 'ADMIN'
  return (
    <Page 
      pageId='register'
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

            <div className='iBttnFakeTab'>
              <Button 
                flat
                className={cn('iBttn', {'active': !isEmployer})}
                children='Candidate'
                onClick={() => onChange('role', 'USER')}
              />
              <Button
                flat
                className={cn('iBttn', {'active': isEmployer})}
                children='Employer'
                onClick={() => onChange('role', 'ADMIN')}
              />
            </div>

            <h1 className='authContainer_contentHeader_title'>
              { isEmployer 
                ? 'Employer Sign Up'
                : 'Candidate Sign Up'
              }
            </h1>

            <p className='authContainer_contentHeader_msg'>
              fill in the form to sign up
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
            { isEmployer ? (
              <TextField
                className='iField'
                id='company_name'
                label='Company Name'
                type='company_name'
                margin='normal'
                onChange={onElementChange}
                value={fields.company_name}
                error={!!errors.company_name}
                errorText={errors.company_name}
              />
            ) : (
              <div className='row iFieldRow '>
                <TextField
                  className='iField col-md-6'
                  id='first_name'
                  label='First Name'
                  margin='normal'
                  onChange={onElementChange}
                  value={fields.first_name}
                  error={!!errors.first_name}
                  errorText={errors.first_name}
                />
                <TextField
                  className='iField col-md-6'
                  id='last_name'
                  label='Last Name'
                  margin='normal'
                  onChange={onElementChange}
                  value={fields.last_name}
                  error={!!errors.last_name}
                  errorText={errors.last_name}
                />
              </div>
            )}

            <TextField
              className='iField'
              id='email'
              label='Email'
              type='email'
              margin='normal'
              variant='outlined'
              onChange={onElementChange}
              value={fields.email}
              error={!!errors.email}
              errorText={errors.email}
            />
            <TextField
              className='iField'
              id='password'
              type={fields.isShowPassword ? 'text': 'password' }
              label='Password'
              value={fields.password}
              error={!!errors.password}
              errorText={errors.password}
              onChange={onElementChange}
            />


            <div className='authContainer_form_action'>
              <SubmitButton
                flat
                className='iBttn iBttn-primary'
                onClick={onValidate}
                children='Signup'
              />

              <div className='row row-center'>
                <p>
                  Already have an account? 
                  <Link href="/login">
                    <a>Login Now</a>
                  </Link>
                </p>
              </div>

            </div>
          </form>
        </div>
        <div className='authContainer_bg' />
      </div>
    </Page>
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