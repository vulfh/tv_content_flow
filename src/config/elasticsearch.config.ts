import { registerAs } from '@nestjs/config';

export default registerAs('elasticsearch', () => ({
  host: process.env.ELASTICSEARCH_HOST || 'localhost',
  port: parseInt(process.env.ELASTICSEARCH_PORT || '9200', 10),
  user: process.env.ELASTICSEARCH_USER || '',
  password: process.env.ELASTICSEARCH_PASSWORD || '',
  protocol: process.env.ELASTICSEARCH_PROTOCOL || 'http',
  node: `${process.env.ELASTICSEARCH_PROTOCOL || 'http'}://${process.env.ELASTICSEARCH_USER || ''}:${process.env.ELASTICSEARCH_PASSWORD || ''}@${process.env.ELASTICSEARCH_HOST || 'localhost'}:${process.env.ELASTICSEARCH_PORT || '9200'}`,
}));
