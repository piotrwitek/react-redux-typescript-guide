import * as React from 'react';
import { connect } from 'react-redux';
import { returntypeof } from 'react-redux-typescript';

import { RootState } from '../types';
import { actionCreators } from '../modules/converter';
import { StatelessComponent } from '../components';

type OwnProps = {
  label: string,
};

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  counter: state.converter.counter,
});

const dispatchProps = {
  increaseCounter: actionCreators.increaseCounter,
};

export const ConnectedStatelessComponent = connect(mapStateToProps, dispatchProps)(StatelessComponent);
