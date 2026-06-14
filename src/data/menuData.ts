import { MenuItem, Outlet } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'roc-bbq-roll',
    name: 'ROC Special BBQ Roll',
    description: 'Our signature whole-wheat wrap packed with charcoal-charred protein glazed in honey-gold house BBQ sauce, raw crunch onions, and secret grill spices.',
    price: 400,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmDMkRRrp0zbeRYCgAcMQOii0SraB5Ap8q8MMU9YrWUwu6xjnJ2nrOe0HdphZ3X2AApa1EVinFOGfnx5HMeX6Ns50pZswwj6KmY9r4yLEMvsncll6N7nJTQx0zawa3fqgFLjEvShHYxvB6xO26hZZIbKNh2fNw5ejtIkKX0J1VLdRuCiI-48ffKkMinCM_U0Kc94OA-tdJVJ4NUT2NbmiF4K0nDEsEAK2DiHE_DxlwGE-6yd9xN40ah-L4stMjKy4GNf5iGuS-DsU',
    category: 'rolls',
    type: 'nonveg',
    isBestseller: true,
    rating: 4.9,
    ratingCount: 1240,
    spiceLevel: 2
  },
  {
    id: 'volcano-sandwich',
    name: 'Volcano Sandwich',
    description: 'Double-decker toasted perfection with loaded molten cheddar overflowing, layered with spicy jalapeño cubes, flame-roasted bell peppers, and chipotle crema.',
    price: 450,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAy-NxQjaY9qPB3qkVY2KI9bYwZIt9Cd7Gvc6eSPiK0wmheKc5mZjp4XjWK8S7sVs9_hJZwznDwilm8WHM4L1uy1WCLulbC2dGEOt8lQ5rNiuA_SSvc45TpjhQVTVKugOze2g-8j5b9ijbBpCL-R0B4_NPQFQFOrr5V3945pCHM8uGfBrN6xI3tvW4Qo_yvPHFs6suM15ocDI5InhiE03v6GIyYJxEiXcrhEAJ92ak-yAx3BcC8QK_G5rtNNA02qqggIKpOyJ6iSds',
    category: 'sandwiches',
    type: 'veg',
    isBestseller: true,
    rating: 4.8,
    ratingCount: 980,
    spiceLevel: 3
  },
  {
    id: 'hazelnut-frappe',
    name: 'Hazelnut Frappe',
    description: 'A decadent blending of premium arabica slow roast espresso, earthy hazelnut syrup, chilled cream, capped with fluffy foam and golden caramel drizzle.',
    price: 400,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC24cAP59WoLpN8bajbHg5zNhnAKRlKSW1lBJy_p04ASLJOLiTqZLuerE5XpjOc0bRjU5KDz3Jr9OcPQxKh8YU5_ObnGAaH63R6aCzPS9koLSmg36qFW2KkQrmCFpQSNeIZehHP2YOGvz5hak3nwIcsdwnU4h4g6GQddvUJ-vayEbwMlfmqWUtO-_-zcfcIxdBAQjwSextWcmkUIFpUYp3-OP-cD1ajebtTDlpaWrFX-jxnigOhvFd7Ojje77uAbzVWKCVJc77WWx0',
    category: 'beverages',
    type: 'veg',
    isBestseller: true,
    rating: 4.7,
    ratingCount: 810,
    spiceLevel: 0
  },
  {
    id: 'bombay-chilli-rice',
    name: 'Bombay Chilli Rice',
    description: 'Aromatic basmati stir-fried over screaming hot wok with dynamic schezwan oil, sliced birds-eye chillies, tender crisp-fried spring greens, and hot smokey aromatics.',
    price: 400,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIUzj_Q7W1Od-4B6HcmTpLrACuEu6mx7Xv7g8AwKSnldrr8jbrbT-H2DPJurLgvREKq4tmCOnxUlrNojtGgr3DeNxv6CR-enH5BIJ4W0sfDknbG3Ajati4lM2FWyvUISpoQXPivHYifuyvyL6QcxsH22wtr7JylGMDMYkxq9ruZb1X05WTp9z1QoVl6ZgH13O_EDLHz-F77fwzS3CbmsQ6pFK-DcJQN-zVg39sXZaWzdRIgDdeb7tIKCKkwvDovNcx9Hu69VnPqlU',
    category: 'chinese',
    type: 'veg',
    isBestseller: true,
    rating: 4.8,
    ratingCount: 1150,
    spiceLevel: 3
  },
  {
    id: 'coalhouse-paneer-roll',
    name: 'Coal House Paneer Melt Roll',
    description: 'Chunks of juicy, hand-pressed cottage cheese flame-broiled directly on live embers, tossed with buttery peri-peri mayo and dynamic chatpata masala wrapped inside.',
    price: 240,
    category: 'rolls',
    type: 'veg',
    rating: 4.6,
    ratingCount: 420,
    spiceLevel: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9an8RDXXvKk-BpjOanZ7nw6xnizwfrrz97DbvOteBB-xi7nOTkmdQkWxz6RSN8fsuOLAXNgv2Nem8bjUoXXO_kXc81J_bRrOpM6-0mSLLrhyVbtCUHyhnv4dELpVpi6Bz8Mxw_DitIBNdi2YikrsIoHnt-mPbKJWo59uu5_yW2hJwqHHG8HRuZ7WdUksbzMYiW_Y9EdUzJPGkVGiui4GPc4HQbmvru6gTMvhyLZ61TnMN9hj2M4KtvHiBaD6wifSf7Z1J0R-FKGE' // Fallback to hero gourmet
  },
  {
    id: 'supreme-seekh-roll',
    name: 'Fiery BBQ Mutton Seekh Roll',
    description: 'Double skewered charcoal minced luxury mutton kebabs, sprinkled with cooling mint yogurt and a squeeze of lime on flaky lachha paratha.',
    price: 290,
    category: 'rolls',
    type: 'nonveg',
    rating: 4.9,
    ratingCount: 610,
    spiceLevel: 3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmDMkRRrp0zbeRYCgAcMQOii0SraB5Ap8q8MMU9YrWUwu6xjnJ2nrOe0HdphZ3X2AApa1EVinFOGfnx5HMeX6Ns50pZswwj6KmY9r4yLEMvsncll6N7nJTQx0zawa3fqgFLjEvShHYxvB6xO26hZZIbKNh2fNw5ejtIkKX0J1VLdRuCiI-48ffKkMinCM_U0Kc94OA-tdJVJ4NUT2NbmiF4K0nDEsEAK2DiHE_DxlwGE-6yd9xN40ah-L4stMjKy4GNf5iGuS-DsU'
  },
  {
    id: 'garlic-toast-supreme',
    name: 'Cheese Garlic Slab Toast',
    description: 'Thick hand-sliced rustic loaf sourdough baked on fiery embers with rich herbed garlic compound butter and mountains of mozzarella cheese.',
    price: 190,
    category: 'sandwiches',
    type: 'veg',
    rating: 4.5,
    ratingCount: 340,
    spiceLevel: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAy-NxQjaY9qPB3qkVY2KI9bYwZIt9Cd7Gvc6eSPiK0wmheKc5mZjp4XjWK8S7sVs9_hJZwznDwilm8WHM4L1uy1WCLulbC2dGEOt8lQ5rNiuA_SSvc45TpjhQVTVKugOze2g-8j5b9ijbBpCL-R0B4_NPQFQFOrr5V3945pCHM8uGfBrN6xI3tvW4Qo_yvPHFs6suM15ocDI5InhiE03v6GIyYJxEiXcrhEAJ92ak-yAx3BcC8QK_G5rtNNA02qqggIKpOyJ6iSds'
  },
  {
    id: 'smoky-bbq-pizza',
    name: 'Coal Glow Smoky BBQ Pizza',
    description: 'Thin, crispy hand-tossed crust fired at extreme heat. Features charred peppers, woodsmoke grilled paneer cubes, and a magnificent layer of molten cheese.',
    price: 360,
    category: 'pizzas-pastas',
    type: 'veg',
    rating: 4.8,
    ratingCount: 520,
    spiceLevel: 2,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIUzj_Q7W1Od-4B6HcmTpLrACuEu6mx7Xv7g8AwKSnldrr8jbrbT-H2DPJurLgvREKq4tmCOnxUlrNojtGgr3DeNxv6CR-enH5BIJ4W0sfDknbG3Ajati4lM2FWyvUISpoQXPivHYifuyvyL6QcxsH22wtr7JylGMDMYkxq9ruZb1X05WTp9z1QoVl6ZgH13O_EDLHz-F77fwzS3CbmsQ6pFK-DcJQN-zVg39sXZaWzdRIgDdeb7tIKCKkwvDovNcx9Hu69VnPqlU'
  },
  {
    id: 'charcoal-alfredo',
    name: 'Smoked Alfredo Charcoal Pasta',
    description: 'Rich and velvety slow-simmered heavy cream Alfredo sauce infused with genuine charcoal oakwood smoke, parmigiano cheese, and wild mushrooms.',
    price: 310,
    category: 'pizzas-pastas',
    type: 'veg',
    rating: 4.7,
    ratingCount: 290,
    spiceLevel: 0,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC24cAP59WoLpN8bajbHg5zNhnAKRlKSW1lBJy_p04ASLJOLiTqZLuerE5XpjOc0bRjU5KDz3Jr9OcPQxKh8YU5_ObnGAaH63R6aCzPS9koLSmg36qFW2KkQrmCFpQSNeIZehHP2YOGvz5hak3nwIcsdwnU4h4g6GQddvUJ-vayEbwMlfmqWUtO-_-zcfcIxdBAQjwSextWcmkUIFpUYp3-OP-cD1ajebtTDlpaWrFX-jxnigOhvFd7Ojje77uAbzVWKCVJc77WWx0'
  },
  {
    id: 'schezwan-wok-noodles',
    name: 'Wok Sizzle Schezwan Noodles',
    description: 'Lashings of fiery hot schezwan sauce loaded onto fine egg noodles, toss-flipped over intense coal flame for deep wok-hei fragrance.',
    price: 340,
    category: 'chinese',
    type: 'nonveg',
    rating: 4.8,
    ratingCount: 460,
    spiceLevel: 3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIUzj_Q7W1Od-4B6HcmTpLrACuEu6mx7Xv7g8AwKSnldrr8jbrbT-H2DPJurLgvREKq4tmCOnxUlrNojtGgr3DeNxv6CR-enH5BIJ4W0sfDknbG3Ajati4lM2FWyvUISpoQXPivHYifuyvyL6QcxsH22wtr7JylGMDMYkxq9ruZb1X05WTp9z1QoVl6ZgH13O_EDLHz-F77fwzS3CbmsQ6pFK-DcJQN-zVg39sXZaWzdRIgDdeb7tIKCKkwvDovNcx9Hu69VnPqlU'
  },
  {
    id: 'classic-cold-mojito',
    name: 'Embers Mint & Lime Glow',
    description: 'Chilled refreshing tonic muddled with aromatic fresh garden mint sprigs, lime wedges, and cold organic sugarcane syrup crystals.',
    price: 150,
    category: 'beverages',
    type: 'veg',
    rating: 4.6,
    ratingCount: 210,
    spiceLevel: 0,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC24cAP59WoLpN8bajbHg5zNhnAKRlKSW1lBJy_p04ASLJOLiTqZLuerE5XpjOc0bRjU5KDz3Jr9OcPQxKh8YU5_ObnGAaH63R6aCzPS9koLSmg36qFW2KkQrmCFpQSNeIZehHP2YOGvz5hak3nwIcsdwnU4h4g6GQddvUJ-vayEbwMlfmqWUtO-_-zcfcIxdBAQjwSextWcmkUIFpUYp3-OP-cD1ajebtTDlpaWrFX-jxnigOhvFd7Ojje77uAbzVWKCVJc77WWx0'
  }
];

