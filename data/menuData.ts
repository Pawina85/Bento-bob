export type CategoryId = 'bento' | 'sides' | 'drinks' | 'desserts';

export interface Category {
    id: CategoryId;
    name: string;
    icon: string;
}

export interface MenuItem {
    id: number;
    category: CategoryId;
    name: string;
    description: string;
    price: number;
    image: string;
}

export const categories: Category[] = [
    { id: 'bento', name: 'Bento Boxes', icon: '🍱' },
    { id: 'sides', name: 'Sides', icon: '🍙' },
    { id: 'drinks', name: 'Drinks', icon: '🥤' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
];

export const menuItems: MenuItem[] = [
    {
        id: 1,
        category: 'bento',
        name: 'Classic Chicken Bento',
        description: 'Grilled chicken, rice, pickled veggies, sesame dressing',
        price: 12.99,
        image: '/Image/chickenben.jpg',
    },
    {
        id: 2,
        category: 'bento',
        name: 'Teriyaki Salmon Bento',
        description: 'Glazed salmon, sticky rice, edamame, miso soup',
        price: 14.99,
        image: '/Image/salmonbento.jpg',
    },
    {
        id: 3,
        category: 'bento',
        name: 'Spicy Tofu Bento',
        description: 'Crispy tofu, brown rice, kimchi, spicy mayo',
        price: 11.99,
        image: '/Image/tofu.jpg',
    },
    {
        id: 4,
        category: 'bento',
        name: 'Beef Bulgogi Bento',
        description: 'Marinated beef, rice, cucumber salad, gochujang',
        price: 13.99,
        image: '/Image/Beefben.jpg',
    },
    {
        id: 5,
        category: 'sides',
        name: 'Gyoza',
        description: 'Pan-fried dumplings (5pcs)',
        price: 5.99,
        image: '/Image/Gyoza.jpg',
    },
    {
        id: 6,
        category: 'sides',
        name: 'Edamame',
        description: 'Steamed young soybeans with sea salt',
        price: 4.99,
        image: '/Image/Edamame.jpg',
    },
    {
        id: 7,
        category: 'sides',
        name: 'Miso Soup',
        description: 'Traditional Japanese soup with tofu',
        price: 3.99,
        image: '/Image/miso1.jpg',
    },
    {
        id: 8,
        category: 'drinks',
        name: 'Green Tea',
        description: 'Hot or iced',
        price: 2.49,
        image: '/Image/greentea.jpg',
    },
    {
        id: 9,
        category: 'drinks',
        name: 'Ramune Soda',
        description: 'Japanese marble soda',
        price: 3.49,
        image: '/Image/Ramune.jpg',
    },
    {
        id: 10,
        category: 'drinks',
        name: 'Iced Matcha Latte',
        description: 'Creamy matcha with oat milk',
        price: 4.99,
        image: '/Image/matcha.jpg',
    },
    {
        id: 11,
        category: 'desserts',
        name: 'Mochi Ice Cream',
        description: 'Assorted flavors (3pcs)',
        price: 5.99,
        image: '/Image/mochi.jpg',
    },
    {
        id: 12,
        category: 'desserts',
        name: 'Dorayaki',
        description: 'Red bean pancake sandwich',
        price: 4.49,
        image: '/Image/Dorayaki.jpg',
    },
    {
        id: 13,
        category: 'desserts',
        name: 'Matcha Cheesecake',
        description: 'Creamy Japanese-style cheesecake',
        price: 6.99,
        image: '/Image/matchacake.jpg',
    },
];