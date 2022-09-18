import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { SunmiV2PrinterModuleViewProps } from './SunmiV2PrinterModule.types';

const NativeView: React.ComponentType<SunmiV2PrinterModuleViewProps> =
  requireNativeViewManager('SunmiV2PrinterModule');

export default function SunmiV2PrinterModuleView(props: SunmiV2PrinterModuleViewProps) {
  return <NativeView name={props.name} />;
}
