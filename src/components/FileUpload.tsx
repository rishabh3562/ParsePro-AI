import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {checkAndAddInvoice } from '../store/slices/invoicesSlice';
import {checkAndAddProduct} from '../store/slices/productsSlice';
import { checkAndAddCustomer} from '../store/slices/customersSlice';
import { extractDataFromImage, extractDataFromPDF, processExcelData } from '../services/aiService';
import * as XLSX from 'xlsx';

interface FileUploadProps {
  onUploadStart: () => void;
  onUploadComplete: () => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onUploadStart, onUploadComplete }) => {
  const dispatch = useDispatch();



  const processFile = async (file: File) => {
    onUploadStart();
    try {
      let data;

      if (file.type.includes('image')) {
        data = await extractDataFromImage(file);
      } else if (file.type.includes('pdf')) {
        data = await extractDataFromPDF(file);
      } else if (file.type.includes('sheet') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        const reader = new FileReader();
        const result = await new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target?.result);
          reader.readAsBinaryString(file);
        });

        const workbook = XLSX.read(result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        console.log("excelData",excelData)
        data = await processExcelData(excelData);
      } else {
        throw new Error('Unsupported file format');
      }

      if (data) {
        // Dispatch the thunk actions to check and add the relevant data
        let result;

        // Check and add invoices
        if (data.serial_number) {
          result = await dispatch(checkAndAddInvoice(data) as any);
          // console.log("result of invoice data in upload.tsx", result)

          if (result.error) {
            toast.error(result.error as string);
            return;
          }
          toast.success(result.success as string);
        }

        // Check and add products
        if (data.product_details) {
          result = await dispatch(checkAndAddProduct(data) as any);
          // console.log("result of product data in upload.tsx",result)
          if (result.error) {
            toast.error(result.error as string);
            return;
          }
          toast.success(result.success as string);
        }

        // Check and add customers
        if (data.customer_name) {
          result = await dispatch(checkAndAddCustomer(data) as any);
          // console.log("result of customer data in upload.tsx", result)

          if (result.error) {
            toast.error(result.error as string);
            return;
          }
          toast.success(result.success as string);
        }
      }


    } catch (error: any) {
      console.error('Error processing file:', error);
      toast.error(error.message || 'Error processing file. Please try again.');
    } finally {
      onUploadComplete();
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(processFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        {isDragActive
          ? 'Drop the files here...'
          : 'Drag & drop files here, or click to select files'}
      </p>
      <p className="mt-1 text-xs text-gray-500">
        Supports PDF, Images (PNG, JPG), and Excel files (XLSX, XLS)
      </p>
    </div>
  );
};


/*
    if (data) {
        // Check for existing invoice in Redux state
        const existingInvoice = invoicesFromStore?.find((invoice: any) =>
          invoice.serialNumber === data.serial_number
        );
        console.log("invoicesFromStore just before existingInvoice 🥲🥲🥲",invoicesFromStore)
        console.log("existingInvoice 🥲🥲🥲", existingInvoice)
        if (existingInvoice) {
          toast.error('File with this serial number and date already exists');
          return;
        }

        const inv: any = {
          id: `${data.serial_number}-${Date.now()}`,
          serialNumber: data.serial_number,
          customerName: data.customer_name,
          productName: formatProductNames(data.product_details),
          quantity: data.product_details.length,
          tax: data.tax_amount,
          totalAmount: data.total_amount,
          date: data.date,
        };

        await dispatch(addInvoices([inv])); // Add invoice to Redux store

        if (data.product_details) {
          const products: any = data.product_details.map((product: any, index: number) => {
            const tax_by_calc = product.GST_amount
              ? product.GST_amount
              : product.GST_percentage
                ? (product.GST_percentage * product.unit_price * product.quantity) / 100
                : 0;

            return {
              id: `${data.serial_number}-${index}`,
              serialNumber: data.serial_number,
              customerName: data.customer_name,
              productName: product.name,
              quantity: product.quantity,
              unitPrice: product.unit_price,
              GSTPercentage: product.GST_percentage || 0,
              GSTAmount: tax_by_calc,
              totalAmount: product.quantity * product.unit_price + tax_by_calc - (product.discount || 0),
              discount: product.discount || 0,
              date: data.date,
            };
          });

          dispatch(addProducts(products)); // Add products to Redux store
        }

        const customers: any = [
          {
            serialNumber: data.serial_number,
            customerName: data.customer_name,
            phoneNumber: data.customer_phone_number || "N/A",
            address: data.customer_address ? data.customer_address.replace(/\n/g, ", ").trim() : "N/A",
            totalAmount: data.total_amount,
            bankDetails: data.bank_details || {},
            taxableAmount: data.taxable_amount,
            taxAmount: data.tax_amount,
            lastPurchaseDate: data.date,
          },
        ];
        dispatch(addCustomers(customers)); // Add customers to Redux store

        toast.success('File processed successfully');
      }
*/
