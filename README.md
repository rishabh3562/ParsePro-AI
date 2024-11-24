# ParsePro AI

## Overview
This project is a **React** web application designed to automate the extraction, processing, and management of invoice data from various file formats (Excel, PDF, Images). The app organizes extracted data into three sections: **Invoices**, **Products**, and **Customers**, and synchronizes changes across tabs in real-time using **Redux** for consistent state updates.

## Features
- **File Upload**: Accepts Excel, PDF, and image files containing invoice, product, and customer data.
- **AI-Powered Data Extraction**: Extracts relevant information from files using Google Gemini API (or an alternative AI solution).
- **Dynamic Tabs**: Displays extracted data in **Invoices**, **Products**, and **Customers** tabs with editable tables.
- **Real-Time Updates**: Changes made in one tab (e.g., updating a product name) instantly reflect in related sections (Invoices).
- **Data Validation**: Ensures data completeness and highlights missing information with user-friendly prompts.
- **Error Handling**: Provides feedback for unsupported file formats and extraction errors.
- **State Management**: Uses **Redux** for centralized state management and real-time data synchronization.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **State Management**: Redux Toolkit
- **AI Integration**: Google Gemini API (for data extraction from files)
- **File Parsing**: Excel (`xlsx`), PDF and Image parsing (via AI-powered solutions)
- **Deployment**: Vercel
## Installation

### 1. Clone the repository:
```bash
git clone https://github.com/your-username/invoice-management-app.git
cd invoice-management-app
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Run the app locally:
```bash
npm start
```
The app will be available at `http://localhost:3000`.

## Usage

1. Upload an invoice file (Excel, PDF, or Image) through the **File Upload** section.
2. The app will automatically extract data from the uploaded file and display it in the **Invoices**, **Products**, and **Customers** tabs.
3. Any changes made in the **Products** or **Customers** tabs will reflect in the **Invoices** tab in real time.

## Testing
- The app has been tested using various file formats (Invoice PDFs, Excel files, and a combination of both).
- If a file contains missing data, the app will highlight the missing fields and prompt the user for input.

## Deployment
- The app is deployed on **Vercel** and can be accessed [here](https://parse-pro-ai.vercel.app/).


