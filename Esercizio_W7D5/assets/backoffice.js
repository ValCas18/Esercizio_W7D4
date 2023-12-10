const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const url = id
	? "https://striveschool-api.herokuapp.com/api/product/" + id
	: "https://striveschool-api.herokuapp.com/api/product/";

const method = id ? "put" : "post";

window.addEventListener("DOMContentLoaded", () => {
	const btnSubmit = document.querySelector("button[type='submit']");
	const btnDelete = document.querySelector("button.btn-danger");
	const subtitle = document.querySelector("h3");

	if (id) {
		subtitle.innerText = "Modifica Prodotto";
		btnSubmit.innerText = "Modifica Prodotto";
		btnDelete.classList.remove("d-none");

		fetch(url, {
			headers: {
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDc2ZjBkOGEyMDAwMThhNDhhNjAiLCJpYXQiOjE3MDIyMjAyMTQsImV4cCI6MTcwMzQyOTgxNH0.u5g4wC6r9LtjU8eyZgk3x6FAZR7l-JhLJOw14XeFsMk",
			},
		})
			.then((response) => response.json())
			.then((product) => {
				document.getElementById("name").value = product.name;
				document.getElementById("brand").value = product.brand;
				document.getElementById("description").value = product.description;
				document.getElementById("price").value = product.price;
				document.getElementById("url").value = product.imageUrl;
			});
	} else {
		subtitle.innerText = "Aggiungi Prodotto";
	}
});

const handleSubmit = (event) => {
	event.preventDefault();

	const newProduct = {
		name: document.getElementById("name").value,
		brand: document.getElementById("brand").value,
		description: document.getElementById("description").value,
		price: document.getElementById("price").value,
		imageUrl: document.getElementById("url").value,
	};

	fetch(url, {
		method: method,
		body: JSON.stringify(newProduct),
		headers: {
			"Content-Type": "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDc2ZjBkOGEyMDAwMThhNDhhNjAiLCJpYXQiOjE3MDIyMjAyMTQsImV4cCI6MTcwMzQyOTgxNH0.u5g4wC6r9LtjU8eyZgk3x6FAZR7l-JhLJOw14XeFsMk",
		},
	})
		.then((response) => response.json())
		.then((createdProduct) => {
			if (id) {
				alert("Prodotto con id: " + createdProduct._id + " modificato");
			} else {
				alert("Prodotto con id: " + createdProduct._id + " creato");
			}
		});
};

const handleDelete = () => {
	fetch(url, {
		method: "delete",
		headers: {
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDc2ZjBkOGEyMDAwMThhNDhhNjAiLCJpYXQiOjE3MDIyMjAyMTQsImV4cCI6MTcwMzQyOTgxNH0.u5g4wC6r9LtjU8eyZgk3x6FAZR7l-JhLJOw14XeFsMk",
		},
	})
		.then((response) => response.json())
		.then((deletedProduct) => {
			alert("Hai eliminato il prodotto con nome " + deletedProduct.name);
			setTimeout(() => {
				window.location.assign("./index.html");
			}, 4000);
		});
};

const resetForm = () => {
	const form = document.querySelector("form");
	form.reset();
};
