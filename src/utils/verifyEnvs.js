
export const verifyEnvs = () => {
    if (!process.env.ENV) {
        throw new Error('ENV is not set');
    }

    if (!process.env.PORT) {
        throw new Error('PORT is not set');
    }

    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is not set');
    }

    if (!process.env.DATABASE_TYPE) {
        throw new Error('DATABASE_TYPE is not set');
    }
}