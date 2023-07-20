import { ClientOpts, createClient } from 'redis';

const redisOptions: ClientOpts = {
  host: 'my-redis', // Use the container name to access Redis on Docker
  port: 6379, // Redis default port
  // Add any additional Redis configurations here (e.g., password)
};

export const redisClient = createClient(redisOptions);
