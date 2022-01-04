import {
  ensureNxProject,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';

describe('repro e2e', () => {
  it('should create repro with 1 lib', async () => {
    const plugin = uniq('repro');
    ensureNxProject('@repro-nx-generators/repro', 'dist/packages/repro');
    await runNxCommandAsync(
      `generate @repro-nx-generators/repro:repro ${plugin}`
    );
  }, 120000);

  it('should create repro with 10 libs', async () => {
    const plugin = uniq('repro');
    ensureNxProject('@repro-nx-generators/repro', 'dist/packages/repro');
    await runNxCommandAsync(
      `generate @repro-nx-generators/repro:repro ${plugin} --libs 10`
    );
  }, 1200000000);

  it('should create repro with 100 libs', async () => {
    const plugin = uniq('repro');
    ensureNxProject('@repro-nx-generators/repro', 'dist/packages/repro');
    await runNxCommandAsync(
      `generate @repro-nx-generators/repro:repro ${plugin} --libs 100`
    );
  }, 1200000000);
});
