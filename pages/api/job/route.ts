// pages/api/job/route.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createJob, getJobs, updateJob, deleteJob } from '../../../service/jobService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'POST': {
        const values = req.body;
        if (!values) {
          res.status(400).json({ error: 'Values are required' });
          return;
        }
        const id = await createJob(values);
        res.status(201).json({ message: 'Job created', id });
        break;
      }

      case 'GET': {
        const jobs = await getJobs();
        res.status(200).json(jobs);
        break;
      }

      case 'PUT': {
        const values = req.body;
        if (!values.id) {
          res.status(400).json({ error: 'Job ID is required' });
          return;
        }
        await updateJob(values.id, values);
        res.status(200).json({ message: 'Job updated' });
        break;
      }

      case 'DELETE': {
        const { id } = req.body;
        if (!id) {
          res.status(400).json({ error: 'Job ID is required' });
          return;
        }
        await deleteJob(id);
        res.status(200).json({ message: 'Job deleted' });
        break;
      }

      default: {
        res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}
