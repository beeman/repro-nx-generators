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

export function timeDiff(start: Date, end = new Date()) {
  const diff = (start.getTime() - end.getTime()) / 1000;

  return Math.abs(Math.round(diff));
}

export function logDate(d: Date = new Date()) {
  return `${
    d.getMonth() + 1
  }/${d.getDate()}/${d.getFullYear()} ${d.getUTCHours()}:${d.getUTCMinutes()}:${d.getUTCSeconds()}`;
}

export function logEntry(message: string, startDate?: Date) {
  console.log(
    `[${logDate()}] ${message}`,
    startDate ? ` -> Duration ${timeDiff(startDate)} seconds` : ''
  );
}

export default async function (tree: Tree, options: ReproGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);
  const startTime = new Date();
  logEntry('Starting');
  for (let i = 0; i < normalizedOptions.libs; i++) {
    logEntry(`Generating ${normalizedOptions.name} ${i}`, startTime);
    await ngGenerator(tree, { name: `${normalizedOptions.name}-num${i}` });
  }
}
