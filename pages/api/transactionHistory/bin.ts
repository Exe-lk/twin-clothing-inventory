// pages/api/transaction/bin.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createTransaction, getDeletedTransactions } from '../../../service/transactionHistoryService';

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
        const transactions = await getDeletedTransactions();
        res.status(200).json(transactions);
        break;
      }

      default: {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}
