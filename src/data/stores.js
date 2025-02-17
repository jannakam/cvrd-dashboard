import humanPancreasLogo from '/public/assets/logos/human-pancreas-logo.jpeg';
import backyardLogo from '/public/assets/logos/backyard-logo.png';

export const stores = [
  {
    id: 'h-and-m',
    name: 'H&M',
    category: 'Shopping',
    description: 'Fashion and quality clothing at the best price',
    logo: 'https://enixc.com/wp-content/uploads/2020/05/1-25.jpg',
    items: [
      {
        id: 1,
        name: 'Classic White T-Shirt',
        price: 3.5,
        category: 'Tops',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
        stock: 100,
      },
      {
        id: 2,
        name: 'Slim Fit Jeans',
        price: 12.5,
        category: 'Bottoms',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
        stock: 50,
      },
      {
        id: 3,
        name: 'Denim Jacket',
        price: 19.9,
        category: 'Outerwear',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
        stock: 25,
      },
      {
        id: 4,
        name: 'Summer Dress',
        price: 15.9,
        category: 'Dresses',
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500',
        stock: 40,
      },
      {
        id: 5,
        name: 'Wool Sweater',
        price: 14.9,
        category: 'Tops',
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500',
        stock: 35,
      },
      {
        id: 6,
        name: 'Formal Blazer',
        price: 24.9,
        category: 'Outerwear',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500',
        stock: 30,
      },
    ],
  },
  {
    id: 'xcite',
    name: 'X-cite by Alghanim Electronics',
    category: 'Electronics',
    description: "Kuwait's largest electronics retailer",
    logo: 'https://mir-s3-cdn-cf.behance.net/projects/max_808/3b07a9189523155.Y3JvcCw5NjAsNzUwLDAsMTA0.jpg',
    items: [
      {
        id: 1,
        name: 'Apple AirPods Pro',
        price: 89.9,
        category: 'Audio',
        image:
          'https://www.apple.com/newsroom/images/2024/09/apple-introduces-airpods-4/article/Apple-AirPods-4-with-case-240909_big.jpg.large.jpg',
        stock: 75,
      },
      {
        id: 2,
        name: 'Apple Watch Series 9',
        price: 149.9,
        category: 'Wearables',
        image: 'https://media.product.which.co.uk/prod/images/original/aeedbcb04e12-2apple-watch-series-9.jpg',
        stock: 30,
      },
      {
        id: 3,
        name: 'JBL Flip 6',
        price: 39.9,
        category: 'Audio',
        image:
          'https://bf1af2.a-cdn.akinoncloud.com/products/2024/09/06/43087/cccc77bb-42e3-40f2-a3a6-3d0b4732dc23_size3840_cropCenter.jpg',
        stock: 45,
      },
      {
        id: 4,
        name: 'Samsung Wireless Charger',
        price: 19.9,
        category: 'Accessories',
        image:
          'https://image-us.samsung.com/SamsungUS/home/mobile/mobile-accessories/pdp/ep-pg920ibugus/features/About+This+Product-both_121316.jpg?$feature-benefit-jpg$',
        stock: 60,
      },
      {
        id: 5,
        name: 'Razer DeathAdder V3',
        price: 34.9,
        category: 'Gaming',
        image: 'https://pckuwait.com/wp-content/uploads/2021/02/RZ01-03850100-R3M11111.jpg',
        stock: 40,
      },
      {
        id: 6,
        name: 'Razer BlackWidow V4',
        price: 69.9,
        category: 'Gaming',
        image:
          'https://cdn.teufelaudio.com/image/upload/v1/products/Razer/BlackWidow%20V4%20X/blackwidow-v4-x-04-cutout-1300x1300x72.jpg',
        stock: 25,
      },
    ],
  },
  {
    id: 'home-centre',
    name: 'Home Centre',
    category: 'Furniture',
    description: 'Complete home furnishing solutions',
    logo: 'https://cdn2.advanceinfotech.org/doha.directory/800x450/business/2106/untitled-1-1657273292.webp',
    items: [
      {
        id: 1,
        name: 'Decorative Vase',
        price: 12.9,
        category: 'Decorative',
        image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500',
        stock: 60,
      },
      {
        id: 2,
        name: 'Cushion Set',
        price: 9.9,
        category: 'Textiles',
        image: 'https://images-na.ssl-images-amazon.com/images/I/71dDPd3pRzL._UL500_.jpg',
        stock: 40,
      },
      {
        id: 3,
        name: 'Wall Art Canvas',
        price: 24.9,
        category: 'Wall Decor',
        image: 'https://images.unsplash.com/photo-1582045253062-f63cfbd45bcb?w=500',
        stock: 25,
      },
      {
        id: 4,
        name: 'Modern Table Lamp',
        price: 29.9,
        category: 'Lighting',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
        stock: 30,
      },
      {
        id: 5,
        name: 'Storage Basket Set',
        price: 14.9,
        category: 'Storage',
        image:
          'https://img-va.myshopline.com/image/store/1714728525071/l5455-1-6b258b5b-6015-45db-8fd9-148b1f3e4557.jpeg?w=1000&h=1000',
        stock: 45,
      },
      {
        id: 6,
        name: 'Decorative Mirror',
        price: 39.9,
        category: 'Wall Decor',
        image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=500',
        stock: 20,
      },
    ],
  },
  {
    id: 'decathlon',
    name: 'Decathlon',
    category: 'Shopping',
    description: 'Sports equipment and athletic wear for all',
    logo: 'https://contents.mediadecathlon.com/s1076164/k$0e8d905b9ca9be552feceb9116641e5a/1800x0/540pt540/1080xcr1080/default.jpg?format=auto',
    items: [
      {
        id: 1,
        name: 'Yoga Mat',
        price: 4.9,
        category: 'Yoga',
        image: 'https://www.powertrain.com.au/media/catalog/product/cache/664/90/y/m/ym-tpe-sc-gn-7.jpg',
        stock: 50,
      },
      {
        id: 2,
        name: 'Resistance Bands Set',
        price: 6.9,
        category: 'Training',
        image:
          'https://clenchfitness.com/cdn/shop/files/41-inch_All_Band_Photos_1080px_x_1080px_8_grande.png?v=1729701993',
        stock: 75,
      },
      {
        id: 3,
        name: 'Jump Rope',
        price: 2.9,
        category: 'Cardio',
        image: 'https://www.pro-tecathletics.com/wp-content/uploads/2022/04/Premium-Jump-Rope-product-only.jpg',
        stock: 100,
      },
      {
        id: 4,
        name: 'Dumbbells Set',
        price: 19.9,
        category: 'Weights',
        image: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=500',
        stock: 30,
      },
      {
        id: 5,
        name: 'Sports Water Bottle',
        price: 3.9,
        category: 'Accessories',
        image: 'https://m.media-amazon.com/images/I/31IltCnXwAL.jpg',
        stock: 80,
      },
      {
        id: 6,
        name: 'Gym Bag',
        price: 9.9,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
        stock: 40,
      },
    ],
  },
  {
    id: 'boots',
    name: 'Boots',
    category: 'Health',
    description: 'Your trusted beauty and wellness destination',
    logo: 'https://www.walgreensbootsalliance.com/sites/www/files/styles/biggest/public/2021-05/Boots%20UK%20logo.png?itok=kIwXNRt9',
    items: [
      {
        id: 1,
        name: 'The Ordinary Niacinamide',
        price: 6.9,
        category: 'Skincare',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500',
        stock: 45,
      },
      {
        id: 2,
        name: 'CeraVe Moisturizer',
        price: 8.9,
        category: 'Skincare',
        image: 'https://images.unsplash.com/photo-1556229162-5c63ed9c4efb?w=500',
        stock: 60,
      },
      {
        id: 3,
        name: 'Sheet Mask Set',
        price: 4.9,
        category: 'Skincare',
        image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500',
        stock: 70,
      },
      {
        id: 4,
        name: 'Real Techniques Brush Set',
        price: 14.9,
        category: 'Makeup',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500',
        stock: 35,
      },
      {
        id: 5,
        name: 'MAC Lipstick Set',
        price: 19.9,
        category: 'Makeup',
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500',
        stock: 50,
      },
      {
        id: 6,
        name: 'Olaplex Hair Care Set',
        price: 29.9,
        category: 'Hair Care',
        image: 'https://m.media-amazon.com/images/I/710CYkUe81L.jpg',
        stock: 30,
      },
    ],
  },
  {
    id: 'sultan-center',
    name: 'The Sultan Center',
    category: 'Groceries',
    description: "Kuwait's premier supermarket chain since 1981",
    logo: 'https://scontent.fkwi12-1.fna.fbcdn.net/v/t39.30808-6/335483235_995390298512704_96309591695359171_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=GZ8fxsYfdAcQ7kNvgH9UU1B&_nc_oc=AdgWYIWsnwilEGYmvRRS55_g7FgVUGjDiVnd_Y2iD2YoQJO7I0ghVGIb5z-vmHeP8qA&_nc_zt=23&_nc_ht=scontent.fkwi12-1.fna&_nc_gid=AjrqJ08fz_zg706MBeZKEi5&oh=00_AYCCdIhSgnRng-69eCb4PkTM7ytsTFjOx5xh5B9l_e8t6g&oe=67B1728F',
    items: [
      {
        id: 1,
        name: 'TSC Premium Arabic Coffee',
        price: 4.9,
        category: 'Beverages',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500',
        stock: 30,
      },
      {
        id: 2,
        name: 'TSC Extra Virgin Olive Oil',
        price: 6.9,
        category: 'Cooking',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500',
        stock: 25,
      },
      {
        id: 3,
        name: 'TSC Gold Tea Selection',
        price: 7.9,
        category: 'Beverages',
        image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=500',
        stock: 40,
      },
      {
        id: 4,
        name: 'Premium Ajwa Dates',
        price: 9.9,
        category: 'Dried Fruits',
        image: 'https://www.ahlandates.com/cdn/shop/products/100063.png?v=1680860447',
        stock: 50,
      },
      {
        id: 5,
        name: 'TSC Mixed Nuts Selection',
        price: 14.9,
        category: 'Snacks',
        image: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=500',
        stock: 60,
      },
      {
        id: 6,
        name: 'Sidr Honey',
        price: 12.9,
        category: 'Condiments',
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500',
        stock: 20,
      },
    ],
  },
  {
    id: 'human-pancreas',
    name: 'Human Pancreas',
    category: 'Food',
    description: 'Best cookies and baked goods in the world',
    logo: humanPancreasLogo,
    items: [
      {
        id: 1,
        name: 'Hot chocolate cookies',
        price: 2.5,
        category: 'Cookies',
        image:
          'https://cdn.discordapp.com/attachments/1298946926691225600/1335886742812622900/IMG_6340.jpg?ex=67a1ccfb&is=67a07b7b&hm=d4ed0d8d97d3a13dd0f37a4b200e7730360c658039fe4230e95ddc4d9279a571&',
        stock: 15,
      },
      {
        id: 2,
        name: 'Almond croissant cookies',
        price: 2.5,
        category: 'Cookies',
        image:
          'https://cdn.discordapp.com/attachments/1298946926691225600/1335886741143425055/IMG_7054_jpg.jpg?ex=67a1ccfa&is=67a07b7a&hm=ba58bc4513984e127362494c756d3bb40d06ee8832d90ffc5859939af79a6431&',
        stock: 15,
      },
      {
        id: 3,
        name: 'snickerdoodle protein pancakes',
        price: 3.5,
        category: 'Cookies',
        image:
          'https://d.rapidcdn.app/snapinsta?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LWF0bDMtMi5jZG5pbnN0YWdyYW0uY29tL3YvdDUxLjI5MzUwLTE1LzQ1OTM2ODU5OV8xMDIxOTQwNzk2MzkxNTE0XzU0OTg4MzEyMDMzOTQ3MDM5ODJfbi5qcGc_c3RwPWRzdC1qcGdfZTM1X3A2NDB4NjQwX3NoMC4wOF90dDYmZWZnPWV5SjJaVzVqYjJSbFgzUmhaeUk2SW1sdFlXZGxYM1Z5YkdkbGJpNHhORFF3ZURFNE1EQXVjMlJ5TG1ZeU9UTTFNQzVrWldaaGRXeDBYMmx0WVdkbEluMCZfbmNfaHQ9c2NvbnRlbnQtYXRsMy0yLmNkbmluc3RhZ3JhbS5jb20mX25jX2NhdD0xMDImX25jX29oYz1sbFg0VWp1cjRkOFE3a052Z0dkSjYxcyZfbmNfZ2lkPWNiMTJiMjM4ODVjMzRhMTZhMWUwMjQ5NzVkMzdlY2I2JmVkbT1BUHMxN0NVQkFBQUEmY2NiPTctNSZvaD0wMF9BWURnTGNybVhDdkgtYzh4dUdRN3Q0anVzdHJFX1VTQUtPdExHbEdXVFNGQmZRJm9lPTY3QTY2MTI1Jl9uY19zaWQ9MTBkMTNiIiwiZmlsZW5hbWUiOiJTbmFwaW5zdC5hcHBfdGh1bWJfNDU5MzY4NTk5XzEwMjE5NDA3OTYzOTE1MTRfNTQ5ODgzMTIwMzM5NDcwMzk4Ml9uLmpwZyJ9.A7FjYXQ_hRGzWilnUEj2w5eN6IODQkHegGO2gb_dsig',
        stock: 15,
      },
    ],
  },
  {
    id: 'backyard',
    name: 'Backyard',
    category: 'Restaurant',
    description: 'A cozy outdoor dining experience with delicious food',
    logo: backyardLogo,
    items: [
      {
        id: 1,
        name: 'Classic Burger',
        price: 8.9,
        category: 'Burgers',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
        stock: 50,
      },
      {
        id: 2,
        name: 'Grilled Chicken Salad',
        price: 7.5,
        category: 'Salads',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
        stock: 40,
      },
      {
        id: 3,
        name: 'BBQ Ribs',
        price: 15.9,
        category: 'BBQ',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500',
        stock: 30,
      },
      {
        id: 4,
        name: 'Seafood Pasta',
        price: 12.9,
        category: 'Pasta',
        image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500',
        stock: 35,
      },
      {
        id: 5,
        name: 'Garden Pizza',
        price: 10.9,
        category: 'Pizza',
        image: 'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?w=500',
        stock: 45,
      },
      {
        id: 6,
        name: 'Chocolate Lava Cake',
        price: 5.9,
        category: 'Desserts',
        image: 'https://images.unsplash.com/photo-1602351447937-745cb720612f?w=500',
        stock: 25,
      },
    ],
  },
];
