const socket = io();

var searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.has('escritorio'));

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var desk = searchParams.get('escritorio');
let label = $('small');

console.log('deskfront', desk)
$('h1').text('Escritorio ' + desk)

$('button').on('click', function() {
    socket.emit('attendTicket', { deskAssignedToTicket: desk }, function(response) {
        console.log('response',response)

        if (response === 'There are not more tickets') {
            label.text(response)
            alert(response);
            return;
        }
        label.text('Ticket ' + response.ticketNumber)
    })
})