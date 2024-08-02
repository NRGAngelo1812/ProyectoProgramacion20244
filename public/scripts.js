// Desplazarse a la sección de reservas
function scrollToReservation() {
    const reservationSection = document.getElementById('reservations');
    reservationSection.scrollIntoView({ behavior: 'smooth' });
}

// Manejar el envío del formulario
document.getElementById('reservation-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const guestName = document.getElementById('guestName').value;
    const roomNumber = document.getElementById('roomNumber').value;
    const checkInDate = document.getElementById('checkInDate').value;
    const checkOutDate = document.getElementById('checkOutDate').value;

    try {
        const response = await fetch('/reservas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombreHuesped: guestName, numeroHabitacion: roomNumber, fechaCheckIn: checkInDate, fechaCheckOut: checkOutDate })
        });
        
        if (response.ok) {
            alert('Reserva realizada con éxito');
            document.getElementById('reservation-form').reset();
        } else {
            alert('Error al realizar la reserva');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});