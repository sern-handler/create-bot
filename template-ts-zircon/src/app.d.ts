// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { Logging, CoreDependencies, Singleton, Initializable } from '@sern/handler'
import { Client } from 'discord.js'
import { MongooseService } from './services/mongoose'

declare global {
    /**
      * This file serves as intellisense for sern projects.
      * Types are declared here for dependencies to function properly
      * Service(s) api rely on this file to provide a better developer experience.
     */

    interface Dependencies extends CoreDependencies {
        '@sern/client': Singleton<Client>
        '@sern/logger': Singleton<Logging>
        'database' : MongooseService
    }

    namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
    }
}

export {};
