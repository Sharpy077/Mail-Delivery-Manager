// Mail Delivery Manager - Main Application Script

class MailDeliveryManager {
    constructor() {
        this.data = MailDeliveryData.getCurrentData();
        this.currentDay = 'Monday';
        this.currentTab = 'schedule';
        this.searchTerm = '';
        this.dayFilter = '';
        this.serviceFilter = '';
        this.editingItem = null;
        
        this.initializeApp();
    }

    initializeApp() {
        this.bindEvents();
        this.renderCurrentView();
        this.loadData();
    }

    bindEvents() {
        // Tab navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Day selector
        document.querySelectorAll('.day-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchDay(e.target.dataset.day);
            });
        });

        // Search and filters
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchTerm = e.target.value;
            this.renderCurrentView();
        });

        document.getElementById('dayFilter').addEventListener('change', (e) => {
            this.dayFilter = e.target.value;
            this.renderCurrentView();
        });

        document.getElementById('serviceFilter').addEventListener('change', (e) => {
            this.serviceFilter = e.target.value;
            this.renderCurrentView();
        });

        // Header actions
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportData();
        });

        document.getElementById('importBtn').addEventListener('click', () => {
            this.importData();
        });

        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetData();
        });

        // Floating action button
        document.getElementById('addEntryBtn').addEventListener('click', () => {
            this.showAddModal();
        });

        // Tab-specific add buttons
        document.getElementById('addContactBtn').addEventListener('click', () => {
            this.showAddContactModal();
        });

        document.getElementById('addAdhocBtn').addEventListener('click', () => {
            this.showAddAdhocModal();
        });

        // Modal events
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('saveBtn').addEventListener('click', () => {
            this.saveItem();
        });

        document.getElementById('deleteBtn').addEventListener('click', () => {
            this.deleteItem();
        });

        // File input for import
        document.getElementById('fileInput').addEventListener('change', (e) => {
            this.handleFileImport(e);
        });

        // Close modal on outside click
        document.getElementById('editModal').addEventListener('click', (e) => {
            if (e.target.id === 'editModal') {
                this.closeModal();
            }
        });
    }

    switchTab(tabName) {
        this.currentTab = tabName;
        
        // Update tab buttons
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
        
        this.renderCurrentView();
    }

    switchDay(day) {
        this.currentDay = day;
        
        // Update day buttons
        document.querySelectorAll('.day-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-day="${day}"]`).classList.add('active');
        
        this.renderCurrentView();
    }

    renderCurrentView() {
        switch (this.currentTab) {
            case 'schedule':
                this.renderSchedule();
                break;
            case 'contacts':
                this.renderContacts();
                break;
            case 'adhoc':
                this.renderAdhoc();
                break;
        }
    }

    renderSchedule() {
        const container = document.getElementById('scheduleContainer');
        let scheduleItems = this.data.schedule[this.currentDay] || [];
        
        // Apply filters
        scheduleItems = this.filterScheduleItems(scheduleItems);
        
        if (scheduleItems.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-day"></i>
                    <h3>No schedule items</h3>
                    <p>No items found for ${this.currentDay}. Add some items to get started!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = scheduleItems.map(item => `
            <div class="schedule-item" data-id="${item.id}" data-type="schedule">
                <div class="schedule-item-header">
                    <div class="schedule-time">${item.time}</div>
                    <div class="schedule-service">${item.service}</div>
                </div>
                <div class="schedule-business">${item.business}</div>
                <div class="schedule-address">${item.address}</div>
                <div class="schedule-contact">
                    <i class="fas fa-user"></i> ${item.contactName} - ${item.customerContact}
                </div>
                ${item.details ? `<div class="schedule-details">${item.details}</div>` : ''}
                ${item.parking ? `<div class="schedule-parking"><i class="fas fa-car"></i> ${item.parking}</div>` : ''}
                ${item.notes ? `<div class="schedule-notes"><i class="fas fa-sticky-note"></i> ${item.notes}</div>` : ''}
            </div>
        `).join('');
        
        // Add click events to schedule items
        container.querySelectorAll('.schedule-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const itemId = e.currentTarget.dataset.id;
                this.editItem('schedule', itemId);
            });
        });
    }

    renderContacts() {
        const container = document.getElementById('contactsContainer');
        let contacts = this.data.contacts || [];
        
        // Apply search filter
        if (this.searchTerm) {
            contacts = contacts.filter(contact => 
                contact.business.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                contact.contactName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                contact.address.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
        
        if (contacts.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-address-book"></i>
                    <h3>No contacts found</h3>
                    <p>No contacts match your search. Add some contacts to get started!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = contacts.map(contact => `
            <div class="contact-item" data-id="${contact.id}" data-type="contact">
                <div class="contact-name">${contact.contactName}</div>
                <div class="contact-business">${contact.business}</div>
                <div class="contact-phone">
                    <i class="fas fa-phone"></i> ${contact.phone}
                </div>
                <div class="contact-address">
                    <i class="fas fa-map-marker-alt"></i> ${contact.address}
                </div>
                ${contact.notes ? `<div class="contact-notes">${contact.notes}</div>` : ''}
            </div>
        `).join('');
        
        // Add click events to contact items
        container.querySelectorAll('.contact-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const itemId = e.currentTarget.dataset.id;
                this.editItem('contact', itemId);
            });
        });
    }

    renderAdhoc() {
        const container = document.getElementById('adhocContainer');
        let adhocItems = this.data.adhoc || [];
        
        // Apply search filter
        if (this.searchTerm) {
            adhocItems = adhocItems.filter(item => 
                item.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                item.business.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                item.service.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
        
        if (adhocItems.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-clock"></i>
                    <h3>No ad-hoc services</h3>
                    <p>No ad-hoc services found. Add some services to get started!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = adhocItems.map(item => `
            <div class="adhoc-item" data-id="${item.id}" data-type="adhoc">
                <div class="adhoc-title">${item.title}</div>
                <div class="adhoc-service">${item.service}</div>
                <div class="adhoc-business">${item.business}</div>
                <div class="adhoc-frequency">
                    <i class="fas fa-calendar"></i> ${item.frequency}
                </div>
                <div class="adhoc-contact">
                    <i class="fas fa-user"></i> ${item.contactName} - ${item.customerContact}
                </div>
                <div class="adhoc-address">
                    <i class="fas fa-map-marker-alt"></i> ${item.address}
                </div>
                ${item.details ? `<div class="adhoc-details">${item.details}</div>` : ''}
                ${item.notes ? `<div class="adhoc-notes">${item.notes}</div>` : ''}
            </div>
        `).join('');
        
        // Add click events to adhoc items
        container.querySelectorAll('.adhoc-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const itemId = e.currentTarget.dataset.id;
                this.editItem('adhoc', itemId);
            });
        });
    }

    filterScheduleItems(items) {
        let filtered = items;
        
        // Apply search filter
        if (this.searchTerm) {
            filtered = filtered.filter(item => 
                item.business.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                item.address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                item.contactName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                item.service.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
        
        // Apply day filter
        if (this.dayFilter) {
            filtered = filtered.filter(item => {
                const itemDay = this.getDayFromScheduleItem(item);
                return itemDay === this.dayFilter;
            });
        }
        
        // Apply service filter
        if (this.serviceFilter) {
            filtered = filtered.filter(item => item.service === this.serviceFilter);
        }
        
        return filtered;
    }

    getDayFromScheduleItem(item) {
        // Find which day this item belongs to
        for (const [day, items] of Object.entries(this.data.schedule)) {
            if (items.find(scheduleItem => scheduleItem.id === item.id)) {
                return day;
            }
        }
        return this.currentDay;
    }

    showAddModal() {
        this.editingItem = null;
        this.showModal('Add Schedule Entry', this.createScheduleForm());
    }

    showAddContactModal() {
        this.editingItem = null;
        this.showModal('Add Contact', this.createContactForm());
    }

    showAddAdhocModal() {
        this.editingItem = null;
        this.showModal('Add Ad-hoc Service', this.createAdhocForm());
    }

    editItem(type, id) {
        let item;
        switch (type) {
            case 'schedule':
                item = this.findScheduleItem(id);
                if (item) {
                    this.editingItem = { type: 'schedule', data: item };
                    this.showModal('Edit Schedule Entry', this.createScheduleForm(item));
                }
                break;
            case 'contact':
                item = this.data.contacts.find(c => c.id === id);
                if (item) {
                    this.editingItem = { type: 'contact', data: item };
                    this.showModal('Edit Contact', this.createContactForm(item));
                }
                break;
            case 'adhoc':
                item = this.data.adhoc.find(a => a.id === id);
                if (item) {
                    this.editingItem = { type: 'adhoc', data: item };
                    this.showModal('Edit Ad-hoc Service', this.createAdhocForm(item));
                }
                break;
        }
    }

    findScheduleItem(id) {
        for (const dayItems of Object.values(this.data.schedule)) {
            const item = dayItems.find(item => item.id === id);
            if (item) return item;
        }
        return null;
    }

    showModal(title, content) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalBody').innerHTML = content;
        document.getElementById('editModal').classList.add('active');
        
        // Show/hide delete button based on whether we're editing
        document.getElementById('deleteBtn').style.display = this.editingItem ? 'block' : 'none';
    }

    closeModal() {
        document.getElementById('editModal').classList.remove('active');
        this.editingItem = null;
    }

    createScheduleForm(item = null) {
        const isEditing = !!item;
        return `
            <div class="form-group">
                <label for="scheduleTime">Time</label>
                <input type="time" id="scheduleTime" value="${item ? item.time : ''}" required>
            </div>
            <div class="form-group">
                <label for="scheduleBusiness">Business Name</label>
                <input type="text" id="scheduleBusiness" value="${item ? item.business : ''}" required>
            </div>
            <div class="form-group">
                <label for="scheduleService">Service</label>
                <select id="scheduleService" required>
                    <option value="">Select Service</option>
                    <option value="Aus Post" ${item && item.service === 'Aus Post' ? 'selected' : ''}>Australia Post</option>
                    <option value="Secure Cash" ${item && item.service === 'Secure Cash' ? 'selected' : ''}>Secure Cash</option>
                    <option value="Mail Plus" ${item && item.service === 'Mail Plus' ? 'selected' : ''}>Mail Plus</option>
                    <option value="Banking" ${item && item.service === 'Banking' ? 'selected' : ''}>Banking</option>
                </select>
            </div>
            <div class="form-group">
                <label for="scheduleAddress">Address</label>
                <input type="text" id="scheduleAddress" value="${item ? item.address : ''}" required>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="scheduleContactName">Contact Name</label>
                    <input type="text" id="scheduleContactName" value="${item ? item.contactName : ''}" required>
                </div>
                <div class="form-group">
                    <label for="scheduleCustomerContact">Customer Contact</label>
                    <input type="text" id="scheduleCustomerContact" value="${item ? item.customerContact : ''}" required>
                </div>
            </div>
            <div class="form-group">
                <label for="scheduleParking">Parking Location</label>
                <input type="text" id="scheduleParking" value="${item ? item.parking : ''}">
            </div>
            <div class="form-group">
                <label for="scheduleDetails">Details</label>
                <textarea id="scheduleDetails" rows="3">${item ? item.details : ''}</textarea>
            </div>
            <div class="form-group">
                <label for="scheduleNotes">Notes</label>
                <textarea id="scheduleNotes" rows="2">${item ? item.notes : ''}</textarea>
            </div>
        `;
    }

    createContactForm(item = null) {
        return `
            <div class="form-group">
                <label for="contactBusiness">Business Name</label>
                <input type="text" id="contactBusiness" value="${item ? item.business : ''}" required>
            </div>
            <div class="form-group">
                <label for="contactName">Contact Name</label>
                <input type="text" id="contactName" value="${item ? item.contactName : ''}" required>
            </div>
            <div class="form-group">
                <label for="contactAddress">Address</label>
                <input type="text" id="contactAddress" value="${item ? item.address : ''}" required>
            </div>
            <div class="form-group">
                <label for="contactPhone">Phone</label>
                <input type="text" id="contactPhone" value="${item ? item.phone : ''}" required>
            </div>
            <div class="form-group">
                <label for="contactNotes">Notes</label>
                <textarea id="contactNotes" rows="3">${item ? item.notes : ''}</textarea>
            </div>
        `;
    }

    createAdhocForm(item = null) {
        return `
            <div class="form-group">
                <label for="adhocTitle">Title</label>
                <input type="text" id="adhocTitle" value="${item ? item.title : ''}" required>
            </div>
            <div class="form-group">
                <label for="adhocService">Service</label>
                <select id="adhocService" required>
                    <option value="">Select Service</option>
                    <option value="Aus Post" ${item && item.service === 'Aus Post' ? 'selected' : ''}>Australia Post</option>
                    <option value="Secure Cash" ${item && item.service === 'Secure Cash' ? 'selected' : ''}>Secure Cash</option>
                    <option value="Mail Plus" ${item && item.service === 'Mail Plus' ? 'selected' : ''}>Mail Plus</option>
                    <option value="Banking" ${item && item.service === 'Banking' ? 'selected' : ''}>Banking</option>
                </select>
            </div>
            <div class="form-group">
                <label for="adhocBusiness">Business</label>
                <input type="text" id="adhocBusiness" value="${item ? item.business : ''}" required>
            </div>
            <div class="form-group">
                <label for="adhocAddress">Address</label>
                <input type="text" id="adhocAddress" value="${item ? item.address : ''}" required>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="adhocContactName">Contact Name</label>
                    <input type="text" id="adhocContactName" value="${item ? item.contactName : ''}" required>
                </div>
                <div class="form-group">
                    <label for="adhocCustomerContact">Customer Contact</label>
                    <input type="text" id="adhocCustomerContact" value="${item ? item.customerContact : ''}" required>
                </div>
            </div>
            <div class="form-group">
                <label for="adhocFrequency">Frequency</label>
                <input type="text" id="adhocFrequency" value="${item ? item.frequency : ''}" required>
            </div>
            <div class="form-group">
                <label for="adhocDetails">Details</label>
                <textarea id="adhocDetails" rows="3">${item ? item.details : ''}</textarea>
            </div>
            <div class="form-group">
                <label for="adhocNotes">Notes</label>
                <textarea id="adhocNotes" rows="2">${item ? item.notes : ''}</textarea>
            </div>
        `;
    }

    saveItem() {
        if (!this.editingItem) {
            // Adding new item
            this.addNewItem();
        } else {
            // Updating existing item
            this.updateExistingItem();
        }
    }

    addNewItem() {
        const formData = this.getFormData();
        if (!formData) return;

        const newItem = {
            id: this.generateId(),
            ...formData
        };

        switch (this.currentTab) {
            case 'schedule':
                if (!this.data.schedule[this.currentDay]) {
                    this.data.schedule[this.currentDay] = [];
                }
                this.data.schedule[this.currentDay].push(newItem);
                break;
            case 'contacts':
                this.data.contacts.push(newItem);
                break;
            case 'adhoc':
                this.data.adhoc.push(newItem);
                break;
        }

        this.saveData();
        this.closeModal();
        this.renderCurrentView();
        this.showMessage('Item added successfully!', 'success');
    }

    updateExistingItem() {
        const formData = this.getFormData();
        if (!formData) return;

        const updatedItem = {
            ...this.editingItem.data,
            ...formData
        };

        switch (this.editingItem.type) {
            case 'schedule':
                // Find and update the item in the correct day
                for (const [day, items] of Object.entries(this.data.schedule)) {
                    const index = items.findIndex(item => item.id === this.editingItem.data.id);
                    if (index !== -1) {
                        this.data.schedule[day][index] = updatedItem;
                        break;
                    }
                }
                break;
            case 'contact':
                const contactIndex = this.data.contacts.findIndex(c => c.id === this.editingItem.data.id);
                if (contactIndex !== -1) {
                    this.data.contacts[contactIndex] = updatedItem;
                }
                break;
            case 'adhoc':
                const adhocIndex = this.data.adhoc.findIndex(a => a.id === this.editingItem.data.id);
                if (adhocIndex !== -1) {
                    this.data.adhoc[adhocIndex] = updatedItem;
                }
                break;
        }

        this.saveData();
        this.closeModal();
        this.renderCurrentView();
        this.showMessage('Item updated successfully!', 'success');
    }

    getFormData() {
        const formData = {};
        
        switch (this.currentTab) {
            case 'schedule':
                formData.time = document.getElementById('scheduleTime').value;
                formData.business = document.getElementById('scheduleBusiness').value;
                formData.service = document.getElementById('scheduleService').value;
                formData.address = document.getElementById('scheduleAddress').value;
                formData.contactName = document.getElementById('scheduleContactName').value;
                formData.customerContact = document.getElementById('scheduleCustomerContact').value;
                formData.parking = document.getElementById('scheduleParking').value;
                formData.details = document.getElementById('scheduleDetails').value;
                formData.notes = document.getElementById('scheduleNotes').value;
                break;
            case 'contacts':
                formData.business = document.getElementById('contactBusiness').value;
                formData.contactName = document.getElementById('contactName').value;
                formData.address = document.getElementById('contactAddress').value;
                formData.phone = document.getElementById('contactPhone').value;
                formData.notes = document.getElementById('contactNotes').value;
                break;
            case 'adhoc':
                formData.title = document.getElementById('adhocTitle').value;
                formData.service = document.getElementById('adhocService').value;
                formData.business = document.getElementById('adhocBusiness').value;
                formData.address = document.getElementById('adhocAddress').value;
                formData.contactName = document.getElementById('adhocContactName').value;
                formData.customerContact = document.getElementById('adhocCustomerContact').value;
                formData.frequency = document.getElementById('adhocFrequency').value;
                formData.details = document.getElementById('adhocDetails').value;
                formData.notes = document.getElementById('adhocNotes').value;
                break;
        }

        // Validate required fields
        const requiredFields = Object.keys(formData).filter(key => 
            !['parking', 'details', 'notes'].includes(key)
        );
        
        for (const field of requiredFields) {
            if (!formData[field]) {
                this.showMessage(`Please fill in all required fields.`, 'error');
                return null;
            }
        }

        return formData;
    }

    deleteItem() {
        if (!this.editingItem) return;

        if (confirm('Are you sure you want to delete this item?')) {
            switch (this.editingItem.type) {
                case 'schedule':
                    // Find and remove the item from the correct day
                    for (const [day, items] of Object.entries(this.data.schedule)) {
                        const index = items.findIndex(item => item.id === this.editingItem.data.id);
                        if (index !== -1) {
                            this.data.schedule[day].splice(index, 1);
                            break;
                        }
                    }
                    break;
                case 'contact':
                    const contactIndex = this.data.contacts.findIndex(c => c.id === this.editingItem.data.id);
                    if (contactIndex !== -1) {
                        this.data.contacts.splice(contactIndex, 1);
                    }
                    break;
                case 'adhoc':
                    const adhocIndex = this.data.adhoc.findIndex(a => a.id === this.editingItem.data.id);
                    if (adhocIndex !== -1) {
                        this.data.adhoc.splice(adhocIndex, 1);
                    }
                    break;
            }

            this.saveData();
            this.closeModal();
            this.renderCurrentView();
            this.showMessage('Item deleted successfully!', 'success');
        }
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    saveData() {
        MailDeliveryData.saveData(this.data);
    }

    loadData() {
        this.data = MailDeliveryData.getCurrentData();
        this.renderCurrentView();
    }

    exportData() {
        const dataStr = JSON.stringify(this.data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'mail-delivery-data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        this.showMessage('Data exported successfully!', 'success');
    }

    importData() {
        document.getElementById('fileInput').click();
    }

    handleFileImport(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                this.data = importedData;
                this.saveData();
                this.renderCurrentView();
                this.showMessage('Data imported successfully!', 'success');
            } catch (error) {
                this.showMessage('Error importing data. Please check the file format.', 'error');
            }
        };
        reader.readAsText(file);
        
        // Reset file input
        event.target.value = '';
    }

    resetData() {
        if (confirm('Are you sure you want to reset all data to default? This cannot be undone.')) {
            this.data = MailDeliveryData.resetToDefault();
            this.renderCurrentView();
            this.showMessage('Data reset to default successfully!', 'success');
        }
    }

    showMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        // Insert at the top of main content
        const mainContent = document.querySelector('.main-content');
        mainContent.insertBefore(messageDiv, mainContent.firstChild);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MailDeliveryManager();
});