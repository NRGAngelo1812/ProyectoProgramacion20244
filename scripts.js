document.getElementById('check-availability').addEventListener('click', async function() {
    const checkInDate = document.getElementById('check-in-date').value;
    const checkOutDate = document.getElementById('check-out-date').value;
    const roomsContainer = document.getElementById('rooms-container');
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
            }

            roomsContainer.appendChild(roomElement);
        }
    } catch (error) {
        console.error('Error al verificar la disponibilidad:', error);
    }
});
