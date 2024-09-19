// pages/api/supplier/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupplierById, updateSupplier, deleteSupplier } from '../../../service/supplierService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    res.status(400).json({ error: 'Supplier ID is required' });
    return;
  }

  try {
    switch (req.method) {
      case 'GET': {
        const supplier = await getSupplierById(id as string);
        if (!supplier) {
          res.status(404).json({ error: 'Supplier not found' });
        } else {
          res.status(200).json(supplier);
        }
        break;
      }

      case 'PUT': {
        const values = req.body;
        if (!values) {
          res.status(400).json({ error: 'Supplier name and contact are required' });
          return;
        }
        await updateSupplier(id as string, values);
        res.status(200).json({ message: 'Supplier updated' });
        break;
      }

      case 'DELETE': {
        await deleteSupplier(id as string);
        res.status(200).json({ message: 'Supplier deleted' });
        break;
      }

      default: {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}
