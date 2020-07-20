declare module 'reallydangerous' {
    class HMACAlgorithm {
    }

    export interface Base64 {
        encode(data: string | Buffer): string;

        decode(payload: string | Buffer): string;

        decode(payload: string | Buffer, buffer: true): Buffer;

        decode(payload: string | Buffer, buffer: false): string;
    }

    export class Signer {
        public secret_key: Buffer;
        public sep: string;
        public salt: string;
        public key_derivation: 'concat' | 'django-concat' | 'hmac' | 'none';
        public digest_method: string;
        public algorithm: HMACAlgorithm;

        constructor(secret_key?: string | Buffer, salt?: string | Buffer, sep?: string, key_derivation?: 'concat' | 'django-concat' | 'hmac' | 'none', digest_method?: string, algorithm?: HMACAlgorithm);

        public derive_key(): string;

        public get_signature(value: string): string;

        public sign(value: string): string;

        public verify_signature(value: string, sig: string): boolean;

        public unsign(value: string): string;

        public validate(value: string): boolean;
    }

    export class TimestampSigner extends Signer {
        public set_epoch(epoch: number): void;

        public get_epoch(): number;

        public get_timestamp(): number;

        public timestamp_to_datetime(ts: number): Date;

        public unsign(value: string, max_age?: number, return_timestamp?: string): string;
    }
}