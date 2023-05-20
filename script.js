// Define an empty array to store our inventory items
let inventory = [];

// Set up an event listener for when the form is submitted
$("form").submit(function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values from the form inputs
  let itemName = $("#namaBarang").val();
  let itemCode = $("#kodeBarang").val();
  let itemQuantity = parseInt($("#jumlahStok").val());
  let itemPrice = parseInt($("#hargaSatuan").val());

  // Check if we're editing an existing item or creating a new one
  let editIndex = $("form").data("edit-index");
  if (editIndex !== undefined) {
    // We're editing an existing item
    inventory[editIndex].name = itemName;
    inventory[editIndex].code = itemCode;
    inventory[editIndex].quantity = itemQuantity;
    inventory[editIndex].price = itemPrice;
    $("form").removeData("edit-index");
  } else {
    // We're creating a new item
    // Create a new object representing the inventory item
    let newItem = {
      name: itemName,
      code: itemCode,
      quantity: itemQuantity,
      price: itemPrice
    };
    inventory.push(newItem);
  }

  // Clear the form inputs and update the table displaying the inventory
  $("form")[0].reset();
  updateInventoryTable();
});

// Function to update the table displaying the inventory
function updateInventoryTable() {
  // Clear out the table body before repopulating it
  $("#barangTableBody").html("");

  // Loop through each inventory item and add a row to the table
  for (let i = 0; i < inventory.length; i++) {
    $("#barangTableBody").append(`
      <tr>
        <td>${i + 1}</td>
        <td>${inventory[i].name}</td>
        <td>${inventory[i].code}</td>
        <td>${inventory[i].quantity}</td>
        <td>Rp ${inventory[i].price.toLocaleString()}</td>
        <td>
          <button type="button" class="btn btn-primary btn-sm" onclick="editItem(${i})">Edit</button>
          <button type="button" class="btn btn-danger btn-sm" onclick="deleteItem(${i})">Hapus</button>
        </td>
      </tr>
    `);
  }
}

// Function to edit an item in the inventory array
function editItem(itemIndex) {
  // Set the form data to indicate that we're editing this item
  $("form").data("edit-index", itemIndex);

  // Populate the form inputs with the values from the item
  $("#namaBarang").val(inventory[itemIndex].name);
  $("#kodeBarang").val(inventory[itemIndex].code);
  $("#jumlahStok").val(inventory[itemIndex].quantity);
  $("#hargaSatuan").val(inventory[itemIndex].price);

  // Change the form submit button text to indicate that we're editing
  $("#submitButton").text("Simpan Perubahan");
}

// Function to delete an item from the inventory array
function deleteItem(itemIndex) {
  inventory.splice(itemIndex, 1);
  updateInventoryTable();
  $("form")[0].reset();
}