import { NextApiRequest, NextApiResponse } from 'next';

const getSkip = ({ limit, page }: { limit: string; page: string }) =>
    Number.parseInt(limit) * (Number.parseInt(page) - 1);

const getPagination = ({ total, limit, skip }: any) => {
    const totalPages = Math.ceil(total / limit);
    const page = skip / limit + 1;

    return {
        total,
        limit,
        skip,
        nextPage: page + 1,
        previousPage: page - 1,
        hasNext: page < totalPages,
        hasPrevious: page > 1
    };
};

export default async function handler({ query }: NextApiRequest, response: NextApiResponse<any>) {
    const { page = '1', limit = '6' } = query;

    try {
        const { products, ...pagination }: { products: Array<Record<string, any>>; pagination: any } = await fetch(
            `https://dummyjson.com/products?skip=${getSkip({
                page: String(page),
                limit: String(limit)
            })}&limit=${limit}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(response => response.json())
            .catch(() => Error('An error occurred while fetching the data'));

        const formattedToQuests = products.map((quest: any) => {
            return {
                cover: quest.thumbnail,
                id: quest.id,
                title: quest.title,
                skillTree: quest.category.replace('-', ' '), // 'home-decoration' => 'home decoration'
                difficulty: Math.floor(quest.rating),
                skill: quest.brand,
                experience: quest.stock * 100,
                type: '-',
                gold: quest.price
            };
        });

        // Send a response back to the client
        response.status(200).json({ data: formattedToQuests, pagination: getPagination(pagination) });
    } catch (error) {
        // If the request fails, an error will be thrown
        console.error(error);

        // Send an error response back to the client
        response.status(500).json('An error occurred while fetching the data');
    }
}
