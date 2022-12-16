// const { response } = require("express");

console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

  $('#viewKoalas').on('click', '.transferButton', markKoalaAsReadyForTransfer);

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
            <td> ${response[i].ready_to_transfer} </td>
            <td> ${response[i].notes} </td>
            <td><button data-id="${response[i].id}" class="transferButton">Ready for Transfer</button></td> 
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
            <td></td>
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

function markKoalaAsReadyForTransfer() {
  console.log('koala is ready for transfer');
  let koalaId = $(this).parent().data("id");
  console.log(koalaId);
  
  // $.ajax({
  //   method: "PUT",
  //   url: `/koalas/${koalaId}`,
  //   data: {
  //     readyForTransfer: true,
  //   },
  // }).then((response) => {
  //     getKoalas();
  //   }).catch(function (error) {
  //     console.log("Error in PUT /koalas on client side", error);
  //   });
}


