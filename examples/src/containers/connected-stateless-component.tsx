import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { returntypeof } from 'react-redux-typescript';

import { RootState, RootAction, Dispatch } from '../types';
import { actionCreators } from '../modules/converter';
import { StatelessComponent, StatelessComponentProps } from '../components';

type ConnectedStatelessComponentProps = {
  label: StatelessComponentProps['label'],
};

const mapStateToProps = (state: RootState, ownProps: ConnectedStatelessComponentProps) => ({
  counter: state.converter.counter,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  incrementCounter: actionCreators.increaseCounter,
}, dispatch);

export const ConnectedStatelessComponent = connect(mapStateToProps, mapDispatchToProps)(StatelessComponent);
