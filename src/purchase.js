// calcul pour un achat la quantite avec laquelle le produit a ete achete
const getPurchaseProductQuantity = (purchase, product) => {
    let quantity = 0;
    for (let item of purchase.products) {
      //on s'appuie sur l'id pour reperer le produit, car l'id est unique
      if (item._id === product._id) {
        quantity++;
      }
    }
    return quantity;
  };
  
  // affiche le produit avec la quantite achete
  const displayPurchaseItem = (purchase, product) => {
    let block = document.createElement("div");
    let productCard = buildProductCard(product);
    let quantityBlock = document.createElement("div");
    quantityBlock.classList.add("purchaseQuantityBlock");
    quantityBlock.innerHTML =
      " x" + getPurchaseProductQuantity(purchase, product) + " ";
  
    block.appendChild(productCard);
    block.appendChild(quantityBlock);
    return block;
  };
  
  const displayPurchaseItems = (purchase) => {
    let itemsBlock = document.getElementById(purchase.orderId);
    let productsId = [];
    for (let product of purchase.products) {
      // si le produit n'a pas encore ete affiche dans l'achat, on l'affiche une seule fois et on le comptabilise comme
      // n'etant plus a afficher
      if (!productsId.find((element) => element === product._id)) {
        itemsBlock.appendChild(displayPurchaseItem(purchase, product));
      }
  
      productsId.push(product._id);
    }
  };
  
  // Calcul le montant d'un achat passe en argument
  const computePurchase = (purchase) => {
    let sum = 0;
    for (let product of purchase.products) {
      sum += product.price;
    }
  
    return sum;
  };
  
  // Affiche la confirmation de commande pour confirmer les differentes commandes que le client vient de passer ou
  // qu'il a deja passees auparavant
  const confirmPurchase = (purchase) => {
    let purchaseBlock = document.createElement("div");
    purchaseBlock.classList.add("purchaseBlock");
    purchaseBlock.style.width = "100%";
    purchaseBlock.style.marginBottom = "30px";
    let paragraph = document.createElement("p");
    paragraph.classList.add("recap");
    paragraph.innerHTML =
      "Thank you for trusting us <br> Amount paid: " +
      computePurchase(purchase) / 100 +
      "??? <br/>";
    paragraph.innerHTML += "Date : " + purchase.purchaseDate + "<br/>";
    paragraph.innerHTML += "Order id : " + purchase.orderId;
  
    purchaseBlock.appendChild(paragraph);
  
    let itemsBlock = document.createElement("div");
    itemsBlock.classList.add("purchaseItems");
    itemsBlock.setAttribute("id", purchase.orderId);
    itemsBlock.classList.add("container");
  
    purchaseBlock.appendChild(createTitle("Recap of what you bought"));
  
    purchaseBlock.appendChild(itemsBlock);
  
    return purchaseBlock;
  };
  
  const displayPurchase = (purchase) => {
    let purchaseBlock = confirmPurchase(purchase);
    return purchaseBlock;
  };
  
  const displayPurchases = () => {
    let purchasesBlock = document.getElementById("purchases");
    let purchasesArray = JSON.parse(localStorage.getItem("purchases"));
    // on verifie qu'il y a au moins un achat dans le localStorage
    if (purchasesArray != null && purchasesArray != undefined) {
      for (let purchase of purchasesArray) {
        let purchaseBlock = displayPurchase(purchase);
        purchasesBlock.appendChild(purchaseBlock);
        displayPurchaseItems(purchase);
        purchasesBlock.appendChild(document.createElement("hr"));
      }
    } else {
      //si aucun achat n'a ete effectue, il n'y a rien a afficher
      purchasesBlock.appendChild(createTitle("No purcharses in sight ! "));
    }
    updateCartBadge();
  };
  