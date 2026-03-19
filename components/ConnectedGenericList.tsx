import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import GenericList, { GenericListProps } from './GenericList';

// Define the props that will be passed to the connected component
interface OwnProps {
  additionalProp: string;
}

// Create a function to map state to props
const mapStateToProps = <T,>(state: RootState) => {
  return {
    items: state.someReducer.items as T[], // Adjust this to reflect your state shape
  };
};

// Create the connected generic component
export const ConnectedListExtended = <T,>() => {
  const ConnectedComponent = connect<GenericListProps<T>, {}, OwnProps>(
    mapStateToProps
  )(GenericList<T>);

  return <ConnectedComponent additionalProp="Some Value" />;
};

export default ConnectedListExtended;