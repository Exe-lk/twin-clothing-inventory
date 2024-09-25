// pages/api/transaction/route.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createTransaction, getTransactions, updateTransaction } from '../../../service/transactionHistoryService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'POST': {
        const values = req.body;
        if (!values) {
          res.status(400).json({ error: 'Values are required' });
          return;
        }
        const id = await createTransaction(values);
        res.status(201).json({ message: 'Transaction created', id });
        break;
      }

      case 'GET': {
        const transactions = await getTransactions();
        res.status(200).json(transactions);
        break;
      }

      case 'PUT': {
        const values = req.body;
        if (!values.id) {
          res.status(400).json({ error: 'Transaction ID is required' });
          return;
        }
        await updateTransaction(values.id, values);
        res.status(200).json({ message: 'Transaction updated' });
        break;
      }

      default: {
        res.setHeader('Allow', ['POST', 'GET', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}
