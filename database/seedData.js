import { db } from "../lib/knexClient.js";
import bcrypt from "bcryptjs";

async function main() {
    console.log("Memulai proses seeding data CV Zulfikar Achyar...");

    // 1. SEED KATEGORI
    const categories = [
        { name: "Web Application", slug: "web-app", type: "PROJECT" },
        { name: "IoT & Embedded Systems", slug: "iot-embedded", type: "PROJECT" },
        { name: "AI & Computer Vision", slug: "ai-computer-vision", type: "PROJECT" },
        { name: "Mobile Application", slug: "mobile-app", type: "PROJECT" },
        { name: "Research & Publication", slug: "research-publication", type: "ARTICLE" },
    ];

    const categoryMap = {};
    for (const cat of categories) {
        let existing = await db("ref_category").where({ slug: cat.slug }).first();
        if (!existing) {
            [existing] = await db("ref_category")
                .insert({ id: crypto.randomUUID(), ...cat })
                .returning("*");
        }
        categoryMap[cat.slug] = existing.id;
    }

    // 2. SEED SKILLS
    const skills = [
        { name: "Node.js", icon_url: "https://simpleicons.org/icons/nodedotjs.svg" },
        { name: "Knex.js", icon_url: "https://simpleicons.org/icons/knexdotjs.svg" },
        { name: "PostgreSQL", icon_url: "https://simpleicons.org/icons/postgresql.svg" },
        { name: "Next.js", icon_url: "https://simpleicons.org/icons/nextdotjs.svg" },
        { name: "React", icon_url: "https://simpleicons.org/icons/react.svg" },
        { name: "Flutter", icon_url: "https://simpleicons.org/icons/flutter.svg" },
        { name: "Dart", icon_url: "https://simpleicons.org/icons/dart.svg" },
        { name: "Python Flask", icon_url: "https://simpleicons.org/icons/flask.svg" },
        { name: "ESP32 & ESP-Mesh", icon_url: "https://simpleicons.org/icons/espressif.svg" },
        { name: "MQTT Protocol", icon_url: "https://simpleicons.org/icons/mqtt.svg" },
        { name: "AWS EC2", icon_url: "https://simpleicons.org/icons/amazonec2.svg" },
        { name: "Firebase", icon_url: "https://simpleicons.org/icons/firebase.svg" },
        { name: "Cloudflare Tunnel", icon_url: "https://simpleicons.org/icons/cloudflare.svg" },
        { name: "YOLOv8 & Computer Vision", icon_url: "https://simpleicons.org/icons/opencv.svg" },
        { name: "GitLab CI/CD", icon_url: "https://simpleicons.org/icons/gitlab.svg" },
        { name: "Linux Server (PAM)", icon_url: "https://simpleicons.org/icons/linux.svg" },
    ];

    for (const s of skills) {
        const existing = await db("ref_skill").where({ name: s.name }).first();
        if (!existing) {
            await db("ref_skill").insert({ id: crypto.randomUUID(), ...s });
        }
    }

    // 3. SEED WORK EXPERIENCES
    const experiences = [
        {
            company_name: "PT Data Nusantara Adhikarya",
            role_title: "Backend Developer Intern",
            start_date: "2026-08-01",
            end_date: null,
            description:
                "• Engineered backend API architecture in Node.js and constructed structured relational database queries utilizing Knex.js query builder.\n• Implemented end-to-end data security: executed encryption and decryption for API response payloads as well as sensitive records stored at the database level.\n• Enforced token-based authentication and endpoint access validation using JSON Web Tokens (JWT).\n• Developed automated file protection workflows, generating encrypted confidential files (such as employee payslips) requiring verified decryption before access.\n• Integrated Hikvision Access Control System (ACS) terminal hardware with the web backend for physical credential authentication and real-time user event logging.\n• Administered source code repositories, collaborative merge workflows, and branching strategies using GitLab.\n• Configured and maintained Linux-based development and staging server environments operating with PAM (Pluggable Authentication Modules).",
        },
        {
            company_name: "BSS Recruitment Consultant (Indosat Hi-Fi)",
            role_title: "Account Executive",
            start_date: "2026-03-01",
            end_date: "2026-07-31",
            description:
                "• Formulated targeted sales strategies for Indosat Hi-Fi broadband products.\n• Managed client relationships and customer accounts for broadband services.",
        },
        {
            company_name: "PT. Cipta Karya Technology (Citratel)",
            role_title: "Network Maintenance & Field Technician",
            start_date: "2025-12-01",
            end_date: "2026-03-31",
            description:
                "• Handled installation, configuration, and technical troubleshooting of FTTH networks.\n• Maintained technical documentation and operational incident logs through OSS systems.",
        },
        {
            company_name: "Dinas Komunikasi dan Informatika Kabupaten Langkat",
            role_title: "IT Support Technician",
            start_date: "2024-02-01",
            end_date: "2024-07-31",
            description:
                "• Diagnosed and resolved hardware and software issues for internal end users.\n• Maintained Local Area Network (LAN) infrastructure and ensured system connectivity.",
        },
    ];

    for (const exp of experiences) {
        const existing = await db("mst_experience")
            .where({ company_name: exp.company_name, role_title: exp.role_title })
            .first();
        if (!existing) {
            await db("mst_experience").insert({ id: crypto.randomUUID(), ...exp });
        }
    }

    // 4. SEED FEATURED PROJECTS
    const projects = [
        {
            category_id: categoryMap["iot-embedded"],
            title: "Real-Time Medical IoT Monitoring System (Infusion & Heart Rate)",
            slug: "real-time-medical-iot-monitoring",
            description:
                "ESP-Mesh, ESP32, Python Flask, Flutter, MQTT, REST API. Built an ESP-Mesh-based peer-to-peer sensor network to monitor remaining IV infusion volume and patient heart rate. Developed a Flask backend to process and serve sensor data via REST APIs, consumed in real time by a Flutter application using MQTT.",
            is_featured: true,
            meta_title: "Real-Time Medical IoT Monitoring System",
            meta_description: "Medical IoT mesh network system for infusion & heart rate monitoring.",
        },
        {
            category_id: categoryMap["ai-computer-vision"],
            title: "Smart Traffic Light Control with Computer Vision",
            slug: "smart-traffic-light-control-computer-vision",
            description:
                "YOLOv8, ESP32-CAM, Python Flask, AWS EC2, Cloudflare Tunnel, Firebase. Designed a traffic intersection simulation system utilizing 3 ESP32-CAM units sending real-time video feeds to a Flask server (hosted on AWS EC2 via Cloudflare Tunneling) running YOLOv8 for vehicle counting. The backend dynamically calculates green light duration for each lane and pushes control signals to Firebase Realtime Database, consumed by an ESP8266 to operate the traffic lights.",
            is_featured: true,
            meta_title: "Smart Traffic Light Control with Computer Vision",
            meta_description: "Adaptive traffic light control utilizing YOLOv8 and ESP32-CAM.",
        },
        {
            category_id: categoryMap["iot-embedded"],
            title: "IoT Smart Parking System with License Plate Recognition (OCR)",
            slug: "iot-smart-parking-license-plate-recognition",
            description:
                "ESP32-CAM, ESP8266, Ultrasonic Sensors, Flask OCR API, Web Dashboard. Developed a dual-gate (entry/exit) smart parking system using ESP32-CAM and ultrasonic sensors (ESP8266) to trigger gate servos and image capture via MQTT. Images were processed via a Flask OCR API, storing license plate text results displayed on a web dashboard.",
            is_featured: true,
            meta_title: "IoT Smart Parking System with License Plate Recognition",
            meta_description: "Automated gate & parking system with ANPR OCR and web dashboard.",
        },
        {
            category_id: categoryMap["web-app"],
            title: "Air Quality Monitoring & Clustering Dashboard",
            slug: "air-quality-monitoring-clustering-dashboard",
            description:
                "Next.js, Firebase, K-Means Clustering, Interactive Charts, IoT Sensors. Engineered an IoT air quality sensing system transmitting data to Firebase, integrated with a Next.js web application implementing K-Means clustering for pollution level categorization. Features interactive charts, adjustable cluster counts, historical data filtering, and in-app algorithm documentation.",
            is_featured: true,
            meta_title: "Air Quality Monitoring & Clustering Dashboard",
            meta_description: "Real-time air pollution IoT monitor with K-Means clustering in Next.js.",
        },
        {
            category_id: categoryMap["mobile-app"],
            title: "IoT Medication Reminder System",
            slug: "iot-medication-reminder-system",
            description:
                "Flutter, Firebase Realtime Database, ESP8266, Physical Buzzer & Push-Button. Created a Flutter application synchronized with Firebase Realtime Database to schedule medication reminders, triggering ESP-based buzzer units; patients confirm dosage via a physical push-button, updating status across the app in real time.",
            is_featured: false,
            meta_title: "IoT Medication Reminder System",
            meta_description: "Synchronized mobile and hardware medication alert system.",
        },
        {
            category_id: categoryMap["iot-embedded"],
            title: "Automated Laundry Weighing & Billing System",
            slug: "automated-laundry-weighing-billing-system",
            description:
                "ESP Microcontroller, Load-Cell Sensor, MQTT, Flutter, Firebase. Developed an IoT load-cell scale (ESP) sending real-time weight data over MQTT to a Flutter application for automated price calculation and customer management, with data stored in Firebase.",
            is_featured: false,
            meta_title: "Automated Laundry Weighing & Billing System",
            meta_description: "IoT load-cell scale integrated with mobile billing over MQTT.",
        },
        {
            category_id: categoryMap["web-app"],
            title: "Role-Based Student Attendance & Financial Management Web Systems",
            slug: "role-based-student-attendance-financial-system",
            description:
                "Next.js, Firebase, Role-Based Access Control (RBAC), React. Built two Next.js/Firebase web applications for a Islamic boarding school foundation: a room-based student attendance system with role-based dashboards (admin, management, room guardian), and a student financial tracking system.",
            is_featured: true,
            meta_title: "Role-Based Student Attendance & Financial Management",
            meta_description: "Institutional attendance and finance portal with multi-tier RBAC.",
        },
    ];

    for (const proj of projects) {
        const existing = await db("mst_project").where({ slug: proj.slug }).first();
        if (!existing) {
            await db("mst_project").insert({ id: crypto.randomUUID(), ...proj });
        }
    }

    // 5. SEED SCIENTIFIC PUBLICATION / ARTICLE
    const scientificPub = {
        category_id: categoryMap["research-publication"],
        title: "Experimental Characterization of ESP-Mesh Performance for Resilient Medical IoT Monitoring Systems",
        slug: "esp-mesh-performance-medical-iot-monitoring",
        summary:
            "Dipublikasikan pada Sinkron: Jurnal dan Penelitian Teknik Informatika (Vol. 10 No. 1, Januari 2026). Penelitian mengenai performa, ketahanan transmisi data, dan keandalan jaringan ESP-Mesh untuk sistem pemantauan medis real-time.",
        content:
            "## Informasi Publikasi Ilmiah\n\n* **Jurnal**: *Sinkron : Jurnal dan Penelitian Teknik Informatika* (Vol. 10, No. 1, Januari 2026, hal. 670–690)\n* **Penulis**: Zulfikar Achyar, Indrawati, Ilham Safar, Dewi Wahyuni\n* **DOI**: [10.33395/sinkron.v10i1.15817](https://doi.org/10.33395/sinkron.v10i1.15817)\n* **Official Journal Link**: [Sinkron E-Journal System (jurnal.polgan.ac.id)](https://jurnal.polgan.ac.id/index.php/sinkron/article/view/15817)\n\n---\n\n### Abstract\n\nPenelitian ini berfokus pada evaluasi performa jaringan peer-to-peer berbasis **ESP-Mesh** untuk sistem pemantauan medis secara real-time (monitoring infus dan detak jantung pasien). Melalui analisis *edge network reliability* dan stabilitas transmisi data tanpa ketergantungan router tunggal, arsitektur ini membuktikan ketahanan transfer paket data medis di lingkungan rumah sakit.\n\n### Metodologi & Arsitektur Sistem\n1. **ESP-Mesh Node Topology**: Komunikasi peer-to-peer multi-hop antara node pasien secara dinamis.\n2. **Backend Processing**: Server Python Flask mengolah payload sensor secara asinkron.\n3. **Real-time Protocol**: Integrasi MQTT untuk latensi rendah pada aplikasi Flutter monitoring.\n\n### Hasil & Kesimpulan\nPengujian menunjukkan paket data tetap terkirim dengan packet-loss di bawah 1.2% meskipun salah satu node perantara mengalami gangguan, membuktikan keandalan ESP-Mesh untuk infrastruktur perangkat medis masa depan.",
        canonical_url: "https://jurnal.polgan.ac.id/index.php/sinkron/article/view/15817",
        is_published: true,
        published_at: "2026-01-15",
        reading_time: 6,
    };

    const existingArt = await db("mst_article").where({ slug: scientificPub.slug }).first();
    if (!existingArt) {
        await db("mst_article").insert({ id: crypto.randomUUID(), ...scientificPub });
    } else {
        await db("mst_article").where({ id: existingArt.id }).update({
            canonical_url: scientificPub.canonical_url,
            summary: scientificPub.summary,
            content: scientificPub.content,
            published_at: scientificPub.published_at,
        });
    }

    // 6. SEED ADMIN USER
    let admin = await db("sys_user").where({ email: "admin@zul.dev" }).first();
    if (!admin) {
        const password = bcrypt.hashSync("admin123", 10);
        await db("sys_user").insert({
            id: crypto.randomUUID(),
            nama: "Zulfikar Achyar",
            email: "admin@zul.dev",
            password,
            is_active: true,
        });
    }

    console.log("Seeding data CV berhasil diselesaikan!");
    process.exit(0);
}

main().catch((err) => {
    console.error("Gagal melakukan seed:", err);
    process.exit(1);
});
