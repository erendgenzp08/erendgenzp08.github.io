var app = new Vue({
    el: "#app", 
    data: {
     
        products: [
            {id: 1, title: "Редис 'Сора'", short_text: 'Ранньостиглий сорт, стійкий до стрілкування', image: 'radish_1.jpg', desc: "Чудовий всесезонний сорт редису, який не утворює пустот і довго зберігає товарний вигляд."},
            {id: 2, title: "Редис 'Французький сніданок'", short_text: 'Популярний сорт видовженої форми', image: 'radish_2.jpg', desc: "Ранній сорт з циліндричними яскраво-червоними коренеплодами з білим кінчиком. Має слабогострий, приємний смак."},
            {id: 3, title: "Редис '18 днів'", short_text: 'Ультраранній сорт', image: 'radish_3.jpg', desc: "Один з найшвидших сортів. М'якоть соковита, ніжна, має класичний пікантний смак."},
            {id: 4, title: "Редис 'Спекота'", short_text: 'Відмінно переносить посуху', image: 'radish_4.jpg', desc: "Ранньостиглий сорт, ідеальний для вирощування в жарких умовах, не схильний до в'янення."},
            {id: 5, title: "Редис 'Крижана бурулька'", short_text: 'Довгий білий коренеплід', image: 'radish_5.jpg', desc: "Оригінальний пізньостиглий сорт з довгими білими коренеплодами. Смак дуже ніжний та хрусткий."}
        ],
        product: {}, 
        btnVisible: 0,
        cart: [],
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
        orderSubmitted: false 
    },
    mounted: function() {
        this.getProduct(); 
        this.checkInCart(); 
        this.getCart(); 
    },
    methods: {
        getProduct: function() {
            if(window.location.hash) {
                var id = window.location.hash.replace('#', '');
                if(this.products && this.products.length > 0) {
                    for(let i in this.products) {
                        if(this.products[i] && this.products[i].id && id == this.products[i].id) {
                            this.product = this.products[i];
                        }
                    }
                }
            }
        },
        addToCart: function(id) {
            var localCart = [];
            if(window.localStorage.getItem('cart')) {
                localCart = window.localStorage.getItem('cart').split(',');
            }
            if(localCart.indexOf(String(id)) == -1) {
                localCart.push(id);
                window.localStorage.setItem('cart', localCart.join());
                this.btnVisible = 1;
                this.getCart(); 
            }
        },
        checkInCart: function() {
            if(this.product && this.product.id && window.localStorage.getItem('cart') && window.localStorage.getItem('cart').split(',').indexOf(String(this.product.id)) != -1) {
                this.btnVisible = 1;
            }
        },
        getCart: function() {
            this.cart = []; 
            if(window.localStorage.getItem('cart')) {
                var cartIds = window.localStorage.getItem('cart').split(',');
                for (var i = 0; i < cartIds.length; i++) {
                    for (var j = 0; j < this.products.length; j++) {
                        if (this.products[j].id == cartIds[i]) {
                            this.cart.push(this.products[j]);
                        }
                    }
                }
            }
        },
        removeFromCart: function(id) {
            if(window.localStorage.getItem('cart')) {
                var cartIds = window.localStorage.getItem('cart').split(',');
                var index = cartIds.indexOf(String(id));
                if (index > -1) {
                    cartIds.splice(index, 1);
                }
                
                if (cartIds.length > 0) {
                    window.localStorage.setItem('cart', cartIds.join(','));
                } else {
                    window.localStorage.removeItem('cart');
                }
            }
            this.getCart();
      
            if(this.product.id == id) {
                this.btnVisible = 0;
            }
        },
        makeOrder: function() {
            this.orderSubmitted = true;
            this.cart = [];
            window.localStorage.removeItem('cart');
          
            window.location.hash = '';
        }
    }
});
