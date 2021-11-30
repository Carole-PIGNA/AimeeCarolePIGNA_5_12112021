/************************** Requête Fetch : accès à l'API produits ******************************************************** */ 
fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json(); // on met le résultat dan sle format json
    }
  })
  .then(function(value) {
    let elt = document.getElementById('items');
    //  on parcourt les éléments de l'API pour récupérer les id, images, nom du produit et description
    for (let p of value){

        let block_product = document.createElement ('a');
        block_product.href = '../html/product.html?id='+p._id;
        block_product.id = p._id;
        elt.appendChild(block_product);

        let article = document.createElement('article');
        block_product.appendChild(article);

        let img = document.createElement('img');
        img.src = p.imageUrl;
        img.alt = p.altTxt;
        article.appendChild(img);

        let productName = document.createElement('h3');
        productName.textContent = p.name;
        article.appendChild(productName);

        let productDescription = document.createElement('p');
        productDescription.textContent = p.description;
        article.appendChild(productDescription);
        productDescription.title = p.description;


    }

    
  }) 
  .catch(function(err) {
    // Une erreur est survenue
  }); 
  

  