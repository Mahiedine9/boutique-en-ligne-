// Ferdjoukh Mahiedine

// ===  variables globales ===

// constantes
const MAX_QTY = 9;

//  tableau des produits à acheter
const cart = []
// total actuel des produits dans le panier
let total = 0;


// === initialisation au chargement de la page ===

/**
* Création du Magasin, mise à jour du total initial
* Mise en place du gestionnaire d'événements sur filter
*/
const init = function () {
	createShop();
	updateTotal();
	const filter = document.getElementById("filter");
	filter.addEventListener("keyup", filterDisplaidProducts);
}
window.addEventListener("load", init);



// ==================== fonctions utiles =======================

/**
* Crée et ajoute tous les éléments div.produit à l'élément div#boutique
* selon les objets présents dans la variable 'catalog'
*/
const createShop = function () {
	const shop = document.getElementById("boutique");
	for(let i = 0; i < catalog.length; i++) {
		shop.appendChild(createProduct(catalog[i], i));
	}
}

/**
* Crée un élément div.produit qui posséde un id de la forme "i-produit" où l'indice i
* est correpond au paramètre index
* @param {Object} product - le produit pour lequel l'élément est créé
* @param {number} index - l'indice (nombre entier) du produit dans le catalogue (utilisé pour l'id)
* @return {Element} une div.produit
*/
const createProduct = function (product, index) {
	// créer la div correpondant au produit
	const divProd = document.createElement("div");
	divProd.className = "produit";
	// fixe la valeur de l'id pour cette div
	divProd.id = index + "-product";
	// crée l'élément h4 dans cette div
	divProd.appendChild(createBlock("h4", product.name));

	// Ajoute une figure à la div.produit...
	// /!\ non fonctionnel tant que le code de createFigureBlock n'a pas été modifié /!\
	divProd.appendChild(createFigureBlock(product));

	// crée la div.description et l'ajoute à la div.produit
	divProd.appendChild(createBlock("div", product.description, "description"));
	// crée la div.prix et l'ajoute à la div.produit
	divProd.appendChild(createBlock("div", product.price, "prix"));
	// crée la div.controle et l'ajoute à la div.produit
	divProd.appendChild(createOrderControlBlock(index));
	return divProd;
}


/** Crée un nouvel élément avec son contenu et éventuellement une classe
 * @param {string} tag - le type de l'élément créé (example : "p")
 * @param {string} content - le contenu html de l'élément a créé  (example : "bla bla")
 * @param {string} [cssClass] - (optionnel) la valeur de l'attribut 'classe' de l'élément créé
 * @return {Element} élément créé
 */
const createBlock = function (tag, content, cssClass) {
	const element = document.createElement(tag);
	if (cssClass != undefined) {
		element.className =  cssClass;
	}
	element.innerHTML = content;
	return element;
}

/** Met à jour le montant total du panier en utilisant la variable globale total
 */
const updateTotal = function () {
	const montant = document.getElementById("montant");
	montant.textContent = total;
}

// ======================= fonctions à compléter =======================


/**
* Crée un élément div.controle pour un objet produit
* @param {number} index - indice du produit considéré
* @return {Element}
* TODO : AJOUTER les gestionnaires d'événements
*/
const createOrderControlBlock = function (index) {
	const control = document.createElement("div");
	control.className = "controle";

	// crée l'élément input permettant de saisir la quantité
	const input = document.createElement("input");
	input.id = index + "-qte";
	input.type = "number";
	input.step = "1";
	input.value = "0";
	input.min = "0";
	input.max = MAX_QTY.toString();

	// TODO :  Q5 mettre en place le gestionnaire d'événément pour input permettant de contrôler les valeurs saisies
	input.addEventListener("change", verifQuantity);

	control.appendChild(input);

	// Crée le bouton de commande
	const button = document.createElement("button");
	button.className = 'commander';
	button.id = index + "-order";
	control.appendChild(button);

	return control;
}
let recherche = function (indx) {
	let g = false;
	const ex = document.getElementsByClassName('achat');
	for (var i = 0; i < ex.length; i++) {
		if (indx == parseInt(ex[i].id)) {
			g = true;
		}
	}
	return g;
}

