import { AuthorSchema } from "@/entities/models";
import { BaseResponse } from "@/entities/types/response";
import { api } from "@/lib/network";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

interface GetAuthorsParams {
    user_id: string;
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}

type IAuthorSchema = z.infer<typeof AuthorSchema>;

export const useGetAllAuthorsByUserId = ({
    user_id,
    order = 'asc',
    page = 1,
    limit = 10,
}: GetAuthorsParams) => {
    return useQuery<BaseResponse<IAuthorSchema[]>>({
        queryKey: ['authorsByUserId'],
        queryFn: async () => {
            const { data } = await api.get<BaseResponse<IAuthorSchema[]>>('api/v1/authors', {
                params: {
                    user_id,
                    order,
                    page,
                    limit,
                },
            });
            return data;
        },
        // Optional: Add some default options
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 3,
    });
};

export const useGetAllAuthors = ({
    order = 'asc',
    page = 1,
    limit = 10,
}: Omit<GetAuthorsParams, 'user_id'>) => {
    return useQuery<BaseResponse<IAuthorSchema[]>>({
        queryKey: ['authors', {order, page, limit }],
        queryFn: async () => {
            const { data } = await api.get<BaseResponse<IAuthorSchema[]>>('api/v1/authors', {
                params: {
                    order,
                    page,
                    limit,
                },
            });
            return data;
        },
        // Optional: Add some default options
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 3,
    });
};

// export const useAuthorQuery = () => ({
//   getByUserId: (userId: string, page?: number, limit?: number) =>
//     useQuery({
//       queryKey: ["author", userId],
//       queryFn: async () => {
//         const authors = await .getAuthorsByUserId(userId, page, limit, order)
//         return authors;
//       },
//     }),

//   getAll: (page?: number, limit?: number) =>
//     useQuery({
//       queryKey: ["authors", page, limit],
//       queryFn: async () => {
//         const authors = await authorService.getAuthors(page, limit);
//         return authors;
//       },
//     }),
// });
