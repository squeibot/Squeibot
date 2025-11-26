// Sistema de formulario de contacto premium
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.isSubmitting = false;
        
        this.init();
    }
    
    init() {
        this.setupValidation();
        this.setupSubmission();
        this.setupAutoSave();
        this.loadSavedData();
    }
    
    setupValidation() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Validación en tiempo real
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
        
        // Validación personalizada para email
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('input', () => {
                this.validateEmail(emailInput);
            });
        }
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        switch (field.type) {
            case 'text':
                if (field.id === 'name' && value.length < 2) {
                    isValid = false;
                    errorMessage = 'El nombre debe tener al menos 2 caracteres';
                }
                break;
                
            case 'email':
                if (!this.isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Por favor ingresa un email válido';
                }
                break;
                
            case 'select-one':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Por favor selecciona un asunto';
                }
                break;
                
            case 'textarea':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'El mensaje debe tener al menos 10 caracteres';
                }
                break;
        }
        
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'Este campo es obligatorio';
        }
        
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }
        
        return isValid;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    validateEmail(field) {
        const value = field.value.trim();
        if (value && !this.isValidEmail(value)) {
            this.showFieldError(field, 'Por favor ingresa un email válido');
            return false;
        }
        return true;
    }
    
    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ff2a6d;
            font-size: 0.8rem;
            margin-top: 5px;
            font-weight: 500;
        `;
        
        field.parentNode.appendChild(errorElement);
    }
    
    clearFieldError(field) {
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    setupSubmission() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (this.isSubmitting) return;
            
            // Validar todos los campos
            const isValid = this.validateForm();
            
            if (isValid) {
                await this.submitForm();
            }
        });
    }
    
    validateForm() {
        const fields = this.form.querySelectorAll('input, select, textarea');
        let isValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    async submitForm() {
        this.isSubmitting = true;
        
        const submitButton = this.form.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        
        // Mostrar estado de carga
        submitButton.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            Enviando...
        `;
        submitButton.disabled = true;
        
        try {
            const formData = this.getFormData();
            
            // Simular envío (en producción, enviarías a un servidor real)
            await this.simulateApiCall(formData);
            
            // Mostrar éxito
            this.showSuccessMessage();
            
            // Limpiar formulario
            this.form.reset();
            this.clearSavedData();
            
            // Enviar notificación
            if (window.notificationSystem) {
                window.notificationSystem.createNotification(
                    '✅ Mensaje Enviado',
                    'Gracias por contactarme. Te responderé pronto.',
                    'success'
                );
            }
            
        } catch (error) {
            this.showErrorMessage();
            console.error('Error enviando formulario:', error);
        } finally {
            // Restaurar botón
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            this.isSubmitting = false;
        }
    }
    
    getFormData() {
        return {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
    }
    
    simulateApiCall(formData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simular éxito 90% del tiempo
                if (Math.random() < 0.9) {
                    resolve({
                        success: true,
                        message: 'Mensaje recibido correctamente',
                        id: Date.now()
                    });
                    
                    // En producción, aquí enviarías el email real
                    this.sendEmailNotification(formData);
                    
                } else {
                    reject(new Error('Error simulado del servidor'));
                }
            }, 2000);
        });
    }
    
    sendEmailNotification(formData) {
        // En producción, esto conectaría con un servicio de email
        console.log('📧 Email que se enviaría a squeiboty@gmail.com:', {
            from: formData.email,
            subject: `Nuevo mensaje de contacto: ${formData.subject}`,
            message: `
Nombre: ${formData.name}
Email: ${formData.email}
Asunto: ${formData.subject}
Mensaje: ${formData.message}
            
Enviado desde: ${window.location.href}
User Agent: ${formData.userAgent}
Timestamp: ${formData.timestamp}
            `
        });
        
        // Aquí integrarías con EmailJS, SendGrid, etc.
    }
    
    showSuccessMessage() {
        this.showMessage('✅ Mensaje enviado correctamente. ¡Te responderé pronto!', 'success');
    }
    
    showErrorMessage() {
        this.showMessage('❌ Error al enviar el mensaje. Por favor intenta nuevamente.', 'error');
    }
    
    showMessage(text, type) {
        // Remover mensaje existente
        const existingMessage = this.form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = text;
        messageElement.style.cssText = `
            padding: 15px;
            margin: 20px 0;
            border-radius: 10px;
            text-align: center;
            font-weight: 600;
            background: ${type === 'success' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 42, 109, 0.1)'};
            border: 1px solid ${type === 'success' ? '#00ff88' : '#ff2a6d'};
            color: ${type === 'success' ? '#00ff88' : '#ff2a6d'};
        `;
        
        this.form.insertBefore(messageElement, this.form.querySelector('.submit-button'));
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
    
    setupAutoSave() {
        const fields = this.form.querySelectorAll('input, select, textarea');
        
        fields.forEach(field => {
            field.addEventListener('input', () => {
                this.saveFormData();
            });
        });
        
        // Guardar también en blur
        fields.forEach(field => {
            field.addEventListener('blur', () => {
                this.saveFormData();
            });
        });
    }
    
    saveFormData() {
        const formData = this.getFormData();
        localStorage.setItem('squeibot_contact_form', JSON.stringify(formData));
    }
    
    loadSavedData() {
        const saved = localStorage.getItem('squeibot_contact_form');
        if (saved) {
            try {
                const formData = JSON.parse(saved);
                
                document.getElementById('name').value = formData.name || '';
                document.getElementById('email').value = formData.email || '';
                document.getElementById('subject').value = formData.subject || '';
                document.getElementById('message').value = formData.message || '';
                
                // Mostrar indicador de datos guardados
                this.showAutoSaveIndicator();
                
            } catch (error) {
                console.error('Error cargando datos guardados:', error);
            }
        }
    }
    
    showAutoSaveIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'auto-save-indicator';
        indicator.textContent = '💾 Datos recuperados automáticamente';
        indicator.style.cssText = `
            font-size: 0.8rem;
            color: var(--accent-blue);
            text-align: center;
            margin-bottom: 1rem;
            font-weight: 500;
        `;
        
        const existingIndicator = this.form.querySelector('.auto-save-indicator');
        if (!existingIndicator) {
            this.form.insertBefore(indicator, this.form.firstChild);
            
            // Auto-remover después de 3 segundos
            setTimeout(() => {
                indicator.remove();
            }, 3000);
        }
    }
    
    clearSavedData() {
        localStorage.removeItem('squeibot_contact_form');
    }
    
    // Métodos públicos
    focusFirstField() {
        const firstField = this.form.querySelector('input, select, textarea');
        if (firstField) {
            firstField.focus();
        }
    }
    
    setFormData(data) {
        if (data.name) document.getElementById('name').value = data.name;
        if (data.email) document.getElementById('email').value = data.email;
        if (data.subject) document.getElementById('subject').value = data.subject;
        if (data.message) document.getElementById('message').value = data.message;
        
        this.saveFormData();
    }
}

// Inicializar formulario de contacto
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        window.contactForm = new ContactForm();
    }
});

// API global para el formulario de contacto
window.ContactFormAPI = {
    focus: () => window.contactForm?.focusFirstField(),
    setData: (data) => window.contactForm?.setFormData(data),
    submit: () => document.getElementById('contactForm')?.requestSubmit(),
    clear: () => {
        document.getElementById('contactForm')?.reset();
        window.contactForm?.clearSavedData();
    }
};