/**
* Crée un élément figure correspondant à un produit
* @param {Object} product -  le produit pour lequel la figure est créée
* @return {Element}
*/
const createFigureBlock = function (product) {
	// TODO : code incorrect : à modifier Q4
	const figure = document.createElement("figure");
	const img = document.createElement("img");
	img.src = product.image;
	img.alt = product.name;
	figure.appendChild(img);
	return figure;

}


/**
* Gére l'ajout au panier et le comportement des boutons "commander" et "quantité"
*/

const orderProduct = function () {
	const idx = parseInt(this.id);
	const qty = parseInt(document.getElementById(idx + "-qte").value);
	if (qty > 0) {
		addProductToCart(idx, qty); // ajoute un produit au panier
		// TODO gérer la remise à zéro de la quantité après la commande ainsi que le comportement du bouton panier
		document.getElementById(idx + "-qte").value = "0";
		document.getElementById(idx + "-order").style.opacity = "0.25";
		document.getElementById(idx + "-order").removeEventListener("click", orderProduct);

	}
}

// ======================= fonctions à coder =======================

/**
* Contrôle les valeurs de la saisie
*/
const verifQuantity = function () {
	// TODO
	const boutonOrder = document.getElementById(parseInt(this.id) + "-order");

	if (this.value < 0 || this.value > MAX_QTY) {
		this.value = 0;
	}
	if (this.value == 0) {
		boutonOrder.style.opacity = "0.25";
		boutonOrder.removeEventListener("click", orderProduct);
	} else {
		boutonOrder.style.opacity = "1";
		boutonOrder.addEventListener("click", orderProduct);
	}

}



/**
* Ajoute un produit à la carte
* @param {number} index - indice du produit séléctionné
* @param {number} qty - quantité séléctionnée
*/


/**
 * Supprime le produit
 */
const supprimer = function() {
	let addi= parseInt(this.id) + "-achat";
	let idd=parseInt(this.id) +"-achat";
	document.querySelector(".achats").removeChild(document.getElementById(idd));
}


const addProductToCart = function (index, qty) {
	const pan = document.getElementsByTagName("button");
	let prix = document.getElementsByClassName('prix');
	let addi = parseInt(prix[index].innerHTML);
	let remise = document.getElementById(index + "-qte");
	if (recherche(index) == false) {
		const boutton = document.querySelectorAll("div.controle button");
		const product = catalog[index];
		const achats = document.getElementsByClassName("achats");
		const achat = document.createElement("div");
		achat.className = "achat";
		achat.id = index + "-achat";
		achats[0].appendChild(achat);
		achat.appendChild(createFigureBlock(product));
		achat.appendChild(createBlock("h4", product.description));

   achat.appendChild(createBlock("div", qty, "quantite"));
   achat.appendChild(createBlock("div", product.price, "prix"));
   const control = document.createElement("div");
   control.className = "controle";
   const button = document.createElement("button");
   button.id = "0-remove";
   button.className = "retirer";
   achat.appendChild(control);
	 control.appendChild(button);
   remise.value = 0;
   pan[index].style.opacity = "0.25";
 }
 else {
	 let acha = document.getElementsByClassName('quantite');
	 let qttelmtdern = parseInt(acha[index].innerHTML);
   let add = qty + qttelmtdern;
   acha[index].innerHTML = add;
   remise.value = 0;
   pan[index].style.opacity = "0.25";
}
total = (total + addi) * qty;
updateTotal();
let bouton1 = document.querySelectorAll('div.controle button.retirer');
bouton1[index].addEventListener('click', supprimer);
}



/**
* Gère le filtre d'affichage des produits dans la boutique
*/
const filterDisplaidProducts = function () {
	for (const produit of document.querySelectorAll("div#boutique div.produit")) {
		if (produit.querySelector("h4").innerText.toLowerCase().indexOf(document.getElementById("filter").value.toLowerCase()) == -1){
			produit.style.display = "none";
		} else {
			produit.style.display = "";
		}
	}
}
