document.getElementById('check-availability').addEventListener('click', async function() {
    const checkInDate = document.getElementById('check-in-date').value;
    const checkOutDate = document.getElementById('check-out-date').value;
    const roomsContainer = document.getElementById('rooms-container');
    const guestFormContainer = document.getElementById('guest-form-container');
    const guestForm = document.getElementById('guest-form');
    const selectedRoomElement = document.getElementById('selected-room');
    roomsContainer.innerHTML = ''; // Limpiar las habitaciones anteriores

    if (!checkInDate || !checkOutDate) {
        alert('Por favor, seleccione las fechas de ingreso y salida.');
        return;
    }

    try {
        const response = await fetch(`/check-availability?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`);
        const data = await response.json();

        // Crear 20 habitaciones
        for (let i = 1; i <= 20; i++) {
            const roomElement = document.createElement('div');
            roomElement.classList.add('room');
            roomElement.textContent = `Habitación ${i}`;

            // Buscar si la habitación está ocupada y obtener las fechas si es así
            const roomData = data.occupiedRooms.find(room => room.numero_habitacion === i);

            if (roomData) {
                roomElement.classList.add('occupied');
                const checkInDate = new Date(roomData.fecha_check_in).toLocaleDateString();
                const checkOutDate = new Date(roomData.fecha_check_out).toLocaleDateString();
                roomElement.innerHTML += `<br>Check-in: ${checkInDate}<br>Check-out: ${checkOutDate}`;
            } else {
                roomElement.classList.add('available');
                roomElement.addEventListener('click', () => {
                    selectedRoomElement.textContent = i;
                    guestFormContainer.style.display = 'block';
                });
            }

            roomsContainer.appendChild(roomElement);
        }
    } catch (error) {
        console.error('Error al verificar la disponibilidad:', error);
    }

    // Manejar el envío del formulario de reserva
    guestForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const guestName = document.getElementById('guest-name').value;
        const roomNumber = selectedRoomElement.textContent;

        try {
            const response = await fetch('/reservar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ guestName, roomNumber, checkInDate, checkOutDate })
            });

            if (response.ok) {
                alert('Reserva realizada con éxito');
                guestFormContainer.style.display = 'none';
                guestForm.reset();
            } else {
                alert('Error al realizar la reserva');
            }
        } catch (error) {
            console.error('Error al enviar la reserva:', error);
        }
    });

    // Cerrar el formulario cuando se hace clic en la "X"
    document.querySelector('.close').onclick = () => {
        guestFormContainer.style.display = 'none';
    };
});
