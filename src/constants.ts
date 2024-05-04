export const COOKIE_SETTINGS = {
    REFRESH_TOKEN: {
        httpOnly: true,
        maxAge: 604800000, // 7 days
        secure: true, // w https
    },
}
export const ACCESS_TOKEN_EXPIRATION = 1800000 // 30 min
