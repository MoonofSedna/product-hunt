export interface ProductsInterface {
	id: string;
	comments: {
		created: number;
		userId: string;
		message: string;
		user: string;
	}[];
	createdAt: number;
	category: string;
	price: string;
	site: string;
	description: string;
	hasVoted: string[];
	imageUrl: string;
	name: string;
	creator: {
		id: string;
		name: string;
	};
	url: string;
	votes: number;
}
