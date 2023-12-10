const fetchData = () => {
	fetch("https://striveschool-api.herokuapp.com/api/product/", {
		headers: {
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDc2ZjBkOGEyMDAwMThhNDhhNjAiLCJpYXQiOjE3MDIyMjAyMTQsImV4cCI6MTcwMzQyOTgxNH0.u5g4wC6r9LtjU8eyZgk3x6FAZR7l-JhLJOw14XeFsMk",
		},
	})
		.then((response) => {
			if (response.status === 404) throw new Error("Errore, risorsa non trovata");
			if (response.status >= 400 && response.status < 500) throw new Error("Errore lato Client");
			if (response.status >= 500 && response.status < 600) throw new Error("Errore lato Server");
			if (!response.ok) throw new Error("Errore");

			return response.json();
		})

		.then((products) => {
			const row = document.querySelector(".row");
			console.log(products);
			products.forEach((product) => {
				const divProduct = document.createElement("div");
				divProduct.classList.add("col-12", "col-md-6", "col-lg-3");
				const cardProd = document.createElement("div");
				cardProd.classList.add("card");
				const cardImg = document.createElement("img");
				cardImg.src = product.imageUrl;
				const cardBody = document.createElement("div");
				cardBody.classList.add("card-body");
				const h5 = document.createElement("h5");
				h5.innerText = product.name;
				const span = document.createElement("span");
				span.innerText = product.price + "€";
				const buttonDetail = document.createElement("a");
				buttonDetail.classList.add("btn", "btn-primary");
				buttonDetail.href = "./details.html?id=" + product._id;
				buttonDetail.innerText = "Scopri di Più";
				const buttonModify = document.createElement("a");
				buttonModify.classList.add("btn", "btn-warning");
				buttonModify.href = "./backoffice.html?id=" + product._id;
				buttonModify.innerText = "Modifica";
				cardBody.appendChild(h5);
				cardBody.appendChild(span);
				cardBody.appendChild(buttonDetail);
				cardBody.appendChild(buttonModify);
				cardProd.appendChild(cardImg);
				cardProd.appendChild(cardBody);
				divProduct.appendChild(cardProd);
				row.appendChild(divProduct);
			});
		})

		.catch((err) => {
			console.log("FATAL ERROR, OUR AGENTS ARE ON THEIR WAY TO GET YOU!", err);
		});
};

window.addEventListener("DOMContentLoaded", () => {
	fetchData();
});
