import { libraryGenerator } from '@nrwl/angular/generators';
import { names, Tree } from '@nrwl/devkit';
import { NgLibGeneratorSchema } from './schema';

function normalizeOptions(
  tree: Tree,
  options: NgLibGeneratorSchema
): NgLibGeneratorSchema {
  const name = names(options.name).fileName;

  return {
    ...options,
    name,
  };
}

export default async function (tree: Tree, options: NgLibGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  await libraryGenerator(tree, {
    name: normalizedOptions.name,
    skipFormat: true,
  });
}
