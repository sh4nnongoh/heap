const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset({ useESM: true }).transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts', '**/__tests__/**/*.mts', '**/?(*.)+(spec|test).mts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts', 'src/**/*.mts', '!src/**/*.d.mts'],
  extensionsToTreatAsEsm: [".ts", ".mts"],
  transform: {
    ...tsJestTransformCfg,
  },
};