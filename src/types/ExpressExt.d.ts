import { IUser, IChannel } from '@mockcord/structures';

declare global {
    namespace Express {
        export interface Request {
            user?: IUser;
            channel?: IChannel;
            requested_user?: IUser;
        }
    }
}