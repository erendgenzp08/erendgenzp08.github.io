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
        btnVisible: 0
    },
    mounted: function() {
        this.getProduct(); 
        this.checkInCart(); 
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
            var cart = [];
            if(window.localStorage.getItem('cart')) {
                cart = window.localStorage.getItem('cart').split(',');
            }
            if(cart.indexOf(String(id)) == -1) {
                cart.push(id);
                window.localStorage.setItem('cart', cart.join());
                this.btnVisible = 1;
            }
        },
        checkInCart: function() {
            if(this.product && this.product.id && window.localStorage.getItem('cart') && window.localStorage.getItem('cart').split(',').indexOf(String(this.product.id)) != -1) {
                this.btnVisible = 1;
            }
        }
    }
});