
var str = window.location.href;
console.log('>>>>> ' + str);
var url = new URL(str);
var id = url.searchParams.get("id");
console.log(' >>>>> ' + id);


fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    let elt = document.getElementsByClassName('item__img')[0];
    let att = document.createAttribute("id");
    att.value = "item__img";
    elt.setAttributeNode(att);
    let img = document.createElement('img');

    let titleProduct = document.getElementById('title');
    let title = document.createElement('h1');

    let priceProduct = document.getElementById('price');
    let price = document.createElement('span');

    let descriptionProduct = document.getElementById('description');
    let description = document.createElement('p');

    let colorsProduct = document.getElementById('colors');


    for (let p of value) {
      if (id == p._id) {

        img.src = p.imageUrl;
        img.alt = p.altTxt;
        elt.appendChild(img);

        title.textContent = p.name;
        titleProduct.appendChild(title);

        price.textContent = p.price;
        priceProduct.appendChild(price);

        description.textContent = p.description;
        descriptionProduct.appendChild(description);


        var array = p.colors;
        for (var i = 0; i < array.length; i++) {
          var option = document.createElement('option');
          option.value = array[i];
          option.text = array[i];
          colorsProduct.appendChild(option);

        }



      }

    }

    // Lorsqu'on appuie sur Ajouter au panier

    
    let add = document.getElementById('addToCart');
    
    add.addEventListener("click", function() {
     
      // récupération caractéristiques Produit
      let optionsProduit = {
        idProduit: id,
        qty: document.getElementById('quantity').value,
        couleurProduit: document.getElementById('colors').value,
        
      };

      
      //**************** LOCAL STORAGE **********************

      //Déclaration variable "produitsdanspanier" dans laquelle on mettra les Key et les valeurs qui sont dans le local storage
      // avec JSON.parse pour convertir les données en format JSON qui sont dans le local Storage en objet Javascript
      let produitsdanspanier = JSON.parse(localStorage.getItem("produit"));
      let articlePanier = JSON.parse(localStorage.getItem ("article"));
      // si il y a déjà des produits enregistré dans le local storage
      if (produitsdanspanier) {
        produitsdanspanier.push(optionsProduit);
      
      }
      // si rien d'enregistré dans le local storage
      else {
        produitsdanspanier = [];
        produitsdanspanier.push(optionsProduit);
        localStorage.setItem("article", JSON.stringify(produitsdanspanier));
        
        if (articlePanier !== null || articlePanier.length !==0){ 
        
          for(let pDP of articlePanier){
            produitsdanspanier.push(pDP);
  
          }
          
        localStorage.setItem("article", JSON.stringify(produitsdanspanier));
    
      }
      }

    });

  })

  .catch(function (err) {
    // Une erreur est survenue
  });

