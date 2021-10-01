import { SocialUser } from "angularx-social-login";

export interface AuthData {
    token: string;
    user: SocialUser;
}