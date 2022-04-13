import { Dispatch } from 'redux';
import {
  TypedUseSelectorHook,
  useSelector as useGenericSelector,
  useDispatch as useGenericDispatch
} from 'react-redux';
import { RootState, RootAction } from 'MyTypes';

export const useSelector: TypedUseSelectorHook<RootState> = useGenericSelector;

export const useDispatch: () => Dispatch<RootAction> = useGenericDispatch;
