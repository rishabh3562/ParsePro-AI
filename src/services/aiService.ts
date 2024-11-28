import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_REACT_GOOGLE_API_KEY || '');
const parseGeminiResponse = (responseText: string): any => {
  try {
    // Remove the surrounding markdown formatting
    const jsonString = responseText.replace(/```json\n|\n```/g, '');
    
    // Parse the JSON string
    const jsonObject = JSON.parse(jsonString);
    
    return jsonObject;
  } catch (error) {
    console.error('Error parsing Gemini response:', error);
    throw error;
  }
};

export const extractDataFromImage = async (file: File): Promise<any> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const imageData = await file.arrayBuffer();
    const uint8Array = new Uint8Array(imageData);
    let binary = '';
    for (let i = 0; i < uint8Array.length; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
    const base64Image = btoa(binary);
    
    const response = await model.generateContent([
      // 'Extract the following information from this invoice image in JSON format: serial number, customer name, product details (name, quantity, unit price), tax amount, total amount, and date. Format the response as valid JSON.',
      // 'Extract the following information from this invoice image in JSON format: serial number, customer name, customer phone number, product details (name, quantity, unit price), discount percentage, tax percentage, tax amount, total amount, and date. Format the response as valid JSON.',
      // 'Extract the following information from this invoice image in JSON format: serial number, customer name, customer phone number,customer address, product details (name, quantity, unit price), discount percentage, tax percentage, tax amount, making charges, debit card charges, shipping charges, taxable amount, CGST, SGST, total amount, date, and bank details (bank name, account number, IFSC code, branch, beneficiary name, UPI). Format the response as valid JSON',
      'Extract the following information from this invoice image in JSON format: serial number (invoice number or unique identifier), customer name, customer phone number, customer address, product details (name, quantity, unit price, GST percentage, GST amount), discount percentage, tax percentage, tax amount, making charges, debit card charges, shipping charges, taxable amount, CGST, SGST, total amount, date, and bank details (bank name, account number, IFSC code, branch, beneficiary name, UPI). Format the response as valid JSON.',
      {
        inlineData: {
          mimeType: file.type,
          data: base64Image,
        },
      },
    ]);

    const resultText = await response.response.text();
    // console.log('API Response:', resultText); // Log the response text
    const result = parseGeminiResponse(resultText); // Parse the response text
    // console.log('Parsed Result:', result); // Log the parsed result
    return result;
  } catch (error) {
    console.error('Error extracting data from image:', error);
    throw error;
  }
};



export const extractDataFromPDF = async (file: File): Promise<any> => {
  // Similar to image extraction but with PDF-specific processing
  // Implementation would depend on the PDF processing library chosen
  return extractDataFromImage(file); // Fallback to image processing for now
};

