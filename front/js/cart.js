fetch("http://localhost:3000/api/products")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {

        // récupération  de l'array dans le local storage

        let ArrayJSON = JSON.parse(localStorage.getItem("article"));
        // parcourir l'array

        let carts = document.getElementById('cart__items');
        var totalQty = 0;
        var totalprix = 0;

        for (let i of ArrayJSON) {
            
            for (let p of value) {
                let id = i.idProduit;
                if (id == p._id) {
                    console.log(i);
                    // article class="cart__item"
                    let article = document.createElement('article');
                    carts.appendChild(article);
                    let attr = document.createAttribute('class');
                    attr.value = 'cart__item';
                    article.setAttributeNode(attr);

                    //<div class="cart__item__img">
                    let cart__item__img = document.createElement('div');
                    article.appendChild(cart__item__img);
                    let attr_img = document.createAttribute('class');
                    attr_img.value = 'cart__item__img';
                    cart__item__img.setAttributeNode(attr_img);

                        let img = document.createElement('img');
                        img.src = p.imageUrl;
                        cart__item__img.appendChild(img);

                    //<div class="cart__item__content">
                    let cart__item__content = document.createElement('div');
                    article.appendChild(cart__item__content);
                    let attr_cartItemContent = document.createAttribute('class');
                    attr_cartItemContent.value = 'cart__item__content';
                    cart__item__content.setAttributeNode(attr_cartItemContent);

                    // description
                        let cart__item__content__description= document.createElement('div');
                        cart__item__content.appendChild(cart__item__content__description);
                        let attr_cartItemContentDescription = document.createAttribute('class');
                        attr_cartItemContentDescription.value = 'cart__item__content__description';
                        cart__item__content__description.setAttributeNode(attr_cartItemContentDescription);

                        //description : nom, couleur, prix
                            let nom_produit = document.createElement('h2');
                            nom_produit.textContent = p.name;
                            cart__item__content__description.appendChild(nom_produit);

                            let couleur_produit = document.createElement('p');
                            couleur_produit.textContent = i.couleurProduit;
                            cart__item__content__description.appendChild(couleur_produit);

                            let prix_produit = document.createElement('p');
                            prix_produit.textContent = p.price +'€';
                            cart__item__content__description.appendChild(prix_produit);
                        
                    // Paramètres
                        let cart__item__content__settings= document.createElement('div');
                        cart__item__content.appendChild(cart__item__content__settings);
                        let attr_cartItemContentSettings = document.createAttribute('class');
                        attr_cartItemContentSettings.value = 'cart__item__content__settings';
                        cart__item__content__settings.setAttributeNode(attr_cartItemContentSettings);

                        //Paramétrer Quantité
                            let qte_produit = document.createElement('div');
                            cart__item__content__settings.appendChild(qte_produit);
                            let attr_qteProduit = document.createAttribute('class');
                            attr_qteProduit.value = 'cart__item__content__settings__quantity';
                            qte_produit.setAttributeNode(attr_qteProduit);

                                // paragraphe
                                let quantite_produit = document.createElement('p');
                                quantite_produit.textContent = 'Qté : ';
                                qte_produit .appendChild(quantite_produit);

                                //input 
                                let itemQuantity = document.createElement('input');
                                qte_produit.appendChild(itemQuantity);
                                let attr_itemQuantity = document.createAttribute('class');
                                attr_itemQuantity.value = 'itemQuantity';
                                qte_produit.setAttributeNode(attr_itemQuantity);
                                itemQuantity.setAttribute("type", "number");
                                itemQuantity.setAttribute("min", "1");
                                itemQuantity.setAttribute("max", "100");
                                itemQuantity.setAttribute("value", i.qty);
                                itemQuantity.name= 'itemQuantity';
                               


                        //suppression articleSuppressionArticle
                            let SuppressionArticle = document.createElement('div');
                            cart__item__content__settings.appendChild(SuppressionArticle);
                            let attr_SuppressionArticle = document.createAttribute('class');
                            attr_SuppressionArticle .value = 'cart__item__content__settings__delete';
                            SuppressionArticle.setAttributeNode(attr_SuppressionArticle);


                                // 'Button Supprimer'
                                let deleteItem = document.createElement('p');
                                SuppressionArticle.appendChild(deleteItem);
                                let attr_deleteItem = document.createAttribute('class');
                                attr_deleteItem.value = 'deleteItem';
                                deleteItem.textContent = 'Supprimer ';
                                
                    // calcul Total prix

                totalprix += (parseInt(p.price)* parseInt(i.qty));

                }

            i_qty = parseInt(i.qty);  

            }
           // calcul total quantité
            totalQty += i_qty;


           
        }



        let totalQuantity = document.getElementById('totalQuantity');
        totalQuantity.textContent = totalQty;

        let totalPrice = document.getElementById('totalPrice');
        totalPrice.textContent  = totalprix;

         // modification quantité articles

         var selectqty = document.getElementsByClassName('itemQuantity'); 
// var prodModifie = selectqty.closest('div').parent().closest(div).closest(div).querySelector('h2').innerText;
         for (var i =0; i < selectqty.length; i++){
             var qty = selectqty[i];
             
             //qty.addEventListener('change', updateValue); 
             qty.onchange = function(e){

                console.log('Nouvelle quantité:' + e.target.value);
               // console.log('Nom du produit modifie: ' +prodModifie);
                //this.closest('article').firstChild.

             }
           

         }


    })
    .catch(function (err) {
        // Une erreur est survenue
    });
