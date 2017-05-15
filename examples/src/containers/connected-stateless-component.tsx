import * as React from 'react';
import { connect } from 'react-redux';
import { returntypeof } from 'react-redux-typescript';

import { RootState } from '../types';
import { actionCreators } from '../modules/converter';
import { StatelessComponent, StatelessComponentProps } from '../components';

type ConnectedStatelessComponentProps = {
  label: StatelessComponentProps['label'],
};

const mapStateToProps = (state: RootState, ownProps: ConnectedStatelessComponentProps) => ({
  counter: state.converter.counter,
});

const dispatchProps = {
  increaseCounter: actionCreators.increaseCounter,
};

export const ConnectedStatelessComponent = connect(mapStateToProps, dispatchProps)(StatelessComponent);
