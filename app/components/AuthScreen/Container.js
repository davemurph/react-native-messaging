import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
 
import AuthScreenComponent from './Component'
 
const AuthScreenContainer = props =>
  <AuthScreenComponent
    isLoading={props.isLoading}
    error={props.error} />
 
const mapStateToProps = state => ({
  isLoading: state.session.isLoading,
  error: state.session.error,
})
 
AuthScreenContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
}
 
export default connect(mapStateToProps)(AuthScreenContainer)