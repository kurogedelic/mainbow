// backend/server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 簡単なインメモリデータストア
let projects = [];

// プロジェクト取得API
app.get("/api/projects", (req, res) => {
	res.json(projects);
});

// プロジェクト作成API
app.post("/api/projects", (req, res) => {
	const project = { id: Date.now(), ...req.body };
	projects.push(project);
	res.status(201).json(project);
});

// プロジェクト更新API
app.put("/api/projects/:id", (req, res) => {
	const index = projects.findIndex((p) => p.id === parseInt(req.params.id));
	if (index !== -1) {
		projects[index] = { ...projects[index], ...req.body };
		res.json(projects[index]);
	} else {
		res.status(404).json({ message: "Project not found" });
	}
});

// プロジェクト削除API
app.delete("/api/projects/:id", (req, res) => {
	projects = projects.filter((p) => p.id !== parseInt(req.params.id));
	res.status(204).send();
});

// 本番環境では、Reactのビルドファイルを提供
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/build")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

// backend/package.json (scripts部分のみ)
