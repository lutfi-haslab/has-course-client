import { getSupabaseClient, withSentrySpan } from "@/utils/withSentry";
import {
  AuthorRepository,
  AuthorRepositoryImpl,
  AuthorDTO,
} from "../repositories/authorRepositoryImpl";

export class AuthorService {
  private constructor(private repository: AuthorRepository) {}

  static async create(): Promise<AuthorService> {
    const client = await getSupabaseClient();
    return new AuthorService(new AuthorRepositoryImpl(client));
  }

  getAuthorsByUserId(userId: string, page?: number, limit?: number, order?: string) {
    return withSentrySpan("AuthorService > getAuthorsByUserId", () =>
      this.repository.getAuthorsByUserId(userId, page, limit, order)
    );
  }

  getAuthor(id: string) {
    return withSentrySpan("AuthorService > getAuthor", () =>
      this.repository.getAuthor(id)
    );
  }

  getAuthors(page?: number, limit?: number) {
    return withSentrySpan("AuthorService > getAuthors", () =>
      this.repository.getAuthors(page, limit)
    );
  }

  createAuthor(data: AuthorDTO) {
    return withSentrySpan("AuthorService > createAuthor", () =>
      this.repository.createAuthor(data)
    );
  }

  updateAuthor(id: string, data: Partial<AuthorDTO>) {
    return withSentrySpan("AuthorService > updateAuthor", () =>
      this.repository.updateAuthor(id, data)
    );
  }
}
