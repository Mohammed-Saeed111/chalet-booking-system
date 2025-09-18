import winston from 'winston';
const { combine, timestamp, printf, colorize, align } = winston.format;

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize({ all: true })
      )
    })
  ],
  // Don't exit on uncaught errors
  exitOnError: false
});

// Create a stream object with a write function that will be used by Morgan
logger.stream = {
  write: function(message) {
    // Remove the last newline
    logger.info(message.trim());
  }
};

export default logger;