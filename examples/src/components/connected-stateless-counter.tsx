// import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { returntypeof } from 'react-redux-typescript';

import { IRootState, Dispatch } from '../modules';
import { actionCreators } from '../modules/converter';
import { StatelessCounter, IStatelessCounterProps } from '../components';

type ConnectedStatelessCounterProps =
  Pick<IStatelessCounterProps, 'label'>;

const mapStateToProps = (state: IRootState, ownProps: ConnectedStatelessCounterProps) => ({
  counter: state.converter.counter,
  label: ownProps.label,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  incrementCounter: actionCreators.addTodo,
}, dispatch);

const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);
const checkProps: IStatelessCounterProps = { ...stateProps, ...dispatchProps };

export const ConnectedStatelessCounter = connect(mapStateToProps, mapDispatchToProps)(StatelessCounter);
