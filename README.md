# Mail Delivery Manager

A modern, responsive web application for managing mail delivery schedules, customer contacts, and ad-hoc services. Built with HTML5, CSS3, and JavaScript, this app provides an intuitive interface for viewing, editing, and managing your daily delivery schedule on desktop and mobile devices.

## Features

### 📅 Schedule Management
- **Daily Schedule View**: Navigate through Monday to Friday schedules
- **Add/Edit/Delete Entries**: Full CRUD operations for schedule items
- **Time-based Organization**: Chronological display of daily tasks
- **Service Type Categorization**: Different service types (Australia Post, Secure Cash, Mail Plus, etc.)

### 📋 Contact Management
- **Customer Contact List**: Comprehensive contact database
- **Business Information**: Store business names, addresses, contact persons, and phone numbers
- **Notes Support**: Add important notes for each contact
- **Easy Editing**: Click any contact to edit details

### ⏰ Ad-hoc Services
- **Irregular Tasks**: Manage tasks that don't follow a regular schedule
- **Flexible Scheduling**: Track ad-hoc pickups and deliveries
- **Service Categorization**: Organize by service type and frequency

### 🔍 Search & Filter
- **Global Search**: Search across all businesses, addresses, and contacts
- **Day Filter**: Filter schedule by specific days
- **Service Filter**: Filter by service type
- **Real-time Results**: Instant search results as you type

### 📱 Mobile Responsive
- **Touch-friendly Interface**: Optimized for mobile devices
- **Swipe Navigation**: Easy day switching on mobile
- **Responsive Layout**: Adapts to all screen sizes
- **Offline Capable**: Works without internet connection

### 💾 Data Management
- **Local Storage**: Automatic data persistence in browser
- **Import/Export**: JSON file import and export functionality
- **Backup & Restore**: Easy data backup and migration
- **Reset Option**: Restore to default schedule data

## Getting Started

### Local Installation
1. Download all files to a folder on your device
2. Open `index.html` in your web browser
3. The app will automatically load with your complete schedule data

### Deploy to GitHub Pages
For production deployment, see [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

Quick deployment steps:
1. Create a new GitHub repository
2. Upload all project files
3. Enable GitHub Pages in repository settings
4. Your app will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Basic Usage

#### Viewing Your Schedule
1. **Daily View**: Click on day buttons (Mon, Tue, Wed, Thu, Fri) to view daily schedules
2. **Entry Details**: Each schedule item shows:
   - Time
   - Business name
   - Service type
   - Address
   - Contact information
   - Detailed instructions
   - Parking information
   - Notes

#### Adding New Entries
1. **Schedule Entry**: Click the floating + button or use the day-specific add button
2. **Contact**: Go to Contacts tab and click "Add Contact"
3. **Ad-hoc Service**: Go to Ad-hoc tab and click "Add Ad-hoc"

#### Editing Existing Entries
1. Click on any schedule item, contact, or ad-hoc service
2. Edit the details in the modal form
3. Click "Save" to update or "Delete" to remove

### Navigation

#### Tab Navigation
- **Schedule**: View and manage daily schedules
- **Contacts**: Manage customer contact information
- **Ad-hoc**: Handle irregular services and tasks

#### Header Functions
- **Export**: Download your data as a JSON file
- **Import**: Upload a JSON file to restore data
- **Reset**: Restore to original schedule data

### Data Management

#### Automatic Saving
- All changes are automatically saved to browser storage
- No manual save required
- Data persists between browser sessions

#### Backup Your Data
1. Click "Export" in the header
2. Save the JSON file to your device
3. Keep multiple backups for safety

#### Restore Data
1. Click "Import" in the header
2. Select your JSON backup file
3. Confirm to restore data

## Technical Details

### File Structure
```
mail-delivery-manager/
├── index.html          # Main application file
├── styles.css          # Styling and responsive design
├── script.js           # Main application logic
├── data-loader.js      # Complete schedule data
└── README.md          # This documentation
```

### Browser Compatibility
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Storage
- Uses localStorage for data persistence
- No server required
- Works offline
- Data stored locally on device

### Performance
- Lightweight design
- Fast loading
- Smooth animations
- Optimized for mobile

## Customization

### Adding New Service Types
Edit the service dropdown options in the `createEditForm` function in `script.js`:
```javascript
<option value="Your Service">Your Service</option>
```

### Modifying Schedule Structure
The data structure is flexible and can be extended. Each schedule item supports:
- Time
- Business Name
- Service
- Address
- Contact Name
- Customer Contact
- Parking Location
- Details
- Notes

### Styling Changes
Modify `styles.css` to customize:
- Color scheme
- Fonts
- Layout
- Animations
- Mobile responsiveness

## Tips for Daily Use

### Best Practices
1. **Regular Backups**: Export your data weekly
2. **Consistent Naming**: Use consistent business names for easy searching
3. **Detailed Notes**: Add important notes for each location
4. **Update Contacts**: Keep contact information current
5. **Review Schedule**: Check and update your schedule regularly

### Mobile Usage
- Use landscape mode for better viewing
- Tap and hold for additional options
- Swipe between days for quick navigation
- Use the search function to find specific businesses quickly

### Troubleshooting
- **Data Not Saving**: Check browser storage permissions
- **Import Issues**: Ensure JSON file is valid
- **Display Problems**: Clear browser cache and refresh
- **Mobile Issues**: Try different orientation or zoom level

## Support

For issues or questions:
1. Check this README for common solutions
2. Verify browser compatibility
3. Try clearing browser cache
4. Check browser console for error messages

## Deployment

This application is designed to be deployed to GitHub Pages for easy access from any device.

### Production Deployment
- **GitHub Pages**: Automatic deployment via GitHub Actions
- **Custom Domain**: Support for custom domain configuration
- **HTTPS**: Secure by default on GitHub Pages
- **Mobile Optimized**: Responsive design works on all devices

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment instructions.

## License

This project is open source and available under the MIT License.

---

**Version**: 1.0.0  
**Last Updated**: 2024

Enjoy managing your mail delivery schedule efficiently! 🚀