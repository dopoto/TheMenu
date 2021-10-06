// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { IServerConfiguration } from '../../models/server-configuration';
// import { environment } from 'src/environments/environment';
// import { IConfiguration } from '../../models/configuration';

// @Injectable()
// export class ConfigurationService {
//     public configuration: IConfiguration;

//     constructor(private http: HttpClient) {
//         this.configuration = {
//             ...environment,
//             serverConfiguration: <IServerConfiguration>{},
//         };
//     }

//     loadConfig() {
//         return this.http
//             .get<IServerConfiguration>('/configuration/environment-specific')
//             .toPromise()
//             .then(
//                 (result) => {
//                     this.configuration.serverConfiguration = result;
//                 },
//                 (error) => console.error(error)
//             );
//     }
// }
