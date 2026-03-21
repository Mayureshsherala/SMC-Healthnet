import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory data store for demonstration
  const db = {
    workers: [
      { id: 'W-001', name: 'Sunita M.', ward: 'Ward 4', status: 'Active', tasksCompleted: 45 },
      { id: 'W-002', name: 'Kavita R.', ward: 'Ward 12', status: 'Active', tasksCompleted: 32 },
      { id: 'W-003', name: 'Pooja S.', ward: 'Ward 8', status: 'On Leave', tasksCompleted: 12 },
    ],
    appointments: [
      { id: 'A-101', patient: 'Rahul Verma', doctor: 'Dr. Sharma', date: '2026-03-18', time: '10:30 AM', status: 'Confirmed', type: 'Follow-up' },
      { id: 'A-102', patient: 'Rahul Verma', doctor: 'Dr. Patil', date: '2026-03-25', time: '02:00 PM', status: 'Pending', type: 'General Checkup' },
    ],
    records: [
      { id: 'R-201', patient: 'Rahul Verma', title: 'Complete Blood Count (CBC)', date: '2026-03-12', doctor: 'Dr. Sharma', type: 'Lab Report' },
      { id: 'R-202', patient: 'Rahul Verma', title: 'General Consultation', date: '2026-03-10', doctor: 'Dr. Patil', type: 'Prescription' },
      { id: 'R-203', patient: 'Rahul Verma', title: 'COVID-19 Booster Dose', date: '2026-01-15', doctor: 'SMC Vaccination Camp', type: 'Vaccination' },
    ],
    symptoms: []
  };

  // API Routes
  app.get("/api/workers", (req, res) => {
    res.json(db.workers);
  });

  app.get("/api/appointments", (req, res) => {
    res.json(db.appointments);
  });

  app.get("/api/records", (req, res) => {
    res.json(db.records);
  });

  app.post("/api/symptoms", (req, res) => {
    const symptom = req.body;
    db.symptoms.push({ ...symptom, id: `S-${Date.now()}`, date: new Date().toISOString() });
    res.json({ success: true, message: 'Symptoms reported successfully' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
