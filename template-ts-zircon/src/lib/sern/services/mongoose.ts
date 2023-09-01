import mongoose, { Mongoose } from 'mongoose'
import type { Init, Logging } from '@sern/handler'
export class MongooseService implements Init {
    #mongoose!: Mongoose
    #warns!: typeof import('../warn-schema').warns;
    #users!: typeof import('../user-schema').users;
    constructor(private logger: Logging) {}

    async init() {
        try {
            this.#mongoose = await mongoose.connect(process.env.MONGOOSE_URI);
        } catch(e) {
            this.logger.error({ message: e })
            throw e;
        }
        //In the init function, we're dynamically importing schemas to keep our initializations tidy.
        // Also promotes code splitting and only loading whats necessary
        this.#warns = await import('../warn-schema').then(module => module.warns)
        this.#users = await import('../user-schema').then(module => module.users)
    }

    async addWarning(user_id: string) {
        try {
           return this.#warns.create({ user_id })
        } catch(e) {
            this.logger.error({ message: e })
            return null;
        }
    }
}
