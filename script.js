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
            "Adhoc": [],
            "Invoices": [],
            "Charges": [],
            "Routes": [],
            "Pricing": {
                "serviceRates": {
                    "Aus Post - Pickup": 25,
                    "Aus Post - Delivery": 20,
                    "Aus Post - Drop Off": 15,
                    "Secure Cash": 35,
                    "Mail Plus Collection": 30,
                    "Mail Plus Drop Off": 25,
                    "Banking": 30
                },
                "mileageRate": 0.85,
                "minimumCharge": 15,
                "rushSurcharge": 1.5
            }
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

        // New feature event listeners
        document.getElementById('optimizeRoutesBtn').addEventListener('click', () => {
            this.optimizeRoutes();
        });

        document.getElementById('saveRouteBtn').addEventListener('click', () => {
            this.saveCurrentRoute();
        });

        document.getElementById('generateInvoiceBtn').addEventListener('click', () => {
            this.openInvoiceModal();
        });

        document.getElementById('addChargeBtn').addEventListener('click', () => {
            this.openChargeModal();
        });

        document.getElementById('calculatePriceBtn').addEventListener('click', () => {
            this.calculateJobPrice();
        });

        document.getElementById('refreshDashboardBtn').addEventListener('click', () => {
            this.refreshDashboard();
        });

        document.getElementById('exportReportBtn').addEventListener('click', () => {
            this.exportAnalyticsReport();
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
            case 'routes':
                this.renderRoutes();
                break;
            case 'invoicing':
                this.renderInvoicing();
                break;
            case 'pricing':
                this.renderPricing();
                break;
            case 'dashboard':
                this.renderDashboard();
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

    // Route Optimization Methods
    optimizeRoutes() {
        const dayData = this.data[this.currentDay] || [];
        if (dayData.length === 0) {
            alert('No schedule entries found for ' + this.currentDay);
            return;
        }

        // Simple route optimization based on postal codes and addresses
        const optimizedRoute = this.calculateOptimalRoute(dayData);
        this.data.Routes = [{
            day: this.currentDay,
            date: new Date().toLocaleDateString(),
            stops: optimizedRoute,
            totalDistance: this.calculateTotalDistance(optimizedRoute),
            estimatedTime: this.calculateEstimatedTime(optimizedRoute)
        }];
        
        this.saveToStorage();
        this.renderRoutes();
        this.switchTab('routes');
    }

    calculateOptimalRoute(stops) {
        // Simple optimization: sort by postal code, then by street name
        return stops.map((stop, index) => ({
            ...stop,
            originalIndex: index,
            stopNumber: index + 1
        })).sort((a, b) => {
            // Extract postal code from address
            const postcodeA = this.extractPostcode(a.Address || '');
            const postcodeB = this.extractPostcode(b.Address || '');
            
            if (postcodeA !== postcodeB) {
                return postcodeA.localeCompare(postcodeB);
            }
            
            // If same postcode, sort by street name
            return (a.Address || '').localeCompare(b.Address || '');
        }).map((stop, index) => ({
            ...stop,
            stopNumber: index + 1
        }));
    }

    extractPostcode(address) {
        // Extract postcode from Australian address
        const match = address.match(/(\d{4})/);
        return match ? match[1] : '0000';
    }

    calculateTotalDistance(route) {
        // Simplified distance calculation (in reality, would use mapping API)
        return `${(route.length * 3.5).toFixed(1)} km`;
    }

    calculateEstimatedTime(route) {
        // Simple time calculation: 10 minutes per stop + 5 minutes travel time
        const totalMinutes = route.length * 15;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h ${minutes}m`;
    }

    saveCurrentRoute() {
        if (this.data.Routes.length === 0) {
            alert('No route to save. Please optimize routes first.');
            return;
        }
        
        const routeName = prompt('Enter route name:');
        if (routeName) {
            this.data.Routes[this.data.Routes.length - 1].name = routeName;
            this.saveToStorage();
            alert('Route saved successfully!');
        }
    }

    renderRoutes() {
        const container = document.getElementById('routesContainer');
        const routes = this.data.Routes || [];
        
        if (routes.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-route"></i>
                    <h3>No optimized routes found</h3>
                    <p>Click "Optimize Routes" to create an optimized route for the selected day</p>
                </div>
            `;
            return;
        }

        container.innerHTML = routes.map(route => `
            <div class="route-item">
                <div class="route-header">
                    <div class="route-title">${route.name || route.day + ' Route'}</div>
                    <div class="route-distance">${route.totalDistance}</div>
                </div>
                <div class="route-info">
                    <div style="display: flex; gap: 2rem; margin-bottom: 1rem;">
                        <div><strong>Day:</strong> ${route.day}</div>
                        <div><strong>Date:</strong> ${route.date}</div>
                        <div><strong>Estimated Time:</strong> ${route.estimatedTime}</div>
                    </div>
                </div>
                <div class="route-stops">
                    ${route.stops.map(stop => `
                        <div class="route-stop">
                            <div class="stop-number">${stop.stopNumber}</div>
                            <div class="stop-details">
                                <div class="stop-business">${stop['Business Name'] || 'Unknown Business'}</div>
                                <div class="stop-address">${stop.Address || 'No address'}</div>
                                <div class="stop-time">${stop.Time || 'No time'}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    // Invoicing Methods
    openInvoiceModal() {
        const invoiceForm = `
            <div class="form-group">
                <label class="form-label">Customer</label>
                <select class="form-input" id="invoiceCustomer">
                    <option value="">Select Customer</option>
                    ${this.data['Customer Contact List'].map(contact => 
                        `<option value="${contact['Business Name']}">${contact['Business Name']}</option>`
                    ).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Invoice Date</label>
                <input type="date" class="form-input" id="invoiceDate" value="${new Date().toISOString().split('T')[0]}">
            </div>
            <div class="form-group">
                <label class="form-label">Due Date</label>
                <input type="date" class="form-input" id="invoiceDueDate" value="${new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0]}">
            </div>
            <div class="form-group">
                <label class="form-label">Services Period</label>
                <select class="form-input" id="invoicePeriod">
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="custom">Custom Period</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Additional Notes</label>
                <textarea class="form-textarea" id="invoiceNotes" placeholder="Enter any additional notes for this invoice"></textarea>
            </div>
        `;
        
        this.showModal('Generate Invoice', invoiceForm);
        
        // Replace save button functionality
        document.getElementById('saveBtn').onclick = () => {
            this.generateInvoice();
        };
    }

    generateInvoice() {
        const customer = document.getElementById('invoiceCustomer').value;
        const date = document.getElementById('invoiceDate').value;
        const dueDate = document.getElementById('invoiceDueDate').value;
        const period = document.getElementById('invoicePeriod').value;
        const notes = document.getElementById('invoiceNotes').value;
        
        if (!customer) {
            alert('Please select a customer');
            return;
        }
        
        // Calculate invoice items based on schedule
        const invoiceItems = this.calculateInvoiceItems(customer, period);
        const total = invoiceItems.reduce((sum, item) => sum + item.amount, 0);
        
        const invoice = {
            id: 'INV-' + Date.now(),
            customer: customer,
            date: date,
            dueDate: dueDate,
            status: 'pending',
            items: invoiceItems,
            total: total,
            notes: notes,
            createdAt: new Date().toISOString()
        };
        
        this.data.Invoices.push(invoice);
        this.saveToStorage();
        this.closeModal();
        this.renderInvoicing();
        this.switchTab('invoicing');
        
        alert(`Invoice ${invoice.id} generated successfully!`);
    }

    calculateInvoiceItems(customer, period) {
        const items = [];
        const serviceRates = this.data.Pricing.serviceRates;
        
        // Get all schedule items for the customer
        const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        
        allDays.forEach(day => {
            const dayData = this.data[day] || [];
            const customerItems = dayData.filter(item => 
                item['Business Name'] && item['Business Name'].includes(customer)
            );
            
            customerItems.forEach(item => {
                const service = item.Service || 'Standard Service';
                const rate = serviceRates[service] || 25;
                
                items.push({
                    description: `${service} - ${day}`,
                    service: service,
                    day: day,
                    rate: rate,
                    quantity: 1,
                    amount: rate
                });
            });
        });
        
        return items;
    }

    openChargeModal() {
        const chargeForm = `
            <div class="form-group">
                <label class="form-label">Customer</label>
                <select class="form-input" id="chargeCustomer">
                    <option value="">Select Customer</option>
                    ${this.data['Customer Contact List'].map(contact => 
                        `<option value="${contact['Business Name']}">${contact['Business Name']}</option>`
                    ).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Charge Type</label>
                <select class="form-input" id="chargeType">
                    <option value="adhoc">Ad-hoc Service</option>
                    <option value="rush">Rush Charge</option>
                    <option value="extra">Extra Service</option>
                    <option value="adjustment">Adjustment</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Amount</label>
                <input type="number" class="form-input" id="chargeAmount" step="0.01" placeholder="0.00">
            </div>
            <div class="form-group">
                <label class="form-label">Description</label>
                <textarea class="form-textarea" id="chargeDescription" placeholder="Describe the charge"></textarea>
            </div>
            <div class="form-group">
                <label class="form-label">Date</label>
                <input type="date" class="form-input" id="chargeDate" value="${new Date().toISOString().split('T')[0]}">
            </div>
        `;
        
        this.showModal('Add Charge', chargeForm);
        
        // Replace save button functionality
        document.getElementById('saveBtn').onclick = () => {
            this.addCharge();
        };
    }

    addCharge() {
        const customer = document.getElementById('chargeCustomer').value;
        const type = document.getElementById('chargeType').value;
        const amount = parseFloat(document.getElementById('chargeAmount').value);
        const description = document.getElementById('chargeDescription').value;
        const date = document.getElementById('chargeDate').value;
        
        if (!customer || !amount || !description) {
            alert('Please fill in all required fields');
            return;
        }
        
        const charge = {
            id: 'CHG-' + Date.now(),
            customer: customer,
            type: type,
            amount: amount,
            description: description,
            date: date,
            createdAt: new Date().toISOString()
        };
        
        this.data.Charges.push(charge);
        this.saveToStorage();
        this.closeModal();
        this.renderInvoicing();
        
        alert('Charge added successfully!');
    }

    renderInvoicing() {
        const container = document.getElementById('invoicingContainer');
        const invoices = this.data.Invoices || [];
        const charges = this.data.Charges || [];
        
        if (invoices.length === 0 && charges.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-file-invoice-dollar"></i>
                    <h3>No invoices or charges found</h3>
                    <p>Generate your first invoice or add charges to get started</p>
                </div>
            `;
            return;
        }

        const invoiceHtml = invoices.map(invoice => `
            <div class="invoice-item" onclick="app.viewInvoice('${invoice.id}')">
                <div class="invoice-header">
                    <div class="invoice-number">${invoice.id}</div>
                    <div class="invoice-status ${invoice.status}">${invoice.status.toUpperCase()}</div>
                </div>
                <div class="invoice-customer">${invoice.customer}</div>
                <div class="invoice-date">Invoice Date: ${invoice.date}</div>
                <div class="invoice-date">Due Date: ${invoice.dueDate}</div>
                <div class="invoice-amount">$${invoice.total.toFixed(2)}</div>
                <div class="invoice-items">
                    ${invoice.items.slice(0, 3).map(item => `
                        <div class="invoice-item-line">
                            <div class="invoice-item-description">${item.description}</div>
                            <div class="invoice-item-amount">$${item.amount.toFixed(2)}</div>
                        </div>
                    `).join('')}
                    ${invoice.items.length > 3 ? `<div class="invoice-item-line"><em>... and ${invoice.items.length - 3} more items</em></div>` : ''}
                </div>
            </div>
        `).join('');

        const chargeHtml = charges.map(charge => `
            <div class="charge-item" onclick="app.editCharge('${charge.id}')">
                <div class="charge-header">
                    <div class="charge-type">${charge.type.toUpperCase()}</div>
                    <div class="charge-amount">$${charge.amount.toFixed(2)}</div>
                </div>
                <div class="charge-description">${charge.description}</div>
                <div class="charge-date">Customer: ${charge.customer}</div>
                <div class="charge-date">Date: ${charge.date}</div>
            </div>
        `).join('');

        container.innerHTML = `
            <div style="margin-bottom: 2rem;">
                <h3>Recent Invoices</h3>
                ${invoiceHtml || '<p>No invoices found</p>'}
            </div>
            <div>
                <h3>Recent Charges</h3>
                ${chargeHtml || '<p>No charges found</p>'}
            </div>
        `;
    }

    viewInvoice(invoiceId) {
        const invoice = this.data.Invoices.find(inv => inv.id === invoiceId);
        if (!invoice) return;
        
        const invoiceDetails = `
            <div style="margin-bottom: 2rem;">
                <h3>${invoice.id}</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                    <div><strong>Customer:</strong> ${invoice.customer}</div>
                    <div><strong>Status:</strong> <span class="invoice-status ${invoice.status}">${invoice.status.toUpperCase()}</span></div>
                    <div><strong>Date:</strong> ${invoice.date}</div>
                    <div><strong>Due Date:</strong> ${invoice.dueDate}</div>
                </div>
            </div>
            <div class="invoice-items">
                <h4>Items:</h4>
                ${invoice.items.map(item => `
                    <div class="invoice-item-line">
                        <div class="invoice-item-description">${item.description}</div>
                        <div class="invoice-item-amount">$${item.amount.toFixed(2)}</div>
                    </div>
                `).join('')}
                <div class="invoice-item-line" style="font-weight: bold; border-top: 2px solid #333; margin-top: 1rem; padding-top: 1rem;">
                    <div class="invoice-item-description">TOTAL</div>
                    <div class="invoice-item-amount">$${invoice.total.toFixed(2)}</div>
                </div>
            </div>
            ${invoice.notes ? `<div style="margin-top: 1rem;"><strong>Notes:</strong> ${invoice.notes}</div>` : ''}
        `;
        
        this.showModal('Invoice Details', invoiceDetails);
        
        // Update modal buttons
        document.getElementById('saveBtn').style.display = 'none';
        document.getElementById('deleteBtn').style.display = 'none';
        document.getElementById('cancelBtn').textContent = 'Close';
    }

    // Pricing Calculator Methods
    calculateJobPrice() {
        const pricingForm = `
            <div class="form-group">
                <label class="form-label">Service Type</label>
                <select class="form-input" id="priceService">
                    <option value="">Select Service</option>
                    ${Object.keys(this.data.Pricing.serviceRates).map(service => 
                        `<option value="${service}">${service}</option>`
                    ).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Distance (km)</label>
                <input type="number" class="form-input" id="priceDistance" step="0.1" placeholder="0.0">
            </div>
            <div class="form-group">
                <label class="form-label">Rush Job</label>
                <select class="form-input" id="priceRush">
                    <option value="false">No</option>
                    <option value="true">Yes (50% surcharge)</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Additional Notes</label>
                <textarea class="form-textarea" id="priceNotes" placeholder="Any special requirements or notes"></textarea>
            </div>
            <div id="priceResult" style="margin-top: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 8px; display: none;">
                <h4>Price Breakdown:</h4>
                <div id="priceBreakdown"></div>
            </div>
        `;
        
        this.showModal('Price Calculator', pricingForm);
        
        // Replace save button functionality
        document.getElementById('saveBtn').textContent = 'Calculate Price';
        document.getElementById('saveBtn').onclick = () => {
            this.performPriceCalculation();
        };
    }

    performPriceCalculation() {
        const service = document.getElementById('priceService').value;
        const distance = parseFloat(document.getElementById('priceDistance').value) || 0;
        const isRush = document.getElementById('priceRush').value === 'true';
        
        if (!service) {
            alert('Please select a service type');
            return;
        }
        
        const serviceRate = this.data.Pricing.serviceRates[service];
        const mileageRate = this.data.Pricing.mileageRate;
        const minimumCharge = this.data.Pricing.minimumCharge;
        const rushSurcharge = this.data.Pricing.rushSurcharge;
        
        let subtotal = serviceRate + (distance * mileageRate);
        subtotal = Math.max(subtotal, minimumCharge);
        
        const rushCharge = isRush ? subtotal * (rushSurcharge - 1) : 0;
        const total = subtotal + rushCharge;
        
        const breakdown = `
            <div class="pricing-row">
                <span>Service (${service}):</span>
                <span>$${serviceRate.toFixed(2)}</span>
            </div>
            <div class="pricing-row">
                <span>Mileage (${distance} km @ $${mileageRate}/km):</span>
                <span>$${(distance * mileageRate).toFixed(2)}</span>
            </div>
            <div class="pricing-row">
                <span>Subtotal:</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            ${rushCharge > 0 ? `
                <div class="pricing-row">
                    <span>Rush Surcharge (50%):</span>
                    <span>$${rushCharge.toFixed(2)}</span>
                </div>
            ` : ''}
            <div class="pricing-row">
                <span><strong>Total:</strong></span>
                <span><strong>$${total.toFixed(2)}</strong></span>
            </div>
        `;
        
        document.getElementById('priceResult').style.display = 'block';
        document.getElementById('priceBreakdown').innerHTML = breakdown;
    }

    renderPricing() {
        const container = document.getElementById('pricingContainer');
        const pricing = this.data.Pricing;
        
        container.innerHTML = `
            <div class="pricing-grid">
                <div class="pricing-section">
                    <h3>Service Rates</h3>
                    <div class="service-rates">
                        ${Object.entries(pricing.serviceRates).map(([service, rate]) => `
                            <div class="rate-card">
                                <div class="rate-service">${service}</div>
                                <div class="rate-amount">$${rate.toFixed(2)}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="pricing-section">
                    <h3>Additional Charges</h3>
                    <div class="pricing-row">
                        <span>Mileage Rate:</span>
                        <span>$${pricing.mileageRate.toFixed(2)}/km</span>
                    </div>
                    <div class="pricing-row">
                        <span>Minimum Charge:</span>
                        <span>$${pricing.minimumCharge.toFixed(2)}</span>
                    </div>
                    <div class="pricing-row">
                        <span>Rush Surcharge:</span>
                        <span>${((pricing.rushSurcharge - 1) * 100).toFixed(0)}%</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Dashboard Methods
    renderDashboard() {
        const container = document.getElementById('dashboardContainer');
        const analytics = this.calculateAnalytics();
        
        container.innerHTML = `
            <div class="dashboard-grid">
                <div class="dashboard-card">
                    <div class="dashboard-card-icon">
                        <i class="fas fa-dollar-sign"></i>
                    </div>
                    <div class="dashboard-card-title">Monthly Revenue</div>
                    <div class="dashboard-card-value">$${analytics.monthlyRevenue.toFixed(2)}</div>
                    <div class="dashboard-card-change positive">+${analytics.monthlyGrowth.toFixed(1)}%</div>
                </div>
                <div class="dashboard-card">
                    <div class="dashboard-card-icon">
                        <i class="fas fa-file-invoice"></i>
                    </div>
                    <div class="dashboard-card-title">Total Invoices</div>
                    <div class="dashboard-card-value">${analytics.totalInvoices}</div>
                    <div class="dashboard-card-change positive">+${analytics.invoiceGrowth}</div>
                </div>
                <div class="dashboard-card">
                    <div class="dashboard-card-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="dashboard-card-title">Pending Invoices</div>
                    <div class="dashboard-card-value">${analytics.pendingInvoices}</div>
                    <div class="dashboard-card-change">$${analytics.pendingAmount.toFixed(2)}</div>
                </div>
                <div class="dashboard-card">
                    <div class="dashboard-card-icon">
                        <i class="fas fa-route"></i>
                    </div>
                    <div class="dashboard-card-title">Routes Optimized</div>
                    <div class="dashboard-card-value">${analytics.routesOptimized}</div>
                    <div class="dashboard-card-change positive">This month</div>
                </div>
            </div>
            <div class="dashboard-chart">
                <h3>Monthly Breakdown</h3>
                <div class="monthly-breakdown">
                    ${analytics.monthlyBreakdown.map(month => `
                        <div class="month-item">
                            <div class="month-name">${month.name}</div>
                            <div class="month-amount">$${month.amount.toFixed(2)}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="dashboard-chart">
                <h3>Yearly Totals</h3>
                <div class="pricing-section">
                    <div class="pricing-row">
                        <span>Total Revenue:</span>
                        <span>$${analytics.yearlyRevenue.toFixed(2)}</span>
                    </div>
                    <div class="pricing-row">
                        <span>Total Jobs:</span>
                        <span>${analytics.totalJobs}</span>
                    </div>
                    <div class="pricing-row">
                        <span>Average Job Value:</span>
                        <span>$${analytics.averageJobValue.toFixed(2)}</span>
                    </div>
                    <div class="pricing-row">
                        <span>Top Service:</span>
                        <span>${analytics.topService}</span>
                    </div>
                </div>
            </div>
        `;
    }

    calculateAnalytics() {
        const invoices = this.data.Invoices || [];
        const charges = this.data.Charges || [];
        const routes = this.data.Routes || [];
        
        // Calculate current month revenue
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        const monthlyRevenue = invoices
            .filter(inv => {
                const invDate = new Date(inv.date);
                return invDate.getMonth() === currentMonth && invDate.getFullYear() === currentYear;
            })
            .reduce((sum, inv) => sum + inv.total, 0);
        
        // Calculate yearly revenue
        const yearlyRevenue = invoices
            .filter(inv => new Date(inv.date).getFullYear() === currentYear)
            .reduce((sum, inv) => sum + inv.total, 0);
        
        // Calculate monthly breakdown
        const monthlyBreakdown = Array.from({length: 12}, (_, i) => {
            const monthRevenue = invoices
                .filter(inv => {
                    const invDate = new Date(inv.date);
                    return invDate.getMonth() === i && invDate.getFullYear() === currentYear;
                })
                .reduce((sum, inv) => sum + inv.total, 0);
            
            return {
                name: new Date(currentYear, i).toLocaleDateString('en-US', {month: 'short'}),
                amount: monthRevenue
            };
        });
        
        // Calculate service statistics
        const serviceStats = {};
        const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        let totalJobs = 0;
        
        allDays.forEach(day => {
            const dayData = this.data[day] || [];
            totalJobs += dayData.length;
            dayData.forEach(item => {
                const service = item.Service || 'Unknown';
                serviceStats[service] = (serviceStats[service] || 0) + 1;
            });
        });
        
        const topService = Object.entries(serviceStats).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';
        
        return {
            monthlyRevenue,
            monthlyGrowth: 12.5, // Mock growth rate
            totalInvoices: invoices.length,
            invoiceGrowth: 3, // Mock growth
            pendingInvoices: invoices.filter(inv => inv.status === 'pending').length,
            pendingAmount: invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.total, 0),
            routesOptimized: routes.length,
            yearlyRevenue,
            totalJobs,
            averageJobValue: yearlyRevenue / Math.max(totalJobs, 1),
            topService,
            monthlyBreakdown
        };
    }

    refreshDashboard() {
        this.renderDashboard();
    }

    exportAnalyticsReport() {
        const analytics = this.calculateAnalytics();
        const report = {
            generatedAt: new Date().toISOString(),
            summary: analytics,
            invoices: this.data.Invoices,
            charges: this.data.Charges,
            routes: this.data.Routes
        };
        
        const dataStr = JSON.stringify(report, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `analytics-report-${new Date().toISOString().split('T')[0]}.json`;
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new WorkScheduleManager();
});