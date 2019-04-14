import React from 'react'
import api from 'lib/api'
import queryString from 'query-string'
import { connect } from 'react-redux'
import {
  ShowDialog,
  Create,
  Update,
  Delete
} from 'redux/app/actions'
import pick from 'lodash/pick'
import authSelector from 'redux/auth/selector'

const withBasePage = (params) => WrappedComponent => {
  const {
    node,
    getListRequestData,
    dataFormatter = (e) => e,
    pageName,
    getListRequestAction,
    dataPropKey
  } = params
  function BasePage(props) {
    const { dispatch } = props
    return (
      <WrappedComponent
        onDelete={handleDelete}
        onGetList={getList}
        onNew={handleNew}
        onEdit={handleEdit}
        {...pick(params, ['pageName', 'node', 'dataPropKey'])}
        {...props}
      />
    )

    function handleNew() {
      dispatch(ShowDialog({
        path: pageName,
        props: {
          title: `New ${pageName}`,
          onValid: (data) => dispatch(Create({
            data: dataFormatter(data, 'SAVE_CREATE'),
            node,
            callback: getList
          }))
        }
      }))
    }

    function handleEdit(row) {
      dispatch(ShowDialog({
        path: pageName,
        props: {
          title: `Edit ${pageName}`,
          initialFields: dataFormatter(row, 'EDIT'),
          onValid: data => dispatch(Update({
            data: dataFormatter(data, 'SAVE_EDIT'),
            node,
            callback: getList
          }))
        }
      }))
    }

    function handleDelete(data) {
      dispatch(ShowDialog({
        path: 'Confirm',
        props: {
          title: 'Confirm Delete',
          message: 'Do you want to delete this item?',
          onValid: () => dispatch(Delete({
            data,
            node,
            callback: getList
          }))
        }
      }))
    }
  
    function getList() {
      const { user } = props
      dispatch(getListRequestAction({
        data: getListRequestData(user), key: dataPropKey, url: `/${node}`
      }))
    }
  }
  BasePage.displayName = `withBasePage(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component'})`
  BasePage.getInitialProps = async(ctx) => {
    let componentProps = {}
    const { store } = ctx
    const { user } = store.getState().auth
    if (user) {
      const data = await api({
        url: `/${node}?${queryString.stringify(getListRequestData(user))}`
      }, ctx)
      store.dispatch(getListRequestAction({ data, key: dataPropKey, request: false }))
    }
    if (WrappedComponent.getInitialProps) {
      componentProps = await WrappedComponent.getInitialProps(ctx)
    }
    return componentProps
  }
  return connect(authSelector)(BasePage)
}

export default withBasePage