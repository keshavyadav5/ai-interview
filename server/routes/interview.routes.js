import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import { upload } from '../middlewares/multer.js';
import {
   anayzeResume,
   finishInterview,
   generateQuestion, 
   getInterviewReport, 
   getMyInterviews, 
   submitAnswer
  } from '../controllers/interview.controller.js';

const router = express.Router();

router.post('/resume',isAuth, upload.single("resume"), anayzeResume);
router.post('/generate-questions', isAuth,generateQuestion);
router.post('/submit-answer',isAuth, submitAnswer);
router.post('/finish',isAuth,finishInterview)

router.get('/get-interview',isAuth, getMyInterviews);
router.get('/report/:id',isAuth,getInterviewReport);

export default router