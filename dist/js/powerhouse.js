fetch('http://localhost:3000/total_orders')
.then(response => response.json())
.then(data => {
  // Display the total number of IDs
  document.getElementById('totalOrders').textContent = data.totalIds;

});

fetch('http://localhost:3000/last7days_total_oders')
.then(response => response.json())
.then(data => {
  // Display the total number of IDs
  document.getElementById('last_7days_order').textContent = data.totalIds;

});