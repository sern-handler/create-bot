/**
 * This file serves as intellisense for sern projects.
 * Types are declared here for dependencies to function properly
 * Service(s) api rely on this file to provide a better developer experience.
 */

import { Logging, CoreDependencies, Singleton, Initializable } from '@sern/handler'
import { Client } from 'discord.js'
import { MongooseService } from './services/mongoose'
declare global {

   interface Dependencies extends CoreDependencies {
        '@sern/client': Singleton<Client>
        '@sern/logger': Singleton<Logging>
        'database' : MongooseService
   }

   //Augment your typings to provide intellisense for process.env
   // NOTE: in the future this will be automatically generated.
   namespace NodeJS {
       export interface ProcessEnv {
           DISCORD_TOKEN: string;
           MONGOOSE_URI: string;
           MODE: 'DEV'|'PROD';
           LOG_FILE: string;
        }
   }
}


export {}
