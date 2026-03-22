
# SMC-Healthnet




This contains everything you need to run your app locally.


**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`


# SMC HealthNet — Smart Health Solutions for Solapur Municipal Corporation

> Built for SAMVED-2026 | Team: The Pandavas | N B Navale Sinhgad College of Engineering, Solapur

---

## 📌 Problem Statement

Solapur Municipal Corporation manages public health across a rapidly growing urban population — but the system runs almost entirely on manual processes. Bed availability is checked by phone calls, ASHA workers carry paper registers, and administrators receive weekly PDF reports that are outdated before they arrive.

There is no single place where a citizen, an ASHA worker, a hospital doctor, and a municipal officer can all see the same live picture of the city's health and act on it together. SMC HealthNet is built to close that gap.

---

## 🚀 What This Platform Does

| Current Reality | With SMC HealthNet |
|---|---|
| Bed availability checked by calling hospitals | Live general, ICU, and O₂ bed counts for all hospitals |
| ASHA paper registers reach offices weeks late | Field data logged on mobile, reflects instantly |
| No coordination between hospitals city-wide | Shared resource layer keeps all hospitals in sync |
| Medicine shortages found only when stock runs out | Threshold alerts trigger automatic replenishment |
| Admins receive static PDF reports | Live city-wide dashboard with real-time risk levels |
| Government tools are English-only | Full Marathi, Hindi, and English support |
| No digital tool exists for ASHA workers | Dedicated mobile ASHA dashboard |
| Outbreaks detected only after hospital surge | Ground-level symptom data triggers early alerts |
| Citizens must visit facilities for information | Citizen portal with hospital search and telemedicine |

---

## 👥 User Roles

### 🧑 Citizen
- Search nearby hospitals and check live bed availability
- Book appointments and consult doctors via telemedicine
- Self-report symptoms and receive health advisories
- Get vaccination reminders and updates
- Available in Marathi, Hindi, and English

### 👩 ASHA Worker
- Log daily home visits from a mobile-optimised interface
- Record household-level symptoms in real time
- Track immunisation status of children and pregnant women
- Send direct referrals to nearby hospitals
- Submit community health field reports
- Interface available in Marathi and Hindi

### 🏥 Hospital Staff
- Update live bed availability — general, ICU, and oxygen
- Manage medicine and vaccine inventory
- Track equipment condition and cold-chain status
- Accept and manage ASHA referrals
- Maintain patient billing records

### 🏛️ Administrator
- Monitor city-wide health analytics and zone-level KPIs
- View the live Health Risk Map with GIS visualisation
- Receive and act on the Smart Intervention Queue
- Push health advisories to citizens and health workers
- Access the AI Action Center for predictive insights
- Manage users, roles, and system configuration

---

## ✨ Key Innovation Highlights

### ASHA Worker Module
The first dedicated digital tool built specifically for India's last-mile health workers. ASHA workers can log visits, record symptoms household by household, track immunisation, and send referrals — all from a mobile-friendly, multilingual interface. Their data feeds city-level health intelligence in real time, not days later from a paper register.

### Smart Intervention Queue
Analyses incoming health data and automatically surfaces prioritised action recommendations for administrators — flagging which wards need immediate attention, which resources are critically low, and where outbreaks are likely forming.

### Health Risk Map
A live, GIS-powered visual layer over the city showing disease spread patterns, high-risk zones, and resource gaps — updated continuously from field and hospital data.

---

## 🤖 AI and Data-Driven Features

- **Predictive Outbreak Detection** — monitors symptom patterns from ASHA workers and citizens, detects unusual clusters (e.g. spike in fever + respiratory complaints across adjacent households within 72 hours), raises alerts, and flags zones on the risk map before cases escalate
- **Seasonal Surge Forecasting** — analyses historical data to anticipate dengue, malaria, and viral fever cycles so resources are pre-positioned before the wave hits
- **Smart Inventory Monitoring** — tracks medicine and vaccine stock against dynamic thresholds and warns before shortages occur
- **Referral Load Analysis** — identifies hospitals receiving disproportionate ASHA referrals and alerts admins to redistribute patient flow before bottlenecks form
- **Live Risk Heat Map** — continuously updated geographic view of health risk across all wards and zones

---

## 🏗️ System Architecture

### Layers
1. **User Layer** — Citizen, ASHA Worker, Hospital Staff, Administrator
2. **Access Portals** — Role-specific dashboards for each user type
3. **API Gateway** — Unified authentication and role-based access control
4. **Core Platform** — Disease Surveillance, Infrastructure Monitor, Supply Chain Alerts, Vaccination Management, Smart Queue, Smart Intervention Queue
5. **Intelligence Layer** — Outbreak Prediction, Health Risk Map, Referral Load Analysis, AI Action Center
6. **Data Layer** — Health data store, Symptom feed, GIS data, Historical records

### Data Flow
```
Citizens / ASHA workers → input symptoms and field data → Core Platform
Hospitals → update beds, stock, equipment → Core Platform
Core Platform → processes and analyses → Admin Dashboard + Risk Map
AI Engine → generates alerts and recommendations → Admins + Health Officers
Admin → pushes advisories and actions → Citizens + ASHA + Hospitals
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React / Next.js |
| Backend | Simulated Node.js backend |
| AI / ML | Rule-based logic and simulated prediction engine |
| Maps | GIS integration |
| Tools | Stitch, Cursor |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js installed on your machine

