import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { ConsumerConfig, KafkaConfig } from 'kafkajs';
dotenv.config();

const ssl = {
  rejectUnauthorized: false,
  ca: [
    fs.readFileSync(path.resolve('src/certs/cer.crt'), {
      encoding: 'utf-8',
    }),
  ],
  cert: fs.readFileSync(path.resolve('src/certs/ca-cert-sit.pem'), {
    encoding: 'utf-8',
  }),
};

const sasl = {
  mechanism: process.env.CPF_KAFKA_MECHANISM as 'plain',
  username: process.env.CPF_KAFKA_USERNAME,
  password: process.env.CPF_KAFKA_PASSWORD,
};

export const kafkaClientOptions: KafkaConfig = {
  brokers: [process.env.CPF_KAFKA_HOST],
  clientId: process.env.CPF_KAFKA_CLIENT_ID,
  ssl,
  sasl,
};

export const options: ConsumerConfig = {
  groupId: process.env.CPF_KAFKA_GROUP_ID,
  sessionTimeout: 60000,
  heartbeatInterval: 20000,
  maxBytesPerPartition: 1024 * 1024 * 100,
};
