(function renderIndexBusiness() {
    const data = window.INDEX_BUSINESS_DATA;
    if (data) {
        fillIndexBusiness(data);
        return;
    }

    fetch('index-business-data.json', { cache: 'no-store' })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`No se pudo cargar index-business-data.json (${response.status})`);
            }
            return response.json();
        })
        .then(fillIndexBusiness)
        .catch((error) => console.error('Error al cargar index-business-data:', error));
})();

function fillIndexBusiness(data) {
    const navbarInfo = document.getElementById('businessNavbarInfo');
    const heroContent = document.getElementById('businessHeroContent');
    const cardsRoot = document.getElementById('businessSummaryCards');

    if (navbarInfo) {
        navbarInfo.innerHTML = `
            <div style="color:var(--light-text);font-weight:600;">
                Empresa: <span style="color:#00d4ff;">${escapeHtml(data.company?.name || '')}</span>
            </div>
            <a href="reserve-space.html" class="btn-primary" style="padding:8px 14px;text-decoration:none;">Reservar Espacio</a>
        `;
    }

    if (heroContent) {
        heroContent.innerHTML = `
            <h1 style="font-size:2.2rem;margin-bottom:6px;">${escapeHtml(data.hero?.title || '')}</h1>
            <p style="opacity:0.9;margin-bottom:18px;">${escapeHtml(data.hero?.description || '')}</p>
            <a href="${escapeHtml(data.hero?.ctaHref || 'reserve-space.html')}" class="btn-primary" style="padding:12px 20px;font-size:1rem;">${escapeHtml(data.hero?.ctaText || '')}</a>
        `;
    }

    if (cardsRoot) {
        cardsRoot.innerHTML = (data.cards || []).map((card) => `
            <div style="flex:${escapeHtml(card.flex || '1')};min-width:260px;background:#fff;border-radius:12px;padding:18px;box-shadow:0 8px 20px rgba(0,0,0,0.06);">
                <h3>${escapeHtml(card.title)}</h3>
                ${(card.lines || []).map((line, index) => `<p style="${index >= 2 ? 'margin-top:10px;' : ''}">${line}</p>`).join('')}
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
