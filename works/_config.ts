import {
  GpioMapping,
  LedMatrix,
  // LedMatrixUtils,
  MatrixOptions,
  RuntimeFlag,
  // PixelMapperType,
  RuntimeOptions,
} from '../src';

export const matrixOptions: MatrixOptions = {
  ...LedMatrix.defaultMatrixOptions(),
  rows: 64,
  cols: 64,
  chainLength: 1,
  hardwareMapping: GpioMapping.Regular,
  parallel: 1,
  // panelType: 'FM6127',
  // limitRefreshRateHz: 1,
  showRefreshRate: false,//true,
  scanMode: 1
  // pixelMapperConfig: LedMatrixUtils.encodeMappers(
  //   { type: PixelMapperType.Chainlink }
  // ),
  // pixelMapperConfig: LedMatrixUtils.encodeMappers({ type: PixelMapperType.U }),
};

console.log('matrix options: ', JSON.stringify(matrixOptions, null, 2));

export const runtimeOptions: RuntimeOptions = {
  ...LedMatrix.defaultRuntimeOptions(),
  gpioSlowdown: 4,
  //daemon: RuntimeFlag.On,
  //dropPrivileges: RuntimeFlag.On
  dropPrivileges: RuntimeFlag.Off,
};

console.log('runtime options: ', JSON.stringify(runtimeOptions, null, 2));
