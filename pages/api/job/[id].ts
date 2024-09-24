// pages/api/job/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getJobById, updateJob, deleteJob } from '../../../service/jobService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    res.status(400).json({ error: 'Job ID is required' });
    return;
  }

  try {
    switch (req.method) {
      case 'GET': {
        const job = await getJobById(id as string);
        if (!job) {
          res.status(404).json({ error: 'Job not found' });
        } else {
          res.status(200).json(job);
        }
        break;
      }

      case 'PUT': {
        const values = req.body;
        if (!values) {
          res.status(400).json({ error: 'Job data is required' });
          return;
        }
        await updateJob(id as string, values);
        res.status(200).json({ message: 'Job updated' });
        break;
      }

      case 'DELETE': {
        await deleteJob(id as string);
        res.status(200).json({ message: 'Job deleted' });
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
