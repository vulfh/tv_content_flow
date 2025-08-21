import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../../../ormconfig';
import { ContentType } from '../entities/content-type.entity';
import { seedContentTypes, clearContentTypes } from './content-types.seed';

async function runSeeds() {
  const dataSource = new DataSource({
    ...dataSourceOptions,
    entities: [ContentType],
    synchronize: true, // This will create tables if they don't exist
  });
  
  try {
    await dataSource.initialize();
    console.log(' Data Source has been initialized!');

    // Run seeds
    await seedContentTypes(dataSource);
    
    console.log(' All seeds completed successfully!');
  } catch (error) {
    console.error(' Error during seeds execution', error);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

// Add command line argument support
const command = process.argv[2];

switch (command) {
  case 'seed':
    runSeeds();
    break;
  case 'clear':
    clearSeeds();
    break;
  default:
    console.log('Usage: ts-node src/database/seeds/index.ts [seed|clear]');
    process.exit(1);
}

async function clearSeeds() {
  const dataSource = new DataSource(dataSourceOptions);
  
  try {
    await dataSource.initialize();
    console.log(' Data Source has been initialized!');

    // Clear seeds in reverse order of dependencies
    await clearContentTypes(dataSource);
    
    console.log(' All seeds cleared!');
  } catch (error) {
    console.error(' Error during seeds clearing', error);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}
