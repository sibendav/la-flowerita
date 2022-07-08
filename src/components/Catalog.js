import React, { Component } from "react";
 
class Catalog extends Component {
  render() {
    return (
        <div>
<div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
    <h1 style="font-size: xxx-large; align-content: center">Flower Catalog</h1>
</div>
<div class="container px-4 px-lg-5 mt-5">
    <div id='myCatalog' class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"></div>
    <br/>
    <br/>
    <br/>
{/* <script type="text/javascript">
    $.ajax({
        url: 'db/products.json',
        dataType: 'json',
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var row = $(`<div class="col mb-5">
    <div class="card h-100">
        <img class="card-img-top" src="${data[i].image}" height="400" width="300"/>
        <div class="card-body p-4">
            <div class="text-center">
                <h5 class="fw-bolder">${data[i].name}</h5>
                <div class="d-flex justify-content-center small text-warning mb-2">
                    <div class="bi-star-fill"></div>
                    <div class="bi-star-fill"></div>
                    <div class="bi-star-fill"></div>
                    <div class="bi-star-fill"></div>
                    <div class="bi-star-fill"></div>
                </div>
                ${data[i].price}$
            </div>
        </div>
<!--        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">-->
<!--            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>-->
<!--        </div>-->
    </div>
</div>
                `);
                $("#myCatalog").append($(row).html());
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Error: ' + textStatus + ' - ' + errorThrown);
        }
    });
</script> */}
</div>
</div>
    );
  }
}
 
export default Catalog;