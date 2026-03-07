(function renderBusinessRegister() {
    const data = window.BUSINESS_REGISTER_DATA;
    if (data) {
        fillBusinessRegister(data);
        return;
    }

    fetch('business-register-data.json', { cache: 'no-store' })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`No se pudo cargar business-register-data.json (${response.status})`);
            }
            return response.json();
        })
        .then(fillBusinessRegister)
        .catch((error) => console.error('Error al cargar business-register-data:', error));
})();

function fillBusinessRegister(data) {
    const root = document.getElementById('businessRegisterRoot');
    if (!root) return;

    const typeOptions = (data.businessTypes || []).map((item) => (
        `<option value="${escapeHtml(item.value)}">${escapeHtml(item.label)}</option>`
    )).join('');

    root.innerHTML = `
        <div class="auth-form" id="businessRegisterForm">
            <h2>${escapeHtml(data.title || '')}</h2>
            <p class="form-subtitle">${escapeHtml(data.subtitle || '')}</p>

            <form>
                <div class="form-section-title">Informacion de la Empresa</div>
                <div class="form-group"><label for="companyName">Nombre de la Empresa:</label><input type="text" id="companyName" name="companyName" required></div>
                <div class="form-group"><label for="businessType">Tipo de Negocio:</label><select id="businessType" name="businessType" required>${typeOptions}</select></div>
                <div class="form-group"><label for="companyEmail">Correo Electronico de la Empresa:</label><input type="email" id="companyEmail" name="companyEmail" required></div>
                <div class="form-group"><label for="phone">Telefono de Contacto:</label><input type="tel" id="phone" name="phone" required></div>
                <div class="form-group"><label for="companyDescription">Descripcion del Negocio:</label><textarea id="companyDescription" name="description" placeholder="Cuentanos brevemente sobre tu empresa..." rows="4" required></textarea></div>

                <div class="form-section-title">Informacion del Representante</div>
                <div class="form-group"><label for="contactName">Nombre del Representante:</label><input type="text" id="contactName" name="contactName" required></div>
                <div class="form-group"><label for="contactPosition">Cargo/Posicion:</label><input type="text" id="contactPosition" name="position" required></div>

                <div class="form-section-title">Credenciales de Acceso</div>
                <div class="form-group"><label for="businessPassword">Contrasena:</label><input type="password" id="businessPassword" name="password" required></div>
                <div class="form-group"><label for="businessPassword2">Confirmar Contrasena:</label><input type="password" id="businessPassword2" name="password2" required></div>

                <div class="form-group checkbox">
                    <input type="checkbox" id="terms" name="terms" required>
                    <label for="terms">Acepto los terminos y condiciones para empresas colaboradoras</label>
                </div>

                <div style="display:flex;gap:12px;">
                    <button type="submit" class="btn-primary">Registrar Empresa</button>
                    <a href="index-business.html" class="btn-primary" style="text-decoration:none;">Entrar como Empresa</a>
                </div>
            </form>

            <p class="toggle-auth">¿Eres usuario individual? <a href="login.html" class="link-blue">Vuelve al login</a></p>
            <p style="margin-top:8px;">¿Quieres reservar un espacio? <a href="reserve-space.html" class="link-blue">Ir a Reservar Espacio</a></p>
        </div>
    `;
}

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
