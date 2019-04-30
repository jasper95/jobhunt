import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import Button from 'react-md/lib/Buttons/Button'
import cn from 'classnames'

function SubmitButton(props) {
  const { className, formProcessing, ...restProps } = props
  return (
    <Button
      className={cn(className, { processing: formProcessing })}
      {...restProps}
    />
  )
}

export default connect(createSelector(
  state => state.app.formProcessing,
  formProcessing => ({ formProcessing })
))(SubmitButton)
