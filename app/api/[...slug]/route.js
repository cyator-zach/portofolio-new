import { Router } from "@/utils/router";
import * as project from "@/controllers/project";
import * as article from "@/controllers/article";
import * as experience from "@/controllers/experience";
import * as skill from "@/controllers/skill";
import * as category from "@/controllers/category";
import * as faq from "@/controllers/faq";
import * as config from "@/controllers/config";
import * as auth from "@/controllers/auth";
import * as upload from "@/controllers/upload";

const router = new Router();

router.get("/category", category.getCategory);

router.get("/faq", faq.getFaq);
router.post("/faq", faq.createFaq);
router.put("/faq", faq.updateFaq);
router.delete("/faq", faq.deleteFaq);

router.get("/config", config.getConfig);
router.put("/config", config.updateConfig);

router.get("/project", project.getProject);
router.post("/project", project.createProject);
router.put("/project", project.updateProject);
router.delete("/project", project.deleteProject);

router.get("/article", article.getArticle);
router.post("/article", article.createArticle);
router.put("/article", article.updateArticle);
router.delete("/article", article.deleteArticle);

router.get("/experience", experience.getExperience);
router.post("/experience", experience.createExperience);
router.put("/experience", experience.updateExperience);
router.delete("/experience", experience.deleteExperience);

router.get("/skill", skill.getSkill);
router.post("/skill", skill.createSkill);
router.put("/skill", skill.updateSkill);
router.delete("/skill", skill.deleteSkill);

router.post("/upload", upload.uploadFile);

router.post("/auth/login", auth.login);
router.post("/auth/refresh", auth.refresh);
router.post("/auth/logout", auth.logout);

const handle = (req, { params }) => router.handle(req, params);
export { handle as GET, handle as POST, handle as PUT, handle as DELETE };
