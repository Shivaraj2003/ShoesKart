

        const cartSummaryData = JSON.parse(localStorage.getItem("cart")) || [];
        var listContainer = document.getElementById("cartSummary");

        listContainer.innerHTML = '';

        if (cartSummaryData.length === 0) {
            listContainer.innerHTML = `<h3 class="p-3 m-3 fw-bold fs-7 text-center">Not added any items to cart</h3>
<div class="text-center">
  <a href="index.html"><button type="button" class="btn btn-primary mb-3 fw-bold">Go to Home</button></a>
</div>        `;
        }
        else {
            let total = 0;
            let i;

            for ( i = 0; i < cartSummaryData.length; i++) {
                var listItem = document.createElement("li");
                listItem.className = "list-group-item d-flex justify-content-between lh-sm";

                var itemContent = `
            <div>
                <h6 class="my-0">${cartSummaryData[i].title}</h6>
            </div>
            <span class="text-muted">&#8377;${cartSummaryData[i].price}</span>
        `;
        total+=cartSummaryData[i].price;

                listItem.innerHTML = itemContent;
                listContainer.appendChild(listItem);
            }
             var totalItem = document.createElement("li");
    totalItem.className = "list-group-item d-flex justify-content-between";
    totalItem.innerHTML = `<span>Total </span><strong>&#8377;${total}</strong>`;
    listContainer.appendChild(totalItem);

    document.querySelector('.count').innerText = i;

        }

    