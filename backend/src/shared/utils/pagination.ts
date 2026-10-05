export interface PaginationQuery {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export const getPagination = (query: PaginationQuery) => {
  const page = Math.max(1, parseInt(query.page || '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(query.limit || '20', 10)));
  const offset = (page - 1) * limit;
  const sortBy = query.sortBy || 'createdAt';
  const sortOrder = query.sortOrder === 'ASC' ? 'ASC' : 'DESC';

  return { page, limit, offset, sortBy, sortOrder };
};

export const addPaginationHeaders = (res: any, page: number, limit: number, total: number) => {
  const totalPages = Math.ceil(total / limit);
  res.set('X-Total-Count', total.toString());
  res.set('X-Page', page.toString());
  res.set('X-Limit', limit.toString());
  res.set('X-Total-Pages', totalPages.toString());
};