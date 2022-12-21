
const keys = require("./keys");
const redis = require("redis");

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});

function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

const subscriber = redisClient.duplicate();
//subscriber.subscribe("insert");

subscriber.on("message", function (channel, message) {
     redisClient.hset("values", message, fib(parseInt(message)));
});

