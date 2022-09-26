
export const verifyEnvs = () => {
    if (!process.env.ENV) {
        throw new Error('ENV is not set');
    }

    if (!process.env.PORT) {
        throw new Error('PORT is not set');
    }
}