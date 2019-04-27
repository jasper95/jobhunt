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
import { createSelector } from 'reselect'
// import authSelector from 'redux/auth/selector'

const withBasePage = (params) => WrappedComponent => {
  const {
    node,
    getListRequestData = () => ({}),
    dataFormatter = (e) => e,
    pageName,
    dialogPath,
    getListRequestAction,
    dataPropKey,
    reducer,
    dialogProps = {}
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
        path: dialogPath,
        props: {
          ...dialogProps,
          dialogId: dialogPath,
          title: `New ${pageName}`,
          onValid: (data) => dispatch(Create({
            data: dataFormatter(data, 'SAVE_CREATE', props),
            node,
            callback: getList
          }))
        }
      }))
    }

    async function handleEdit(row) {
      const data = await api({
        url: `/${node}/${row.id}`
      })
      dispatch(ShowDialog({
        path: dialogPath,
        props: {
          ...dialogProps,
          title: `Edit ${pageName}`,
          initialFields: dataFormatter(data, 'EDIT', props),
          onValid: data => dispatch(Update({
            data: dataFormatter(data, 'SAVE_EDIT', props),
            node,
            callback: getList
          })),
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

  const basePageSelector = createSelector(
    state => state[reducer][dataPropKey],
    state => state.auth.user,
    (rows, user) => ({ rows, user })
  )

  return connect(basePageSelector)(BasePage)
}

export default withBasePage