// import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { returntypeof } from 'react-redux-typescript';

import { IRootState, Dispatch } from '../modules';
import { actionCreators } from '../modules/todos';
import { StatelessCounter, IStatelessCounterProps } from '../components';

const mapStateToProps = (state: IRootState, ownProps: IStatelessCounterProps) => ({
  counter: state.converter.records,
  label: ownProps.label,
});
const returnOfStateProps = returntypeof(mapStateToProps);

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  incrementCounter: actionCreators.addTodo,
}, dispatch);
const returnOfDispatchProps = returntypeof(mapDispatchToProps);

const _noOp: IStatelessCounterProps = {
  ...returnOfStateProps,
  ...returnOfDispatchProps,
};

type RestProps =
  Pick<IStatelessCounterProps, 'label'>;

export const ConnectedStatelessCounter: React.ComponentClass<RestProps>
  = connect(mapStateToProps, mapDispatchToProps)(StatelessCounter);
