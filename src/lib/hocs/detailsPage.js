import React from 'react'
import api from 'lib/api'
import { connect } from 'react-redux'
import {
  ShowDialog,
  Update,
} from 'redux/app/actions'
import pick from 'lodash/pick'
import { createSelector } from 'reselect'

const withDetailsPage = (params) => WrappedComponent => {
  const {
    node,
    dataFormatter = (e) => e,
    pageName,
    dialogPath,
    detailsRequestAction,
    dataPropKey,
    dialogProps = {},
    reducer = node
  } = params
  function DetailsPage(props) {
    const { dispatch, id } = props
    return (
      <WrappedComponent
        onGetDetails={getDetails}
        onEdit={handleEdit}
        {...pick(params, ['pageName', 'node'])}
        {...props}
      />
    )

    async function handleEdit() {
      const data = await api({
        url: `/${node}/${id}`
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
            callback: getDetails
          })),
        }
      }))
    }
  
    function getDetails(data) {
      dispatch(detailsRequestAction({ data, key: dataPropKey, request: false }))
    }
  }

  DetailsPage.displayName = `withDetailsPage(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component'})`

  DetailsPage.getInitialProps = async(ctx) => {
    let componentProps = {}
    const { store, query = {} } = ctx
    const { id } = query
    if (id) {
      const data = await api({
        url: `/${node}/${id}`
      }, ctx)
      store.dispatch(detailsRequestAction({ data, key: dataPropKey, request: false }))
      componentProps = { id }
    }
    if (WrappedComponent.getInitialProps) {
      componentProps = await WrappedComponent.getInitialProps(ctx)
    }
    return componentProps
  }

  const selector = createSelector(
    (state) => state[reducer][dataPropKey],
    (details) => ({ details })
  )
  const detailsSelector = (state, ownProps) => selector(state, ownProps)
  return connect(detailsSelector)(DetailsPage)
}

export default withDetailsPage