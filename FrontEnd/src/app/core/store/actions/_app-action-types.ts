export enum HydrateActionTypes {
    hydrateStart = 'hydrateStart',
    hydrateOk = 'hydrateOk',
    hydrateError = 'hydrateError',
    hydrateManagerDemoStart = 'hydrateManagerDemoStart',
    hydrateManagerDemoOk = 'hydrateManagerDemoOk',
    hydrateManagerDemoError = 'hydrateManagerDemoError',
}

export enum AuthActionTypes {
    loginStart = 'loginStart',
    loginOk = '[Auth] Login Success',
    loginFail = '[Auth] Login Fail',
    loginError = '[Auth] Login Error',
    logoutStart = '[Auth] Logout Started',
    logoutOk = '[Auth] Logout Success',
    logoutError = '[Auth] Logout Failure',
} 