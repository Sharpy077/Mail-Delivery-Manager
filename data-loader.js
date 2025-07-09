// Sample data for Mail Delivery Manager
const defaultScheduleData = {
    schedule: {
        Monday: [
            {
                id: "m1",
                time: "09:00",
                business: "Hawthorn Post Office",
                service: "Aus Post",
                address: "123 Glenferrie Rd, Hawthorn VIC 3122",
                contactName: "John Smith",
                customerContact: "03 9818 1234",
                parking: "Street parking available",
                details: "Collect registered mail and parcels. Check for any special deliveries.",
                notes: "Busy on Mondays - arrive early to avoid queues."
            },
            {
                id: "m2",
                time: "10:30",
                business: "Secure Cash Solutions",
                service: "Secure Cash",
                address: "456 Auburn Rd, Hawthorn VIC 3122",
                contactName: "Sarah Johnson",
                customerContact: "03 9818 5678",
                parking: "Designated parking bay",
                details: "Cash collection and delivery. Verify amounts before signing.",
                notes: "Requires security clearance - bring ID."
            },
            {
                id: "m3",
                time: "14:00",
                business: "Mail Plus Hawthorn",
                service: "Mail Plus",
                address: "789 Burwood Rd, Hawthorn VIC 3122",
                contactName: "Mike Wilson",
                customerContact: "03 9818 9012",
                parking: "Rear parking lot",
                details: "Package pickup and delivery. Check for fragile items.",
                notes: "New location - confirm address before arrival."
            }
        ],
        Tuesday: [
            {
                id: "t1",
                time: "08:30",
                business: "Australia Post Hawthorn East",
                service: "Aus Post",
                address: "234 Glenferrie Rd, Hawthorn East VIC 3123",
                contactName: "Lisa Brown",
                customerContact: "03 9818 3456",
                parking: "Customer parking area",
                details: "Express post collection and delivery.",
                notes: "Early start required for express items."
            },
            {
                id: "t2",
                time: "11:00",
                business: "Hawthorn Banking Centre",
                service: "Banking",
                address: "567 Auburn Rd, Hawthorn VIC 3122",
                contactName: "David Lee",
                customerContact: "03 9818 7890",
                parking: "Underground parking",
                details: "Document delivery and cash handling.",
                notes: "Security protocols apply - follow all procedures."
            }
        ],
        Wednesday: [
            {
                id: "w1",
                time: "09:15",
                business: "Mail Plus Auburn",
                service: "Mail Plus",
                address: "890 Auburn Rd, Hawthorn VIC 3122",
                contactName: "Emma Davis",
                customerContact: "03 9818 2345",
                parking: "Street parking",
                details: "Regular mail collection and sorting.",
                notes: "Check for priority items first."
            },
            {
                id: "w2",
                time: "13:30",
                business: "Secure Cash Hawthorn",
                service: "Secure Cash",
                address: "123 Burwood Rd, Hawthorn VIC 3122",
                contactName: "Tom Anderson",
                customerContact: "03 9818 6789",
                parking: "Secure parking area",
                details: "Cash delivery and collection. Verify all amounts.",
                notes: "High security location - follow all protocols."
            }
        ],
        Thursday: [
            {
                id: "th1",
                time: "08:45",
                business: "Hawthorn Post Office",
                service: "Aus Post",
                address: "123 Glenferrie Rd, Hawthorn VIC 3122",
                contactName: "John Smith",
                customerContact: "03 9818 1234",
                parking: "Street parking available",
                details: "Regular mail collection and delivery.",
                notes: "Thursday is usually less busy."
            },
            {
                id: "th2",
                time: "12:00",
                business: "Mail Plus Glenferrie",
                service: "Mail Plus",
                address: "456 Glenferrie Rd, Hawthorn VIC 3122",
                contactName: "Rachel Green",
                customerContact: "03 9818 4567",
                parking: "Customer parking",
                details: "Package handling and delivery services.",
                notes: "Check for oversized packages."
            }
        ],
        Friday: [
            {
                id: "f1",
                time: "09:00",
                business: "Australia Post Hawthorn",
                service: "Aus Post",
                address: "123 Glenferrie Rd, Hawthorn VIC 3122",
                contactName: "John Smith",
                customerContact: "03 9818 1234",
                parking: "Street parking available",
                details: "Weekend delivery preparation and collection.",
                notes: "Friday is busy - allow extra time."
            },
            {
                id: "f2",
                time: "11:30",
                business: "Secure Cash Solutions",
                service: "Secure Cash",
                address: "456 Auburn Rd, Hawthorn VIC 3122",
                contactName: "Sarah Johnson",
                customerContact: "03 9818 5678",
                parking: "Designated parking bay",
                details: "Weekly cash collection and delivery.",
                notes: "Important to complete all Friday collections."
            },
            {
                id: "f3",
                time: "15:00",
                business: "Mail Plus Hawthorn",
                service: "Mail Plus",
                address: "789 Burwood Rd, Hawthorn VIC 3122",
                contactName: "Mike Wilson",
                customerContact: "03 9818 9012",
                parking: "Rear parking lot",
                details: "Final package collection for the week.",
                notes: "Ensure all items are properly secured for weekend."
            }
        ]
    },
    contacts: [
        {
            id: "c1",
            business: "Hawthorn Post Office",
            contactName: "John Smith",
            address: "123 Glenferrie Rd, Hawthorn VIC 3122",
            phone: "03 9818 1234",
            notes: "Main post office contact. Available Monday to Friday."
        },
        {
            id: "c2",
            business: "Secure Cash Solutions",
            contactName: "Sarah Johnson",
            address: "456 Auburn Rd, Hawthorn VIC 3122",
            phone: "03 9818 5678",
            notes: "Security clearance required. Contact before arrival."
        },
        {
            id: "c3",
            business: "Mail Plus Hawthorn",
            contactName: "Mike Wilson",
            address: "789 Burwood Rd, Hawthorn VIC 3122",
            phone: "03 9818 9012",
            notes: "Package handling specialist. Check for fragile items."
        },
        {
            id: "c4",
            business: "Australia Post Hawthorn East",
            contactName: "Lisa Brown",
            address: "234 Glenferrie Rd, Hawthorn East VIC 3123",
            phone: "03 9818 3456",
            notes: "Express post services available."
        },
        {
            id: "c5",
            business: "Hawthorn Banking Centre",
            contactName: "David Lee",
            address: "567 Auburn Rd, Hawthorn VIC 3122",
            phone: "03 9818 7890",
            notes: "Banking documents and cash handling."
        },
        {
            id: "c6",
            business: "Mail Plus Auburn",
            contactName: "Emma Davis",
            address: "890 Auburn Rd, Hawthorn VIC 3122",
            phone: "03 9818 2345",
            notes: "Regular mail services and sorting."
        },
        {
            id: "c7",
            business: "Secure Cash Hawthorn",
            contactName: "Tom Anderson",
            address: "123 Burwood Rd, Hawthorn VIC 3122",
            phone: "03 9818 6789",
            notes: "High security cash handling facility."
        },
        {
            id: "c8",
            business: "Mail Plus Glenferrie",
            contactName: "Rachel Green",
            address: "456 Glenferrie Rd, Hawthorn VIC 3122",
            phone: "03 9818 4567",
            notes: "Package delivery and handling services."
        }
    ],
    adhoc: [
        {
            id: "a1",
            title: "Special Delivery - Fragile Items",
            service: "Mail Plus",
            business: "Hawthorn Antiques",
            address: "321 Glenferrie Rd, Hawthorn VIC 3122",
            contactName: "Margaret White",
            customerContact: "03 9818 1111",
            frequency: "As needed",
            details: "Handle with extreme care. Fragile antique items require special packaging.",
            notes: "Call ahead to confirm delivery time. Insurance required."
        },
        {
            id: "a2",
            title: "Emergency Cash Delivery",
            service: "Secure Cash",
            business: "Hawthorn Medical Centre",
            address: "654 Auburn Rd, Hawthorn VIC 3122",
            contactName: "Dr. Robert Chen",
            customerContact: "03 9818 2222",
            frequency: "Emergency only",
            details: "Emergency cash delivery for medical supplies. Priority service.",
            notes: "24/7 emergency contact available. Security escort required."
        },
        {
            id: "a3",
            title: "Express Document Delivery",
            service: "Aus Post",
            business: "Hawthorn Legal Services",
            address: "987 Burwood Rd, Hawthorn VIC 3122",
            contactName: "Amanda Foster",
            customerContact: "03 9818 3333",
            frequency: "On demand",
            details: "Legal document delivery. Requires signature confirmation.",
            notes: "Time-sensitive documents. Handle with confidentiality."
        }
    ]
};

// Initialize data in localStorage if not already present
if (!localStorage.getItem('mailDeliveryData')) {
    localStorage.setItem('mailDeliveryData', JSON.stringify(defaultScheduleData));
}

// Function to get current data
function getCurrentData() {
    const data = localStorage.getItem('mailDeliveryData');
    return data ? JSON.parse(data) : defaultScheduleData;
}

// Function to save data
function saveData(data) {
    localStorage.setItem('mailDeliveryData', JSON.stringify(data));
}

// Function to reset data to default
function resetToDefault() {
    localStorage.setItem('mailDeliveryData', JSON.stringify(defaultScheduleData));
    return defaultScheduleData;
}

// Export functions for use in main script
window.MailDeliveryData = {
    getCurrentData,
    saveData,
    resetToDefault,
    defaultScheduleData
};