export const processExcelData = async (data: any[]): Promise<any> => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  // console.log('the data provided in parsexcel',data);
 
  // const response = await model.generateContent(`
  //  Extract the following information from this Excel data in JSON format: serial number (invoice number or unique identifier), customer name, customer phone number, customer address, product details (name, quantity, unit price, GST percentage, GST amount), discount percentage, tax percentage, tax amount, making charges, debit card charges, shipping charges, taxable amount, CGST, SGST, total amount, date, and bank details (bank name, account number, IFSC code, branch, beneficiary name, UPI). Format the response as valid JSON:
  //   ${JSON.stringify(data)}
    
  // `);
 const schema = `    {
      "serial_number": "<Invoice number or unique identifier>",
      "customer_name": "<Customer name or 'Unknown'>", 
      "customer_phone_number": "<Phone number or 'Unknown'>", 
      "customer_address": "<Address or 'Unknown'>", 
      "product_details": [
        {
          "name": "<Product name>",
          "quantity": "<Quantity>",
          "unit_price": "<Unit price>",
          "GST_percentage": "<GST percentage or null>", 
          "GST_amount": "<GST amount or null>"
        },
        {
          "name": "<Product name>",
          "quantity": "<Quantity>",
          "unit_price": "<Unit price>",
          "GST_percentage": "<GST percentage or null>", 
          "GST_amount": "<GST amount or null>"
        },
        ...
      ],
      "discount_percentage": "<Discount percentage or null>",
      "tax_percentage": "<Tax percentage or null>",
      "tax_amount": "<Tax amount or null>",
      "making_charges": "<Making charges or null>",
      "debit_card_charges": "<Debit card charges or null>",
      "shipping_charges": "<Shipping charges or null>",
      "taxable_amount": "<Taxable amount or null>",
      "CGST": "<CGST or null>",
      "SGST": "<SGST or null>",
      "total_amount": "<Total amount>",
      "date": "<Invoice date>",
      "bank_details": {
        "bank_name": "<Bank name or 'Unknown'>",
        "account_number": "<Account number or 'Unknown'>",
        "IFSC_code": "<IFSC code or 'Unknown'>",
        "branch": "<Branch or 'Unknown'>",
        "beneficiary_name": "<Beneficiary name or 'Unknown'>",
        "UPI": "<UPI or 'Unknown'>"
      }
    }`;
    const newschema = `    {
      "serial_number": "<Invoice number or unique identifier>",
      "customer_name": "<Customer name or 'Unknown'>", 
      "customer_phone_number": "<Phone number or 'Unknown'>", 
      "customer_address": "<Address or 'Unknown'>", 
      "product_details": [
        {
          "name": "<Product name>",
          "quantity": "<Quantity>",
          "unit_price": "<Unit price>",
          "GST_percentage": "<GST percentage or null>", 
          "GST_amount": "<GST amount or null>"
        },
        {
          "name": "<Product name>",
          "quantity": "<Quantity>",
          "unit_price": "<Unit price>",
          "GST_percentage": "<GST percentage or null>", 
          "GST_amount": "<GST amount or null>"
        },
        ...
      ],
    
      "tax_percentage": "<Tax percentage or null>",
      "tax_amount": "<Tax amount or null>",
     
     
      "shipping_charges": "<Shipping charges or null>",
      "taxable_amount": "<Taxable amount or null>",
      "CGST": "<CGST or null>",
      "SGST": "<SGST or null>",
      "total_amount": "<Total amount>",
      "date": "<Invoice date>",
    }`;
const response = await model.generateContent(`
    Extract the following information from the provided data in JSON format, ensuring the response follows this schema exactly: serial number (invoice number or unique identifier), customer name, customer phone number, customer address, product details (name, quantity, unit price, GST percentage, GST amount), discount percentage, tax percentage, tax amount, making charges, debit card charges, shipping charges, taxable amount, CGST, SGST, total amount, date, and bank details (bank name, account number, IFSC code, branch, beneficiary name, UPI). If any information is missing or unavailable, please use null or "Unknown" as appropriate. 

    **Important: Only provide one object, not an array of objects.**

    The required JSON structure is as follows:
${schema}

    Key Notes:
    - Only one object should be returned, not an array.
    - The product details section should list all products, and the necessary calculations should be made based on the provided data.
    - Ensure all required fields are populated, and missing data should be set to null or "Unknown" as appropriate.

    The data to work upon is ${JSON.stringify(data)}
`);

/*
//naya wala
const response = await model.generateContent(`
    Process this Excel data and format it into proper invoice, product, and customer data:
    ${JSON.stringify(data)}
    Extract the following information and return as valid JSON:
    1. Invoices (serial number, customer name, customer phone number, customer address, discount percentage, tax percentage, making charges, debit card charges, shipping charges, taxable amount, CGST, SGST, total amount, date, bank details (bank name, account number, IFSC code, branch, beneficiary name, UPI)).
    2. Products (name, quantity, unit price, GST percentage, GST amount).
    3. Customers (customer name, phone number, address).
    Return the result with three arrays: invoices, products, and customers.
`);

*/
 const resultText = await response.response.text();
    // console.log('API Response:', resultText); // Log the response text
    const result = parseGeminiResponse(resultText); // Parse the response text
    console.log('Parsed Result:', result); // Log the parsed result
    return result;
  return JSON.parse(result);
};