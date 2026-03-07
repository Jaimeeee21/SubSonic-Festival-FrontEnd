(function renderCalendario() {
    const data = window.CALENDARIO_DATA;
    if (data) {
        fillCalendario(data);
        return;
    }

    fetch('calendario-data.json', { cache: 'no-store' })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`No se pudo cargar calendario-data.json (${response.status})`);
            }
            return response.json();
        })
        .then(fillCalendario)
        .catch((error) => console.error('Error al cargar calendario-data:', error));
})();

function fillCalendario(data) {
    renderTimeline('agostoTimeline', data.agosto || []);
    renderTimeline('pasadoTimeline', data.pasado || []);
    renderTimeline('proximasTimeline', data.proximas || []);
}

function renderTimeline(containerId, events) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = events.map((item) => `
        <div class="timeline-event">
            <div class="event-date">
                <span class="day">${escapeHtml(item.day)}</span>
                <span class="month">${escapeHtml(item.month)}</span>
            </div>
            <div class="event-details">
                <h3>${escapeHtml(item.title)}</h3>
                <p class="event-location">${escapeHtml(item.location)}</p>
                <p class="event-description">${escapeHtml(item.description)}</p>
                <button class="${escapeHtml(item.buttonClass || 'btn-primary')}" onclick="window.location.href='#'">${escapeHtml(item.buttonText || 'Ver mas')}</button>
            </div>
        </div>
    `).join('');
}

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
