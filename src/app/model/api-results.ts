export class ApiResultBase {
    status: number;
    message: string;
    pagination: Pagination;
}

export class ApiResult<T> extends ApiResultBase {
    data: T
}
export class Pagination {
    page: number;
    limit: number;
    totalPages: number;
    totalItems: number;
}