export const OUTLETS: Outlet[] = [
  {
    id: 'vasai-east',
    name: 'Vasai East',
    address: 'Main Market Road, Near S.T. Depot & Station',
    landmark: 'Adjacent to Citizens Bank, Vasai East',
    mapsUrl: 'https://maps.google.com/maps?q=Vasai+East+Station+Market',
    phone: '+91 98234 56781',
    isMain: true,
    workingHours: '12:00 PM - 1:00 AM'
  },
  {
    id: 'agarwal-complex',
    name: 'Agarwal Complex',
    address: 'Shop No. 4, Ground Floor, Sector 3, Agarwal Complex',
    landmark: 'Opposite Sector 3 Public Park',
    mapsUrl: 'https://maps.google.com/maps?q=Agarwal+Complex+Sector+3',
    phone: '+91 98234 56782',
    workingHours: '12:00 PM - 11:30 PM'
  },
  {
    id: 'madhuban-township',
    name: 'Madhuban Township',
    address: 'Evershine City Road, Near Madhuban Central Park',
    landmark: 'Beside Royal Supermarket, Madhuban',
    mapsUrl: 'https://maps.google.com/maps?q=Evershine+City+Madhuban+Township',
    phone: '+91 98234 56783',
    workingHours: '11:00 AM - 12:00 AM'
  }
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Sumit Sharma',
    role: 'Local Food Critic',
    text: 'Nobody does charcoal grill in Vasai like ROC. The BBQ roll literally smells of hand-cooked wood embers. Top marks for premium clean packaging and friendly delivery staff!',
    stars: 5,
    date: '2 weeks ago'
  },
  {
    id: 't2',
    name: 'Aanya Patel',
    role: 'Regular Patron',
    text: 'My absolute comfort food is the Volcano Sandwich paired with the thick Hazelnut Frappe. It is extremely satisfying, affordable, and consistently delicious. Outlets are highly hygienic.',
    stars: 5,
    date: '1 month ago'
  },
  {
    id: 't3',
    name: 'Vikram Malhotra',
    role: 'Weekend Explorer',
    text: 'A brilliant dining ambiance and incredibly pocket-friendly. The Chilli Rice is fiery, well-seasoned, and has outstanding wok-hei. Recommend to everyone looking for real coal-grilled goodness!',
    stars: 5,
    date: 'Last-week'
  }
];
