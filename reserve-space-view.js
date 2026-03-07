let reserveSpaceData = window.RESERVE_SPACE_DATA || {};
let selectedEvent = '';
let selectedEventName = '';
let selectedSpace = '';
let selectedSpaceName = '';

(async function initReserveSpace() {
    if (!reserveSpaceData.events) {
        try {
            const response = await fetch('reserve-space-data.json', { cache: 'no-store' });
            if (response.ok) {
                reserveSpaceData = await response.json();
            }
        } catch (error) {
            console.error('Error al cargar reserve-space-data:', error);
        }
    }

    renderEvents();
    renderSpaces();

    const reserveForm = document.getElementById('reserveForm');
    if (reserveForm) {
        reserveForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const eventData = (reserveSpaceData.events || []).find((item) => item.id === selectedEvent);
            alert('Solicitud enviada para ' + selectedEventName + ' (' + (eventData?.duration || '') + ')\nEspacio: ' + selectedSpaceName + '\nTe contactaremos pronto.');
            reserveForm.reset();
            backToEvents();
        });
    }
})();

function renderEvents() {
    const eventsGrid = document.getElementById('eventsGrid');
    if (!eventsGrid) return;

    eventsGrid.innerHTML = (reserveSpaceData.events || []).map((item) => `
        <div class="event-card" data-event-id="${escapeHtml(item.id)}" onclick="selectEvent('${escapeHtml(item.id)}')" style="background:#fff;padding:24px;border-radius:12px;box-shadow:0 8px 20px rgba(0,0,0,0.06);border:2px solid transparent;cursor:pointer;transition:all 0.3s ease;">
            <h3 style="margin:0 0 12px 0;color:${escapeHtml(item.accent)};">${escapeHtml(item.icon)} ${escapeHtml(item.name)}</h3>
            <p style="margin:0;color:#666;font-size:0.95rem;">${escapeHtml(item.dates)}</p>
            <p style="margin:8px 0 0 0;color:#888;font-size:0.85rem;">✓ ${escapeHtml(item.duration.split('(')[1]?.replace(')', '') || '')}</p>
            <p style="margin:12px 0 0 0;color:#888;font-size:0.85rem;">${escapeHtml(item.summary)}</p>
        </div>
    `).join('');
}

function renderSpaces() {
    const spacesGrid = document.getElementById('spacesGrid');
    if (!spacesGrid) return;

    spacesGrid.innerHTML = (reserveSpaceData.spaces || []).map((item) => {
        const opacity = item.available ? '1' : '0.6';
        return `
            <div class="space-card" data-space-id="${escapeHtml(item.id)}" onclick="selectSpace('${escapeHtml(item.id)}')" style="background:#fff;padding:24px;border-radius:12px;box-shadow:0 8px 20px rgba(0,0,0,0.06);border-left:4px solid ${escapeHtml(item.accent)};cursor:pointer;transition:all 0.3s ease;opacity:${opacity};">
                <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:12px;">
                    <h3 style="margin:0;color:${escapeHtml(item.accent)};">${escapeHtml(item.icon)} ${escapeHtml(item.name)}</h3>
                    <span style="background:${escapeHtml(item.statusColor)};color:white;padding:4px 12px;border-radius:16px;font-size:0.8rem;font-weight:600;">${escapeHtml(item.statusText)}</span>
                </div>
                <p style="font-size:1.2rem;font-weight:600;color:#333;margin:10px 0;">${escapeHtml(item.size)}</p>
                <p style="font-size:0.9rem;color:#666;margin:8px 0;"><strong>Espacios disponibles:</strong> ${escapeHtml(item.availability)}</p>
                <ul style="list-style:none;padding:0;margin:12px 0;color:#666;font-size:0.95rem;">
                    ${(item.features || []).map((line) => `<li style="padding:6px 0;">${escapeHtml(line)}</li>`).join('')}
                </ul>
                <p style="font-size:0.9rem;color:#888;margin-bottom:0;">${escapeHtml(item.description)}</p>
            </div>
        `;
    }).join('');
}

function selectEvent(eventId) {
    const eventData = (reserveSpaceData.events || []).find((item) => item.id === eventId);
    if (!eventData) return;

    selectedEvent = eventId;
    selectedEventName = eventData.name;

    document.getElementById('selectedEventName').textContent = eventData.name;
    document.getElementById('selectedEventDisplay').textContent = eventData.name;
    document.getElementById('eventDurationInfo').textContent = 'Duracion: ' + eventData.duration;

    document.querySelectorAll('.event-card').forEach((card) => {
        card.style.borderColor = 'transparent';
        card.style.backgroundColor = '#fff';
    });

    const selectedCard = document.querySelector(`[data-event-id="${eventId}"]`);
    if (selectedCard) {
        selectedCard.style.borderColor = '#00d4ff';
        selectedCard.style.backgroundColor = '#f0f9ff';
    }

    document.getElementById('eventsSection').style.display = 'none';
    document.getElementById('spacesSection').style.display = 'block';
    document.getElementById('formSection').style.display = 'none';
    window.scrollTo(0, 0);
}

function selectSpace(spaceId) {
    const spaceData = (reserveSpaceData.spaces || []).find((item) => item.id === spaceId);
    if (!spaceData) return;

    if (!spaceData.available) {
        alert(reserveSpaceData.messages?.soldOut || 'Lo sentimos, este espacio esta agotado.');
        return;
    }

    selectedSpace = spaceId;
    selectedSpaceName = `${spaceData.name} (${spaceData.size})`;
    document.getElementById('selectedSpaceDisplay').textContent = selectedSpaceName;

    document.querySelectorAll('.space-card').forEach((card) => {
        card.style.backgroundColor = '#fff';
    });

    const selectedCard = document.querySelector(`[data-space-id="${spaceId}"]`);
    if (selectedCard) {
        selectedCard.style.backgroundColor = '#f0f9ff';
    }

    document.getElementById('eventsSection').style.display = 'none';
    document.getElementById('spacesSection').style.display = 'none';
    document.getElementById('formSection').style.display = 'block';
    window.scrollTo(0, 0);
}

function backToEvents() {
    selectedEvent = '';
    selectedEventName = '';
    selectedSpace = '';
    selectedSpaceName = '';
    document.getElementById('eventsSection').style.display = 'block';
    document.getElementById('spacesSection').style.display = 'none';
    document.getElementById('formSection').style.display = 'none';
    window.scrollTo(0, 0);
}

function backToSpaces() {
    selectedSpace = '';
    selectedSpaceName = '';
    document.getElementById('eventsSection').style.display = 'none';
    document.getElementById('spacesSection').style.display = 'block';
    document.getElementById('formSection').style.display = 'none';
    window.scrollTo(0, 0);
}

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
