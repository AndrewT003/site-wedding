const { google } = require('googleapis');
const path = require('path');

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || '1eCQM5fRz2bugHyKw8QFxmCplvzrpcS7oyD5tkV6z27E';
const SHEET_NAME = process.env.GOOGLE_SHEETS_SHEET_NAME || 'Sheet1';
const CREDENTIALS_PATH = process.env.GOOGLE_SHEETS_CREDENTIALS_PATH
  ? path.resolve(process.env.GOOGLE_SHEETS_CREDENTIALS_PATH)
  : path.join(__dirname, '..', 'credentials', 'credentials.json');

// Initialize Google Sheets API client
async function getGoogleSheetsClient() {
  try {
    let auth;

    // Використовуємо змінну середовища GOOGLE_CREDENTIALS якщо доступна (для production)
    if (process.env.GOOGLE_CREDENTIALS) {
      console.log('Using GOOGLE_CREDENTIALS environment variable');
      const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
      auth = new google.auth.GoogleAuth({
        credentials: credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
    } else {
      // Локальна розробка - використовуємо файл
      console.log('Using credentials file:', CREDENTIALS_PATH);
      auth = new google.auth.GoogleAuth({
        keyFile: CREDENTIALS_PATH,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
    }

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    return sheets;
  } catch (error) {
    console.error('Error initializing Google Sheets client:', error);
    throw error;
  }
}

// Format timestamp
function getCurrentTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Append form data to Google Sheets
async function appendFormData(formData) {
  try {
    console.log('Attempting to append form data:', formData);
    const sheets = await getGoogleSheetsClient();

    // Prepare row data
    const timestamp = getCurrentTimestamp();
    const drinks = Array.isArray(formData.drinks) ? formData.drinks.join(', ') : '';

    const rowData = [
      timestamp,
      formData.name,
      formData.willAttend,
      drinks,
      formData.food || ''
    ];

    console.log('Row data to append:', rowData);

    // Append to sheet
    const request = {
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:E`,
      valueInputOption: 'RAW',
      resource: {
        values: [rowData]
      }
    };

    console.log('Appending to spreadsheet:', SPREADSHEET_ID, 'sheet:', SHEET_NAME);
    await sheets.spreadsheets.values.append(request);
    console.log('Data appended successfully to Google Sheets');

  } catch (error) {
    console.error('Error appending data to Google Sheets:', error);
    console.error('Error details:', error.message);
    if (error.response) {
      console.error('API response:', error.response.data);
    }
    throw error;
  }
}

module.exports = {
  appendFormData
};
