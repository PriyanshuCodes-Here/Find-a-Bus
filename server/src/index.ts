import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/bus", (req, res) => {
  res.json({ eta: "4 mins", route: 42 });
});

app.listen(5000, () => console.log("Server runnin on port 5000"));
