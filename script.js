const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");


 let cart = [];




//abrir o modal do carrinho
cartBtn.addEventListener("click", function () {
    updateCartModal();
    cartModal.style.display = "flex"


})


//fechar o modal do carrinho
cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none"
    }
})

closeModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none"
})


menu.addEventListener("click", function (event) {
    // console.log(event.target);
    let parentButton = event.target.closest(".add-to-cart-btn")
    if (parentButton) {
        const name = parentButton.getAttribute("data-name");    
        const price = parseFloat(parentButton.getAttribute("data-price")) 
        
      //adicionar no carrinho 
      addtoCart(name, price) 


    }
})


      //função para adicionar no carrinho
      function addtoCart(name, price) {
        const existingItem = cart.find(item => item.name === name)

        if (existingItem) {
           existingItem.quantity += 1;

        
        }else{

            cart.push({
            name,
            price,
            quantity: 1,
        })

        }

      

        updateCartModal()

      }

      //atualiza o carrinho

      function updateCartModal() {
        cartItemsContainer.innerHTML = "";
        let total = 0;


        cart.forEach(item => {
             const cartItemElement = document.createElement("div");
            cartItemElement.classList.add("flex", "mb-4", "justify-between", "flex-col");

             cartItemElement.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                <p class="font-bold">${item.name}</p>
                <p>Qtd: ${item.quantity}</p>
                <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>
        
           
           
                
             <button class="remove-from-cart-btn" data-name="${item.name}">
              remover 
             </button>
            
                
            
            </div>
             `
            total += item.price * item.quantity;

            cartItemsContainer.appendChild(cartItemElement)
      
        })

        cartTotal.textContent = total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        cartCounter.innerHTML = cart.length;



        }
    

        //funçao para remover item do carrinho
         

       cartItemsContainer.addEventListener ("click", function (event) {
        if (event.target.classList.contains("remove-from-cart-btn")) {
            const name = event.target.getAttribute("data-name");
           
            removeCartItem(name)
        }

       })

       function removeCartItem(name) {
        const index = cart.findIndex(item => item.name === name);

        if (index !== -1) {
            const item = cart[index];
            
            if (item.quantity > 1) {
                item.quantity -= 1;
                updateCartModal();
                return;
            } 
            cart.splice(index, 1);
            updateCartModal();
        
        }
       }

       addressInput.addEventListener("input", function () {
        let imputValue = addressInput.value;
       })

       checkoutBtn.addEventListener("click", function () {
        if (cart.length === 0) return;
        if (addressInput.value === "") {
            addressWarn.classList.remove("hidden")
            addressInput.classList.add("border-red-500")

       }
    })