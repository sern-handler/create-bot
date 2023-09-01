import { Client } from 'discord.js';
import { type Logging, Sern, Service, makeDependencies, single } from '@sern/handler';
import { config } from './config.js'
import { Logger } from './services/logger.js'
import { MongooseService } from './services/mongoose.js';

/**
 * Where all of your dependencies are composed.
 * '@sern/client' is your Discord Client.
 * View documentation for pluggable dependencies
 * Configure your dependency root to your liking.
 * It follows the npm package iti https://itijs.org/.
 * Use this function to access all of your dependencies.
 * This is used for external event modules as well
 */
 
export const initBot  = async () => { 

    await makeDependencies({
    	build: root => root
                //Adding a client to sern so we can start listening to events
                .add({ '@sern/client': single(() => new Client(config))})
                // We update the default logger provided with the pino logger  in @/services
                .upsert({ '@sern/logger': single<Logging>(() => new Logger())})
                // We create a service that manages our database. This injects the logger into the service
                // so we can log events and such
                .add(ctx => ({ 'database': new MongooseService(ctx['@sern/logger']) }))
    });
    
    // View docs for all options
    // We're fetching the options from the sern.config.json file
    Sern.init('file');
    await Service('@sern/client').login();
}

