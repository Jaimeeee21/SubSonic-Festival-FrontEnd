(function renderEventos() {
    const data = window.EVENTOS_DATA;
    if (data) {
        fillEventos(data);
        return;
    }

    fetch('eventos-data.json', { cache: 'no-store' })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`No se pudo cargar eventos-data.json (${response.status})`);
            }
            return response.json();
        })
        .then(fillEventos)
        .catch((error) => console.error('Error al cargar eventos-data:', error));
})();

function fillEventos(data) {
    const principalesGrid = document.getElementById('principalesGrid');
    const talleresGrid = document.getElementById('talleresGrid');
    const afterpartyGrid = document.getElementById('afterpartyGrid');

    if (principalesGrid) {
        principalesGrid.innerHTML = (data.principales || []).map((item) => `
            <div class="event-card-detail">
                <div class="event-image" style="background-image: url('${escapeHtml(item.image)}');"></div>
                <div class="event-card-body">
                    <h3>${escapeHtml(item.title)}</h3>
                    <p class="event-time">${escapeHtml(item.time)}</p>
                    <p class="event-desc">${escapeHtml(item.description)}</p>
                    <div class="event-info">
                        ${(item.info || []).map((line) => `<span class="info-item">${escapeHtml(line)}</span>`).join('')}
                    </div>
                    <button class="btn-primary small">Comprar Entrada</button>
                </div>
            </div>
        `).join('');
    }

    if (talleresGrid) {
        talleresGrid.innerHTML = (data.talleres || []).map((item) => `
            <div class="workshop-card">
                <h3>${escapeHtml(item.title)}</h3>
                <p class="workshop-time">${escapeHtml(item.time)}</p>
                <p class="workshop-desc">${escapeHtml(item.description)}</p>
                <div class="workshop-meta">
                    ${(item.meta || []).map((line) => `<span class="meta-item">${escapeHtml(line)}</span>`).join('')}
                </div>
                <button class="btn-primary small">Registrarse</button>
            </div>
        `).join('');
    }

    if (afterpartyGrid) {
        afterpartyGrid.innerHTML = (data.afterparty || []).map((item) => `
            <div class="afterparty-card">
                <div class="afterparty-icon">${escapeHtml(item.icon)}</div>
                <h3>${escapeHtml(item.title)}</h3>
                <p class="afterparty-time">${escapeHtml(item.time)}</p>
                <p class="afterparty-desc">${escapeHtml(item.description)}</p>
                <div class="afterparty-meta">
                    ${(item.meta || []).map((line) => `<span class="meta-item">${escapeHtml(line)}</span>`).join('')}
                </div>
                <button class="btn-primary small">Detalles</button>
            </div>
        `).join('');
    }
}

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
