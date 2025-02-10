export interface OpenLibraryBook {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year: number;
  ratings_average?: number;
  first_sentence?: string[];
}

export interface OpenLibraryResponse {
  docs: OpenLibraryBook[];
  numFound: number;
}
