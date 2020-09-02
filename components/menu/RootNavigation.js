import * as React from 'react';
import {DrawerActions} from '@react-navigation/native';

export const navigationRef = React.createRef();

export function toggleDrawer() {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
}
