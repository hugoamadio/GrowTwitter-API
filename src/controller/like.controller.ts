import { Request, Response } from "express";
import db from "../database/prisma.connection";

class LikeController{
    public async create(req: Request, res: Response) {
        const { userId, tweetId } = req.body;
        try {
          const like = await db.like.create({
            data: {
                tweetId,
                userId
            },
          });
          if (like) {
            return res.status(201).json({ success: true, msg: "Like created" });
          }
          return res.status(400).json({ success: false, msg: "Like not created" });
        } catch (err) {
          return res.status(500).json({ success: false, msg: "Error Database" });
        }
      }
    
      public async list(req: Request, res: Response) {
        try {
          const like = await db.like.findMany();
          if (like) {
            return res.status(200).json({ success: true, data: like });
          }
          return res.status(404).json({ success: false, msg: "Like not found" });
        } catch (err) {
          return res.status(500).json({ success: false, msg: "Error Database" });
        }
      }
    
      public async show(req: Request, res: Response) {
        const { id } = req.params;
        try {
          const like = await db.like.findUnique({
            where: {
              id,
            },
          });
          if (like) {
            return res.status(200).json({ success: true, data: like });
          }
          return res.status(404).json({ success: false, msg: "Like not found" });
        } catch (err) {
          return res.status(500).json({ success: false, msg: "Error Database" });
        }
      }
    
      public async update(req: Request, res: Response) {
        const { id } = req.params;
        const { tweetId, userId } = req.body;
        try {
          const like = await db.like.findUnique({
            where: {
              id,
            },
          });
          if (!like) {
            return res.status(404).json({ success: false, msg: "Like not found" });
          }
          const LikeUpdate = await db.like.update({
            data: {
                tweetId,
                userId
            },
            where: {
              id,
            },
          });
          if (LikeUpdate) {
            return res.status(200).json({ success: true, msg: "Like updated" });
          }
          return res.status(400).json({ success: false, msg: "Like not updated" });
        } catch (err) {
          return res.status(500).json({ success: false, msg: "Error Database" });
        }
      }
    
      public async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
          await db.like.delete({
            where: {
              id,
            },
          });
          return res.status(200).json({ success: true, msg: "Like deleted" });
        } catch (err) {
          return res.status(500).json({ success: false, msg: "Error Database" });
        }
      }
}

export default LikeController