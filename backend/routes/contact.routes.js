import express from "express"

const router = express.Router()

import { handleContactForm } from "../controllers/contact.controller.js"


router.route("/").post(handleContactForm)

export default router