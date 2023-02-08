import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler({ query }: NextApiRequest, res: NextApiResponse<any>) {
    console.log('Request: ', query);
    try {
        // Save the data to the collection
        const getRes = await fetch(`https://dummyjson.com/products?offset=0&limit=6`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => data.products);

        if (getRes.code) {
            throw new Error('An error occurred while fetching the data');
        }

        const formattedToQuests = getRes.map((quest: any) => {
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
        res.status(200).json(formattedToQuests);
    } catch (error) {
        // If the request fails, an error will be thrown
        console.error(error);

        // Send an error response back to the client
        res.status(500).json('An error occurred while fetching the data');
    }
}
