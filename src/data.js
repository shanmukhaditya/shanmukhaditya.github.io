export const profile = {
    name: "Shanmukh Yenikapati",
    role: "Software Engineer",
    location: "Charlotte, NC",
    email: "shanmukhaditya9@gmail.com",
    phone: "+1 551 6896998",
    linkedin: "https://linkedin.com/in/shanmukh-y",
    github: "https://github.com/shanmukhaditya",
    summary: "Software Engineer with 4+ years of experience building scalable APIs, ML-powered services, and data pipelines. Hands-on expertise in Python, FastAPI, distributed data processing, and cloud-based platforms. Passionate about LLM integration, agentic chatbot development, and delivering production-grade AI/ML solutions."
};

export const experience = [
    {
        company: "Lowe's Companies Inc",
        role: "Software Engineer",
        location: "Charlotte, NC",
        period: "05/2024 - Present",
        description: [
            "Designed and scaled distributed backend services across 10+ microservices handling 200k+ requests/day, reducing latency by 30% through Redis caching and optimized request routing.",
            "Owned end-to-end service lifecycle: design, implementation, deployment, observability (Prometheus + Grafana), and on-call P1/P2 incident resolution.",
            "Boosted chatbot containment rate from 50% → 70% by deploying multi-agent OpenAI GPT-powered system using A2A + MCP enabling distributed coordination.",
            "Delivered a Natural Language Understanding (NLU) service using BERT and FastAPI, enhancing chatbot intent prediction accuracy by 20%.",
            "Engineered Transcript Analyzer application to process and summarize customer chat transcripts using BERTopic, OpenAI, FastAPI."
        ]
    },
    {
        company: "Lowe's Companies Inc",
        role: "Associate Software Engineer",
        location: "Charlotte, NC",
        period: "03/2023 - 05/2024",
        description: [
            "Engineered data pipelines with Apache Airflow, PySpark, and GCP Dataproc to process and transform daily chatbot data from MongoDB into actionable insights.",
            "Created and maintained comprehensive data analytics dashboards in Apache Superset, producing over 200 visualizations.",
            "Increased test coverage for key backend services AI, NLU, Transcript Analyzer APIs from 65% to 90%."
        ]
    },
    {
        company: "Walmart Global Tech",
        role: "Software Engineer III Intern",
        location: "Bentonville, AR",
        period: "06/2022 - 08/2022",
        description: [
            "Increased data integrity by detecting anomalies in DB insert patterns with SQL-driven statistical models, reducing incident tickets by 25%.",
            "Automated validation scripts to identify and rectify misconfigured DB properties, cutting manual resolution efforts by 30%.",
            "Optimized ingestion pipelines, contributing to latency reduction in batch jobs by 18%."
        ]
    },
    {
        company: "Tata Consultancy Services",
        role: "Software Engineer",
        location: "Hyderabad, India",
        period: "05/2019 - 07/2021",
        description: [
            "Built and scaled backend APIs in Java Spring Boot to process millions of healthcare claims daily.",
            "Developed Spark pipelines in Databricks powering dashboards used by 300+ agents.",
            "Migrated mission-critical financial-like workloads from PL/SQL → T-SQL on Azure SQL, reducing average query latency by 40%."
        ]
    }
];

export const projects = [
    {
        title: "Intelligent Chatbot",
        tech: ["Python", "Tensorflow", "NMT", "SQLite", "Discord"],
        date: "12/2020",
        description: "Developed a Neural Machine Translation-based deep learning model trained on Reddit chat data, integrated a toxicity-filtering score system."
    },
    {
        title: "IWREN (Improved Wild Relation Network)",
        tech: ["Python", "Pytorch"],
        date: "03/2022",
        link: "[Repo]",
        description: "Enhanced an abstract visual reasoning model with architecture updates and dataset augmentation, increasing accuracy by 43%."
    }
];

export const education = [
    {
        school: "Rutgers University - New Brunswick",
        degree: "Master of Science in Computer Science",
        gpa: "3.88/4.0",
        period: "09/2021 - 05/2023"
    },
    {
        school: "VNR Vignana Jyothi Institute of Engineering and Technology",
        degree: "Bachelor of Technology, Mechanical Engineering",
        gpa: "8.32/10",
        period: "08/2015 - 05/2019"
    }
];

export const skills = {
    languages: ["Python", "Java", "C/C++", "SQL", "Go (basic)", "JavaScript/React"],
    frameworks: ["FastAPI", "Flask", "Spring Boot", "React", "Node.js"],
    dataML: ["PySpark", "Airflow", "TensorFlow", "PyTorch", "Pandas", "OpenAI", "RAG", "Vector DBs"],
    tools: ["Docker", "Kubernetes", "Redis", "Kafka", "GCP", "Git"]
};
