// const { response } = require("express");

console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

  $('#viewKoalas').on('click', '.transferButton', markKoalaAsReadyForTransfer);
  $('#viewKoalas').on('click', '.deleteButton', deleteKoala);
  $('#viewKoalas').on('click', '.dontTransferButton', dontTransferKoala);
}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    let newName = $('#nameIn').val();
    let newAge = $('#ageIn').val();
    let newGender = $('#genderIn').val();;
    let newReadyForTransfer = $('#readyForTransferIn').val();;
    let newNotes = $('#notesIn').val();;

    let koalaToSend = {
      name: newName,
      age: newAge,
      gender: newGender,
      readyForTransfer: newReadyForTransfer,
      notes: newNotes,
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );

  }); 
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas'
  }).then( (response) => {
    $('#viewKoalas').empty();
    for (let i = 0; i < response.length; i++) {
      //only give the transfer button to koalas who are not ready
      if (response[i].readyForTransfer === false) {
        $('#viewKoalas').append(`
          <tr>
            <td> ${response[i].name} </td>
            <td> ${response[i].age}  </td>
            <td> ${response[i].gender} </td>
            <td> ${response[i].readyForTransfer} </td>
            <td> ${response[i].notes} </td>
            <td><button data-id="${response[i].id}" class="transferButton">Ready for Transfer?</button></td> 
            <td><button data-id="${response[i].id}" class="deleteButton">Delete</button></td> 
            </tr>
          `)
      } else {
        $('#viewKoalas').append(`
          <tr>
            <td> ${response[i].name} </td>
            <td> ${response[i].age}  </td>
            <td> ${response[i].gender} </td>
            <td> ${response[i].readyForTransfer} </td>
            <td> ${response[i].notes} </td>
            <td><button data-id="${response[i].id}" class="dontTransferButton">Not Ready for Transfer?</button></td> 
            <td><button data-id="${response[i].id}" class="deleteButton">Delete</button></td> 
          </tr>
          `)
        }
      }
  }).catch( (error) => {
    console.log('Error in GET /koalas client side', error)
  });
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    method: 'POST',
    url: '/koalas',
    data: newKoala
  }).then( (response) => {
    getKoalas();
  }).catch( (error) => {
    console.log('Error in POST /koalas client side', error)
  })
}

//update koalas
//put request
function markKoalaAsReadyForTransfer() {
  console.log('koala is ready for transfer');
  let idToUpdate = $(this).data().id;
  console.log(idToUpdate);

  $.ajax({
    method: 'PUT',
    url: `/koalas/${idToUpdate}`,
    data: {
      readyForTransfer: true,
    },
  }).then((response) => {
      getKoalas();
    }).catch(function (error) {
      console.log("Error in PUT /koalas on client side", error);
    });
}

//delete koalas
function deleteKoala() {
  let idToDelete = $(this).data().id;
  console.log(idToDelete);

  $.ajax ({
    method: 'DELETE',
    url: `/koalas/${idToDelete}`
  }).then ((res) => {
    getKoalas();
  }).catch((error) => {
    console.log('error in DELETE /koalas on client side', error);
  })
}

//function to mark koalas as not ready for transfer
//using the same PUT route as earlier

