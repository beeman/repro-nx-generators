import { getWorkspaceLayout, names, Tree } from '@nrwl/devkit';
import { ReproGeneratorSchema } from './schema';
import ngGenerator from '../ng-lib/generator';

interface NormalizedSchema extends ReproGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(
  tree: Tree,
  options: ReproGeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
    libs: options.libs || 1,
  };
}

export default async function (tree: Tree, options: ReproGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  console.log({ normalizedOptions });
  for (let i = 0; i < normalizedOptions.libs; i++) {
    console.log(`Create Lib ${i}`);
    await ngGenerator(tree, { name: `${normalizedOptions.name}-num${i}` });
  }
}
