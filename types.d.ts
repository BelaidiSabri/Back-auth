// types.d.ts
import { Request } from 'express';

interface Pagination {
    skip: number;
    limit: number;
}

declare module 'express-serve-static-core' {
    interface Request {
        pagination?: Pagination;
    }
}
