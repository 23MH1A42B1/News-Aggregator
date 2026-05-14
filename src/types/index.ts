export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  urlToImage: string;
  url: string;
  publishedAt: string;
  author?: string;
  source: {
    id: string;
    name: string;
  };
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface PushSubscriptionJSON {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}
