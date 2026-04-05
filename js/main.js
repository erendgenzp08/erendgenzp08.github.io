new Vue({
    el: '#app',
    data: {
        products: [
            {
                id: 1,
                title: "Цибуля 'Параде'",
                short_text: "Ранньостиглий сорт, стійкий до пожовтіння пір'я",
                desc: "Високоврожайний сорт цибулі на перо. Не формує цибулину, швидко відростає після зрізання. Має приємний слабогострий смак.",
                image: "onion_parade.jpg" 
            },
            {
                id: 2,
                title: "Цибуля 'Байкал'",
                short_text: "Популярний сорт з потужним та соковитим стеблом",
                desc: "Формує міцні прямостоячі листки темно-зеленого кольору. Відрізняється високою стійкістю до хвороб.",
                image: "onion_baikal.jpg"
            },
            {
                id: 3,
                title: "Цибуля 'Легіонер'",
                short_text: "Ультраранній високоврожайний сорт",
                desc: "Ідеально підходить для швидкого отримання свіжої зелені. Листя ніжне, довго не грубішає.",
                image: "onion_legionnaire.jpg"
            },
            {
                id: 4,
                title: "Цибуля 'Вулкан'",
                short_text: "Відмінно переносить спеку та посушливі умови",
                desc: "Сорт адаптований до вирощування в умовах високих температур. Зберігає товарний вигляд даже при нестачі вологи.",
                image: "onion_volcano.jpg"
            },
            {
                id: 5,
                title: "Цибуля 'Кайгаро'",
                short_text: "Довге, пружне та вирівняне зелене стебло",
                desc: "Преміальний сорт для свіжого ринку. Листя має ідеальний товарний вигляд, легко транспортується та довго зберігає свіжість.",
                image: "onion_kaigaro.jpg"
            }
        ],
        cart: [],
        orderSubmitted: false,
        contactFields: {
            name: '',
            company: '',
            position: '',
            city: '',
            country: '',
            phone: '',
            email: '',
            role: 'seed producer',
            other_role: '',
            message: '',
            captcha: ''
        },
        productId: null
    },
    computed: {
        product() {
            if (this.productId) {
                return this.products.find(p => p.id === this.productId) || this.products[0];
            }
            return this.products[0];
        },
        btnVisible() {
            // Проверяем, есть ли товар в корзине
            return this.cart.some(item => item.id === this.product.id);
        }
    },
    // Эта функция срабатывает сразу при загрузке любой страницы
    mounted() {
        // Проверяем память браузера: есть ли там уже корзина?
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                this.cart = JSON.parse(savedCart); // Загружаем товары из памяти
            } catch(e) {
                localStorage.removeItem('cart');
            }
        }

        const getIdFromHash = () => {
            if (window.location.hash) {
                const id = parseInt(window.location.hash.replace('#', ''));
                if (!isNaN(id)) {
                    this.productId = id;
                }
            }
        };

        getIdFromHash();
        window.addEventListener('hashchange', getIdFromHash);
    },
    methods: {
        addToCart(id) {
            const item = this.products.find(p => p.id === id);
            if (item && !this.cart.some(p => p.id === id)) {
                this.cart.push(item);
                this.saveCart(); 
            }
        },
        removeFromCart(id) {
            this.cart = this.cart.filter(item => item.id !== id);
            this.saveCart();
        },
        saveCart() {
            
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        makeOrder() {
            const cleanCaptcha = this.contactFields.captcha.replace(/\s/g, '').toUpperCase();
            if (cleanCaptcha === '7CJ5') {
                this.orderSubmitted = true;
                this.cart = []; 
                this.saveCart(); 
            } else {
                alert('Invalid CAPTCHA code. Please try again.');
            }
        }
    }
});