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

export enum DemoActionTypes {
    initDemo = '[Demo] Start',
    initDemoOk = '[Demo] Started',
    initDemoError = '[Demo] Error starting',
    exitDemo = 'exitDemo', //TODO Move
    exitDemoOk = 'exitDemoOk',
    exitDemoError = 'exitDemoError',
} 

export enum LocationsActionTypes {

}

export enum CurrentLocationActionTypes {
    addOrder = '[Current Location] Add order',
    addOrderOk = '[Current Location] Order added',
    addOrderError = '[Current Location] Adding order failed',
}