import { DataSource } from 'typeorm';
import { ContentType } from '../entities/content-type.entity';

export async function seedContentTypes(dataSource: DataSource): Promise<void> {
  const contentTypeRepository = dataSource.getRepository(ContentType);
  
  const contentTypes: Partial<ContentType>[] = [
    { id: 1, name: 'Movie' },
    { id: 2, name: 'TV Show' },
    { id: 3, name: 'Documentary' },
    { id: 4, name: 'Anime' },
    { id: 5, name: 'Stand-up Comedy' },
    { id: 6, name: 'Reality TV' },
    { id: 7, name: 'News' },
    { id: 8, name: 'Sports' },
  ];

  // Check if content types already exist
  const existingTypes = await contentTypeRepository.find();
  if (existingTypes.length === 0) {
    await contentTypeRepository.save(contentTypes);
    console.log('✅ Seeded content types');
  } else {
    console.log('ℹ️  Content types already seeded');
  }
}

export async function clearContentTypes(dataSource: DataSource): Promise<void> {
  const contentTypeRepository = dataSource.getRepository(ContentType);
  await contentTypeRepository.clear();
  console.log('🧹 Cleared content types');
}
