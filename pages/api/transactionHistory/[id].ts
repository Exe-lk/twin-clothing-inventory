// pages/api/transaction/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getTransactionById, updateTransaction, deleteTransaction } from '../../../service/transactionHistoryService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    res.status(400).json({ error: 'Transaction ID is required' });
    return;
  }

  try {
    switch (req.method) {
      case 'GET': {
        const transaction = await getTransactionById(id as string);
        if (!transaction) {
          res.status(404).json({ error: 'Transaction not found' });
        } else {
          res.status(200).json(transaction);
        }
        break;
      }

      case 'PUT': {
        const values = req.body;
        if (!values) {
          res.status(400).json({ error: 'Transaction data is required' });
          return;
        }
        await updateTransaction(id as string, values);
        res.status(200).json({ message: 'Transaction updated' });
        break;
      }

      case 'DELETE': {
        await deleteTransaction(id as string);
        res.status(200).json({ message: 'Transaction deleted' });
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
