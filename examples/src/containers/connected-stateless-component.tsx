import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { returntypeof } from 'react-redux-typescript';

import { RootState, RootAction } from '../types';
import { actionCreators } from '../modules/converter';
import { StatelessComponent, StatelessComponentProps } from '../components';

type ConnectedStatelessComponentProps = {
  label: StatelessComponentProps['label'],
};

const mapStateToProps = (state: RootState, ownProps: ConnectedStatelessComponentProps) => ({
  counter: state.converter.counter,
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  incrementCounter: () => dispatch(actionCreators.increaseCounter()),
});

export const ConnectedStatelessComponent = connect(mapStateToProps, mapDispatchToProps)(StatelessComponent);
