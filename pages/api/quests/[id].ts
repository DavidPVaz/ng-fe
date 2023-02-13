import { NextApiRequest, NextApiResponse } from 'next';
import { getRandomInRange } from '@/utils';

export default async function handler({ query }: NextApiRequest, res: NextApiResponse<any>) {
    try {
        // Fetch a product by id
        const questRes = await fetch(`https://dummyjson.com/products/${String(query.id)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

        if (questRes.code) {
            throw new Error('An error occurred while fetching the data');
        }

        const formattedToQuests = {
            id: questRes.id,
            skillTree: questRes.category.replace('-', ' '), // 'home-decoration' => 'home decoration'
            skill: questRes.brand,
            title: questRes.title,
            difficulty: getRandomInRange({ min: 1, max: 5 }),
            experience: questRes.stock * 100,
            gold: questRes.price,
            type: '-',
            cover: questRes.thumbnail,
            description: questRes.description
        };

        // Send a response back to the client
        res.status(200).json(formattedToQuests);
    } catch (error) {
        // If the request fails, an error will be thrown
        console.error(error);

        // Send an error response back to the client
        res.status(500).json('An error occurred while fetching the data');
    }
}
