export const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT || "https://gql.hashnode.com";
export const PUBLICATION_HOST = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST || "ayposts.hashnode.dev";

export interface TOCItem {
    id: string;
    level: number;
    slug: string;
    title: string;
    parentId?: string | null;
}

export interface HashnodePost {
    id: string;
    title: string;
    slug: string;
    brief: string;
    publishedAt: string;
    readTimeInMinutes: number;
    coverImage?: {
        url: string;
    };
    content?: {
        html: string;
    };
    features?: {
        tableOfContents?: {
            items: TOCItem[];
        }
    };
    tags?: {
        name: string;
    }[];
}

export interface PublicationInfo {
    id: string;
    title: string;
    about: {
        html: string;
    };
}

export async function fetchHashnodePosts(first: number = 10): Promise<{ publication: PublicationInfo | null, posts: HashnodePost[] }> {
    const query = `
        query GetPublicationPosts($host: String!, $first: Int!) {
            publication(host: $host) {
                id
                title
                about {
                    html
                }
                posts(first: $first) {
                    edges {
                        node {
                            id
                            title
                            slug
                            brief
                            publishedAt
                            readTimeInMinutes
                            coverImage {
                                url
                            }
                        }
                    }
                }
            }
        }
    `;

    const variables = { host: PUBLICATION_HOST, first };

    const response = await fetch(GQL_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(process.env.HASHNODE_TOKEN ? { 'Authorization': process.env.HASHNODE_TOKEN } : {})
        },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 3600 } // Cache for 1 hour
    });

    const result = await response.json();

    if (result.errors) {
        console.error('Hashnode GraphQL errors:', result.errors);
        throw new Error('Failed to fetch posts from Hashnode');
    }

    const publicationInfo: PublicationInfo | null = result.data?.publication ? {
        id: result.data.publication.id,
        title: result.data.publication.title,
        about: result.data.publication.about
    } : null;

    const posts = result.data?.publication?.posts?.edges?.map((edge: any) => edge.node) || [];

    return { publication: publicationInfo, posts };
}

export async function fetchHashnodePost(slug: string): Promise<HashnodePost | null> {
    const query = `
        query GetPost($host: String!, $slug: String!) {
            publication(host: $host) {
                post(slug: $slug) {
                    id
                    title
                    slug
                    brief
                    publishedAt
                    readTimeInMinutes
                    coverImage {
                        url
                    }
                    content {
                        html
                    }
                    features {
                        tableOfContents {
                            items {
                                id
                                level
                                slug
                                title
                                parentId
                            }
                        }
                    }
                    tags {
                        name
                    }
                }
            }
        }
    `;

    const variables = { host: PUBLICATION_HOST, slug };

    const response = await fetch(GQL_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(process.env.HASHNODE_TOKEN ? { 'Authorization': process.env.HASHNODE_TOKEN } : {})
        },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 3600 }
    });

    const result = await response.json();

    if (result.errors) {
        console.error('Hashnode GraphQL errors:', result.errors);
        throw new Error(`Failed to fetch post: ${slug} from Hashnode`);
    }

    return result.data?.publication?.post || null;
}

export async function fetchHashnodePostById(id: string): Promise<HashnodePost | null> {
    const query = `
        query GetPostById($id: ID!) {
            post(id: $id) {
                id
                title
                slug
                brief
                publishedAt
                readTimeInMinutes
                coverImage {
                    url
                }
                content {
                    html
                }
                features {
                    tableOfContents {
                        items {
                            id
                            level
                            slug
                            title
                            parentId
                        }
                    }
                }
                tags {
                    name
                }
            }
        }
    `;

    const variables = { id };

    const response = await fetch(GQL_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(process.env.HASHNODE_TOKEN ? { Authorization: process.env.HASHNODE_TOKEN } : {}),
        },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 3600 },
    });

    const result = await response.json();

    if (result.errors?.length) {
        const isNotFound = result.errors.some((error: { extensions?: { code?: string } }) => error.extensions?.code === "NOT_FOUND");
        if (isNotFound) {
            return null;
        }
        console.error("Hashnode GraphQL errors:", result.errors);
        throw new Error(`Failed to fetch post id: ${id} from Hashnode`);
    }

    return result.data?.post || null;
}
