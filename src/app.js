document.addEventListener('alpine:init', () => {
    Alpine.data('prodact', () => ({
        items: [
            { id: 1, name: "Long-black", img: '1.jpg', price: 11000 },
            { id: 2, name: "Capuchiono", img: '2.jpg', price: 13000 },
            { id: 3, name: "Mocca", img: '3.jpg', price: 15000 },
            { id: 4, name: "Coffe-Milk", img: '4.jpg', price: 20000 },
        ],

    }));

    

    Alpine.store('card', {
        item: [],
        total: 0,
        quantity: 0,
        add(newBarang) {
            //cek ada barang yag sama tidak di card
            const cardItem = this.item.find((item) => item.id === newBarang.id)

            //jika belum ada / card masih kosong
            if (!cardItem) {
                this.item.push({ ...newBarang, quantity: 1, total: newBarang.price });
                this.quantity++;
                this.total += newBarang.price;

            } else {
                //jika barang sudah ada, cek apakah barang beda atau sama dengan di card
                this.item = this.item.map((item) => {
                    //jika barang berbeda
                    if (item.id !== newBarang.id) {
                        return item;
                    } else {
                        //jika barang sudah ada, tambah quantiti dan totalnya
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                });
            }

        },
        remove(id) {
            //ambil item yang di remove id nya
            const cartItem = this.item.find((item) => item.id === id);

            //Jika item lebih dari 1
            if (cartItem.quantity > 1) {
                //telusuri 1 1
                this.item = this.item.map((item) => {
                    //jika bukan barang yang di clik
                    if (item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                })
            } else if (cartItem.quantity === 1) {
                //jika barangnya sisa 1
                this.item = this.item.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }

        }
    });

});






//Form Validation
const btnChekout = document.querySelector(".chekout-btn");
btnChekout.disable = true;
const form = document.getElementById('chekoutForm');

form.addEventListener("keyup", () => {
    for (let x = 0; x < form.elements.length; x++) {
        if (form.elements[x].length !== 0) {
            btnChekout.classList.remove('disable');
            btnChekout.classList.add('disable');
        } else {
                 return false;
            };
        };
          btnChekout.disable = false;
          btnChekout.classList.remove('disable');
    });


//kirim data ketika tombol di click
btnChekout.addEventListener('click', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    const massage = formatMassage(objData);
    window.open('http://wa.me/6282314345886?text=' + encodeURIComponent(massage))
});


//format pasan di wa
const formatMassage = (obj)=>{
   return `Data Customer
    nama : ${obj.name}
    email : ${obj.email}
    no hp : ${obj.phone}

Data Pesanan
${JSON.parse(obj.items).map((item)=>`${item.name}(${item.quantity} x ${rp(item.total)})\n`)}
   TOTAL : ${rp(obj.total)}
   Terima Kasih`;
};

//konversi rupiah

const rp = (num) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(num);
};