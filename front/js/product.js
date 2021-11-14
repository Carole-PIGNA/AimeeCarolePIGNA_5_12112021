
var str = window.location.href;
console.log ('>>>>> ' + str);
var url = new URL(str);
var id = url.searchParams.get("id");
console.log(' >>>>> '+ id);


fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
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
    

    for (let p of value){
        if (id == p._id){

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
            for (var i = 0; i < array.length; i++ ){
                var option = document.createElement('option');
                option.value = array[i];
                option.text = array[i];
                colorsProduct.appendChild(option);

            }



        }

    }


    let addToCart = document.getElementById('addToCart');
    addToCart.onclick = validation;

    function validation(){
        window.location.href='../html/cart.html';
    }
    

    
    
    })

    

    .catch(function(err) {
        // Une erreur est survenue
      }); 

    