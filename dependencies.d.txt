/**
 * This file serves as intellisense for sern projects.
 * Types are declared here for dependencies to function properly
 * Service(s) api rely on this file to provide a better developer experience.
 */

import type { Logging, ErrorHandling, CoreDependencies, Singleton } from '@sern/handler'
import type { Client } from 'discord.js'

/**
 * Note: You usually would not need to modify this unless there is an urgent need to break the contracts provided.
 * You would need to modify this to add your custom Services, however.
 */
declare global {
   interface Dependencies extends CoreDependencies {
        '@sern/client': Singleton<Client>
   }
}


export {}
