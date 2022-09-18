import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to SunmiV2PrinterModule.web.ts
// and on native platforms to SunmiV2PrinterModule.ts
import SunmiV2PrinterModule from './SunmiV2PrinterModuleModule';
import SunmiV2PrinterModuleView from './SunmiV2PrinterModuleView';
import { ChangeEventPayload, SunmiV2PrinterModuleViewProps } from './SunmiV2PrinterModule.types';

// Get the native constant value.
export const PI = SunmiV2PrinterModule.PI;

export function initService(): void {
  SunmiV2PrinterModule.initService();
}

export function printQRCode(qrCodeData: string): void {
  SunmiV2PrinterModule.printQRCode(qrCodeData);
}

export async function setValueAsync(value: string) {
  return await SunmiV2PrinterModule.setValueAsync(value);
}

// For now the events are not going through the JSI, so we have to use its bridge equivalent.
// This will be fixed in the stable release and built into the module object.
// Note: On web, NativeModulesProxy.SunmiV2PrinterModule is undefined, so we fall back to the directly imported implementation
const emitter = new EventEmitter(NativeModulesProxy.SunmiV2PrinterModule ?? SunmiV2PrinterModule);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { SunmiV2PrinterModuleView, SunmiV2PrinterModuleViewProps, ChangeEventPayload };
