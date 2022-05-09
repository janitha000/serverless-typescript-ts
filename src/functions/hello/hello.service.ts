import { Logger } from '../../common/logger';

export const helloLog = (logger: Logger) => {
    logger.INFO({ message: 'This is from the hello function' })
}

export const hello2Log = (logger: Logger) => {
    logger.INFO({ message: 'This is from the hello2 function' })
}