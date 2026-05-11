import * as React from 'react';
import Types from 'MyTypes';
import { connect } from 'react-redux';

import { GenericList, GenericListProps } from '../components';

type StateProps<T> = Pick<GenericListProps<T>, 'items'>;

export type OwnProps<T> = Pick<GenericListProps<T>, 'itemRenderer'> & {
  selectItems: (state: Types.RootState) => T[];
};

export const createConnectedGenericList = <T,>() => {
  const mapStateToProps = (
    state: Types.RootState,
    ownProps: OwnProps<T>
  ): StateProps<T> => ({
    items: ownProps.selectItems(state),
  });

  const TypedGenericList = GenericList as React.ComponentType<
    GenericListProps<T>
  >;

  return connect<StateProps<T>, {}, OwnProps<T>, Types.RootState>(
    mapStateToProps
  )(TypedGenericList);
};