### Installation
```bash
# Clone the repository
git clone https://github.com/Mayureshsherala/SMC-Healthnet.git

# Navigate into the project directory
cd SMC-Healthnet

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`

---

## 📊 Subsystems

| Subsystem | Function | Technology |
|---|---|---|
| Citizen Portal | Healthcare services for citizens | React, UI Components |
| Admin Dashboard | City-wide analytics and control | Charts, Dashboard UI |
| Disease Surveillance | Tracks disease trends and outbreak alerts | Logic-based simulation |
| Infrastructure Monitoring | Tracks hospital resources in real time | Tables and dashboards |
| Hospital Dashboard | Manages hospital-level data and resources | UI + state logic |
| Health Risk Map | Geographic visualisation of health risk | GIS map integration |
| Supply Chain System | Inventory alerts and restock workflows | Threshold-based logic |
| Smart Intervention Queue | Prioritised action recommendations for admins | AI simulation |

---

## ⚠️ Current Limitations

- ASHA workers in low-connectivity areas cannot use the platform offline — offline sync is planned for future releases
- Bed and stock data is currently updated manually by hospital staff — HIS auto-sync integration is in progress
- Identity verification uses standard login credentials — Aadhaar-based authentication is not yet implemented
- Deep multi-year trend analysis is functional at a basic level with room to grow

---

## 🔭 Future Scope

- Fully offline-capable ASHA mobile app with background sync when connectivity is restored
- Video consultation connecting citizens directly with doctors
- Integration with Ayushman Bharat Digital Mission for unified ABHA health ID linkage
- IoT-based automation — sensors on equipment, oxygen tanks, and vaccine refrigerators feeding live data
- Upgraded outbreak detection using trained time-series anomaly detection models
- Aadhaar-based authentication for verified citizen and worker identity
- SMS and WhatsApp push notifications for outbreak advisories and health alerts

---

## 👥 Team — The Pandavas

| Name | Program | Contact |
|---|---|---|
| Mayuresh Sherala (Leader) | EnTC | mayureshsherala1@gmail.com |
| Ved Ganapur | EnTC | vedganapur.work@gmail.com |
| Pranav Gaikwad | EnTC | work.pranav4705@gmail.com |
| Swapnil Khandekar | CSE | khandekarswapnil423@gmail.com |
| Audoot Jadhav | EnTC | audootjadhav2005@gmail.com |

**Mentor:** Prof. Sunil Shakhapure — ssshakhapure.nbnscoe@sinhgad.edu

**Institute:** N B Navale Sinhgad College of Engineering, Solapur

---

## 📄 Declaration

This project is an original outcome of Team The Pandavas, developed under the guidance of Prof. Sunil Shakhapure for SAMVED-2026. The work is neither copied from any source nor generated using artificial intelligence tools.
