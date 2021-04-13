"use strict";

let orderitemNum, deltaQuantity, orderitemQuantity, deltaCost;
let productPrices = [];
let quantityArr = [];
let priceArr = [];

let totalForms;
let orderTotalQuantity;
let orderTotalCost;

let $orderTotalQuantityDOM;
let $orderTotalCost;
let $orderForm;


function parseOrderForm() {
    for (let i = 0; i < totalForms; i++) {
        let quantity = parseInt($('input[name="orderitems-' + i + '-quantity"]').val());
        let price = parseFloat($('.orderitems-' + i + '-price').text().replace(',', '.'));
        quantityArr[i] = quantity;
        if (price) {
            priceArr[i] = price;
        } else {
            priceArr[i] = 0;
        }
    }
}

function renderSummary(orderTotalQuantity, orderTotalCost) {
    $orderTotalQuantityDOM.html(orderTotalQuantity.toString());
    $orderTotalCost.html(Number(orderTotalCost.toFixed(2)).toString().replace('.', ','));
}

function orderSummaryRecalc() {
    orderTotalQuantity = 0;
    orderTotalCost = 0;
    for (let i = 0; i < totalForms; i++) {
        orderTotalQuantity += quantityArr[i];
        orderTotalCost += quantityArr[i] * priceArr[i];
    }
    renderSummary(orderTotalQuantity, orderTotalCost);
}

function orderSummaryUpdate(orderitemPrice, deltaQuantity) {
    deltaCost = orderitemPrice * deltaQuantity;

    orderTotalQuantity += deltaQuantity;
    orderTotalCost += deltaCost;
    renderSummary(orderTotalQuantity, orderTotalCost);
}

function deleteOrderItem(row) {
    let targetName = row[0].querySelector('input[type="number"]').name;
    orderitemNum = parseInt(targetName.replace('orderitems-', '').replace('-quantity', ''));
    deltaQuantity = -quantityArr[orderitemNum];
    orderSummaryUpdate(priceArr[orderitemNum], deltaQuantity);
}

window.onload = function () {

    totalForms = parseInt($('input[name="orderitems-TOTAL_FORMS"]').val());

    $orderTotalQuantityDOM = $('.order_total_quantity');
    orderTotalQuantity = parseInt($orderTotalQuantityDOM.text()) || 0;

    $orderTotalCost = $('.order_total_cost');
    orderTotalCost = parseFloat($orderTotalCost.text().replace(',', '.')) || 0;

    parseOrderForm();

    if (!orderTotalQuantity) {
        orderSummaryRecalc();
    }

    $orderForm = $('.order_form');
    $orderForm.on('change', 'input[type="number"]', function (event) {
        orderitemNum = parseInt(event.target.name.replace('orderitems-', '').replace('-quantity', ''));
        if (priceArr[orderitemNum]) {
            orderitemQuantity = parseInt(event.target.value);
            deltaQuantity = orderitemQuantity - quantityArr[orderitemNum];
            quantityArr[orderitemNum] = orderitemQuantity;
            orderSummaryUpdate(priceArr[orderitemNum], deltaQuantity);
        }
    });

    $orderForm.on('change', 'input[type="checkbox"]', function (event) {
        orderitemNum = parseInt(event.target.name.replace('orderitems-', '').replace('-DELETE', ''));
        if (event.target.checked) {
            deltaQuantity = -quantityArr[orderitemNum];
        } else {
            deltaQuantity = quantityArr[orderitemNum];
        }
        orderSummaryUpdate(priceArr[orderitemNum], deltaQuantity);
    });

    $orderForm.change(function (event) {
        let target = event.target;
        orderitemNum = parseInt(target.name.replace('orderitems-', '').replace('-product', ''));
        let orderitemProductpk = target.value
        console.log(orderitemProductpk)

        if (orderitemProductpk) {
            $.ajax({
                url: "/order/product/" + orderitemProductpk + "/price/",
                success: function (data) {
                    if (data.price) {
                        priceArr[orderitemNum] = parseFloat(data.price);
                        if (isNaN(quantityArr[orderitemNum])) {
                            quantityArr[orderitemNum] = 0;
                        }
                        let price_html = '<span>' + data.price.toString().replace('.', ',') + '</span> руб.';
                        let current_tr = $('.order_form table').find('tr:eq(' + (orderitemNum + 1) + ')');
                        current_tr.find('td:eq(2)').html(price_html);

                        if (isNaN(current_tr.find('input[type="number"]').val())) {
                            current_tr.find('input[type="number"]').val(0);
                        }
                        orderSummaryRecalc();
                    }
                    // console.log('ajax done');
                },
            });
        }
    });
}
