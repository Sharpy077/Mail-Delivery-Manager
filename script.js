// Work Schedule Manager App
class WorkScheduleManager {
    constructor() {
        this.data = {
            "Customer Contact List": [],
            "Monday": [],
            "Tuesday": [],
            "Wednesday": [],
            "Thursday": [],
            "Friday": [],
            "Adhoc": []
        };
        this.currentDay = 'Monday';
        this.currentTab = 'schedule';
        this.editingItem = null;
        this.editingType = null;
        this.editingIndex = null;
        
        this.initializeApp();
    }

    initializeApp() {
        this.loadDefaultData();
        this.loadFromStorage();
        this.setupEventListeners();
        this.renderCurrentView();
    }

    loadDefaultData() {
        // Load the provided schedule data
        if (window.COMPLETE_SCHEDULE_DATA) {
            this.data = window.COMPLETE_SCHEDULE_DATA;
            return;
        }
        
        // Fallback to basic data
        this.data = {
            "Customer Contact List": [
                {
                    "Business Name": "Australia Post - Deepdene Business Centre",
                    "Address": "106 Whitehorse Rd, Deepdene VIC 3103",
                    "Contact Name": "Macca\r\nMarivick",
                    "Customer Contact": "NA"
                },
                {
                    "Business Name": "Kidman Partners",
                    "Address": "Ground floor, Suite 4/255 Whitehorse Rd, Balwyn VIC 3103",
                    "Contact Name": "Kaz",
                    "Customer Contact": "03 9836 2900"
                },
                {
                    "Business Name": "Australian Council for Educational Research (ACER)",
                    "Address": "19 Prospect Hill Rd, Camberwell, VIC, 3124",
                    "Contact Name": "Jay\r\nDavid",
                    "Customer Contact": "0437 327 460\r\n0417 105 111",
                    "Notes": "May text for express post envelope orders"
                },
                {
                    "Business Name": "Australia Post - Camberwell Post Office",
                    "Address": "2 Prospect Hill Road, Camberwell, VIC, 3124",
                    "Contact Name": "Fabian\r\nNicky",
                    "Customer Contact": "13 13 18"
                },
                {
                    "Business Name": "Bank First",
                    "Address": "117 Camberwell Rd, Hawthorn East VIC 3123",
                    "Contact Name": "Donna",
                    "Customer Contact": "0422 901 285"
                },
                {
                    "Business Name": "Benjamin King Money",
                    "Address": "LVL 4, 689 Burke Rd, Camberwell, VIC, 3124",
                    "Contact Name": "Grace - Tues, Weds, Thurs\r\nPaula - Mon\r\nRach - Sometimes Mon / Fri",
                    "Customer Contact": "0416 740 282\r\n03 9804 0411\r\n0447 385 682",
                    "Notes": "May text for express post envelope orders"
                },
                {
                    "Business Name": "Australia Post - Hawthorn Business Centre",
                    "Address": "208 Riversdale Road, Hawthorn, VIC, 3122",
                    "Contact Name": "Jess\r\nJohn\r\nTony",
                    "Customer Contact": "0423 376 788"
                },
                {
                    "Business Name": "Gorman Comercial",
                    "Address": "LVL 1, 415 Riversdale Rd, Camberwell, VIC, 3124",
                    "Contact Name": "Carmel\r\nDiana\r\nSharon",
                    "Customer Contact": "0404 467 620\r\n0434 041 208\r\n0400 858 123",
                    "Notes": "May text to collect registered post pickups in the afternoon"
                },
                {
                    "Business Name": "Accru Melbourne",
                    "Address": "50 Camberwell Rd, Camberwell, VIC, 3124",
                    "Contact Name": "Abby",
                    "Customer Contact": "03 9835 8200"
                },
                {
                    "Business Name": "Australia Post - Hawthorn LPO",
                    "Address": "783 Glenferrie Road, Hawthorn, VIC, 3122",
                    "Contact Name": "Joanna",
                    "Customer Contact": "0430 096 668"
                }
            ],
            "Monday": [
                {
                    "Time": "7:40am",
                    "Business Name": "Deepdene Business Centre",
                    "Service": "Aus Post - Pickup",
                    "Details": "1. Kidman Partners - PO Box 718 - Collect from PO Box using key on lanyard\r\n2. ACER - Locked Bag 55 - Collect from Collection Hatch\r\n4. Xavier College - Collect from collection hatch\r\n5. Bank First - PO Box 338 - Collect from collection hatch",
                    "Address": "106 Whitehorse Rd, Deepdene, Vic, 3103",
                    "Contact Name": "Macca & Mardi",
                    "Customer Contact": "Not provided",
                    "Parking Location": "Park in Car Park"
                },
                {
                    "Time": "7:50am",
                    "Business Name": "Kidman Partners",
                    "Service": "Aus Post - Delivery",
                    "Details": "Access office using fob on lanyard\r\nDeliver PO BOX 718 mail in tub to spot next to reception.\r\nTake tub and any mail in it.",
                    "Address": "Ground floor, 255 Whitehorse Rd, Balwyn, Vic, 3103",
                    "Contact Name": "Kaz",
                    "Customer Contact": "03 9836 2900",
                    "Parking Location": "Park in front of building on whitehorse road."
                },
                {
                    "Time": "8:00am",
                    "Business Name": "ACER",
                    "Service": "Aus Post - Delivery",
                    "Details": "Drop tub of mail addressed to ACER or Locked Bag 55in front of the roller door in the laneway.",
                    "Address": "19 Prospect Hill Rd, Camberwell, VIC, 3124",
                    "Contact Name": "Jay & David",
                    "Customer Contact": "0437 327 460 & 0417 105 111",
                    "Parking Location": "Despatch Roller Door in laneway"
                },
                {
                    "Time": "11:40am",
                    "Business Name": "Haighs Chocolate",
                    "Service": "Secure Cash",
                    "Details": "1. Collect Banking\r\n2. Do change order if one has been requested.",
                    "Address": "715 Glenferrie Road, Hawthorn, VIC, 3122",
                    "Contact Name": "Wade",
                    "Customer Contact": "1300 424 447",
                    "Parking Location": "Park on glenferrie road near shop where available parking"
                },
                {
                    "Time": "12pm",
                    "Business Name": "The Jolly Miller",
                    "Service": "Secure Cash",
                    "Details": "1. Collect Banking\r\n2. Do change order if one has been requested.\r\n3. Can do this anytime from 6am if convienent for you.",
                    "Address": "315 Doncaster Road, Balwyn North, 3104",
                    "Contact Name": "Gina & Moses",
                    "Customer Contact": "(03) 9816 4603",
                    "Parking Location": "Park in car park in front of the café"
                }
            ],
            "Tuesday": [
                {
                    "Time": "7:40am",
                    "Business Name": "Deepdene Business Centre",
                    "Service": "Aus Post - Pickup",
                    "Details": "1. Kidman Partners - PO Box 718 - Collect from PO Box using key on lanyard\r\n2. ACER - Locked Bag 55 - Collect from Collection Hatch\r\n4. Xavier College - Collect from collection hatch\r\n5. Bank First - PO Box 338 - Collect from collection hatch",
                    "Address": "106 Whitehorse Rd, Deepdene, Vic, 3103",
                    "Contact Name": "Macca & Mardi",
                    "Customer Contact": "Not provided",
                    "Parking Location": "Park in Car Park"
                },
                {
                    "Time": "9:10am",
                    "Business Name": "Noisette",
                    "Service": "Secure Cash",
                    "Details": "1. Collect Banking - Tuesday is the usual schedule day but double check with the email schedule from secure cash.",
                    "Address": "2 Walpole St, Kew, VIC, 3101",
                    "Contact Name": "Robert",
                    "Customer Contact": "Not provided",
                    "Parking Location": "Park on street in front of shop"
                }
            ],
            "Wednesday": [
                {
                    "Time": "7:40am",
                    "Business Name": "Deepdene Business Centre",
                    "Service": "Aus Post - Pickup",
                    "Details": "1. Kidman Partners - PO Box 718 - Collect from PO Box using key on lanyard\r\n2. ACER - Locked Bag 55 - Collect from Collection Hatch\r\n4. Xavier College - Collect from collection hatch\r\n5. Bank First - PO Box 338 - Collect from collection hatch",
                    "Address": "106 Whitehorse Rd, Deepdene, Vic, 3103",
                    "Contact Name": "Macca & Mardi",
                    "Customer Contact": "Not provided",
                    "Parking Location": "Park in Car Park"
                }
            ],
            "Thursday": [
                {
                    "Time": "7:40am",
                    "Business Name": "Deepdene Business Centre",
                    "Service": "Aus Post - Pickup",
                    "Details": "1. Kidman Partners - PO Box 718 - Collect from PO Box using key on lanyard\r\n2. ACER - Locked Bag 55 - Collect from Collection Hatch\r\n4. Xavier College - Collect from collection hatch\r\n5. Bank First - PO Box 338 - Collect from collection hatch",
                    "Address": "106 Whitehorse Rd, Deepdene, Vic, 3103",
                    "Contact Name": "Macca & Mardi",
                    "Customer Contact": "Not provided",
                    "Parking Location": "Park in Car Park"
                }
            ],
            "Friday": [
                {
                    "Time": "7:40am",
                    "Business Name": "Deepdene Business Centre",
                    "Service": "Aus Post - Pickup",
                    "Details": "1. Kidman Partners - PO Box 718 - Collect from PO Box using key on lanyard\r\n2. ACER - Locked Bag 55 - Collect from Collection Hatch\r\n4. Xavier College - Collect from collection hatch\r\n5. Bank First - PO Box 338 - Collect from collection hatch",
                    "Address": "106 Whitehorse Rd, Deepdene, Vic, 3103",
                    "Contact Name": "Macca & Mardi",
                    "Customer Contact": "Not provided",
                    "Parking Location": "Park in Car Park"
                }
            ],
            "Adhoc": [
                {
                    "Business Name": "Next Smile Melbourne",
                    "Service": "Secure Cash",
                    "Days": "Ad-Hoc (Fridays)",
                    "Address": "455-459 Auburn Rd, Hawthorn East, VIC, 3123",
                    "Contact Name": "Not provided",
                    "Customer Contact": "(03) 9826 1702",
                    "Parking Location": "Park on street in front of building"
                },
                {
                    "Business Name": "Slade Pharmacy",
                    "Service": "Secure Cash",
                    "Days": "Ad Hoc",
                    "Address": "888 Toorak Rd, Camberwell, VIC, 3124",
                    "Contact Name": "Not provided",
                    "Customer Contact": "(03) 9852 5200",
                    "Parking Location": "Park opposite well before intersection."
                }
            ]
        };
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Day selection
        document.querySelectorAll('.day-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchDay(e.target.dataset.day);
            });
        });

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Filter functionality
        document.getElementById('dayFilter').addEventListener('change', (e) => {
            this.handleDayFilter(e.target.value);
        });

        document.getElementById('serviceFilter').addEventListener('change', (e) => {
            this.handleServiceFilter(e.target.value);
        });

        // Modal handling
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

        // Import/Export
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportData();
        });

        document.getElementById('importBtn').addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });

        document.getElementById('fileInput').addEventListener('change', (e) => {
            this.importData(e.target.files[0]);
        });

        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetToDefaultData();
        });

        // Add buttons
        document.getElementById('addContactBtn').addEventListener('click', () => {
            this.openAddModal('contact');
        });

        document.getElementById('addAdhocBtn').addEventListener('click', () => {
            this.openAddModal('adhoc');
        });

        document.getElementById('addEntryBtn').addEventListener('click', () => {
            this.openAddModal('schedule');
        });

        // Close modal when clicking outside
        document.getElementById('editModal').addEventListener('click', (e) => {
            if (e.target.id === 'editModal') {
                this.closeModal();
            }
        });
    }

    switchTab(tabName) {
        this.currentTab = tabName;
        
        // Update active tab
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update active content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');

        this.renderCurrentView();
    }

    switchDay(day) {
        this.currentDay = day;
        
        // Update active day button
        document.querySelectorAll('.day-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-day="${day}"]`).classList.add('active');

        this.renderSchedule();
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
        const dayData = this.data[this.currentDay] || [];
        
        if (dayData.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-times"></i>
                    <h3>No schedule entries for ${this.currentDay}</h3>
                    <p>Click the + button to add your first entry</p>
                </div>
            `;
            return;
        }

        container.innerHTML = dayData.map((item, index) => `
            <div class="schedule-item" onclick="app.openEditModal('schedule', ${index})">
                <div class="schedule-item-header">
                    <span class="schedule-time">${item.Time || 'No time'}</span>
                    <span class="schedule-service">${item.Service || 'No service'}</span>
                </div>
                <div class="schedule-business">${item['Business Name'] || 'No business name'}</div>
                <div class="schedule-address">
                    <i class="fas fa-map-marker-alt"></i> ${item.Address || 'No address'}
                </div>
                ${item['Contact Name'] ? `
                    <div class="schedule-contact">
                        <i class="fas fa-user"></i> ${item['Contact Name']}
                    </div>
                ` : ''}
                ${item['Customer Contact'] && item['Customer Contact'] !== 'Not provided' ? `
                    <div class="schedule-contact">
                        <i class="fas fa-phone"></i> ${item['Customer Contact']}
                    </div>
                ` : ''}
                ${item.Details ? `
                    <div class="schedule-details">${item.Details}</div>
                ` : ''}
                ${item.Notes ? `
                    <div class="schedule-notes">
                        <i class="fas fa-sticky-note"></i> ${item.Notes}
                    </div>
                ` : ''}
                ${item['Parking Location'] ? `
                    <div class="schedule-contact">
                        <i class="fas fa-parking"></i> ${item['Parking Location']}
                    </div>
                ` : ''}
            </div>
        `).join('');
    }

    renderContacts() {
        const container = document.getElementById('contactsContainer');
        const contacts = this.data['Customer Contact List'] || [];
        
        if (contacts.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-address-book"></i>
                    <h3>No contacts found</h3>
                    <p>Add your first contact to get started</p>
                </div>
            `;
            return;
        }

        container.innerHTML = contacts.map((contact, index) => `
            <div class="contact-item" onclick="app.openEditModal('contact', ${index})">
                <div class="contact-business">${contact['Business Name'] || 'No business name'}</div>
                <div class="contact-info">
                    <div class="contact-info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${contact.Address || 'No address'}</span>
                    </div>
                    ${contact['Contact Name'] ? `
                        <div class="contact-info-item">
                            <i class="fas fa-user"></i>
                            <span>${contact['Contact Name']}</span>
                        </div>
                    ` : ''}
                    ${contact['Customer Contact'] && contact['Customer Contact'] !== 'Not provided' ? `
                        <div class="contact-info-item">
                            <i class="fas fa-phone"></i>
                            <span>${contact['Customer Contact']}</span>
                        </div>
                    ` : ''}
                    ${contact.Notes ? `
                        <div class="contact-info-item">
                            <i class="fas fa-sticky-note"></i>
                            <span>${contact.Notes}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    renderAdhoc() {
        const container = document.getElementById('adhocContainer');
        const adhocItems = this.data['Adhoc'] || [];
        
        if (adhocItems.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-clock"></i>
                    <h3>No ad-hoc services found</h3>
                    <p>Add your first ad-hoc service</p>
                </div>
            `;
            return;
        }

        container.innerHTML = adhocItems.map((item, index) => `
            <div class="contact-item" onclick="app.openEditModal('adhoc', ${index})">
                <div class="contact-business">${item['Business Name'] || 'No business name'}</div>
                <div class="contact-info">
                    <div class="contact-info-item">
                        <i class="fas fa-briefcase"></i>
                        <span>${item.Service || 'No service'}</span>
                    </div>
                    ${item.Days ? `
                        <div class="contact-info-item">
                            <i class="fas fa-calendar"></i>
                            <span>${item.Days}</span>
                        </div>
                    ` : ''}
                    <div class="contact-info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${item.Address || 'No address'}</span>
                    </div>
                    ${item['Contact Name'] && item['Contact Name'] !== 'Not provided' ? `
                        <div class="contact-info-item">
                            <i class="fas fa-user"></i>
                            <span>${item['Contact Name']}</span>
                        </div>
                    ` : ''}
                    ${item['Customer Contact'] && item['Customer Contact'] !== 'Not provided' ? `
                        <div class="contact-info-item">
                            <i class="fas fa-phone"></i>
                            <span>${item['Customer Contact']}</span>
                        </div>
                    ` : ''}
                    ${item['Parking Location'] ? `
                        <div class="contact-info-item">
                            <i class="fas fa-parking"></i>
                            <span>${item['Parking Location']}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    openEditModal(type, index) {
        this.editingType = type;
        this.editingIndex = index;
        
        let item;
        let title = 'Edit Entry';
        
        if (type === 'schedule') {
            item = this.data[this.currentDay][index];
            title = 'Edit Schedule Entry';
        } else if (type === 'contact') {
            item = this.data['Customer Contact List'][index];
            title = 'Edit Contact';
        } else if (type === 'adhoc') {
            item = this.data['Adhoc'][index];
            title = 'Edit Ad-hoc Service';
        }

        this.editingItem = { ...item };
        this.showModal(title, this.createEditForm(type, item));
    }

    openAddModal(type) {
        this.editingType = type;
        this.editingIndex = null;
        this.editingItem = {};
        
        let title = 'Add New Entry';
        
        if (type === 'schedule') {
            title = 'Add Schedule Entry';
        } else if (type === 'contact') {
            title = 'Add Contact';
        } else if (type === 'adhoc') {
            title = 'Add Ad-hoc Service';
        }

        this.showModal(title, this.createEditForm(type, {}));
    }

    createEditForm(type, item) {
        let formFields = '';
        
        if (type === 'schedule') {
            formFields = `
                <div class="form-group">
                    <label class="form-label">Time</label>
                    <input type="text" class="form-input" id="time" value="${item.Time || ''}" placeholder="e.g., 7:40am">
                </div>
                <div class="form-group">
                    <label class="form-label">Business Name</label>
                    <input type="text" class="form-input" id="businessName" value="${item['Business Name'] || ''}" placeholder="Enter business name">
                </div>
                <div class="form-group">
                    <label class="form-label">Service</label>
                    <select class="form-input" id="service">
                        <option value="">Select service type</option>
                        <option value="Aus Post - Pickup" ${item.Service === 'Aus Post - Pickup' ? 'selected' : ''}>Aus Post - Pickup</option>
                        <option value="Aus Post - Delivery" ${item.Service === 'Aus Post - Delivery' ? 'selected' : ''}>Aus Post - Delivery</option>
                        <option value="Aus Post - Drop Off" ${item.Service === 'Aus Post - Drop Off' ? 'selected' : ''}>Aus Post - Drop Off</option>
                        <option value="Secure Cash" ${item.Service === 'Secure Cash' ? 'selected' : ''}>Secure Cash</option>
                        <option value="Mail Plus Collection" ${item.Service === 'Mail Plus Collection' ? 'selected' : ''}>Mail Plus Collection</option>
                        <option value="Mail Plus Drop Off" ${item.Service === 'Mail Plus Drop Off' ? 'selected' : ''}>Mail Plus Drop Off</option>
                        <option value="Banking" ${item.Service === 'Banking' ? 'selected' : ''}>Banking</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Address</label>
                    <input type="text" class="form-input" id="address" value="${item.Address || ''}" placeholder="Enter address">
                </div>
                <div class="form-group">
                    <label class="form-label">Contact Name</label>
                    <input type="text" class="form-input" id="contactName" value="${item['Contact Name'] || ''}" placeholder="Enter contact name">
                </div>
                <div class="form-group">
                    <label class="form-label">Customer Contact</label>
                    <input type="text" class="form-input" id="customerContact" value="${item['Customer Contact'] || ''}" placeholder="Enter phone number">
                </div>
                <div class="form-group">
                    <label class="form-label">Parking Location</label>
                    <input type="text" class="form-input" id="parkingLocation" value="${item['Parking Location'] || ''}" placeholder="Enter parking information">
                </div>
                <div class="form-group">
                    <label class="form-label">Details</label>
                    <textarea class="form-textarea" id="details" placeholder="Enter detailed instructions">${item.Details || ''}</textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Notes</label>
                    <textarea class="form-textarea" id="notes" placeholder="Enter any additional notes">${item.Notes || ''}</textarea>
                </div>
            `;
        } else if (type === 'contact') {
            formFields = `
                <div class="form-group">
                    <label class="form-label">Business Name</label>
                    <input type="text" class="form-input" id="businessName" value="${item['Business Name'] || ''}" placeholder="Enter business name">
                </div>
                <div class="form-group">
                    <label class="form-label">Address</label>
                    <input type="text" class="form-input" id="address" value="${item.Address || ''}" placeholder="Enter address">
                </div>
                <div class="form-group">
                    <label class="form-label">Contact Name</label>
                    <input type="text" class="form-input" id="contactName" value="${item['Contact Name'] || ''}" placeholder="Enter contact name">
                </div>
                <div class="form-group">
                    <label class="form-label">Customer Contact</label>
                    <input type="text" class="form-input" id="customerContact" value="${item['Customer Contact'] || ''}" placeholder="Enter phone number">
                </div>
                <div class="form-group">
                    <label class="form-label">Notes</label>
                    <textarea class="form-textarea" id="notes" placeholder="Enter any additional notes">${item.Notes || ''}</textarea>
                </div>
            `;
        } else if (type === 'adhoc') {
            formFields = `
                <div class="form-group">
                    <label class="form-label">Business Name</label>
                    <input type="text" class="form-input" id="businessName" value="${item['Business Name'] || ''}" placeholder="Enter business name">
                </div>
                <div class="form-group">
                    <label class="form-label">Service</label>
                    <select class="form-input" id="service">
                        <option value="">Select service type</option>
                        <option value="Secure Cash" ${item.Service === 'Secure Cash' ? 'selected' : ''}>Secure Cash</option>
                        <option value="Aus Post Pickup" ${item.Service === 'Aus Post Pickup' ? 'selected' : ''}>Aus Post Pickup</option>
                        <option value="Mail Plus Collection" ${item.Service === 'Mail Plus Collection' ? 'selected' : ''}>Mail Plus Collection</option>
                        <option value="Banking" ${item.Service === 'Banking' ? 'selected' : ''}>Banking</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Days</label>
                    <input type="text" class="form-input" id="days" value="${item.Days || ''}" placeholder="e.g., Ad-Hoc (Fridays)">
                </div>
                <div class="form-group">
                    <label class="form-label">Address</label>
                    <input type="text" class="form-input" id="address" value="${item.Address || ''}" placeholder="Enter address">
                </div>
                <div class="form-group">
                    <label class="form-label">Contact Name</label>
                    <input type="text" class="form-input" id="contactName" value="${item['Contact Name'] || ''}" placeholder="Enter contact name">
                </div>
                <div class="form-group">
                    <label class="form-label">Customer Contact</label>
                    <input type="text" class="form-input" id="customerContact" value="${item['Customer Contact'] || ''}" placeholder="Enter phone number">
                </div>
                <div class="form-group">
                    <label class="form-label">Parking Location</label>
                    <input type="text" class="form-input" id="parkingLocation" value="${item['Parking Location'] || ''}" placeholder="Enter parking information">
                </div>
            `;
        }
        
        return formFields;
    }

    showModal(title, content) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalBody').innerHTML = content;
        document.getElementById('editModal').classList.add('active');
        
        // Show/hide delete button based on whether we're editing or adding
        const deleteBtn = document.getElementById('deleteBtn');
        deleteBtn.style.display = this.editingIndex !== null ? 'inline-flex' : 'none';
    }

    closeModal() {
        document.getElementById('editModal').classList.remove('active');
        this.editingItem = null;
        this.editingType = null;
        this.editingIndex = null;
    }

    saveItem() {
        const updatedItem = this.getFormData();
        
        if (this.editingIndex !== null) {
            // Update existing item
            if (this.editingType === 'schedule') {
                this.data[this.currentDay][this.editingIndex] = updatedItem;
            } else if (this.editingType === 'contact') {
                this.data['Customer Contact List'][this.editingIndex] = updatedItem;
            } else if (this.editingType === 'adhoc') {
                this.data['Adhoc'][this.editingIndex] = updatedItem;
            }
        } else {
            // Add new item
            if (this.editingType === 'schedule') {
                this.data[this.currentDay].push(updatedItem);
            } else if (this.editingType === 'contact') {
                this.data['Customer Contact List'].push(updatedItem);
            } else if (this.editingType === 'adhoc') {
                this.data['Adhoc'].push(updatedItem);
            }
        }
        
        this.saveToStorage();
        this.closeModal();
        this.renderCurrentView();
    }

    deleteItem() {
        if (this.editingIndex !== null && confirm('Are you sure you want to delete this item?')) {
            if (this.editingType === 'schedule') {
                this.data[this.currentDay].splice(this.editingIndex, 1);
            } else if (this.editingType === 'contact') {
                this.data['Customer Contact List'].splice(this.editingIndex, 1);
            } else if (this.editingType === 'adhoc') {
                this.data['Adhoc'].splice(this.editingIndex, 1);
            }
            
            this.saveToStorage();
            this.closeModal();
            this.renderCurrentView();
        }
    }

    getFormData() {
        const formData = {};
        
        if (this.editingType === 'schedule') {
            formData.Time = document.getElementById('time').value;
            formData['Business Name'] = document.getElementById('businessName').value;
            formData.Service = document.getElementById('service').value;
            formData.Address = document.getElementById('address').value;
            formData['Contact Name'] = document.getElementById('contactName').value;
            formData['Customer Contact'] = document.getElementById('customerContact').value;
            formData['Parking Location'] = document.getElementById('parkingLocation').value;
            formData.Details = document.getElementById('details').value;
            formData.Notes = document.getElementById('notes').value;
        } else if (this.editingType === 'contact') {
            formData['Business Name'] = document.getElementById('businessName').value;
            formData.Address = document.getElementById('address').value;
            formData['Contact Name'] = document.getElementById('contactName').value;
            formData['Customer Contact'] = document.getElementById('customerContact').value;
            formData.Notes = document.getElementById('notes').value;
        } else if (this.editingType === 'adhoc') {
            formData['Business Name'] = document.getElementById('businessName').value;
            formData.Service = document.getElementById('service').value;
            formData.Days = document.getElementById('days').value;
            formData.Address = document.getElementById('address').value;
            formData['Contact Name'] = document.getElementById('contactName').value;
            formData['Customer Contact'] = document.getElementById('customerContact').value;
            formData['Parking Location'] = document.getElementById('parkingLocation').value;
        }
        
        return formData;
    }

    handleSearch(query) {
        // Implementation for search functionality
        // This would filter the current view based on the search query
        console.log('Search query:', query);
        // For now, we'll just log it - full implementation would filter results
    }

    handleDayFilter(day) {
        if (day && this.currentTab === 'schedule') {
            this.switchDay(day);
        }
    }

    handleServiceFilter(service) {
        // Implementation for service filtering
        console.log('Service filter:', service);
        // For now, we'll just log it - full implementation would filter results
    }

    exportData() {
        const dataStr = JSON.stringify(this.data, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = 'work-schedule-export.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

    importData(file) {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);
                    this.data = importedData;
                    this.saveToStorage();
                    this.renderCurrentView();
                    alert('Data imported successfully!');
                } catch (error) {
                    alert('Error importing data. Please check the file format.');
                }
            };
            reader.readAsText(file);
        }
    }

    saveToStorage() {
        localStorage.setItem('workScheduleData', JSON.stringify(this.data));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('workScheduleData');
        if (stored) {
            try {
                this.data = JSON.parse(stored);
            } catch (error) {
                console.error('Error loading from storage:', error);
            }
        } else {
            // If no data in storage, load the complete schedule data
            if (window.COMPLETE_SCHEDULE_DATA) {
                this.data = window.COMPLETE_SCHEDULE_DATA;
                this.saveToStorage();
            }
        }
    }

    resetToDefaultData() {
        if (confirm('Are you sure you want to reset to the default schedule data? This will overwrite all your current data.')) {
            this.loadDefaultData();
            this.saveToStorage();
            this.renderCurrentView();
            alert('Data has been reset to default schedule.');
        }
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new WorkScheduleManager();
});